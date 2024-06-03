import { useFormLogin } from '@parkhunt/forms'
import { Form } from '../atoms/form'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'

export interface ILoginFormProps {
  className?: string
}

export const LoginForm = ({ className }: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin()

  console.log(errors)

  return (
    <Form
      onSubmit={handleSubmit((data) => {
        console.log(data)
      })}
    >
      <Label className={className}>
        <Input {...register('email')} />
      </Label>
      <Label>
        <Input {...register('password')} />
      </Label>
      <Button type="submit">Submit</Button>
    </Form>
  )
}
