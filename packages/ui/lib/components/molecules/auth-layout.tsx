import { ReactNode } from 'react'
import { BrandIcon } from '../atoms/brand-icon'
import { IconArrowBack } from '@tabler/icons-react'

export interface IAuthLayoutProps {
  children: ReactNode
  title: string
  logo: string
}

export const AuthLayout = ({ children, title, logo }: IAuthLayoutProps) => {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] gap-4 overflow-hidden md:grid-cols-2 lg:grid-cols-4">
      <div className="relative">
        <div className="flex flex-col justify-center h-full p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg mx-auto">
            <div className="flex items-center gap-2 mb-2 text-2xl">
              <BrandIcon logo={logo} width={80} height={80} />
              <div className="font-bold text-gray-500">{title}</div>
            </div>
            {children}
            <div className="mt-4 text-sm text-gray-300">
              <a href="/" className="flex items-center gap-2">
                {/* @ts-ignore */}
                <IconArrowBack /> Back to home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
