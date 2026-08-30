'use client'

import { useState } from 'react'
import { DkSuccessCircleCheckmark } from '@/icons'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { brand } from '@/lib/devkit'
import { PAGES_ITEMS, SIGN_IN_STATES, type SignInPreviewState } from '@/lib/pages-catalog'
import { adjacentDocs } from '@/lib/docs-catalog'
import { useTheme } from '@/lib/theme'
import { Badge } from './Badge'
import { BuiltWithChips } from './BuiltWithChips'
import { CollapsibleCode } from './CollapsibleCode'
import { CompositionTree, type CompositionNode } from './CompositionTree'
import { DocsMetaBadges, DocsSectionTitle } from './DocsCopy'
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
        note: '(logo, theme, Create one)',
      },
      { label: 'Auth Brand', note: '(logo, headline, subhead)' },
      { label: 'Text Field', href: '/components/text-field', note: '(Email)' },
      { label: 'Password Field', href: '/components/password-field' },
      { label: 'Password Reveal', href: '/components/password-reveal' },
      { label: 'Anchor', href: '/components/anchor', note: '(Forgot password?)' },
      { label: 'Button', href: '/components/button', note: '(Primary, full width)' },
      { label: 'Divider', href: '/components/divider', note: '("or continue with")' },
      { label: 'Social Login Buttons', href: '/components/social-login', note: '(Google, Apple, GitHub)' },
      { label: 'Anchor', href: '/components/anchor', note: '(Create account)' },
    ],
  },
]

const DATA: PropRow[] = [
  {
    name: 'onSubmit',
    type: '(payload: { email: string; password: string }) => void',
    required: 'Yes',
    defaultValue: '—',
    description: 'Called with email and password when the form is submitted.',
  },
  {
    name: 'errorMessage',
    type: 'string',
    required: 'No',
    defaultValue: 'undefined',
    description: 'Inline error shown under the fields after a failed attempt.',
  },
  {
    name: 'isLoading',
    type: 'boolean',
    required: 'No',
    defaultValue: 'false',
    description: 'Puts the primary button in a signing-in state and disables inputs.',
  },
  {
    name: 'locked',
    type: 'boolean',
    required: 'No',
    defaultValue: 'false',
    description: 'Blocks the form after too many attempts and shows a lockout message.',
  },
  {
    name: 'ssoProviders',
    type: "Array<'google' | 'apple' | 'github'>",
    required: 'No',
    defaultValue: "['google', 'apple', 'github']",
    description: 'Which social login buttons to render under the divider.',
  },
]

const REACT_SOURCE = `import { Anchor } from '@/components/Anchor'
import { AuthBrand, AuthLayout } from '@/components/AuthLayout'
import { AuthLegal } from '@/components/TextLink'
import { AuthProviderStack } from '@/components/AuthProviderButton'
import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { GitHubButton } from '@/components/GitHubButton'
import { GoogleButton } from '@/components/GoogleButton'
import { AppleButton } from '@/components/ProviderButtons'
import { PasswordField } from '@/components/PasswordField'
import { TextField } from '@/components/TextField'
import { DkEnvelopeMessageMail } from '@/icons'

export default function SignInPage({
  onSubmit,
  errorMessage,
  isLoading = false,
  ssoProviders = ['google', 'apple', 'github'],
}) {
  return (
    <AuthLayout navLinkTo="/create-account" navLinkLabel="Create one">
      <AuthBrand title="Welcome back" subhead="Use your DevKit Account" />
      <form
        className="mt-8 flex flex-col"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit?.(Object.fromEntries(new FormData(event.currentTarget)))
        }}
      >
        <div className="flex flex-col gap-4">
          <TextField
            icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
            name="email"
            type="email"
            placeholder="Email address"
          />
          <PasswordField name="password" placeholder="Password" />
        </div>
        <Anchor href="/forgot-password" className="mt-3 self-end text-sm">
          Forgot password?
        </Anchor>
        {errorMessage ? <p className="text-danger">{errorMessage}</p> : null}
        <Button className="mt-6" type="submit" loading={isLoading}>
          Sign In
        </Button>
        <Divider>or continue with</Divider>
        <AuthProviderStack className="gap-y-3">
          {ssoProviders.includes('google') ? <GoogleButton /> : null}
          {ssoProviders.includes('apple') ? <AppleButton /> : null}
          {ssoProviders.includes('github') ? <GitHubButton /> : null}
        </AuthProviderStack>
        <p className="mt-6 text-center text-sm">
          Don't have an account? <Anchor href="/create-account">Create account</Anchor>
        </p>
        <AuthLegal />
      </form>
    </AuthLayout>
  )
}
`

const BUILT_WITH = [
  { label: 'Auth Nav', href: '/components/auth-nav' },
  { label: 'Anchor', href: '/components/anchor' },
  { label: 'Text Field', href: '/components/text-field' },
  { label: 'Password Field', href: '/components/password-field' },
  { label: 'Button', href: '/components/button' },
  { label: 'Divider', href: '/components/divider' },
  { label: 'Social Login Button', href: '/components/social-login' },
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
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Heading>Sign In</Heading>
          <Badge tone="verified" icon={<DkSuccessCircleCheckmark strokeWidth={2.5} absoluteStrokeWidth />}>
            Stable
          </Badge>
        </div>
        <Subhead className="mt-2">
          A minimal authentication page with email/password and social login.
        </Subhead>
        <DocsMetaBadges showStatus={false} />
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
          {SIGN_IN_STATES.map((item) => (
            <PageStateThumb
              key={item.id}
              label={item.label}
              selected={state === item.id}
              onClick={() => selectState(item.id)}
            >
              <div className="origin-top scale-[0.42] [width:238%]">
                <SignInPage state={item.id} />
              </div>
            </PageStateThumb>
          ))}
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
            description="New-user registration with the same auth nav."
          />
          <RelatedCard
            href="/pages/forgot-password"
            title="Forgot Password"
            description="Email a reset link when a password is lost."
          />
          <RelatedCard
            href="/pages/otp-verification"
            title="Two-Factor Auth"
            description="OTP verification after a successful sign-in."
          />
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(PAGES_ITEMS, 'sign-in')} />
    </article>
  )
}
