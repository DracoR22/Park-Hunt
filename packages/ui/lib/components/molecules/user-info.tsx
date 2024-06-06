import { BaseComponent } from '@parkhunt/common'

type Props = {
  image?: string | undefined | null
  name?: string | undefined | null
  uid?: string | undefined | null
} & BaseComponent

export const UserInfo = ({ children, className, image, name, uid }: Props) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <img src={image || '/user.png'} alt="" width={300} height={300} className="w-16 h-16 object-cover border" />
      <div>
        <div>{name}</div>
        <div className="text-sm text-gray">{uid}</div>
      </div>
      {children}
    </div>
  )
}
