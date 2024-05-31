'use client'

import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider as Provider, useQuery } from '@apollo/client'
import { ReactNode } from 'react'

export interface IApolloProviderProps {
  children: ReactNode
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  const httpLink = new HttpLink({
    uri: 'http://localhost:3001/graphql',
  })

  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })

  return <Provider client={apolloClient}>{children}</Provider>
}