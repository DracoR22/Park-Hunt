export type LoginUserMutationProps = {
  email: string
  password: string
}

export type RegisterWithProviderMutationProps = {
  uid: string
  image?: string | null | undefined
  name?: string | null | undefined
}

export type RegisterWithCredentialsMutationProps = {
  email: string
  image?: string | null | undefined
  name: string
  password: string
}
