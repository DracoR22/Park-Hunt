'use client'

import { allUsersQuery } from '@parkhunt/network'
import { useEffect, useState } from 'react'
import { BrandIcon, Button, Header, Sidebar } from '@parkhunt/ui'
import { useSession } from 'next-auth/react'
import { useQuery } from '@apollo/client'
import { UsersDocument } from '@parkhunt/network'
import Link from 'next/link'
import { MENUITEMS } from '@/lib/utils'

const HomePage = () => {
  const [users, setUsers] = useState<any>(null)
  const [open, setOpen] = useState(false)

  const { data: sessionData, status } = useSession()
  const usersData = useQuery(UsersDocument)

  // useEffect(() => {
  //   const getUser = async () => {

  //     setUsers(usersData)
  //   }

  //   getUser()
  // }, [])

  return (
    <>
      <Header
        image={sessionData?.user?.image}
        menuItems={MENUITEMS}
        name={sessionData?.user?.name}
        uid={sessionData?.user?.uid}
      >
        <Link href={'/'} className="flex items-center font-bold text-xl text-gray-700">
          <BrandIcon logo="/parkhunt.png" height={75} width={75} />
          Park Hunt
        </Link>
      </Header>
      <div className="bg-primary">
        {sessionData?.user?.uid}
        <BrandIcon logo="/parkhunt.png" height={80} width={80} />
        {usersData && usersData.data?.users.map((u: any) => <div key={u.uid}>user: {u.name}</div>)}
        <div className="p-12">
          <Button onClick={() => setOpen(true)}>few</Button>
          <Sidebar open={open} setOpen={setOpen}>
            children
          </Sidebar>
        </div>
      </div>
    </>
  )
}

export default HomePage
