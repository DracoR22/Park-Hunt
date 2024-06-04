import { Form } from '../atoms/form'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'

import { FormError } from '../atoms/form-error'
import { ReactNode } from 'react'

export interface ILoginFormProps {
  className?: string
  error?: string | undefined
  onSubmit: () => void
  register: any
  children: ReactNode
  isSubmitting: boolean
}

export const LoginForm = ({ className, error, onSubmit, register, children, isSubmitting }: ILoginFormProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Label className={className}>
        <Input placeholder="youremail@example.com" {...register('email')} />
      </Label>
      <Label>
        <Input type="password" placeholder="*******" {...register('password')} />
      </Label>
      <FormError error={error} />
      <Button type="submit" loading={isSubmitting}>
        Submit
      </Button>
      {children}
    </Form>
  )
}
