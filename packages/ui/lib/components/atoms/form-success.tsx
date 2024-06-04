import { IconAlertTriangle } from '@tabler/icons-react'

export const FormSuccess = ({ success }: { success?: string | undefined }) => {
  if (success) {
    return (
      <div className="bg-green/15 p-3 rounded-md flex items-center gap-x-2 text-sm border text-green-500 border-green-500">
        {/* @ts-ignore */}
        <IconAlertTriangle className="h-4 w-4" />
        <p>{success}</p>
      </div>
    )
  }
  return null
}
