import { Form } from '../atoms/form'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'

import { FormError } from '../atoms/form-error'

export interface ILoginFormProps {
  className?: string
  error?: string | undefined
  onSubmit: () => void
  register: any
}

export const LoginForm = ({ className, error, onSubmit, register }: ILoginFormProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Label className={className}>
        <Input placeholder="youremail@example.com" {...register('email')} />
      </Label>
      <Label>
        <Input type="password" placeholder="*******" {...register('password')} />
      </Label>
      <FormError error={error} />
      <Button type="submit">Submit</Button>
    </Form>
  )
}
