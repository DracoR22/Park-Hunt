'use client'

import { useFormLogin } from '@parkhunt/forms'
import { loginUserMutation } from '@parkhunt/network'
import { AuthLayout, FormError, LoginForm } from '@parkhunt/ui'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin()

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data

    const result = await signIn('credentials', { email, password, redirect: false })
    console.log(result)
    if (result?.ok) {
      router.replace('/')
    }

    if (result?.error) {
      alert('Invalid email or password')
    }
  })

  const oNoSubmit = handleSubmit(async (data) => {
    const res = await loginUserMutation({
      email: data.email,
      password: data.password,
    })

    console.log(res)
  })

  return (
    <div className="w-full flex items-center justify-center mt-10">
      <div>
        <AuthLayout title="Welcome back!" logo="/parkhunt.png">
          <LoginForm
            error={errors.email?.message || errors.password?.message}
            onSubmit={onSubmit}
            register={register}
          />

          <div className="mt-4 text-sm">
            Don&apos;t have a Park Hunt account?
            <br />
            <Link href="/register" className="font-bold underline underline-offset-4">
              Create one
            </Link>{' '}
          </div>
        </AuthLayout>
      </div>

      {/* <div>
        <form action="" onSubmit={oNoSubmit}>
          <input type="text" {...register('email')} />
          <input type="text" {...register('password')} />

          <button>login</button>
        </form>
      </div> */}
    </div>
  )
}

export default LoginPage
