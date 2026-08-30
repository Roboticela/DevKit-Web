'use client'

import { useMemo, useState } from 'react'
import { DkTaskCompleteCheckmark } from '@/icons'
import { adjacentDocs, DOCS_ITEMS } from '@/lib/docs-catalog'
import { brand } from '@/lib/devkit'
import {
  Anchor,
  ANCHOR_TONES,
  ANCHOR_TONE_LABEL,
  ANCHOR_VARIANTS,
  ANCHOR_VARIANT_LABEL,
  type AnchorPreview,
  type AnchorSize,
  type AnchorTone,
  type AnchorVariant,
} from './Anchor'
import { Badge } from './Badge'
import { CodePanel } from './CodeBlock'
import { DocsDemoPanel } from './DocsDemoPanel'
import { DocsHeader, DocsSectionTitle } from './DocsCopy'
import { DocsRelated, DocsStack, DocsStateCard, DocsStateGrid, DocsStateGroup, DocsUsage } from './DocsCard'
import { A11ySection, DocsDoDont, DocsPrinciples, DocsProse } from './DocsGuide'
import { DocsPager } from './DocsPager'
import { Dropdown } from './Dropdown'
import { PropsTable, type PropRow } from './PropsTable'
import { RelatedCard } from './RelatedCard'
import { SegmentedControl } from './SegmentedControl'
import { Switch } from './Switch'
import { Body, Caption } from './Text'

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
    type: "'inline' | 'subtle' | 'underline' | 'plain' | 'standalone'",
    defaultValue: "'inline'",
    description: 'Visual style. Inline sits in copy. Standalone is a “Learn more” trail with a chevron.',
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

function previewOf(state: DemoState): AnchorPreview | undefined {
  if (state === 'hover' || state === 'focus' || state === 'active' || state === 'visited') return state
  return undefined
}

function labelOf(variant: AnchorVariant, external: boolean) {
  if (external) return 'roboticela.com'
  if (variant === 'standalone') return 'Learn more'
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
  external: boolean
}) {
  const attrs: string[] = []
  if (opts.variant !== 'inline') attrs.push(`variant="${opts.variant}"`)
  if (opts.size !== 'inherit') attrs.push(`size="${SIZE_CODE[opts.size]}"`)
  if (opts.tone !== 'brand') attrs.push(`tone="${opts.tone}"`)
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
  external,
  preview,
}: {
  variant: AnchorVariant
  size: AnchorSize
  state: DemoState
  tone: AnchorTone
  external: boolean
  preview?: AnchorPreview
}) {
  return (
    <Anchor
      href={hrefOf(external)}
      variant={variant}
      size={size}
      tone={tone}
      external={external || undefined}
      disabled={state === 'disabled'}
      preview={preview ?? previewOf(state)}
    >
      {labelOf(variant, external)}
    </Anchor>
  )
}

export function AnchorDocs() {
  const [variant, setVariant] = useState<AnchorVariant>(DEFAULTS.variant)
  const [size, setSize] = useState<AnchorSize>(DEFAULTS.size)
  const [state, setState] = useState<DemoState>(DEFAULTS.state)
  const [tone, setTone] = useState<AnchorTone>(DEFAULTS.tone)
  const [external, setExternal] = useState(DEFAULTS.external)
  const [grid, setGrid] = useState(false)
  const [replay, setReplay] = useState(0)

  const code = useMemo(
    () => buildSnippet({ variant, size, state, tone, external }),
    [variant, size, state, tone, external],
  )
  const fadeKey = `${variant}-${size}-${state}-${tone}-${external}-${replay}`
  const inCopy = variant !== 'standalone'

  function reset() {
    setVariant(DEFAULTS.variant)
    setSize(DEFAULTS.size)
    setState(DEFAULTS.state)
    setTone(DEFAULTS.tone)
    setExternal(DEFAULTS.external)
  }

  return (
    <article>
      <DocsHeader
        crumb="Components / Navigation / Anchor"
        title="Anchor"
        description="A text link for in-app routes and the open web. External destinations show a launch icon."
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

      <section id="usage" className="mt-10 scroll-mt-20">
        <DocsSectionTitle>Usage</DocsSectionTitle>
        <DocsUsage>
          <DocsProse>
            <Body>
              Anchor is how the person leaves this screen for another. Inline sits in a sentence. Standalone is a
              quiet trail after a headline — Learn more, with a chevron. A destination on another site gets a launch
              icon, so it is obvious the next step leaves the product.
            </Body>
          </DocsProse>
          <DocsPrinciples
            items={[
              {
                title: 'Navigate, don’t act',
                body: 'A link goes somewhere. A button does something. Do not style a link as a filled pill.',
              },
              {
                title: 'Name the destination',
                body: 'The label is the place or the promise. “Privacy Policy”, “Learn more”, not “Click here”.',
              },
              {
                title: 'Mark the exit',
                body: 'http(s) URLs and target="_blank" show a launch icon. The icon is extra — the words still make sense without it.',
              },
            ]}
          />
          <DocsDoDont
            doItems={[
              'Use inline inside Body or Caption so the link inherits the reading size.',
              'Use standalone after a heading when the next step is a single destination.',
              'Pass external when the URL is on another origin, even if it is stored as a relative path.',
            ]}
            dontItems={[
              'Do not use Anchor for an in-page action such as Save or Delete — that is a Button.',
              'Do not hide that a link leaves the product. The launch icon is the signal.',
              'Do not underline a whole paragraph. Link the phrase that names the destination.',
            ]}
          />
        </DocsUsage>
      </section>

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
              <DemoAnchor variant={variant} size={size} state={state} tone={tone} external={external} />
            </Body>
          ) : (
            <DemoAnchor variant={variant} size={size} state={state} tone={tone} external={external} />
          )}
        </DocsDemoPanel>

        <div id="code" className="scroll-mt-20">
          <CodePanel code={code} fadeKey={fadeKey} />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <DocsStack gap={10}>
          <DocsStateGroup title="Appearance">
            <DocsStateGrid columns={2}>
              {ANCHOR_VARIANTS.map((item) => (
                <DocsStateCard key={item} label={ANCHOR_VARIANT_LABEL[item]}>
                  <DemoAnchor variant={item} size="md" state="default" tone="brand" external={false} />
                </DocsStateCard>
              ))}
            </DocsStateGrid>
          </DocsStateGroup>

          <DocsStateGroup title="Size">
            <DocsStateGrid columns={3}>
              {SIZES.map((item) => (
                <DocsStateCard key={item} label={item === 'sm' ? 'Small' : item === 'md' ? 'Medium' : 'Large'}>
                  <DemoAnchor variant="inline" size={item} state="default" tone="brand" external={false} />
                </DocsStateCard>
              ))}
            </DocsStateGrid>
          </DocsStateGroup>

          <DocsStateGroup title="Tone">
            <DocsStateGrid columns={2}>
              {ANCHOR_TONES.map((item) => (
                <DocsStateCard key={item} label={ANCHOR_TONE_LABEL[item]}>
                  <DemoAnchor
                    variant="inline"
                    size="md"
                    state="default"
                    tone={item}
                    external={false}
                  />
                </DocsStateCard>
              ))}
            </DocsStateGrid>
          </DocsStateGroup>

          {ANCHOR_VARIANTS.map((item) => (
            <DocsStateGroup key={item} title={ANCHOR_VARIANT_LABEL[item]}>
              <DocsStateGrid columns={6}>
                {STATES.map((entry) => (
                  <DocsStateCard key={entry.value} label={entry.label} inert>
                    <DemoAnchor
                      variant={item}
                      size="md"
                      state={entry.value}
                      tone="brand"
                      external={false}
                    />
                  </DocsStateCard>
                ))}
              </DocsStateGrid>
            </DocsStateGroup>
          ))}

          <DocsStateGroup title="External">
            <DocsStateGrid columns={2}>
              {ANCHOR_VARIANTS.map((item) => (
                <DocsStateCard key={item} label={ANCHOR_VARIANT_LABEL[item]}>
                  <Anchor href={brand.supportUrl} variant={item} size="md" external>
                    {item === 'standalone' ? 'Visit the site' : brand.supportLabel}
                  </Anchor>
                </DocsStateCard>
              ))}
            </DocsStateGrid>
          </DocsStateGroup>

          <DocsStateGroup title="In copy">
            <DocsStateCard label="Inline in a paragraph" align="stretch" wide>
              <Body>
                By continuing, you agree to the{' '}
                <Anchor href="#usage">Terms of Use</Anchor> and{' '}
                <Anchor href="#usage" variant="subtle">
                  Privacy Policy
                </Anchor>
                . Support is on{' '}
                <Anchor href={brand.supportUrl}>{brand.supportLabel}</Anchor>.
              </Body>
            </DocsStateCard>
          </DocsStateGroup>
        </DocsStack>
      </section>

      <section id="props" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Props</DocsSectionTitle>
        <PropsTable rows={PROPS} />
      </section>

      <section id="accessibility" className="mt-8 scroll-mt-20">
        <DocsSectionTitle>Accessibility</DocsSectionTitle>
        <A11ySection
          intro="A link is a native control. The accessible name is the visible text, plus a note when the destination opens in a new window."
          items={[
            'Renders a real anchor. Role is implied. Do not recreate this with a clickable span.',
            'Tab to focus. Enter to follow. Focus is a 2px brand outline with the underline visible.',
            'Disabled is not in the tab order. It is announced as a disabled link.',
            'target="_blank" and external={true} append a visually hidden “opens in a new window”.',
            'The launch icon is decorative. The label still names the destination if the icon is missing.',
            'Do not rely on color alone. Hover and focus also reveal the underline.',
          ]}
          keys={[
            { keys: ['Tab'], action: 'Focus the link' },
            { keys: ['Enter'], action: 'Follow the link' },
          ]}
        />
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
            href="/components/text-link"
            title="Text Link"
            description="Inline links, legal copy, and error text."
          />
          <RelatedCard
            href="/components/breadcrumb"
            title="Breadcrumb"
            description="The path back through the hierarchy."
          />
        </DocsRelated>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(DOCS_ITEMS, 'anchor')} />
    </article>
  )
}
