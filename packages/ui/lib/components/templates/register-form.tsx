import { Role } from '@parkhunt/common'
import { Form } from '../atoms/form'
import { Button } from '../atoms/button'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { FormError } from '../atoms/form-error'
import { FormSuccess } from '../atoms/form-success'
import { ReactNode } from 'react'

export interface ISignupFormProps {
  className?: string
  role?: Role
  error?: string | undefined
  success?: string | undefined
  isSubmitting: boolean
  onSubmit: () => void
  register: any
  children: ReactNode
}

export const RegisterForm = ({ onSubmit, register, error, isSubmitting, success, children }: ISignupFormProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Label title="Email">
        <Input className="text-black" placeholder="Enter the email." {...register('email')} />
      </Label>
      <Label title="Password">
        <Input className="text-black" type="password" placeholder="······" {...register('password')} />
      </Label>
      <Label title="Display name">
        <Input className="text-black" placeholder="Enter your name." {...register('name')} />
      </Label>
      <FormError error={error} />
      <FormSuccess success={success} />
      <Button type="submit" fullWidth loading={isSubmitting}>
        Register
      </Button>
      {children}
    </Form>
  )
}
