'use client'

import { useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { brand } from '@/lib/devkit'
import { PAGES_ITEMS, SIGN_IN_STATES, resolveSignInPreview, type SignInPreviewState } from '@/lib/pages-catalog'
import { adjacentDocs } from '@/lib/docs-catalog'
import { useTheme } from '@/lib/theme'
import { Badge } from './Badge'
import { BuiltWithChips } from './BuiltWithChips'
import { CollapsibleCode } from './CollapsibleCode'
import { CompositionTree, type CompositionNode } from './CompositionTree'
import { DocsSectionTitle } from './DocsCopy'
import { DocsPager } from './DocsPager'
import { PageStateThumb } from './PageStateThumb'
import { PropsTable, type PropRow } from './PropsTable'
import { RelatedCard } from './RelatedCard'
import { SignInPage } from './SignInPage'
import { Caption, Heading, Subhead } from './Text'
import { ViewportPreview } from './ViewportPreview'

const TREE: CompositionNode[] = [
  {
    label: 'Sign In Page',
    children: [
      {
        label: 'Auth Nav',
        href: '/components/auth-nav',
        note: '(Brand Logo, theme, Create one)',
      },
      { label: 'Brand Logo', href: '/components/brand-logo', note: '(mark)' },
      { label: 'Auth Brand', note: '(Sign In, subhead)' },
      { label: 'Text Field', href: '/components/text-field', note: '(Email or username)' },
      { label: 'Password Field', href: '/components/password-field' },
      { label: 'Password Reveal', href: '/components/password-reveal' },
      { label: 'Anchor', href: '/components/anchor', note: '(Forgot password?)' },
      { label: 'Button', href: '/components/button', note: '(Primary, full width)' },
      { label: 'Divider', href: '/components/divider', note: '("or")' },
      { label: 'Social Login Button', href: '/components/social-login', note: '(Roboticela, Passkey, Google)' },
      { label: 'Other Ways Button', href: '/components/social-login', note: '(Apple, Microsoft, GitHub, and more)' },
      { label: 'Anchor', href: '/components/anchor', note: '(Create one)' },
    ],
  },
]

const DATA: PropRow[] = [
  {
    name: 'onSubmit',
    type: '(payload: { email: string; password: string }) => void',
    required: 'Yes',
    defaultValue: '—',
    description: 'This function is triggered when someone submits their login information.',
  },
  {
    name: 'errorMessage',
    type: 'string',
    required: 'No',
    defaultValue: 'undefined',
    description: 'An error message that appears below the fields when sign in fails.',
  },
  {
    name: 'isLoading',
    type: 'boolean',
    required: 'No',
    defaultValue: 'false',
    description: 'Shows a loading indicator while the sign in process is happening.',
  },
  {
    name: 'locked',
    type: 'boolean',
    required: 'No',
    defaultValue: 'false',
    description: 'Temporarily prevents sign in attempts after multiple failed tries for security.',
  },
  {
    name: 'lastMethod',
    type: "'google' | 'passkey' | 'roboticela' | null",
    required: 'No',
    defaultValue: 'null',
    description: 'Remembers which sign in method the user used last time for convenience.',
  },
]

const REACT_SOURCE = `import { Anchor } from '@/components/Anchor'
import { AuthBrand, AuthLayout } from '@/components/AuthLayout'
import { AuthLegal } from '@/components/TextLink'
import { AuthProviderStack } from '@/components/AuthProviderButton'
import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { OtherWaysButton } from '@/components/OtherWaysButton'
import { PasswordField } from '@/components/PasswordField'
import {
  SOCIAL_LOGIN_MORE_PROVIDERS,
  SOCIAL_LOGIN_PRIMARY_PROVIDERS,
  SocialLoginButton,
} from '@/components/SocialLoginButton'
import { TextField } from '@/components/TextField'
import { DkChevronCaretLeft, DkEnvelopeMessageMail } from '@/icons'

export default function SignInPage({
  onSubmit,
  errorMessage,
  isLoading = false,
  lastMethod = null,
}) {
  const [more, setMore] = useState(false)

  return (
    <AuthLayout navLinkTo="/create-account" navLinkLabel="Create one">
      <AuthBrand title="Sign In" subhead="Use your DevKit Account" />
      {more ? (
        <>
          <AuthProviderStack className="gap-y-3">
            {SOCIAL_LOGIN_MORE_PROVIDERS.map((provider) => (
              <SocialLoginButton key={provider} provider={provider} />
            ))}
          </AuthProviderStack>
          <div className="mt-3">
            <OtherWaysButton icon={<DkChevronCaretLeft />} onClick={() => setMore(false)}>
              Back
            </OtherWaysButton>
          </div>
        </>
      ) : (
        <>
          <form className="mt-8 flex flex-col" noValidate onSubmit={...}>
            <TextField name="username" placeholder="Email or username" />
            <PasswordField name="password" />
            <Anchor href="/forgot-password">Forgot password?</Anchor>
            <Button type="submit" loading={isLoading}>Sign In</Button>
          </form>
          <Divider>or</Divider>
          <AuthProviderStack className="gap-y-3">
            {SOCIAL_LOGIN_PRIMARY_PROVIDERS.map((provider) => (
              <SocialLoginButton
                key={provider}
                provider={provider}
                lastUsed={lastMethod === provider}
              >
                {provider === 'passkey' ? 'Sign in with Passkey' : undefined}
              </SocialLoginButton>
            ))}
          </AuthProviderStack>
          <div className="mt-3">
            <OtherWaysButton onClick={() => setMore(true)} />
          </div>
        </>
      )}
    </AuthLayout>
  )
}
`

const BUILT_WITH = [
  { label: 'Brand Logo', href: '/components/brand-logo' },
  { label: 'Auth Nav', href: '/components/auth-nav' },
  { label: 'Anchor', href: '/components/anchor' },
  { label: 'Text Field', href: '/components/text-field' },
  { label: 'Password Field', href: '/components/password-field' },
  { label: 'Button', href: '/components/button' },
  { label: 'Divider', href: '/components/divider' },
  { label: 'Social Login Button', href: '/components/social-login' },
  { label: 'Other Ways Button', href: '/components/social-login' },
]

export function SignInDocs() {
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()
  const [state, setState] = useState<SignInPreviewState>('default')
  const src = `/sign-in?state=${state}&theme=${theme}`
  const fullHref = `/sign-in?state=${state}`

  function selectState(next: SignInPreviewState) {
    setState(next)
    const preview = document.getElementById('live-preview')
    preview?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <article>
      <header id="overview" className="scroll-mt-20 animate-docs-header-in motion-reduce:animate-none">
        <Caption>Pages / Auth / Sign In</Caption>
        <Heading className="mt-2">Sign In</Heading>
        <Subhead className="mt-2">
          A clean, secure sign in experience that offers multiple convenient options including email, passkey, and popular social providers.
        </Subhead>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Badge variant="outline" shape="rounded" tone="neutral">
            v1.2.0
          </Badge>
          <Caption as="span">Last updated Aug 29, 2026</Caption>
        </div>
        <BuiltWithChips className="mt-3" items={BUILT_WITH} />
      </header>

      <section id="live-preview" className="mt-8 scroll-mt-20">
        <ViewportPreview
          src={src}
          url={`${brand.supportLabel}/sign-in`}
          fullHref={fullHref}
          fadeKey={`${state}-${theme}`}
          onCopy={() => navigator.clipboard.writeText(REACT_SOURCE)}
          onSource={() => window.open('/sign-in', '_blank', 'noreferrer')}
        />
        <div id="code" className="scroll-mt-20">
          <CollapsibleCode code={REACT_SOURCE} fadeKey="react" />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          {SIGN_IN_STATES.map((item) => {
            const preview = resolveSignInPreview(item.id)
            return (
              <PageStateThumb
                key={item.id}
                label={item.label}
                selected={state === item.id}
                onClick={() => selectState(item.id)}
              >
                <div className="origin-top scale-[0.42] [width:238%]">
                  <SignInPage state={preview.state} lastMethod={preview.lastMethod} />
                </div>
              </PageStateThumb>
            )
          })}
        </div>
      </section>

      <section id="composition" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>How This Page Is Built</DocsSectionTitle>
        <CompositionTree tree={TREE} />
      </section>

      <section id="data" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Page Data</DocsSectionTitle>
        <PropsTable rows={DATA} />
      </section>

      <section className="mt-12">
        <DocsSectionTitle className="mb-3">Related</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-3 min-[735px]:grid-cols-3">
          <RelatedCard
            href="/pages/create-account"
            title="Create Account"
            description="New-user registration with the same auth nav and social providers."
          />
          <RelatedCard
            href="/pages/forgot-password"
            title="Forgot Password"
            description="Email a reset link when a password is lost."
          />
          <RelatedCard
            href="/pages/verification-code"
            title="Verification Code"
            description="Email OTP after a successful sign-in."
          />
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(PAGES_ITEMS, 'sign-in')} />
    </article>
  )
}
