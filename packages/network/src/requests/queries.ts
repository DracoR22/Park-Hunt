'use client'

import { useQuery } from '@apollo/client'
import { GetAuthProviderDocument, UsersDocument } from '../gql/generated.js'
import { fetchGraphQL } from '../fetch/index.js'

// GET ALL USERS
export const allUsersQuery = async () => {
  const users = await fetchGraphQL({
    document: UsersDocument,
  })

  return users
}

// GET USER BY AUTH PROVIDER
export const getUserByAuthQuery = async (uid: string) => {
  const user = await fetchGraphQL({
    document: GetAuthProviderDocument,
    variables: {
      uid,
    },
  })

  return user
}
