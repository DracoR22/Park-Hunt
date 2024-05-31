'use client'

import { useMutation, useQuery } from '@apollo/client'
import { RegisterWithCredentialsDocument, UsersDocument } from '../gql/generated.js'

export const allUsers = () => {
  const users = useQuery(UsersDocument)

  return users
}
