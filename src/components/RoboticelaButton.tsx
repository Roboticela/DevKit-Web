'use client'

import type { ButtonHTMLAttributes } from 'react'
import { DkRoboticelaBrandLogo } from '@/icons'
import { AuthProviderButton } from './AuthProviderButton'

type RoboticelaButtonProps = {
  loading?: boolean
  lastUsed?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function RoboticelaButton({
  children = 'Continue with Roboticela',
  ...rest
}: RoboticelaButtonProps) {
  return (
    <AuthProviderButton icon={<DkRoboticelaBrandLogo size={20} />} {...rest}>
      {children}
    </AuthProviderButton>
  )
}
