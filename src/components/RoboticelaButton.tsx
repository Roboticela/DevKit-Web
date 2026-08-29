'use client'

import type { ButtonHTMLAttributes } from 'react'
import { AuthProviderButton } from './AuthProviderButton'
import { RoboticelaMark } from './RoboticelaMark'

type RoboticelaButtonProps = {
  loading?: boolean
  lastUsed?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function RoboticelaButton({
  children = 'Continue with Roboticela',
  ...rest
}: RoboticelaButtonProps) {
  return (
    <AuthProviderButton icon={<RoboticelaMark size={20} />} {...rest}>
      {children}
    </AuthProviderButton>
  )
}
