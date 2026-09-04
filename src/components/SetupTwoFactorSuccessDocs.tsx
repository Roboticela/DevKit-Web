'use client'

import { useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { brand } from '@/lib/devkit'
import {
  PAGES_ITEMS,
  SETUP_TWO_FACTOR_SUCCESS_STATES,
  type SetupTwoFactorSuccessPreviewState,
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
import { SetupTwoFactorSuccessPage } from './SetupTwoFactorSuccessPage'
import { Caption, Heading, Subhead } from './Text'
import { ViewportPreview } from './ViewportPreview'

const TREE: CompositionNode[] = [
  {
    label: 'Two-Factor Setup Success Page',
    children: [
      {
        label: 'Auth Nav',
        href: '/components/auth-nav',
        note: '(Brand Logo, theme, Sign in link)',
      },
      { label: 'Auth Success', href: '/components/auth-nav', note: '(Success icon, title, body, Continue)' },
      { label: 'Button', href: '/components/button', note: '(Continue to dashboard)' },
    ],
  },
]

const DATA: PropRow[] = [
  {
    name: 'onContinue',
    type: '() => void',
    required: 'No',
    defaultValue: 'undefined',
    description: 'Called when Continue is pressed before navigating to the dashboard.',
  },
  {
    name: 'continueHref',
    type: 'string',
    required: 'No',
    defaultValue: "'/dashboard'",
    description: 'Where Continue goes after two-factor setup is complete.',
  },
]

const REACT_SOURCE = `import Link from 'next/link'
import { AuthLayout, AuthSuccess } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { DkHandheldMobilePhone } from '@/icons'

export default function SetupTwoFactorSuccessPage({ onContinue }) {
  return (
    <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
      <AuthSuccess
        title="Two-Factor Authentication Is On"
        body="You can use codes from your authenticator app when signing in."
        action={
          <Link href="/dashboard" className="block w-full">
            <Button type="button" onClick={onContinue}>Continue</Button>
          </Link>
        }
      >
        <DkHandheldMobilePhone size={28} strokeWidth={1.5} />
      </AuthSuccess>
    </AuthLayout>
  )
}
`

const BUILT_WITH = [
  { label: 'Auth Nav', href: '/components/auth-nav' },
  { label: 'Button', href: '/components/button' },
]

export function SetupTwoFactorSuccessDocs() {
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()
  const [state, setState] = useState<SetupTwoFactorSuccessPreviewState>('default')
  const src = `/setup-2fa-success?state=${state}&theme=${theme}`
  const fullHref = `/setup-2fa-success?state=${state}`

  function selectState(next: SetupTwoFactorSuccessPreviewState) {
    setState(next)
    const preview = document.getElementById('live-preview')
    preview?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <article>
      <header id="overview" className="scroll-mt-20 animate-docs-header-in motion-reduce:animate-none">
        <Caption>Pages / Auth / Two-Factor Setup Success</Caption>
        <Heading className="mt-2">Two-Factor Setup Success</Heading>
        <Subhead className="mt-2">
          Shown after recovery codes are saved. Confirms two-factor authentication is on, then sends
          someone to the dashboard.
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
          url={`${brand.supportLabel}/setup-2fa-success`}
          fullHref={fullHref}
          fadeKey={`${state}-${theme}`}
          onCopy={() => navigator.clipboard.writeText(REACT_SOURCE)}
          onSource={() => window.open('/setup-2fa-success', '_blank', 'noreferrer')}
        />
        <div id="code" className="scroll-mt-20">
          <CollapsibleCode code={REACT_SOURCE} fadeKey="react" />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          {SETUP_TWO_FACTOR_SUCCESS_STATES.map((item) => (
            <PageStateThumb
              key={item.id}
              label={item.label}
              selected={state === item.id}
              onClick={() => selectState(item.id)}
            >
              <div className="origin-top scale-[0.42] [width:238%]">
                <SetupTwoFactorSuccessPage state={item.id} />
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
            href="/pages/save-recovery-codes"
            title="Save Recovery Codes"
            description="Previous step where backup codes are copied or downloaded."
          />
          <RelatedCard
            href="/pages/setup-2fa"
            title="Setup Two-Factor"
            description="Where authenticator setup starts in the post-login flow."
          />
          <RelatedCard
            href="/pages/dashboard"
            title="Dashboard"
            description="Where Continue goes after setup is complete."
          />
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(PAGES_ITEMS, 'setup-2fa-success')} />
    </article>
  )
}
