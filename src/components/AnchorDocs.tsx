'use client'

import { useMemo, useState } from 'react'
import { adjacentDocs, DOCS_ITEMS } from '@/lib/docs-catalog'
import { brand } from '@/lib/devkit'
import { cn } from '@/lib/cn'
import {
  Anchor,
  ANCHOR_ARROWS,
  ANCHOR_ARROW_LABEL,
  ANCHOR_TONES,
  ANCHOR_TONE_LABEL,
  ANCHOR_VARIANTS,
  ANCHOR_VARIANT_LABEL,
  type AnchorArrow,
  type AnchorPreview as AnchorPreviewState,
  type AnchorSize,
  type AnchorTone,
  type AnchorVariant,
} from './Anchor'
import { CodePanel } from './CodeBlock'
import { DocsDemoPanel } from './DocsDemoPanel'
import { DocsHeader, DocsSectionTitle } from './DocsCopy'
import { DocsRelated, StateStack, StateCard, StateGrid, StateGroup, DocsUsage } from './DocsCard'
import { Card, CardGrid } from './Card'
import { Alert } from './Alert'
import { DataTable } from './DataTable'
import { Kbd } from './Kbd'
import { RuleCard } from './RuleCard'
import { DocsPager } from './DocsPager'
import { Dropdown } from './Dropdown'
import { PropsTable, type PropRow } from './PropsTable'
import { RelatedCard } from './RelatedCard'
import { PREVIEW_INSET } from './PreviewMode'
import { SegmentedControl } from './SegmentedControl'
import { Switch } from './Switch'
import { Body, Caption } from './Text'

const SHORTCUT_COLUMNS = [
  {
    key: 'keys',
    header: 'Key',
    render: (row: { id: string; keys: string[]; action: string }) => (
      <span className="inline-flex flex-wrap items-center gap-1">
        {row.keys.map((key) => (
          <Kbd key={key}>{key}</Kbd>
        ))}
      </span>
    ),
  },
  { key: 'action', header: 'Action' },
]

type DemoState = 'default' | 'hover' | 'focus' | 'active' | 'visited' | 'disabled'

const STATES: { value: DemoState; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'hover', label: 'Hover' },
  { value: 'focus', label: 'Focus' },
  { value: 'active', label: 'Active' },
  { value: 'visited', label: 'Visited' },
  { value: 'disabled', label: 'Disabled' },
]

const SIZES = ['sm', 'md', 'lg'] as const
const SIZE_LABEL: Record<(typeof SIZES)[number], string> = { sm: 'S', md: 'M', lg: 'L' }
const SIZE_CODE: Record<AnchorSize, string> = {
  inherit: 'inherit',
  sm: 'small',
  md: 'medium',
  lg: 'large',
}

const DEFAULTS = {
  variant: 'inline' as AnchorVariant,
  size: 'md' as AnchorSize,
  state: 'default' as DemoState,
  tone: 'brand' as AnchorTone,
  arrow: 'end' as AnchorArrow,
  external: false,
}

const PROPS: PropRow[] = [
  {
    name: 'href',
    type: 'string',
    defaultValue: '—',
    description: 'Destination. In-app paths use client navigation. http(s) URLs are treated as external.',
  },
  {
    name: 'variant',
    type: "'inline' | 'subtle' | 'underline' | 'plain' | 'standalone' | 'arrow'",
    defaultValue: "'inline'",
    description:
      'Visual style. Inline sits in copy. Standalone is a “Learn more” trail with a chevron. Arrow is a circular chevron, as on View all products.',
  },
  {
    name: 'size',
    type: "'inherit' | 'small' | 'medium' | 'large'",
    defaultValue: "'inherit'",
    description: 'Type scale. Inherit matches surrounding text. Use a named size for a standalone trail.',
  },
  {
    name: 'tone',
    type: "'brand' | 'danger'",
    defaultValue: "'brand'",
    description: 'Ink color. Danger is for a destructive destination such as delete account.',
  },
  {
    name: 'external',
    type: "boolean | 'auto'",
    defaultValue: "'auto'",
    description: 'Launch icon. Auto shows it for http(s) and target="_blank". True also opens a new window.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Renders as inert text. Not focusable and does not navigate.',
  },
  {
    name: 'arrow',
    type: "'end' | 'start'",
    defaultValue: "'end'",
    description:
      'Side of the circular chevron. End is next or View all. Start is previous. Sets the Arrow variant when used alone.',
  },
  {
    name: 'leading',
    type: 'ReactNode',
    defaultValue: '—',
    description: 'Optional icon before the label.',
  },
  {
    name: 'trailing',
    type: 'ReactNode',
    defaultValue: '—',
    description: 'Replaces the automatic chevron or launch icon.',
  },
]

function previewOf(state: DemoState): AnchorPreviewState | undefined {
  if (state === 'hover' || state === 'focus' || state === 'active' || state === 'visited') return state
  return undefined
}

function labelOf(variant: AnchorVariant, external: boolean) {
  if (external) return 'roboticela.com'
  if (variant === 'standalone') return 'Learn more'
  if (variant === 'arrow') return 'View all products'
  if (variant === 'subtle') return 'Privacy Policy'
  if (variant === 'plain') return 'Alex Rivera'
  return 'Learn more'
}

function hrefOf(external: boolean) {
  return external ? brand.supportUrl : '#usage'
}

function buildSnippet(opts: {
  variant: AnchorVariant
  size: AnchorSize
  state: DemoState
  tone: AnchorTone
  arrow: AnchorArrow
  external: boolean
}) {
  const attrs: string[] = []
  if (opts.variant !== 'inline') attrs.push(`variant="${opts.variant}"`)
  if (opts.size !== 'inherit') attrs.push(`size="${SIZE_CODE[opts.size]}"`)
  if (opts.tone !== 'brand') attrs.push(`tone="${opts.tone}"`)
  if (opts.variant === 'arrow' && opts.arrow === 'start') attrs.push('arrow="start"')
  if (opts.external) attrs.push('external')
  if (opts.state === 'disabled') attrs.push('disabled')

  const href = hrefOf(opts.external)
  const label = labelOf(opts.variant, opts.external)
  const attrStr = [`href="${href}"`, ...attrs].join(' ')

  return `import { Anchor } from '@${brand.companyName.toLowerCase()}/devkit'\n\n<Anchor ${attrStr}>\n  ${label}\n</Anchor>\n`
}

function DemoAnchor({
  variant,
  size,
  state,
  tone,
  arrow,
  external,
  preview,
}: {
  variant: AnchorVariant
  size: AnchorSize
  state: DemoState
  tone: AnchorTone
  arrow?: AnchorArrow
  external: boolean
  preview?: AnchorPreviewState
}) {
  return (
    <Anchor
      href={hrefOf(external)}
      variant={variant}
      size={size}
      tone={tone}
      arrow={variant === 'arrow' ? (arrow ?? 'end') : undefined}
      external={external || undefined}
      disabled={state === 'disabled'}
      preview={preview ?? previewOf(state)}
    >
      {labelOf(variant, external)}
    </Anchor>
  )
}

export function AnchorStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={3}>
          {ANCHOR_VARIANTS.map((item) => (
            <StateCard key={item} label={ANCHOR_VARIANT_LABEL[item]}>
              <DemoAnchor variant={item} size="md" state="default" tone="brand" external={false} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={3}>
          {SIZES.map((item) => (
            <StateCard key={item} label={item === 'sm' ? 'Small' : item === 'md' ? 'Medium' : 'Large'}>
              <DemoAnchor variant="inline" size={item} state="default" tone="brand" external={false} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {ANCHOR_TONES.map((item) => (
            <StateCard key={item} label={ANCHOR_TONE_LABEL[item]}>
              <DemoAnchor
                variant="inline"
                size="md"
                state="default"
                tone={item}
                external={false}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Arrow">
        <StateGrid columns={2}>
          {ANCHOR_ARROWS.map((item) => (
            <StateCard key={item} label={ANCHOR_ARROW_LABEL[item]}>
              <DemoAnchor
                variant="arrow"
                size="md"
                state="default"
                tone="brand"
                arrow={item}
                external={false}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      {ANCHOR_VARIANTS.map((item) => (
        <StateGroup key={item} title={ANCHOR_VARIANT_LABEL[item]}>
          <StateGrid columns={item === 'arrow' ? 3 : 6}>
            {STATES.map((entry) => (
              <StateCard key={entry.value} label={entry.label} inert>
                <DemoAnchor
                  variant={item}
                  size="md"
                  state={entry.value}
                  tone="brand"
                  external={false}
                />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="External">
        <StateGrid columns={3}>
          {ANCHOR_VARIANTS.map((item) => (
            <StateCard key={item} label={ANCHOR_VARIANT_LABEL[item]}>
              <Anchor href={brand.supportUrl} variant={item} size="md" external>
                {item === 'standalone' || item === 'arrow' ? 'Visit the site' : brand.supportLabel}
              </Anchor>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="In copy">
        <StateCard label="Inline in a paragraph" align="stretch" wide>
          <Body>
            By continuing, you agree to the{' '}
            <Anchor href="#usage">Terms of Use</Anchor> and{' '}
            <Anchor href="#usage" variant="subtle">
              Privacy Policy
            </Anchor>
            . Support is on{' '}
            <Anchor href={brand.supportUrl}>{brand.supportLabel}</Anchor>.
          </Body>
        </StateCard>
      </StateGroup>
    </StateStack>
  )
}

export function AnchorPreview() {
  return (
    <StateStack gap={10}>
      <div
        className={cn(
          'flex min-h-[min(52dvh,480px)] items-center justify-center',
          PREVIEW_INSET,
        )}
      >
        <div className="w-fit max-w-none">
          <DemoAnchor variant="inline" size="md" state="default" tone="brand" external={false} />
        </div>
      </div>
      <div>
        <div className={PREVIEW_INSET}>
          <DocsSectionTitle>States</DocsSectionTitle>
        </div>
        <AnchorStates />
      </div>
    </StateStack>
  )
}

export function AnchorDocs() {
  const [variant, setVariant] = useState<AnchorVariant>(DEFAULTS.variant)
  const [size, setSize] = useState<AnchorSize>(DEFAULTS.size)
  const [state, setState] = useState<DemoState>(DEFAULTS.state)
  const [tone, setTone] = useState<AnchorTone>(DEFAULTS.tone)
  const [arrow, setArrow] = useState<AnchorArrow>(DEFAULTS.arrow)
  const [external, setExternal] = useState(DEFAULTS.external)
  const [grid, setGrid] = useState(false)
  const [replay, setReplay] = useState(0)

  const code = useMemo(
    () => buildSnippet({ variant, size, state, tone, arrow, external }),
    [variant, size, state, tone, arrow, external],
  )
  const fadeKey = `${variant}-${size}-${state}-${tone}-${arrow}-${external}-${replay}`
  const inCopy = variant !== 'standalone' && variant !== 'arrow'

  function reset() {
    setVariant(DEFAULTS.variant)
    setSize(DEFAULTS.size)
    setState(DEFAULTS.state)
    setTone(DEFAULTS.tone)
    setArrow(DEFAULTS.arrow)
    setExternal(DEFAULTS.external)
  }

  return (
    <article>
      <DocsHeader
        crumb="Components / Navigation / Anchor"
        title="Anchor"
        description="Beautiful, accessible links that help users navigate to new pages and destinations. Every link is clearly styled to show where it leads."
      />

      <section id="usage" className="mt-10 scroll-mt-20">
        <DocsSectionTitle>Usage</DocsSectionTitle>
        <DocsUsage>
            <Body>
              Links help users navigate to new pages and content. They come in different styles for different purposes. Use inline 
              links within sentences, standalone links after headings, or circular arrow buttons for navigation. External links 
              automatically show an icon to let users know they will leave your site.
            </Body>
          <CardGrid columns={3} gap="sm">
            <Card variant="subtle" size="sm" eyebrow="01" title="Navigate, don’t act" description="A link goes somewhere. A button does something. Do not style a link as a filled pill." />
            <Card variant="subtle" size="sm" eyebrow="02" title="Name the destination" description="The label is the place or the promise. “Privacy Policy”, “Learn more”, not “Click here”." />
            <Card variant="subtle" size="sm" eyebrow="03" title="Honest navigation" description="External links show a small icon, giving users a heads up that clicking will take them to a different website." />
          </CardGrid>
          <CardGrid columns={2} gap="sm">
            <RuleCard size="sm" tone="success" title="Do" items={[
              'Use inline links within paragraphs and text to maintain a natural reading flow.',
              'Place standalone links after headings when you want to guide users to additional content.',
              'Use arrow buttons for navigation like viewing all items or moving between pages.',
              'Mark external links clearly so users know when they are leaving your site.',
            ]} />
            <RuleCard size="sm" tone="danger" title="Don’t" items={[
              'Avoid using links for actions like saving or deleting. Those should be buttons.',
              'Always be transparent when a link goes to an external website.',
              'Keep links concise. Link just the relevant words, not entire paragraphs.',
            ]} />
          </CardGrid>
        </DocsUsage>
      </section>

      <section id="live-demo" className="mt-8 scroll-mt-20 animate-docs-demo-in motion-reduce:animate-none">
        <DocsDemoPanel
          fadeKey={fadeKey}
          previewHref="/preview/anchor"
          grid={grid}
          onCopy={() => navigator.clipboard.writeText(code)}
          onReplay={() => setReplay((current) => current + 1)}
          onReset={reset}
          onToggleGrid={() => setGrid((open) => !open)}
          controls={
            <>
              <SegmentedControl
                label="Variant"
                size="sm"
                fullWidth
                value={variant}
                onChange={setVariant}
                options={ANCHOR_VARIANTS.map((value) => ({
                  value,
                  label: ANCHOR_VARIANT_LABEL[value],
                }))}
              />
              <SegmentedControl
                label="Size"
                size="sm"
                value={size === 'inherit' ? 'md' : size}
                onChange={setSize}
                options={SIZES.map((value) => ({ value, label: SIZE_LABEL[value] }))}
              />
              <Dropdown
                compact
                label="State"
                value={state}
                onChange={setState}
                options={STATES}
              />
              <Dropdown
                compact
                label="Tone"
                value={tone}
                onChange={setTone}
                options={ANCHOR_TONES.map((value) => ({
                  value,
                  label: ANCHOR_TONE_LABEL[value],
                }))}
              />
              {variant === 'arrow' ? (
                <SegmentedControl
                  label="Arrow"
                  size="sm"
                  value={arrow}
                  onChange={setArrow}
                  options={ANCHOR_ARROWS.map((value) => ({
                    value,
                    label: ANCHOR_ARROW_LABEL[value],
                  }))}
                />
              ) : null}
              <div className="flex flex-col gap-1">
                <Caption as="span">External</Caption>
                <div className="flex h-8 items-center">
                  <Switch
                    size="sm"
                    checked={external}
                    onChange={setExternal}
                    label="External"
                  />
                </div>
              </div>
            </>
          }
        >
          {inCopy ? (
            <Body className="max-w-[32rem] text-center">
              DevKit is the component library for {brand.companyName} products.{' '}
              <DemoAnchor variant={variant} size={size} state={state} tone={tone} arrow={arrow} external={external} />
            </Body>
          ) : (
            <DemoAnchor variant={variant} size={size} state={state} tone={tone} arrow={arrow} external={external} />
          )}
        </DocsDemoPanel>

        <div id="code" className="scroll-mt-20">
          <CodePanel code={code} fadeKey={fadeKey} />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <AnchorStates />
      </section>

      <section id="props" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Props</DocsSectionTitle>
        <PropsTable rows={PROPS} />
      </section>

      <section id="accessibility" className="mt-8 scroll-mt-20">
        <DocsSectionTitle>Accessibility</DocsSectionTitle>
                <div className="flex flex-col gap-4">
          <Alert title="Requirements">
            <p className="m-0">{"A link is a native control. The accessible name is the visible text, plus a note when the destination opens in a new window."}</p>
            <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
              <li>{"Renders a real anchor. Role is implied. Do not recreate this with a clickable span."}</li>
              <li>{"Tab to focus. Enter to follow. Focus is a 2px brand outline. Inline also shows the underline."}</li>
              <li>{"Disabled is not in the tab order. It is announced as a disabled link."}</li>
              <li>{"target=\"_blank\" and external={true} append a visually hidden “opens in a new window”."}</li>
              <li>{"The launch icon and the circular chevron are decorative. The label still names the destination if they are missing."}</li>
              <li>{"Do not rely on color alone. Hover fills the arrow circle, or reveals the underline on inline links."}</li>
            </ul>
          </Alert>
          <DataTable
            size="sm"
            variant="subtle"
            minWidth="320px"
            aria-label="Keyboard shortcuts"
            data={[
              { id: '0', keys: ["Tab"], action: "Focus the link" },
              { id: '1', keys: ["Enter"], action: "Follow the link" },
            ]}
            rowKey={(row) => row.id}
            columns={SHORTCUT_COLUMNS}
          />
        </div>
      </section>

      <section className="mt-12">
        <DocsSectionTitle className="mb-3">Related</DocsSectionTitle>
        <DocsRelated>
          <RelatedCard
            href="/components/button"
            title="Button"
            description="The main control for running an action."
          />
          <RelatedCard
            href="/components/breadcrumb"
            title="Breadcrumb"
            description="The path from the root to this page so the person can step back. The last crumb is the current page and is not a link."
          />
          <RelatedCard
            href="/components/auth-nav"
            title="Auth Nav"
            description="The bar on sign-in. Trailing action is Anchor."
          />
        </DocsRelated>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(DOCS_ITEMS, 'anchor')} />
    </article>
  )
}
