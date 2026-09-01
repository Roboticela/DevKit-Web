'use client'

import { useState } from 'react'
import { DkSuccessCircleCheckmark } from '@/icons'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { brand } from '@/lib/devkit'
import {
  AUTHENTICATOR_CODE_STATES,
  PAGES_ITEMS,
  type AuthenticatorCodePreviewState,
} from '@/lib/pages-catalog'
import { adjacentDocs } from '@/lib/docs-catalog'
import { useTheme } from '@/lib/theme'
import { Badge } from './Badge'
import { BuiltWithChips } from './BuiltWithChips'
import { CollapsibleCode } from './CollapsibleCode'
import { CompositionTree, type CompositionNode } from './CompositionTree'
import { DocsMetaBadges, DocsSectionTitle } from './DocsCopy'
import { DocsPager } from './DocsPager'
import { AuthenticatorCodePage } from './AuthenticatorCodePage'
import { PageStateThumb } from './PageStateThumb'
import { PropsTable, type PropRow } from './PropsTable'
import { RelatedCard } from './RelatedCard'
import { Caption, Heading, Subhead } from './Text'
import { ViewportPreview } from './ViewportPreview'

const TREE: CompositionNode[] = [
  {
    label: 'Authenticator Code Page',
    children: [
      {
        label: 'Auth Nav',
        href: '/components/auth-nav',
        note: '(Brand Logo, theme, Sign in link)',
      },
      { label: 'Auth Brand', note: '(Phone icon, title, subhead)' },
      { label: 'OTP Boxes', href: '/components/otp-boxes', note: '(6-digit code)' },
      { label: 'Button', href: '/components/button', note: '(Primary, full width)' },
      { label: 'Anchor', href: '/components/anchor', note: '(Try another way)' },
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
    name: 'email',
    type: 'string',
    required: 'Yes',
    defaultValue: '—',
    description: 'Used for the Try another way link back to method selection.',
  },
]

const REACT_SOURCE = `import { AuthBrand, AuthLayout } from '@/components/AuthLayout'
import { Anchor } from '@/components/Anchor'
import { Button } from '@/components/Button'
import { OtpBoxes } from '@/components/OtpBoxes'
import { Body } from '@/components/Text'
import { DkHandheldMobilePhone } from '@/icons'

export default function AuthenticatorCodePage({
  email,
  onVerify,
  errorMessage,
  isLoading = false,
}) {
  return (
    <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
      <AuthBrand
        title="Authenticator Code"
        subhead="Enter the 6-digit code from your authenticator app."
        icon={<DkHandheldMobilePhone size={44} strokeWidth={1.5} />}
      />
      <form className="mt-8 flex flex-col" noValidate onSubmit={...}>
        <OtpBoxes
          value={digits}
          onChange={setDigits}
          invalid={Boolean(errorMessage)}
        />
        <Button type="submit" loading={isLoading} loadingText="Verifying…">
          Verify
        </Button>
      </form>
      <Body size="sm" align="center" tone="tertiary" className="mt-4">
        <Anchor href="/choose-verification-method" variant="subtle">
          Try another way
        </Anchor>
      </Body>
    </AuthLayout>
  )
}
`

const BUILT_WITH = [
  { label: 'Auth Nav', href: '/components/auth-nav' },
  { label: 'OTP Boxes', href: '/components/otp-boxes' },
  { label: 'Button', href: '/components/button' },
  { label: 'Anchor', href: '/components/anchor' },
]

export function AuthenticatorCodeDocs() {
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()
  const [state, setState] = useState<AuthenticatorCodePreviewState>('default')
  const src = `/authenticator-code?state=${state}&theme=${theme}`
  const fullHref = `/authenticator-code?state=${state}`

  function selectState(next: AuthenticatorCodePreviewState) {
    setState(next)
    const preview = document.getElementById('live-preview')
    preview?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <article>
      <header id="overview" className="scroll-mt-20 animate-docs-header-in motion-reduce:animate-none">
        <Caption>Pages / Auth / Authenticator Code</Caption>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Heading>Authenticator Code</Heading>
          <Badge tone="verified" icon={<DkSuccessCircleCheckmark strokeWidth={2.5} absoluteStrokeWidth />}>
            Stable
          </Badge>
        </div>
        <Subhead className="mt-2">
          Collect a 6-digit TOTP code from Google Authenticator or a similar app during sign-in or identity
          verification.
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
          url={`${brand.supportLabel}/authenticator-code`}
          fullHref={fullHref}
          fadeKey={`${state}-${theme}`}
          onCopy={() => navigator.clipboard.writeText(REACT_SOURCE)}
          onSource={() => window.open('/authenticator-code', '_blank', 'noreferrer')}
        />
        <div id="code" className="scroll-mt-20">
          <CollapsibleCode code={REACT_SOURCE} fadeKey="react" />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          {AUTHENTICATOR_CODE_STATES.map((item) => (
            <PageStateThumb
              key={item.id}
              label={item.label}
              selected={state === item.id}
              onClick={() => selectState(item.id)}
            >
              <div className="origin-top scale-[0.42] [width:238%]">
                <AuthenticatorCodePage state={item.id} />
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
            description="Pick authenticator app before this step."
          />
          <RelatedCard
            href="/pages/verification-code"
            title="Verification Code"
            description="Email OTP when Email is chosen instead."
          />
          <RelatedCard
            href="/pages/setup-2fa"
            title="Setup Two-Factor"
            description="Where the authenticator app is first linked to the account."
          />
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(PAGES_ITEMS, 'authenticator-code')} />
    </article>
  )
}
