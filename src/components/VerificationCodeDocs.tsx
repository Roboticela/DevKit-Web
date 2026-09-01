'use client'

import { useState } from 'react'
import { DkSuccessCircleCheckmark } from '@/icons'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { brand } from '@/lib/devkit'
import {
  PAGES_ITEMS,
  VERIFICATION_CODE_STATES,
  type VerificationCodePreviewState,
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
import { Caption, Heading, Subhead } from './Text'
import { VerificationCodePage } from './VerificationCodePage'
import { ViewportPreview } from './ViewportPreview'

const TREE: CompositionNode[] = [
  {
    label: 'Verification Code Page',
    children: [
      {
        label: 'Auth Nav',
        href: '/components/auth-nav',
        note: '(Brand Logo, theme)',
      },
      { label: 'Auth Brand', note: '(Lock icon, title, subhead)' },
      { label: 'Label', href: '/components/text', note: '(Email destination)' },
      { label: 'OTP Boxes', href: '/components/otp-boxes', note: '(6-digit code)' },
      { label: 'Anchor', href: '/components/anchor', note: '(Resend, Try another way)' },
      { label: 'Button', href: '/components/button', note: '(Primary, full width)' },
    ],
  },
]

const DATA: PropRow[] = [
  {
    name: 'onVerify',
    type: '(code: string) => void',
    required: 'Yes',
    defaultValue: '—',
    description: 'Called with the full code when Verify is pressed or the last digit is entered.',
  },
  {
    name: 'onResend',
    type: '() => void',
    required: 'No',
    defaultValue: 'undefined',
    description: 'Called when the person asks for a new code.',
  },
  {
    name: 'errorMessage',
    type: 'string',
    required: 'No',
    defaultValue: 'undefined',
    description: 'Inline error shown under the OTP boxes after a failed attempt.',
  },
  {
    name: 'isLoading',
    type: 'boolean',
    required: 'No',
    defaultValue: 'false',
    description: 'Puts Verify in a verifying state and disables the OTP boxes.',
  },
  {
    name: 'purpose',
    type: "'sign_in' | 'reset_password'",
    required: 'No',
    defaultValue: "'sign_in'",
    description: 'Changes the title and subhead for password-reset verification.',
  },
]

const REACT_SOURCE = `import { AuthBrand, AuthLayout } from '@/components/AuthLayout'
import { Anchor } from '@/components/Anchor'
import { Button } from '@/components/Button'
import { OtpBoxes } from '@/components/OtpBoxes'
import { Body, Label } from '@/components/Text'
import { DkPadlockSecureClosed } from '@/icons'

export default function VerificationCodePage({
  email,
  onVerify,
  onResend,
  errorMessage,
  isLoading = false,
}) {
  return (
    <AuthLayout>
      <AuthBrand
        title="Enter Verification Code"
        icon={<DkPadlockSecureClosed size={44} strokeWidth={1.5} />}
      />
      <Body size="sm" align="center" className="mx-auto mt-2 max-w-[360px]">
        Enter the 6-digit code sent to <Label as="span">{email}</Label>.
      </Body>
      <form className="mt-8 flex flex-col" noValidate onSubmit={...}>
        <OtpBoxes value={digits} onChange={setDigits} invalid={Boolean(errorMessage)} />
        <Anchor href="#" variant="subtle">Didn't receive a code? Resend</Anchor>
        <Button type="submit" loading={isLoading} loadingText="Verifying…">
          Verify
        </Button>
      </form>
      <Anchor href="/choose-verification-method" variant="subtle">Try another way</Anchor>
    </AuthLayout>
  )
}
`

const BUILT_WITH = [
  { label: 'Auth Nav', href: '/components/auth-nav' },
  { label: 'OTP Boxes', href: '/components/otp-boxes' },
  { label: 'Anchor', href: '/components/anchor' },
  { label: 'Button', href: '/components/button' },
  { label: 'Text', href: '/components/text' },
]

export function VerificationCodeDocs() {
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()
  const [state, setState] = useState<VerificationCodePreviewState>('default')
  const src = `/verification-code?state=${state}&theme=${theme}`
  const fullHref = `/verification-code?state=${state}`

  function selectState(next: VerificationCodePreviewState) {
    setState(next)
    const preview = document.getElementById('live-preview')
    preview?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <article>
      <header id="overview" className="scroll-mt-20 animate-docs-header-in motion-reduce:animate-none">
        <Caption>Pages / Auth / Verification Code</Caption>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Heading>Verification Code</Heading>
          <Badge tone="verified" icon={<DkSuccessCircleCheckmark strokeWidth={2.5} absoluteStrokeWidth />}>
            Stable
          </Badge>
        </div>
        <Subhead className="mt-2">
          Collect a 6-digit email code after sign-in, account creation, or password reset.
        </Subhead>
        <DocsMetaBadges showStatus={false} />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Badge variant="outline" shape="rounded" tone="neutral">
            v1.0.0
          </Badge>
          <Caption as="span">Last updated Sep 1, 2026</Caption>
        </div>
        <BuiltWithChips className="mt-3" items={BUILT_WITH} />
      </header>

      <section id="live-preview" className="mt-8 scroll-mt-20">
        <ViewportPreview
          src={src}
          url={`${brand.supportLabel}/verification-code`}
          fullHref={fullHref}
          fadeKey={`${state}-${theme}`}
          onCopy={() => navigator.clipboard.writeText(REACT_SOURCE)}
          onSource={() => window.open('/verification-code', '_blank', 'noreferrer')}
        />
        <div id="code" className="scroll-mt-20">
          <CollapsibleCode code={REACT_SOURCE} fadeKey="react" />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          {VERIFICATION_CODE_STATES.map((item) => (
            <PageStateThumb
              key={item.id}
              label={item.label}
              selected={state === item.id}
              onClick={() => selectState(item.id)}
            >
              <div className="origin-top scale-[0.42] [width:238%]">
                <VerificationCodePage state={item.id} />
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
            href="/pages/choose-verification-method"
            title="Choose Verification Method"
            description="Pick email, passkey, authenticator, or another method before this step."
          />
          <RelatedCard
            href="/pages/sign-in"
            title="Sign In"
            description="The flow that sends a code here when a second factor is required."
          />
          <RelatedCard
            href="/pages/reset-password"
            title="Reset Password"
            description="Password reset continues here after email verification."
          />
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(PAGES_ITEMS, 'verification-code')} />
    </article>
  )
}
