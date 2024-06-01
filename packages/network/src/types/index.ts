export type LoginUserMutationProps = {
  email: string
  password: string
}

export type RegisterWithProviderMutationProps = {
  uid: string
  image?: string | null | undefined
  name?: string | null | undefined
}
