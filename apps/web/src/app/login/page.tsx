'use client'

import { useFormLogin } from '@parkhunt/forms'
import { loginUserMutation } from '@parkhunt/network'
import { AuthLayout, FormError, LoginForm } from '@parkhunt/ui'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const LoginPage = () => {
  const [error, setError] = useState<string | undefined>('')

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormLogin()

  const onSubmit = handleSubmit(async (data) => {
    setError('')

    const { email, password } = data

    const result = await signIn('credentials', { email, password, redirect: false })
    console.log(result)
    if (result?.ok) {
      router.replace('/')
    }

    if (result?.error) {
      setError(result.error || 'Invalid email or password')
    }
  })

  return (
    <div>
      <AuthLayout title="Welcome back!" logo="/parkhunt.png">
        <LoginForm
          error={errors.email?.message || errors.password?.message || error}
          onSubmit={onSubmit}
          register={register}
          isSubmitting={isSubmitting}
        >
          <div className="mt-4 text-sm">
            Don&apos;t have a Park Hunt account?
            <br />
            <Link href="/register" className="font-bold underline underline-offset-4">
              Create one
            </Link>{' '}
          </div>
        </LoginForm>
      </AuthLayout>
    </div>
  )
}

export default LoginPage
