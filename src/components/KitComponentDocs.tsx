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
import { Alert, ALERT_SIZES, ALERT_TONES, ALERT_VARIANTS, type AlertSize, type AlertTone, type AlertVariant } from './Alert'
import { AuthBrand, AuthLayout } from './AuthLayout'
import { AuthProviderStack } from './AuthProviderButton'
import { Avatar } from './Avatar'
import { AvatarEditor } from './AvatarEditor'
import { AvatarPicker } from './AvatarPicker'
import { Badge } from './Badge'
import { BrandLogo } from './BrandLogo'
import { Breadcrumbs } from './Breadcrumbs'
import { Button } from './Button'
import { Checkbox, CheckboxGroup, CHECKBOX_SIZES, CHECKBOX_TONES, CHECKBOX_VARIANTS, type CheckboxSize, type CheckboxTone, type CheckboxVariant } from './Checkbox'
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
import {
  DatePicker,
  DATE_PICKER_SIZES,
  DATE_PICKER_VARIANTS,
  type DatePickerPreview,
  type DatePickerSize,
  type DatePickerVariant,
  type DateRange,
} from './DatePicker'
import { Divider } from './Divider'
import { Dropdown, SELECT_SIZES, SELECT_VARIANTS, type DropdownOption, type SelectTriggerSize, type SelectTriggerVariant } from './Dropdown'
import {
  EmptyState,
  EMPTY_STATE_SIZES,
  EMPTY_STATE_TONES,
  EMPTY_STATE_VARIANTS,
  EMPTY_STATE_SIZE_LABEL,
  EMPTY_STATE_TONE_LABEL,
  EMPTY_STATE_VARIANT_LABEL,
} from './EmptyState'
import {
  FieldLabel,
  FieldRow,
  FormField,
  FIELD_HINT_TONES,
  FIELD_LABEL_SIZES,
  FIELD_LABEL_TONES,
  FORM_FIELD_LAYOUTS,
  type FieldHintTone,
  type FieldLabelSize,
  type FieldLabelTone,
  type FormFieldLayout,
} from './FieldLabel'
import { GitHubButton } from './GitHubButton'
import { GoogleButton } from './GoogleButton'
import { IconButton } from './IconButton'
import { IconTab } from './IconTab'
import { KeyValueRow } from './KeyValueRow'
import { KitDocArticle } from './KitDocArticle'
import { DocsStateCard, DocsStateGrid, DocsStateGroup, DocsStack } from './DocsCard'
import {
  alertGuide,
  bodyGuide,
  brandLogoGuide,
  captionGuide,
  checkboxGuide,
  citySelectGuide,
  confirmActionGuide,
  countrySelectGuide,
  countySelectGuide,
  datePickerGuide,
  emptyStateGuide,
  eyebrowGuide,
  fieldLabelGuide,
  headingGuide,
  iconButtonGuide,
  labelGuide,
  languageSelectGuide,
  numberFieldGuide,
  otpGuide,
  passwordFieldGuide,
  passwordRevealGuide,
  phoneInputGuide,
  progressGuide,
  radioGuide,
  recoveryGuide,
  segmentedGuide,
  selectGuide,
  skeletonGuide,
  sliderGuide,
  stateSelectGuide,
  subheadGuide,
  switchGuide,
  textareaGuide,
  textFieldGuide,
  themeIconToggleGuide,
  themeToggleGuide,
} from './kit-guides'
import { LanguageSelect } from './LanguageSelect'
import { ListGroup, ListRow } from './ListRow'
import { LoadingScreen } from './LoadingScreen'
import { Modal } from './Modal'
import {
  NumberField,
  NUMBER_FIELD_ALIGN_LABEL,
  NUMBER_FIELD_ALIGNS,
  NUMBER_FIELD_SIZES,
  NUMBER_FIELD_STEPPERS,
  NUMBER_FIELD_UNIT_LABEL,
  NUMBER_FIELD_WIDTH_LABEL,
  NUMBER_FIELD_WIDTHS,
  NUMBER_FIELD_UNITS,
  NUMBER_FIELD_VARIANT_LABEL,
  NUMBER_FIELD_VARIANTS,
  type NumberFieldAlign,
  type NumberFieldSize,
  type NumberFieldStepper,
  type NumberFieldUnit,
  type NumberFieldVariant,
  type NumberFieldWidth,
} from './NumberField'
import { NavSearch } from './NavSearch'
import { OtpBoxes, OTP_BOXES_SIZES, OTP_BOXES_VARIANTS, type OtpBoxesSize, type OtpBoxesVariant } from './OtpBoxes'
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
import { CitySelect, CountySelect, StateSelect } from './PlaceSelect'
import { AppleButton } from './ProviderButtons'
import { ProfileButton } from './ProfileButton'
import { Progress, PROGRESS_SIZES, PROGRESS_TONES, PROGRESS_VARIANTS, PROGRESS_SIZE_LABEL, PROGRESS_TONE_LABEL, PROGRESS_VARIANT_LABEL } from './Progress'
import { type PropRow } from './PropsTable'
import { Radio, RadioGroup, RADIO_SIZES, RADIO_TONES, RADIO_VARIANTS, type RadioSize, type RadioTone, type RadioVariant } from './Radio'
import {
  RecoveryCodesList,
  RecoveryInput,
  RECOVERY_INPUT_MODES,
  RECOVERY_INPUT_SIZES,
  RECOVERY_INPUT_VARIANTS,
  type RecoveryInputMode,
  type RecoveryInputSize,
  type RecoveryInputVariant,
} from './RecoveryInput'
import { ScoreRing } from './ScoreRing'
import { SelectTrigger } from './SelectTrigger'
import { SegmentedControl, SegmentedToolbar, SEGMENTED_VARIANTS, type SegmentedVariant } from './SegmentedControl'
import { SettingsList, SettingsRow } from './SettingsRow'
import { SheetNav } from './SheetNav'
import { SiteFooter } from './SiteFooter'
import { SiteNav } from './SiteNav'
import { Skeleton, SKELETON_MOTIONS, SKELETON_MOTION_LABEL, SKELETON_SHAPES, SKELETON_SHAPE_LABEL, SKELETON_SIZES, SKELETON_SIZE_LABEL, SKELETON_VARIANTS, SKELETON_VARIANT_LABEL } from './Skeleton'
import {
  RangeSlider,
  Slider,
  SLIDER_FIELDS,
  SLIDER_FIELD_LABEL,
  SLIDER_SIZES,
  SLIDER_VARIANT_LABEL,
  SLIDER_VARIANTS,
  type SliderField,
  type SliderSize,
  type SliderVariant,
} from './Slider'
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

function CountryDemo() {
  const [value, setValue] = useState<string | null>('US')
  return <CountrySelect value={value} onChange={setValue} />
}

function AddressStack({
  showCounty = false,
  showCity = false,
}: {
  showCounty?: boolean
  showCity?: boolean
}) {
  const [country, setCountry] = useState<string | null>('PK')
  const [state, setState] = useState<string | null>('PK-SD')
  const [county, setCounty] = useState<string | null>('PK-SD:karachi-south')
  const [city, setCity] = useState<string | null>('PK-SD:karachi')

  function changeCountry(next: string | null) {
    setCountry(next)
    setState(null)
    setCounty(null)
    setCity(null)
  }

  function changeState(next: string | null) {
    setState(next)
    setCounty(null)
    setCity(null)
  }

  function changeCounty(next: string | null) {
    setCounty(next)
    setCity(null)
  }

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-4">
      <CountrySelect
        value={country}
        onChange={changeCountry}
        allowClear={false}
      />
      <StateSelect country={country} value={state} onChange={changeState} />
      {showCounty ? (
        <CountySelect state={state} value={county} onChange={changeCounty} />
      ) : null}
      {showCity ? (
        <CitySelect
          country={country}
          state={state}
          county={county}
          value={city}
          onChange={setCity}
        />
      ) : null}
    </div>
  )
}

function StateDemo() {
  return <AddressStack />
}

function CountyDemo() {
  return <AddressStack showCounty />
}

function CityDemo() {
  return <AddressStack showCounty showCity />
}

function LanguageDemo() {
  const [value, setValue] = useState<string | null>('en-US')
  return <LanguageSelect value={value} onChange={setValue} />
}

function PhoneDemo() {
  const [value, setValue] = useState('+14155552671')
  return <PhoneInput value={value} onChange={setValue} />
}

function CountryPlay({
  value: initial = 'US',
  ...rest
}: {
  value?: string | null
  variant?: SelectTriggerVariant
  size?: SelectTriggerSize
  disabled?: boolean
  compact?: boolean
  allowClear?: boolean
  placeholder?: string
}) {
  const [value, setValue] = useState<string | null>(initial)
  return <CountrySelect value={value} onChange={setValue} {...rest} />
}

function LanguagePlay({
  value: initial = 'en-US',
  ...rest
}: {
  value?: string | null
  variant?: SelectTriggerVariant
  size?: SelectTriggerSize
  disabled?: boolean
  compact?: boolean
  placeholder?: string
}) {
  const [value, setValue] = useState(initial ?? 'en-US')
  return <LanguageSelect value={value} onChange={setValue} {...rest} />
}

function PhonePlay({
  value: initial = '+14155552671',
  disabled,
}: {
  value?: string
  disabled?: boolean
}) {
  const [value, setValue] = useState(initial)
  return <PhoneInput value={value} onChange={setValue} disabled={disabled} />
}

function CountryStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Appearance">
        <DocsStateGrid>
          {SELECT_VARIANTS.map((variant) => (
            <FieldState key={variant} label={SELECT_VARIANT_LABEL[variant]}>
              <CountryPlay variant={variant} />
            </FieldState>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>
      <DocsStateGroup title="Size">
        <DocsStateGrid columns={3}>
          {SELECT_SIZES.map((size) => (
            <FieldState key={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}>
              <CountryPlay size={size} />
            </FieldState>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>
      <DocsStateGroup title="State">
        <DocsStateGrid>
          <FieldState label="Empty">
            <CountryPlay value={null} />
          </FieldState>
          <FieldState label="Filled">
            <CountryPlay />
          </FieldState>
          <FieldState label="Compact">
            <CountryPlay compact />
          </FieldState>
          <FieldState label="Disabled">
            <CountryPlay disabled />
          </FieldState>
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}

function StateStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Cascade">
        <DocsStateGrid columns={2}>
          <FieldState label="Country, then region">
            <AddressStack />
          </FieldState>
          <FieldState label="Disabled">
            <StateSelect country="US" value="US-CA" onChange={() => undefined} disabled />
          </FieldState>
        </DocsStateGrid>
      </DocsStateGroup>
      <DocsStateGroup title="Appearance">
        <DocsStateGrid>
          {SELECT_VARIANTS.map((variant) => (
            <FieldState key={variant} label={SELECT_VARIANT_LABEL[variant]}>
              <StateSelect country="US" value="US-CA" onChange={() => undefined} variant={variant} />
            </FieldState>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}

function CountyStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Cascade">
        <DocsStateGrid columns={2}>
          <FieldState label="Country, region, county">
            <AddressStack showCounty />
          </FieldState>
          <FieldState label="Disabled">
            <CountySelect state="US-CA" value="US-CA:los-angeles" onChange={() => undefined} disabled />
          </FieldState>
        </DocsStateGrid>
      </DocsStateGroup>
      <DocsStateGroup title="Appearance">
        <DocsStateGrid>
          {SELECT_VARIANTS.map((variant) => (
            <FieldState key={variant} label={SELECT_VARIANT_LABEL[variant]}>
              <CountySelect state="US-CA" value="US-CA:los-angeles" onChange={() => undefined} variant={variant} />
            </FieldState>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}

function CityStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Cascade">
        <DocsStateGrid columns={2}>
          <FieldState label="Full address stack">
            <AddressStack showCounty showCity />
          </FieldState>
          <FieldState label="Disabled">
            <CitySelect country="PK" state="PK-SD" value="PK-SD:karachi" onChange={() => undefined} disabled />
          </FieldState>
        </DocsStateGrid>
      </DocsStateGroup>
      <DocsStateGroup title="Appearance">
        <DocsStateGrid>
          {SELECT_VARIANTS.map((variant) => (
            <FieldState key={variant} label={SELECT_VARIANT_LABEL[variant]}>
              <CitySelect country="PK" state="PK-SD" value="PK-SD:karachi" onChange={() => undefined} variant={variant} />
            </FieldState>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}

function LanguageStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Appearance">
        <DocsStateGrid>
          {SELECT_VARIANTS.map((variant) => (
            <FieldState key={variant} label={SELECT_VARIANT_LABEL[variant]}>
              <LanguagePlay variant={variant} />
            </FieldState>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>
      <DocsStateGroup title="Size">
        <DocsStateGrid columns={3}>
          {SELECT_SIZES.map((size) => (
            <FieldState key={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}>
              <LanguagePlay size={size} />
            </FieldState>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>
      <DocsStateGroup title="State">
        <DocsStateGrid>
          <FieldState label="Filled">
            <LanguagePlay />
          </FieldState>
          <FieldState label="Compact">
            <LanguagePlay compact />
          </FieldState>
          <FieldState label="Disabled">
            <LanguagePlay disabled />
          </FieldState>
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}

function PhoneStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="State">
        <DocsStateGrid>
          <FieldState label="United States">
            <PhonePlay />
          </FieldState>
          <FieldState label="Pakistan">
            <PhonePlay value="+923001234567" />
          </FieldState>
          <FieldState label="United Kingdom">
            <PhonePlay value="+447911123456" />
          </FieldState>
          <FieldState label="Empty national">
            <PhonePlay value="+1" />
          </FieldState>
          <FieldState label="Disabled">
            <PhonePlay disabled />
          </FieldState>
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}

function ProgressDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-8">
      <div className="flex flex-col gap-6">
        {PROGRESS_VARIANTS.map((variant) => (
          <Progress
            key={variant}
            variant={variant}
            label={PROGRESS_VARIANT_LABEL[variant]}
            value={variant === 'ghost' ? 48 : 64}
          />
        ))}
      </div>
      <div className="flex flex-col gap-6">
        {PROGRESS_VARIANTS.map((variant) => (
          <Progress
            key={`unknown-${variant}`}
            variant={variant}
            label={`${PROGRESS_VARIANT_LABEL[variant]} unknown`}
            indeterminate
          />
        ))}
      </div>
    </div>
  )
}

function ProgressStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Appearance">
        <DocsStateGrid>
          {PROGRESS_VARIANTS.map((variant) => (
            <DocsStateCard key={variant} label={PROGRESS_VARIANT_LABEL[variant]} align="stretch">
              <Progress variant={variant} label={PROGRESS_VARIANT_LABEL[variant]} value={64} />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Size">
        <DocsStateGrid columns={3}>
          {PROGRESS_SIZES.map((size) => (
            <DocsStateCard key={size} label={PROGRESS_SIZE_LABEL[size]} align="stretch">
              <Progress size={size} label={PROGRESS_SIZE_LABEL[size]} value={64} />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Pill size">
        <DocsStateGrid columns={3}>
          {PROGRESS_SIZES.map((size) => (
            <DocsStateCard key={`pill-${size}`} label={PROGRESS_SIZE_LABEL[size]} align="stretch">
              <Progress variant="pill" size={size} label={PROGRESS_SIZE_LABEL[size]} value={64} />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Tone">
        <DocsStateGrid>
          {PROGRESS_TONES.map((tone) => (
            <DocsStateCard key={tone} label={PROGRESS_TONE_LABEL[tone]} align="stretch">
              <Progress tone={tone} label={PROGRESS_TONE_LABEL[tone]} value={tone === 'success' ? 100 : 64} />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="On dark">
        <DocsStateGrid>
          {PROGRESS_VARIANTS.map((variant) => (
            <DocsStateCard
              key={`dark-${variant}`}
              label={PROGRESS_VARIANT_LABEL[variant]}
              align="stretch"
              className="bg-black"
            >
              <Progress variant={variant} label={PROGRESS_VARIANT_LABEL[variant]} value={64} onDark />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Unknown">
        <DocsStateGrid>
          {PROGRESS_VARIANTS.map((variant) => (
            <DocsStateCard key={`unknown-${variant}`} label={PROGRESS_VARIANT_LABEL[variant]} align="stretch">
              <Progress variant={variant} label="Preparing" indeterminate />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Unknown size">
        <DocsStateGrid columns={3}>
          {PROGRESS_SIZES.map((size) => (
            <DocsStateCard key={`unknown-size-${size}`} label={PROGRESS_SIZE_LABEL[size]} align="stretch">
              <Progress size={size} label="Preparing" indeterminate />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Unknown pill size">
        <DocsStateGrid columns={3}>
          {PROGRESS_SIZES.map((size) => (
            <DocsStateCard key={`unknown-pill-${size}`} label={PROGRESS_SIZE_LABEL[size]} align="stretch">
              <Progress variant="pill" size={size} label="Preparing" indeterminate />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Unknown tone">
        <DocsStateGrid>
          {PROGRESS_TONES.map((tone) => (
            <DocsStateCard key={`unknown-tone-${tone}`} label={PROGRESS_TONE_LABEL[tone]} align="stretch">
              <Progress tone={tone} label="Preparing" indeterminate />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Unknown on dark">
        <DocsStateGrid>
          {PROGRESS_VARIANTS.map((variant) => (
            <DocsStateCard
              key={`unknown-dark-${variant}`}
              label={PROGRESS_VARIANT_LABEL[variant]}
              align="stretch"
              className="bg-black"
            >
              <Progress variant={variant} label="Preparing" indeterminate onDark />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="State">
        <DocsStateGrid>
          <DocsStateCard label="Empty" align="stretch">
            <Progress label="Waiting" value={0} />
          </DocsStateCard>
          <DocsStateCard label="Partial" align="stretch">
            <Progress label="Uploading" value={64} />
          </DocsStateCard>
          <DocsStateCard label="Complete" align="stretch">
            <Progress label="Done" value={100} tone="success" />
          </DocsStateCard>
          <DocsStateCard label="Failed" align="stretch">
            <Progress label="Upload failed" value={28} tone="danger" />
          </DocsStateCard>
          <DocsStateCard label="No percent" align="stretch">
            <Progress label="Installing" value={38} showValue={false} />
          </DocsStateCard>
          <DocsStateCard label="Unlabeled" align="stretch">
            <Progress value={72} />
          </DocsStateCard>
          <DocsStateCard label="Disabled" align="stretch">
            <Progress label="Paused" value={41} disabled />
          </DocsStateCard>
          <DocsStateCard label="Unknown unlabeled" align="stretch">
            <Progress indeterminate />
          </DocsStateCard>
          <DocsStateCard label="Unknown disabled" align="stretch">
            <Progress label="Preparing" indeterminate disabled />
          </DocsStateCard>
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}

function SkeletonDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-6">
      {SKELETON_VARIANTS.map((variant) => (
        <Skeleton key={variant} variant={variant} lines={3} label={`${SKELETON_VARIANT_LABEL[variant]} loading`} />
      ))}
    </div>
  )
}

function SkeletonStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Appearance">
        <DocsStateGrid columns={2}>
          {SKELETON_VARIANTS.map((variant) => (
            <DocsStateCard key={variant} label={SKELETON_VARIANT_LABEL[variant]} align="stretch" wide>
              <Skeleton variant={variant} lines={3} />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Shape">
        <DocsStateGrid columns={2}>
          {SKELETON_SHAPES.map((shape) => (
            <DocsStateCard
              key={shape}
              label={SKELETON_SHAPE_LABEL[shape]}
              align={shape === 'circle' || shape === 'square' ? 'center' : 'stretch'}
              wide
            >
              <Skeleton shape={shape} />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Size">
        <DocsStateGrid columns={3}>
          {SKELETON_SIZES.map((size) => (
            <DocsStateCard key={size} label={SKELETON_SIZE_LABEL[size]} align="stretch">
              <Skeleton size={size} lines={3} />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Circle size">
        <DocsStateGrid columns={3}>
          {SKELETON_SIZES.map((size) => (
            <DocsStateCard key={`circle-${size}`} label={SKELETON_SIZE_LABEL[size]}>
              <Skeleton shape="circle" size={size} />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Motion">
        <DocsStateGrid columns={3}>
          {SKELETON_MOTIONS.map((motion) => (
            <DocsStateCard key={motion} label={SKELETON_MOTION_LABEL[motion]} align="stretch">
              <Skeleton motion={motion} lines={3} />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="State">
        <DocsStateGrid columns={2}>
          <DocsStateCard label="Line" align="stretch" wide>
            <Skeleton />
          </DocsStateCard>
          <DocsStateCard label="Three lines" align="stretch" wide>
            <Skeleton lines={3} label="Loading article" />
          </DocsStateCard>
          <DocsStateCard label="Heading and lines" align="stretch" wide>
            <div className="flex w-full flex-col gap-3">
              <Skeleton shape="heading" />
              <Skeleton lines={3} />
            </div>
          </DocsStateCard>
          <DocsStateCard label="Avatar row" align="stretch" wide>
            <div className="flex w-full items-center gap-3">
              <Skeleton shape="circle" />
              <div className="min-w-0 flex-1">
                <Skeleton lines={2} />
              </div>
            </div>
          </DocsStateCard>
          <DocsStateCard label="Image and copy" align="stretch" wide>
            <div className="flex w-full flex-col gap-3">
              <Skeleton shape="rect" size="sm" />
              <Skeleton shape="heading" size="sm" />
              <Skeleton lines={2} size="sm" />
            </div>
          </DocsStateCard>
          <DocsStateCard label="Pill button" align="stretch" wide>
            <Skeleton variant="pill" className="h-11 w-[140px]" />
          </DocsStateCard>
          <DocsStateCard label="Outline circle">
            <Skeleton variant="outline" shape="circle" size="lg" />
          </DocsStateCard>
          <DocsStateCard label="Static" align="stretch" wide>
            <Skeleton motion="none" lines={3} />
          </DocsStateCard>
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}

function EmptyIcon({ name = 'inbox' }: { name?: 'inbox' | 'search' | 'lock' | 'grid' | 'refresh' }) {
  const Icon =
    name === 'search'
      ? DkMagnifyingGlassFind
      : name === 'lock'
        ? DkPadlockSecureClosed
        : name === 'grid'
          ? DkLayoutGrid
          : name === 'refresh'
            ? DkRefreshClockwiseRotate
            : DkMessageInboxTray
  return <Icon strokeWidth={1.5} absoluteStrokeWidth />
}

function EmptyAction({
  children = 'New project',
  size = 'md',
  variant,
  disabled,
}: {
  children?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
}) {
  return (
    <Button size={size} variant={variant} disabled={disabled}>
      {children}
    </Button>
  )
}

function EmptyStateDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-4">
      {EMPTY_STATE_VARIANTS.map((variant) => (
        <EmptyState
          key={variant}
          variant={variant}
          icon={<EmptyIcon />}
          title={EMPTY_STATE_VARIANT_LABEL[variant]}
          body="Mentions and reviews will show up here."
        />
      ))}
    </div>
  )
}

function EmptyStateStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Appearance">
        <DocsStateGrid columns={2}>
          {EMPTY_STATE_VARIANTS.map((variant) => (
            <DocsStateCard
              key={variant}
              label={EMPTY_STATE_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <EmptyState
                variant={variant}
                icon={<EmptyIcon />}
                title="No messages"
                body="Mentions and reviews will show up here."
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Size">
        <DocsStateGrid columns={2}>
          {EMPTY_STATE_SIZES.map((size) => (
            <DocsStateCard key={size} label={EMPTY_STATE_SIZE_LABEL[size]} align="stretch" wide size="lg" className="bg-bg-primary">
              <EmptyState
                size={size}
                icon={<EmptyIcon />}
                title="No projects"
                body="Create a project to get started."
                action={<EmptyAction size={size === 'lg' ? 'md' : size}>New project</EmptyAction>}
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Tone">
        <DocsStateGrid columns={2}>
          {EMPTY_STATE_TONES.map((tone) => (
            <DocsStateCard key={tone} label={EMPTY_STATE_TONE_LABEL[tone]} align="stretch" wide className="bg-bg-primary">
              <EmptyState
                tone={tone}
                icon={<EmptyIcon name={tone === 'danger' ? 'refresh' : tone === 'warning' ? 'lock' : 'inbox'} />}
                title={
                  tone === 'success'
                    ? 'Inbox is clear'
                    : tone === 'warning'
                      ? 'No access'
                      : tone === 'danger'
                        ? 'Could not load'
                        : 'No messages'
                }
                body={
                  tone === 'success'
                    ? 'New mentions will land here.'
                    : tone === 'warning'
                      ? 'Ask an owner to invite you to this workspace.'
                      : tone === 'danger'
                        ? 'Check the connection, then try again.'
                        : 'Mentions and reviews will show up here.'
                }
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="On dark">
        <DocsStateGrid columns={2}>
          {EMPTY_STATE_VARIANTS.map((variant) => (
            <DocsStateCard
              key={`dark-${variant}`}
              label={EMPTY_STATE_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <EmptyState
                variant={variant}
                icon={<EmptyIcon />}
                title="No messages"
                body="Mentions and reviews will show up here."
                onDark
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="State">
        <DocsStateGrid columns={2}>
          <DocsStateCard label="Title only" align="stretch" wide className="bg-bg-primary">
            <EmptyState title="No projects" />
          </DocsStateCard>
          <DocsStateCard label="No icon" align="stretch" wide className="bg-bg-primary">
            <EmptyState title="No projects" body="Create a project to get started." />
          </DocsStateCard>
          <DocsStateCard label="First use" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              icon={<EmptyIcon name="grid" />}
              title="No projects"
              body="Create a project to get started."
              action={<EmptyAction>New project</EmptyAction>}
            />
          </DocsStateCard>
          <DocsStateCard label="No results" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              icon={<EmptyIcon name="search" />}
              title="No results"
              body="Try a different search."
            />
          </DocsStateCard>
          <DocsStateCard label="Could not load" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              tone="danger"
              icon={<EmptyIcon name="refresh" />}
              title="Could not load"
              body="Check the connection, then try again."
              action={<EmptyAction variant="secondary">Try again</EmptyAction>}
            />
          </DocsStateCard>
          <DocsStateCard label="No access" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              tone="warning"
              icon={<EmptyIcon name="lock" />}
              title="No access"
              body="Ask an owner to invite you to this workspace."
            />
          </DocsStateCard>
          <DocsStateCard label="With secondary" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              icon={<EmptyIcon name="grid" />}
              title="No projects"
              body="Create a project or import one you already have."
              action={<EmptyAction>New project</EmptyAction>}
              secondary={<EmptyAction variant="ghost">Import</EmptyAction>}
            />
          </DocsStateCard>
          <DocsStateCard label="Start" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              align="start"
              variant="outline"
              icon={<EmptyIcon />}
              title="No messages"
              body="Mentions and reviews will show up here."
              action={<EmptyAction size="sm">Refresh</EmptyAction>}
            />
          </DocsStateCard>
          <DocsStateCard label="Disabled action" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              icon={<EmptyIcon name="grid" />}
              title="No projects"
              body="You need permission to create one."
              action={<EmptyAction disabled>New project</EmptyAction>}
            />
          </DocsStateCard>
          <DocsStateCard label="Outline, action" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              variant="outline"
              icon={<EmptyIcon />}
              title="Inbox is clear"
              body="New mentions and review requests will land here."
              action={<EmptyAction variant="secondary">View projects</EmptyAction>}
            />
          </DocsStateCard>
          <DocsStateCard label="Pill, small" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              variant="pill"
              size="sm"
              icon={<EmptyIcon name="search" />}
              title="No results"
              body="Try a different search."
            />
          </DocsStateCard>
          <DocsStateCard label="Ghost, large" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              variant="ghost"
              size="lg"
              icon={<EmptyIcon />}
              title="Inbox is clear"
              body="New mentions and review requests will land here."
            />
          </DocsStateCard>
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}

function CheckboxDemo() {
  const [outline, setOutline] = useState(true)
  const [digest, setDigest] = useState(true)
  const [product, setProduct] = useState(false)
  const [ack, setAck] = useState(false)
  const selected = Number(digest) + Number(product)

  return (
    <CheckboxGroup label="Email preferences" className="w-full max-w-[320px] gap-4">
      <Checkbox
        variant="outline"
        label="Outline"
        checked={outline}
        onChange={(event) => setOutline(event.target.checked)}
      />
      <Checkbox
        variant="subtle"
        label="Subtle"
        checked={outline}
        onChange={(event) => setOutline(event.target.checked)}
      />
      <Checkbox
        variant="ghost"
        label="Ghost"
        checked={outline}
        onChange={(event) => setOutline(event.target.checked)}
      />
      <Checkbox
        label="All email"
        checked={selected === 2}
        indeterminate={selected === 1}
        onChange={(event) => {
          const next = event.target.checked
          setDigest(next)
          setProduct(next)
        }}
      />
      <Checkbox
        className="pl-7"
        label="Weekly digest"
        checked={digest}
        onChange={(event) => setDigest(event.target.checked)}
      />
      <Checkbox
        className="pl-7"
        label="Product updates"
        checked={product}
        onChange={(event) => setProduct(event.target.checked)}
      />
      <Checkbox
        tone="danger"
        label="I understand this will delete the project"
        checked={ack}
        onChange={(event) => setAck(event.target.checked)}
      />
    </CheckboxGroup>
  )
}

const CHECKBOX_VARIANT_LABEL: Record<CheckboxVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
}

const CHECKBOX_TONE_LABEL: Record<CheckboxTone, string> = {
  brand: 'Brand',
  danger: 'Danger',
}

const CHECKBOX_SIZE_LABEL: Record<CheckboxSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

function CheckboxStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Appearance">
        <DocsStateGrid>
          {CHECKBOX_VARIANTS.map((variant) => (
            <DocsStateCard key={variant} label={CHECKBOX_VARIANT_LABEL[variant]}>
              <Checkbox variant={variant} label={CHECKBOX_VARIANT_LABEL[variant]} defaultChecked />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Tone">
        <DocsStateGrid columns={2}>
          {CHECKBOX_TONES.map((tone) => (
            <DocsStateCard key={tone} label={CHECKBOX_TONE_LABEL[tone]}>
              <Checkbox tone={tone} label={tone === 'danger' ? 'Delete this project' : 'Product updates'} defaultChecked />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Size">
        <DocsStateGrid columns={3}>
          {CHECKBOX_SIZES.map((size) => (
            <DocsStateCard key={size} label={CHECKBOX_SIZE_LABEL[size]}>
              <Checkbox size={size} label={CHECKBOX_SIZE_LABEL[size]} defaultChecked />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="State">
        <DocsStateGrid>
          <DocsStateCard label="Unchecked">
            <Checkbox label="Off" />
          </DocsStateCard>
          <DocsStateCard label="Checked">
            <Checkbox label="On" defaultChecked />
          </DocsStateCard>
          <DocsStateCard label="Mixed">
            <Checkbox label="Some" indeterminate />
          </DocsStateCard>
          <DocsStateCard label="Hover" inert>
            <Checkbox label="Hover" preview="hover" />
          </DocsStateCard>
          <DocsStateCard label="Focus" inert>
            <Checkbox label="Focus" preview="focus" />
          </DocsStateCard>
          <DocsStateCard label="Active" inert>
            <Checkbox label="Active" preview="active" />
          </DocsStateCard>
          <DocsStateCard label="Invalid">
            <Checkbox label="Required" invalid />
          </DocsStateCard>
          <DocsStateCard label="Invalid, on">
            <Checkbox label="Required" invalid defaultChecked />
          </DocsStateCard>
          <DocsStateCard label="Disabled">
            <Checkbox label="Locked" disabled />
          </DocsStateCard>
          <DocsStateCard label="Disabled, on">
            <Checkbox label="Locked" defaultChecked disabled />
          </DocsStateCard>
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}

function RadioDemo() {
  const [pay, setPay] = useState('card')
  const [chrome, setChrome] = useState('outline')
  const [severity, setSeverity] = useState('keep')

  return (
    <div className="flex w-full max-w-[320px] flex-col gap-6">
      <RadioGroup label="Appearance" className="gap-1">
        <Radio
          variant="outline"
          name="docs-radio-chrome"
          label="Outline"
          checked={chrome === 'outline'}
          onChange={() => setChrome('outline')}
        />
        <Radio
          variant="subtle"
          name="docs-radio-chrome"
          label="Subtle"
          checked={chrome === 'subtle'}
          onChange={() => setChrome('subtle')}
        />
        <Radio
          variant="ghost"
          name="docs-radio-chrome"
          label="Ghost"
          checked={chrome === 'ghost'}
          onChange={() => setChrome('ghost')}
        />
      </RadioGroup>
      <RadioGroup label="Payment" className="gap-1">
        <Radio
          name="docs-radio-pay"
          label="Card"
          checked={pay === 'card'}
          onChange={() => setPay('card')}
        />
        <Radio
          name="docs-radio-pay"
          label="Bank transfer"
          checked={pay === 'bank'}
          onChange={() => setPay('bank')}
        />
        <Radio
          name="docs-radio-pay"
          label="Invoice"
          checked={pay === 'invoice'}
          onChange={() => setPay('invoice')}
        />
      </RadioGroup>
      <RadioGroup label="Project" className="gap-1">
        <Radio
          name="docs-radio-severity"
          label="Keep the project"
          checked={severity === 'keep'}
          onChange={() => setSeverity('keep')}
        />
        <Radio
          tone="danger"
          name="docs-radio-severity"
          label="Delete the project"
          checked={severity === 'delete'}
          onChange={() => setSeverity('delete')}
        />
      </RadioGroup>
    </div>
  )
}

const RADIO_VARIANT_LABEL: Record<RadioVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
}

const RADIO_TONE_LABEL: Record<RadioTone, string> = {
  brand: 'Brand',
  danger: 'Danger',
}

const RADIO_SIZE_LABEL: Record<RadioSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

function RadioStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Appearance">
        <DocsStateGrid>
          {RADIO_VARIANTS.map((variant) => (
            <DocsStateCard key={variant} label={RADIO_VARIANT_LABEL[variant]}>
              <Radio variant={variant} label={RADIO_VARIANT_LABEL[variant]} checked />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Tone">
        <DocsStateGrid columns={2}>
          {RADIO_TONES.map((tone) => (
            <DocsStateCard key={tone} label={RADIO_TONE_LABEL[tone]}>
              <Radio
                tone={tone}
                label={tone === 'danger' ? 'Delete the project' : 'Keep the project'}
                checked
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Size">
        <DocsStateGrid columns={3}>
          {RADIO_SIZES.map((size) => (
            <DocsStateCard key={size} label={RADIO_SIZE_LABEL[size]}>
              <Radio size={size} label={RADIO_SIZE_LABEL[size]} checked />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="State">
        <DocsStateGrid>
          <DocsStateCard label="Unchecked">
            <Radio label="Off" />
          </DocsStateCard>
          <DocsStateCard label="Checked">
            <Radio label="On" checked />
          </DocsStateCard>
          <DocsStateCard label="Hover" inert>
            <Radio label="Hover" preview="hover" />
          </DocsStateCard>
          <DocsStateCard label="Hover, on" inert>
            <Radio label="Hover" checked preview="hover" />
          </DocsStateCard>
          <DocsStateCard label="Focus" inert>
            <Radio label="Focus" preview="focus" />
          </DocsStateCard>
          <DocsStateCard label="Active" inert>
            <Radio label="Active" preview="active" />
          </DocsStateCard>
          <DocsStateCard label="Invalid">
            <Radio label="Required" invalid />
          </DocsStateCard>
          <DocsStateCard label="Invalid, on">
            <Radio label="Required" invalid checked />
          </DocsStateCard>
          <DocsStateCard label="Disabled">
            <Radio label="Locked" disabled />
          </DocsStateCard>
          <DocsStateCard label="Disabled, on">
            <Radio label="Locked" checked disabled />
          </DocsStateCard>
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}

function StateSlider({
  initial = 48,
  ...props
}: {
  initial?: number
  variant?: SliderVariant
  size?: SliderSize
  label?: string
  disabled?: boolean
  invalid?: boolean
  valid?: boolean
  preview?: 'hover' | 'focus' | 'active'
  tone?: 'default' | 'onDark'
  showValue?: boolean
  showEnds?: boolean
  marks?: boolean | number[]
  min?: number
  max?: number
  step?: number
  field?: boolean | SliderField
  unit?: 'none' | 'percent' | 'currency' | 'degree' | 'px'
  prefix?: string
  suffix?: string
  fieldVariant?: NumberFieldVariant
  fieldSize?: NumberFieldSize
  fieldStepper?: NumberFieldStepper
  fieldAlign?: NumberFieldAlign
  fieldWidth?: NumberFieldWidth
  fieldCompact?: boolean
  fieldReadOnly?: boolean
  fieldPlaceholder?: string
}) {
  const [value, setValue] = useState(initial)
  return <Slider {...props} value={value} onValueChange={setValue} />
}

function StateRange({
  initial = [24, 72] as [number, number],
  ...props
}: {
  initial?: [number, number]
  variant?: SliderVariant
  size?: SliderSize
  label?: string
  disabled?: boolean
  invalid?: boolean
  showValue?: boolean
  showEnds?: boolean
  formatValue?: (value: number) => string
  field?: boolean | SliderField
  unit?: 'none' | 'percent' | 'currency' | 'degree' | 'px'
}) {
  const [value, setValue] = useState<[number, number]>(initial)
  return <RangeSlider {...props} value={value} onValueChange={setValue} />
}

function SliderDemo() {
  const [value, setValue] = useState(48)
  const [range, setRange] = useState<[number, number]>([24, 72])

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-6">
      {SLIDER_VARIANTS.map((variant) => (
        <Slider
          key={variant}
          variant={variant}
          label={SLIDER_VARIANT_LABEL[variant]}
          value={value}
          onValueChange={setValue}
          field="end"
          unit="percent"
        />
      ))}
      <Slider
        label="Opacity"
        field="start"
        unit="percent"
        value={value}
        onValueChange={setValue}
      />
      <Slider
        label="Quantity"
        field="end"
        fieldStepper="split"
        fieldAlign="center"
        value={value}
        onValueChange={setValue}
      />
      <RangeSlider
        label="Price"
        field="both"
        unit="currency"
        value={range}
        onValueChange={setRange}
        showEnds
      />
    </div>
  )
}

function SliderStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Appearance">
        <DocsStateGrid>
          {SLIDER_VARIANTS.map((variant) => (
            <DocsStateCard key={variant} label={SLIDER_VARIANT_LABEL[variant]} align="stretch">
              <StateSlider variant={variant} label={SLIDER_VARIANT_LABEL[variant]} showValue />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Size">
        <DocsStateGrid columns={3}>
          {SLIDER_SIZES.map((size) => (
            <DocsStateCard key={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'} align="stretch">
              <StateSlider size={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'} />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Range">
        <DocsStateGrid>
          {SLIDER_VARIANTS.map((variant) => (
            <DocsStateCard key={variant} label={SLIDER_VARIANT_LABEL[variant]} align="stretch">
              <StateRange variant={variant} label={SLIDER_VARIANT_LABEL[variant]} showValue />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="With field">
        <DocsStateGrid>
          {SLIDER_VARIANTS.map((variant) => (
            <DocsStateCard key={variant} label={SLIDER_VARIANT_LABEL[variant]} align="stretch">
              <StateSlider variant={variant} label={SLIDER_VARIANT_LABEL[variant]} field="end" unit="percent" />
            </DocsStateCard>
          ))}
          {SLIDER_FIELDS.map((layout) => (
            <DocsStateCard key={layout} label={SLIDER_FIELD_LABEL[layout]} align="stretch">
              {layout === 'both' ? (
                <StateRange label="Price" field={layout} unit="currency" />
              ) : (
                <StateSlider label="Opacity" field={layout} unit="percent" />
              )}
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Field chrome">
        <DocsStateGrid>
          {NUMBER_FIELD_VARIANTS.map((fieldVariant) => (
            <DocsStateCard key={fieldVariant} label={NUMBER_FIELD_VARIANT_LABEL[fieldVariant]} align="stretch">
              <StateSlider
                label={NUMBER_FIELD_VARIANT_LABEL[fieldVariant]}
                field="end"
                unit="percent"
                fieldVariant={fieldVariant}
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Field stepper">
        <DocsStateGrid columns={2}>
          {NUMBER_FIELD_STEPPERS.map((fieldStepper) => (
            <DocsStateCard key={fieldStepper} label={fieldStepper === 'stack' ? 'Stack' : 'Split'} align="stretch">
              <StateSlider
                label={fieldStepper === 'stack' ? 'Opacity' : 'Quantity'}
                field="end"
                unit={fieldStepper === 'stack' ? 'percent' : 'none'}
                fieldStepper={fieldStepper}
                fieldAlign={fieldStepper === 'split' ? 'center' : undefined}
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Field width">
        <DocsStateGrid columns={2}>
          {NUMBER_FIELD_WIDTHS.map((fieldWidth) => (
            <DocsStateCard key={fieldWidth} label={NUMBER_FIELD_WIDTH_LABEL[fieldWidth]} align="stretch">
              <StateSlider
                label={NUMBER_FIELD_WIDTH_LABEL[fieldWidth]}
                field="end"
                unit="percent"
                fieldWidth={fieldWidth}
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Field align">
        <DocsStateGrid columns={3}>
          {NUMBER_FIELD_ALIGNS.map((fieldAlign) => (
            <DocsStateCard key={fieldAlign} label={NUMBER_FIELD_ALIGN_LABEL[fieldAlign]} align="stretch">
              <StateSlider
                label={NUMBER_FIELD_ALIGN_LABEL[fieldAlign]}
                field="end"
                unit="percent"
                fieldAlign={fieldAlign}
                fieldWidth="fill"
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Field size">
        <DocsStateGrid columns={3}>
          {NUMBER_FIELD_SIZES.map((fieldSize) => (
            <DocsStateCard key={fieldSize} label={fieldSize === 'sm' ? 'Small' : fieldSize === 'md' ? 'Medium' : 'Large'} align="stretch">
              <StateSlider
                label={fieldSize === 'sm' ? 'Small' : fieldSize === 'md' ? 'Medium' : 'Large'}
                field="end"
                unit="percent"
                fieldSize={fieldSize}
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Tone">
        <DocsStateGrid columns={2}>
          <DocsStateCard label="Default" align="stretch">
            <StateSlider label="Volume" showValue />
          </DocsStateCard>
          <DocsStateCard label="On dark" align="stretch" className="bg-black">
            <StateSlider tone="onDark" label="Zoom" showValue initial={65} min={1} max={100} />
          </DocsStateCard>
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="State">
        <DocsStateGrid>
          <DocsStateCard label="Rest" align="stretch">
            <StateSlider label="Volume" showValue />
          </DocsStateCard>
          <DocsStateCard label="Hover" inert align="stretch">
            <StateSlider label="Volume" showValue preview="hover" />
          </DocsStateCard>
          <DocsStateCard label="Focus" inert align="stretch">
            <StateSlider label="Volume" showValue preview="focus" />
          </DocsStateCard>
          <DocsStateCard label="Active" inert align="stretch">
            <StateSlider label="Volume" showValue preview="active" />
          </DocsStateCard>
          <DocsStateCard label="With ends" align="stretch">
            <StateSlider label="Volume" showValue showEnds />
          </DocsStateCard>
          <DocsStateCard label="Marks" align="stretch">
            <StateSlider label="Quality" marks={[0, 25, 50, 75, 100]} showEnds initial={50} />
          </DocsStateCard>
          <DocsStateCard label="Invalid" align="stretch">
            <StateSlider label="Required" invalid showValue initial={0} />
          </DocsStateCard>
          <DocsStateCard label="Valid" align="stretch">
            <StateSlider label="Complete" valid showValue initial={100} />
          </DocsStateCard>
          <DocsStateCard label="Disabled" align="stretch">
            <StateSlider label="Locked" disabled showValue />
          </DocsStateCard>
          <DocsStateCard label="Field, invalid" align="stretch">
            <StateSlider label="Required" field="end" unit="percent" invalid />
          </DocsStateCard>
          <DocsStateCard label="Field, disabled" align="stretch">
            <StateSlider label="Locked" field="end" unit="percent" disabled />
          </DocsStateCard>
          <DocsStateCard label="Field, read only" align="stretch">
            <StateSlider label="Locked field" field="end" unit="percent" fieldReadOnly />
          </DocsStateCard>
          <DocsStateCard label="Range, disabled" align="stretch">
            <StateRange label="Locked" disabled showValue />
          </DocsStateCard>
          <DocsStateCard label="Range, invalid" align="stretch">
            <StateRange label="Required" invalid showValue />
          </DocsStateCard>
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}

function StateNumber({
  initial = 48,
  ...props
}: {
  initial?: number | null
  variant?: NumberFieldVariant
  size?: NumberFieldSize
  unit?: NumberFieldUnit
  stepper?: NumberFieldStepper
  width?: NumberFieldWidth
  disabled?: boolean
  invalid?: boolean
  valid?: boolean
  readOnly?: boolean
  preview?: 'hover' | 'focus'
  min?: number
  max?: number
  step?: number
  compact?: boolean
  placeholder?: string
  prefix?: string
  suffix?: string
  'aria-label'?: string
}) {
  const [value, setValue] = useState<number | null>(initial)
  return <NumberField {...props} value={value} onValueChange={setValue} />
}

function NumberFieldDemo() {
  const [value, setValue] = useState<number | null>(48)
  const [qty, setQty] = useState<number | null>(2)
  const [price, setPrice] = useState<number | null>(24)

  return (
    <div className="flex w-full max-w-[360px] flex-col gap-4">
      {NUMBER_FIELD_VARIANTS.map((variant) => (
        <NumberField
          key={variant}
          variant={variant}
          unit="percent"
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
          aria-label={`${NUMBER_FIELD_VARIANT_LABEL[variant]} percent`}
        />
      ))}
      <NumberField
        unit="currency"
        value={price}
        onValueChange={setPrice}
        min={0}
        step={0.5}
        aria-label="Price"
      />
      <NumberField
        stepper="split"
        value={qty}
        onValueChange={setQty}
        min={1}
        max={99}
        aria-label="Quantity"
      />
      <NumberField
        width="fill"
        unit="percent"
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        aria-label="Fill width"
      />
    </div>
  )
}

function NumberFieldStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Appearance">
        <DocsStateGrid>
          {NUMBER_FIELD_VARIANTS.map((variant) => (
            <DocsStateCard key={variant} label={NUMBER_FIELD_VARIANT_LABEL[variant]} align="stretch">
              <StateNumber variant={variant} unit="percent" aria-label={NUMBER_FIELD_VARIANT_LABEL[variant]} />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Size">
        <DocsStateGrid columns={3}>
          {NUMBER_FIELD_SIZES.map((size) => (
            <DocsStateCard key={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'} align="stretch">
              <StateNumber size={size} unit="percent" aria-label={size} />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Unit">
        <DocsStateGrid>
          {NUMBER_FIELD_UNITS.map((unit) => (
            <DocsStateCard key={unit} label={NUMBER_FIELD_UNIT_LABEL[unit]} align="stretch">
              <StateNumber
                unit={unit}
                initial={unit === 'currency' ? 24 : unit === 'px' ? 16 : 48}
                step={unit === 'currency' ? 0.5 : 1}
                aria-label={NUMBER_FIELD_UNIT_LABEL[unit]}
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Width">
        <DocsStateGrid columns={2}>
          {NUMBER_FIELD_WIDTHS.map((width) => (
            <DocsStateCard key={width} label={NUMBER_FIELD_WIDTH_LABEL[width]} align="stretch">
              <StateNumber width={width} unit="percent" aria-label={NUMBER_FIELD_WIDTH_LABEL[width]} />
            </DocsStateCard>
          ))}
          {NUMBER_FIELD_VARIANTS.map((variant) => (
            <DocsStateCard key={`clip-${variant}`} label={`${NUMBER_FIELD_VARIANT_LABEL[variant]}, clipped`} align="stretch">
              <StateNumber
                variant={variant}
                initial={123456789012}
                aria-label={`${NUMBER_FIELD_VARIANT_LABEL[variant]} overflow`}
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Stepper">
        <DocsStateGrid columns={2}>
          {NUMBER_FIELD_STEPPERS.map((stepper) => (
            <DocsStateCard key={stepper} label={stepper === 'stack' ? 'Stack' : 'Split'} align="stretch">
              <StateNumber
                stepper={stepper}
                initial={stepper === 'split' ? 2 : 48}
                min={stepper === 'split' ? 1 : 0}
                max={stepper === 'split' ? 99 : 100}
                unit={stepper === 'stack' ? 'percent' : 'none'}
                aria-label={stepper === 'stack' ? 'Opacity' : 'Quantity'}
              />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="State">
        <DocsStateGrid>
          <DocsStateCard label="Empty" align="stretch">
            <StateNumber initial={null} placeholder="0" aria-label="Empty" />
          </DocsStateCard>
          <DocsStateCard label="Filled" align="stretch">
            <StateNumber unit="percent" aria-label="Filled" />
          </DocsStateCard>
          <DocsStateCard label="Hover" inert align="stretch">
            <StateNumber unit="percent" preview="hover" aria-label="Hover" />
          </DocsStateCard>
          <DocsStateCard label="Focus" inert align="stretch">
            <StateNumber unit="percent" preview="focus" aria-label="Focus" />
          </DocsStateCard>
          <DocsStateCard label="Invalid" align="stretch">
            <StateNumber unit="percent" invalid initial={140} aria-label="Invalid" />
          </DocsStateCard>
          <DocsStateCard label="Valid" align="stretch">
            <StateNumber unit="percent" valid aria-label="Valid" />
          </DocsStateCard>
          <DocsStateCard label="Disabled" align="stretch">
            <StateNumber unit="percent" disabled aria-label="Disabled" />
          </DocsStateCard>
          <DocsStateCard label="Read only" align="stretch">
            <StateNumber unit="percent" readOnly aria-label="Read only" />
          </DocsStateCard>
          <DocsStateCard label="At minimum" align="stretch">
            <StateNumber unit="percent" min={0} max={100} initial={0} aria-label="Minimum" />
          </DocsStateCard>
          <DocsStateCard label="At maximum" align="stretch">
            <StateNumber unit="percent" min={0} max={100} initial={100} aria-label="Maximum" />
          </DocsStateCard>
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}

function DateDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-4">
      {DATE_PICKER_VARIANTS.map((variant) => (
        <DatePlay
          key={variant}
          variant={variant}
          placeholder={`${DATE_VARIANT_LABEL[variant]} date`}
        />
      ))}
    </div>
  )
}

const DATE_VARIANT_LABEL: Record<DatePickerVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
  underline: 'Underline',
  pill: 'Pill',
}

const DATE_SIZE_LABEL: Record<DatePickerSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

function DatePlay({
  value: initial = '2026-08-29',
  ...rest
}: {
  value?: string | null
  variant?: DatePickerVariant
  size?: DatePickerSize
  invalid?: boolean
  valid?: boolean
  disabled?: boolean
  compact?: boolean
  placeholder?: string
  preview?: DatePickerPreview
}) {
  const [value, setValue] = useState<string | null>(initial)
  return <DatePicker value={value} onChange={setValue} {...rest} />
}

function RangePlay({
  value: initial = { start: '2026-08-12', end: '2026-08-20' },
  ...rest
}: {
  value?: DateRange
  variant?: DatePickerVariant
  size?: DatePickerSize
  invalid?: boolean
  valid?: boolean
  disabled?: boolean
  placeholder?: string
}) {
  const [range, setRange] = useState<DateRange>(initial)
  return <DatePicker mode="range" rangeValue={range} onRangeChange={setRange} {...rest} />
}

function DatePickerStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Appearance">
        <DocsStateGrid>
          {DATE_PICKER_VARIANTS.map((variant) => (
            <DocsStateCard key={variant} label={DATE_VARIANT_LABEL[variant]} align="stretch">
              <DatePlay variant={variant} />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Size">
        <DocsStateGrid columns={3}>
          {DATE_PICKER_SIZES.map((size) => (
            <DocsStateCard key={size} label={DATE_SIZE_LABEL[size]} align="stretch">
              <DatePlay size={size} />
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Mode">
        <DocsStateGrid columns={2}>
          <DocsStateCard label="Single" align="stretch">
            <DatePlay />
          </DocsStateCard>
          <DocsStateCard label="Range" align="stretch">
            <RangePlay />
          </DocsStateCard>
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="State">
        <DocsStateGrid>
          <DocsStateCard label="Empty" align="stretch">
            <DatePlay value={null} placeholder="Select a date" />
          </DocsStateCard>
          <DocsStateCard label="Filled" align="stretch">
            <DatePlay />
          </DocsStateCard>
          <DocsStateCard label="Hover" align="stretch" inert>
            <DatePlay preview="hover" />
          </DocsStateCard>
          <DocsStateCard label="Open" align="stretch" inert>
            <DatePlay preview="open" />
          </DocsStateCard>
          <DocsStateCard label="Invalid" align="stretch">
            <DatePlay invalid />
          </DocsStateCard>
          <DocsStateCard label="Valid" align="stretch">
            <DatePlay valid />
          </DocsStateCard>
          <DocsStateCard label="Disabled" align="stretch">
            <DatePlay disabled />
          </DocsStateCard>
          <DocsStateCard label="Disabled, empty" align="stretch">
            <DatePlay value={null} placeholder="Select a date" disabled />
          </DocsStateCard>
          <DocsStateCard label="Compact" align="stretch">
            <DatePlay compact />
          </DocsStateCard>
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}

function OtpDemo() {
  const [value, setValue] = useState(['', '', '', '', '', ''])
  return (
    <div className="w-full max-w-[420px]">
      <OtpBoxes value={value} onChange={setValue} />
    </div>
  )
}

const OTP_EMPTY = ['', '', '', '', '', '']
const OTP_PARTIAL = ['4', '8', '2', '', '', '']
const OTP_FULL = ['4', '8', '2', '9', '1', '0']
const OTP_NOOP = () => undefined

const OTP_VARIANT_LABEL: Record<OtpBoxesVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
  underline: 'Underline',
  pill: 'Pill',
}

const OTP_SIZE_LABEL: Record<OtpBoxesSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

function OtpStateCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <DocsStateCard label={label} align="stretch" size="lg" wide>
      {children}
    </DocsStateCard>
  )
}

function OtpStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Appearance">
        <DocsStack gap={4}>
          {OTP_BOXES_VARIANTS.map((variant) => (
            <OtpStateCard key={variant} label={OTP_VARIANT_LABEL[variant]}>
              <OtpBoxes variant={variant} value={OTP_PARTIAL} onChange={OTP_NOOP} />
            </OtpStateCard>
          ))}
        </DocsStack>
      </DocsStateGroup>

      <DocsStateGroup title="Size">
        <DocsStack gap={4}>
          {OTP_BOXES_SIZES.map((size) => (
            <OtpStateCard key={size} label={OTP_SIZE_LABEL[size]}>
              <OtpBoxes size={size} value={OTP_PARTIAL} onChange={OTP_NOOP} />
            </OtpStateCard>
          ))}
        </DocsStack>
      </DocsStateGroup>

      <DocsStateGroup title="Length">
        <DocsStack gap={4}>
          <OtpStateCard label="Four">
            <OtpBoxes length={4} value={['1', '9', '', '']} onChange={OTP_NOOP} />
          </OtpStateCard>
          <OtpStateCard label="Six">
            <OtpBoxes value={OTP_PARTIAL} onChange={OTP_NOOP} />
          </OtpStateCard>
          <OtpStateCard label="Eight, split">
            <OtpBoxes
              length={8}
              split={4}
              value={['1', '4', '2', '8', '', '', '', '']}
              onChange={OTP_NOOP}
            />
          </OtpStateCard>
        </DocsStack>
      </DocsStateGroup>

      <DocsStateGroup title="State">
        <DocsStack gap={4}>
          <OtpStateCard label="Empty">
            <OtpBoxes value={OTP_EMPTY} onChange={OTP_NOOP} />
          </OtpStateCard>
          <OtpStateCard label="Partial">
            <OtpBoxes value={OTP_PARTIAL} onChange={OTP_NOOP} />
          </OtpStateCard>
          <OtpStateCard label="Filled">
            <OtpBoxes value={OTP_FULL} onChange={OTP_NOOP} />
          </OtpStateCard>
          <OtpStateCard label="Hover">
            <OtpBoxes value={OTP_PARTIAL} onChange={OTP_NOOP} preview="hover" />
          </OtpStateCard>
          <OtpStateCard label="Focus">
            <OtpBoxes value={OTP_PARTIAL} onChange={OTP_NOOP} preview="focus" />
          </OtpStateCard>
          <OtpStateCard label="Valid">
            <OtpBoxes value={OTP_FULL} onChange={OTP_NOOP} valid />
          </OtpStateCard>
          <OtpStateCard label="Invalid">
            <OtpBoxes value={OTP_FULL} onChange={OTP_NOOP} invalid />
          </OtpStateCard>
          <OtpStateCard label="Shaking">
            <OtpBoxes value={OTP_EMPTY} onChange={OTP_NOOP} invalid shaking />
          </OtpStateCard>
          <OtpStateCard label="Masked">
            <OtpBoxes value={OTP_FULL} onChange={OTP_NOOP} masked />
          </OtpStateCard>
          <OtpStateCard label="Disabled">
            <OtpBoxes value={OTP_EMPTY} onChange={OTP_NOOP} disabled />
          </OtpStateCard>
          <OtpStateCard label="Disabled, filled">
            <OtpBoxes value={OTP_FULL} onChange={OTP_NOOP} disabled />
          </OtpStateCard>
        </DocsStack>
      </DocsStateGroup>
    </DocsStack>
  )
}

const FIELD_LABEL_SIZE_LABEL: Record<FieldLabelSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

const FIELD_LABEL_TONE_LABEL: Record<FieldLabelTone, string> = {
  default: 'Default',
  danger: 'Danger',
  success: 'Success',
  warning: 'Warning',
  disabled: 'Disabled',
}

const FIELD_HINT_TONE_LABEL: Record<Exclude<FieldHintTone, 'success' | 'danger'>, string> = {
  default: 'Default',
  ok: 'Success',
  error: 'Error',
  warning: 'Warning',
}

const FORM_FIELD_LAYOUT_LABEL: Record<FormFieldLayout, string> = {
  stacked: 'Stacked',
  inline: 'Inline',
}

function FieldLabelDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-6">
      <FormField htmlFor="demo-name" label="Display name" hint="Shown on your public profile.">
        <TextField
          id="demo-name"
          icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
          placeholder="Alex Rivera"
        />
      </FormField>
      <FormField htmlFor="demo-user" label="Username" optional>
        <TextField id="demo-user" icon={<DkAtSign {...FIELD_GLYPH} />} placeholder="alex" />
      </FormField>
      <FormField htmlFor="demo-email" label="Email" required hint="Use a work address.">
        <TextField
          id="demo-email"
          icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
          placeholder="alex@roboticela.com"
        />
      </FormField>
    </div>
  )
}

function FieldLabelStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Size">
        <DocsStateGrid columns={1}>
          {FIELD_LABEL_SIZES.map((size) => (
            <FieldState key={size} label={FIELD_LABEL_SIZE_LABEL[size]}>
              <FormField
                htmlFor={`docs-label-size-${size}`}
                label="Display name"
                size={size}
                hint="Shown on your public profile."
              >
                <TextField
                  id={`docs-label-size-${size}`}
                  size={size}
                  icon={
                    <DkPersonUserProfile
                      size={size === 'sm' ? 16 : 18}
                      strokeWidth={1.6}
                      absoluteStrokeWidth
                    />
                  }
                  placeholder="Alex Rivera"
                />
              </FormField>
            </FieldState>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Necessity">
        <DocsStateGrid columns={1}>
          <FieldState label="Default">
            <FormField htmlFor="docs-label-default" label="Display name">
              <TextField
                id="docs-label-default"
                icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
                placeholder="Alex Rivera"
              />
            </FormField>
          </FieldState>
          <FieldState label="Optional">
            <FormField htmlFor="docs-label-optional" label="Username" optional>
              <TextField id="docs-label-optional" icon={<DkAtSign {...FIELD_GLYPH} />} placeholder="alex" />
            </FormField>
          </FieldState>
          <FieldState label="Required">
            <FormField htmlFor="docs-label-required" label="Email" required>
              <TextField
                id="docs-label-required"
                icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
                placeholder="alex@roboticela.com"
              />
            </FormField>
          </FieldState>
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Tone">
        <DocsStateGrid columns={1}>
          {FIELD_LABEL_TONES.map((tone) => (
            <FieldState key={tone} label={FIELD_LABEL_TONE_LABEL[tone]}>
              <FormField
                htmlFor={`docs-label-tone-${tone}`}
                label="Display name"
                tone={tone}
                disabled={tone === 'disabled'}
              >
                <TextField
                  id={`docs-label-tone-${tone}`}
                  icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
                  placeholder="Alex Rivera"
                  defaultValue="Alex Rivera"
                  disabled={tone === 'disabled'}
                  invalid={tone === 'danger'}
                  valid={tone === 'success'}
                />
              </FormField>
            </FieldState>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Hint">
        <DocsStateGrid columns={1}>
          {FIELD_HINT_TONES.map((tone) => (
            <FieldState key={tone} label={FIELD_HINT_TONE_LABEL[tone]}>
              <FormField
                htmlFor={`docs-hint-${tone}`}
                label="Username"
                hint={
                  tone === 'ok'
                    ? 'Available'
                    : tone === 'error'
                      ? 'Already taken'
                      : tone === 'warning'
                        ? 'This name is in use on another team'
                        : 'Shown on your public profile.'
                }
                hintTone={tone}
                invalid={tone === 'error'}
                valid={tone === 'ok'}
              >
                <TextField
                  id={`docs-hint-${tone}`}
                  icon={<DkAtSign {...FIELD_GLYPH} />}
                  placeholder="alex"
                  defaultValue="alex"
                  invalid={tone === 'error'}
                  valid={tone === 'ok'}
                />
              </FormField>
            </FieldState>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Layout">
        <DocsStateGrid columns={1}>
          {FORM_FIELD_LAYOUTS.map((layout) => (
            <FieldState key={layout} label={FORM_FIELD_LAYOUT_LABEL[layout]}>
              <FormField
                htmlFor={`docs-label-layout-${layout}`}
                label="Display name"
                hint="Shown on your public profile."
                layout={layout}
              >
                <TextField
                  id={`docs-label-layout-${layout}`}
                  icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
                  placeholder="Alex Rivera"
                />
              </FormField>
            </FieldState>
          ))}
          <FieldState label="Row">
            <FieldRow>
              <FormField htmlFor="docs-label-row-city" label="City" optional>
                <TextField
                  id="docs-label-row-city"
                  icon={<DkFoldedMapTerritoryMapPinLocation {...FIELD_GLYPH} />}
                  placeholder="Karachi"
                />
              </FormField>
              <FormField htmlFor="docs-label-row-postal" label="Postal" required hint="Required" hintTone="error">
                <TextField
                  id="docs-label-row-postal"
                  icon={<DkFoldedMapTerritoryMapPinLocation {...FIELD_GLYPH} />}
                  placeholder="00000"
                  invalid
                />
              </FormField>
            </FieldRow>
          </FieldState>
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="State">
        <DocsStateGrid columns={1}>
          <FieldState label="Empty">
            <FormField htmlFor="docs-label-empty" label="Display name" hint="Shown on your public profile.">
              <TextField
                id="docs-label-empty"
                icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
                placeholder="Alex Rivera"
              />
            </FormField>
          </FieldState>
          <FieldState label="Filled">
            <FormField htmlFor="docs-label-filled" label="Display name">
              <TextField
                id="docs-label-filled"
                icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
                placeholder="Alex Rivera"
                defaultValue="Alex Rivera"
              />
            </FormField>
          </FieldState>
          <FieldState label="Invalid">
            <FormField
              htmlFor="docs-label-invalid"
              label="Email"
              required
              invalid
              hint="Enter a valid email."
              hintTone="error"
            >
              <TextField
                id="docs-label-invalid"
                icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
                placeholder="alex@roboticela.com"
                defaultValue="alex"
                invalid
              />
            </FormField>
          </FieldState>
          <FieldState label="Valid">
            <FormField
              htmlFor="docs-label-valid"
              label="Username"
              valid
              hint="Available"
              hintTone="ok"
            >
              <TextField
                id="docs-label-valid"
                icon={<DkAtSign {...FIELD_GLYPH} />}
                placeholder="alex"
                defaultValue="alex"
                valid
              />
            </FormField>
          </FieldState>
          <FieldState label="Warning">
            <FormField
              htmlFor="docs-label-warning"
              label="Username"
              tone="warning"
              hint="This name is in use on another team"
              hintTone="warning"
            >
              <TextField
                id="docs-label-warning"
                icon={<DkAtSign {...FIELD_GLYPH} />}
                placeholder="alex"
                defaultValue="alex"
              />
            </FormField>
          </FieldState>
          <FieldState label="Disabled">
            <FormField htmlFor="docs-label-disabled" label="Display name" disabled hint="Managed by your team.">
              <TextField
                id="docs-label-disabled"
                icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
                placeholder="Alex Rivera"
                defaultValue="Alex Rivera"
                disabled
              />
            </FormField>
          </FieldState>
          <FieldState label="Label only">
            <FieldLabel htmlFor="docs-label-only">Display name</FieldLabel>
          </FieldState>
          <FieldState label="Hidden label">
            <FormField>
              <FieldLabel htmlFor="docs-label-hidden" visuallyHidden>
                Search
              </FieldLabel>
              <TextField
                id="docs-label-hidden"
                variant="pill"
                icon={<DkMagnifyingGlassFind {...FIELD_GLYPH} />}
                placeholder="Search"
              />
            </FormField>
          </FieldState>
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}

function RecoveryDemo() {
  const [value, setValue] = useState('XJ4K-9M2P')
  return (
    <div className="w-full max-w-[400px]">
      <RecoveryInput value={value} onChange={setValue} />
    </div>
  )
}

const RECOVERY_SAMPLE = 'XK4M-92QP'
const RECOVERY_PARTIAL = 'XK4M'
const RECOVERY_KEY = 'H7QK-9M2P-L4TN-3W8D'
const RECOVERY_APPLE = 'H7QK-9M2P-L4TN-3W8D-P0AV-61CK-H9QE'
const RECOVERY_NOOP = () => undefined

const RECOVERY_VARIANT_LABEL: Record<RecoveryInputVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
  underline: 'Underline',
  pill: 'Pill',
}

const RECOVERY_SIZE_LABEL: Record<RecoveryInputSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

const RECOVERY_MODE_LABEL: Record<RecoveryInputMode, string> = {
  field: 'Field',
  groups: 'Groups',
}

function RecoveryStateCard({
  label,
  inert = false,
  children,
}: {
  label: string
  inert?: boolean
  children: ReactNode
}) {
  return (
    <DocsStateCard label={label} align="stretch" size="lg" wide inert={inert}>
      {children}
    </DocsStateCard>
  )
}

function RecoveryStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Appearance">
        <DocsStateGrid>
          {RECOVERY_INPUT_VARIANTS.map((variant) => (
            <RecoveryStateCard key={variant} label={RECOVERY_VARIANT_LABEL[variant]}>
              <RecoveryInput
                variant={variant}
                value={RECOVERY_SAMPLE}
                onChange={RECOVERY_NOOP}
                label={RECOVERY_VARIANT_LABEL[variant]}
              />
            </RecoveryStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Size">
        <DocsStateGrid columns={3}>
          {RECOVERY_INPUT_SIZES.map((size) => (
            <RecoveryStateCard key={size} label={RECOVERY_SIZE_LABEL[size]}>
              <RecoveryInput
                size={size}
                value={RECOVERY_SAMPLE}
                onChange={RECOVERY_NOOP}
                label={RECOVERY_SIZE_LABEL[size]}
              />
            </RecoveryStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Mode">
        <DocsStateGrid columns={2}>
          {RECOVERY_INPUT_MODES.map((mode) => (
            <RecoveryStateCard key={mode} label={RECOVERY_MODE_LABEL[mode]}>
              <RecoveryInput
                mode={mode}
                value={RECOVERY_SAMPLE}
                onChange={RECOVERY_NOOP}
                label={RECOVERY_MODE_LABEL[mode]}
              />
            </RecoveryStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Length">
        <DocsStack gap={4}>
          <RecoveryStateCard label="Eight, backup code">
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Sixteen, field">
            <RecoveryInput length={16} value={RECOVERY_KEY} onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Sixteen, groups">
            <RecoveryInput mode="groups" length={16} value={RECOVERY_KEY} onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Twenty-eight, recovery key">
            <RecoveryInput mode="groups" length={28} value={RECOVERY_APPLE} onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
        </DocsStack>
      </DocsStateGroup>

      <DocsStateGroup title="State">
        <DocsStateGrid>
          <RecoveryStateCard label="Empty">
            <RecoveryInput value="" onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Partial">
            <RecoveryInput value={RECOVERY_PARTIAL} onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Filled">
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Hover" inert>
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} preview="hover" />
          </RecoveryStateCard>
          <RecoveryStateCard label="Focus" inert>
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} preview="focus" />
          </RecoveryStateCard>
          <RecoveryStateCard label="Valid">
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} valid hint="Code accepted" />
          </RecoveryStateCard>
          <RecoveryStateCard label="Invalid">
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} invalid hint="Incorrect code, try again" />
          </RecoveryStateCard>
          <RecoveryStateCard label="Shaking">
            <RecoveryInput value="" onChange={RECOVERY_NOOP} invalid shaking hint="Incorrect code, try again" />
          </RecoveryStateCard>
          <RecoveryStateCard label="Masked">
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} masked />
          </RecoveryStateCard>
          <RecoveryStateCard label="Read only">
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} readOnly />
          </RecoveryStateCard>
          <RecoveryStateCard label="Disabled">
            <RecoveryInput value="" onChange={RECOVERY_NOOP} disabled />
          </RecoveryStateCard>
          <RecoveryStateCard label="Disabled, filled">
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} disabled />
          </RecoveryStateCard>
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Groups, state">
        <DocsStateGrid>
          <RecoveryStateCard label="Empty">
            <RecoveryInput mode="groups" value="" onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Partial">
            <RecoveryInput mode="groups" value={RECOVERY_PARTIAL} onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Hover" inert>
            <RecoveryInput mode="groups" value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} preview="hover" />
          </RecoveryStateCard>
          <RecoveryStateCard label="Focus" inert>
            <RecoveryInput mode="groups" value={RECOVERY_PARTIAL} onChange={RECOVERY_NOOP} preview="focus" />
          </RecoveryStateCard>
          <RecoveryStateCard label="Valid">
            <RecoveryInput mode="groups" value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} valid />
          </RecoveryStateCard>
          <RecoveryStateCard label="Invalid">
            <RecoveryInput mode="groups" value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} invalid />
          </RecoveryStateCard>
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Codes list">
        <DocsStateGrid columns={2}>
          <RecoveryStateCard label="Subtle">
            <RecoveryCodesList codes={['XK4M-92QP', 'L7TN-3W8D', 'P0AV-61CK', 'H9QE-44BM']} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Outline, copy">
            <RecoveryCodesList
              variant="outline"
              copyable
              codes={['XK4M-92QP', 'L7TN-3W8D', 'P0AV-61CK', 'H9QE-44BM']}
            />
          </RecoveryStateCard>
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
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

const ALERT_VARIANT_LABEL: Record<AlertVariant, string> = {
  subtle: 'Subtle',
  outline: 'Outline',
  solid: 'Solid',
  ghost: 'Ghost',
}

const ALERT_TONE_LABEL: Record<AlertTone, string> = {
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
  neutral: 'Neutral',
}

const ALERT_SIZE_LABEL: Record<AlertSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

const ALERT_COPY = {
  title: 'Verify your email',
  body: 'We sent a link to alex@roboticela.com.',
} as const

function AlertAction({
  tone = 'info',
  solid = false,
  children = 'Resend',
}: {
  tone?: AlertTone
  solid?: boolean
  children?: string
}) {
  const color =
    solid || tone === 'neutral'
      ? solid
        ? 'text-text-on-brand hover:text-text-on-brand'
        : 'text-text-primary'
      : tone === 'success'
        ? 'text-success'
        : tone === 'warning'
          ? 'text-warning'
          : tone === 'danger'
            ? 'text-danger'
            : 'text-brand-primary'

  return (
    <Button
      variant="ghost"
      size="sm"
      fullWidth={false}
      className={`h-auto px-0 hover:underline ${color}`}
    >
      {children}
    </Button>
  )
}

function AlertDismissPlay() {
  const [open, setOpen] = useState(true)
  if (!open) {
    return (
      <Button variant="ghost" size="sm" fullWidth={false} onClick={() => setOpen(true)}>
        Show alert
      </Button>
    )
  }
  return (
    <Alert title="Two-factor is off" onDismiss={() => setOpen(false)}>
      Ask teammates to finish setup before Friday.
    </Alert>
  )
}

function AlertDemo() {
  return (
    <div className="flex w-full max-w-[460px] flex-col gap-4">
      {ALERT_VARIANTS.map((variant) => (
        <Alert
          key={variant}
          variant={variant}
          title={`${ALERT_VARIANT_LABEL[variant]} alert`}
        >
          {ALERT_COPY.body}
        </Alert>
      ))}
    </div>
  )
}

function AlertStates() {
  return (
    <DocsStack gap={10}>
      <DocsStateGroup title="Appearance">
        <DocsStateGrid columns={2}>
          {ALERT_VARIANTS.map((variant) => (
            <DocsStateCard key={variant} label={ALERT_VARIANT_LABEL[variant]} align="stretch" wide>
              <Alert variant={variant} title={ALERT_COPY.title}>
                {ALERT_COPY.body}
              </Alert>
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Tone">
        <DocsStateGrid columns={2}>
          {ALERT_TONES.map((tone) => (
            <DocsStateCard key={tone} label={ALERT_TONE_LABEL[tone]} align="stretch" wide>
              <Alert
                tone={tone}
                title={
                  tone === 'success'
                    ? 'Backup complete'
                    : tone === 'warning'
                      ? 'Quota at 88%'
                      : tone === 'danger'
                        ? 'Payment failed'
                        : tone === 'neutral'
                          ? 'Maintenance tonight'
                          : ALERT_COPY.title
                }
              >
                {tone === 'success'
                  ? 'Your changes are live.'
                  : tone === 'warning'
                    ? 'Storage is almost full.'
                    : tone === 'danger'
                      ? 'Update the card on file.'
                      : tone === 'neutral'
                        ? 'The workspace will pause from 01:00 to 03:00 UTC.'
                        : ALERT_COPY.body}
              </Alert>
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="Size">
        <DocsStateGrid columns={2}>
          {ALERT_SIZES.map((size) => (
            <DocsStateCard key={size} label={ALERT_SIZE_LABEL[size]} align="stretch" wide>
              <Alert size={size} title={ALERT_COPY.title}>
                {ALERT_COPY.body}
              </Alert>
            </DocsStateCard>
          ))}
        </DocsStateGrid>
      </DocsStateGroup>

      <DocsStateGroup title="State">
        <DocsStateGrid columns={2}>
          <DocsStateCard label="Title and body" align="stretch" wide>
            <Alert title={ALERT_COPY.title}>{ALERT_COPY.body}</Alert>
          </DocsStateCard>
          <DocsStateCard label="Title only" align="stretch" wide>
            <Alert title="Backup complete" />
          </DocsStateCard>
          <DocsStateCard label="Body only" align="stretch" wide>
            <Alert>{ALERT_COPY.body}</Alert>
          </DocsStateCard>
          <DocsStateCard label="No icon" align="stretch" wide>
            <Alert icon={false} title={ALERT_COPY.title}>
              {ALERT_COPY.body}
            </Alert>
          </DocsStateCard>
          <DocsStateCard label="Dismiss" align="stretch" wide>
            <AlertDismissPlay />
          </DocsStateCard>
          <DocsStateCard label="Action" align="stretch" wide>
            <Alert title="Invite expired" action={<AlertAction />}>
              Send a new link to join this workspace.
            </Alert>
          </DocsStateCard>
          <DocsStateCard label="Outline, warning" align="stretch" wide>
            <Alert variant="outline" tone="warning" title="Quota at 88%">
              Storage is almost full.
            </Alert>
          </DocsStateCard>
          <DocsStateCard label="Solid, danger" align="stretch" wide>
            <Alert
              variant="solid"
              tone="danger"
              title="Payment failed"
              action={<AlertAction tone="danger" solid>Update card</AlertAction>}
              onDismiss={() => undefined}
            >
              Update the card on file.
            </Alert>
          </DocsStateCard>
          <DocsStateCard label="Ghost, success" align="stretch" wide>
            <Alert variant="ghost" tone="success" title="Saved">
              Your changes are live.
            </Alert>
          </DocsStateCard>
          <DocsStateCard label="Neutral, dismiss" align="stretch" wide>
            <Alert
              tone="neutral"
              title="Maintenance tonight"
              onDismiss={() => undefined}
            >
              The workspace will pause from 01:00 to 03:00 UTC.
            </Alert>
          </DocsStateCard>
        </DocsStateGrid>
      </DocsStateGroup>
    </DocsStack>
  )
}

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
    description: 'Collect a short answer such as a name, email, or search query. Use this when the value fits on one line.',
    ...textFieldGuide,
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
      p('disabled', 'boolean', 'false', 'Prevents entry. Explain why in nearby copy.'),
      p('autoComplete', 'string', 'undefined', 'Native autocomplete. Use email, username, name, and similar tokens.'),
      p("preview", "'hover' | 'focus'", 'undefined', 'Force a visual state in docs without focusing the input.'),
    ],
  },
  textarea: {
    title: 'Textarea',
    description: 'Collect a note, bio, or message. Use this when the person needs room to write more than one line.',
    ...textareaGuide,
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
      p('disabled', 'boolean', 'false', 'Prevents entry.'),
      p('maxLength', 'number', 'undefined', 'Native limit. Also shows a count when set.'),
      p('count', 'boolean', 'false', 'Show a character count even without maxLength.'),
      p('hint', 'ReactNode', 'undefined', 'Caption on the composer footer, opposite the count.'),
      p("resize", "'y' | 'none'", 'well/composer: none, else y', 'Whether the field can be stretched.'),
      p("preview", "'hover' | 'focus'", 'undefined', 'Force a visual state in docs without focusing the field.'),
    ],
  },
  'password-field': {
    title: 'Password Field',
    description: 'Collect a secret that stays hidden until the person chooses to show it. Use this on sign in and when creating an account.',
    ...passwordFieldGuide,
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
      p('autoComplete', 'string', "'current-password'", 'Use current-password on sign-in and new-password on create account.'),
      p("preview", "'hover' | 'focus'", 'undefined', 'Force a visual state in docs without focusing the field.'),
    ],
  },
  'password-reveal': {
    title: 'Password Reveal',
    description: 'Lets the person show or hide the characters in a password. Keep it inside the field, not as a separate button.',
    ...passwordRevealGuide,
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
      'Pick one option from a list. Use this when the choices are too many to show as radios and only one answer is allowed. Search the list when it is long. The menu matches the width of the field.',
    ...selectGuide,
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
      p('label', 'string', 'undefined', 'Visible caption above the field.'),
      p('ariaLabel', 'string', 'undefined', 'Accessible name when the visible label is omitted.'),
      p('invalid', 'boolean', 'false', 'Danger border and aria-invalid.'),
      p('valid', 'boolean', 'false', 'Success border. Ignored when invalid.'),
      p('compact', 'boolean', 'false', 'Smaller trigger for toolbars. The popup still matches the field width.'),
      p('disabled', 'boolean', 'false', 'Prevents opening the menu.'),
    ],
  },
  'country-select': {
    title: 'Country Select',
    description: 'Ask for a country. The menu is searchable and shows a flag. Pass the chosen country into region and city fields.',
    ...countrySelectGuide,
    Demo: CountryDemo,
    wide: true,
    code: `<CountrySelect value={iso} onChange={setIso} />
<CountrySelect variant="subtle" value={iso} onChange={setIso} />
<CountrySelect size="sm" value={iso} onChange={setIso} />
`,
    statesContent: <CountryStates />,
    props: [
      p('value', 'string | null', '—', 'ISO 3166-1 alpha-2 code.'),
      p('onChange', '(next: string | null) => void', '—', 'Called when the country changes. Clear state, county, and city in the same handler.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Field chrome. Matches Select.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height. Compact defaults to small.'),
      p('allowClear', 'boolean', 'true', 'Adds a Not set option that stores null.'),
      p('enabledIsos', 'string[]', 'undefined', 'When set, other countries stay in the list as Coming soon.'),
      p('compact', 'boolean', 'false', 'Smaller trigger and flags.'),
      p('disabled', 'boolean', 'false', 'Prevents opening the menu.'),
      p('label', 'string', "'Country'", 'Accessible name.'),
      p('placeholder', 'string', "'Select a country'", 'Shown when no country is selected.'),
    ],
  },
  'state-select': {
    title: 'State Select',
    description:
      'Ask for a state, province, or emirate after the country is known. The caption changes to match that country, for example State in the United States and Province in Pakistan.',
    ...stateSelectGuide,
    Demo: StateDemo,
    wide: true,
    code: `<CountrySelect value={country} onChange={setCountry} />
<StateSelect country={country} value={state} onChange={setState} />
`,
    statesContent: <StateStates />,
    props: [
      p('value', 'string | null', '—', 'ISO 3166-2 code, such as US-CA or PK-SD.'),
      p('country', 'string | null', 'null', 'ISO country. When set, only that country’s regions are listed.'),
      p('onChange', '(next: string | null) => void', '—', 'Called when the region changes. Clear county and city in the same handler.'),
      p('items', 'Subdivision[]', 'catalog', 'Replace the starter catalog with your own list.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Field chrome. Matches Select.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height.'),
      p('allowClear', 'boolean', 'true', 'Adds a Not set option that stores null.'),
      p('disabled', 'boolean', 'false', 'Prevents opening the menu.'),
      p('label', 'string', 'noun for the country', 'Accessible name. Defaults to State, Province, Emirate, and so on.'),
    ],
  },
  'county-select': {
    title: 'County Select',
    description:
      'Ask for a county or district after a region is chosen. Hide this field in countries that do not use this layer.',
    ...countySelectGuide,
    Demo: CountyDemo,
    wide: true,
    code: `<StateSelect country={country} value={state} onChange={setState} />
<CountySelect state={state} value={county} onChange={setCounty} />
`,
    statesContent: <CountyStates />,
    props: [
      p('value', 'string | null', '—', 'County id, such as US-CA:los-angeles.'),
      p('state', 'string | null', 'null', 'ISO 3166-2 region. When set, only that region’s counties are listed.'),
      p('onChange', '(next: string | null) => void', '—', 'Called when the county changes. Clear city in the same handler.'),
      p('items', 'County[]', 'catalog', 'Replace the starter catalog with your own list.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Field chrome. Matches Select.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height.'),
      p('allowClear', 'boolean', 'true', 'Adds a Not set option that stores null.'),
      p('disabled', 'boolean', 'false', 'Prevents opening the menu.'),
      p('label', 'string', "'County'", 'Accessible name.'),
    ],
  },
  'city-select': {
    title: 'City Select',
    description:
      'Ask for a city. Narrow the list with the country, region, or county already chosen. Pass your own list when the product needs a full directory.',
    ...citySelectGuide,
    Demo: CityDemo,
    wide: true,
    code: `<CountrySelect value={country} onChange={setCountry} />
<StateSelect country={country} value={state} onChange={setState} />
<CountySelect state={state} value={county} onChange={setCounty} />
<CitySelect country={country} state={state} county={county} value={city} onChange={setCity} />
`,
    statesContent: <CityStates />,
    props: [
      p('value', 'string | null', '—', 'City id, such as PK-SD:karachi.'),
      p('country', 'string | null', 'null', 'ISO country. Used when state is not set.'),
      p('state', 'string | null', 'null', 'ISO 3166-2 region. Takes priority over country.'),
      p('county', 'string | null', 'null', 'County id. Takes priority over state.'),
      p('onChange', '(next: string | null) => void', '—', 'Called when the city changes.'),
      p('items', 'City[]', 'catalog', 'Replace the starter catalog with your own list.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Field chrome. Matches Select.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height.'),
      p('allowClear', 'boolean', 'true', 'Adds a Not set option that stores null.'),
      p('disabled', 'boolean', 'false', 'Prevents opening the menu.'),
      p('label', 'string', "'City'", 'Accessible name.'),
    ],
  },
  'language-select': {
    title: 'Language Select',
    description: 'Ask for a display language. Store a language id, not the translated name.',
    ...languageSelectGuide,
    Demo: LanguageDemo,
    wide: true,
    code: `<LanguageSelect value={id} onChange={setId} />
<LanguageSelect variant="subtle" value={id} onChange={setId} />
`,
    statesContent: <LanguageStates />,
    props: [
      p('value', 'string | null', '—', 'BCP 47 language id.'),
      p('onChange', '(next: string) => void', '—', 'Called when the language changes.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Field chrome. Matches Select.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height.'),
      p('enabledIds', 'string[]', 'shipped locales', 'When set, other languages stay in the list as Coming soon.'),
      p('compact', 'boolean', 'false', 'Smaller trigger.'),
      p('disabled', 'boolean', 'false', 'Prevents opening the menu.'),
      p('label', 'string', "'Language'", 'Accessible name.'),
    ],
  },
  'phone-input': {
    title: 'Phone Input',
    description: 'Collect a phone number with a country code. The number formats as the person types. Store the international form with a plus and digits.',
    ...phoneInputGuide,
    Demo: PhoneDemo,
    wide: true,
    code: `<PhoneInput value={e164} onChange={setE164} />
`,
    statesContent: <PhoneStates />,
    props: [
      p('value', 'string', '—', 'E.164 number, such as +14155552671.'),
      p('onChange', '(next: string) => void', '—', 'Called as the number is edited. Emits + and digits.'),
      p('disabled', 'boolean', 'false', 'Prevents changing the country or the number.'),
      p('label', 'string', "'Phone number'", 'Accessible name on the number field. The Select is named Country code.'),
      p('placeholder', 'string', "'Phone number'", 'Shown in the national number field when empty.'),
    ],
  },
  checkbox: {
    title: 'Checkbox',
    description: 'Let the person turn a choice on or off before submitting. Several can be on at once. Use a switch if the change should apply immediately.',
    ...checkboxGuide,
    Demo: CheckboxDemo,
    wide: true,
    code: `<Checkbox variant="outline" label="Outline" checked={on} onChange={toggle} />
<Checkbox variant="subtle" label="Subtle" checked={on} onChange={toggle} />
<Checkbox variant="ghost" label="Ghost" checked={on} onChange={toggle} />

<Checkbox
  label="All email"
  checked={selected === 2}
  indeterminate={selected === 1}
  onChange={toggleAll}
/>
<Checkbox label="Weekly digest" checked={digest} onChange={setDigest} />

<Checkbox tone="danger" label="I understand this will delete the project" checked={ack} onChange={setAck} />
<Checkbox label="Required" invalid />
`,
    statesContent: <CheckboxStates />,
    props: [
      p('label', 'ReactNode', 'undefined', 'Visible label. Pass aria-label when the words sit elsewhere.'),
      p('checked', 'boolean', 'uncontrolled', 'On when controlled. Omit to let the input own the value.'),
      p('indeterminate', 'boolean', 'false', 'Mixed parent for a partly selected set. Shows a minus.'),
      p('invalid', 'boolean', 'false', 'Error after submit. Sets aria-invalid.'),
      p("variant", "'outline' | 'subtle' | 'ghost'", "'outline'", 'Unchecked chrome. Outline for forms, subtle on a card, ghost in a list.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Box size. The row stays at least 44px tall.'),
      p("tone", "'brand' | 'danger'", "'brand'", 'Fill when on. Danger is for a destructive acknowledgement only.'),
      p("preview", "'hover' | 'focus' | 'active'", 'undefined', 'Forced visual for docs tiles.'),
      p('disabled', 'boolean', 'false', 'Prevents press.'),
    ],
  },
  radio: {
    title: 'Radio',
    description: 'Pick exactly one option from a small set that stays visible. Use a select when the list is long.',
    ...radioGuide,
    Demo: RadioDemo,
    wide: true,
    code: `<RadioGroup label="Payment">
  <Radio name="pay" label="Card" checked={value === 'card'} onChange={selectCard} />
  <Radio name="pay" label="Bank transfer" checked={value === 'bank'} onChange={selectBank} />
  <Radio name="pay" label="Invoice" checked={value === 'invoice'} onChange={selectInvoice} />
</RadioGroup>

<Radio variant="subtle" name="chrome" label="Subtle" />
<Radio tone="danger" name="severity" label="Delete the project" />
<Radio label="Required" invalid />
`,
    statesContent: <RadioStates />,
    props: [
      p('label', 'ReactNode', 'undefined', 'Visible label. Pass aria-label when the words sit elsewhere.'),
      p('checked', 'boolean', 'uncontrolled', 'Selected when controlled. Omit to let the group own the value.'),
      p('invalid', 'boolean', 'false', 'Error after submit. Sets aria-invalid.'),
      p("variant", "'outline' | 'subtle' | 'ghost'", "'outline'", 'Unchecked chrome. Outline for forms, subtle on a card, ghost in a list.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Circle size. The row stays at least 44px tall.'),
      p("tone", "'brand' | 'danger'", "'brand'", 'Ring and disc when selected. Danger is for a destructive choice only.'),
      p("preview", "'hover' | 'focus' | 'active'", 'undefined', 'Forced visual for docs tiles.'),
      p('name', 'string', 'undefined', 'Shared name for every option in the set.'),
      p('disabled', 'boolean', 'false', 'Prevents press.'),
    ],
  },
  slider: {
    title: 'Slider',
    description: 'Pick a number by dragging along a track. Attach a Number Field when the exact figure must be typed.',
    ...sliderGuide,
    Demo: SliderDemo,
    wide: true,
    code: `<Slider variant="fill" label="Volume" value={value} onValueChange={setValue} field="end" unit="percent" />
<Slider variant="subtle" label="Subtle" value={value} onValueChange={setValue} field="end" unit="percent" />
<Slider variant="outline" label="Outline" value={value} onValueChange={setValue} field="end" unit="percent" />
<Slider variant="ghost" label="Ghost" value={value} onValueChange={setValue} field="end" unit="percent" />
<Slider variant="pill" label="Pill" value={value} onValueChange={setValue} field="end" unit="percent" />

<Slider field="start" unit="percent" value={value} onValueChange={setValue} />
<Slider field="end" unit="percent" fieldStepper="split" fieldAlign="center" value={value} onValueChange={setValue} />
<Slider field="end" unit="percent" fieldVariant="underline" fieldWidth="fill" value={value} onValueChange={setValue} />

<RangeSlider
  label="Price"
  field="both"
  unit="currency"
  value={range}
  onValueChange={setRange}
/>
`,
    statesContent: <SliderStates />,
    props: [
      p("mode", "'single' | 'range'", "'single'", 'One thumb, or two thumbs that cannot cross. RangeSlider is the range alias.'),
      p('value', 'number | [number, number]', '—', 'Current value. A pair in range mode.'),
      p('onValueChange', '(value: number | [number, number]) => void', '—', 'Called as a thumb moves.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Track chrome. Fill is the default. Pill is a thicker track with a raised thumb.'),
      p("field", "boolean | 'end' | 'start' | 'both'", 'false', 'Attach a Number Field. End is after the track. Start is before. Both is for a range.'),
      p("unit", "'none' | 'percent' | 'currency' | 'degree' | 'px'", "'none'", 'Sign on the Number Field. Override with prefix or suffix.'),
      p('prefix', 'string', 'undefined', 'Leading sign on the Number Field, such as €. Overrides the unit prefix.'),
      p('suffix', 'string', 'undefined', 'Trailing sign on the Number Field, such as kg. Overrides the unit suffix.'),
      p("fieldVariant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", 'Matches the track', 'Number Field chrome. Fill maps to outline.'),
      p("fieldSize", "'sm' | 'md' | 'lg'", 'Matches size', 'Number Field height. Defaults to the slider size.'),
      p("fieldStepper", "'stack' | 'split'", "'stack'", 'Stacked chevrons on the Number Field, or minus and plus on both sides.'),
      p("fieldAlign", "'start' | 'center' | 'end'", 'start, center when split', 'Alignment of the digits and unit in the Number Field.'),
      p("fieldWidth", "'fit' | 'fill'", "'fit'", 'Fit grows with the digits until the cap. Fill uses the cap width.'),
      p('fieldCompact', 'boolean', 'undefined', 'Alias. true is fit. false is fill.'),
      p('fieldReadOnly', 'boolean', 'false', 'Shows the value in the Number Field. Arrows do not run. The track still moves.'),
      p('fieldPlaceholder', 'string', "'0'", 'Shown in the Number Field when the value is empty.'),
      p('fieldName', 'string', 'undefined', 'Name on the Number Field. Range appends Start and End.'),
      p('fieldId', 'string', 'undefined', 'Id on the Number Field. Range appends -start and -end.'),
      p('fieldClassName', 'string', 'undefined', 'Class on the Number Field.'),
      p("fieldPreview", "'hover' | 'focus'", 'undefined', 'Forced visual on the Number Field. Falls back to preview.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Track and thumb size. The hit target stays at least 28px tall.'),
      p("tone", "'default' | 'onDark'", "'default'", 'On dark is for a black surface, such as the avatar editor.'),
      p('min', 'number', '0', 'Start of the track.'),
      p('max', 'number', '100', 'End of the track.'),
      p('step', 'number', '1', 'Snap increment.'),
      p('label', 'ReactNode', 'undefined', 'Visible caption. Pass aria-label when the words sit elsewhere.'),
      p('showValue', 'boolean', 'false', 'Shows the current value opposite the label.'),
      p('showEnds', 'boolean', 'false', 'Shows min and max under the track.'),
      p('marks', 'boolean | number[]', 'undefined', 'Tick marks. true uses step when there are twelve or fewer, otherwise min and max.'),
      p('formatValue', '(value: number) => string', 'String', 'Formats the readout, end labels, and aria-valuetext.'),
      p('invalid', 'boolean', 'false', 'Error after submit. Sets aria-invalid and a danger fill.'),
      p('valid', 'boolean', 'false', 'Success fill. Ignored when invalid.'),
      p('disabled', 'boolean', 'false', 'Prevents press and keyboard.'),
      p("preview", "'hover' | 'focus' | 'active'", 'undefined', 'Forced visual for docs tiles.'),
    ],
  },
  'number-field': {
    title: 'Number Field',
    description: 'Type or step a number. A unit such as percent, currency, or pixels sits next to the digits.',
    ...numberFieldGuide,
    Demo: NumberFieldDemo,
    wide: true,
    code: `<NumberField unit="percent" value={value} onValueChange={setValue} min={0} max={100} />
<NumberField variant="subtle" unit="percent" value={value} onValueChange={setValue} />
<NumberField variant="ghost" unit="percent" value={value} onValueChange={setValue} />
<NumberField variant="underline" unit="percent" value={value} onValueChange={setValue} />
<NumberField variant="pill" unit="percent" value={value} onValueChange={setValue} />

<NumberField unit="currency" value={price} onValueChange={setPrice} min={0} step={0.5} />
<NumberField stepper="split" value={qty} onValueChange={setQty} min={1} max={99} />
<NumberField width="fill" unit="percent" value={value} onValueChange={setValue} />
`,
    statesContent: <NumberFieldStates />,
    props: [
      p('value', 'number | null', 'uncontrolled', 'Current value. null is an empty field.'),
      p('onValueChange', '(value: number | null) => void', 'undefined', 'Called as the value is typed or stepped.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Chrome. Matches Text Field.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height. Medium is 44px, matching other fields.'),
      p("unit", "'none' | 'percent' | 'currency' | 'degree' | 'px'", "'none'", 'Sign beside the digits. Override with prefix or suffix.'),
      p('prefix', 'string', 'undefined', 'Leading sign, such as €. Overrides the unit prefix.'),
      p('suffix', 'string', 'undefined', 'Trailing sign, such as kg. Overrides the unit suffix.'),
      p("stepper", "'stack' | 'split'", "'stack'", 'Stacked chevrons on the right, or minus and plus on both sides.'),
      p("align", "'start' | 'center' | 'end'", "start, center when split", 'Alignment of the digits and unit.'),
      p("width", "'fit' | 'fill'", "'fit'", 'Fit grows with the digits until the variant cap, then clips. Fill spans the row.'),
      p('compact', 'boolean', 'undefined', 'Alias. true is fit. false is fill.'),
      p('min', 'number', 'undefined', 'Lower bound. Disables decrease at the limit.'),
      p('max', 'number', 'undefined', 'Upper bound. Disables increase at the limit.'),
      p('step', 'number', '1', 'Arrow and key increment. Typing snaps to step on blur.'),
      p('invalid', 'boolean', 'false', 'Danger border and aria-invalid.'),
      p('valid', 'boolean', 'false', 'Success border. Ignored when invalid.'),
      p('disabled', 'boolean', 'false', 'Prevents typing and stepping.'),
      p('readOnly', 'boolean', 'false', 'Shows the value. Arrows do not run.'),
      p("preview", "'hover' | 'focus'", 'undefined', 'Forced visual for docs tiles.'),
    ],
  },
  'date-picker': {
    title: 'Date Picker',
    description:
      'Pick a calendar date, or a start and an end. The field and the calendar match the other menus in the kit.',
    ...datePickerGuide,
    Demo: DateDemo,
    wide: true,
    code: `<DatePicker value={value} onChange={setValue} />
<DatePicker variant="subtle" value={value} onChange={setValue} />
<DatePicker variant="ghost" value={value} onChange={setValue} />
<DatePicker variant="underline" value={value} onChange={setValue} />
<DatePicker variant="pill" value={value} onChange={setValue} />

<DatePicker size="sm" value={value} onChange={setValue} />
<DatePicker invalid value={value} onChange={setValue} />
<DatePicker mode="range" rangeValue={range} onRangeChange={setRange} />
`,
    statesContent: <DatePickerStates />,
    props: [
      p('value', 'string | null', '—', 'ISO date for single mode.'),
      p('onChange', '(next: string | null) => void', '—', 'Called when a day is chosen in single mode.'),
      p("mode", "'single' | 'range'", "'single'", 'One day, or a start and end.'),
      p('rangeValue', '{ start: string | null; end: string | null }', '—', 'ISO dates for range mode.'),
      p('onRangeChange', '(next: DateRange) => void', '—', 'Called when Done commits a range.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Field chrome. Matches Select and Text Field.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height. Compact defaults to small.'),
      p('placeholder', 'string', "'Select a date'", 'Shown when no date is selected.'),
      p('invalid', 'boolean', 'false', 'Danger border.'),
      p('valid', 'boolean', 'false', 'Success border. Ignored when invalid.'),
      p('compact', 'boolean', 'false', 'Smaller trigger for toolbars.'),
      p('min', 'string', "'1900-01-01'", 'Earliest ISO date that can be chosen.'),
      p('max', 'string', 'today', 'Latest ISO date that can be chosen.'),
      p('disabled', 'boolean', 'false', 'Prevents opening the calendar.'),
      p("preview", "'hover' | 'open'", 'undefined', 'Forced visual for docs tiles.'),
    ],
  },
  'otp-boxes': {
    title: 'OTP Boxes',
    description: 'Enter a verification code one digit at a time. Paste fills the row. Use this after sign in or to confirm a device.',
    ...otpGuide,
    Demo: OtpDemo,
    wide: true,
    code: `<OtpBoxes value={digits} onChange={setDigits} onComplete={verify} />
<OtpBoxes variant="underline" value={digits} onChange={setDigits} />
<OtpBoxes variant="pill" size="sm" value={digits} onChange={setDigits} />
<OtpBoxes length={8} split={4} value={digits} onChange={setDigits} />
<OtpBoxes value={digits} onChange={setDigits} invalid shaking />
<OtpBoxes value={digits} onChange={setDigits} valid />
<OtpBoxes value={digits} onChange={setDigits} masked />
`,
    statesContent: <OtpStates />,
    props: [
      p('value', 'string[]', '—', 'One character per box.'),
      p('onChange', '(next: string[]) => void', '—', 'Called when a digit changes.'),
      p('length', 'number', '6', 'Number of boxes.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Box chrome. Outline is the auth default. Underline is the quieter layout.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Box size. Small stays 44px tall.'),
      p('split', 'number', 'undefined', 'Extra gap after this many boxes, such as 3 or 4.'),
      p('valid', 'boolean', 'false', 'Success after a correct code.'),
      p('invalid', 'boolean', 'false', 'Error after a rejected code. Alias: error.'),
      p('error', 'boolean', 'false', 'Alias for invalid.'),
      p('shaking', 'boolean', 'false', 'Shake the row when the code is rejected.'),
      p('masked', 'boolean', 'false', 'Hide digits as discs.'),
      p("preview", "'hover' | 'focus'", 'undefined', 'Forced visual for docs tiles.'),
      p('disabled', 'boolean', 'false', 'Prevents entry.'),
      p('onComplete', '(code: string) => void', 'undefined', 'Called when every box is filled.'),
    ],
  },
  'recovery-input': {
    title: 'Recovery Input',
    description:
      'Enter a backup code or account recovery key. Letters and numbers group themselves as the person types.',
    ...recoveryGuide,
    Demo: RecoveryDemo,
    wide: true,
    code: `<RecoveryInput value={code} onChange={setCode} />
<RecoveryInput variant="underline" value={code} onChange={setCode} />
<RecoveryInput variant="pill" size="sm" value={code} onChange={setCode} />
<RecoveryInput mode="groups" value={code} onChange={setCode} />
<RecoveryInput length={16} mode="groups" value={code} onChange={setCode} />
<RecoveryInput value={code} onChange={setCode} invalid shaking />
<RecoveryInput value={code} onChange={setCode} valid />
<RecoveryCodesList copyable codes={codes} />
`,
    statesContent: <RecoveryStates />,
    props: [
      p('value', 'string', '—', 'The recovery code. Hyphens are optional; they are inserted for you.'),
      p('onChange', '(next: string) => void', '—', 'Called with the formatted code.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Chrome. Outline is the auth default. Underline is the quieter layout.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height. Small stays 44px tall.'),
      p("mode", "'field' | 'groups'", "'field'", 'One formatted line, or one box per group.'),
      p('length', 'number', '8', 'Character count before grouping. Eight is a backup code. Twenty-eight is an Apple-style key.'),
      p('groupSize', 'number', '4', 'Characters per group.'),
      p('valid', 'boolean', 'false', 'Success after a correct code.'),
      p('invalid', 'boolean', 'false', 'Error after a rejected code. Alias: error.'),
      p('error', 'boolean', 'false', 'Alias for invalid.'),
      p('shaking', 'boolean', 'false', 'Shake when the code is rejected.'),
      p('masked', 'boolean', 'false', 'Hide characters as discs.'),
      p('readOnly', 'boolean', 'false', 'Show a code without allowing edits.'),
      p("preview", "'hover' | 'focus'", 'undefined', 'Forced visual for docs tiles.'),
      p('disabled', 'boolean', 'false', 'Prevents entry.'),
      p('label', 'ReactNode', "'Recovery code'", 'Caption above the field.'),
      p('hint', 'ReactNode', 'undefined', 'Caption under the field. Uses the invalid or valid tone when set.'),
      p('placeholder', 'string', 'XXXX-XXXX', 'Shown when empty. Defaults to grouped Xs for the length.'),
      p('onComplete', '(code: string) => void', 'undefined', 'Called when every character is filled.'),
      p('codes', 'string[]', '—', 'On RecoveryCodesList, the codes to display.'),
      p("RecoveryCodesList variant", "'outline' | 'subtle' | 'ghost'", "'subtle'", 'Cell chrome on the list.'),
      p('copyable', 'boolean', 'false', 'Adds a copy control under RecoveryCodesList.'),
    ],
  },
  'field-label': {
    title: 'Field Label',
    description:
      'Name a field and place help or an error under it. A placeholder is not a substitute for this name.',
    ...fieldLabelGuide,
    Demo: FieldLabelDemo,
    wide: true,
    code: `<FormField htmlFor="name" label="Display name" hint="Shown on your public profile.">
  <TextField id="name" icon={<DkPersonUserProfile />} placeholder="Alex Rivera" />
</FormField>
<FormField htmlFor="user" label="Username" optional>
  <TextField id="user" icon={<DkAtSign />} placeholder="alex" />
</FormField>
<FormField htmlFor="email" label="Email" required hint="Use a work address.">
  <TextField id="email" icon={<DkEnvelopeMessageMail />} />
</FormField>
<FormField htmlFor="user" label="Username" hint="Available" hintTone="ok" valid>
  <TextField id="user" valid />
</FormField>
<FormField htmlFor="email" label="Email" required invalid hint="Enter a valid email." hintTone="error">
  <TextField id="email" invalid />
</FormField>
<FormField htmlFor="name" label="Display name" layout="inline">
  <TextField id="name" />
</FormField>
`,
    statesContent: <FieldLabelStates />,
    props: [
      p('children', 'ReactNode', '—', 'Label text. On FormField this is the control.'),
      p('htmlFor', 'string', 'undefined', 'Associates the label with a control id.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Type size. Match the field: small is 15px, medium and large follow the 17px and 19px labels.'),
      p("tone", "'default' | 'danger' | 'success' | 'warning' | 'disabled'", "'default'", 'Label color. Disabled, invalid, and valid override this.'),
      p('optional', 'boolean', 'false', 'Adds an Optional suffix. Wins over required.'),
      p('required', 'boolean', 'false', 'Adds a danger asterisk. Mark the control required as well.'),
      p('invalid', 'boolean', 'false', 'Danger label. Pair with hintTone error and an invalid field.'),
      p('valid', 'boolean', 'false', 'Success label. Ignored when invalid or disabled.'),
      p('disabled', 'boolean', 'false', 'Disabled label color. Pair with a disabled control.'),
      p('visuallyHidden', 'boolean', 'false', 'Keeps the name for assistive tech when the layout has no caption.'),
      p('hint', 'ReactNode', 'undefined', 'FormField only. Caption under the control.'),
      p("hintTone", "'default' | 'ok' | 'error' | 'warning'", "'default'", 'FormField / FieldHint color. success and danger are aliases for ok and error.'),
      p("layout", "'stacked' | 'inline'", "'stacked'", 'FormField only. Inline sits the label beside the field from 735px up.'),
    ],
  },
  alert: {
    title: 'Alert',
    description:
      'An inline status message. Subtle, outline, solid, and ghost, with info, success, warning, danger, and a quiet neutral note.',
    ...alertGuide,
    Demo: AlertDemo,
    wide: true,
    code: `<Alert title="Verify your email">We sent a link to alex@roboticela.com.</Alert>
<Alert variant="outline" tone="warning" title="Quota at 88%">Storage is almost full.</Alert>
<Alert variant="solid" tone="danger" title="Payment failed">Update the card on file.</Alert>
<Alert variant="ghost" tone="success" title="Saved">Your changes are live.</Alert>
<Alert tone="neutral" title="Maintenance tonight" onDismiss={hide}>The workspace will pause.</Alert>
<Alert title="Invite expired" action={<Button variant="ghost">Resend</Button>}>Send a new link.</Alert>
`,
    statesContent: <AlertStates />,
    props: [
      p("variant", "'subtle' | 'outline' | 'solid' | 'ghost'", "'subtle'", 'Chrome. Subtle is the default on a page. Outline on a card. Ghost in a list. Solid when the message must not be missed.'),
      p("tone", "'info' | 'success' | 'warning' | 'danger' | 'neutral'", "'info'", 'Meaning and color. Neutral has no semantic color.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Padding, type, and icon size.'),
      p('title', 'ReactNode', 'undefined', 'Headline. Omit for a body-only note.'),
      p('children', 'ReactNode', 'undefined', 'Supporting line under the title.'),
      p('icon', 'ReactNode | false', 'tone icon', 'Leading icon. Pass false to hide it.'),
      p('action', 'ReactNode', 'undefined', 'A Button under the body, such as Resend or Try again.'),
      p('onDismiss', '() => void', 'undefined', 'Shows a Dismiss icon button.'),
    ],
  },
  progress: {
    title: 'Progress',
    description: 'Show how far a task has gone. Use this for uploads, quotas, and installs. The bar fills from zero to complete.',
    ...progressGuide,
    Demo: ProgressDemo,
    wide: true,
    code: `<Progress value={64} label="Uploading" />
<Progress variant="subtle" value={64} label="Uploading" />
<Progress variant="outline" value={64} label="Uploading" />
<Progress variant="ghost" value={64} label="Uploading" />
<Progress variant="pill" value={64} label="Storage" />
<Progress tone="success" value={100} label="Done" />
<Progress indeterminate label="Preparing" />
<Progress variant="subtle" indeterminate label="Preparing" />
<Progress variant="outline" indeterminate label="Preparing" />
<Progress variant="ghost" indeterminate label="Preparing" />
<Progress variant="pill" indeterminate label="Preparing" />
`,
    statesContent: <ProgressStates />,
    props: [
      p('value', 'number', '0', 'How far the task has gone, from 0 to 100. Ignored when indeterminate.'),
      p('label', 'string', 'undefined', 'Caption above the bar. Also the accessible name.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Track chrome. Fill is the default. Pill is the thicker bar.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Track height. Small is 4px, matching a system progress view.'),
      p("tone", "'brand' | 'success' | 'warning' | 'danger'", "'brand'", 'Fill color. Success when the work is done. Danger when it failed.'),
      p('indeterminate', 'boolean', 'false', 'Unknown amount. The bar travels until you know the value.'),
      p('onDark', 'boolean', 'false', 'Track and type for a black surface.'),
      p('showValue', 'boolean', 'true when labeled', 'Show the percent next to the label.'),
      p('formatValue', '(value: number) => string', 'rounded percent', 'How the percent is written.'),
      p('disabled', 'boolean', 'false', 'Dims the bar. The bar is never operable.'),
    ],
  },
  skeleton: {
    title: 'Skeleton',
    description:
      'A placeholder while content loads. Subtle, outline, ghost, and pill, as a line, heading, circle, rect, or square.',
    ...skeletonGuide,
    Demo: SkeletonDemo,
    wide: true,
    code: `<Skeleton />
<Skeleton variant="outline" lines={3} />
<Skeleton variant="ghost" lines={3} />
<Skeleton variant="pill" className="h-11 w-[140px]" />
<Skeleton shape="circle" />
<Skeleton shape="heading" />
<Skeleton shape="rect" />
<Skeleton lines={3} label="Loading article" />
<Skeleton motion="pulse" lines={3} />
<Skeleton motion="none" lines={3} />
`,
    statesContent: <SkeletonStates />,
    props: [
      p("variant", "'subtle' | 'outline' | 'ghost' | 'pill'", "'subtle'", 'Chrome. Subtle is the default fill. Outline is a wireframe. Ghost is fainter. Pill is a button or badge.'),
      p("shape", "'line' | 'heading' | 'circle' | 'rect' | 'square'", "'line'", 'What the placeholder stands in for. Circle matches Avatar. Rect matches a card image.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Height for a line or heading. Diameter for a circle. Matches Avatar at circle size.'),
      p("motion", "'shimmer' | 'pulse' | 'none'", "'shimmer'", 'Shimmer is the default sweep. Pulse is an opacity breath. None is static.'),
      p('lines', 'number', '1', 'Stacked text lines. Last line is shorter. Ignored when shape is not line.'),
      p('width', 'string | number', 'undefined', 'Override width on a single bone.'),
      p('label', 'string', 'undefined', 'Accessible name. Sets role status and aria-busy, such as Loading profile.'),
    ],
  },
  'empty-state': {
    title: 'Empty State',
    description: 'Show a calm view when a list has nothing to show. Use this for first use, no results, and a blank canvas after an error.',
    ...emptyStateGuide,
    Demo: EmptyStateDemo,
    wide: true,
    code: `<EmptyState
  icon={<InboxIcon />}
  title="No projects"
  body="Create a project to get started."
  action={<Button>New project</Button>}
/>
<EmptyState variant="subtle" title="No messages" body="Mentions will show up here." />
<EmptyState variant="outline" title="No messages" body="Mentions will show up here." />
<EmptyState variant="ghost" title="No messages" body="Mentions will show up here." />
<EmptyState variant="pill" title="No results" body="Try a different search." />
<EmptyState tone="danger" title="Could not load" body="Check the connection, then try again." />
`,
    statesContent: <EmptyStateStates />,
    props: [
      p('title', 'string', 'required', 'Headline. Also the accessible name of the region.'),
      p('body', 'ReactNode', 'undefined', 'One supporting line under the title.'),
      p('icon', 'ReactNode', 'undefined', 'A kit icon. Size follows the empty size.'),
      p('action', 'ReactNode', 'undefined', 'Primary button. Keep the label a short verb.'),
      p('secondary', 'ReactNode', 'undefined', 'A quieter second action under the primary.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Chrome. Fill is the page. Subtle, outline, and pill sit in a card.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Padding, icon, and type. Small is for a table slot.'),
      p("tone", "'default' | 'success' | 'warning' | 'danger'", "'default'", 'Icon color. Default is tertiary gray. Danger is a failure.'),
      p("align", "'center' | 'start'", "'center'", 'Stack alignment. Start is for a table or sidebar slot.'),
      p('onDark', 'boolean', 'false', 'Type and chrome for a black surface.'),
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
