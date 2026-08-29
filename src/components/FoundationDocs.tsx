'use client'

import Link from 'next/link'
import { adjacentDocs, DOCS_ITEMS } from '@/lib/docs-catalog'
import { BrandLogo } from './BrandLogo'
import { CountryFlag } from './CountryFlag'
import { DocsHeader } from './DocsCopy'
import { DocsPager } from './DocsPager'
import { GitHubMark } from './GitHubMark'
import { GoogleMark } from './GoogleMark'
import { AppleMark } from './providerMarks'
import { Text, type TextVariant } from './Text'

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
              <h2 className="m-0 mb-3 text-[13px] font-medium text-text-secondary">{group.label}</h2>
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
            <Text variant="h2">Almost before we knew it, we had left the ground.</Text>
            <Text variant="subhead">Use Heading, Subhead, and Body for page copy. Tokens live here; components live under Typography.</Text>
            <Link href="/components/text" className="w-fit text-[17px] font-medium text-text-link no-underline">
              Open Text
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

  return (
    <FoundationFrame slug={slug} title="Icons" description="Brand marks, flags, and icon treatment.">
      <div className="grid grid-cols-3 gap-4 min-[735px]:grid-cols-6">
        {[
          ['Logo', <BrandLogo key="logo" size={28} />],
          ['Icon', <BrandLogo key="icon" variant="icon" size={28} />],
          ['Google', <GoogleMark key="g" size={22} />],
          ['GitHub', <GitHubMark key="gh" size={22} />],
          ['Apple', <AppleMark key="a" size={22} />],
          ['US', <CountryFlag key="us" iso="US" size={22} />],
        ].map(([label, node]) => (
          <div key={String(label)} className="flex flex-col items-center gap-2 rounded-xl bg-bg-secondary px-3 py-6">
            {node}
            <span className="text-[11px] text-text-tertiary">{label}</span>
          </div>
        ))}
      </div>
    </FoundationFrame>
  )
}
