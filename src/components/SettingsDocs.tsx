'use client'

import { useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { brand } from '@/lib/devkit'
import { adjacentDocs } from '@/lib/docs-catalog'
import { PAGES_ITEMS, SETTINGS_STATES, type SettingsPreviewState } from '@/lib/pages-catalog'
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
import { SettingsPage } from './SettingsPage'
import { Caption, Heading, Subhead } from './Text'
import { ViewportPreview } from './ViewportPreview'

const TREE: CompositionNode[] = [
  {
    label: 'Settings Page',
    children: [
      { label: 'Page Header', href: '/components/page-header' },
      { label: 'Settings Row', href: '/components/settings-row' },
      { label: 'Switch', href: '/components/switch' },
      { label: 'Theme Toggle', href: '/components/theme-toggle' },
      { label: 'Profile Button', href: '/components/profile-button' },
    ],
  },
]

const DATA: PropRow[] = [
  {
    name: 'state',
    type: 'SettingsPreviewState',
    required: 'No',
    defaultValue: "'default'",
    description: 'Preview state — default, two-factor off, collapsed sidebar, or signing out.',
  },
  {
    name: 'full',
    type: 'boolean',
    required: 'No',
    defaultValue: 'true',
    description: 'When true, the shell fills the viewport height.',
  },
]

const REACT_SOURCE = `import { SettingsPage } from '@/components/SettingsPage'

export default function WorkspaceSettings() {
  return <SettingsPage />
}
`

const BUILT_WITH = [
  { label: 'Settings Row', href: '/components/settings-row' },
  { label: 'Switch', href: '/components/switch' },
  { label: 'Page Header', href: '/components/page-header' },
]

export function SettingsDocs() {
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()
  const [state, setState] = useState<SettingsPreviewState>('default')
  const src = `/settings?state=${state}&theme=${theme}`
  const fullHref = `/settings?state=${state}`
  const { prev, next } = adjacentDocs(PAGES_ITEMS, 'settings')

  function selectState(next: SettingsPreviewState) {
    setState(next)
    const preview = document.getElementById('live-preview')
    preview?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <article>
      <header id="overview" className="scroll-mt-20 animate-docs-header-in motion-reduce:animate-none">
        <Caption>Pages / App Shell / Settings</Caption>
        <Heading className="mt-2">Settings</Heading>
        <Subhead className="mt-2">
          Account and workspace preferences inside the signed-in shell — notifications, profile rows, two-factor status,
          appearance, and sign out.
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
          url={`${brand.supportLabel}/settings`}
          fullHref={fullHref}
          fadeKey={`${state}-${theme}`}
          onCopy={() => navigator.clipboard.writeText(REACT_SOURCE)}
          onSource={() => window.open('/settings', '_blank', 'noreferrer')}
        />
        <div id="code" className="scroll-mt-20">
          <CollapsibleCode code={REACT_SOURCE} fadeKey="react" />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          {SETTINGS_STATES.map((item) => (
            <PageStateThumb
              key={item.id}
              label={item.label}
              selected={state === item.id}
              onClick={() => selectState(item.id)}
            >
              <div className="h-[240px] overflow-hidden">
                <div className="origin-top scale-[0.32] [width:313%]">
                  <SettingsPage state={item.id} full={false} />
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
          <RelatedCard title="Dashboard Overview" href="/pages/dashboard" description="The workspace home someone returns to from settings." />
          <RelatedCard title="Setup Two-Factor" href="/pages/setup-2fa" description="Where two-factor off links when someone needs to finish setup." />
        </div>
      </section>

      <DocsPager prev={prev} next={next} />
    </article>
  )
}
