'use client'

import { useMemo, useState } from 'react'
import {
  DkTaskCompleteCheckmark
} from '@/icons'
import { cn } from '@/lib/cn'
import { adjacentDocs, DOCS_ITEMS } from '@/lib/docs-catalog'
import { Badge } from './Badge'
import { Callout } from './Callout'
import { CodePanel } from './CodeBlock'
import { DocsDemoPanel } from './DocsDemoPanel'
import { DocsHeader, DocsSectionTitle } from './DocsCopy'
import { DocsPager } from './DocsPager'
import { Dropdown } from './Dropdown'
import { PropsTable, type PropRow } from './PropsTable'
import { RelatedCard } from './RelatedCard'
import { SegmentedControl } from './SegmentedControl'
import { Body, Caption, Heading, Subhead, Text, type TextAlign, type TextTone, type TextVariant } from './Text'

const VARIANTS: { value: TextVariant; label: string }[] = [
  { value: 'display', label: 'Display' },
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  { value: 'subhead', label: 'Subhead' },
  { value: 'content', label: 'Content' },
  { value: 'content-sm', label: 'Content small' },
  { value: 'caption', label: 'Caption' },
  { value: 'eyebrow', label: 'Eyebrow' },
  { value: 'label', label: 'Label' },
]

const TONES: { value: TextTone; label: string }[] = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'tertiary', label: 'Tertiary' },
  { value: 'disabled', label: 'Disabled' },
  { value: 'link', label: 'Link' },
  { value: 'success', label: 'Success' },
  { value: 'warning', label: 'Warning' },
  { value: 'danger', label: 'Danger' },
  { value: 'on-brand', label: 'On brand' },
]

const ALIGNS: TextAlign[] = ['start', 'center', 'end']

const COPY: Record<TextVariant, string> = {
  display: 'DevKit.',
  h1: 'A pressable control that triggers an action.',
  h2: 'Almost before we knew it, we had left the ground.',
  h3: 'Welcome back',
  subhead: 'Use your DevKit Account to continue.',
  content:
    'A pressable control that triggers an action. Short supporting copy sits at the content size so it stays readable on every screen.',
  'content-sm': 'Secondary copy uses the small content size for captions inside cards and forms.',
  caption: 'Last updated Aug 29, 2026',
  eyebrow: 'Components / Typography',
  label: 'Email address',
}

const DEFAULT_TONE: Record<TextVariant, TextTone> = {
  display: 'primary',
  h1: 'primary',
  h2: 'primary',
  h3: 'primary',
  subhead: 'secondary',
  content: 'secondary',
  'content-sm': 'secondary',
  caption: 'tertiary',
  eyebrow: 'tertiary',
  label: 'primary',
}

const PROPS: PropRow[] = [
  {
    name: 'variant',
    type: "'display' | 'h1' | 'h2' | 'h3' | 'subhead' | 'content' | 'content-sm' | 'caption' | 'eyebrow' | 'label'",
    defaultValue: "'content'",
    description: 'Type role. Headings, subhead, content, caption, eyebrow, and label.',
  },
  {
    name: 'tone',
    type: "'primary' | 'secondary' | 'tertiary' | 'disabled' | 'link' | 'success' | 'warning' | 'danger' | 'on-brand'",
    defaultValue: 'Matches the variant',
    description: 'Color. Headings default to primary; content to secondary; caption to tertiary.',
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end'",
    defaultValue: "'start'",
    description: 'Horizontal alignment.',
  },
  {
    name: 'as',
    type: 'ElementType',
    defaultValue: 'Semantic default',
    description: 'Rendered element. Headings default to h1–h3; content to p.',
  },
]

function snippet(variant: TextVariant, tone: TextTone, align: TextAlign) {
  const text = COPY[variant]
  if (variant === 'display') {
    return `<Heading level="display"${align !== 'start' ? ` align="${align}"` : ''}${tone !== 'primary' ? ` tone="${tone}"` : ''}>\n  ${text}\n</Heading>\n`
  }
  if (variant === 'h1' || variant === 'h2' || variant === 'h3') {
    const level = variant === 'h1' ? 1 : variant === 'h2' ? 2 : 3
    return `<Heading level={${level}}${align !== 'start' ? ` align="${align}"` : ''}${tone !== 'primary' ? ` tone="${tone}"` : ''}>\n  ${text}\n</Heading>\n`
  }
  if (variant === 'subhead') {
    return `<Subhead${align !== 'start' ? ` align="${align}"` : ''}${tone !== 'secondary' ? ` tone="${tone}"` : ''}>\n  ${text}\n</Subhead>\n`
  }
  if (variant === 'content' || variant === 'content-sm') {
    const size = variant === 'content-sm' ? ' sm' : ''
    return `<Body${size ? ' size="sm"' : ''}${align !== 'start' ? ` align="${align}"` : ''}${tone !== 'secondary' ? ` tone="${tone}"` : ''}>\n  ${text}\n</Body>\n`
  }
  if (variant === 'caption') {
    return `<Caption${align !== 'start' ? ` align="${align}"` : ''}${tone !== 'tertiary' ? ` tone="${tone}"` : ''}>\n  ${text}\n</Caption>\n`
  }
  if (variant === 'eyebrow') {
    return `<Eyebrow${align !== 'start' ? ` align="${align}"` : ''}${tone !== 'tertiary' ? ` tone="${tone}"` : ''}>\n  ${text}\n</Eyebrow>\n`
  }
  return `<Label${align !== 'start' ? ` align="${align}"` : ''}${tone !== 'primary' ? ` tone="${tone}"` : ''}>\n  ${text}\n</Label>\n`
}

export function TextDocs() {
  const [variant, setVariant] = useState<TextVariant>('h1')
  const [tone, setTone] = useState<TextTone>('primary')
  const [align, setAlign] = useState<TextAlign>('start')
  const [grid, setGrid] = useState(false)
  const [replay, setReplay] = useState(0)

  const code = useMemo(() => snippet(variant, tone, align), [variant, tone, align])
  const fadeKey = `${variant}-${tone}-${align}-${replay}`

  function reset() {
    setVariant('h1')
    setTone('primary')
    setAlign('start')
  }

  function onVariant(next: TextVariant) {
    setVariant(next)
    setTone(DEFAULT_TONE[next])
  }

  return (
    <article>
      <DocsHeader
        crumb="Components / Typography / Text"
        title="Text"
        description="Heading, subhead, content, caption, and the rest of the type scale."
      >
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge tone="verified">
            <DkTaskCompleteCheckmark size={10} strokeWidth={2.5} absoluteStrokeWidth />
            Stable
          </Badge>
          <Badge tone="muted">Web</Badge>
          <Badge tone="muted">iOS</Badge>
          <Badge tone="muted">Android</Badge>
        </div>
      </DocsHeader>

      <section id="live-demo" className="mt-8 scroll-mt-20 animate-docs-demo-in motion-reduce:animate-none">
        <DocsDemoPanel
          fadeKey={fadeKey}
          grid={grid}
          onCopy={() => navigator.clipboard.writeText(code)}
          onReplay={() => setReplay((current) => current + 1)}
          onReset={reset}
          onToggleGrid={() => setGrid((open) => !open)}
          controls={
            <>
              <Dropdown compact label="Variant" value={variant} onChange={onVariant} options={VARIANTS} />
              <Dropdown compact label="Tone" value={tone} onChange={setTone} options={TONES} />
              <SegmentedControl
                label="Align"
                value={align}
                onChange={setAlign}
                options={ALIGNS.map((value) => ({
                  value,
                  label: value[0].toUpperCase() + value.slice(1),
                }))}
              />
            </>
          }
        >
          <div className={cn('w-full', tone === 'on-brand' && 'rounded-xl bg-brand-primary px-6 py-8')}>
            <Text variant={variant} tone={tone} align={align}>
              {COPY[variant]}
            </Text>
          </div>
        </DocsDemoPanel>
        <div id="code" className="scroll-mt-20">
          <CodePanel code={code} fadeKey={fadeKey} />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Variants</DocsSectionTitle>
        <div className="flex flex-col gap-4">
          {VARIANTS.map((item) => (
            <div key={item.value} className="flex flex-col gap-2 rounded-xl bg-bg-secondary px-5 py-6">
              <Caption className="font-medium">{item.label}</Caption>
              <Text variant={item.value}>{COPY[item.value]}</Text>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Tones</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          {TONES.map((item) => (
            <div key={item.value} className="flex flex-col gap-2">
              <div
                className={cn(
                  'flex min-h-[88px] items-center rounded-xl px-4 py-5',
                  item.value === 'on-brand' ? 'bg-brand-primary' : 'bg-bg-secondary',
                )}
              >
                <Body tone={item.value}>{item.label} content</Body>
              </div>
              <Caption align="center">{item.label}</Caption>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Stack</DocsSectionTitle>
        <div className="flex flex-col gap-3 rounded-xl bg-bg-secondary px-5 py-8">
          <Text variant="eyebrow">Components / Typography</Text>
          <Heading>A pressable control that triggers an action.</Heading>
          <Subhead>Use your DevKit Account to continue.</Subhead>
          <Body>
            Heading, subhead, and content share one type scale. Pair them in this order and keep one idea per
            block.
          </Body>
        </div>
      </section>

      <section id="props" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Props</DocsSectionTitle>
        <PropsTable rows={PROPS} />
      </section>

      <section id="accessibility" className="mt-8 scroll-mt-20">
        <Callout>
          <ul className="m-0 list-disc space-y-1.5 pl-4">
            <li>
              Use <code className="font-mono text-[12px]">Heading</code> with a real heading level so the document
              outline stays correct.
            </li>
            <li>Do not skip levels. An h1 is followed by h2, not h3.</li>
            <li>
              Color is not the only signal — danger and success copy should also be clear in words.
            </li>
          </ul>
        </Callout>
      </section>

      <section className="mt-12">
        <DocsSectionTitle className="mb-3">Related</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-3 min-[735px]:grid-cols-3">
          <RelatedCard href="/components/heading" title="Heading" description="Display and h1–h3." />
          <RelatedCard href="/components/subhead" title="Subhead" description="Supporting line under a heading." />
          <RelatedCard href="/components/body" title="Body" description="Content paragraphs." />
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(DOCS_ITEMS, 'text')} />
    </article>
  )
}
