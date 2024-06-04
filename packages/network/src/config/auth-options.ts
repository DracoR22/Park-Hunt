import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { loginUserMutation, registerWithProviderMutation } from '../requests/mutations'
import jwt from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'
import { getUserByAuthQuery } from '../requests/queries'

const MAX_AGE = 1 * 24 * 60 * 60

export const authOptions: NextAuthOptions = {
  // Configure authentication providers
  providers: [
    // Google OAuth provider configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Credentials provider configuration for email/password authentication
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      // Authorize function to validate user credentials
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Email and password are required')
        }

        const { email, password } = credentials

        try {
          console.log('Attempting to connect to GraphQL server...')
          const loginUser = await loginUserMutation({ email, password })

          if (!loginUser.data?.login.token || loginUser.error) {
            throw new Error('Authentication failed: Invalid credentials or user not found')
          }

          const { uid, image, name } = loginUser.data.login.user
          return { id: uid, name, image, email }
        } catch (error) {
          console.log('Error during loginUserMutation:', error)
          throw new Error('Authentication failed: Connection error')
        }
      },
    }),
  ],

  // Enable debug mode for development
  debug: true,

  // Configure sesion settings
  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE,
  },

  // Configure JWT settings
  jwt: {
    maxAge: MAX_AGE,

    // Custom JWT encoding function
    async encode({ token, secret }): Promise<string> {
      // Implement custom JWT encoding logic
      if (!token) {
        throw new Error('Token is undefined')
      }

      const { sub, ...tokenProps } = token

      // Get the current date in seconds since the epoch
      const nowInSeconds = Math.floor(Date.now() / 1000)

      // Calculate the expiration timestamp
      const expirationTimeStamp = nowInSeconds + MAX_AGE

      return jwt.sign(
        {
          uid: sub,
          ...tokenProps,
          exp: expirationTimeStamp,
        },
        secret,
        { algorithm: 'HS256' },
      )
    },

    // Custom JWT decoding function
    async decode({ token, secret }): Promise<JWT | null> {
      // Implement custom JWT decoding logic
      if (!token) {
        throw new Error('Token is undefined')
      }

      try {
        const decodedToken = jwt.verify(token, secret, {
          algorithms: ['HS256'],
        })

        return decodedToken as JWT
      } catch (error) {
        return null
      }
    },
  },

  // TODO: CONFIGURE COOKIES

  // Configure callback function
  callbacks: {
    // Sign-In callback
    async signIn({ user, account }) {
      //Implement sign-in logic, e.g: create user in database
      if (account?.provider === 'google') {
        const { id, name, image } = user

        // Find if there is already an exisitng user with this ID
        const exisitngUser = await getUserByAuthQuery(id)

        // If we didn't find any user, we create a new one
        if (!exisitngUser.data?.getAuthProvider?.uid) {
          const newUser = await registerWithProviderMutation({ uid: id, name, image })
        }
      }

      return true
    },

    // Session callback
    async session({ token, session }) {
      // Customize session object based on token data
      if (token) {
        session.user = {
          image: token.picture,
          uid: (token.uid as string) || '',
          email: token.email,
          name: token.name,
        }
      }

      return session
    },
  },

  // Configure custom pages
  pages: {
    signIn: '/login',
  },
}

export const getAuth = () => getServerSession(authOptions)
