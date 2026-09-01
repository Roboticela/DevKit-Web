'use client'

import { useState } from 'react'
import { DkSuccessCircleCheckmark } from '@/icons'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { brand } from '@/lib/devkit'
import {
  LINK_EXPIRED_STATES,
  PAGES_ITEMS,
  type LinkExpiredPreviewState,
} from '@/lib/pages-catalog'
import { adjacentDocs } from '@/lib/docs-catalog'
import { useTheme } from '@/lib/theme'
import { Badge } from './Badge'
import { BuiltWithChips } from './BuiltWithChips'
import { CollapsibleCode } from './CollapsibleCode'
import { CompositionTree, type CompositionNode } from './CompositionTree'
import { DocsMetaBadges, DocsSectionTitle } from './DocsCopy'
import { DocsPager } from './DocsPager'
import { LinkExpiredPage } from './LinkExpiredPage'
import { PageStateThumb } from './PageStateThumb'
import { PropsTable, type PropRow } from './PropsTable'
import { RelatedCard } from './RelatedCard'
import { Caption, Heading, Subhead } from './Text'
import { ViewportPreview } from './ViewportPreview'

const TREE: CompositionNode[] = [
  {
    label: 'Link Expired Page',
    children: [
      {
        label: 'Auth Nav',
        href: '/components/auth-nav',
        note: '(Contextual back link)',
      },
      { label: 'Auth Brand', note: '(Broken link icon, title, subhead)' },
      { label: 'Button', href: '/components/button', note: '(Primary, full width, as link)' },
    ],
  },
]

const DATA: PropRow[] = [
  {
    name: 'purpose',
    type: 'VerifyPurpose',
    required: 'No',
    defaultValue: "'sign_in'",
    description: 'Changes the back button destination — sign-in, password reset, or settings.',
  },
  {
    name: 'email',
    type: 'string',
    required: 'No',
    defaultValue: 'undefined',
    description: 'Passed back to Forgot Password when restarting a reset flow.',
  },
]

const REACT_SOURCE = `import Link from 'next/link'
import { AuthBrand, AuthLayout } from '@/components/AuthLayout'
import { ButtonLabel } from '@/components/ButtonLabel'
import { DkHyperlinkChainBindAlternateDisabled } from '@/icons'

export default function LinkExpiredPage({ purpose, email }) {
  const back = backTarget(purpose)

  return (
    <AuthLayout navLinkTo={back.navHref} navLinkLabel={back.navLabel}>
      <AuthBrand
        title="Link Expired"
        subhead="This verification link has expired."
        icon={<DkHyperlinkChainBindAlternateDisabled size={44} strokeWidth={1.5} />}
      />
      <Link href={back.href} className="primary-button-classes">
        <ButtonLabel light>{back.label}</ButtonLabel>
      </Link>
    </AuthLayout>
  )
}
`

const BUILT_WITH = [
  { label: 'Auth Nav', href: '/components/auth-nav' },
  { label: 'Button', href: '/components/button' },
  { label: 'Text', href: '/components/text' },
]

export function LinkExpiredDocs() {
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()
  const [state, setState] = useState<LinkExpiredPreviewState>('default')
  const src = `/link-expired?state=${state}&theme=${theme}`
  const fullHref = `/link-expired?state=${state}`

  function selectState(next: LinkExpiredPreviewState) {
    setState(next)
    const preview = document.getElementById('live-preview')
    preview?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <article>
      <header id="overview" className="scroll-mt-20 animate-docs-header-in motion-reduce:animate-none">
        <Caption>Pages / Auth / Link Expired</Caption>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Heading>Link Expired</Heading>
          <Badge tone="verified" icon={<DkSuccessCircleCheckmark strokeWidth={2.5} absoluteStrokeWidth />}>
            Stable
          </Badge>
        </div>
        <Subhead className="mt-2">
          Tell the person their email verification link timed out and send them back to restart the flow.
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
          url={`${brand.supportLabel}/link-expired`}
          fullHref={fullHref}
          fadeKey={`${state}-${theme}`}
          onCopy={() => navigator.clipboard.writeText(REACT_SOURCE)}
          onSource={() => window.open('/link-expired', '_blank', 'noreferrer')}
        />
        <div id="code" className="scroll-mt-20">
          <CollapsibleCode code={REACT_SOURCE} fadeKey="react" />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          {LINK_EXPIRED_STATES.map((item) => (
            <PageStateThumb
              key={item.id}
              label={item.label}
              selected={state === item.id}
              onClick={() => selectState(item.id)}
            >
              <div className="origin-top scale-[0.42] [width:238%]">
                <LinkExpiredPage state={item.id} />
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
            href="/pages/verification-code"
            title="Verification Code"
            description="Where expired email links redirect from."
          />
          <RelatedCard
            href="/pages/forgot-password"
            title="Forgot Password"
            description="Restart password reset after an expired link."
          />
          <RelatedCard
            href="/pages/sign-in"
            title="Sign In"
            description="Default return path when a sign-in verification link expires."
          />
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(PAGES_ITEMS, 'link-expired')} />
    </article>
  )
}
