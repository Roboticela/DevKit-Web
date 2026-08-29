'use client'

import { useState, type ComponentType, type ReactNode } from 'react'
import {
  DkClipboardCopyDuplicate,
  DkFavoriteHeartLove,
  DkMessageInboxTray,
  DkAppDashboardLayoutTiles,
  DkPadlockSecureClosed,
  DkEnvelopeMessageMail,
  DkAddPlusCreate,
  DkRefreshClockwiseRotate,
  DkFloppyDiskSave,
  DkMagnifyingGlassFind,
  DkGearSettingsPreferences,
  DkShareExportForward,
  DkSecurityShieldProtect,
  DkHandheldMobilePhone,
  DkWasteBinDelete
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
import { ConfirmAction } from './ConfirmAction'
import { ConfirmDialog } from './ConfirmDialog'
import { CountrySelect } from './CountrySelect'
import { DashboardNav } from './DashboardNav'
import { DashboardShell } from './DashboardShell'
import { DashboardSidebar } from './DashboardSidebar'
import { DataTable } from './DataTable'
import { DatePicker } from './DatePicker'
import { Divider } from './Divider'
import { Dropdown } from './Dropdown'
import { EmptyState } from './EmptyState'
import { FieldHint, FieldLabel, FormField } from './FieldLabel'
import { GitHubButton } from './GitHubButton'
import { GoogleButton } from './GoogleButton'
import { IconButton } from './IconButton'
import { IconTab } from './IconTab'
import { KeyValueRow } from './KeyValueRow'
import { KitDocArticle } from './KitDocArticle'
import { LanguageSelect } from './LanguageSelect'
import { ListGroup, ListRow } from './ListRow'
import { LoadingScreen } from './LoadingScreen'
import { Modal } from './Modal'
import { NavSearch } from './NavSearch'
import { OtpBoxes } from './OtpBoxes'
import { OtherWaysButton } from './OtherWaysButton'
import { PageHeader } from './PageHeader'
import { Pagination } from './Pagination'
import { PasswordReveal } from './PasswordReveal'
import { PhoneInput } from './PhoneInput'
import { AppleButton } from './ProviderButtons'
import { ProfileButton } from './ProfileButton'
import { Progress } from './Progress'
import { type PropRow } from './PropsTable'
import { Radio } from './Radio'
import { RecoveryCodesList, RecoveryInput } from './RecoveryInput'
import { ScoreRing } from './ScoreRing'
import { SearchSelect } from './SearchSelect'
import { SegmentedControl } from './SegmentedControl'
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
import { Textarea } from './Textarea'
import { TextField } from './TextField'
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

function SegmentedDemo() {
  const [value, setValue] = useState<'day' | 'week' | 'month'>('week')
  return (
    <SegmentedControl
      label="Range"
      value={value}
      onChange={setValue}
      options={[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
      ]}
    />
  )
}

function TextFieldDemo() {
  return <TextField placeholder="Email address" defaultValue="" />
}

function PasswordDemo() {
  const [visible, setVisible] = useState(false)
  return (
    <TextField
      type={visible ? 'text' : 'password'}
      placeholder="Password"
      defaultValue="password"
      trailing={<PasswordReveal visible={visible} onToggle={() => setVisible((open) => !open)} />}
    />
  )
}

function SelectDemo() {
  const [value, setValue] = useState('md')
  return (
    <Dropdown
      label="Size"
      value={value}
      onChange={setValue}
      options={[
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' },
      ]}
    />
  )
}

function SearchSelectDemo() {
  const [value, setValue] = useState('us')
  return (
    <DkMagnifyingGlassFindSelect
      label="Region"
      value={value}
      onChange={setValue}
      options={[
        { value: 'us', label: 'United States' },
        { value: 'gb', label: 'United Kingdom' },
        { value: 'pk', label: 'Pakistan' },
      ]}
    />
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
    description: 'Display and h1–h3.',
    wide: true,
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
    ],
    props: [
      p('level', "1 | 2 | 3 | 'display'", '1', 'Display or h1–h3 on the type scale.'),
      ...TEXT_PROPS,
    ],
  },
  subhead: {
    title: 'Subhead',
    description: 'The supporting line under a heading.',
    wide: true,
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
      { label: 'Center', node: <Subhead align="center">Use your DevKit Account to continue.</Subhead> },
    ],
    props: TEXT_PROPS,
  },
  body: {
    title: 'Body',
    description: 'Content paragraphs at the reading size.',
    wide: true,
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
    ],
    props: [p('size', "'md' | 'sm'", "'md'", 'Content or content-small.'), ...TEXT_PROPS],
  },
  caption: {
    title: 'Caption',
    description: 'Small supporting copy for timestamps and hints.',
    Demo: () => <Caption>Last updated Aug 29, 2026</Caption>,
    code: `<Caption>Last updated Aug 29, 2026</Caption>\n`,
    states: [
      { label: 'Default', node: <Caption>Last updated Aug 29, 2026</Caption> },
      { label: 'Secondary', node: <Caption tone="secondary">12 members</Caption> },
      { label: 'Danger', node: <Caption tone="danger">This action cannot be undone.</Caption> },
    ],
    props: TEXT_PROPS,
  },
  eyebrow: {
    title: 'Eyebrow',
    description: 'A short uppercase label above a heading.',
    wide: true,
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
    description: 'Medium-weight copy for controls and fields.',
    Demo: () => <Label>Email address</Label>,
    code: `<Label>Email address</Label>\n`,
    states: [
      { label: 'Default', node: <Label>Email address</Label> },
      { label: 'Secondary', node: <Label tone="secondary">Optional</Label> },
      { label: 'Disabled', node: <Label tone="disabled">Unavailable</Label> },
    ],
    props: TEXT_PROPS,
  },
  'icon-button': {
    title: 'Icon Button',
    description: 'A compact control for a single icon action.',
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
    description: 'A two-state control for an immediate setting. Use SwitchGroup when several settings sit together.',
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
    description: 'A mutually exclusive set of options.',
    Demo: SegmentedDemo,
    code: `<SegmentedControl value={value} onChange={setValue} options={[...]} />\n`,
    props: [
      p('value', 'string', '—', 'The selected option.'),
      p('options', 'SegmentedOption[]', '—', 'Labels and values.'),
      p('onChange', '(value: T) => void', '—', 'Called when the selection changes.'),
    ],
  },
  'confirm-action': {
    title: 'Confirm Action',
    description: 'A two-tap destructive text action.',
    Demo: () => <ConfirmAction onConfirm={() => undefined} />,
    code: `<ConfirmAction onConfirm={remove} label="Remove" />\n`,
    props: [
      p('onConfirm', '() => void', '—', 'Runs after the second tap.'),
      p('label', 'string', "'Remove'", 'Idle label.'),
      p('confirmLabel', 'string', "'Confirm?'", 'Armed label.'),
    ],
  },
  'text-field': {
    title: 'Text Field',
    description: 'A single-line text input.',
    Demo: TextFieldDemo,
    code: `<TextField placeholder="Email address" />\n`,
    states: [
      { label: 'Default', node: <TextField placeholder="Email address" /> },
      { label: 'Filled', node: <TextField defaultValue="alex@roboticela.com" /> },
      { label: 'Invalid', node: <TextField defaultValue="alex" invalid /> },
      { label: 'Disabled', node: <TextField defaultValue="alex@roboticela.com" disabled /> },
    ],
    props: [
      p('icon', 'ReactNode', 'undefined', 'Leading icon inside the field.'),
      p('trailing', 'ReactNode', 'undefined', 'Trailing control, such as Password Reveal.'),
      p('invalid', 'boolean', 'false', 'Error border and aria-invalid.'),
    ],
  },
  textarea: {
    title: 'Textarea',
    description: 'A multi-line text input.',
    Demo: () => <Textarea placeholder="Notes" rows={4} />,
    code: `<Textarea placeholder="Notes" />\n`,
    states: [
      { label: 'Default', node: <Textarea placeholder="Notes" rows={3} /> },
      { label: 'Invalid', node: <Textarea defaultValue="Too short" invalid rows={3} /> },
      { label: 'Disabled', node: <Textarea defaultValue="Locked" disabled rows={3} /> },
    ],
    props: [p('invalid', 'boolean', 'false', 'Error border and aria-invalid.')],
  },
  'password-reveal': {
    title: 'Password Reveal',
    description: 'Show or hide a password field.',
    Demo: PasswordDemo,
    code: `<TextField type={visible ? 'text' : 'password'} trailing={<PasswordReveal visible={visible} onToggle={toggle} />} />\n`,
    props: [
      p('visible', 'boolean', '—', 'Whether the password is shown.'),
      p('onToggle', '() => void', '—', 'Called when the eye is pressed.'),
    ],
  },
  select: {
    title: 'Select',
    description: 'A compact dropdown for a single value.',
    Demo: SelectDemo,
    code: `<Dropdown label="Size" value={value} onChange={setValue} options={[...]} />\n`,
    states: [
      { label: 'Default', node: <SelectDemo /> },
      {
        label: 'Disabled',
        node: (
          <Dropdown
            label="Size"
            value="md"
            onChange={() => undefined}
            disabled
            options={[{ value: 'md', label: 'Medium' }]}
          />
        ),
      },
    ],
    props: [
      p('value', 'string', '—', 'The selected option.'),
      p('options', 'DropdownOption[]', '—', 'Menu items.'),
      p('compact', 'boolean', 'false', 'Smaller trigger for toolbars.'),
    ],
  },
  'search-select': {
    title: 'Search Select',
    description: 'A searchable single-select menu.',
    Demo: SearchSelectDemo,
    code: `<DkMagnifyingGlassFindSelect value={value} onChange={setValue} options={[...]} />\n`,
    props: [
      p('value', 'string', '—', 'The selected option.'),
      p('options', 'SearchSelectOption[]', '[]', 'Filterable items.'),
      p('allowClear', 'boolean', 'false', 'Adds a clear row.'),
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
        <TextField id="demo-name" placeholder="Alex Rivera" />
        <FieldHint>Shown on your public profile.</FieldHint>
      </FormField>
    ),
    code: `<FormField>\n  <FieldLabel>Display name</FieldLabel>\n  <TextField />\n  <FieldHint>Shown on your public profile.</FieldHint>\n</FormField>\n`,
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
    description: 'The product mark, wordmark, and lockup.',
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
    description: 'Light and dark with a labeled switch, or the switch alone.',
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
    description: 'An icon-only control for light and dark, including both icons at once.',
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
    />
  )
}

export function hasKitDoc(slug: string) {
  return slug in DOCS
}
