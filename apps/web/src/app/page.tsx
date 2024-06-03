'use client'

import { allUsersQuery } from '@parkhunt/network'
import { useEffect, useState } from 'react'
import { BrandIcon } from '@parkhunt/ui'

const HomePage = () => {
  const [users, setUsers] = useState<any>(null)

  useEffect(() => {
    const getUser = async () => {
      const usersData = await allUsersQuery()

      setUsers(usersData)
    }

    getUser()
  }, [])

  return (
    <div className="bg-primary">
      <BrandIcon logo="/parkhunt.png" height={80} width={80} />
      {users && users.data?.users.map((u: any) => <div key={u.uid}>user: {u.name}</div>)}
      <div></div>
    </div>
  )
}

export default HomePage
