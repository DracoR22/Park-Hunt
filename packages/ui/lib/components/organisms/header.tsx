import { BaseComponent, MenuItem, Role } from '@parkhunt/common'
import { Container } from '../atoms/container'
import { ReactNode } from 'react'
import { Menus } from './menus'
import { NavSidebar } from './nav-sidebar'
import { Button } from '../atoms/button'

export type IHeaderProps = {
  type?: Role
  menuItems: MenuItem[]
  children: ReactNode
  uid?: string | undefined | null
  name?: string | undefined | null
  image?: string | undefined | null
} & BaseComponent

export const Header = ({ menuItems, children, uid, image, name }: IHeaderProps) => {
  return (
    <header>
      <nav className="fixed z-50 top-0 w-full shadow-md bg-white/50 backdrop-blur-md">
        <Container className="relative flex items-center justify-between h-16 py-2 gap-16">
          {children}
          <div className="flex items-center gap-2">
            {uid ? (
              <div className="flex gap-6 items-center">
                <div className="text-sm mr-6 flex gap-3">
                  <Menus menuItems={menuItems} />
                </div>

                <NavSidebar uid={uid} image={image} name={name} menuItems={menuItems} />
              </div>
            ) : (
              <>
                <a href="/register">
                  <Button variant="outlined" className="hidden md:block">
                    Register
                  </Button>
                </a>
                <a href="/login">
                  <Button>Log in</Button>
                </a>
              </>
            )}
          </div>
        </Container>
      </nav>
    </header>
  )
}
