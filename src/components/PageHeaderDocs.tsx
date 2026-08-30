'use client'

import {
  DkMagnifyingGlassFind,
  DkRowsThree
} from '@/icons'
import { Avatar } from './Avatar'
import { Badge } from './Badge'
import { Breadcrumbs } from './Breadcrumbs'
import { Button } from './Button'
import { DocsStateCard, DocsStateGrid, DocsStateGroup, DocsStack } from './DocsCard'
import { IconButton } from './IconButton'
import {
  PageHeader,
  PAGE_HEADER_ALIGNS,
  PAGE_HEADER_ALIGN_LABEL,
  PAGE_HEADER_LAYOUTS,
  PAGE_HEADER_LAYOUT_LABEL,
  PAGE_HEADER_SIZES,
  PAGE_HEADER_SIZE_LABEL,
  PAGE_HEADER_VARIANTS,
  PAGE_HEADER_VARIANT_LABEL,
} from './PageHeader'
import { Tabs } from './Tabs'

function HeaderAction({
  children = 'New',
  size = 'md',
  variant = 'primary',
  disabled,
}: {
  children?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
}) {
  return (
    <Button fullWidth={false} className="w-auto" size={size} variant={variant} disabled={disabled}>
      {children}
    </Button>
  )
}

const CRUMBS = [
  { label: 'Workspace' },
  { label: 'Projects' },
]

export function PageHeaderDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      {PAGE_HEADER_VARIANTS.map((variant) => (
        <PageHeader
          key={variant}
          variant={variant}
          eyebrow="Workspace"
          title={PAGE_HEADER_VARIANT_LABEL[variant]}
          description="Everything currently in flight."
          actions={<HeaderAction size="sm">New</HeaderAction>}
        />
      ))}
    </div>
  )
}

export function PageHeaderStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Appearance">
        <DocsStateGrid columns={2}>
          {PAGE_HEADER_VARIANTS.map((variant) => (
            <DocsStateCard
              key={variant}
              label={PAGE_HEADER_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <PageHeader
                variant={variant}
                title="Projects"
                description="Everything currently in flight."
                actions={<HeaderAction size="sm">New</HeaderAction>}
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Size">
        <DocsStateGrid columns={2}>
          {PAGE_HEADER_SIZES.map((size) => (
            <DocsStateCard
              key={size}
              label={PAGE_HEADER_SIZE_LABEL[size]}
              align="stretch"
              wide
              size="lg"
              className="bg-bg-primary"
            >
              <PageHeader
                size={size}
                title="Projects"
                description="Four active products."
                actions={<HeaderAction size={size === 'lg' ? 'md' : size}>New</HeaderAction>}
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Layout">
        <DocsStateGrid columns={2}>
          {PAGE_HEADER_LAYOUTS.map((layout) => (
            <DocsStateCard
              key={layout}
              label={PAGE_HEADER_LAYOUT_LABEL[layout]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <PageHeader
                layout={layout}
                title="Projects"
                description="Everything currently in flight."
                actions={
                  <>
                    <HeaderAction variant="secondary" size="sm">
                      Export
                    </HeaderAction>
                    <HeaderAction size="sm">New</HeaderAction>
                  </>
                }
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Align">
        <DocsStateGrid columns={2}>
          {PAGE_HEADER_ALIGNS.map((align) => (
            <DocsStateCard
              key={align}
              label={PAGE_HEADER_ALIGN_LABEL[align]}
              align="stretch"
              wide
              size="lg"
              className="bg-bg-primary"
            >
              <PageHeader
                align={align}
                size={align === 'center' ? 'lg' : 'md'}
                title="Projects"
                description="A calm place to ship."
                actions={<HeaderAction size={align === 'center' ? 'md' : 'sm'}>New</HeaderAction>}
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="On dark">
        <DocsStateGrid columns={2}>
          {PAGE_HEADER_VARIANTS.map((variant) => (
            <DocsStateCard
              key={`dark-${variant}`}
              label={PAGE_HEADER_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <PageHeader
                variant={variant}
                title="Projects"
                description="Everything currently in flight."
                actions={<HeaderAction size="sm">New</HeaderAction>}
                onDark
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="State">
        <DocsStateGrid columns={2}>
          <DocsStateCard label="Title only" align="stretch" wide className="bg-bg-primary">
            <PageHeader title="Projects" />
          </DocsStateCard>
          <DocsStateCard label="With description" align="stretch" wide className="bg-bg-primary">
            <PageHeader title="Projects" description="Everything currently in flight." />
          </DocsStateCard>
          <DocsStateCard label="With eyebrow" align="stretch" wide className="bg-bg-primary">
            <PageHeader
              eyebrow="Workspace"
              title="Projects"
              description="Everything currently in flight."
            />
          </DocsStateCard>
          <DocsStateCard label="With actions" align="stretch" wide className="bg-bg-primary">
            <PageHeader
              title="Projects"
              description="Four active products."
              actions={
                <>
                  <HeaderAction variant="secondary" size="sm">
                    Export
                  </HeaderAction>
                  <HeaderAction size="sm">New</HeaderAction>
                </>
              }
            />
          </DocsStateCard>
          <DocsStateCard label="With badge" align="stretch" wide className="bg-bg-primary">
            <PageHeader
              title="Projects"
              description="Four active products."
              meta={<Badge tone="verified">Live</Badge>}
              actions={<HeaderAction size="sm">New</HeaderAction>}
            />
          </DocsStateCard>
          <DocsStateCard label="With avatar" align="stretch" wide className="bg-bg-primary">
            <PageHeader
              leading={<Avatar name="Alex Rivera" size="lg" />}
              title="Alex Rivera"
              description="Workspace owner"
              actions={
                <HeaderAction variant="secondary" size="sm">
                  Edit
                </HeaderAction>
              }
            />
          </DocsStateCard>
          <DocsStateCard label="Back" align="stretch" wide className="bg-bg-primary">
            <PageHeader
              onBack={() => undefined}
              title="Details"
              description="Atlas Checkout and the people on it."
              actions={<HeaderAction size="sm">Share</HeaderAction>}
            />
          </DocsStateCard>
          <DocsStateCard label="With breadcrumbs" align="stretch" wide className="bg-bg-primary">
            <PageHeader
              breadcrumbs={<Breadcrumbs items={CRUMBS} />}
              title="Projects"
              description="Everything currently in flight."
              actions={<HeaderAction size="sm">New</HeaderAction>}
            />
          </DocsStateCard>
          <DocsStateCard label="With tabs" align="stretch" wide size="lg" className="bg-bg-primary">
            <PageHeader
              title="Projects"
              description="Four active products."
              actions={<HeaderAction size="sm">New</HeaderAction>}
              extra={
                <Tabs
                  aria-label="Projects"
                  value="all"
                  onChange={() => undefined}
                  items={[
                    { id: 'all', label: 'All' },
                    { id: 'live', label: 'Live' },
                    { id: 'review', label: 'In review', badge: 1 },
                  ]}
                />
              }
            />
          </DocsStateCard>
          <DocsStateCard label="Icon actions" align="stretch" wide className="bg-bg-primary">
            <PageHeader
              title="Inbox"
              description="Mentions and reviews."
              actions={
                <>
                  <IconButton label="Search" size="sm">
                    <DkMagnifyingGlassFind size={16} strokeWidth={1.75} absoluteStrokeWidth />
                  </IconButton>
                  <IconButton label="Filter" size="sm">
                    <DkRowsThree size={16} strokeWidth={1.75} absoluteStrokeWidth />
                  </IconButton>
                  <HeaderAction size="sm">New</HeaderAction>
                </>
              }
            />
          </DocsStateCard>
          <DocsStateCard label="Loading" align="stretch" wide className="bg-bg-primary">
            <PageHeader
              title="Projects"
              description="Everything currently in flight."
              actions={<HeaderAction size="sm">New</HeaderAction>}
              loading
            />
          </DocsStateCard>
          <DocsStateCard label="Disabled" align="stretch" wide className="bg-bg-primary">
            <PageHeader
              title="Projects"
              description="You need permission to create one."
              actions={<HeaderAction size="sm">New</HeaderAction>}
              disabled
            />
          </DocsStateCard>
          <DocsStateCard label="Long title" align="stretch" wide className="bg-bg-primary">
            <PageHeader
              title="Quarterly planning for Atlas Checkout and Northstar Auth"
              description="Everything currently in flight across the workspace."
              actions={<HeaderAction size="sm">New</HeaderAction>}
            />
          </DocsStateCard>
          <DocsStateCard label="Outline, actions" align="stretch" wide className="bg-bg-primary">
            <PageHeader
              variant="outline"
              title="Projects"
              description="Everything currently in flight."
              actions={<HeaderAction size="sm">New</HeaderAction>}
            />
          </DocsStateCard>
          <DocsStateCard label="Pill, small" align="stretch" wide className="bg-bg-primary">
            <PageHeader
              variant="pill"
              size="sm"
              title="Inbox"
              description="Mentions and reviews."
              actions={<HeaderAction size="sm">New</HeaderAction>}
            />
          </DocsStateCard>
          <DocsStateCard label="Ghost, large" align="stretch" wide size="lg" className="bg-bg-primary">
            <PageHeader
              variant="ghost"
              size="lg"
              align="center"
              title="Projects"
              description="A calm place to ship the next thing."
              actions={<HeaderAction>Get started</HeaderAction>}
            />
          </DocsStateCard>
          <DocsStateCard label="Fill, stacked" align="stretch" wide className="bg-bg-primary">
            <PageHeader
              variant="fill"
              layout="stack"
              eyebrow="Workspace"
              title="Projects"
              description="Everything currently in flight."
              actions={
                <>
                  <HeaderAction variant="secondary" size="sm">
                    Import
                  </HeaderAction>
                  <HeaderAction size="sm">New</HeaderAction>
                </>
              }
            />
          </DocsStateCard>
          <DocsStateCard label="Back, breadcrumbs" align="stretch" wide size="lg" className="bg-bg-primary">
            <PageHeader
              breadcrumbs={<Breadcrumbs items={CRUMBS} />}
              onBack={() => undefined}
              title="Atlas Checkout"
              description="Live since March. Eight people on the workspace."
              meta={<Badge>Live</Badge>}
              actions={<HeaderAction size="sm">Invite</HeaderAction>}
            />
          </DocsStateCard>
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}
