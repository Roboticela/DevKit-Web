'use client'

import { useMemo, useState } from 'react'
import {
  DkArrowDirectionLeft,
  DkArrowDirectionRight
} from '@/icons'
import { adjacentDocs, DOCS_ITEMS } from '@/lib/docs-catalog'
import { brand } from '@/lib/devkit'
import { cn } from '@/lib/cn'
import { Button, type ButtonSize, type ButtonVariant } from './Button'
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

type DemoVariant = 'primary' | 'secondary' | 'action' | 'ghost' | 'destructive'
type DemoState = 'default' | 'hover' | 'focus' | 'active' | 'disabled' | 'loading'
type DemoIcon = 'none' | 'left' | 'right'
type DemoPreview = 'hover' | 'focus' | 'active'

const VARIANTS: DemoVariant[] = ['primary', 'secondary', 'action', 'ghost', 'destructive']
const STATES: { value: DemoState; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'hover', label: 'Hover' },
  { value: 'focus', label: 'Focus' },
  { value: 'active', label: 'Active' },
  { value: 'disabled', label: 'Disabled' },
  { value: 'loading', label: 'Loading' },
]
const SIZES: ButtonSize[] = ['sm', 'md', 'lg']
const SIZE_LABEL: Record<ButtonSize, string> = { sm: 'S', md: 'M', lg: 'L' }
const SIZE_CODE: Record<ButtonSize, string> = { sm: 'small', md: 'medium', lg: 'large' }
const VARIANT_LABEL: Record<DemoVariant, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  action: 'Action',
  ghost: 'Ghost',
  destructive: 'Destructive',
}
const VARIANT_MAP: Record<DemoVariant, ButtonVariant> = {
  primary: 'primary',
  secondary: 'secondary',
  action: 'action',
  ghost: 'ghost',
  destructive: 'danger',
}

function previewOf(state: DemoState): DemoPreview | undefined {
  if (state === 'hover' || state === 'focus' || state === 'active') return state
  return undefined
}

const DEFAULTS = {
  variant: 'primary' as DemoVariant,
  size: 'md' as ButtonSize,
  state: 'default' as DemoState,
  icon: 'right' as DemoIcon,
  fullWidth: false,
}

const PROPS: PropRow[] = [
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'action' | 'ghost' | 'destructive'",
    defaultValue: "'primary'",
    description: 'Visual style of the control.',
  },
  {
    name: 'size',
    type: "'small' | 'medium' | 'large'",
    defaultValue: "'medium'",
    description: 'Padding and type scale.',
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Stretch the button to fill its container.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Prevents press and dims the control.',
  },
  {
    name: 'loading',
    type: 'boolean',
    defaultValue: 'false',
    description: 'Shows a spinner and blocks interaction.',
  },
  {
    name: 'leading',
    type: 'ReactNode',
    defaultValue: '—',
    description: 'Optional icon rendered before the label.',
  },
  {
    name: 'trailing',
    type: 'ReactNode',
    defaultValue: '—',
    description: 'Optional icon rendered after the label.',
  },
]

function buildSnippet(opts: {
  variant: DemoVariant
  size: ButtonSize
  state: DemoState
  icon: DemoIcon
  fullWidth: boolean
}) {
  const attrs: string[] = [`variant="${opts.variant}"`, `size="${SIZE_CODE[opts.size]}"`]
  if (opts.fullWidth) attrs.push('fullWidth')
  if (opts.state === 'disabled') attrs.push('disabled')
  if (opts.state === 'loading') attrs.push('loading')
  if (opts.icon === 'left') attrs.push('leading={<DkArrowDirectionLeft />}')
  if (opts.icon === 'right') attrs.push('trailing={<DkArrowDirectionRight />}')

  return `import { Button } from '@${brand.companyName.toLowerCase()}/devkit'\n\n<Button ${attrs.join(' ')}>\n  Button\n</Button>\n`
}

function DemoButton({
  variant,
  size,
  state,
  icon,
  fullWidth,
  preview,
}: {
  variant: DemoVariant
  size: ButtonSize
  state: DemoState
  icon: DemoIcon
  fullWidth: boolean
  preview?: DemoPreview
}) {
  const arrow = { size: 16, strokeWidth: 1.75, absoluteStrokeWidth: true } as const
  return (
    <Button
      variant={VARIANT_MAP[variant]}
      size={size}
      fullWidth={fullWidth}
      disabled={state === 'disabled'}
      loading={state === 'loading'}
      loadingText="Loading..."
      preview={preview ?? previewOf(state)}
      leading={icon === 'left' ? <DkArrowDirectionLeft {...arrow} /> : undefined}
      trailing={icon === 'right' ? <DkArrowDirectionRight {...arrow} /> : undefined}
    >
      Button
    </Button>
  )
}

export function ButtonStates() {
  return (
    <StateStack gap={8}>
      {VARIANTS.map((demoVariant) => (
        <StateGroup key={demoVariant} title={VARIANT_LABEL[demoVariant]}>
          <StateGrid columns={6}>
            {STATES.map((item) => (
              <StateCard key={item.value} label={item.label} inert>
                <DemoButton
                  variant={demoVariant}
                  size="md"
                  state={item.value}
                  icon="right"
                  fullWidth={false}
                />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}
    </StateStack>
  )
}

export function ButtonPreview() {
  return (
    <StateStack gap={10}>
      <div
        className={cn(
          'flex min-h-[min(52dvh,480px)] items-center justify-center',
          PREVIEW_INSET,
        )}
      >
        <div className="w-fit max-w-none">
          <DemoButton variant="primary" size="md" state="default" icon="right" fullWidth={false} />
        </div>
      </div>
      <div>
        <div className={PREVIEW_INSET}>
          <DocsSectionTitle>States</DocsSectionTitle>
        </div>
        <ButtonStates />
      </div>
    </StateStack>
  )
}

export function ButtonDocs() {
  const [variant, setVariant] = useState<DemoVariant>(DEFAULTS.variant)
  const [size, setSize] = useState<ButtonSize>(DEFAULTS.size)
  const [state, setState] = useState<DemoState>(DEFAULTS.state)
  const [icon, setIcon] = useState<DemoIcon>(DEFAULTS.icon)
  const [fullWidth, setFullWidth] = useState(DEFAULTS.fullWidth)
  const [grid, setGrid] = useState(false)
  const [replay, setReplay] = useState(0)

  const code = useMemo(
    () => buildSnippet({ variant, size, state, icon, fullWidth }),
    [variant, size, state, icon, fullWidth],
  )
  const fadeKey = `${variant}-${size}-${state}-${icon}-${fullWidth}-${replay}`

  function reset() {
    setVariant(DEFAULTS.variant)
    setSize(DEFAULTS.size)
    setState(DEFAULTS.state)
    setIcon(DEFAULTS.icon)
    setFullWidth(DEFAULTS.fullWidth)
  }

  return (
    <article>
      <DocsHeader
        crumb="Components / Actions / Button"
        title="Button"
        description="Beautiful, responsive buttons that make it clear what action users should take."
      />

      <section id="usage" className="mt-10 scroll-mt-20">
        <DocsSectionTitle>Usage</DocsSectionTitle>
        <DocsUsage>
            <Body>
              Buttons help users take action with confidence. Use a bold primary button for your main action, with softer 
              secondary and ghost buttons for alternatives. All buttons are sized perfectly for comfortable interaction 
              on any device.
            </Body>
          <CardGrid columns={3} gap="sm">
            <Card variant="subtle" size="sm" eyebrow="01" title="Clear priority" description="One bold primary button shows users the most important action, while other buttons support alternative choices." />
            <Card variant="subtle" size="sm" eyebrow="02" title="Verb first" description="Continue, Save, Delete. Not “Click here” and not a raw icon without a word." />
            <Card variant="subtle" size="sm" eyebrow="03" title="Smart feedback" description="When processing an action, buttons show a friendly loading state so users know something is happening." />
          </CardGrid>
          <CardGrid columns={2} gap="sm">
            <RuleCard size="sm" tone="success" title="Do" items={[
              'Use a primary button for the main action, secondary for alternatives, and ghost buttons for less important choices.',
              'Buttons automatically adjust their width to fit perfectly in forms and toolbars.',
              'Add icons to buttons when they help clarify the action, like arrows for navigation.',
            ]} />
            <RuleCard size="sm" tone="danger" title="Don’t" items={[
              'Avoid using multiple primary buttons on the same screen, as it can confuse users about what to do first.',
              'Reserve the red danger button for serious actions like deleting or removing items.',
              'Loading buttons are automatically disabled, so users cannot accidentally click them multiple times.',
            ]} />
          </CardGrid>
        </DocsUsage>
      </section>

      <section id="live-demo" className="mt-8 scroll-mt-20 animate-docs-demo-in motion-reduce:animate-none">
        <DocsDemoPanel
          fadeKey={fadeKey}
          previewHref="/preview/button"
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
                options={VARIANTS.map((value) => ({
                  value,
                  label: VARIANT_LABEL[value],
                }))}
              />
              <SegmentedControl
                label="Size"
                size="sm"
                value={size}
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
                label="Icon"
                value={icon}
                onChange={setIcon}
                options={[
                  { value: 'none', label: 'None' },
                  { value: 'left', label: 'Left' },
                  { value: 'right', label: 'Right' },
                ]}
              />
              <div className="flex flex-col gap-1">
                <Caption as="span">Full width</Caption>
                <div className="flex h-8 items-center">
                  <Switch
                    size="sm"
                    checked={fullWidth}
                    onChange={setFullWidth}
                    label="Full width"
                  />
                </div>
              </div>
            </>
          }
        >
          <DemoButton variant={variant} size={size} state={state} icon={icon} fullWidth={fullWidth} />
        </DocsDemoPanel>

        <div id="code" className="scroll-mt-20">
          <CodePanel code={code} fadeKey={fadeKey} />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <ButtonStates />
      </section>

      <section id="props" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Props</DocsSectionTitle>
        <PropsTable rows={PROPS} />
      </section>

      <section id="accessibility" className="mt-8 scroll-mt-20">
        <DocsSectionTitle>Accessibility</DocsSectionTitle>
                <div className="flex flex-col gap-4">
          <Alert title="Requirements">
            <p className="m-0">{"Our buttons are built to work perfectly for everyone, including people using keyboards and screen readers."}</p>
            <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
              <li>{"Built with proper HTML button elements for maximum compatibility with assistive technologies."}</li>
              <li>{"Fully keyboard accessible. Press Tab to navigate, then Space or Enter to activate."}</li>
              <li>{"Clear focus indicators show exactly which button is selected when navigating with a keyboard."}</li>
              <li>{"Disabled and loading buttons are clearly marked and cannot be accidentally activated."}</li>
              <li>{"Loading states communicate progress with both visual spinners and screen reader announcements."}</li>
              <li>{"Button sizes are optimized for comfortable clicking and tapping on any device."}</li>
            </ul>
          </Alert>
          <DataTable
            size="sm"
            variant="subtle"
            minWidth="320px"
            aria-label="Keyboard shortcuts"
            data={[
              { id: '0', keys: ["Tab"], action: "Move focus to the button" },
              { id: '1', keys: ["Space"], action: "Activate the button" },
              { id: '2', keys: ["Enter"], action: "Activate the button" },
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
            href="/components/icon-button"
            title="Icon Button"
            description="A compact button that shows only a glyph."
          />
          <RelatedCard
            href="/components/switch"
            title="Switch"
            description="An immediate on or off setting."
          />
          <RelatedCard
            href="/components/segmented-control"
            title="Segmented Control"
            description="A small set of options where only one can be selected."
          />
        </DocsRelated>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(DOCS_ITEMS, 'button')} />
    </article>
  )
}
