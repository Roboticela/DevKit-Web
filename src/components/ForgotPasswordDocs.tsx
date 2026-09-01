'use client'

import { useState } from 'react'
import { DkSuccessCircleCheckmark } from '@/icons'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { brand } from '@/lib/devkit'
import {
  FORGOT_PASSWORD_STATES,
  PAGES_ITEMS,
  type ForgotPasswordPreviewState,
} from '@/lib/pages-catalog'
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
import { ForgotPasswordPage } from './ForgotPasswordPage'
import { Caption, Heading, Subhead } from './Text'
import { ViewportPreview } from './ViewportPreview'

const TREE: CompositionNode[] = [
  {
    label: 'Forgot Password Page',
    children: [
      {
        label: 'Auth Nav',
        href: '/components/auth-nav',
        note: '(Brand Logo, theme, Sign in)',
      },
      { label: 'Brand Logo', href: '/components/brand-logo', note: '(mark)' },
      { label: 'Auth Brand', note: '(Forgot Password?, subhead)' },
      { label: 'Text Field', href: '/components/text-field', note: '(Email)' },
      { label: 'Button', href: '/components/button', note: '(Primary, full width)' },
      { label: 'Other Ways Button', href: '/components/social-login', note: '(Back to Sign In)' },
      { label: 'Auth Legal', note: '(Terms, Privacy Policy)' },
    ],
  },
]

const DATA: PropRow[] = [
  {
    name: 'onSubmit',
    type: '(payload: { email: string }) => void',
    required: 'Yes',
    defaultValue: '—',
    description: 'Called with the email when Continue is pressed.',
  },
  {
    name: 'errorMessage',
    type: 'string',
    required: 'No',
    defaultValue: 'undefined',
    description: 'Inline error shown under the field after a failed attempt.',
  },
  {
    name: 'isLoading',
    type: 'boolean',
    required: 'No',
    defaultValue: 'false',
    description: 'Puts the primary button in a continuing state and disables the field.',
  },
]

const REACT_SOURCE = `import { AuthBrand, AuthLayout } from '@/components/AuthLayout'
import { AuthLegal } from '@/components/TextLink'
import { Button } from '@/components/Button'
import { OtherWaysButton } from '@/components/OtherWaysButton'
import { TextField } from '@/components/TextField'
import { DkEnvelopeMessageMail } from '@/icons'

export default function ForgotPasswordPage({
  onSubmit,
  errorMessage,
  isLoading = false,
}) {
  return (
    <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
      <AuthBrand
        title="Forgot Password?"
        subhead="Enter your email, then verify it's you to reset your password."
        narrowSubhead
      />
      <form className="mt-8 flex flex-col" noValidate onSubmit={...}>
        <TextField name="email" placeholder="Email" autoComplete="email" />
        <Button type="submit" loading={isLoading} loadingText="Continuing…">
          Continue
        </Button>
      </form>
      <OtherWaysButton href="/sign-in" />
    </AuthLayout>
  )
}
`

const BUILT_WITH = [
  { label: 'Brand Logo', href: '/components/brand-logo' },
  { label: 'Auth Nav', href: '/components/auth-nav' },
  { label: 'Other Ways Button', href: '/components/social-login' },
  { label: 'Text Field', href: '/components/text-field' },
  { label: 'Button', href: '/components/button' },
]

export function ForgotPasswordDocs() {
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()
  const [state, setState] = useState<ForgotPasswordPreviewState>('default')
  const src = `/forgot-password?state=${state}&theme=${theme}`
  const fullHref = `/forgot-password?state=${state}`

  function selectState(next: ForgotPasswordPreviewState) {
    setState(next)
    const preview = document.getElementById('live-preview')
    preview?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <article>
      <header id="overview" className="scroll-mt-20 animate-docs-header-in motion-reduce:animate-none">
        <Caption>Pages / Auth / Forgot Password</Caption>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Heading>Forgot Password</Heading>
          <Badge tone="verified" icon={<DkSuccessCircleCheckmark strokeWidth={2.5} absoluteStrokeWidth />}>
            Stable
          </Badge>
        </div>
        <Subhead className="mt-2">
          Collect an email, then continue to verification so the person can reset their password.
        </Subhead>
        <DocsMetaBadges showStatus={false} />
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
          url={`${brand.supportLabel}/forgot-password`}
          fullHref={fullHref}
          fadeKey={`${state}-${theme}`}
          onCopy={() => navigator.clipboard.writeText(REACT_SOURCE)}
          onSource={() => window.open('/forgot-password', '_blank', 'noreferrer')}
        />
        <div id="code" className="scroll-mt-20">
          <CollapsibleCode code={REACT_SOURCE} fadeKey="react" />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          {FORGOT_PASSWORD_STATES.map((item) => (
            <PageStateThumb
              key={item.id}
              label={item.label}
              selected={state === item.id}
              onClick={() => selectState(item.id)}
            >
              <div className="origin-top scale-[0.42] [width:238%]">
                <ForgotPasswordPage state={item.id} />
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
            href="/pages/sign-in"
            title="Sign In"
            description="The page that links here when a password is lost."
          />
          <RelatedCard
            href="/pages/reset-password"
            title="Reset Password"
            description="Choose a new password after verification succeeds."
          />
          <RelatedCard
            href="/pages/verification-code"
            title="Verification Code"
            description="Email OTP after the reset email is submitted."
          />
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(PAGES_ITEMS, 'forgot-password')} />
    </article>
  )
}
