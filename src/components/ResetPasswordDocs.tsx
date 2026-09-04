'use client'

import { useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { brand } from '@/lib/devkit'
import {
  PAGES_ITEMS,
  RESET_PASSWORD_STATES,
  type ResetPasswordPreviewState,
} from '@/lib/pages-catalog'
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
import { ResetPasswordPage } from './ResetPasswordPage'
import { Caption, Heading, Subhead } from './Text'
import { ViewportPreview } from './ViewportPreview'

const TREE: CompositionNode[] = [
  {
    label: 'Reset Password Page',
    children: [
      {
        label: 'Auth Nav',
        href: '/components/auth-nav',
        note: '(Brand Logo, theme, Sign in)',
      },
      { label: 'Brand Logo', href: '/components/brand-logo', note: '(mark)' },
      { label: 'Auth Brand', note: '(Reset Password, subhead)' },
      { label: 'Password Field', href: '/components/password-field', note: '(New password)' },
      { label: 'Password Reveal', href: '/components/password-reveal' },
      { label: 'Text Field', href: '/components/text-field', note: '(Confirm password)' },
      { label: 'Button', href: '/components/button', note: '(Primary, full width)' },
      { label: 'Auth Legal', note: '(Terms, Privacy Policy)' },
    ],
  },
]

const DATA: PropRow[] = [
  {
    name: 'onSubmit',
    type: '(payload: { password: string; confirm: string }) => void',
    required: 'Yes',
    defaultValue: '—',
    description: 'Called with the new password when Save New Password is pressed.',
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
    description: 'Puts the primary button in a saving state and disables the fields.',
  },
]

const REACT_SOURCE = `import { AuthBrand, AuthLayout, AuthSuccess } from '@/components/AuthLayout'
import { AuthLegal } from '@/components/TextLink'
import { Button } from '@/components/Button'
import { PasswordField } from '@/components/PasswordField'
import { TextField } from '@/components/TextField'

export default function ResetPasswordPage({
  onSubmit,
  errorMessage,
  isLoading = false,
}) {
  return (
    <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
      <AuthBrand
        title="Reset Password"
        subhead="Choose a new password for your account."
        narrowSubhead
      />
      <form className="mt-8 flex flex-col" noValidate onSubmit={...}>
        <PasswordField name="password" placeholder="New password" autoComplete="new-password" />
        <TextField type="password" name="confirm" placeholder="Confirm password" />
        <Button type="submit" loading={isLoading} loadingText="Saving…">
          Save New Password
        </Button>
      </form>
      <AuthLegal />
    </AuthLayout>
  )
}
`

const BUILT_WITH = [
  { label: 'Brand Logo', href: '/components/brand-logo' },
  { label: 'Auth Nav', href: '/components/auth-nav' },
  { label: 'Password Field', href: '/components/password-field' },
  { label: 'Password Reveal', href: '/components/password-reveal' },
  { label: 'Text Field', href: '/components/text-field' },
  { label: 'Button', href: '/components/button' },
]

export function ResetPasswordDocs() {
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()
  const [state, setState] = useState<ResetPasswordPreviewState>('default')
  const src = `/reset-password?state=${state}&theme=${theme}`
  const fullHref = `/reset-password?state=${state}`

  function selectState(next: ResetPasswordPreviewState) {
    setState(next)
    const preview = document.getElementById('live-preview')
    preview?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <article>
      <header id="overview" className="scroll-mt-20 animate-docs-header-in motion-reduce:animate-none">
        <Caption>Pages / Auth / Reset Password</Caption>
        <Heading className="mt-2">Reset Password</Heading>
        <Subhead className="mt-2">
          Choose a new password after verification, then continue to the account.
        </Subhead>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Badge variant="outline" shape="rounded" tone="neutral">
            v1.0.0
          </Badge>
          <Caption as="span">Last updated Aug 31, 2026</Caption>
        </div>
        <BuiltWithChips className="mt-3" items={BUILT_WITH} />
      </header>

      <section id="live-preview" className="mt-8 scroll-mt-20">
        <ViewportPreview
          src={src}
          url={`${brand.supportLabel}/reset-password`}
          fullHref={fullHref}
          fadeKey={`${state}-${theme}`}
          onCopy={() => navigator.clipboard.writeText(REACT_SOURCE)}
          onSource={() => window.open('/reset-password', '_blank', 'noreferrer')}
        />
        <div id="code" className="scroll-mt-20">
          <CollapsibleCode code={REACT_SOURCE} fadeKey="react" />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          {RESET_PASSWORD_STATES.map((item) => (
            <PageStateThumb
              key={item.id}
              label={item.label}
              selected={state === item.id}
              onClick={() => selectState(item.id)}
            >
              <div className="origin-top scale-[0.42] [width:238%]">
                <ResetPasswordPage state={item.id} />
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
            href="/pages/forgot-password"
            title="Forgot Password"
            description="The page that starts this flow by collecting an email."
          />
          <RelatedCard
            href="/pages/sign-in"
            title="Sign In"
            description="The page people return to after a password is updated."
          />
          <RelatedCard
            href="/pages/verification-code"
            title="Verification Code"
            description="Email OTP that runs before this page is allowed."
          />
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(PAGES_ITEMS, 'reset-password')} />
    </article>
  )
}
