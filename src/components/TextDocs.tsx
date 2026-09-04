'use client'

import { useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import { adjacentDocs, DOCS_ITEMS } from '@/lib/docs-catalog'
import { CodePanel } from './CodeBlock'
import { DocsDemoPanel } from './DocsDemoPanel'
import { DocsHeader, DocsSectionTitle } from './DocsCopy'
import { DocsCard, DocsRelated, DocsStack, DocsStateCard, DocsStateGrid, DocsUsage } from './DocsCard'
import { A11ySection, DocsDoDont, DocsPrinciples, DocsProse } from './DocsGuide'
import { DocsPager } from './DocsPager'
import { Dropdown } from './Dropdown'
import { PropsTable, type PropRow } from './PropsTable'
import { RelatedCard } from './RelatedCard'
import { SegmentedControl } from './SegmentedControl'
import { PREVIEW_INSET } from './PreviewMode'
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

export function TextStates() {
  return (
    <>
      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Variants</DocsSectionTitle>
        <DocsStack gap={4}>
          {VARIANTS.map((item) => (
            <DocsCard key={item.value} className="flex flex-col gap-2">
              <Caption className="font-medium">{item.label}</Caption>
              <Text variant={item.value}>{COPY[item.value]}</Text>
            </DocsCard>
          ))}
        </DocsStack>
      </section>

      <section id="tones" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Tones</DocsSectionTitle>
        <DocsStateGrid>
          {TONES.map((item) => (
            <DocsStateCard
              key={item.value}
              label={item.label}
              surface={item.value === 'on-brand' ? 'brand' : 'secondary'}
            >
              <Body tone={item.value}>{item.label} content</Body>
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </section>

      <section id="stack" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Stack</DocsSectionTitle>
        <DocsCard padding="lg" className="flex flex-col gap-3">
          <Text variant="eyebrow">Components / Typography</Text>
          <Heading>A pressable control that triggers an action.</Heading>
          <Subhead>Use your DevKit Account to continue.</Subhead>
          <Body>
            Heading, subhead, and content share one type scale. Pair them in this order and keep one idea per
            block.
          </Body>
        </DocsCard>
      </section>
    </>
  )
}

export function TextPreview() {
  return (
    <>
      <div
        className={cn(
          'flex min-h-[min(52dvh,480px)] items-center justify-center',
          PREVIEW_INSET,
        )}
      >
        <div className="w-fit max-w-none">
          <Text variant="h1" align="center">
            {COPY.h1}
          </Text>
        </div>
      </div>
      <TextStates />
    </>
  )
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
        description="A complete set of text styles designed to create beautiful, readable content that works perfectly on every device."
      />

      <section id="usage" className="mt-10 scroll-mt-20">
        <DocsSectionTitle>Usage</DocsSectionTitle>
        <DocsUsage>
          <DocsProse>
            <Body>
              Our text system provides everything you need to create clear, beautiful content. From large headlines that grab attention 
              to small captions for supporting details, each style is carefully crafted to work perfectly together and create a natural 
              reading experience.
            </Body>
          </DocsProse>
          <DocsPrinciples
            items={[
              { title: 'Smart sizing', body: 'Text automatically adjusts for different screen sizes, ensuring perfect readability on phones, tablets, and desktops.' },
              { title: 'Stack once', body: 'Eyebrow, heading, subhead, body. That order is the kit’s default reading path.' },
              { title: 'Meaningful colors', body: 'Different text colors help distinguish between primary content, supporting information, and interactive elements.' },
            ]}
          />
          <DocsDoDont
            doItems={[
              'Use heading styles for titles and body text for paragraphs to create clear structure.',
              'Take advantage of automatic sizing that adapts to different devices.',
              'Reserve large display text for the most important headline on each page.',
            ]}
            dontItems={[
              'Keep heading levels in logical order to help users and screen readers navigate.',
              'Stick to the provided text styles for consistent, professional typography.',
              'Make sure important instructions use prominent text, not small captions.',
            ]}
          />
        </DocsUsage>
      </section>

      <section id="live-demo" className="mt-8 scroll-mt-20 animate-docs-demo-in motion-reduce:animate-none">
        <DocsDemoPanel
          fadeKey={fadeKey}
          previewHref="/preview/text"
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
                size="sm"
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

      <TextStates />

      <section id="props" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Props</DocsSectionTitle>
        <PropsTable rows={PROPS} />
      </section>

      <section id="accessibility" className="mt-8 scroll-mt-20">
        <DocsSectionTitle>Accessibility</DocsSectionTitle>
        <A11ySection
          intro="Type has to work as a document, not only as a layout."
          items={[
            'Heading emits a real h1–h3. Display is an h1. Do not fake titles with bold Body.',
            'Do not skip levels. An h1 is followed by h2, not h3.',
            'When the visual size and the outline disagree, keep the correct tag and pass as.',
            'Caption at 12px is supporting copy. Do not put the only instructions there.',
            'Danger, success, and warning tones still need clear wording. Color is extra.',
            'Link tone is for inline links that go somewhere — not for entire paragraphs.',
            'Disabled tone is for inert UI, paired with a disabled control.',
          ]}
        />
      </section>

      <section className="mt-12">
        <DocsSectionTitle className="mb-3">Related</DocsSectionTitle>
        <DocsRelated>
          <RelatedCard href="/components/heading" title="Heading" description="The title of a page or section." />
          <RelatedCard href="/components/subhead" title="Subhead" description="One supporting sentence under a heading." />
          <RelatedCard href="/components/body" title="Body" description="Paragraphs at the reading size." />
        </DocsRelated>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(DOCS_ITEMS, 'text')} />
    </article>
  )
}
