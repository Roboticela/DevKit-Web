'use client'

import { useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { brand } from '@/lib/devkit'
import {
  CHOOSE_VERIFICATION_METHOD_STATES,
  PAGES_ITEMS,
  type ChooseVerificationMethodPreviewState,
} from '@/lib/pages-catalog'
import { adjacentDocs } from '@/lib/docs-catalog'
import { useTheme } from '@/lib/theme'
import { Badge } from './Badge'
import { BuiltWithChips } from './BuiltWithChips'
import { ChooseVerificationMethodPage } from './ChooseVerificationMethodPage'
import { CollapsibleCode } from './CollapsibleCode'
import { CompositionTree, type CompositionNode } from './CompositionTree'
import { DocsSectionTitle } from './DocsCopy'
import { DocsPager } from './DocsPager'
import { PageStateThumb } from './PageStateThumb'
import { PropsTable, type PropRow } from './PropsTable'
import { RelatedCard } from './RelatedCard'
import { Caption, Heading, Subhead } from './Text'
import { ViewportPreview } from './ViewportPreview'

const TREE: CompositionNode[] = [
  {
    label: 'Choose Verification Method Page',
    children: [
      {
        label: 'Auth Nav',
        href: '/components/auth-nav',
        note: '(Brand Logo, theme, Sign in)',
      },
      { label: 'Auth Brand', note: '(Shield icon, title, subhead)' },
      { label: 'Radio Group', href: '/components/radio', note: '(Verification method list)' },
      {
        label: 'Verification Method Card',
        href: '/components/verification-method',
        note: '(Email, Passkey, Authenticator, Recovery, Device)',
      },
      { label: 'Button', href: '/components/button', note: '(Primary, full width)' },
      { label: 'Anchor', href: '/components/anchor', note: '(Need help signing in?)' },
    ],
  },
]

const DATA: PropRow[] = [
  {
    name: 'onContinue',
    type: '(method: VerificationMethodId) => void',
    required: 'Yes',
    defaultValue: '—',
    description: 'Called with the selected method when Continue is pressed.',
  },
  {
    name: 'availability',
    type: 'VerificationMethodAvailability',
    required: 'No',
    defaultValue: 'email, passkey, authenticator enabled',
    description: 'Which methods are available for the current account.',
  },
  {
    name: 'errorMessage',
    type: 'string',
    required: 'No',
    defaultValue: 'undefined',
    description: 'Inline error shown under the method list after a failed attempt.',
  },
  {
    name: 'isLoading',
    type: 'boolean',
    required: 'No',
    defaultValue: 'false',
    description: 'Puts Continue in a continuing state and disables method selection.',
  },
]

const REACT_SOURCE = `import { AuthBrand, AuthLayout } from '@/components/AuthLayout'
import { Anchor } from '@/components/Anchor'
import { Button } from '@/components/Button'
import { RadioGroup } from '@/components/Radio'
import { Body } from '@/components/Text'
import { VerificationMethodCard } from '@/components/VerificationMethodCard'
import { DkSecurityShieldProtect } from '@/icons'

export default function ChooseVerificationMethodPage({
  availability,
  onContinue,
  errorMessage,
  isLoading = false,
}) {
  return (
    <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
      <AuthBrand
        title="Choose a Verification Method"
        subhead="Select how you'd like to verify it's you."
        icon={<DkSecurityShieldProtect size={56} strokeWidth={1.5} />}
      />
      <form className="mt-8 flex flex-col" noValidate onSubmit={...}>
        <RadioGroup label="Verification method" className="gap-3">
          <VerificationMethodCard ... />
        </RadioGroup>
        <Button type="submit" loading={isLoading} loadingText="Continuing…">
          Continue
        </Button>
      </form>
      <Body size="sm" align="center" tone="tertiary" className="mt-4">
        <Anchor href="/help/authentication/sign-in" variant="subtle">Need help signing in?</Anchor>
      </Body>
    </AuthLayout>
  )
}
`

const BUILT_WITH = [
  { label: 'Auth Nav', href: '/components/auth-nav' },
  { label: 'Radio', href: '/components/radio' },
  { label: 'Verification Method Card', href: '/components/verification-method' },
  { label: 'Button', href: '/components/button' },
  { label: 'Anchor', href: '/components/anchor' },
]

export function ChooseVerificationMethodDocs() {
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()
  const [state, setState] = useState<ChooseVerificationMethodPreviewState>('default')
  const src = `/choose-verification-method?state=${state}&theme=${theme}`
  const fullHref = `/choose-verification-method?state=${state}`

  function selectState(next: ChooseVerificationMethodPreviewState) {
    setState(next)
    const preview = document.getElementById('live-preview')
    preview?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <article>
      <header id="overview" className="scroll-mt-20 animate-docs-header-in motion-reduce:animate-none">
        <Caption>Pages / Auth / Choose Verification Method</Caption>
        <Heading className="mt-2">Choose Verification Method</Heading>
        <Subhead className="mt-2">
          Pick how to verify identity after sign-in or password reset — email, passkey, authenticator, recovery code, or
          another device.
        </Subhead>
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
          url={`${brand.supportLabel}/choose-verification-method`}
          fullHref={fullHref}
          fadeKey={`${state}-${theme}`}
          onCopy={() => navigator.clipboard.writeText(REACT_SOURCE)}
          onSource={() => window.open('/choose-verification-method', '_blank', 'noreferrer')}
        />
        <div id="code" className="scroll-mt-20">
          <CollapsibleCode code={REACT_SOURCE} fadeKey="react" />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          {CHOOSE_VERIFICATION_METHOD_STATES.map((item) => (
            <PageStateThumb
              key={item.id}
              label={item.label}
              selected={state === item.id}
              onClick={() => selectState(item.id)}
            >
              <div className="origin-top scale-[0.42] [width:238%]">
                <ChooseVerificationMethodPage state={item.id} />
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
            description="The flow that routes here when a second factor is required."
          />
          <RelatedCard
            href="/pages/verification-code"
            title="Verification Code"
            description="Email OTP after Email is chosen."
          />
          <RelatedCard
            href="/pages/authenticator-code"
            title="Authenticator Code"
            description="Six-digit entry after Authenticator App is chosen."
          />
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(PAGES_ITEMS, 'choose-verification-method')} />
    </article>
  )
}
