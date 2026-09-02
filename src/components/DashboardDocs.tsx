'use client'

import { useState } from 'react'
import { DkSuccessCircleCheckmark } from '@/icons'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { brand } from '@/lib/devkit'
import { adjacentDocs } from '@/lib/docs-catalog'
import { DASHBOARD_STATES, PAGES_ITEMS, type DashboardPreviewState } from '@/lib/pages-catalog'
import { useTheme } from '@/lib/theme'
import { Badge } from './Badge'
import { BuiltWithChips } from './BuiltWithChips'
import { CollapsibleCode } from './CollapsibleCode'
import { CompositionTree, type CompositionNode } from './CompositionTree'
import { DashboardPage } from './DashboardPage'
import { DocsMetaBadges, DocsSectionTitle } from './DocsCopy'
import { DocsPager } from './DocsPager'
import { PageStateThumb } from './PageStateThumb'
import { PropsTable, type PropRow } from './PropsTable'
import { RelatedCard } from './RelatedCard'
import { Caption, Heading, Subhead } from './Text'
import { ViewportPreview } from './ViewportPreview'

const TREE: CompositionNode[] = [
  {
    label: 'Dashboard Page',
    children: [
      { label: 'Page Header', href: '/components/page-header' },
      { label: 'Breadcrumb', href: '/components/breadcrumb' },
      { label: 'Stat Card', href: '/components/stat-card' },
      { label: 'Tabs', href: '/components/tabs' },
      { label: 'Table', href: '/components/table' },
      { label: 'Alert', href: '/components/alert' },
      { label: 'Modal', href: '/components/modal' },
      { label: 'Empty State', href: '/components/empty-state' },
      { label: 'Theme Toggle', href: '/components/theme-toggle' },
      { label: 'Pagination', href: '/components/pagination' },
    ],
  },
]

const DATA: PropRow[] = [
  {
    name: 'state',
    type: 'DashboardPreviewState',
    required: 'No',
    defaultValue: "'default'",
    description: 'Which workspace view to show — overview, projects, loading customers, empty inbox, collapsed sidebar, or invite modal.',
  },
  {
    name: 'full',
    type: 'boolean',
    required: 'No',
    defaultValue: 'true',
    description: 'When true, the shell fills the viewport height.',
  },
]

const REACT_SOURCE = `import { DashboardPage } from '@/components/DashboardPage'

export default function WorkspaceDashboard() {
  return <DashboardPage />
}
`

const BUILT_WITH = [
  { label: 'Stat Card', href: '/components/stat-card' },
  { label: 'Table', href: '/components/table' },
  { label: 'Page Header', href: '/components/page-header' },
  { label: 'Modal', href: '/components/modal' },
]

export function DashboardDocs() {
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()
  const [state, setState] = useState<DashboardPreviewState>('default')
  const src = `/dashboard?state=${state}&theme=${theme}`
  const fullHref = `/dashboard?state=${state}`
  const { prev, next } = adjacentDocs(PAGES_ITEMS, 'dashboard')

  function selectState(next: DashboardPreviewState) {
    setState(next)
    const preview = document.getElementById('live-preview')
    preview?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <article>
      <header id="overview" className="scroll-mt-20 animate-docs-header-in motion-reduce:animate-none">
        <Caption>Pages / App Shell / Dashboard Overview</Caption>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Heading>Dashboard Overview</Heading>
          <Badge tone="verified" icon={<DkSuccessCircleCheckmark strokeWidth={2.5} absoluteStrokeWidth />}>
            Stable
          </Badge>
        </div>
        <Subhead className="mt-2">
          The signed-in home for a workspace — sidebar navigation, overview metrics, project table, and common shell
          patterns like invite and empty inbox.
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
          url={`${brand.supportLabel}/dashboard`}
          fullHref={fullHref}
          fadeKey={`${state}-${theme}`}
          onCopy={() => navigator.clipboard.writeText(REACT_SOURCE)}
          onSource={() => window.open('/dashboard', '_blank', 'noreferrer')}
        />
        <div id="code" className="scroll-mt-20">
          <CollapsibleCode code={REACT_SOURCE} fadeKey="react" />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          {DASHBOARD_STATES.map((item) => (
            <PageStateThumb
              key={item.id}
              label={item.label}
              selected={state === item.id}
              onClick={() => selectState(item.id)}
            >
              <div className="h-[240px] overflow-hidden">
                <div className="origin-top scale-[0.32] [width:313%]">
                  <DashboardPage state={item.id} full={false} />
                </div>
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
        <div className="grid gap-3 min-[735px]:grid-cols-2">
          <RelatedCard title="Settings" href="/pages/settings" description="Profile, security, and notification preferences." />
          <RelatedCard title="Sign In" href="/pages/sign-in" description="Where someone lands before reaching the dashboard." />
        </div>
      </section>

      <DocsPager prev={prev} next={next} />
    </article>
  )
}
