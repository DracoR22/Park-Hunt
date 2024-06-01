import { LoginUserMutationProps, RegisterWithProviderMutationProps } from '../types'
import { fetchGraphQL } from '../fetch'
import { AuthProviderType, LoginDocument, RegisterWithProviderDocument } from '../gql/generated'

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
