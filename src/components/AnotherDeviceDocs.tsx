'use client'

import { useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { brand } from '@/lib/devkit'
import {
  ANOTHER_DEVICE_STATES,
  PAGES_ITEMS,
  type AnotherDevicePreviewState,
} from '@/lib/pages-catalog'
import { adjacentDocs } from '@/lib/docs-catalog'
import { useTheme } from '@/lib/theme'
import { AnotherDevicePage } from './AnotherDevicePage'
import { Badge } from './Badge'
import { BuiltWithChips } from './BuiltWithChips'
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
    label: 'Another Device Page',
    children: [
      {
        label: 'Auth Nav',
        href: '/components/auth-nav',
        note: '(Brand Logo, theme, Sign in link)',
      },
      { label: 'Auth Brand', note: '(Devices icon, title, subhead)' },
      { label: 'Loader', href: '/components/loader', note: '(Waiting indicator)' },
      { label: 'Text', href: '/components/text', note: '(Device meta caption)' },
      { label: 'Anchor', href: '/components/anchor', note: '(Try another way)' },
    ],
  },
]

const DATA: PropRow[] = [
  {
    name: 'onApproved',
    type: '(user: AuthUser) => void',
    required: 'Yes',
    defaultValue: '—',
    description: 'Called after the other device approves and verification completes.',
  },
  {
    name: 'onError',
    type: '(message: string) => void',
    required: 'No',
    defaultValue: 'undefined',
    description: 'Called when the request fails, is declined, or expires.',
  },
  {
    name: 'email',
    type: 'string',
    required: 'Yes',
    defaultValue: '—',
    description: 'Account email used to start the device approval request.',
  },
  {
    name: 'purpose',
    type: 'VerifyPurpose',
    required: 'No',
    defaultValue: "'sign_in'",
    description: 'Why verification is needed — sign-in, password reset, or settings change.',
  },
]

const REACT_SOURCE = `import { AuthBrand, AuthLayout } from '@/components/AuthLayout'
import { Anchor } from '@/components/Anchor'
import { Loader } from '@/components/Loader'
import { Body, Caption } from '@/components/Text'
import { DkDevicesDesktopAndMobile } from '@/icons'

export default function AnotherDevicePage({ email, status, deviceMeta, errorMessage }) {
  return (
    <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
      <AuthBrand
        title="Check Another Device"
        subhead="We sent an approval request to a device where you're already signed in."
        icon={<DkDevicesDesktopAndMobile size={44} strokeWidth={1.5} />}
      />
      {status === 'waiting' || status === 'completing' ? (
        <div className="mt-8 flex justify-center">
          <Loader size="md" decorative />
        </div>
      ) : null}
      {deviceMeta ? (
        <Caption align="center" tone="tertiary" className="mt-4">
          {deviceMeta}
        </Caption>
      ) : null}
      <Body size="sm" align="center" tone="tertiary" className="mt-6">
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
  { label: 'Loader', href: '/components/loader' },
  { label: 'Text', href: '/components/text' },
  { label: 'Anchor', href: '/components/anchor' },
]

export function AnotherDeviceDocs() {
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()
  const [state, setState] = useState<AnotherDevicePreviewState>('default')
  const src = `/another-device?state=${state}&theme=${theme}`
  const fullHref = `/another-device?state=${state}`

  function selectState(next: AnotherDevicePreviewState) {
    setState(next)
    const preview = document.getElementById('live-preview')
    preview?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <article>
      <header id="overview" className="scroll-mt-20 animate-docs-header-in motion-reduce:animate-none">
        <Caption>Pages / Auth / Another Device</Caption>
        <Heading className="mt-2">Another Device</Heading>
        <Subhead className="mt-2">
          Wait while a signed-in phone, tablet, or computer approves the sign-in or verification request.
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
          url={`${brand.supportLabel}/another-device`}
          fullHref={fullHref}
          fadeKey={`${state}-${theme}`}
          onCopy={() => navigator.clipboard.writeText(REACT_SOURCE)}
          onSource={() => window.open('/another-device', '_blank', 'noreferrer')}
        />
        <div id="code" className="scroll-mt-20">
          <CollapsibleCode code={REACT_SOURCE} fadeKey="react" />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          {ANOTHER_DEVICE_STATES.map((item) => (
            <PageStateThumb
              key={item.id}
              label={item.label}
              selected={state === item.id}
              onClick={() => selectState(item.id)}
            >
              <div className="origin-top scale-[0.42] [width:238%]">
                <AnotherDevicePage state={item.id} />
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
            description="Pick another device before this wait screen."
          />
          <RelatedCard
            href="/pages/verification-code"
            title="Verification Code"
            description="Email OTP when Email is chosen instead."
          />
          <RelatedCard
            href="/pages/sign-in"
            title="Sign In"
            description="The flow that routes here when device approval is available."
          />
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(PAGES_ITEMS, 'another-device')} />
    </article>
  )
}
