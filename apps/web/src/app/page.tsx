'use client'

import { allUsersQuery } from '@parkhunt/network'
import { useEffect, useState } from 'react'

const HomePage = () => {
  const [users, setUsers] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const usersData = await allUsersQuery()

      setUsers(usersData)
    }

    getUser()
  }, [])

  return <div>{users && users.data?.users.map((u: any) => <div key={u.uid}>user: {u.name}</div>)}</div>
}

export default HomePage
