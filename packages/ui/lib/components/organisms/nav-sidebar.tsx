import { MenuItem } from '@parkhunt/common'
import { IconMenu2 } from '@tabler/icons-react'
import { Sidebar } from './sidebar'
import { useState } from 'react'
import { UserInfo } from '../molecules/user-info'
import { Menus } from './menus'

export interface INavSidebarProps {
  menuItems: MenuItem[]
  image?: string | undefined | null
  name?: string | undefined | null
  uid?: string | undefined | null
}

export const NavSidebar = ({ menuItems, image, name, uid }: INavSidebarProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen((state) => !state)} className="p-2" aria-label="Open main menu">
        <IconMenu2 className="w-5 h-5" />
      </button>
      <Sidebar open={open} setOpen={setOpen}>
        <div className="flex flex-col items-start space-y-1">
          <UserInfo className="mb-4" image={image} name={name} uid={uid} />
          <Menus menuItems={menuItems} />
        </div>
        <div className=" mt-auto">{/* <LogoutButton /> */}</div>
      </Sidebar>
    </>
  )
}
