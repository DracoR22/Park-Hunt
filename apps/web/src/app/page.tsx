'use client'

import { allUsers } from '@parkhunt/network'

const HomePage = () => {
  const users = allUsers()

  return <div>{JSON.stringify(users.data)}</div>
}

export default HomePage
