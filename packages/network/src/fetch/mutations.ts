import {
  LoginUserMutationProps,
  RegisterWithCredentialsMutationProps,
  RegisterWithProviderMutationProps,
} from '../types'
import { fetchGraphQL } from '.'
import {
  AuthProviderType,
  LoginDocument,
  RegisterWithCredentialsDocument,
  RegisterWithProviderDocument,
} from '../gql/generated'

// LOGIN USER METHOD
export const loginUserMutation = async ({ email, password }: LoginUserMutationProps) => {
  const loginUser = await fetchGraphQL({
    document: LoginDocument,
    variables: {
      loginInput: {
        email,
        password,
      },
    },
  })

  return loginUser
}

// CREATE A USER USING AUTH PROVIDER
export const registerWithProviderMutation = async ({ uid, image, name }: RegisterWithProviderMutationProps) => {
  const newUser = await fetchGraphQL({
    document: RegisterWithProviderDocument,
    variables: {
      registerWithProviderInput: {
        uid,
        type: AuthProviderType.Google,
        image,
        name: name || '',
      },
    },
  })

  return newUser
}

// REGISTER USER WITH CREDENTIALS
export const registerWithCredentialsMutation = async ({
  email,
  password,
  image,
  name,
}: RegisterWithCredentialsMutationProps) => {
  const newUser = await fetchGraphQL({
    document: RegisterWithCredentialsDocument,
    variables: {
      registerWithCredentialsInput: {
        email,
        name,
        password,
        image,
      },
    },
  })

  return newUser
}
