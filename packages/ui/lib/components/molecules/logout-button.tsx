import { IconDoorExit } from '@tabler/icons-react'
import { Button } from '../atoms/button'

export const LogoutButton = ({ signOut }: { signOut: () => void }) => {
  return (
    <Button variant="outlined" onClick={() => signOut()} className="flex gap-2 text-black">
      <IconDoorExit stroke={'black'} /> Logout
    </Button>
  )
}
