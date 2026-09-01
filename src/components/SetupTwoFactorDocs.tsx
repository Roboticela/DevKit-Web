'use client'

import { useState } from 'react'
import { DkSuccessCircleCheckmark } from '@/icons'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { brand } from '@/lib/devkit'
import {
  PAGES_ITEMS,
  SETUP_TWO_FACTOR_STATES,
  type SetupTwoFactorPreviewState,
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
import { SetupTwoFactorPage } from './SetupTwoFactorPage'
import { Caption, Heading, Subhead } from './Text'
import { ViewportPreview } from './ViewportPreview'

const TREE: CompositionNode[] = [
  {
    label: 'Setup Two-Factor Page',
    children: [
      {
        label: 'Auth Nav',
        href: '/components/auth-nav',
        note: '(Brand Logo, theme, Settings link)',
      },
      { label: 'Auth Brand', note: '(Phone icon, title, subhead)' },
      { label: 'TOTP Manual Key', href: '/components/totp-manual-key', note: '(Copyable secret)' },
      { label: 'OTP Boxes', href: '/components/otp-boxes', note: '(6-digit verification)' },
      { label: 'Recovery Input', href: '/components/recovery-input', note: '(Recovery codes list)' },
      { label: 'Button', href: '/components/button', note: '(Save, Continue)' },
    ],
  },
]

const DATA: PropRow[] = [
  {
    name: 'onSave',
    type: '(code: string) => void',
    required: 'Yes',
    defaultValue: '—',
    description: 'Called with the first 6-digit code after the QR scan to confirm setup.',
  },
  {
    name: 'onContinue',
    type: '() => void',
    required: 'No',
    defaultValue: 'undefined',
    description: 'Called when the person finishes saving recovery codes.',
  },
  {
    name: 'secret',
    type: 'string',
    required: 'Yes',
    defaultValue: '—',
    description: 'The TOTP secret shown under the QR code for manual entry.',
  },
  {
    name: 'recoveryCodes',
    type: 'string[]',
    required: 'No',
    defaultValue: 'undefined',
    description: 'One-time backup codes shown after successful setup.',
  },
]

const REACT_SOURCE = `import { AuthBrand, AuthLayout, AuthSuccess } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { FieldLabel } from '@/components/FieldLabel'
import { OtpBoxes } from '@/components/OtpBoxes'
import { RecoveryCodesList } from '@/components/RecoveryInput'
import { TotpManualKey } from '@/components/TotpManualKey'
import { DkHandheldMobilePhone } from '@/icons'

export default function SetupTwoFactorPage({ secret, qrSrc, onSave, recoveryCodes }) {
  return (
    <AuthLayout navLinkTo="/pages/settings" navLinkLabel="Settings">
      <AuthBrand
        title="Set Up Authenticator"
        subhead="Scan the QR code, then enter a code."
        icon={<DkHandheldMobilePhone size={44} strokeWidth={1.5} />}
      />
      <img src={qrSrc} alt="Authenticator QR code" width={180} height={180} />
      <TotpManualKey secret={secret} />
      <FieldLabel>Verification code</FieldLabel>
      <OtpBoxes value={digits} onChange={setDigits} />
      <Button type="submit" loading={isSaving} loadingText="Saving…">Save</Button>
      <RecoveryCodesList copyable codes={recoveryCodes} />
    </AuthLayout>
  )
}
`

const BUILT_WITH = [
  { label: 'Auth Nav', href: '/components/auth-nav' },
  { label: 'TOTP Manual Key', href: '/components/totp-manual-key' },
  { label: 'OTP Boxes', href: '/components/otp-boxes' },
  { label: 'Recovery Input', href: '/components/recovery-input' },
  { label: 'Button', href: '/components/button' },
]

export function SetupTwoFactorDocs() {
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()
  const [state, setState] = useState<SetupTwoFactorPreviewState>('default')
  const src = `/setup-2fa?state=${state}&theme=${theme}`
  const fullHref = `/setup-2fa?state=${state}`

  function selectState(next: SetupTwoFactorPreviewState) {
    setState(next)
    const preview = document.getElementById('live-preview')
    preview?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <article>
      <header id="overview" className="scroll-mt-20 animate-docs-header-in motion-reduce:animate-none">
        <Caption>Pages / Auth / Setup Two-Factor</Caption>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Heading>Setup Two-Factor</Heading>
          <Badge tone="verified" icon={<DkSuccessCircleCheckmark strokeWidth={2.5} absoluteStrokeWidth />}>
            Stable
          </Badge>
        </div>
        <Subhead className="mt-2">
          Walk someone through linking an authenticator app, confirming the first code, and saving recovery
          codes.
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
          url={`${brand.supportLabel}/setup-2fa`}
          fullHref={fullHref}
          fadeKey={`${state}-${theme}`}
          onCopy={() => navigator.clipboard.writeText(REACT_SOURCE)}
          onSource={() => window.open('/setup-2fa', '_blank', 'noreferrer')}
        />
        <div id="code" className="scroll-mt-20">
          <CollapsibleCode code={REACT_SOURCE} fadeKey="react" />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          {SETUP_TWO_FACTOR_STATES.map((item) => (
            <PageStateThumb
              key={item.id}
              label={item.label}
              selected={state === item.id}
              onClick={() => selectState(item.id)}
            >
              <div className="origin-top scale-[0.42] [width:238%]">
                <SetupTwoFactorPage state={item.id} />
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
            href="/pages/authenticator-code"
            title="Authenticator Code"
            description="Enter a TOTP code after setup during sign-in."
          />
          <RelatedCard
            href="/pages/recovery-code"
            title="Recovery Code"
            description="Use a saved backup code when the authenticator is unavailable."
          />
          <RelatedCard
            href="/pages/settings"
            title="Settings"
            description="Where authenticator setup is started from Security."
          />
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(PAGES_ITEMS, 'setup-2fa')} />
    </article>
  )
}
