'use client'

import { useFormRegister } from '@parkhunt/forms'
import { registerWithCredentialsMutation } from '@parkhunt/network'
import { AuthLayout, RegisterForm } from '@parkhunt/ui'
import Link from 'next/link'
import React, { useState } from 'react'

const RegisterPage = () => {
  const [success, setSuccess] = useState<string | undefined>('')
  const [error, setError] = useState<string | undefined>('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useFormRegister()

  const onSubmit = handleSubmit(async (data) => {
    setSuccess('')
    setError('')

    const newUser = await registerWithCredentialsMutation({
      email: data.email,
      name: data.name ?? '',
      password: data.password,
      image: '/placeholder.png',
    })

    if (newUser.error) {
      // Remove quotes from the error message if present
      const errorMessage = newUser.error.replace(/^["']|["']$/g, '')
      setError(errorMessage || 'Something went wrong!')
    }

    if (newUser.data) {
      setSuccess(`User created. 🎉 Now you can login`)

      reset()
    }
  })

  return (
    <div>
      <AuthLayout title="Welcome to Park Hunt" logo="/parkhunt.png">
        <RegisterForm
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          register={register}
          success={success}
          error={errors.email?.message || errors.name?.message || errors.password?.message || error}
        >
          <div className="text-sm">
            Already have a Park Hunt account?
            <br />
            <Link href="/login" className="font-bold underline underline-offset-4">
              Login
            </Link>
          </div>
        </RegisterForm>
      </AuthLayout>
    </div>
  )
}

export default RegisterPage
