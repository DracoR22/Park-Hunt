import { MenuItem } from '@parkhunt/common'

export interface IMenuItemProps {
  menuItems: MenuItem[]
}

export const Menus = ({ menuItems }: IMenuItemProps) => {
  return (
    <>
      {menuItems.map(({ label, href }) => (
        <a className="hover:underline underline-offset-8 transition-all " key={label} href={href}>
          {label}
        </a>
      ))}
    </>
  )
}
