import React, { HTMLProps } from 'react'

export type LabelProps = HTMLProps<HTMLLabelElement> & {
  error?: string | undefined
  optional?: boolean
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ children, title, optional, className }, ref) => (
  <label ref={ref} className={` text-sm block select-none ${className}`}>
    <div className="flex items-baseline justify-between">
      <div className="mb-1 font-semibold capitalize">{title}</div>
      <div className="text-xs text-gray-600 ">{optional ? '(optional)' : null}</div>
    </div>
    {children}
    {/* <FormError error={error} /> */}
  </label>
))

Label.displayName = 'HtmlLabel'
