'use client'

import { useState } from 'react'
import { DkSuccessCircleCheckmark } from '@/icons'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { brand } from '@/lib/devkit'
import {
  PAGES_ITEMS,
  RECOVERY_CODE_STATES,
  type RecoveryCodePreviewState,
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
import { RecoveryCodePage } from './RecoveryCodePage'
import { Caption, Heading, Subhead } from './Text'
import { ViewportPreview } from './ViewportPreview'

const TREE: CompositionNode[] = [
  {
    label: 'Recovery Code Page',
    children: [
      {
        label: 'Auth Nav',
        href: '/components/auth-nav',
        note: '(Brand Logo, theme, Sign in link)',
      },
      { label: 'Auth Brand', note: '(Key icon, title, subhead)' },
      { label: 'Recovery Input', href: '/components/recovery-input', note: '(XXXX-XXXX field)' },
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
    description: 'Called with the formatted recovery code when Verify is pressed.',
  },
  {
    name: 'errorMessage',
    type: 'string',
    required: 'No',
    defaultValue: 'undefined',
    description: 'Inline error shown under the recovery input after a failed attempt.',
  },
  {
    name: 'isLoading',
    type: 'boolean',
    required: 'No',
    defaultValue: 'false',
    description: 'Puts Verify in a verifying state and disables the input.',
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
import { RecoveryInput, recoveryPlaceholder } from '@/components/RecoveryInput'
import { Body } from '@/components/Text'
import { DkRoundKeyAccess } from '@/icons'

export default function RecoveryCodePage({
  email,
  onVerify,
  errorMessage,
  isLoading = false,
}) {
  return (
    <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
      <AuthBrand
        title="Enter Recovery Code"
        subhead="Use one of the one-time recovery codes you saved when turning on two-factor authentication."
        icon={<DkRoundKeyAccess size={44} strokeWidth={1.5} />}
      />
      <form className="mt-8 flex flex-col" noValidate onSubmit={...}>
        <RecoveryInput
          value={code}
          onChange={setCode}
          invalid={Boolean(errorMessage)}
          placeholder={recoveryPlaceholder()}
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
  { label: 'Recovery Input', href: '/components/recovery-input' },
  { label: 'Button', href: '/components/button' },
  { label: 'Anchor', href: '/components/anchor' },
]

export function RecoveryCodeDocs() {
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()
  const [state, setState] = useState<RecoveryCodePreviewState>('default')
  const src = `/recovery-code?state=${state}&theme=${theme}`
  const fullHref = `/recovery-code?state=${state}`

  function selectState(next: RecoveryCodePreviewState) {
    setState(next)
    const preview = document.getElementById('live-preview')
    preview?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <article>
      <header id="overview" className="scroll-mt-20 animate-docs-header-in motion-reduce:animate-none">
        <Caption>Pages / Auth / Recovery Code</Caption>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Heading>Recovery Code</Heading>
          <Badge tone="verified" icon={<DkSuccessCircleCheckmark strokeWidth={2.5} absoluteStrokeWidth />}>
            Stable
          </Badge>
        </div>
        <Subhead className="mt-2">
          Collect a one-time backup code when the person cannot use email, passkey, or an authenticator app.
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
          url={`${brand.supportLabel}/recovery-code`}
          fullHref={fullHref}
          fadeKey={`${state}-${theme}`}
          onCopy={() => navigator.clipboard.writeText(REACT_SOURCE)}
          onSource={() => window.open('/recovery-code', '_blank', 'noreferrer')}
        />
        <div id="code" className="scroll-mt-20">
          <CollapsibleCode code={REACT_SOURCE} fadeKey="react" />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          {RECOVERY_CODE_STATES.map((item) => (
            <PageStateThumb
              key={item.id}
              label={item.label}
              selected={state === item.id}
              onClick={() => selectState(item.id)}
            >
              <div className="origin-top scale-[0.42] [width:238%]">
                <RecoveryCodePage state={item.id} />
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
            description="Pick recovery code before this step."
          />
          <RelatedCard
            href="/pages/authenticator-code"
            title="Authenticator Code"
            description="TOTP entry when the authenticator app is available."
          />
          <RelatedCard
            href="/pages/save-recovery-codes"
            title="Save Recovery Codes"
            description="Where recovery codes are generated and saved after setup."
          />
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(PAGES_ITEMS, 'recovery-code')} />
    </article>
  )
}
