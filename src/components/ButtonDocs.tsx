'use client'

import { useMemo, useState } from 'react'
import {
  DkArrowDirectionLeft,
  DkArrowDirectionRight,
  DkTaskCompleteCheckmark
} from '@/icons'
import { adjacentDocs, DOCS_ITEMS } from '@/lib/docs-catalog'
import { brand } from '@/lib/devkit'
import { Badge } from './Badge'
import { Button, type ButtonSize, type ButtonVariant } from './Button'
import { Callout } from './Callout'
import { CodePanel } from './CodeBlock'
import { DocsDemoPanel } from './DocsDemoPanel'
import { DocsHeader, DocsSectionTitle } from './DocsCopy'
import { DocsPager } from './DocsPager'
import { Dropdown } from './Dropdown'
import { PropsTable, type PropRow } from './PropsTable'
import { RelatedCard } from './RelatedCard'
import { SegmentedControl } from './SegmentedControl'
import { Switch } from './Switch'
import { Caption } from './Text'

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
        description="A pressable control that triggers an action."
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
              <SegmentedControl
                label="Variant"
                value={variant}
                onChange={setVariant}
                options={VARIANTS.map((value) => ({
                  value,
                  label: VARIANT_LABEL[value],
                }))}
              />
              <SegmentedControl
                label="Size"
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
        <div className="flex flex-col gap-8">
          {VARIANTS.map((demoVariant) => (
            <div key={demoVariant}>
              <Caption className="mb-3 font-medium" tone="secondary">
                {VARIANT_LABEL[demoVariant]}
              </Caption>
              <div className="grid grid-cols-2 gap-4 min-[480px]:grid-cols-3 min-[1068px]:grid-cols-6">
                {STATES.map((item) => (
                  <div key={item.value} className="flex flex-col gap-2">
                    <div className="pointer-events-none flex h-[100px] items-center justify-center rounded-xl bg-bg-secondary px-4">
                      <DemoButton
                        variant={demoVariant}
                        size="md"
                        state={item.value}
                        icon="right"
                        fullWidth={false}
                      />
                    </div>
                    <Caption align="center">{item.label}</Caption>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="props" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Props</DocsSectionTitle>
        <PropsTable rows={PROPS} />
      </section>

      <section id="accessibility" className="mt-8 scroll-mt-20">
        <Callout>
          <ul className="m-0 list-disc space-y-1.5 pl-4">
            <li>Reachable and activatable with the keyboard — Tab to focus, Space or Enter to press.</li>
            <li>
              Uses a native <code className="font-mono text-[12px]">button</code> element, so{' '}
              <code className="font-mono text-[12px]">role=&quot;button&quot;</code> is not required.
            </li>
            <li>Focus is a 2px brand ring. Disabled and loading states are not focusable.</li>
            <li>Loading replaces the label with a status string and exposes a busy spinner.</li>
          </ul>
        </Callout>
      </section>

      <section className="mt-12">
        <DocsSectionTitle className="mb-3">Related</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-3 min-[735px]:grid-cols-3">
          <RelatedCard
            href="/components/icon-button"
            title="Icon Button"
            description="A compact control for a single icon action."
          />
          <RelatedCard
            href="/components/switch"
            title="Switch"
            description="A two-state control for an immediate setting."
          />
          <RelatedCard
            href="/components/segmented-control"
            title="Segmented Control"
            description="A mutually exclusive set of options."
          />
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(DOCS_ITEMS, 'button')} />
    </article>
  )
}
