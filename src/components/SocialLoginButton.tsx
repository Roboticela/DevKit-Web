'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import {
  DkAppleBrandLogo,
  DkDiscordBrandLogo,
  DkFacebookBrandLogo,
  DkFingerprintBiometricScanPattern,
  DkGithubOctocatBrandLogo,
  DkGoogleBrandLogo,
  DkLinkedInBrandLogo,
  DkMicrosoftBrandLogo,
  DkRoboticela,
  DkSlackBrandLogo,
  DkXBrandLogo,
} from '@/icons'
import { AuthProviderButton } from './AuthProviderButton'

export const SOCIAL_LOGIN_PROVIDERS = [
  'roboticela',
  'passkey',
  'google',
  'apple',
  'microsoft',
  'github',
  'facebook',
  'x',
  'linkedin',
  'discord',
  'slack',
] as const

export type SocialLoginProvider = (typeof SOCIAL_LOGIN_PROVIDERS)[number]

export const SOCIAL_LOGIN_PRIMARY_PROVIDERS = ['roboticela', 'passkey', 'google'] as const

export const SOCIAL_LOGIN_MORE_PROVIDERS = [
  'apple',
  'microsoft',
  'github',
  'facebook',
  'x',
  'linkedin',
  'discord',
  'slack',
] as const

const PROVIDERS: Record<
  SocialLoginProvider,
  { label: string; icon: ReactNode; loadingText?: string }
> = {
  roboticela: {
    label: 'Continue with Roboticela',
    icon: <DkRoboticela size={20} />,
  },
  passkey: {
    label: 'Continue with Passkey',
    icon: <DkFingerprintBiometricScanPattern size={18} strokeWidth={1.75} absoluteStrokeWidth />,
    loadingText: 'Waiting for passkey…',
  },
  google: {
    label: 'Continue with Google',
    icon: <DkGoogleBrandLogo size={18} />,
  },
  apple: {
    label: 'Continue with Apple',
    icon: <DkAppleBrandLogo size={18} />,
  },
  microsoft: {
    label: 'Continue with Microsoft',
    icon: <DkMicrosoftBrandLogo size={18} />,
  },
  github: {
    label: 'Continue with GitHub',
    icon: <DkGithubOctocatBrandLogo size={18} />,
  },
  facebook: {
    label: 'Continue with Facebook',
    icon: <DkFacebookBrandLogo size={18} />,
  },
  x: {
    label: 'Continue with X',
    icon: <DkXBrandLogo size={18} />,
  },
  linkedin: {
    label: 'Continue with LinkedIn',
    icon: <DkLinkedInBrandLogo size={18} />,
  },
  discord: {
    label: 'Continue with Discord',
    icon: <DkDiscordBrandLogo size={18} />,
  },
  slack: {
    label: 'Continue with Slack',
    icon: <DkSlackBrandLogo size={18} />,
  },
}

export type SocialLoginButtonProps = {
  provider: SocialLoginProvider
  loading?: boolean
  lastUsed?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

type NamedSocialLoginButtonProps = Omit<SocialLoginButtonProps, 'provider'>

export function SocialLoginButton({
  provider,
  children,
  ...rest
}: SocialLoginButtonProps) {
  const item = PROVIDERS[provider]
  return (
    <AuthProviderButton icon={item.icon} loadingText={item.loadingText} {...rest}>
      {children ?? item.label}
    </AuthProviderButton>
  )
}

export function RoboticelaButton(props: NamedSocialLoginButtonProps) {
  return <SocialLoginButton provider="roboticela" {...props} />
}

export function PasskeyButton(props: NamedSocialLoginButtonProps) {
  return <SocialLoginButton provider="passkey" {...props} />
}

export function GoogleButton(props: NamedSocialLoginButtonProps) {
  return <SocialLoginButton provider="google" {...props} />
}

export function AppleButton(props: NamedSocialLoginButtonProps) {
  return <SocialLoginButton provider="apple" {...props} />
}

export function MicrosoftButton(props: NamedSocialLoginButtonProps) {
  return <SocialLoginButton provider="microsoft" {...props} />
}

export function GitHubButton(props: NamedSocialLoginButtonProps) {
  return <SocialLoginButton provider="github" {...props} />
}

export function FacebookButton(props: NamedSocialLoginButtonProps) {
  return <SocialLoginButton provider="facebook" {...props} />
}

export function XButton(props: NamedSocialLoginButtonProps) {
  return <SocialLoginButton provider="x" {...props} />
}

export function LinkedInButton(props: NamedSocialLoginButtonProps) {
  return <SocialLoginButton provider="linkedin" {...props} />
}

export function DiscordButton(props: NamedSocialLoginButtonProps) {
  return <SocialLoginButton provider="discord" {...props} />
}

export function SlackButton(props: NamedSocialLoginButtonProps) {
  return <SocialLoginButton provider="slack" {...props} />
}
