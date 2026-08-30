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
import { DocsHeader, DocsMetaBadges, DocsSectionTitle } from './DocsCopy'
import { DocsRelated, DocsStack, DocsStateCard, DocsStateGrid, DocsStateGroup, DocsUsage } from './DocsCard'
import { A11ySection, DocsDoDont, DocsPrinciples, DocsProse } from './DocsGuide'
import { DocsPager } from './DocsPager'
import { Dropdown } from './Dropdown'
import { PropsTable, type PropRow } from './PropsTable'
import { RelatedCard } from './RelatedCard'
import { PREVIEW_INSET } from './PreviewMode'
import { SegmentedControl } from './SegmentedControl'
import { Switch } from './Switch'
import { Body, Caption } from './Text'

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
    <DocsStack gap={8}>
      {VARIANTS.map((demoVariant) => (
        <DocsStateGroup key={demoVariant} title={VARIANT_LABEL[demoVariant]}>
          <DocsStateGrid columns={6}>
            {STATES.map((item) => (
              <DocsStateCard key={item.value} label={item.label} inert>
                <DemoButton
                  variant={demoVariant}
                  size="md"
                  state={item.value}
                  icon="right"
                  fullWidth={false}
                />
              </DocsStateCard>
            ))}
          </DocsStateGrid>
        </DocsStateGroup>
      ))}
    </DocsStack>
  )
}

export function ButtonPreview() {
  return (
    <DocsStack gap={10}>
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
    </DocsStack>
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
        description="The main control for running an action. Use one primary button on a screen."
      >
        <DocsMetaBadges />
      </DocsHeader>

      <section id="usage" className="mt-10 scroll-mt-20">
        <DocsSectionTitle>Usage</DocsSectionTitle>
        <DocsUsage>
          <DocsProse>
            <Body>
              Button is the primary way to trigger an action. One primary per view. Secondary, action, and ghost sit
              beside it. Danger is destructive only. Height is 44px at medium — the same as fields — so a form row
              aligns.
            </Body>
          </DocsProse>
          <DocsPrinciples
            items={[
              { title: 'One primary', body: 'Filled brand-primary is the commit. Everything else is quieter on purpose.' },
              { title: 'Verb first', body: 'Continue, Save, Delete. Not “Click here” and not a raw icon without a word.' },
              { title: 'Loading replaces', body: 'The label becomes a status string and the control is inert until the promise settles.' },
            ]}
          />
          <DocsDoDont
            doItems={[
              'Use primary for the happy path, secondary for an alternate, ghost for dismiss.',
              'Pass fullWidth={false} when the button sits in a toolbar. The default is full width for forms.',
              'Use leading or trailing icons to reinforce a direction, not to decorate.',
            ]}
            dontItems={[
              'Do not place two primary buttons in the same view.',
              'Do not use danger for a routine cancel.',
              'Do not leave a loading button pressable — loading already disables it.',
            ]}
          />
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
        <A11ySection
          intro="A button is a native control. Do not recreate it with a clickable div."
          items={[
            'Uses a native button element, so role="button" is not required.',
            'Tab to focus. Space or Enter to press. Focus is a 2px brand ring.',
            'Disabled and loading are not focusable and cannot be activated.',
            'Loading replaces the label with a status string and exposes a busy spinner.',
            'Icon-only actions belong on Icon Button, which requires an accessible label.',
            'fullWidth defaults to true for forms. Pass false in toolbars so the hit target is the pill, not the row.',
          ]}
          keys={[
            { keys: ['Tab'], action: 'Focus the button' },
            { keys: ['Space'], action: 'Activate' },
            { keys: ['Enter'], action: 'Activate' },
          ]}
        />
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
