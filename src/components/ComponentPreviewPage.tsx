'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DOCS_ITEMS } from '@/lib/docs-catalog'
import { brand } from '@/lib/devkit'
import { Anchor } from './Anchor'
import { AnchorPreview } from './AnchorDocs'
import { BrandLogo } from './BrandLogo'
import { ButtonPreview } from './ButtonDocs'
import { hasPrimitiveDoc, PrimitivePreview } from './DocsPrimitivesDocs'
import { hasKitDoc, KitComponentPreview } from './KitComponentDocs'
import { Label } from './Text'
import { TextPreview } from './TextDocs'
import { ThemeIconToggle } from './ThemeIconToggle'
import { PreviewMode } from './PreviewMode'

function PreviewBody({ slug }: { slug: string }) {
  if (slug === 'button') return <ButtonPreview />
  if (slug === 'anchor') return <AnchorPreview />
  if (slug === 'text') return <TextPreview />
  if (hasKitDoc(slug)) return <KitComponentPreview slug={slug} />
  if (hasPrimitiveDoc(slug)) return <PrimitivePreview slug={slug} />
  notFound()
}

export function ComponentPreviewPage({ slug }: { slug: string }) {
  const item = DOCS_ITEMS.find((entry) => entry.id === slug)
  if (!item) notFound()

  return (
    <PreviewMode>
      <div className="min-h-dvh bg-bg-primary">
        <header className="sticky top-0 z-[2] flex h-11 items-center justify-between border-b border-border-default bg-bg-primary px-[22px] min-[735px]:px-10 min-[1069px]:px-[min(5vw,80px)]">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              className="inline-flex size-5 shrink-0 items-center justify-center text-text-primary leading-none"
              href="/"
              aria-label={brand.name}
            >
              <BrandLogo variant="icon" size={18} alt="" />
            </Link>
            <Label as="p" className="min-w-0 truncate">
              {item.label}
            </Label>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <ThemeIconToggle />
            <Anchor href={`/components/${slug}`} size="sm" className="whitespace-nowrap leading-none">
              Docs
            </Anchor>
          </div>
        </header>
        <main className="w-full">
          <PreviewBody slug={slug} />
        </main>
      </div>
    </PreviewMode>
  )
}
