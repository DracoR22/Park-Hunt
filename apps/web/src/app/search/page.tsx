'use client'

import { BrandIcon, Header } from '@parkhunt/ui'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { SearchPage } from '@/components/search'
import { MENUITEMS } from '@/lib/utils'
import { FormProviderSearchGarage } from '@/lib/schema'

const Search = () => {
  const { data: sessionData, status } = useSession()

  return (
    <>
      <FormProviderSearchGarage>
        <Header
          signOut={signOut}
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

        <SearchPage />
      </FormProviderSearchGarage>
    </>
  )
}

export default Search
