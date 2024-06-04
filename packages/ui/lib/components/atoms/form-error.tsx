import { IconAlertTriangle } from '@tabler/icons-react'

export const FormError = ({ error }: { error?: string | undefined }) => {
  if (error) {
    return (
      <div className="bg-red/15 p-3 rounded-md flex items-center gap-x-2 text-sm border text-red-500 border-red-500">
        {/* @ts-ignore */}
        <IconAlertTriangle className="h-4 w-4" />
        <p>{error}</p>
      </div>
    )
  }
  return null
}
