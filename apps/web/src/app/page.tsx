'use client'

import { allUsersQuery } from '@parkhunt/network'
import { useEffect, useState } from 'react'
import { MyButtonComponent } from '@parkhunt/ui'

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
    <div>
      {users && users.data?.users.map((u: any) => <div key={u.uid}>user: {u.name}</div>)}
      <div>
        <MyButtonComponent />
      </div>
    </div>
  )
}

export default HomePage
