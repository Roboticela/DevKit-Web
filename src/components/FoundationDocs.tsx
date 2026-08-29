'use client'

import Link from 'next/link'
import { adjacentDocs, DOCS_ITEMS } from '@/lib/docs-catalog'
import { DocsHeader } from './DocsCopy'
import { DocsPager } from './DocsPager'
import { Caption, Heading, Label, Subhead, type TextVariant } from './Text'

const COLOR_GROUPS = [
  {
    label: 'Brand',
    tokens: ['brand-primary', 'brand-primary-hover', 'brand-primary-active', 'accent-teal'],
  },
  {
    label: 'Semantic',
    tokens: ['success', 'warning', 'danger'],
  },
  {
    label: 'Text',
    tokens: ['text-primary', 'text-secondary', 'text-tertiary'],
  },
  {
    label: 'Background',
    tokens: ['bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-elevated'],
  },
  {
    label: 'Border',
    tokens: ['border-default', 'border-subtle', 'border-strong'],
  },
]

const TYPE_ROWS: { role: string; variant: TextVariant; size: string; weight: string; tracking: string }[] = [
  { role: 'Display', variant: 'display', size: '80px / 40px', weight: '600', tracking: '-0.015em' },
  { role: 'Heading 1', variant: 'h1', size: '56px / 32px', weight: '600', tracking: '-0.015em' },
  { role: 'Heading 2', variant: 'h2', size: '40px / 28px', weight: '600', tracking: '-0.01em' },
  { role: 'Heading 3', variant: 'h3', size: '28px / 21px', weight: '600', tracking: '-0.005em' },
  { role: 'Subhead', variant: 'subhead', size: '24px / 19px', weight: '400', tracking: '0' },
  { role: 'Content', variant: 'content', size: '19px / 17px', weight: '400', tracking: '0' },
  { role: 'Content small', variant: 'content-sm', size: '17px', weight: '400', tracking: '0' },
  { role: 'Caption', variant: 'caption', size: '12px', weight: '400', tracking: '0' },
  { role: 'Eyebrow', variant: 'eyebrow', size: '12px', weight: '400', tracking: '0.05em' },
  { role: 'Label', variant: 'label', size: '17px', weight: '500', tracking: '0' },
]

const SPACE = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128]

const RADII = [
  { value: 8, label: 'Control', use: 'Fields and compact controls.' },
  { value: 12, label: 'Card', use: 'Small cards and grouped lists.' },
  { value: 18, label: 'Panel', use: 'Large cards, images, and dialogs.' },
  { value: 980, label: 'Pill', use: 'Buttons and chip-like controls.' },
] as const

const BREAKPOINTS = [
  { query: '≤ 734px', label: 'Mobile', padding: '22px', columns: '1, 16px gutters' },
  { query: '735–1068px', label: 'Tablet', padding: '40px', columns: '12, 24px gutters' },
  { query: '≥ 1069px', label: 'Desktop', padding: 'min(5vw, 80px)', columns: '12, 24px gutters' },
] as const

const WIDTHS = [
  { value: 692, use: 'Single-column copy' },
  { value: 760, use: 'Docs article' },
  { value: 900, use: 'Wide docs' },
  { value: 980, use: 'Text-focused marketing' },
  { value: 1024, use: 'Marketing sections and site nav' },
] as const

function FoundationFrame({
  slug,
  title,
  description,
  children,
}: {
  slug: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <article>
      <DocsHeader crumb={`Components / Foundations / ${title}`} title={title} description={description} />
      <section id="tokens" className="mt-10 scroll-mt-20">
        {children}
      </section>
      <DocsPager className="mt-12" {...adjacentDocs(DOCS_ITEMS, slug)} />
    </article>
  )
}

export function FoundationDocs({ slug }: { slug: string }) {
  if (slug === 'colors') {
    return (
      <FoundationFrame slug={slug} title="Colors" description="Brand, semantic, and neutral tokens.">
        <div className="flex flex-col gap-8">
          {COLOR_GROUPS.map((group) => (
            <div key={group.label}>
              <Caption as="h2" tone="secondary" className="mb-3 font-medium">
                {group.label}
              </Caption>
              <div className="grid grid-cols-2 gap-3 min-[735px]:grid-cols-4">
                {group.tokens.map((token) => (
                  <div key={token} className="overflow-hidden rounded-xl border border-border-default">
                    <div className="h-16" style={{ background: `var(--${token})` }} />
                    <p className="m-0 px-3 py-2 font-mono text-[11px] text-text-secondary">--{token}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FoundationFrame>
    )
  }

  if (slug === 'typography') {
    return (
      <FoundationFrame slug={slug} title="Typography" description="Type scale, weight, and tracking.">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Heading level={2}>Almost before we knew it, we had left the ground.</Heading>
            <Subhead>
              Use Heading, Subhead, and Body for page copy. Tokens live here; components live under Typography.
            </Subhead>
            <Link href="/components/text" className="w-fit no-underline">
              <Label as="span" tone="link">
                Open Text
              </Label>
            </Link>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border-default">
            <table className="w-full min-w-[480px] border-collapse text-left text-[13px]">
              <thead>
                <tr className="border-b border-border-subtle bg-bg-secondary">
                  <th className="px-4 py-2 font-medium text-text-secondary">Role</th>
                  <th className="px-4 py-2 font-medium text-text-secondary">Component</th>
                  <th className="px-4 py-2 font-medium text-text-secondary">Size</th>
                  <th className="px-4 py-2 font-medium text-text-secondary">Weight</th>
                  <th className="px-4 py-2 font-medium text-text-secondary">Tracking</th>
                </tr>
              </thead>
              <tbody>
                {TYPE_ROWS.map((row) => (
                  <tr key={row.role} className="border-b border-border-subtle last:border-0">
                    <td className="px-4 py-2 text-text-primary">{row.role}</td>
                    <td className="px-4 py-2 font-mono text-text-secondary">{row.variant}</td>
                    <td className="px-4 py-2 font-mono text-text-secondary">{row.size}</td>
                    <td className="px-4 py-2 text-text-secondary">{row.weight}</td>
                    <td className="px-4 py-2 font-mono text-text-secondary">{row.tracking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FoundationFrame>
    )
  }

  if (slug === 'spacing') {
    return (
      <FoundationFrame slug={slug} title="Spacing" description="The spacing scale used across the kit.">
        <div className="flex flex-col gap-3">
          {SPACE.map((value) => (
            <div key={value} className="flex items-center gap-4">
              <span className="w-10 shrink-0 font-mono text-[12px] text-text-tertiary">{value}</span>
              <div className="h-3 rounded-[4px] bg-brand-primary" style={{ width: value }} />
            </div>
          ))}
        </div>
      </FoundationFrame>
    )
  }

  if (slug === 'radius') {
    return (
      <FoundationFrame slug={slug} title="Radius" description="Corner radii for fields, cards, and pills.">
        <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
          {RADII.map((item) => (
            <div
              key={item.value}
              className="flex items-center gap-4 rounded-[12px] bg-bg-secondary px-4 py-4"
            >
              <div
                className="h-11 w-[72px] shrink-0 bg-bg-tertiary"
                style={{ borderRadius: item.value }}
              />
              <div className="min-w-0">
                <Label as="p">{item.label}</Label>
                <Caption className="mt-1 font-mono">{item.value}px</Caption>
                <Caption tone="secondary" className="mt-1">
                  {item.use}
                </Caption>
              </div>
            </div>
          ))}
        </div>
      </FoundationFrame>
    )
  }

  if (slug === 'layout') {
    return (
      <FoundationFrame
        slug={slug}
        title="Layout"
        description="Breakpoints, content widths, and page padding."
      >
        <div className="flex flex-col gap-8">
          <div>
            <Caption as="h2" tone="secondary" className="mb-3 font-medium">
              Breakpoints
            </Caption>
            <div className="overflow-x-auto rounded-[12px] border border-border-default">
              <table className="w-full min-w-[480px] border-collapse text-left text-[13px]">
                <thead>
                  <tr className="border-b border-border-subtle bg-bg-secondary">
                    <th className="px-4 py-2 font-medium text-text-secondary">Range</th>
                    <th className="px-4 py-2 font-medium text-text-secondary">Name</th>
                    <th className="px-4 py-2 font-medium text-text-secondary">Edge padding</th>
                    <th className="px-4 py-2 font-medium text-text-secondary">Grid</th>
                  </tr>
                </thead>
                <tbody>
                  {BREAKPOINTS.map((row) => (
                    <tr key={row.label} className="border-b border-border-subtle last:border-0">
                      <td className="px-4 py-2 font-mono text-text-primary">{row.query}</td>
                      <td className="px-4 py-2 text-text-primary">{row.label}</td>
                      <td className="px-4 py-2 font-mono text-text-secondary">{row.padding}</td>
                      <td className="px-4 py-2 text-text-secondary">{row.columns}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <Caption as="h2" tone="secondary" className="mb-3 font-medium">
              Content width
            </Caption>
            <div className="flex flex-col gap-3">
              {WIDTHS.map((item) => (
                <div key={item.value} className="flex items-center gap-4">
                  <span className="w-10 shrink-0 font-mono text-[12px] text-text-tertiary">
                    {item.value}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div
                      className="h-3 max-w-full rounded-[4px] bg-brand-primary"
                      style={{ width: `${Math.round((item.value / 1024) * 100)}%` }}
                    />
                    <Caption tone="secondary" className="mt-1">
                      {item.use}
                    </Caption>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FoundationFrame>
    )
  }

  return null
}
