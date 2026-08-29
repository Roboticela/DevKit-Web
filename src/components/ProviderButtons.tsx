'use client'

import type { ButtonHTMLAttributes } from 'react'
import { AuthProviderButton } from './AuthProviderButton'
import {
  AppleMark,
  DiscordMark,
  FacebookMark,
  LinkedInMark,
  MicrosoftMark,
  SlackMark,
  XMark,
} from './providerMarks'

type ProviderButtonProps = {
  loading?: boolean
  lastUsed?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function AppleButton({
  children = 'Continue with Apple',
  ...rest
}: ProviderButtonProps) {
  return (
    <AuthProviderButton icon={<AppleMark />} {...rest}>
      {children}
    </AuthProviderButton>
  )
}

export function MicrosoftButton({
  children = 'Continue with Microsoft',
  ...rest
}: ProviderButtonProps) {
  return (
    <AuthProviderButton icon={<MicrosoftMark />} {...rest}>
      {children}
    </AuthProviderButton>
  )
}

export function FacebookButton({
  children = 'Continue with Facebook',
  ...rest
}: ProviderButtonProps) {
  return (
    <AuthProviderButton icon={<FacebookMark />} {...rest}>
      {children}
    </AuthProviderButton>
  )
}

export function XButton({
  children = 'Continue with X',
  ...rest
}: ProviderButtonProps) {
  return (
    <AuthProviderButton icon={<XMark />} {...rest}>
      {children}
    </AuthProviderButton>
  )
}

export function LinkedInButton({
  children = 'Continue with LinkedIn',
  ...rest
}: ProviderButtonProps) {
  return (
    <AuthProviderButton icon={<LinkedInMark />} {...rest}>
      {children}
    </AuthProviderButton>
  )
}

export function DiscordButton({
  children = 'Continue with Discord',
  ...rest
}: ProviderButtonProps) {
  return (
    <AuthProviderButton icon={<DiscordMark />} {...rest}>
      {children}
    </AuthProviderButton>
  )
}

export function SlackButton({
  children = 'Continue with Slack',
  ...rest
}: ProviderButtonProps) {
  return (
    <AuthProviderButton icon={<SlackMark />} {...rest}>
      {children}
    </AuthProviderButton>
  )
}
