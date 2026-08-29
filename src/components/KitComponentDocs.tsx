'use client'

import { useState, type ComponentType, type ReactNode } from 'react'
import {
  DkClipboardCopyDuplicate,
  DkFavoriteHeartLove,
  DkMessageInboxTray,
  DkAppDashboardLayoutTiles,
  DkPadlockSecureClosed,
  DkEnvelopeMessageMail,
  DkPersonUserProfile,
  DkAtSign,
  DkFoldedMapTerritoryMapPinLocation,
  DkAddPlusCreate,
  DkRefreshClockwiseRotate,
  DkFloppyDiskSave,
  DkMagnifyingGlassFind,
  DkGearSettingsPreferences,
  DkShareExportForward,
  DkSecurityShieldProtect,
  DkHandheldMobilePhone,
  DkWasteBinDelete,
  DkLayoutGrid,
  DkBulletedListItems,
  DkRowsThree,
  DkGlobeWorldEarth,
  DkTextAlignStart,
  DkTextAlignCenter,
  DkTextAlignEnd,
  DkTypographyBoldWeight,
  DkTypographyItalicSlant,
  DkTypographyUnderline,
  DkPencilWriteEdit,
  DkDocumentPageFold
} from '@/icons'
import { Alert } from './Alert'
import { AuthBrand, AuthLayout } from './AuthLayout'
import { AuthProviderStack } from './AuthProviderButton'
import { Avatar } from './Avatar'
import { AvatarEditor } from './AvatarEditor'
import { AvatarPicker } from './AvatarPicker'
import { Badge } from './Badge'
import { BrandLogo } from './BrandLogo'
import { Breadcrumbs } from './Breadcrumbs'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import {
  ConfirmAction,
  CONFIRM_ACTION_TONES,
  CONFIRM_ACTION_VARIANTS,
  type ConfirmActionTone,
  type ConfirmActionVariant,
} from './ConfirmAction'
import { ConfirmDialog } from './ConfirmDialog'
import { CountrySelect } from './CountrySelect'
import { DashboardNav } from './DashboardNav'
import { DashboardShell } from './DashboardShell'
import { DashboardSidebar } from './DashboardSidebar'
import { DataTable } from './DataTable'
import { DatePicker } from './DatePicker'
import { Divider } from './Divider'
import { Dropdown, SELECT_SIZES, SELECT_VARIANTS, type DropdownOption, type SelectTriggerSize, type SelectTriggerVariant } from './Dropdown'
import { EmptyState } from './EmptyState'
import { FieldHint, FieldLabel, FormField } from './FieldLabel'
import { GitHubButton } from './GitHubButton'
import { GoogleButton } from './GoogleButton'
import { IconButton } from './IconButton'
import { IconTab } from './IconTab'
import { KeyValueRow } from './KeyValueRow'
import { KitDocArticle } from './KitDocArticle'
import { DocsStateCard, DocsStateGrid, DocsStateGroup, DocsStack } from './DocsCard'
import {
  bodyGuide,
  brandLogoGuide,
  captionGuide,
  confirmActionGuide,
  eyebrowGuide,
  headingGuide,
  iconButtonGuide,
  labelGuide,
  segmentedGuide,
  subheadGuide,
  switchGuide,
  themeIconToggleGuide,
  themeToggleGuide,
} from './kit-guides'
import { LanguageSelect } from './LanguageSelect'
import { ListGroup, ListRow } from './ListRow'
import { LoadingScreen } from './LoadingScreen'
import { Modal } from './Modal'
import { NavSearch } from './NavSearch'
import { OtpBoxes } from './OtpBoxes'
import { OtherWaysButton } from './OtherWaysButton'
import { PageHeader } from './PageHeader'
import { Pagination } from './Pagination'
import { PasswordField, PASSWORD_FIELD_VARIANTS } from './PasswordField'
import {
  PasswordReveal,
  PASSWORD_REVEAL_SIZES,
  PASSWORD_REVEAL_VARIANTS,
  type PasswordRevealSize,
  type PasswordRevealVariant,
} from './PasswordReveal'
import { PhoneInput } from './PhoneInput'
import { AppleButton } from './ProviderButtons'
import { ProfileButton } from './ProfileButton'
import { Progress } from './Progress'
import { type PropRow } from './PropsTable'
import { Radio } from './Radio'
import { RecoveryCodesList, RecoveryInput } from './RecoveryInput'
import { ScoreRing } from './ScoreRing'
import { SearchSelect } from './SearchSelect'
import { SelectTrigger } from './SelectTrigger'
import { SegmentedControl, SegmentedToolbar, SEGMENTED_VARIANTS, type SegmentedVariant } from './SegmentedControl'
import { SettingsList, SettingsRow } from './SettingsRow'
import { SheetNav } from './SheetNav'
import { SiteFooter } from './SiteFooter'
import { SiteNav } from './SiteNav'
import { Skeleton } from './Skeleton'
import { Slider } from './Slider'
import { StatCard } from './StatCard'
import { Switch, SwitchGroup, SwitchItem, SWITCH_VARIANTS, type SwitchVariant } from './Switch'
import { Tabs } from './Tabs'
import { Body, Caption, Eyebrow, Heading, Label, Subhead } from './Text'
import { Textarea, TEXTAREA_SIZES, TEXTAREA_VARIANTS, type TextareaSize, type TextareaVariant } from './Textarea'
import {
  TextField,
  TEXT_FIELD_SIZES,
  TEXT_FIELD_VARIANTS,
  type TextFieldSize,
  type TextFieldVariant,
} from './TextField'
import { AuthLegal, ErrorText, TextLink } from './TextLink'
import { ThemeIconToggle } from './ThemeIconToggle'
import { ThemeToggle } from './ThemeToggle'
import { TotpManualKey } from './TotpManualKey'
import { VerificationMethodCard } from './VerificationMethodCard'

function p(name: string, type: string, defaultValue: string, description: string): PropRow {
  return { name, type, defaultValue, description }
}

type DocDef = {
  title: string
  description: string
  Demo: ComponentType
  code: string
  states?: { label: string; node: ReactNode }[]
  statesContent?: ReactNode
  props: PropRow[]
  wide?: boolean
  usage?: ReactNode
  accessibility?: ReactNode
}

const glyph = { strokeWidth: 1.75, absoluteStrokeWidth: true } as const

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function IconButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <IconButton label="Search">
        <DkMagnifyingGlassFind size={18} {...glyph} />
      </IconButton>
      <IconButton label="Favorite" variant="subtle">
        <DkFavoriteHeartLove size={18} {...glyph} />
      </IconButton>
      <IconButton label="Share" variant="outline">
        <DkShareExportForward size={18} {...glyph} />
      </IconButton>
      <IconButton label="Add" variant="primary" onAction={() => wait(900)}>
        <DkAddPlusCreate size={18} {...glyph} />
      </IconButton>
      <IconButton label="Copy" onAction={() => wait(900)}>
        <DkClipboardCopyDuplicate size={18} {...glyph} />
      </IconButton>
      <IconButton label="Locked" disabled>
        <DkPadlockSecureClosed size={18} {...glyph} />
      </IconButton>
    </div>
  )
}

function BrandLogoDemo() {
  return (
    <div className="flex min-w-0 flex-col items-start gap-6">
      <BrandLogo variant="lockup" size={20} />
      <BrandLogo variant="text" size={20} />
      <div className="flex items-center gap-6">
        <BrandLogo size={32} />
        <BrandLogo variant="icon" size={32} />
      </div>
    </div>
  )
}

const SWITCH_VARIANT_LABEL: Record<SwitchVariant, string> = {
  primary: 'Primary',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  danger: 'Danger',
}

function SwitchDemo() {
  const [variants, setVariants] = useState<Record<SwitchVariant, boolean>>({
    primary: true,
    subtle: true,
    outline: false,
    ghost: true,
    danger: false,
  })
  const [notify, setNotify] = useState(true)
  const [digest, setDigest] = useState(false)
  const [alerts, setAlerts] = useState(true)
  const [preview, setPreview] = useState(true)

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-8">
      <div className="flex flex-wrap items-end justify-center gap-x-6 gap-y-4">
        {SWITCH_VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <Switch
              variant={variant}
              checked={variants[variant]}
              onChange={(next) => setVariants((current) => ({ ...current, [variant]: next }))}
              label={SWITCH_VARIANT_LABEL[variant]}
            />
            <Caption as="span">{SWITCH_VARIANT_LABEL[variant]}</Caption>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <Caption as="span">Group</Caption>
        <SwitchGroup label="Preferences">
          <SwitchItem
            title="Notifications"
            description="Push and email alerts"
            checked={notify}
            onChange={setNotify}
          />
          <SwitchItem
            title="Weekly digest"
            description="A summary every Monday"
            checked={digest}
            onChange={setDigest}
            variant="subtle"
          />
          <SwitchItem
            title="Security alerts"
            description="Sign-in and recovery"
            checked={alerts}
            onChange={setAlerts}
            variant="danger"
          />
          <SwitchItem
            title="Preview features"
            checked={preview}
            onChange={setPreview}
            variant="outline"
            size="sm"
          />
        </SwitchGroup>
      </div>
    </div>
  )
}

const RANGE = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
] as const

const VARIANT_LABEL: Record<SegmentedVariant, string> = {
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  primary: 'Primary',
  pill: 'Pill',
}

function viewIcon(name: 'grid' | 'list' | 'gallery', size = 18) {
  const props = { size, ...glyph }
  if (name === 'grid') return <DkLayoutGrid {...props} />
  if (name === 'list') return <DkBulletedListItems {...props} />
  return <DkRowsThree {...props} />
}

function alignIcon(name: 'start' | 'center' | 'end', size = 18) {
  const props = { size, ...glyph }
  if (name === 'start') return <DkTextAlignStart {...props} />
  if (name === 'center') return <DkTextAlignCenter {...props} />
  return <DkTextAlignEnd {...props} />
}

function SegmentedDemo() {
  const [text, setText] = useState<'day' | 'week' | 'month'>('week')
  const [both, setBoth] = useState<'grid' | 'list' | 'gallery'>('list')
  const [icon, setIcon] = useState<'start' | 'center' | 'end'>('center')
  const [grouped, setGrouped] = useState<'edit' | 'preview' | 'code'>('preview')
  const [action, setAction] = useState<'day' | 'week' | 'month'>('week')

  return (
    <div className="flex w-full flex-col gap-8">
      <SegmentedControl
        label="Text"
        value={text}
        onChange={setText}
        fullWidth
        options={[...RANGE]}
      />
      <SegmentedControl
        label="Icon and text"
        content="both"
        value={both}
        onChange={setBoth}
        fullWidth
        options={[
          { value: 'grid', label: 'Grid', icon: viewIcon('grid') },
          { value: 'list', label: 'List', icon: viewIcon('list') },
          { value: 'gallery', label: 'Gallery', icon: viewIcon('gallery') },
        ]}
      />
      <SegmentedControl
        label="Icon"
        content="icon"
        value={icon}
        onChange={setIcon}
        options={[
          { value: 'start', label: 'Align left', icon: alignIcon('start') },
          { value: 'center', label: 'Align center', icon: alignIcon('center') },
          { value: 'end', label: 'Align right', icon: alignIcon('end') },
        ]}
      />
      <SegmentedControl
        label="Grouped buttons"
        mode="grouped"
        value={grouped}
        onChange={setGrouped}
        fullWidth
        options={[
          { value: 'edit', label: 'Edit' },
          { value: 'preview', label: 'Preview' },
          { value: 'code', label: 'Code' },
        ]}
      />
      <SegmentedControl
        label="On action"
        value={action}
        onChange={setAction}
        fullWidth
        onAction={() => wait(900)}
        options={[...RANGE]}
      />
      <div className="flex flex-col gap-2">
        <Caption as="span">Together</Caption>
        <SegmentedToolbar>
          <SegmentedControl
            content="icon"
            value={icon}
            onChange={setIcon}
            options={[
              { value: 'start', label: 'Align left', icon: alignIcon('start') },
              { value: 'center', label: 'Align center', icon: alignIcon('center') },
              { value: 'end', label: 'Align right', icon: alignIcon('end') },
            ]}
          />
          <IconButton label="Refresh" onAction={() => wait(900)}>
            <DkRefreshClockwiseRotate size={18} {...glyph} />
          </IconButton>
          <Button fullWidth={false} size="md" onClick={() => undefined}>
            Save
          </Button>
        </SegmentedToolbar>
      </div>
    </div>
  )
}

function SegmentedStates() {
  const [range, setRange] = useState<'day' | 'week' | 'month'>('week')
  const [view, setView] = useState<'grid' | 'list' | 'gallery'>('grid')
  const [align, setAlign] = useState<'start' | 'center' | 'end'>('center')
  const [style, setStyle] = useState<'bold' | 'italic' | 'underline'>('bold')
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [mail, setMail] = useState<'all' | 'unread' | 'flagged'>('unread')

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Appearance
        </Caption>
        <div className="flex flex-col gap-6">
          {SEGMENTED_VARIANTS.map((item) => (
            <div key={item} className="flex flex-col gap-2">
              <Caption>{VARIANT_LABEL[item]}</Caption>
              <SegmentedControl
                variant={item}
                value={range}
                onChange={setRange}
                fullWidth
                options={[...RANGE]}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Content
        </Caption>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Caption>Icon and text</Caption>
            <SegmentedControl
              content="both"
              value={view}
              onChange={setView}
              fullWidth
              options={[
                { value: 'grid', label: 'Grid', icon: viewIcon('grid') },
                { value: 'list', label: 'List', icon: viewIcon('list') },
                { value: 'gallery', label: 'Gallery', icon: viewIcon('gallery') },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Icon and text, primary</Caption>
            <SegmentedControl
              content="both"
              variant="primary"
              value={view}
              onChange={setView}
              fullWidth
              options={[
                { value: 'grid', label: 'Grid', icon: viewIcon('grid') },
                { value: 'list', label: 'List', icon: viewIcon('list') },
                { value: 'gallery', label: 'Gallery', icon: viewIcon('gallery') },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Icon</Caption>
            <SegmentedControl
              content="icon"
              value={align}
              onChange={setAlign}
              options={[
                { value: 'start', label: 'Align left', icon: alignIcon('start') },
                { value: 'center', label: 'Align center', icon: alignIcon('center') },
                { value: 'end', label: 'Align right', icon: alignIcon('end') },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Icon, pill</Caption>
            <SegmentedControl
              content="icon"
              variant="pill"
              value={style}
              onChange={setStyle}
              options={[
                { value: 'bold', label: 'Bold', icon: <DkTypographyBoldWeight size={18} {...glyph} /> },
                { value: 'italic', label: 'Italic', icon: <DkTypographyItalicSlant size={18} {...glyph} /> },
                { value: 'underline', label: 'Underline', icon: <DkTypographyUnderline size={18} {...glyph} /> },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Badge</Caption>
            <SegmentedControl
              value={mail}
              onChange={setMail}
              fullWidth
              options={[
                { value: 'all', label: 'All', badge: 128 },
                { value: 'unread', label: 'Unread', badge: 12 },
                { value: 'flagged', label: 'Flagged', badge: 3 },
              ]}
            />
          </div>
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Size
        </Caption>
        <div className="flex flex-col gap-6">
          {(['sm', 'md', 'lg'] as const).map((item) => (
            <div key={item} className="flex flex-col gap-2">
              <Caption>{item === 'sm' ? 'Small' : item === 'md' ? 'Medium' : 'Large'}</Caption>
              <SegmentedControl
                size={item}
                value={size}
                onChange={setSize}
                fullWidth
                options={[
                  { value: 'sm', label: 'Small' },
                  { value: 'md', label: 'Medium' },
                  { value: 'lg', label: 'Large' },
                ]}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          State
        </Caption>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Caption>Disabled</Caption>
            <SegmentedControl disabled value="week" onChange={() => undefined} fullWidth options={[...RANGE]} />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Option disabled</Caption>
            <SegmentedControl
              value="week"
              onChange={() => undefined}
              fullWidth
              options={[
                { value: 'day', label: 'Day' },
                { value: 'week', label: 'Week' },
                { value: 'year', label: 'Year', disabled: true },
              ]}
            />
          </div>
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Grouped buttons
        </Caption>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Caption>Text</Caption>
            <SegmentedControl
              mode="grouped"
              value={range}
              onChange={setRange}
              fullWidth
              options={[...RANGE]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Icon and text</Caption>
            <SegmentedControl
              mode="grouped"
              content="both"
              value={view}
              onChange={setView}
              fullWidth
              options={[
                { value: 'grid', label: 'Grid', icon: viewIcon('grid') },
                { value: 'list', label: 'List', icon: viewIcon('list') },
                { value: 'gallery', label: 'Gallery', icon: viewIcon('gallery') },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Icon buttons</Caption>
            <SegmentedControl
              mode="grouped"
              content="icon"
              variant="outline"
              value={align}
              onChange={setAlign}
              options={[
                { value: 'start', label: 'Align left', icon: alignIcon('start') },
                { value: 'center', label: 'Align center', icon: alignIcon('center') },
                { value: 'end', label: 'Align right', icon: alignIcon('end') },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Primary grouped</Caption>
            <SegmentedControl
              mode="grouped"
              variant="primary"
              value={range}
              onChange={setRange}
              fullWidth
              options={[...RANGE]}
            />
          </div>
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Loaders and actions
        </Caption>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Caption>Loading segment</Caption>
            <SegmentedControl
              value="week"
              onChange={() => undefined}
              fullWidth
              options={[
                { value: 'day', label: 'Day' },
                { value: 'week', label: 'Week', loading: true },
                { value: 'month', label: 'Month' },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>On action</Caption>
            <SegmentedControl
              value={range}
              onChange={setRange}
              fullWidth
              onAction={() => wait(900)}
              options={[...RANGE]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Icon action</Caption>
            <SegmentedControl
              content="icon"
              variant="outline"
              value={align}
              onChange={setAlign}
              options={[
                {
                  value: 'start',
                  label: 'Align left',
                  icon: alignIcon('start'),
                  onAction: () => wait(700),
                },
                {
                  value: 'center',
                  label: 'Align center',
                  icon: alignIcon('center'),
                  onAction: () => wait(700),
                },
                {
                  value: 'end',
                  label: 'Align right',
                  icon: alignIcon('end'),
                  onAction: () => wait(700),
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Together
        </Caption>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Caption>Segmented, icon button, and button</Caption>
            <SegmentedToolbar>
              <SegmentedControl
                mode="grouped"
                value={range}
                onChange={setRange}
                options={[...RANGE]}
              />
              <IconButton label="Refresh" onAction={() => wait(900)}>
                <DkRefreshClockwiseRotate size={18} {...glyph} />
              </IconButton>
              <Button fullWidth={false}>Apply</Button>
            </SegmentedToolbar>
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Leading and trailing</Caption>
            <SegmentedControl
              value={view}
              onChange={setView}
              content="both"
              fullWidth
              options={[
                { value: 'grid', label: 'Grid', icon: viewIcon('grid') },
                { value: 'list', label: 'List', icon: viewIcon('list') },
                { value: 'gallery', label: 'Gallery', icon: viewIcon('gallery') },
              ]}
              leading={
                <IconButton label="Add" variant="subtle" onAction={() => wait(700)}>
                  <DkAddPlusCreate size={18} {...glyph} />
                </IconButton>
              }
              trailing={
                <>
                  <IconButton label="Refresh" variant="outline" onAction={() => wait(700)}>
                    <DkRefreshClockwiseRotate size={18} {...glyph} />
                  </IconButton>
                  <Button fullWidth={false} size="md">
                    Save
                  </Button>
                </>
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Attached</Caption>
            <SegmentedToolbar attached>
              <SegmentedControl
                variant="ghost"
                mode="grouped"
                value={range}
                onChange={setRange}
                className="flex-1"
                options={[...RANGE]}
              />
              <Button fullWidth={false} size="md">
                Apply
              </Button>
            </SegmentedToolbar>
          </div>
        </div>
      </div>
    </div>
  )
}

const CONFIRM_VARIANT_LABEL: Record<ConfirmActionVariant, string> = {
  text: 'Text',
  ghost: 'Ghost',
  subtle: 'Subtle',
  outline: 'Outline',
  solid: 'Solid',
}

const CONFIRM_TONE_LABEL: Record<ConfirmActionTone, string> = {
  danger: 'Danger',
  brand: 'Brand',
  neutral: 'Neutral',
}

function ConfirmActionDemo() {
  return (
    <div className="flex w-full flex-wrap items-end justify-center gap-x-5 gap-y-4">
      {CONFIRM_ACTION_VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-2">
          <ConfirmAction variant={variant} onConfirm={() => undefined} />
          <Caption as="span">{CONFIRM_VARIANT_LABEL[variant]}</Caption>
        </div>
      ))}
    </div>
  )
}

function ConfirmActionStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Appearance">
        <DocsStateGrid>
          {CONFIRM_ACTION_VARIANTS.map((variant) => (
            <DocsStateCard key={variant} label={CONFIRM_VARIANT_LABEL[variant]}>
              <ConfirmAction variant={variant} onConfirm={() => undefined} />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Tone">
        <DocsStateGrid>
          {CONFIRM_ACTION_TONES.map((tone) => (
            <DocsStateCard key={`text-${tone}`} label={`Text, ${CONFIRM_TONE_LABEL[tone].toLowerCase()}`}>
              <ConfirmAction
                tone={tone}
                label={tone === 'brand' ? 'Send' : tone === 'neutral' ? 'Archive' : 'Remove'}
                confirmLabel={tone === 'brand' ? 'Send now?' : 'Confirm?'}
                onConfirm={() => undefined}
              />
            </DocsStateCard>
          ))}
          {CONFIRM_ACTION_TONES.map((tone) => (
            <DocsStateCard key={`solid-${tone}`} label={`Solid, ${CONFIRM_TONE_LABEL[tone].toLowerCase()}`}>
              <ConfirmAction
                variant="solid"
                tone={tone}
                label={tone === 'brand' ? 'Publish' : tone === 'neutral' ? 'Move' : 'Delete'}
                confirmLabel={tone === 'brand' ? 'Publish now?' : 'Confirm?'}
                onConfirm={() => undefined}
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Size">
        <DocsStateGrid columns={3}>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <DocsStateCard key={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}>
              <ConfirmAction variant="outline" size={size} onConfirm={() => undefined} />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="State">
        <DocsStateGrid>
          <DocsStateCard label="Loading">
            <ConfirmAction variant="solid" loading onConfirm={() => undefined} />
          </DocsStateCard>
          <DocsStateCard label="Loading, brand">
            <ConfirmAction
              variant="solid"
              tone="brand"
              label="Send"
              loading
              loadingText="Sending…"
              onConfirm={() => undefined}
            />
          </DocsStateCard>
          <DocsStateCard label="Disabled">
            <ConfirmAction variant="outline" disabled onConfirm={() => undefined} />
          </DocsStateCard>
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}

const FIELD_GLYPH = { size: 18, strokeWidth: 1.6, absoluteStrokeWidth: true } as const

const TEXT_FIELD_VARIANT_LABEL: Record<TextFieldVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
  underline: 'Underline',
  pill: 'Pill',
}

const TEXT_FIELD_SIZE_LABEL: Record<TextFieldSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

function FieldState({ label, children }: { label: string; children: ReactNode }) {
  return (
    <DocsStateCard label={label} align="stretch">
      {children}
    </DocsStateCard>
  )
}

function TextFieldDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-4">
      {TEXT_FIELD_VARIANTS.map((variant) => (
        <TextField
          key={variant}
          variant={variant}
          icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
          placeholder={`${TEXT_FIELD_VARIANT_LABEL[variant]} email`}
        />
      ))}
    </div>
  )
}

function TextFieldStates() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Appearance
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          {TEXT_FIELD_VARIANTS.map((variant) => (
            <FieldState key={variant} label={TEXT_FIELD_VARIANT_LABEL[variant]}>
              <TextField
                variant={variant}
                icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
                placeholder="Email address"
              />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Size
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-3">
          {TEXT_FIELD_SIZES.map((size) => (
            <FieldState key={size} label={TEXT_FIELD_SIZE_LABEL[size]}>
              <TextField
                size={size}
                icon={<DkEnvelopeMessageMail size={size === 'sm' ? 16 : 18} strokeWidth={1.6} absoluteStrokeWidth />}
                placeholder="Email address"
              />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          State
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          <FieldState label="Empty">
            <TextField icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />} placeholder="Email address" />
          </FieldState>
          <FieldState label="Filled">
            <TextField
              icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
              placeholder="Email address"
              defaultValue="alex@roboticela.com"
            />
          </FieldState>
          <FieldState label="Hover">
            <TextField
              icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
              placeholder="Email address"
              preview="hover"
            />
          </FieldState>
          <FieldState label="Focus">
            <TextField
              icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
              placeholder="Email address"
              defaultValue="alex@roboticela.com"
              preview="focus"
            />
          </FieldState>
          <FieldState label="Invalid">
            <TextField
              icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
              placeholder="Email address"
              defaultValue="alex"
              invalid
            />
          </FieldState>
          <FieldState label="Valid">
            <TextField
              icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
              placeholder="Email address"
              defaultValue="alex@roboticela.com"
              valid
            />
          </FieldState>
          <FieldState label="Disabled">
            <TextField
              icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
              placeholder="Email address"
              defaultValue="alex@roboticela.com"
              disabled
            />
          </FieldState>
          <FieldState label="Read only">
            <TextField
              icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
              placeholder="Email address"
              defaultValue="alex@roboticela.com"
              readOnly
            />
          </FieldState>
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Icons
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          <FieldState label="Name">
            <TextField
              icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
              placeholder="Display name"
              defaultValue="Alex Rivera"
            />
          </FieldState>
          <FieldState label="Username">
            <TextField icon={<DkAtSign {...FIELD_GLYPH} />} placeholder="Username" defaultValue="alex" />
          </FieldState>
          <FieldState label="Search">
            <TextField
              variant="pill"
              icon={<DkMagnifyingGlassFind {...FIELD_GLYPH} />}
              placeholder="Search"
            />
          </FieldState>
          <FieldState label="Location">
            <TextField
              variant="subtle"
              icon={<DkFoldedMapTerritoryMapPinLocation {...FIELD_GLYPH} />}
              placeholder="City"
              defaultValue="Karachi"
            />
          </FieldState>
          <FieldState label="Phone">
            <TextField
              variant="ghost"
              icon={<DkHandheldMobilePhone {...FIELD_GLYPH} />}
              placeholder="Phone number"
              defaultValue="+1 415 555 2671"
            />
          </FieldState>
          <FieldState label="Underline">
            <TextField
              variant="underline"
              icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
              placeholder="Full name"
            />
          </FieldState>
        </div>
      </div>
    </div>
  )
}

function PasswordRevealDemo() {
  const [open, setOpen] = useState<Record<PasswordRevealVariant, boolean>>({
    ghost: false,
    subtle: false,
    outline: true,
    text: false,
    pill: true,
  })

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {PASSWORD_REVEAL_VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <PasswordReveal
              inField={false}
              variant={variant}
              visible={open[variant]}
              onToggle={() => setOpen((current) => ({ ...current, [variant]: !current[variant] }))}
            />
            <Caption as="span">{PASSWORD_REVEAL_LABEL[variant]}</Caption>
          </div>
        ))}
      </div>
      <PasswordField defaultValue="password" />
    </div>
  )
}

const PASSWORD_REVEAL_LABEL: Record<PasswordRevealVariant, string> = {
  ghost: 'Ghost',
  subtle: 'Subtle',
  outline: 'Outline',
  text: 'Text',
  pill: 'Pill',
}

const PASSWORD_REVEAL_SIZE_LABEL: Record<PasswordRevealSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

function PasswordRevealStates() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Appearance
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          {PASSWORD_REVEAL_VARIANTS.map((variant) => (
            <FieldState key={variant} label={PASSWORD_REVEAL_LABEL[variant]}>
              <PasswordField reveal={variant} defaultValue="password" />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Size
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-3">
          {PASSWORD_REVEAL_SIZES.map((size) => (
            <FieldState key={size} label={PASSWORD_REVEAL_SIZE_LABEL[size]}>
              <PasswordField size={size} reveal="pill" defaultValue="password" />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          State
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          <FieldState label="Hidden">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {PASSWORD_REVEAL_VARIANTS.map((variant) => (
                <PasswordReveal
                  key={variant}
                  inField={false}
                  variant={variant}
                  visible={false}
                  onToggle={() => undefined}
                />
              ))}
            </div>
          </FieldState>
          <FieldState label="Shown">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {PASSWORD_REVEAL_VARIANTS.map((variant) => (
                <PasswordReveal
                  key={variant}
                  inField={false}
                  variant={variant}
                  visible
                  onToggle={() => undefined}
                />
              ))}
            </div>
          </FieldState>
          <FieldState label="Disabled">
            <PasswordField reveal="ghost" defaultValue="password" disabled />
          </FieldState>
        </div>
      </div>
    </div>
  )
}

function PasswordFieldDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-4">
      {PASSWORD_FIELD_VARIANTS.map((variant) => (
        <PasswordField
          key={variant}
          variant={variant}
          placeholder={`${TEXT_FIELD_VARIANT_LABEL[variant]} password`}
          defaultValue="password"
        />
      ))}
    </div>
  )
}

function PasswordFieldStates() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Appearance
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          {PASSWORD_FIELD_VARIANTS.map((variant) => (
            <FieldState key={variant} label={TEXT_FIELD_VARIANT_LABEL[variant]}>
              <PasswordField variant={variant} defaultValue="password" />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Reveal
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          {PASSWORD_REVEAL_VARIANTS.map((reveal) => (
            <FieldState key={reveal} label={PASSWORD_REVEAL_LABEL[reveal]}>
              <PasswordField reveal={reveal} defaultValue="password" />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Size
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-3">
          {TEXT_FIELD_SIZES.map((size) => (
            <FieldState key={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}>
              <PasswordField size={size} defaultValue="password" />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          State
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          <FieldState label="Empty">
            <PasswordField />
          </FieldState>
          <FieldState label="Filled">
            <PasswordField defaultValue="password" />
          </FieldState>
          <FieldState label="Shown">
            <PasswordField defaultValue="password" visible />
          </FieldState>
          <FieldState label="Hover">
            <PasswordField defaultValue="password" preview="hover" />
          </FieldState>
          <FieldState label="Focus">
            <PasswordField defaultValue="password" preview="focus" />
          </FieldState>
          <FieldState label="Invalid">
            <PasswordField defaultValue="123" invalid />
          </FieldState>
          <FieldState label="Valid">
            <PasswordField defaultValue="password" valid />
          </FieldState>
          <FieldState label="Disabled">
            <PasswordField defaultValue="password" disabled />
          </FieldState>
        </div>
      </div>
    </div>
  )
}

const TEXTAREA_VARIANT_LABEL: Record<TextareaVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
  underline: 'Underline',
  well: 'Well',
  composer: 'Composer',
}

const TEXTAREA_SIZE_LABEL: Record<TextareaSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

function AreaState({ label, children }: { label: string; children: ReactNode }) {
  return (
    <DocsStateCard label={label} align="stretch" size="lg" wide>
      {children}
    </DocsStateCard>
  )
}

function TextareaDemo() {
  return (
    <div className="grid w-full gap-4 min-[735px]:grid-cols-2">
      {TEXTAREA_VARIANTS.filter((variant) => variant !== 'composer').map((variant) => (
        <Textarea
          key={variant}
          variant={variant}
          size="sm"
          rows={3}
          icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
          placeholder={`${TEXTAREA_VARIANT_LABEL[variant]} note`}
        />
      ))}
      <div className="min-[735px]:col-span-2">
        <Textarea
          variant="composer"
          icon={<DkMessageInboxTray {...FIELD_GLYPH} />}
          placeholder="Write a note for your team"
          hint="Visible to your workspace"
          maxLength={160}
          defaultValue="Ship the auth kit on Monday."
        />
      </div>
    </div>
  )
}

function TextareaStates() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Appearance
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          {TEXTAREA_VARIANTS.map((variant) => (
            <AreaState key={variant} label={TEXTAREA_VARIANT_LABEL[variant]}>
              <Textarea
                variant={variant}
                size="sm"
                rows={3}
                icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
                placeholder="Write a note"
                maxLength={variant === 'composer' ? 80 : undefined}
                hint={variant === 'composer' ? 'Visible to your team' : undefined}
              />
            </AreaState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Size
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-3">
          {TEXTAREA_SIZES.map((size) => (
            <AreaState key={size} label={TEXTAREA_SIZE_LABEL[size]}>
              <Textarea
                size={size}
                rows={size === 'lg' ? 5 : 3}
                icon={<DkPencilWriteEdit size={size === 'sm' ? 16 : 18} strokeWidth={1.6} absoluteStrokeWidth />}
                placeholder="Write a note"
              />
            </AreaState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          State
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          <AreaState label="Empty">
            <Textarea size="sm" rows={3} icon={<DkPencilWriteEdit {...FIELD_GLYPH} />} placeholder="Write a note" />
          </AreaState>
          <AreaState label="Filled">
            <Textarea
              size="sm"
              rows={3}
              icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
              placeholder="Write a note"
              defaultValue="Ship the auth kit on Monday."
            />
          </AreaState>
          <AreaState label="Hover">
            <Textarea
              size="sm"
              rows={3}
              icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
              placeholder="Write a note"
              preview="hover"
            />
          </AreaState>
          <AreaState label="Focus">
            <Textarea
              size="sm"
              rows={3}
              icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
              placeholder="Write a note"
              defaultValue="Ship the auth kit on Monday."
              preview="focus"
            />
          </AreaState>
          <AreaState label="Invalid">
            <Textarea
              size="sm"
              rows={3}
              icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
              placeholder="Write a note"
              defaultValue="Too short"
              invalid
            />
          </AreaState>
          <AreaState label="Valid">
            <Textarea
              size="sm"
              rows={3}
              icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
              placeholder="Write a note"
              defaultValue="Ship the auth kit on Monday."
              valid
            />
          </AreaState>
          <AreaState label="Disabled">
            <Textarea
              size="sm"
              rows={3}
              icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
              placeholder="Write a note"
              defaultValue="Locked"
              disabled
            />
          </AreaState>
          <AreaState label="Read only">
            <Textarea
              size="sm"
              rows={3}
              icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
              placeholder="Write a note"
              defaultValue="Published copy."
              readOnly
            />
          </AreaState>
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Composer
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          <AreaState label="Feedback">
            <Textarea
              variant="composer"
              size="sm"
              icon={<DkMessageInboxTray {...FIELD_GLYPH} />}
              placeholder="What can we improve?"
              hint="Sent to the product team"
              maxLength={120}
            />
          </AreaState>
          <AreaState label="Well, counted">
            <Textarea
              variant="well"
              size="sm"
              rows={3}
              icon={<DkDocumentPageFold {...FIELD_GLYPH} />}
              placeholder="Internal note"
              defaultValue="Keep the Monday launch note short."
              count
              maxLength={80}
            />
          </AreaState>
        </div>
      </div>
    </div>
  )
}

const SELECT_GLYPH = { size: 18, strokeWidth: 1.6, absoluteStrokeWidth: true } as const

const SELECT_SIZE_OPTIONS: DropdownOption[] = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
]

const SELECT_PLAN_OPTIONS: DropdownOption[] = [
  {
    value: 'starter',
    label: 'Starter',
    description: 'One workspace',
    icon: <DkLayoutGrid {...SELECT_GLYPH} />,
  },
  {
    value: 'team',
    label: 'Team',
    description: 'Up to ten people',
    icon: <DkRowsThree {...SELECT_GLYPH} />,
  },
  {
    value: 'studio',
    label: 'Studio',
    description: 'Unlimited seats',
    icon: <DkAppDashboardLayoutTiles {...SELECT_GLYPH} />,
  },
  {
    value: 'enterprise',
    label: 'Enterprise',
    description: 'Coming later',
    icon: <DkGlobeWorldEarth {...SELECT_GLYPH} />,
    disabled: true,
  },
]

const SELECT_VARIANT_LABEL: Record<SelectTriggerVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
  underline: 'Underline',
  pill: 'Pill',
}

function SelectPlay({
  value: initial = 'md',
  options = SELECT_SIZE_OPTIONS,
  ...rest
}: {
  value?: string
  options?: DropdownOption[]
  label?: string
  variant?: SelectTriggerVariant
  size?: SelectTriggerSize
  icon?: ReactNode
  placeholder?: string
  searchable?: boolean
  searchPlaceholder?: string
  invalid?: boolean
  valid?: boolean
  disabled?: boolean
  compact?: boolean
}) {
  const [value, setValue] = useState(initial)
  return <Dropdown value={value} onChange={setValue} options={options} {...rest} />
}

function SelectDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-4">
      {SELECT_VARIANTS.map((variant) => (
        <SelectPlay
          key={variant}
          variant={variant}
          icon={<DkGlobeWorldEarth {...SELECT_GLYPH} />}
          placeholder={`${SELECT_VARIANT_LABEL[variant]} select`}
        />
      ))}
    </div>
  )
}

function SelectStates() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Appearance
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          {SELECT_VARIANTS.map((variant) => (
            <FieldState key={variant} label={SELECT_VARIANT_LABEL[variant]}>
              <SelectPlay variant={variant} />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Icons
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2">
          <FieldState label="Field icon">
            <SelectPlay icon={<DkGlobeWorldEarth {...SELECT_GLYPH} />} placeholder="Region" />
          </FieldState>
          <FieldState label="Option icons">
            <SelectPlay value="team" options={SELECT_PLAN_OPTIONS} placeholder="Plan" />
          </FieldState>
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Search
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2">
          <FieldState label="Filterable list">
            <SelectPlay
              searchable
              searchPlaceholder="Search plans"
              value="team"
              options={SELECT_PLAN_OPTIONS}
              placeholder="Plan"
            />
          </FieldState>
          <FieldState label="Search, subtle">
            <SelectPlay
              variant="subtle"
              searchable
              searchPlaceholder="Search"
              icon={<DkMagnifyingGlassFind {...SELECT_GLYPH} />}
              options={SELECT_PLAN_OPTIONS}
              placeholder="Plan"
            />
          </FieldState>
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Size
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-3">
          {SELECT_SIZES.map((size) => (
            <FieldState key={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}>
              <SelectPlay size={size} icon={<DkGlobeWorldEarth {...SELECT_GLYPH} />} />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          State
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          <FieldState label="Empty">
            <SelectPlay value="" placeholder="Choose a size" />
          </FieldState>
          <FieldState label="Filled">
            <SelectPlay />
          </FieldState>
          <FieldState label="Hover">
            <SelectTrigger preview="hover">Medium</SelectTrigger>
          </FieldState>
          <FieldState label="Open">
            <SelectTrigger preview="open" leading={<DkGlobeWorldEarth {...SELECT_GLYPH} />}>
              Medium
            </SelectTrigger>
          </FieldState>
          <FieldState label="Invalid">
            <SelectPlay invalid />
          </FieldState>
          <FieldState label="Valid">
            <SelectPlay valid />
          </FieldState>
          <FieldState label="Disabled">
            <SelectPlay disabled />
          </FieldState>
          <FieldState label="Compact">
            <SelectPlay compact />
          </FieldState>
        </div>
      </div>
    </div>
  )
}

function SearchSelectDemo() {
  const [value, setValue] = useState('team')
  return (
    <div className="w-full max-w-[400px]">
      <SearchSelect
        label="Plan"
        value={value}
        onChange={setValue}
        placeholder="Choose a plan"
        searchPlaceholder="Search plans"
        options={SELECT_PLAN_OPTIONS.filter((option) => !option.disabled)}
      />
    </div>
  )
}

function CountryDemo() {
  const [value, setValue] = useState<string | null>('US')
  return <CountrySelect value={value} onChange={setValue} />
}

function LanguageDemo() {
  const [value, setValue] = useState<string | null>('en-US')
  return <LanguageSelect value={value} onChange={setValue} />
}

function PhoneDemo() {
  const [value, setValue] = useState('+14155552671')
  return <PhoneInput value={value} onChange={setValue} />
}

function CheckboxDemo() {
  const [on, setOn] = useState(true)
  return <Checkbox label="Email me product updates" checked={on} onChange={() => setOn((v) => !v)} />
}

function RadioDemo() {
  const [value, setValue] = useState('card')
  return (
    <div className="flex flex-col gap-3">
      <Radio name="pay" label="Card" checked={value === 'card'} onChange={() => setValue('card')} />
      <Radio name="pay" label="Bank" checked={value === 'bank'} onChange={() => setValue('bank')} />
    </div>
  )
}

function SliderDemo() {
  const [value, setValue] = useState(48)
  return <Slider label="Volume" value={value} onValueChange={setValue} min={0} max={100} />
}

function DateDemo() {
  const [value, setValue] = useState<string | null>('2026-08-29')
  return <DatePicker value={value} onChange={setValue} />
}

function OtpDemo() {
  const [value, setValue] = useState(['', '', '', '', '', ''])
  return <OtpBoxes value={value} onChange={setValue} />
}

function RecoveryDemo() {
  const [value, setValue] = useState('XJ4K-9M2P')
  return <RecoveryInput value={value} onChange={setValue} />
}

function TabsDemo() {
  const [value, setValue] = useState('all')
  return (
    <Tabs
      value={value}
      onChange={setValue}
      items={[
        { id: 'all', label: 'All' },
        { id: 'live', label: 'Live' },
        { id: 'review', label: 'In review' },
      ]}
    />
  )
}

function PaginationDemo() {
  const [page, setPage] = useState(2)
  return <Pagination page={page} pageCount={5} onChange={setPage} />
}

function ModalDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button fullWidth={false} onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Invite teammate">
        <p className="m-0 text-[15px] text-text-secondary">Send an invite to join this workspace.</p>
      </Modal>
    </>
  )
}

function ConfirmDialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="danger" fullWidth={false} onClick={() => setOpen(true)}>
        Delete project
      </Button>
      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete this project?"
        body="This cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => setOpen(false)}
      />
    </>
  )
}

function NavSearchDemo() {
  const [value, setValue] = useState('')
  return <NavSearch value={value} onChange={setValue} className="w-full max-w-[220px]" />
}

function SidebarDemo() {
  const [active, setActive] = useState('overview')
  const icon = { size: 18, strokeWidth: 1.5, absoluteStrokeWidth: true } as const
  return (
    <div className="h-[280px] overflow-hidden rounded-[12px] border border-border-default">
      <DashboardSidebar
        activeId={active}
        onSelect={setActive}
        sections={[
          {
            label: 'Workspace',
            items: [
              { id: 'overview', label: 'Overview', icon: <DkAppDashboardLayoutTiles {...icon} /> },
              { id: 'inbox', label: 'Inbox', icon: <DkMessageInboxTray {...icon} />, badge: 3 },
            ],
          },
        ]}
      />
    </div>
  )
}

function DashboardNavDemo() {
  const [search, setSearch] = useState('')
  return (
    <div className="overflow-hidden rounded-[12px] border border-border-default">
      <DashboardNav title="Projects" search={{ value: search, onChange: setSearch }} userName="Alex Rivera" />
    </div>
  )
}

function ShellDemo() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const icon = { size: 18, strokeWidth: 1.5, absoluteStrokeWidth: true } as const
  return (
    <div className="h-[320px] overflow-hidden rounded-[12px] border border-border-default">
      <DashboardShell
        title="Overview"
        sidebarOpen={open}
        onSidebarOpenChange={setOpen}
        search={{ value: search, onChange: setSearch }}
        userName="Alex Rivera"
        sections={[
          {
            label: 'Workspace',
            items: [{ id: 'overview', label: 'Overview', icon: <DkAppDashboardLayoutTiles {...icon} /> }],
          },
        ]}
        activeId="overview"
      >
        <p className="m-0 p-6 text-sm text-text-secondary">Main canvas</p>
      </DashboardShell>
    </div>
  )
}

function AvatarPickerDemo() {
  const [src, setSrc] = useState<string | null>(null)
  return (
    <AvatarPicker
      name="Alex Rivera"
      src={src}
      onFile={(file) => setSrc(URL.createObjectURL(file))}
    />
  )
}

function AvatarEditorDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button fullWidth={false} onClick={() => setOpen(true)}>
        Edit photo
      </Button>
      <AvatarEditor
        imageSrc="/favicon.svg"
        open={open}
        onCancel={() => setOpen(false)}
        onSave={async () => setOpen(false)}
        onChooseAnother={() => setOpen(false)}
      />
    </>
  )
}

function SocialDemo() {
  return (
    <AuthProviderStack className="flex flex-col gap-3">
      <GoogleButton />
      <AppleButton />
      <GitHubButton />
      <OtherWaysButton />
    </AuthProviderStack>
  )
}

function MethodDemo() {
  const [value, setValue] = useState('app')
  return (
    <div className="flex w-full flex-col gap-3">
      <VerificationMethodCard
        selected={value === 'app'}
        onClick={() => setValue('app')}
        icon={<DkSecurityShieldProtect size={18} strokeWidth={1.75} absoluteStrokeWidth />}
        title="Authenticator app"
        subtitle="Use a one-time code"
      />
      <VerificationMethodCard
        selected={value === 'sms'}
        onClick={() => setValue('sms')}
        icon={<DkHandheldMobilePhone size={18} strokeWidth={1.75} absoluteStrokeWidth />}
        title="Text message"
        subtitle="Send a code to your phone"
      />
    </div>
  )
}

const TEXT_PROPS: PropRow[] = [
  p(
    'tone',
    "'primary' | 'secondary' | 'tertiary' | 'disabled' | 'link' | 'success' | 'warning' | 'danger' | 'on-brand'",
    'Matches the variant',
    'Color. Headings default to primary; content to secondary; caption to tertiary.',
  ),
  p('align', "'start' | 'center' | 'end'", "'start'", 'Horizontal alignment.'),
  p('as', 'ElementType', 'Semantic default', 'Rendered element. Override when the visual role differs from the HTML tag.'),
]

const DOCS: Record<string, DocDef> = {
  heading: {
    title: 'Heading',
    description: 'The title of a page or section. Display is a hero. Levels 1, 2, and 3 follow the document outline.',
    wide: true,
    ...headingGuide,
    Demo: () => (
      <div className="flex w-full flex-col gap-2">
        <Heading>A pressable control that triggers an action.</Heading>
        <Subhead>Use your DevKit Account to continue.</Subhead>
      </div>
    ),
    code: `<Heading>A pressable control that triggers an action.</Heading>\n<Subhead>Use your DevKit Account to continue.</Subhead>\n`,
    states: [
      { label: 'Display', node: <Heading level="display">DevKit.</Heading> },
      { label: 'Heading 1', node: <Heading level={1}>Welcome back</Heading> },
      { label: 'Heading 2', node: <Heading level={2}>Projects</Heading> },
      { label: 'Heading 3', node: <Heading level={3}>Account</Heading> },
      { label: 'Secondary', node: <Heading level={3} tone="secondary">Account</Heading> },
      { label: 'Center', node: <Heading level={3} align="center">Account</Heading> },
    ],
    props: [
      p('level', "1 | 2 | 3 | 'display'", '1', 'Display or h1–h3 on the type scale.'),
      ...TEXT_PROPS,
    ],
  },
  subhead: {
    title: 'Subhead',
    description: 'One supporting sentence that sits directly under a heading.',
    wide: true,
    ...subheadGuide,
    Demo: () => (
      <div className="flex w-full flex-col gap-2">
        <Heading level={3}>Welcome back</Heading>
        <Subhead>Use your DevKit Account to continue.</Subhead>
      </div>
    ),
    code: `<Heading level={3}>Welcome back</Heading>\n<Subhead>Use your DevKit Account to continue.</Subhead>\n`,
    states: [
      { label: 'Default', node: <Subhead>Use your DevKit Account to continue.</Subhead> },
      { label: 'Primary', node: <Subhead tone="primary">Use your DevKit Account to continue.</Subhead> },
      { label: 'Tertiary', node: <Subhead tone="tertiary">Use your DevKit Account to continue.</Subhead> },
      { label: 'Center', node: <Subhead align="center">Use your DevKit Account to continue.</Subhead> },
    ],
    props: TEXT_PROPS,
  },
  body: {
    title: 'Body',
    description: 'Paragraphs at the reading size. Use the default for pages and the small size inside cards.',
    wide: true,
    ...bodyGuide,
    Demo: () => (
      <Body>
        A pressable control that triggers an action. Short supporting copy sits at the content size so
        it stays readable on every screen.
      </Body>
    ),
    code: `<Body>\n  A pressable control that triggers an action.\n</Body>\n<Body size="sm">Secondary copy uses the small content size.</Body>\n`,
    states: [
      {
        label: 'Content',
        node: (
          <Body>A pressable control that triggers an action. Short supporting copy stays readable.</Body>
        ),
      },
      {
        label: 'Content small',
        node: <Body size="sm">Secondary copy uses the small content size for captions inside cards.</Body>,
      },
      { label: 'Primary', node: <Body tone="primary">Primary content for emphasis on a light surface.</Body> },
      { label: 'Danger', node: <Body tone="danger">This action cannot be undone.</Body> },
      { label: 'Disabled', node: <Body tone="disabled">This setting is unavailable.</Body> },
    ],
    props: [p('size', "'md' | 'sm'", "'md'", 'Content or content-small.'), ...TEXT_PROPS],
  },
  caption: {
    title: 'Caption',
    description: 'Quiet supporting copy for timestamps, counts, and hints. Do not put essential instructions here.',
    ...captionGuide,
    Demo: () => <Caption>Last updated Aug 29, 2026</Caption>,
    code: `<Caption>Last updated Aug 29, 2026</Caption>\n`,
    states: [
      { label: 'Default', node: <Caption>Last updated Aug 29, 2026</Caption> },
      { label: 'Secondary', node: <Caption tone="secondary">12 members</Caption> },
      { label: 'Success', node: <Caption tone="success">Saved just now</Caption> },
      { label: 'Danger', node: <Caption tone="danger">This action cannot be undone.</Caption> },
      { label: 'Center', node: <Caption align="center">Optional</Caption> },
    ],
    props: TEXT_PROPS,
  },
  eyebrow: {
    title: 'Eyebrow',
    description: 'A short uppercase kicker that sits above a heading. Keep it to a few words.',
    wide: true,
    ...eyebrowGuide,
    Demo: () => (
      <div className="flex w-full flex-col gap-2">
        <Eyebrow>Components / Typography</Eyebrow>
        <Heading level={3}>Text</Heading>
      </div>
    ),
    code: `<Eyebrow>Components / Typography</Eyebrow>\n<Heading level={3}>Text</Heading>\n`,
    states: [
      { label: 'Default', node: <Eyebrow>Components / Typography</Eyebrow> },
      { label: 'Link', node: <Eyebrow tone="link">New</Eyebrow> },
      { label: 'Center', node: <Eyebrow align="center">Product</Eyebrow> },
    ],
    props: TEXT_PROPS,
  },
  label: {
    title: 'Label',
    description: 'Medium weight text for fields and controls. In forms, prefer Field Label so the input stays associated.',
    ...labelGuide,
    Demo: () => <Label>Email address</Label>,
    code: `<Label>Email address</Label>\n`,
    states: [
      { label: 'Default', node: <Label>Email address</Label> },
      { label: 'Secondary', node: <Label tone="secondary">Optional</Label> },
      { label: 'Disabled', node: <Label tone="disabled">Unavailable</Label> },
      { label: 'Danger', node: <Label tone="danger">Invalid email</Label> },
    ],
    props: TEXT_PROPS,
  },
  'icon-button': {
    title: 'Icon Button',
    description: 'A compact button that shows only a glyph. The label prop is the accessible name.',
    ...iconButtonGuide,
    Demo: IconButtonDemo,
    wide: true,
    code: `<IconButton label="Copy" onAction={() => copy()}>\n  <DkClipboardCopyDuplicate />\n</IconButton>\n`,
    states: [
      {
        label: 'Ghost',
        node: (
          <IconButton label="Search">
            <DkMagnifyingGlassFind size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Subtle',
        node: (
          <IconButton label="Favorite" variant="subtle">
            <DkFavoriteHeartLove size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Outline',
        node: (
          <IconButton label="Share" variant="outline">
            <DkShareExportForward size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Primary',
        node: (
          <IconButton label="Add" variant="primary">
            <DkAddPlusCreate size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Danger',
        node: (
          <IconButton label="Delete" variant="danger">
            <DkWasteBinDelete size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Small',
        node: (
          <IconButton label="Settings" size="sm">
            <DkGearSettingsPreferences size={16} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Badge',
        node: (
          <IconButton label="Inbox" badge={3}>
            <DkEnvelopeMessageMail size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Action',
        node: (
          <IconButton label="Save" variant="primary" onAction={() => wait(900)}>
            <DkFloppyDiskSave size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Loading',
        node: (
          <IconButton label="Refreshing" loading>
            <DkRefreshClockwiseRotate size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Success',
        node: (
          <IconButton label="Copied" status="success">
            <DkClipboardCopyDuplicate size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Success primary',
        node: (
          <IconButton label="Saved" variant="primary" status="success">
            <DkFloppyDiskSave size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Error',
        node: (
          <IconButton label="Failed" status="error">
            <DkShareExportForward size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Loading primary',
        node: (
          <IconButton label="Saving" variant="primary" loading>
            <DkFloppyDiskSave size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Disabled',
        node: (
          <IconButton label="Locked" disabled>
            <DkPadlockSecureClosed size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Disabled outline',
        node: (
          <IconButton label="Settings" variant="outline" disabled>
            <DkGearSettingsPreferences size={18} {...glyph} />
          </IconButton>
        ),
      },
    ],
    props: [
      p('label', 'string', '—', 'Accessible name. Required.'),
      p("variant", "'ghost' | 'subtle' | 'outline' | 'primary' | 'danger'", "'ghost'", 'Visual style of the control.'),
      p("size", "'sm' | 'md'", "'md'", 'Control size.'),
      p('loading', 'boolean', 'false', 'Replaces the icon with a spinner and disables the control.'),
      p("status", "'idle' | 'loading' | 'success' | 'error'", "'idle'", 'Controlled overlay. Success shows a check; error shows an X.'),
      p('onAction', '() => void | Promise<void>', 'undefined', 'Runs on click: spinner, then check or X, then the original icon.'),
      p('successMs', 'number', '1600', 'How long the check or X stays before the icon returns.'),
      p('badge', 'number | string', 'undefined', 'Optional count overlay.'),
      p('disabled', 'boolean', 'false', 'Prevents press. Also applied while loading, success, or error.'),
    ],
  },
  switch: {
    title: 'Switch',
    description: 'An immediate on or off setting. The change applies as soon as the control is flipped.',
    ...switchGuide,
    Demo: SwitchDemo,
    wide: true,
    code: `<Switch variant="primary" checked={on} onChange={setOn} label="Primary" />
<Switch variant="subtle" checked={on} onChange={setOn} label="Subtle" />
<Switch variant="outline" checked={on} onChange={setOn} label="Outline" />
<Switch variant="ghost" checked={on} onChange={setOn} label="Ghost" />
<Switch variant="danger" checked={on} onChange={setOn} label="Danger" />

<SwitchGroup label="Preferences">
  <SwitchItem title="Notifications" checked={on} onChange={setOn} />
  <SwitchItem title="Weekly digest" checked={digest} onChange={setDigest} variant="subtle" />
</SwitchGroup>
`,
    states: [
      { label: 'Primary off', node: <Switch checked={false} label="Primary off" /> },
      { label: 'Primary on', node: <Switch checked label="Primary on" /> },
      { label: 'Subtle off', node: <Switch checked={false} variant="subtle" label="Subtle off" /> },
      { label: 'Subtle on', node: <Switch checked variant="subtle" label="Subtle on" /> },
      { label: 'Outline off', node: <Switch checked={false} variant="outline" label="Outline off" /> },
      { label: 'Outline on', node: <Switch checked variant="outline" label="Outline on" /> },
      { label: 'Ghost off', node: <Switch checked={false} variant="ghost" label="Ghost off" /> },
      { label: 'Ghost on', node: <Switch checked variant="ghost" label="Ghost on" /> },
      { label: 'Danger off', node: <Switch checked={false} variant="danger" label="Danger off" /> },
      { label: 'Danger on', node: <Switch checked variant="danger" label="Danger on" /> },
      { label: 'Small', node: <Switch checked size="sm" label="Small" /> },
      { label: 'Medium', node: <Switch checked size="md" label="Medium" /> },
      { label: 'Large', node: <Switch checked size="lg" label="Large" /> },
      { label: 'Disabled', node: <Switch checked disabled label="Disabled" /> },
      { label: 'Loading', node: <Switch checked loading label="Loading" /> },
    ],
    props: [
      p('checked', 'boolean', '—', 'Whether the switch is on.'),
      p('onChange', '(next: boolean) => void', '—', 'Called when the value changes.'),
      p("variant", "'primary' | 'subtle' | 'outline' | 'ghost' | 'danger'", "'primary'", 'Track style. Danger is for destructive settings only.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Track size.'),
      p('disabled', 'boolean', 'false', 'Prevents interaction.'),
      p('loading', 'boolean', 'false', 'Shows a spinner in the thumb.'),
      p('label', 'string', 'undefined', 'Accessible name on Switch. Visible title lives on SwitchItem.'),
      p('title', 'string', '—', 'Visible label on SwitchItem.'),
      p('description', 'string', 'undefined', 'Optional supporting copy on SwitchItem.'),
    ],
  },
  'segmented-control': {
    title: 'Segmented Control',
    description: 'A small set of options where only one can be selected. Use it for views, ranges, and toolbars.',
    ...segmentedGuide,
    Demo: SegmentedDemo,
    wide: true,
    code: `<SegmentedControl mode="grouped" value={view} onChange={setView} options={[...]} />

<SegmentedToolbar>
  <SegmentedControl content="icon" value={align} onChange={setAlign} options={[...]} />
  <IconButton label="Refresh" onAction={reload}><DkRefreshClockwiseRotate /></IconButton>
  <Button fullWidth={false}>Save</Button>
</SegmentedToolbar>
`,
    statesContent: <SegmentedStates />,
    props: [
      p('value', 'string', '—', 'The selected option.'),
      p('options', 'SegmentedOption[]', '—', 'Labels, values, optional icons, badges, loading, and onAction.'),
      p('onChange', '(value: T) => void', '—', 'Called when the selection changes.'),
      p("mode", "'inset' | 'grouped'", "'inset'", 'Sliding thumb, or joined buttons with a selected fill.'),
      p("variant", "'subtle' | 'outline' | 'ghost' | 'primary' | 'pill'", "'subtle'", 'Track and selected style.'),
      p("content", "'label' | 'icon' | 'both'", "'label'", 'Text only, icons only, or icon plus text.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Control height. Medium is 44px, matching buttons and fields.'),
      p('fullWidth', 'boolean', 'false', 'Stretches the control to the container width.'),
      p('leading', 'ReactNode', 'undefined', 'Control before the segments, such as an Icon Button.'),
      p('trailing', 'ReactNode', 'undefined', 'Control after the segments, such as a Button.'),
      p('onAction', '(value: T) => void | Promise<void>', 'undefined', 'Runs after a segment is pressed. Shows a spinner, then a check or X. Arrow keys only change the selection.'),
      p('successMs', 'number', '1600', 'How long the check or X stays visible after onAction.'),
      p('disabled', 'boolean', 'false', 'Prevents interaction with every option.'),
      p('label', 'string', 'undefined', 'Optional caption above the control, and the accessible name.'),
      p('icon', 'ReactNode', 'undefined', 'Leading icon on a SegmentedOption.'),
      p('badge', 'number | string', 'undefined', 'Trailing count on a SegmentedOption.'),
      p('loading', 'boolean', 'false', 'Shows a spinner on that segment.'),
      p('status', "'idle' | 'loading' | 'success' | 'error'", 'undefined', 'Controlled overlay on a SegmentedOption.'),
      p('options[].onAction', '() => void | Promise<void>', 'undefined', 'Per-option action. Overrides the control-level onAction.'),
    ],
  },
  'confirm-action': {
    title: 'Confirm Action',
    ...confirmActionGuide,
    description: 'A button that asks once, then runs the action on a second press. Use it for remove, sign out, and similar row actions.',
    Demo: ConfirmActionDemo,
    wide: true,
    code: `<ConfirmAction onConfirm={remove} />
<ConfirmAction variant="ghost" onConfirm={remove} />
<ConfirmAction variant="subtle" onConfirm={remove} />
<ConfirmAction variant="outline" onConfirm={remove} />
<ConfirmAction variant="solid" onConfirm={remove} />
<ConfirmAction variant="solid" tone="brand" label="Send" confirmLabel="Send now?" onConfirm={send} />
`,
    statesContent: <ConfirmActionStates />,
    props: [
      p('onConfirm', '() => void', '—', 'Runs after the second tap.'),
      p('label', 'string', "'Remove'", 'Idle label.'),
      p('confirmLabel', 'string', "'Confirm?'", 'Armed label.'),
      p("variant", "'text' | 'ghost' | 'subtle' | 'outline' | 'solid'", "'text'", 'Chrome. Text is compact; the rest are pills. Armed state fills with the tone.'),
      p("tone", "'danger' | 'brand' | 'neutral'", "'danger'", 'Color. Danger for destructive, brand for send/publish, neutral for archive/move.'),
      p("size", "'sm' | 'md' | 'lg'", "'sm'", 'Pill height. Text stays compact until armed.'),
      p('loading', 'boolean', 'false', 'Shows a spinner and disables the control.'),
      p('loadingText', 'string', "'Removing…'", 'Label while loading.'),
      p('resetMs', 'number', '3000', 'How long the armed label stays before returning to idle.'),
      p('disabled', 'boolean', 'false', 'Prevents press.'),
    ],
  },
  'text-field': {
    title: 'Text Field',
    description: 'A single-line input with a leading icon. Outline, subtle, ghost, underline, and pill — filled, focus, and invalid use the same brand, success, and danger tokens as the rest of the kit.',
    Demo: TextFieldDemo,
    wide: true,
    code: `<TextField icon={<DkEnvelopeMessageMail />} placeholder="Email address" />
<TextField variant="subtle" icon={<DkEnvelopeMessageMail />} placeholder="Email address" />
<TextField variant="ghost" icon={<DkEnvelopeMessageMail />} placeholder="Email address" />
<TextField variant="underline" icon={<DkEnvelopeMessageMail />} placeholder="Email address" />
<TextField variant="pill" icon={<DkMagnifyingGlassFind />} placeholder="Search" />
`,
    statesContent: <TextFieldStates />,
    props: [
      p('icon', 'ReactNode', 'undefined', 'Leading icon inside the field. Auth and settings fields always pass one.'),
      p('trailing', 'ReactNode', 'undefined', 'Trailing control, such as Password Reveal.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Chrome. Outline matches other form controls.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height. Medium is 44px, matching buttons and selects.'),
      p('invalid', 'boolean', 'false', 'Danger border, icon, and aria-invalid.'),
      p('valid', 'boolean', 'false', 'Success border and icon. Ignored when invalid.'),
      p("preview", "'hover' | 'focus'", 'undefined', 'Force a visual state in docs without focusing the input.'),
    ],
  },
  textarea: {
    title: 'Textarea',
    description: 'A multi-line input with a leading icon. Outline, subtle, ghost, underline, well, and composer — filled, focus, and invalid use the same tokens as Text Field.',
    Demo: TextareaDemo,
    wide: true,
    code: `<Textarea icon={<DkPencilWriteEdit />} placeholder="Write a note" />
<Textarea variant="subtle" icon={<DkPencilWriteEdit />} placeholder="Write a note" />
<Textarea variant="ghost" icon={<DkPencilWriteEdit />} placeholder="Write a note" />
<Textarea variant="underline" icon={<DkPencilWriteEdit />} placeholder="Write a note" />
<Textarea variant="well" icon={<DkDocumentPageFold />} placeholder="Internal note" />
<Textarea variant="composer" icon={<DkMessageInboxTray />} placeholder="Write a note" hint="Visible to your team" maxLength={160} />
`,
    statesContent: <TextareaStates />,
    props: [
      p('icon', 'ReactNode', 'undefined', 'Leading icon at the top of the field.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'well' | 'composer'", "'outline'", 'Chrome. Well is a Notes-style pad. Composer adds a footer for the count.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Type scale and minimum height.'),
      p('invalid', 'boolean', 'false', 'Danger border, icon, and aria-invalid.'),
      p('valid', 'boolean', 'false', 'Success border and icon. Ignored when invalid.'),
      p('maxLength', 'number', 'undefined', 'Native limit. Also shows a count when set.'),
      p('count', 'boolean', 'false', 'Show a character count even without maxLength.'),
      p('hint', 'ReactNode', 'undefined', 'Caption on the composer footer, opposite the count.'),
      p("resize", "'y' | 'none'", 'well/composer: none, else y', 'Whether the field can be stretched.'),
      p("preview", "'hover' | 'focus'", 'undefined', 'Force a visual state in docs without focusing the field.'),
    ],
  },
  'password-field': {
    title: 'Password Field',
    description: 'A password input with a lock and a reveal control. Outline, subtle, ghost, underline, and pill — with ghost, subtle, outline, text, or pill reveal.',
    Demo: PasswordFieldDemo,
    wide: true,
    code: `<PasswordField />
<PasswordField variant="subtle" />
<PasswordField variant="ghost" />
<PasswordField variant="underline" />
<PasswordField variant="pill" />
<PasswordField reveal="ghost" />
<PasswordField reveal="pill" />
`,
    statesContent: <PasswordFieldStates />,
    props: [
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Field chrome. Matches Text Field.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Height and type. Also sizes the reveal.'),
      p("reveal", "'ghost' | 'subtle' | 'outline' | 'text' | 'pill'", "'text'", 'The trailing show/hide control. Text is Show / Hide.'),
      p('visible', 'boolean', 'undefined', 'Controlled visibility. Omit to manage it inside the field.'),
      p('onVisibleChange', '(visible: boolean) => void', 'undefined', 'Called when the reveal is pressed.'),
      p('icon', 'ReactNode', 'lock', 'Leading icon. Defaults to the lock.'),
      p('invalid', 'boolean', 'false', 'Danger border, icon, and aria-invalid.'),
      p('valid', 'boolean', 'false', 'Success border and icon. Ignored when invalid.'),
      p("preview", "'hover' | 'focus'", 'undefined', 'Force a visual state in docs without focusing the field.'),
    ],
  },
  'password-reveal': {
    title: 'Password Reveal',
    description: 'Show or hide a password. Ghost, subtle, outline, Apple-style Show/Hide text, or a pill — designed as a field accessory, not a separate button.',
    Demo: PasswordRevealDemo,
    wide: true,
    code: `<PasswordReveal visible={visible} onToggle={toggle} />
<PasswordReveal variant="subtle" visible={visible} onToggle={toggle} />
<PasswordReveal variant="outline" visible={visible} onToggle={toggle} />
<PasswordReveal variant="text" visible={visible} onToggle={toggle} />
<PasswordReveal variant="pill" visible={visible} onToggle={toggle} />

<PasswordField />
`,
    statesContent: <PasswordRevealStates />,
    props: [
      p('visible', 'boolean', '—', 'Whether the password is shown.'),
      p('onToggle', '() => void', '—', 'Called when the control is pressed.'),
      p("variant", "'ghost' | 'subtle' | 'outline' | 'text' | 'pill'", "'ghost'", 'Icon only, filled, outlined, Show/Hide text, or a labeled pill.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Hit target and type. Match the field size.'),
      p('inField', 'boolean', 'true', 'Position inside a Text Field. Set false for a standalone control.'),
      p('showLabel', 'string', "'Show'", 'Label on the text and pill variants.'),
      p('hideLabel', 'string', "'Hide'", 'Label while the password is visible.'),
      p('disabled', 'boolean', 'false', 'Prevents press.'),
    ],
  },
  select: {
    title: 'Select',
    description:
      'A single-value menu. Outline, subtle, ghost, underline, and pill match Text Field. Options can carry an icon and a short description. Search filters the list. The popup is the same width as the field.',
    Demo: SelectDemo,
    wide: true,
    code: `<Dropdown value={value} onChange={setValue} options={options} />
<Dropdown variant="subtle" value={value} onChange={setValue} options={options} />
<Dropdown variant="ghost" icon={<DkGlobeWorldEarth />} value={value} onChange={setValue} options={options} />
<Dropdown variant="underline" value={value} onChange={setValue} options={options} />
<Dropdown variant="pill" value={value} onChange={setValue} options={options} />

<Dropdown
  searchable
  icon={<DkGlobeWorldEarth />}
  options={[
    { value: 'team', label: 'Team', icon: <DkRowsThree />, description: 'Up to ten people' },
  ]}
/>
`,
    statesContent: <SelectStates />,
    props: [
      p('value', 'string', '—', 'The selected option.'),
      p('options', 'DropdownOption[]', '—', 'Menu items. Each can include icon, description, and disabled.'),
      p('onChange', '(value: string) => void', '—', 'Called when an option is chosen.'),
      p('icon', 'ReactNode', 'undefined', 'Leading icon on the field. Replaced by the selected option icon when present.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Field chrome. Matches Text Field.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height. Compact defaults to small.'),
      p('searchable', 'boolean', 'false', 'Adds a search field at the top of the popup.'),
      p('searchPlaceholder', 'string', "'Search'", 'Placeholder for the search field.'),
      p('placeholder', 'string', "'Select'", 'Shown when no option is selected.'),
      p('invalid', 'boolean', 'false', 'Danger border.'),
      p('valid', 'boolean', 'false', 'Success border. Ignored when invalid.'),
      p('compact', 'boolean', 'false', 'Smaller trigger for toolbars. The popup still matches the field width.'),
      p('disabled', 'boolean', 'false', 'Prevents opening the menu.'),
    ],
  },
  'search-select': {
    title: 'Search Select',
    description: 'A searchable single-select. The popup matches the field width.',
    Demo: SearchSelectDemo,
    code: `<SearchSelect value={value} onChange={setValue} options={[...]} />\n`,
    props: [
      p('value', 'string', '—', 'The selected option.'),
      p('icon', 'ReactNode', 'undefined', 'Leading icon on the field. Replaced by the selected option icon when present.'),
      p('options', 'SearchSelectOption[]', '[]', 'Filterable items. Each can include icon, meta, and description.'),
      p('allowClear', 'boolean', 'true', 'Adds a clear row.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Field chrome. Matches Select.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height.'),
    ],
  },
  'country-select': {
    title: 'Country Select',
    description: 'Choose a country from a searchable list.',
    Demo: CountryDemo,
    code: `<CountrySelect value={iso} onChange={setIso} />\n`,
    props: [
      p('value', 'string | null', '—', 'ISO 3166-1 alpha-2 code.'),
      p('onChange', '(next: string | null) => void', '—', 'Called when the country changes.'),
    ],
  },
  'language-select': {
    title: 'Language Select',
    description: 'Choose a language from a searchable list.',
    Demo: LanguageDemo,
    code: `<LanguageSelect value={id} onChange={setId} />\n`,
    props: [p('value', 'string | null', '—', 'BCP 47 language id.')],
  },
  'phone-input': {
    title: 'Phone Input',
    description: 'A phone number field with country code.',
    Demo: PhoneDemo,
    code: `<PhoneInput value={e164} onChange={setE164} />\n`,
    props: [
      p('value', 'string', '—', 'E.164 number, such as +14155552671.'),
      p('onChange', '(next: string) => void', '—', 'Called as the number is edited.'),
    ],
  },
  checkbox: {
    title: 'Checkbox',
    description: 'A binary choice in a form.',
    Demo: CheckboxDemo,
    code: `<Checkbox label="Email me product updates" checked={on} onChange={toggle} />\n`,
    states: [
      { label: 'Unchecked', node: <Checkbox label="Off" /> },
      { label: 'Checked', node: <Checkbox label="On" defaultChecked /> },
      { label: 'Disabled', node: <Checkbox label="Locked" defaultChecked disabled /> },
    ],
    props: [
      p('label', 'ReactNode', 'undefined', 'Visible label.'),
      p('checked', 'boolean', 'uncontrolled', 'Checked state when controlled.'),
    ],
  },
  radio: {
    title: 'Radio',
    description: 'One option in a mutually exclusive set.',
    Demo: RadioDemo,
    code: `<Radio name="pay" label="Card" checked={value === 'card'} onChange={select} />\n`,
    props: [p('label', 'ReactNode', 'undefined', 'Visible label.')],
  },
  slider: {
    title: 'Slider',
    description: 'Pick a numeric value along a range.',
    Demo: SliderDemo,
    code: `<Slider label="Volume" value={value} onValueChange={setValue} />\n`,
    props: [
      p('value', 'number', '—', 'Current value.'),
      p('onValueChange', '(value: number) => void', '—', 'Called as the thumb moves.'),
    ],
  },
  'date-picker': {
    title: 'Date Picker',
    description: 'Select a date or date range.',
    Demo: DateDemo,
    code: `<DatePicker value={value} onChange={setValue} />\n`,
    props: [
      p('value', 'string | null', '—', 'ISO date for single mode.'),
      p('mode', "'single' | 'range'", "'single'", 'Selection mode.'),
    ],
  },
  'otp-boxes': {
    title: 'OTP Boxes',
    description: 'Digit boxes for a one-time code.',
    Demo: OtpDemo,
    code: `<OtpBoxes value={digits} onChange={setDigits} />\n`,
    states: [
      { label: 'Default', node: <OtpBoxes value={['', '', '', '', '', '']} onChange={() => undefined} /> },
      { label: 'Error', node: <OtpBoxes value={['1', '2', '3', '4', '5', '6']} onChange={() => undefined} error /> },
      { label: 'Disabled', node: <OtpBoxes value={['1', '2', '3', '4', '5', '6']} onChange={() => undefined} disabled /> },
    ],
    props: [
      p('value', 'string[]', '—', 'One character per box.'),
      p('length', 'number', '6', 'Number of boxes.'),
      p('error', 'boolean', 'false', 'Invalid state.'),
    ],
  },
  'recovery-input': {
    title: 'Recovery Input',
    description: 'Enter or display recovery codes.',
    Demo: RecoveryDemo,
    code: `<RecoveryInput value={code} onChange={setCode} />\n`,
    states: [
      { label: 'Input', node: <RecoveryDemo /> },
      {
        label: 'List',
        node: <RecoveryCodesList codes={['XJ4K-9M2P', 'Q7NT-3B8C']} />,
      },
    ],
    props: [p('value', 'string', '—', 'The recovery code string.')],
  },
  'field-label': {
    title: 'Field Label',
    description: 'Label, hint, and field grouping.',
    Demo: () => (
      <FormField>
        <FieldLabel htmlFor="demo-name">Display name</FieldLabel>
        <TextField
          id="demo-name"
          icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
          placeholder="Alex Rivera"
        />
        <FieldHint>Shown on your public profile.</FieldHint>
      </FormField>
    ),
    code: `<FormField>\n  <FieldLabel>Display name</FieldLabel>\n  <TextField icon={<DkPersonUserProfile />} />\n  <FieldHint>Shown on your public profile.</FieldHint>\n</FormField>\n`,
    props: [
      p('optional', 'boolean', 'false', 'Adds an Optional suffix on FieldLabel.'),
      p('children', 'ReactNode', '—', 'Label text.'),
    ],
  },
  alert: {
    title: 'Alert',
    description: 'An inline message for status or errors.',
    Demo: () => (
      <Alert tone="info" title="Verify your email">
        We sent a link to alex@roboticela.com.
      </Alert>
    ),
    code: `<Alert tone="info" title="Verify your email">We sent a link.</Alert>\n`,
    states: [
      { label: 'Info', node: <Alert tone="info" title="Info">A status note.</Alert> },
      { label: 'Success', node: <Alert tone="success" title="Saved">Your changes are live.</Alert> },
      { label: 'Warning', node: <Alert tone="warning" title="Unverified">Finish setup.</Alert> },
      { label: 'Danger', node: <Alert tone="danger" title="Failed">Check the form.</Alert> },
    ],
    props: [
      p('tone', "'info' | 'success' | 'warning' | 'danger'", "'info'", 'Color and icon.'),
      p('title', 'string', 'undefined', 'Headline.'),
      p('onDismiss', '() => void', 'undefined', 'Shows a close button.'),
    ],
  },
  progress: {
    title: 'Progress',
    description: 'A determinate progress bar.',
    Demo: () => <Progress value={64} label="Uploading" />,
    code: `<Progress value={64} label="Uploading" />\n`,
    states: [
      { label: 'Empty', node: <Progress value={0} label="Waiting" /> },
      { label: 'Partial', node: <Progress value={64} label="Uploading" /> },
      { label: 'Complete', node: <Progress value={100} label="Done" /> },
    ],
    props: [
      p('value', 'number', '—', '0–100.'),
      p('label', 'string', 'undefined', 'Caption beside the percentage.'),
    ],
  },
  skeleton: {
    title: 'Skeleton',
    description: 'A placeholder while content loads.',
    Demo: () => (
      <div className="flex w-full flex-col gap-3">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    ),
    code: `<Skeleton className="h-4 w-2/3" />\n`,
    props: [p('className', 'string', 'undefined', 'Size and radius of the placeholder.')],
  },
  'empty-state': {
    title: 'Empty State',
    description: 'A calm empty or zero-result view.',
    Demo: () => (
      <EmptyState
        title="No projects"
        body="Create a project to get started."
        action={
          <Button fullWidth={false} className="w-full">
            New project
          </Button>
        }
      />
    ),
    code: `<EmptyState title="No projects" body="Create a project to get started." />\n`,
    props: [
      p('title', 'string', '—', 'Headline.'),
      p('body', 'string', 'undefined', 'Supporting copy.'),
      p('action', 'ReactNode', 'undefined', 'Optional CTA.'),
    ],
  },
  'loading-screen': {
    title: 'Loading Screen',
    description: 'A branded wait state.',
    Demo: () => <LoadingScreen embedded status="Setting things up…" delayMs={12000} />,
    code: `<LoadingScreen status="Setting things up…" />\n`,
    props: [
      p('status', 'string', "'Setting things up…'", 'Initial caption.'),
      p('embedded', 'boolean', 'false', 'Use inside a panel instead of a full viewport.'),
    ],
  },
  'score-ring': {
    title: 'Score Ring',
    description: 'A circular completion indicator.',
    Demo: () => <ScoreRing score={72} />,
    code: `<ScoreRing score={72} />\n`,
    states: [
      { label: 'Low', node: <ScoreRing score={24} /> },
      { label: 'Mid', node: <ScoreRing score={72} /> },
      { label: 'Complete', node: <ScoreRing score={100} /> },
    ],
    props: [p('score', 'number', '—', '0–100.')],
  },
  modal: {
    title: 'Modal',
    description: 'A focused dialog above the page.',
    Demo: ModalDemo,
    code: `<Modal open={open} onClose={close} title="Invite teammate">{children}</Modal>\n`,
    props: [
      p('open', 'boolean', '—', 'Whether the dialog is shown.'),
      p('onClose', '() => void', '—', 'Backdrop, Escape, and close button.'),
      p('title', 'string', '—', 'Dialog heading.'),
    ],
  },
  'confirm-dialog': {
    title: 'Confirm Dialog',
    description: 'A destructive or irreversible confirm.',
    Demo: ConfirmDialogDemo,
    code: `<ConfirmDialog open={open} onClose={close} title="Delete?" onConfirm={remove} />\n`,
    props: [
      p('open', 'boolean', '—', 'Whether the dialog is shown.'),
      p('onConfirm', '() => void', '—', 'Primary action.'),
      p('confirmLabel', 'string', "'Confirm'", 'Primary button label.'),
    ],
  },
  'avatar-editor': {
    title: 'Avatar Editor',
    description: 'Crop and save a profile photo.',
    Demo: AvatarEditorDemo,
    code: `<AvatarEditor imageSrc={src} open={open} onSave={save} onCancel={close} />\n`,
    props: [
      p('imageSrc', 'string', '—', 'Image to crop.'),
      p('open', 'boolean', '—', 'Whether the editor is shown.'),
      p('onSave', '() => void | Promise<void>', '—', 'Called with the cropped result.'),
    ],
  },
  tabs: {
    title: 'Tabs',
    description: 'Switch between peer views.',
    Demo: TabsDemo,
    code: `<Tabs value={tab} onChange={setTab} items={[{ id: 'all', label: 'All' }]} />\n`,
    props: [
      p('items', 'TabItem[]', '—', 'Tab ids and labels.'),
      p('variant', "'underline' | 'pill'", "'underline'", 'Visual style.'),
      p('size', "'sm' | 'md'", "'md'", 'Control height.'),
    ],
  },
  'icon-tab': {
    title: 'Icon Tab',
    description: 'A compact tab with an icon and label.',
    Demo: () => (
      <div className="flex w-full gap-1">
        <IconTab icon={<DkAppDashboardLayoutTiles size={18} />} label="Home" active />
        <IconTab icon={<DkMessageInboxTray size={18} />} label="Inbox" />
      </div>
    ),
    code: `<IconTab icon={<Home />} label="Home" active />\n`,
    props: [
      p('icon', 'ReactNode', '—', 'Glyph above the label.'),
      p('label', 'string', '—', 'Caption.'),
      p('active', 'boolean', 'false', 'Selected appearance.'),
    ],
  },
  breadcrumb: {
    title: 'Breadcrumb',
    description: 'The path back through the hierarchy.',
    Demo: () => (
      <Breadcrumbs
        items={[{ label: 'Projects' }, { label: 'Atlas' }, { label: 'Settings' }]}
      />
    ),
    code: `<Breadcrumbs items={[{ label: 'Projects' }, { label: 'Atlas' }]} />\n`,
    props: [p('items', 'BreadcrumbItem[]', '—', 'Crumbs from root to current.')],
  },
  pagination: {
    title: 'Pagination',
    description: 'Move through a paged list.',
    Demo: PaginationDemo,
    code: `<Pagination page={page} pageCount={5} onChange={setPage} />\n`,
    props: [
      p('page', 'number', '—', 'Current 1-based page.'),
      p('pageCount', 'number', '—', 'Total pages.'),
    ],
  },
  'sidebar-nav': {
    title: 'Sidebar Nav',
    description: 'Primary navigation for an app shell.',
    Demo: SidebarDemo,
    wide: true,
    code: `<DashboardSidebar sections={sections} activeId={id} onSelect={setId} />\n`,
    props: [
      p('sections', 'SidebarSection[]', '—', 'Grouped nav items.'),
      p('activeId', 'string', 'undefined', 'The current item.'),
    ],
  },
  'dashboard-nav': {
    title: 'Dashboard Nav',
    description: 'Top bar for a signed-in workspace.',
    Demo: DashboardNavDemo,
    wide: true,
    code: `<DashboardNav title="Projects" search={search} userName="Alex Rivera" />\n`,
    props: [
      p('title', 'string', 'undefined', 'Current section title.'),
      p('search', '{ value, onChange }', 'undefined', 'Optional search field.'),
    ],
  },
  'sheet-nav': {
    title: 'Sheet Nav',
    description: 'A mobile navigation sheet.',
    Demo: () => (
      <div className="overflow-hidden rounded-[12px] border border-border-default">
        <SheetNav title="Edit profile" onCancel={() => undefined} onDone={() => undefined} />
      </div>
    ),
    wide: true,
    code: `<SheetNav title="Edit profile" onCancel={close} onDone={save} />\n`,
    props: [
      p('title', 'string', '—', 'Sheet heading.'),
      p('onCancel', '() => void', '—', 'Leading action.'),
      p('onDone', '() => void', 'undefined', 'Trailing action.'),
    ],
  },
  'nav-search': {
    title: 'Nav Search',
    description: 'A compact search field for a top bar.',
    Demo: NavSearchDemo,
    code: `<NavSearch value={query} onChange={setQuery} />\n`,
    props: [
      p('value', 'string', '—', 'Query text.'),
      p('onChange', '(value: string) => void', '—', 'Called as the user types.'),
    ],
  },
  'profile-button': {
    title: 'Profile Button',
    description: 'Opens the account menu from an avatar.',
    Demo: () => <ProfileButton name="Alex Rivera" />,
    code: `<ProfileButton name="Alex Rivera" />\n`,
    props: [
      p('name', 'string', 'undefined', 'Used for initials and the accessible label.'),
      p('src', 'string | null', 'undefined', 'Photo URL.'),
    ],
  },
  badge: {
    title: 'Badge',
    description: 'A compact status or category label.',
    Demo: () => <Badge tone="verified">Stable</Badge>,
    code: `<Badge tone="verified">Stable</Badge>\n`,
    states: [
      { label: 'Primary', node: <Badge tone="primary">New</Badge> },
      { label: 'Verified', node: <Badge tone="verified">Live</Badge> },
      { label: 'Unverified', node: <Badge tone="unverified">Review</Badge> },
      { label: 'Muted', node: <Badge tone="muted">Web</Badge> },
    ],
    props: [p('tone', "'primary' | 'verified' | 'unverified' | 'neutral' | 'muted'", "'primary'", 'Color treatment.')],
  },
  avatar: {
    title: 'Avatar',
    description: 'A photo or initials for a person.',
    Demo: () => <Avatar name="Alex Rivera" size="lg" />,
    code: `<Avatar name="Alex Rivera" size="lg" />\n`,
    states: [
      { label: 'Small', node: <Avatar name="Alex Rivera" size="sm" /> },
      { label: 'Medium', node: <Avatar name="Alex Rivera" size="md" /> },
      { label: 'Large', node: <Avatar name="Alex Rivera" size="lg" /> },
      { label: 'Empty', node: <Avatar size="lg" /> },
    ],
    props: [
      p('name', 'string', 'undefined', 'Used for initials.'),
      p('src', 'string | null', 'undefined', 'Photo URL.'),
      p('size', "'sm' | 'md' | 'lg' | 'xl'", "'md'", 'Diameter.'),
    ],
  },
  'avatar-picker': {
    title: 'Avatar Picker',
    description: 'Choose a profile photo from disk.',
    Demo: AvatarPickerDemo,
    code: `<AvatarPicker name="Alex Rivera" src={src} onFile={onFile} />\n`,
    props: [
      p('onFile', '(file: File) => void', '—', 'Called when a file is chosen.'),
      p('onEdit', '() => void', 'undefined', 'Opens the editor when a photo exists.'),
    ],
  },
  'stat-card': {
    title: 'Stat Card',
    description: 'A headline metric with optional delta.',
    Demo: () => (
      <StatCard label="Revenue" value="$48,290" delta={{ value: '+12%', tone: 'up' }} hint="vs last month" />
    ),
    code: `<StatCard label="Revenue" value="$48,290" delta={{ value: '+12%', tone: 'up' }} />\n`,
    props: [
      p('label', 'string', '—', 'Metric name.'),
      p('value', 'string', '—', 'Formatted number.'),
      p('delta', '{ value, tone }', 'undefined', 'Change vs a prior period.'),
    ],
  },
  table: {
    title: 'Table',
    description: 'A structured list of records.',
    Demo: () => (
      <DataTable
        rowKey={(row) => row.id}
        data={[
          { id: '1', name: 'Atlas Checkout', status: 'Live' },
          { id: '2', name: 'Northstar Auth', status: 'In review' },
        ]}
        columns={[
          { key: 'name', header: 'Name', render: (row) => row.name },
          { key: 'status', header: 'Status', render: (row) => row.status },
        ]}
      />
    ),
    wide: true,
    code: `<DataTable data={rows} columns={columns} rowKey={(row) => row.id} />\n`,
    props: [
      p('data', 'T[]', '—', 'Rows.'),
      p('columns', 'DataColumn<T>[]', '—', 'Headers and cell renderers.'),
      p('empty', 'ReactNode', 'undefined', 'Shown when data is empty.'),
    ],
  },
  'page-header': {
    title: 'Page Header',
    description: 'Title, description, and page actions.',
    Demo: () => (
      <PageHeader
        eyebrow="Workspace"
        title="Projects"
        description="Everything currently in flight."
        actions={
          <Button fullWidth={false} className="w-auto">
            New
          </Button>
        }
      />
    ),
    wide: true,
    code: `<PageHeader eyebrow="Workspace" title="Projects" description="Everything currently in flight." />\n`,
    props: [
      p('title', 'string', '—', 'Page title.'),
      p('eyebrow', 'string', 'undefined', 'Small uppercase kicker.'),
      p('actions', 'ReactNode', 'undefined', 'Trailing buttons.'),
    ],
  },
  'list-row': {
    title: 'List Row',
    description: 'A tappable row inside a grouped list.',
    Demo: () => (
      <ListGroup className="w-full">
        <ListRow title="Email" meta="alex@roboticela.com" />
        <ListRow title="Phone" meta="+1 (415) 555-2671" />
      </ListGroup>
    ),
    code: `<ListGroup>\n  <ListRow title="Email" meta="alex@roboticela.com" />\n</ListGroup>\n`,
    props: [
      p('title', 'ReactNode', '—', 'Primary line.'),
      p('meta', 'ReactNode', 'undefined', 'Secondary line.'),
    ],
  },
  'settings-row': {
    title: 'Settings Row',
    description: 'A labeled row with a trailing control.',
    Demo: () => (
      <SettingsList className="w-full">
        <SettingsRow label="Product alerts" control={<Switch checked onChange={() => undefined} />} />
        <SettingsRow label="Weekly digest" control={<Switch checked={false} onChange={() => undefined} />} />
      </SettingsList>
    ),
    code: `<SettingsRow label="Product alerts" control={<Switch checked />} />\n`,
    props: [
      p('label', 'string', '—', 'Row title.'),
      p('control', 'ReactNode', '—', 'Trailing control.'),
      p('danger', 'boolean', 'false', 'Destructive treatment.'),
    ],
  },
  'key-value-row': {
    title: 'Key Value Row',
    description: 'A label and value on one line.',
    Demo: () => (
      <div className="w-full">
        <KeyValueRow label="Plan" value="Studio" />
        <KeyValueRow label="Seats" value="8" />
      </div>
    ),
    code: `<KeyValueRow label="Plan" value="Studio" />\n`,
    props: [
      p('label', 'ReactNode', '—', 'Key.'),
      p('value', 'ReactNode', '—', 'Value.'),
    ],
  },
  divider: {
    title: 'Divider',
    description: 'A labeled rule between sections.',
    Demo: () => <Divider>or continue with</Divider>,
    code: `<Divider>or continue with</Divider>\n`,
    props: [p('children', 'ReactNode', "'or'", 'Label in the center of the rule.')],
  },
  'brand-logo': {
    title: 'Brand Logo',
    description: 'The company mark, the product wordmark, and the lockup that pairs them.',
    ...brandLogoGuide,
    Demo: BrandLogoDemo,
    code: `<BrandLogo variant="lockup" />\n<BrandLogo variant="text" />\n<BrandLogo />\n<BrandLogo variant="icon" />\n`,
    states: [
      { label: 'Lockup', node: <BrandLogo variant="lockup" size={20} /> },
      { label: 'Text', node: <BrandLogo variant="text" size={20} /> },
      { label: 'Mark', node: <BrandLogo size={28} /> },
      { label: 'Icon', node: <BrandLogo variant="icon" size={28} /> },
    ],
    props: [
      p('size', 'number', '20', 'Mark width and height.'),
      p("variant", "'mark' | 'icon' | 'text' | 'lockup'", "'mark'", 'Mark only, icon, wordmark, or company + product lockup.'),
      p('primary', 'string', 'company or product name', 'Primary label for text and lockup.'),
      p('secondary', 'string', 'product name', 'Secondary label on the lockup variant.'),
    ],
  },
  'theme-toggle': {
    title: 'Theme Toggle',
    description: 'A labeled switch that sets light or dark for the whole page. Compact and switch only layouts are included.',
    ...themeToggleGuide,
    wide: true,
    Demo: () => (
      <div className="w-full max-w-[260px]">
        <ThemeToggle />
      </div>
    ),
    code: `<ThemeToggle />\n<ThemeToggle variant="compact" />\n<ThemeToggle variant="labels" />\n<ThemeToggle variant="icons" />\n<ThemeToggle variant="switch" />\n`,
    states: [
      {
        label: 'Default',
        node: (
          <div className="w-full max-w-[220px]">
            <ThemeToggle />
          </div>
        ),
      },
      { label: 'Compact', node: <ThemeToggle variant="compact" /> },
      { label: 'Labels', node: <ThemeToggle variant="labels" /> },
      { label: 'Icons', node: <ThemeToggle variant="icons" /> },
      { label: 'Switch', node: <ThemeToggle variant="switch" /> },
      { label: 'Disabled', node: <ThemeToggle variant="compact" disabled /> },
    ],
    props: [
      p("variant", "'default' | 'compact' | 'labels' | 'icons' | 'switch'", "'default'", 'Sidebar, toolbar, text-only, icon-only, or switch only.'),
      p('compact', 'boolean', 'false', 'Alias for variant="compact".'),
      p('disabled', 'boolean', 'false', 'Prevents changing the theme.'),
    ],
  },
  'theme-icon-toggle': {
    title: 'Theme Icon Toggle',
    description: 'A compact control that sets light or dark with sun and moon icons. Variants show one icon or both at once.',
    ...themeIconToggleGuide,
    Demo: () => (
      <div className="flex flex-wrap items-center justify-center gap-4">
        <ThemeIconToggle />
        <ThemeIconToggle variant="pair" />
      </div>
    ),
    code: `<ThemeIconToggle />\n<ThemeIconToggle variant="subtle" />\n<ThemeIconToggle variant="outline" />\n<ThemeIconToggle variant="pair" />\n<ThemeIconToggle variant="segmented" />\n<ThemeIconToggle variant="split" />\n`,
    states: [
      { label: 'Ghost', node: <ThemeIconToggle variant="ghost" /> },
      { label: 'Subtle', node: <ThemeIconToggle variant="subtle" /> },
      { label: 'Outline', node: <ThemeIconToggle variant="outline" /> },
      { label: 'Pair', node: <ThemeIconToggle variant="pair" /> },
      { label: 'Segmented', node: <ThemeIconToggle variant="segmented" /> },
      { label: 'Split', node: <ThemeIconToggle variant="split" /> },
      { label: 'Small pair', node: <ThemeIconToggle variant="pair" size="sm" /> },
      { label: 'Disabled', node: <ThemeIconToggle variant="pair" disabled /> },
    ],
    props: [
      p("variant", "'ghost' | 'subtle' | 'outline' | 'pair' | 'segmented' | 'split'", "'ghost'", 'Single swapping icon, or both sun and moon at once.'),
      p("size", "'sm' | 'md'", "'md'", 'Hit target size.'),
      p('disabled', 'boolean', 'false', 'Prevents changing the theme.'),
    ],
  },
  'auth-layout': {
    title: 'Auth Layout',
    description: 'Centered layout for sign-in and related flows.',
    Demo: () => (
      <div className="relative h-[280px] overflow-hidden rounded-[12px] border border-border-default">
        <AuthLayout navLinkTo="/pages/create-account" navLinkLabel="Create account">
          <AuthBrand title="Welcome back" subhead="Use your DevKit Account" />
        </AuthLayout>
      </div>
    ),
    wide: true,
    code: `<AuthLayout navLinkTo="/create-account" navLinkLabel="Create account">\n  <AuthBrand title="Welcome back" subhead="Use your DevKit Account" />\n</AuthLayout>\n`,
    props: [
      p('navLinkTo', 'string', 'undefined', 'Trailing nav destination.'),
      p('navLinkLabel', 'string', 'undefined', 'Trailing nav label.'),
    ],
  },
  'text-link': {
    title: 'Text Link',
    description: 'Inline links, legal copy, and error text.',
    Demo: () => (
      <div className="flex flex-col items-start gap-3">
        <TextLink href="#demo">Forgot password?</TextLink>
        <ErrorText>Incorrect email or password.</ErrorText>
        <AuthLegal />
      </div>
    ),
    code: `<TextLink href="/forgot-password">Forgot password?</TextLink>\n<ErrorText>Incorrect email or password.</ErrorText>\n`,
    props: [p('muted', 'boolean', 'false', 'Tertiary color until hover.')],
  },
  'social-login': {
    title: 'Social Login Button',
    description: 'Continue with Google, Apple, GitHub, and more.',
    Demo: SocialDemo,
    code: `<GoogleButton />\n<AppleButton />\n<GitHubButton />\n`,
    states: [
      { label: 'Default', node: <GoogleButton /> },
      { label: 'Loading', node: <GoogleButton loading /> },
      { label: 'Disabled', node: <GoogleButton disabled /> },
    ],
    props: [
      p('loading', 'boolean', 'false', 'Busy spinner and Continuing… label.'),
      p('lastUsed', 'boolean', 'false', 'Marks the last-used provider.'),
    ],
  },
  'verification-method': {
    title: 'Verification Method',
    description: 'A selectable 2FA method card.',
    Demo: MethodDemo,
    code: `<VerificationMethodCard selected icon={...} title="Authenticator app" subtitle="Use a one-time code" />\n`,
    props: [
      p('selected', 'boolean', 'false', 'Selected radio appearance.'),
      p('title', 'string', '—', 'Method name.'),
      p('subtitle', 'string', '—', 'Short description.'),
    ],
  },
  'totp-manual-key': {
    title: 'TOTP Manual Key',
    description: 'A copyable authenticator secret.',
    Demo: () => <TotpManualKey secret="JBSWY3DPEHPK3PXP" />,
    code: `<TotpManualKey secret="JBSWY3DPEHPK3PXP" />\n`,
    props: [
      p('secret', 'string', '—', 'Base32 secret.'),
      p('tone', "'light' | 'dark'", "'light'", 'Surface treatment.'),
    ],
  },
  'site-nav': {
    title: 'Site Nav',
    description: 'Marketing site header and mobile menu.',
    Demo: () => (
      <div className="overflow-hidden rounded-[12px] border border-border-default">
        <SiteNav />
      </div>
    ),
    wide: true,
    code: `<SiteNav active="Products" />\n`,
    props: [p('active', 'string', "'Products'", 'Current top-level item.')],
  },
  'site-footer': {
    title: 'Site Footer',
    description: 'Marketing site footer with language.',
    Demo: () => (
      <div className="overflow-hidden rounded-[12px] border border-border-default">
        <SiteFooter />
      </div>
    ),
    wide: true,
    code: `<SiteFooter />\n`,
    props: [],
  },
  'dashboard-shell': {
    title: 'Dashboard Shell',
    description: 'Sidebar, top bar, and main canvas.',
    Demo: ShellDemo,
    wide: true,
    code: `<DashboardShell title="Overview" sections={sections} activeId="overview" sidebarOpen={open} onSidebarOpenChange={setOpen}>{children}</DashboardShell>\n`,
    props: [
      p('sections', 'SidebarSection[]', '—', 'Sidebar groups.'),
      p('sidebarOpen', 'boolean', '—', 'Mobile drawer open state.'),
      p('children', 'ReactNode', '—', 'Main canvas.'),
    ],
  },
}

export function KitComponentDocs({ slug }: { slug: string }) {
  const def = DOCS[slug]
  if (!def) return null
  const Demo = def.Demo
  return (
    <KitDocArticle
      slug={slug}
      title={def.title}
      description={def.description}
      demo={<Demo />}
      code={def.code}
      states={def.states}
      statesContent={def.statesContent}
      props={def.props}
      wide={def.wide}
      usage={def.usage}
      accessibility={def.accessibility}
    />
  )
}

export function hasKitDoc(slug: string) {
  return slug in DOCS
}
