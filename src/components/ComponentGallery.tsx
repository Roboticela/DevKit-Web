'use client'

import { useRef, useState } from 'react'
import {
  DkNotificationBellAlert,
  DkChevronCaretRight,
  DkFingerprintBiometricScanPattern,
  DkMessageInboxTray,
  DkRoundKeyAccess,
  DkPadlockSecureClosed,
  DkLogoutExitSession,
  DkEnvelopeMessageMail,
  DkDevicesDesktopAndMobile,
  DkSecurityShieldProtect,
  DkHandheldMobilePhone,
  DkPersonUserProfile,
  DkMagnifyingGlassFind,
  DkGlobeWorldEarth,
  DkLayoutGrid,
  DkRowsThree,
  DkAppDashboardLayoutTiles,
  DkRefreshClockwiseRotate,
  DkTextAlignStart,
  DkTextAlignCenter,
  DkTextAlignEnd,
  DkPencilWriteEdit
} from '@/icons'
import { AVAILABLE_COUNTRY_ISOS } from '@/lib/languages'
import { Alert } from './Alert'
import { Anchor } from './Anchor'
import { AuthBrand, AuthLayout, AuthSuccess } from './AuthLayout'
import { AuthProviderStack } from './AuthProviderButton'
import { AuthLegal, ErrorText, StatusText } from './TextLink'
import { Avatar, AvatarGroup } from './Avatar'
import { AvatarEditor } from './AvatarEditor'
import { AvatarPicker, type AvatarPickerHandle } from './AvatarPicker'
import { Badge } from './Badge'
import { Button } from './Button'
import { ButtonLabel } from './ButtonLabel'
import { Checkbox } from './Checkbox'
import { ConfirmAction } from './ConfirmAction'
import { ConfirmDialog } from './ConfirmDialog'
import { CountrySelect } from './CountrySelect'
import { DatePicker, DATE_PICKER_SIZES, DATE_PICKER_VARIANTS, type DateRange } from './DatePicker'
import { DataTable } from './DataTable'
import { Divider } from './Divider'
import { Dropdown, type DropdownOption } from './Dropdown'
import { EmptyPopup } from './EmptyPopup'
import { EmptyState } from './EmptyState'
import { FieldRow, FormField } from './FieldLabel'
import { GitHubButton } from './GitHubButton'
import { GoogleButton } from './GoogleButton'
import { OtherWaysButton } from './OtherWaysButton'
import { PasskeyButton } from './PasskeyButton'
import {
  AppleButton,
  DiscordButton,
  FacebookButton,
  LinkedInButton,
  MicrosoftButton,
  SlackButton,
  XButton,
} from './ProviderButtons'
import { RoboticelaButton } from './RoboticelaButton'
import { IconButton } from './IconButton'
import { IconTab, IconTabBar } from './IconTab'
import { KeyValueGroup, KeyValueRow } from './KeyValueRow'
import { LanguageSelect } from './LanguageSelect'
import { ListGroup, ListMark, ListRow, TextAction } from './ListRow'
import { Loader, LOADER_VARIANTS } from './Loader'
import { LoadingScreen } from './LoadingScreen'
import { NavSearch } from './NavSearch'
import { CommandSearch } from './CommandPalette'
import { OtpBoxes } from './OtpBoxes'
import { PageHeader } from './PageHeader'
import {
  Pagination,
  PAGINATION_LAYOUTS,
  PAGINATION_LAYOUT_LABEL,
  PAGINATION_VARIANT_LABEL,
  PAGINATION_VARIANTS,
} from './Pagination'
import { PasswordField } from './PasswordField'
import { PhoneInput } from './PhoneInput'
import { CitySelect, CountySelect, StateSelect } from './PlaceSelect'
import { ProfileButton } from './ProfileButton'
import { Progress } from './Progress'
import { Radio } from './Radio'
import { RecoveryCodesList, RecoveryInput } from './RecoveryInput'
import { SegmentedControl, SegmentedToolbar } from './SegmentedControl'
import {
  CheckItem,
  ScoreRing,
  SCORE_RING_VARIANTS,
  SCORE_RING_VARIANT_LABEL,
} from './ScoreRing'
import { SettingsList, SettingsRow } from './SettingsRow'
import { SheetNav } from './SheetNav'
import { NumberField, NUMBER_FIELD_VARIANT_LABEL, NUMBER_FIELD_VARIANTS } from './NumberField'
import { RangeSlider, Slider, SLIDER_VARIANT_LABEL, SLIDER_VARIANTS } from './Slider'
import { SiteFooter } from './SiteFooter'
import { SiteNav } from './SiteNav'
import { Skeleton } from './Skeleton'
import { Switch, SwitchGroup, SwitchItem, SWITCH_VARIANTS, type SwitchVariant } from './Switch'
import { Textarea } from './Textarea'
import { TextField } from './TextField'
import { Tabs, TABS_VARIANT_LABEL, TABS_VARIANTS } from './Tabs'
import { ThemeIconToggle } from './ThemeIconToggle'
import { ThemeToggle } from './ThemeToggle'
import { Body, Caption, Eyebrow, Heading, Label, Subhead } from './Text'
import { TotpManualKey } from './TotpManualKey'
import { VerificationMethodCard } from './VerificationMethodCard'

const SELECT_GLYPH = { size: 18, strokeWidth: 1.6, absoluteStrokeWidth: true } as const

const PLANS: DropdownOption[] = [
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
]

const SECTIONS = [
  { id: 'theme', label: 'Theme' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'fields', label: 'Fields' },
  { id: 'selects', label: 'Selects' },
  { id: 'date', label: 'Date' },
  { id: 'verify', label: 'Verify' },
  { id: 'status', label: 'Status' },
  { id: 'pieces', label: 'Pieces' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'chrome', label: 'Chrome' },
]

function StateLabel({ children }: { children: string }) {
  return <Caption className="mb-2">{children}</Caption>
}

function SwitchPreview() {
  const [variants, setVariants] = useState<Record<SwitchVariant, boolean>>({
    primary: true,
    subtle: true,
    outline: false,
    ghost: true,
    danger: false,
  })
  const [notify, setNotify] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end gap-x-5 gap-y-4">
        {SWITCH_VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <Switch
              variant={variant}
              checked={variants[variant]}
              onChange={(next) => setVariants((current) => ({ ...current, [variant]: next }))}
              label={variant}
            />
            <Caption as="span" className="capitalize">
              {variant}
            </Caption>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <Caption as="span">Group</Caption>
        <SwitchGroup label="Preferences">
          <SwitchItem
            title="Notifications"
            description="Push and email"
            checked={notify}
            onChange={setNotify}
          />
          <SwitchItem
            title="Two-factor"
            description="Sign-in extra step"
            checked={twoFactor}
            onChange={setTwoFactor}
            variant="subtle"
          />
          <SwitchItem title="Loading" checked size="sm" loading variant="outline" />
          <SwitchItem title="Disabled" checked={false} disabled variant="danger" />
        </SwitchGroup>
      </div>
    </div>
  )
}

function SegmentedPreview() {
  const [range, setRange] = useState<'day' | 'week' | 'month'>('week')
  const [align, setAlign] = useState<'start' | 'center' | 'end'>('center')
  const glyph = { size: 18, strokeWidth: 1.75, absoluteStrokeWidth: true } as const

  return (
    <div className="flex flex-col gap-4">
      <SegmentedControl
        value={range}
        onChange={setRange}
        fullWidth
        options={[
          { value: 'day', label: 'Day' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
        ]}
      />
      <SegmentedControl
        mode="grouped"
        value={range}
        onChange={setRange}
        fullWidth
        options={[
          { value: 'day', label: 'Day' },
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
        ]}
      />
      <SegmentedToolbar>
        <SegmentedControl
          content="icon"
          value={align}
          onChange={setAlign}
          options={[
            { value: 'start', label: 'Align left', icon: <DkTextAlignStart {...glyph} /> },
            { value: 'center', label: 'Align center', icon: <DkTextAlignCenter {...glyph} /> },
            { value: 'end', label: 'Align right', icon: <DkTextAlignEnd {...glyph} /> },
          ]}
        />
        <IconButton
          label="Refresh"
          onAction={() => new Promise((resolve) => window.setTimeout(resolve, 900))}
        >
          <DkRefreshClockwiseRotate {...glyph} />
        </IconButton>
        <Button fullWidth={false}>Save</Button>
      </SegmentedToolbar>
    </div>
  )
}

function PaginationPreview() {
  const [page, setPage] = useState(2)
  const [longPage, setLongPage] = useState(12)
  const [compactPage, setCompactPage] = useState(3)

  return (
    <div className="flex flex-col gap-6">
      {PAGINATION_VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <Caption>{PAGINATION_VARIANT_LABEL[variant]}</Caption>
          <Pagination
            variant={variant}
            page={page}
            pageCount={5}
            onChange={setPage}
            aria-label={PAGINATION_VARIANT_LABEL[variant]}
          />
        </div>
      ))}
      <div className="flex flex-col gap-2">
        <Caption>Many pages</Caption>
        <Pagination page={longPage} pageCount={48} onChange={setLongPage} aria-label="Many pages" />
      </div>
      {PAGINATION_LAYOUTS.filter((layout) => layout !== 'numbers').map((layout) => (
        <div key={layout} className="flex flex-col gap-2">
          <Caption>{PAGINATION_LAYOUT_LABEL[layout]}</Caption>
          <Pagination
            layout={layout}
            page={compactPage}
            pageCount={48}
            onChange={setCompactPage}
            aria-label={PAGINATION_LAYOUT_LABEL[layout]}
          />
        </div>
      ))}
    </div>
  )
}

function DemoCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[16px] bg-bg-secondary p-8 max-[734px]:p-4 ${className}`}>
      {children}
    </div>
  )
}

function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string
  title: string
  intro: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-16 py-16 max-[734px]:py-[88px] min-[735px]:py-[88px]">
      <Heading level={2}>{title}</Heading>
      <Body className="mt-2 mb-8 max-w-[692px]">{intro}</Body>
      {children}
    </section>
  )
}

export function ComponentGallery() {
  const [email, setEmail] = useState('alex@roboticela.com')
  const [password, setPassword] = useState('password')
  const [plan, setPlan] = useState('team')
  const [size, setSize] = useState('md')
  const [country, setCountry] = useState<string | null>('PK')
  const [addrCountry, setAddrCountry] = useState<string | null>('PK')
  const [addrState, setAddrState] = useState<string | null>('PK-SD')
  const [addrCounty, setAddrCounty] = useState<string | null>('PK-SD:karachi-south')
  const [addrCity, setAddrCity] = useState<string | null>('PK-SD:karachi')
  const [language, setLanguage] = useState<string | null>('en-US')
  const [phone, setPhone] = useState('+14155552671')
  const [phonePk, setPhonePk] = useState('+923001234567')
  const [date, setDate] = useState<string | null>('2026-08-29')
  const [range, setRange] = useState<DateRange>({ start: '2026-08-12', end: '2026-08-20' })
  const [otp, setOtp] = useState(['1', '4', '8', '', '', ''])
  const [otpError, setOtpError] = useState(['', '', '', '', '', ''])
  const [recovery, setRecovery] = useState('XK4M-92QP')
  const [method, setMethod] = useState<'email' | 'passkey' | 'authenticator'>('email')
  const [notify, setNotify] = useState(true)
  const [digest, setDigest] = useState(true)
  const pickerRef = useRef<AvatarPickerHandle>(null)
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null)
  const [editorSrc, setEditorSrc] = useState<string | null>(null)
  const [editorOpen, setEditorOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [iconTab, setIconTab] = useState('profile')
  const [galleryTab, setGalleryTab] = useState('all')
  const [navQuery, setNavQuery] = useState('')
  const [radioPlan, setRadioPlan] = useState('pro')
  const [sliderValue, setSliderValue] = useState(65)
  const [sliderRange, setSliderRange] = useState<[number, number]>([20, 72])
  const [numberValue, setNumberValue] = useState<number | null>(48)
  const [quantity, setQuantity] = useState<number | null>(2)

  return (
    <div className="min-h-dvh bg-bg-primary font-sans text-text-primary">
      <header className="sticky top-0 z-[200] border-b border-border-subtle bg-[color-mix(in_srgb,var(--bg-primary)_72%,transparent)] backdrop-blur-[20px] backdrop-saturate-[180%]">
        <div className="mx-auto flex h-11 max-w-[1024px] items-center justify-between gap-4 px-[22px] min-[735px]:px-10 min-[1069px]:px-[min(5vw,80px)]">
          <p className="m-0 text-xs font-semibold tracking-[-0.01em]">Components</p>
          <nav className="hidden min-w-0 items-center gap-5 overflow-x-auto min-[735px]:flex">
            {SECTIONS.map((section) => (
              <Anchor
                key={section.id}
                href={`#${section.id}`}
                variant="plain"
                size="sm"
                className="whitespace-nowrap text-[color-mix(in_srgb,var(--text-primary)_80%,transparent)]"
              >
                {section.label}
              </Anchor>
            ))}
          </nav>
          <ThemeToggle compact />
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1024px] px-[22px] min-[735px]:px-10 min-[1069px]:px-[min(5vw,80px)]">
        <section className="pt-[88px] pb-16 max-[734px]:pt-16">
          <Eyebrow>DevKit</Eyebrow>
          <Heading level="display" className="mt-3">
            Every control. Every state.
          </Heading>
          <Subhead className="mt-4 max-w-[692px]">
            The same components as the reference product, rebuilt in Tailwind. Light and dark, mobile first, no drop
            shadows.
          </Subhead>
        </section>

        <Section id="theme" title="Appearance" intro="Labeled switches and icon-only toggles. The page follows the same data-theme tokens as the rest of the kit.">
          <div className="grid gap-4 min-[735px]:grid-cols-2">
            <DemoCard>
              <StateLabel>Default</StateLabel>
              <ThemeToggle />
            </DemoCard>
            <DemoCard>
              <StateLabel>Compact</StateLabel>
              <ThemeToggle variant="compact" />
            </DemoCard>
            <DemoCard>
              <StateLabel>Labels</StateLabel>
              <ThemeToggle variant="labels" />
            </DemoCard>
            <DemoCard>
              <StateLabel>Icons</StateLabel>
              <ThemeToggle variant="icons" />
            </DemoCard>
            <DemoCard>
              <StateLabel>Switch</StateLabel>
              <ThemeToggle variant="switch" />
            </DemoCard>
            <DemoCard>
              <StateLabel>Icon ghost</StateLabel>
              <ThemeIconToggle />
            </DemoCard>
            <DemoCard>
              <StateLabel>Icon outline</StateLabel>
              <ThemeIconToggle variant="outline" />
            </DemoCard>
            <DemoCard>
              <StateLabel>Icon pair</StateLabel>
              <ThemeIconToggle variant="pair" />
            </DemoCard>
            <DemoCard>
              <StateLabel>Icon segmented</StateLabel>
              <ThemeIconToggle variant="segmented" />
            </DemoCard>
            <DemoCard>
              <StateLabel>Icon split</StateLabel>
              <ThemeIconToggle variant="split" />
            </DemoCard>
          </div>
        </Section>

        <Section id="buttons" title="Buttons" intro="Pill controls at 44px. Primary, secondary, provider, action, ghost, and danger — rest, hover, loading, and disabled. Segmented controls sit beside icon buttons and buttons.">
          <div className="grid gap-4 min-[735px]:grid-cols-2">
            <DemoCard>
              <StateLabel>Primary</StateLabel>
              <div className="flex flex-col gap-3">
                <Button>Continue</Button>
                <Button loading loadingText="Continuing…">
                  Continue
                </Button>
                <Button disabled>Continue</Button>
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Secondary</StateLabel>
              <div className="flex flex-col gap-3">
                <Button variant="secondary">Use a passkey</Button>
                <Button variant="secondary" loading loadingText="Waiting…">
                  Use a passkey
                </Button>
                <Button variant="secondary" disabled>
                  Use a passkey
                </Button>
              </div>
            </DemoCard>
            <DemoCard className="min-[735px]:col-span-2">
              <StateLabel>Providers</StateLabel>
              <div className="grid gap-3 min-[735px]:grid-cols-2">
                <AuthProviderStack className="gap-y-3">
                  <GoogleButton />
                  <MicrosoftButton />
                  <FacebookButton />
                  <LinkedInButton />
                  <SlackButton />
                  <RoboticelaButton />
                  <AppleButton disabled />
                </AuthProviderStack>
                <AuthProviderStack className="gap-y-3">
                  <AppleButton />
                  <GitHubButton />
                  <XButton />
                  <DiscordButton />
                  <PasskeyButton />
                  <GoogleButton lastUsed />
                </AuthProviderStack>
              </div>
              <div className="mt-3">
                <OtherWaysButton />
              </div>
            </DemoCard>
            <DemoCard className="min-[735px]:col-span-2">
              <StateLabel>Providers — loading</StateLabel>
              <div className="grid gap-3 min-[735px]:grid-cols-2">
                <AuthProviderStack className="gap-y-3">
                  <GoogleButton loading />
                  <MicrosoftButton loading />
                  <FacebookButton loading />
                  <LinkedInButton loading />
                  <SlackButton loading />
                  <RoboticelaButton loading />
                </AuthProviderStack>
                <AuthProviderStack className="gap-y-3">
                  <AppleButton loading />
                  <GitHubButton loading />
                  <XButton loading />
                  <DiscordButton loading />
                  <PasskeyButton loading />
                </AuthProviderStack>
              </div>
            </DemoCard>
            <DemoCard className="min-[735px]:col-span-2">
              <StateLabel>Action, ghost, danger</StateLabel>
              <div className="grid gap-3 min-[735px]:grid-cols-2">
                <Button variant="action">
                  <ButtonLabel>Download recovery codes</ButtonLabel>
                </Button>
                <Button variant="ghost">Set up later</Button>
                <Button variant="danger">Delete account</Button>
                <div className="flex items-center gap-3">
                  <Loader decorative size="sm" />
                  <Loader decorative size="sm" onDark />
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-brand-primary">
                    <Loader decorative size="sm" onDark />
                  </span>
                </div>
              </div>
            </DemoCard>
            <DemoCard className="min-[735px]:col-span-2">
              <StateLabel>Segmented</StateLabel>
              <SegmentedPreview />
            </DemoCard>
          </div>
        </Section>

        <Section id="fields" title="Fields" intro="Icon fields at 17px with 12px corners. Outline, subtle, ghost, underline, and pill — filled, focus, invalid, and disabled.">
          <div className="grid gap-4 min-[735px]:grid-cols-2">
            <DemoCard>
              <StateLabel>Default / filled</StateLabel>
              <div className="flex flex-col gap-4">
                <TextField
                  icon={<DkPersonUserProfile size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Name"
                  value="Alex Rivera"
                  onChange={() => undefined}
                />
                <TextField
                  icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <PasswordField
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Placeholder, error, disabled</StateLabel>
              <div className="flex flex-col gap-4">
                <TextField
                  icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Email"
                />
                <TextField
                  icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Email"
                  defaultValue="not-an-email"
                  invalid
                />
                <PasswordField placeholder="Password" disabled defaultValue="password" />
                <ErrorText className="mt-0">Incorrect email or password.</ErrorText>
                <StatusText className="mt-0">Check your inbox for a code.</StatusText>
                <Anchor href="#forgot" className="self-end text-sm">
                  Forgot password?
                </Anchor>
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Variants</StateLabel>
              <div className="flex flex-col gap-4">
                <TextField
                  icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Outline"
                />
                <TextField
                  variant="subtle"
                  icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Subtle"
                />
                <TextField
                  variant="ghost"
                  icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Ghost"
                />
                <TextField
                  variant="underline"
                  icon={<DkPersonUserProfile size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Underline"
                />
                <TextField
                  variant="pill"
                  icon={<DkMagnifyingGlassFind size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Search"
                />
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Valid, focus, sizes</StateLabel>
              <div className="flex flex-col gap-4">
                <TextField
                  icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Email"
                  defaultValue="alex@roboticela.com"
                  valid
                />
                <TextField
                  icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Email"
                  defaultValue="alex@roboticela.com"
                  preview="focus"
                />
                <TextField
                  size="sm"
                  icon={<DkEnvelopeMessageMail size={16} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Small"
                />
                <TextField
                  size="lg"
                  icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Large"
                />
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Password field</StateLabel>
              <div className="flex flex-col gap-4">
                <PasswordField placeholder="Outline" defaultValue="password" />
                <PasswordField variant="subtle" placeholder="Subtle" defaultValue="password" />
                <PasswordField variant="pill" reveal="pill" placeholder="Pill" defaultValue="password" />
                <PasswordField variant="underline" reveal="outline" defaultValue="123" invalid />
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Number field</StateLabel>
              <div className="flex flex-col gap-4">
                {NUMBER_FIELD_VARIANTS.map((variant) => (
                  <NumberField
                    key={variant}
                    variant={variant}
                    unit="percent"
                    value={numberValue}
                    onValueChange={setNumberValue}
                    min={0}
                    max={100}
                    aria-label={NUMBER_FIELD_VARIANT_LABEL[variant]}
                  />
                ))}
                <NumberField
                  unit="currency"
                  value={numberValue}
                  onValueChange={setNumberValue}
                  min={0}
                  step={1}
                  aria-label="Price"
                />
                <NumberField
                  stepper="split"
                  value={quantity}
                  onValueChange={setQuantity}
                  min={1}
                  max={99}
                  aria-label="Quantity"
                />
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Textarea</StateLabel>
              <div className="flex flex-col gap-4">
                <Textarea
                  icon={<DkPencilWriteEdit size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Outline note"
                  rows={3}
                />
                <Textarea
                  variant="subtle"
                  icon={<DkPencilWriteEdit size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Subtle note"
                  rows={3}
                />
                <Textarea
                  variant="well"
                  icon={<DkPencilWriteEdit size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Well, like Notes"
                  defaultValue="Keep the Monday launch short."
                />
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Composer, ghost, invalid</StateLabel>
              <div className="flex flex-col gap-4">
                <Textarea
                  variant="composer"
                  icon={<DkMessageInboxTray size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Write a note for your team"
                  hint="Visible to your workspace"
                  maxLength={120}
                  defaultValue="Ship the auth kit on Monday."
                />
                <Textarea
                  variant="ghost"
                  icon={<DkPencilWriteEdit size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Ghost"
                  rows={3}
                />
                <Textarea
                  variant="underline"
                  icon={<DkPencilWriteEdit size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Too short"
                  defaultValue="Hi"
                  invalid
                  rows={3}
                />
              </div>
            </DemoCard>
          </div>
        </Section>

        <Section id="selects" title="Selects" intro="The field and the popup share one width. Address selects cascade: country, then state or province, then county, then city.">
          <div className="grid gap-4 min-[735px]:grid-cols-2">
            <DemoCard>
              <StateLabel>Chrome</StateLabel>
              <div className="flex flex-col gap-4">
                <Dropdown
                  variant="outline"
                  value={size}
                  onChange={setSize}
                  icon={<DkGlobeWorldEarth {...SELECT_GLYPH} />}
                  options={[
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                  ]}
                />
                <Dropdown
                  variant="subtle"
                  value={size}
                  onChange={setSize}
                  icon={<DkGlobeWorldEarth {...SELECT_GLYPH} />}
                  options={[
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                  ]}
                />
                <Dropdown
                  variant="ghost"
                  value={size}
                  onChange={setSize}
                  icon={<DkGlobeWorldEarth {...SELECT_GLYPH} />}
                  options={[
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                  ]}
                />
                <Dropdown
                  variant="underline"
                  value={size}
                  onChange={setSize}
                  options={[
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                  ]}
                />
                <Dropdown
                  variant="pill"
                  value={size}
                  onChange={setSize}
                  options={[
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                  ]}
                />
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Icons and search</StateLabel>
              <div className="flex flex-col gap-4">
                <Dropdown
                  value={plan}
                  onChange={setPlan}
                  options={PLANS}
                  placeholder="Plan"
                />
                <Dropdown
                  variant="subtle"
                  searchable
                  searchPlaceholder="Search plans"
                  value={plan}
                  onChange={setPlan}
                  options={PLANS}
                  placeholder="Plan"
                />
                <Dropdown
                  value=""
                  onChange={() => undefined}
                  placeholder="Choose a plan"
                  options={PLANS}
                />
                <Dropdown
                  value="team"
                  onChange={() => undefined}
                  options={PLANS}
                  disabled
                />
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Country / language</StateLabel>
              <div className="flex flex-col gap-4">
                <CountrySelect value={country} onChange={setCountry} />
                <CountrySelect
                  value={country}
                  onChange={setCountry}
                  enabledIsos={AVAILABLE_COUNTRY_ISOS}
                />
                <LanguageSelect value={language} onChange={setLanguage} />
                <PhoneInput value={phone} onChange={setPhone} />
                <PhoneInput value={phonePk} onChange={setPhonePk} />
                <PhoneInput value="" onChange={() => undefined} disabled />
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Address</StateLabel>
              <div className="flex flex-col gap-4">
                <CountrySelect
                  value={addrCountry}
                  onChange={(next) => {
                    setAddrCountry(next)
                    setAddrState(null)
                    setAddrCounty(null)
                    setAddrCity(null)
                  }}
                  allowClear={false}
                />
                <StateSelect
                  country={addrCountry}
                  value={addrState}
                  onChange={(next) => {
                    setAddrState(next)
                    setAddrCounty(null)
                    setAddrCity(null)
                  }}
                />
                <CountySelect
                  state={addrState}
                  value={addrCounty}
                  onChange={(next) => {
                    setAddrCounty(next)
                    setAddrCity(null)
                  }}
                />
                <CitySelect
                  country={addrCountry}
                  state={addrState}
                  county={addrCounty}
                  value={addrCity}
                  onChange={setAddrCity}
                />
              </div>
            </DemoCard>
          </div>
        </Section>

        <Section id="date" title="Date picker" intro="The field matches Select. Single or range. Open the calendar for today, selected, outside month, and disabled dates.">
          <div className="grid gap-4 min-[735px]:grid-cols-2">
            <DemoCard>
              <StateLabel>Chrome</StateLabel>
              <div className="flex flex-col gap-4">
                {DATE_PICKER_VARIANTS.map((variant) => (
                  <DatePicker
                    key={variant}
                    variant={variant}
                    value={date}
                    onChange={setDate}
                  />
                ))}
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>State</StateLabel>
              <div className="flex flex-col gap-4">
                <DatePicker value={null} onChange={() => undefined} placeholder="Select a date" />
                <DatePicker value={date} onChange={setDate} />
                <DatePicker value={date} onChange={() => undefined} invalid />
                <DatePicker value={date} onChange={() => undefined} valid />
                <DatePicker value={date} onChange={() => undefined} disabled />
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Size</StateLabel>
              <div className="flex flex-col gap-4">
                {DATE_PICKER_SIZES.map((size) => (
                  <DatePicker
                    key={size}
                    size={size}
                    value={date}
                    onChange={setDate}
                  />
                ))}
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Range</StateLabel>
              <div className="flex flex-col gap-4">
                <DatePicker mode="range" rangeValue={range} onRangeChange={setRange} />
                <DatePicker
                  mode="range"
                  variant="subtle"
                  rangeValue={range}
                  onRangeChange={setRange}
                />
                <DatePicker
                  mode="range"
                  rangeValue={range}
                  onRangeChange={() => undefined}
                  disabled
                />
              </div>
            </DemoCard>
          </div>
        </Section>

        <Section id="verify" title="Verification" intro="OTP boxes, recovery key, method cards, and the authenticator secret — rest, filled, error, selected, and disabled.">
          <div className="grid gap-4">
            <DemoCard>
              <StateLabel>OTP — partial, complete, error, disabled</StateLabel>
              <div className="flex flex-col items-center gap-8">
                <OtpBoxes value={otp} onChange={setOtp} />
                <OtpBoxes value={['4', '8', '2', '9', '1', '0']} onChange={() => undefined} />
                <div className="flex w-full flex-col items-center">
                  <OtpBoxes
                    value={otpError}
                    onChange={setOtpError}
                    error
                    shaking={otpError.every((digit) => !digit)}
                  />
                  <p className="mt-2 mb-0 text-center text-[13px] leading-[1.4] text-danger">
                    Incorrect code, try again
                  </p>
                </div>
                <OtpBoxes value={['1', '', '', '', '', '']} onChange={() => undefined} disabled />
                <div className="min-h-5">
                  <span className="text-sm text-text-secondary">Resend in 0:28</span>
                </div>
                <Anchor href="#resend" className="text-sm">
                  Didn&apos;t receive a code? Resend
                </Anchor>
              </div>
            </DemoCard>

            <DemoCard>
              <StateLabel>Recovery — empty, filled, groups, error, disabled</StateLabel>
              <div className="flex flex-col gap-8">
                <RecoveryInput value={recovery} onChange={setRecovery} />
                <RecoveryInput label="" value="XK4M-92QP" onChange={() => undefined} variant="subtle" />
                <RecoveryInput label="" mode="groups" value={recovery} onChange={setRecovery} />
                <RecoveryInput
                  label=""
                  value="XK4M-0000"
                  onChange={() => undefined}
                  invalid
                  hint="Incorrect code, try again"
                />
                <RecoveryInput
                  label=""
                  value="XK4M-92QP"
                  onChange={() => undefined}
                  valid
                  hint="Code accepted"
                />
                <RecoveryInput label="" value="XK4M-92QP" onChange={() => undefined} disabled />
              </div>
            </DemoCard>

            <div className="grid gap-4 min-[735px]:grid-cols-2">
              <DemoCard>
                <StateLabel>Recovery codes — copy</StateLabel>
                <RecoveryCodesList
                  copyable
                  codes={['XK4M-92QP', 'L7TN-3W8D', 'P0AV-61CK', 'H9QE-44BM']}
                />
              </DemoCard>
              <DemoCard>
                <StateLabel>Authenticator key — light / copied</StateLabel>
                <TotpManualKey secret="JBSWY3DPEHPK3PXP" />
                <div className="mt-8 rounded-[12px] bg-black p-6">
                  <StateLabel>Dark tone</StateLabel>
                  <TotpManualKey secret="JBSWY3DPEHPK3PXP" tone="dark" />
                </div>
              </DemoCard>
            </div>

            <DemoCard>
              <StateLabel>Method cards — rest, selected, disabled</StateLabel>
              <div className="mx-auto flex max-w-[460px] flex-col gap-3">
                <div className="mb-4 flex justify-center text-text-primary">
                  <DkSecurityShieldProtect size={56} strokeWidth={1.5} absoluteStrokeWidth />
                </div>
                <VerificationMethodCard
                  icon={<DkEnvelopeMessageMail size={28} strokeWidth={1.6} absoluteStrokeWidth />}
                  title="Email"
                  subtitle="Code sent to a***@roboticela.com"
                  selected={method === 'email'}
                  onClick={() => setMethod('email')}
                />
                <VerificationMethodCard
                  icon={<DkFingerprintBiometricScanPattern size={28} strokeWidth={1.6} absoluteStrokeWidth />}
                  title="Passkey"
                  subtitle="Use Face ID, Touch ID, or a security key"
                  selected={method === 'passkey'}
                  onClick={() => setMethod('passkey')}
                />
                <VerificationMethodCard
                  icon={<DkHandheldMobilePhone size={28} strokeWidth={1.6} absoluteStrokeWidth />}
                  title="Authenticator"
                  subtitle="Use a code from your authenticator app"
                  selected={method === 'authenticator'}
                  onClick={() => setMethod('authenticator')}
                />
                <VerificationMethodCard
                  icon={<DkRoundKeyAccess size={28} strokeWidth={1.6} absoluteStrokeWidth />}
                  title="Recovery code"
                  subtitle="Not configured for this account"
                  disabled
                />
                <VerificationMethodCard
                  icon={<DkDevicesDesktopAndMobile size={28} strokeWidth={1.6} absoluteStrokeWidth />}
                  title="Another device"
                  subtitle="No other signed-in devices"
                  disabled
                />
              </div>
            </DemoCard>
          </div>
        </Section>

        <Section id="status" title="Status" intro="Toggles, badges, divider, legal, and loading. Teal is reserved for verified; blue is the only interactive accent.">
          <div className="grid gap-4 min-[735px]:grid-cols-2">
            <DemoCard>
              <StateLabel>Switch</StateLabel>
              <SwitchPreview />
            </DemoCard>
            <DemoCard>
              <StateLabel>Badges, divider, legal</StateLabel>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="fill">New</Badge>
                <Badge tone="verified" dot pulse>
                  Live
                </Badge>
                <Badge variant="outline" tone="warning">
                  In review
                </Badge>
                <Badge variant="ghost" tone="neutral">
                  Beta
                </Badge>
                <Badge tone="success">Verified</Badge>
                <Badge tone="danger" count={3} variant="fill" />
                <Badge tone="muted">Pro</Badge>
              </div>
              <Divider />
              <AuthLegal className="mt-0" />
            </DemoCard>
            <DemoCard>
              <StateLabel>Loader</StateLabel>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {LOADER_VARIANTS.map((variant) => (
                  <Loader key={variant} variant={variant} />
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <Loader layout="inline" label="Saving" />
              </div>
            </DemoCard>
            <DemoCard className="min-h-[280px]">
              <StateLabel>Loading</StateLabel>
              <div className="h-[220px] overflow-hidden rounded-[12px] bg-bg-primary">
                <LoadingScreen embedded preview="initial" status="Setting things up…" />
              </div>
            </DemoCard>
          </div>
        </Section>

        <Section
          id="pieces"
          title="Pieces"
          intro="Small settings controls, not a whole page. Rows, avatar, crop editor, list items, sidebar item, and the other atoms from account settings."
        >
          <div className="grid gap-4 min-[735px]:grid-cols-2">
            <DemoCard>
              <StateLabel>Avatar</StateLabel>
              <div className="flex flex-wrap items-center gap-3">
                <Avatar name="Alex Rivera" size="sm" />
                <Avatar name="Sam Chen" size="md" status="online" />
                <Avatar name="Jordan Lee" size="lg" variant="subtle" tone="brand" />
                <Avatar size="md" />
              </div>
              <div className="mt-4">
                <AvatarGroup size="md">
                  <Avatar name="Alex Rivera" />
                  <Avatar name="Sam Chen" />
                  <Avatar name="Jordan Lee" />
                  <Avatar name="Riley Patel" />
                </AvatarGroup>
              </div>
            </DemoCard>

            <DemoCard>
              <StateLabel>Avatar picker</StateLabel>
              <AvatarPicker
                ref={pickerRef}
                src={avatarSrc}
                name="Alex Rivera"
                onEdit={() => {
                  if (!avatarSrc) return
                  setEditorSrc(avatarSrc)
                  setEditorOpen(true)
                }}
                onFile={(file) => {
                  const url = URL.createObjectURL(file)
                  setEditorSrc(url)
                  setEditorOpen(true)
                }}
              />
              <Anchor
                size="sm"
                className="mt-4"
                onClick={() => {
                  const canvas = document.createElement('canvas')
                  canvas.width = 640
                  canvas.height = 640
                  const ctx = canvas.getContext('2d')
                  if (!ctx) return
                  const gradient = ctx.createLinearGradient(0, 0, 640, 640)
                  gradient.addColorStop(0, '#0e7aff')
                  gradient.addColorStop(1, '#1d1d1f')
                  ctx.fillStyle = gradient
                  ctx.fillRect(0, 0, 640, 640)
                  canvas.toBlob((blob) => {
                    if (!blob) return
                    setEditorSrc(URL.createObjectURL(blob))
                    setEditorOpen(true)
                  }, 'image/jpeg', 0.92)
                }}
              >
                Open editor with sample
              </Anchor>
            </DemoCard>

            <DemoCard>
              <StateLabel>Settings row</StateLabel>
              <SettingsList header="Account" footer="Used to sign in and reset your password.">
                <SettingsRow
                  icon={<DkNotificationBellAlert size={16} strokeWidth={1.85} absoluteStrokeWidth />}
                  iconTone="danger"
                  label="Email notifications"
                  description="Product updates and security alerts"
                  control={<Switch checked={notify} onChange={setNotify} label="Email notifications" size="sm" />}
                />
                <SettingsRow
                  icon={<DkGlobeWorldEarth size={16} strokeWidth={1.85} absoluteStrokeWidth />}
                  iconTone="teal"
                  label="Language"
                  value="English (US)"
                  onClick={() => undefined}
                />
                <SettingsRow
                  icon={<DkPadlockSecureClosed size={16} strokeWidth={1.85} absoluteStrokeWidth />}
                  iconTone="danger"
                  label="Delete account"
                  description="Permanently remove this profile"
                  danger
                  onClick={() => setLogoutOpen(true)}
                />
              </SettingsList>
            </DemoCard>

            <DemoCard>
              <StateLabel>Field label and hint</StateLabel>
              <FormField htmlFor="gallery-user" label="Username" hint="Available" hintTone="ok" valid>
                <TextField
                  id="gallery-user"
                  icon={<DkPersonUserProfile size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  defaultValue="alex"
                  valid
                />
              </FormField>
              <FormField
                className="mt-4"
                htmlFor="gallery-email"
                label="Email"
                required
                invalid
                hint="Enter a valid email."
                hintTone="error"
              >
                <TextField
                  id="gallery-email"
                  icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  defaultValue="alex"
                  invalid
                />
              </FormField>
              <FieldRow className="mt-4">
                <FormField htmlFor="gallery-city" label="City" optional>
                  <TextField
                    id="gallery-city"
                    icon={<DkPersonUserProfile size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                    placeholder="Karachi"
                  />
                </FormField>
                <FormField htmlFor="gallery-postal" label="Postal" size="sm">
                  <TextField
                    id="gallery-postal"
                    size="sm"
                    icon={<DkPersonUserProfile size={16} strokeWidth={1.6} absoluteStrokeWidth />}
                    placeholder="00000"
                  />
                </FormField>
              </FieldRow>
            </DemoCard>

            <DemoCard>
              <StateLabel>Page header</StateLabel>
              <div className="flex w-full flex-col gap-6">
                <PageHeader
                  eyebrow="Workspace"
                  title="Projects"
                  description="Everything currently in flight."
                  actions={
                    <Button fullWidth={false} className="w-auto" size="sm">
                      New
                    </Button>
                  }
                />
                <PageHeader
                  variant="outline"
                  onBack={() => undefined}
                  title="Details"
                  description="Atlas Checkout and the people on it."
                  meta={<Badge>Live</Badge>}
                  actions={
                    <Button fullWidth={false} className="w-auto" size="sm" variant="secondary">
                      Share
                    </Button>
                  }
                />
              </div>
            </DemoCard>

            <DemoCard>
              <StateLabel>List row</StateLabel>
              <div className="flex w-full flex-col gap-6">
                <ListGroup header="Account">
                  <ListRow
                    leading={
                      <ListMark>
                        <DkEnvelopeMessageMail strokeWidth={1.85} absoluteStrokeWidth />
                      </ListMark>
                    }
                    title="Email"
                    value="alex@roboticela.com"
                    chevron
                    onClick={() => undefined}
                  />
                  <ListRow
                    leading={
                      <ListMark tone="success">
                        <DkPadlockSecureClosed strokeWidth={1.85} absoluteStrokeWidth />
                      </ListMark>
                    }
                    title="Password"
                    value="Updated"
                    chevron
                    onClick={() => undefined}
                  />
                  <ListRow
                    title="Product alerts"
                    trailing={<Switch size="sm" checked onChange={() => undefined} label="Product alerts" />}
                  />
                </ListGroup>
                <ListGroup>
                  <ListRow
                    leading={<Avatar name="Alex Rivera" size="md" />}
                    title="alex@roboticela.com"
                    meta="Primary · Verified"
                    trailing={<Badge tone="verified">Verified</Badge>}
                    chevron
                    onClick={() => undefined}
                  />
                  <ListRow
                    leading={<Avatar name="Alex Work" size="md" status="away" />}
                    title="alex.work@example.com"
                    meta="Unverified"
                    trailing={
                      <>
                        <TextAction>Verify</TextAction>
                        <TextAction danger>Remove</TextAction>
                      </>
                    }
                  />
                </ListGroup>
              </div>
            </DemoCard>

            <DemoCard>
              <StateLabel>Confirm action</StateLabel>
              <div className="flex flex-wrap items-center gap-3">
                <ConfirmAction onConfirm={() => undefined} />
                <ConfirmAction variant="ghost" onConfirm={() => undefined} />
                <ConfirmAction variant="subtle" onConfirm={() => undefined} />
                <ConfirmAction variant="outline" onConfirm={() => undefined} />
                <ConfirmAction variant="solid" onConfirm={() => undefined} />
                <ConfirmAction
                  variant="solid"
                  tone="brand"
                  label="Send"
                  confirmLabel="Send now?"
                  onConfirm={() => undefined}
                />
              </div>
            </DemoCard>

            <DemoCard>
              <StateLabel>Score ring and check item</StateLabel>
              <div className="flex flex-col items-center gap-8">
                <div className="flex flex-wrap items-end justify-center gap-6">
                  {SCORE_RING_VARIANTS.map((variant) => (
                    <ScoreRing
                      key={variant}
                      variant={variant}
                      score={variant === 'ghost' ? 48 : 72}
                      label={SCORE_RING_VARIANT_LABEL[variant]}
                    />
                  ))}
                </div>
                <div className="flex flex-col">
                  <CheckItem done>Password</CheckItem>
                  <CheckItem done>Two-factor</CheckItem>
                  <CheckItem>Recovery codes</CheckItem>
                </div>
              </div>
            </DemoCard>

            <DemoCard>
              <StateLabel>Key-value row</StateLabel>
              <KeyValueGroup variant="outline">
                <KeyValueRow label="Email" value="alex@roboticela.com" copyable />
                <KeyValueRow label="Username" value="@alex" />
                <KeyValueRow label="Plan" value={<Badge tone="neutral">Pro</Badge>} />
              </KeyValueGroup>
            </DemoCard>

            <DemoCard>
              <StateLabel>Icon tab</StateLabel>
              <div className="flex items-stretch gap-1">
                <IconTabBar
                  className="min-w-0 flex-1"
                  value={iconTab}
                  onChange={setIconTab}
                  items={[
                    {
                      id: 'profile',
                      label: 'Profile',
                      icon: <DkPersonUserProfile />,
                    },
                    {
                      id: 'security',
                      label: 'Security',
                      icon: <DkSecurityShieldProtect />,
                    },
                    {
                      id: 'alerts',
                      label: 'Alerts',
                      icon: <DkNotificationBellAlert />,
                      badge: 3,
                    },
                  ]}
                  aria-label="Account"
                />
                <IconTab
                  icon={<DkLogoutExitSession />}
                  label="Logout"
                  tone="danger"
                  onClick={() => setLogoutOpen(true)}
                />
              </div>
            </DemoCard>

            <DemoCard>
              <StateLabel>Nav search and profile button</StateLabel>
              <div className="flex items-center gap-3">
                <NavSearch value={navQuery} onChange={setNavQuery} />
                <CommandSearch variant="outline" placeholder="Search" shortcut="⌘K" onClick={() => undefined} />
                <ProfileButton name="Alex Rivera" src={avatarSrc} onClick={() => undefined} />
              </div>
            </DemoCard>

            <DemoCard>
              <StateLabel>Sheet nav</StateLabel>
              <div className="overflow-hidden rounded-[18px] border border-border-default bg-bg-elevated">
                <SheetNav title="Edit profile" onCancel={() => undefined} onDone={() => undefined} />
                <div className="h-12" />
              </div>
            </DemoCard>

            <DemoCard>
              <StateLabel>Slider and radio</StateLabel>
              <div className="flex flex-col gap-5">
                {SLIDER_VARIANTS.map((variant) => (
                  <Slider
                    key={variant}
                    variant={variant}
                    label={SLIDER_VARIANT_LABEL[variant]}
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    field="end"
                    unit="percent"
                  />
                ))}
                <RangeSlider
                  label="Range"
                  field="both"
                  unit="none"
                  value={sliderRange}
                  onValueChange={setSliderRange}
                />
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <Radio
                  name="plan"
                  label="Pro"
                  checked={radioPlan === 'pro'}
                  onChange={() => setRadioPlan('pro')}
                />
                <Radio
                  name="plan"
                  label="Team"
                  checked={radioPlan === 'team'}
                  onChange={() => setRadioPlan('team')}
                />
                <Radio name="plan" label="Enterprise" disabled />
              </div>
            </DemoCard>

            <DemoCard>
              <StateLabel>Confirm dialog</StateLabel>
              <Button variant="danger" onClick={() => setLogoutOpen(true)}>
                Log Out
              </Button>
            </DemoCard>
          </div>

          {editorSrc ? (
            <AvatarEditor
              open={editorOpen}
              imageSrc={editorSrc}
              onCancel={() => setEditorOpen(false)}
              onSave={(blob) => {
                if (avatarSrc?.startsWith('blob:')) URL.revokeObjectURL(avatarSrc)
                setAvatarSrc(URL.createObjectURL(blob))
                setEditorOpen(false)
              }}
              onChooseAnother={() => pickerRef.current?.open()}
              canRemove={Boolean(avatarSrc)}
              onRemove={() => {
                setAvatarSrc(null)
                setEditorOpen(false)
              }}
            />
          ) : null}

          <ConfirmDialog
            open={logoutOpen}
            onClose={() => setLogoutOpen(false)}
            title="Log Out?"
            body="You'll need to sign in again to access your account."
            confirmLabel="Log Out"
            loadingText="Logging out…"
            onConfirm={() => setLogoutOpen(false)}
          />
        </Section>

        <Section
          id="dashboard"
          title="Dashboard"
          intro="Pieces that sit inside an app canvas — stats, tables, tabs, alerts, empty, and progress."
        >
          <div className="grid gap-4 min-[735px]:grid-cols-2">
            <DemoCard className="min-[735px]:col-span-2">
              <StateLabel>Table</StateLabel>
              <DataTable
                size="sm"
                caption="Projects"
                selectable
                defaultSelectedKeys={['1']}
                data={[
                  { id: '1', name: 'Atlas Checkout', status: 'Live', owner: 'Alex Rivera' },
                  { id: '2', name: 'Northstar Auth', status: 'In review', owner: 'Sam Chen' },
                  { id: '3', name: 'Harbor Admin', status: 'Paused', owner: 'Jordan Lee' },
                ]}
                rowKey={(row) => row.id}
                columns={[
                  {
                    key: 'name',
                    header: 'Project',
                    sortable: true,
                    render: (row) => (
                      <span className="inline-flex min-w-0 items-center gap-2">
                        <Avatar name={row.owner} size="sm" />
                        <span className="truncate">{row.name}</span>
                      </span>
                    ),
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    sortable: true,
                    render: (row) => (
                      <Badge
                        tone={
                          row.status === 'Live'
                            ? 'verified'
                            : row.status === 'In review'
                              ? 'unverified'
                              : 'muted'
                        }
                      >
                        {row.status}
                      </Badge>
                    ),
                  },
                  { key: 'owner', header: 'Owner', hideOnMobile: true, sortable: true },
                ]}
                footer={<span>Showing 3 projects</span>}
                minWidth="480px"
              />
            </DemoCard>
            <DemoCard>
              <StateLabel>Chrome</StateLabel>
              <div className="flex flex-col gap-3">
                <Alert title="Invite sent">Sam can join this workspace for 7 days.</Alert>
                <Alert variant="outline" title="Invite sent">
                  Sam can join this workspace for 7 days.
                </Alert>
                <Alert variant="solid" title="Invite sent">
                  Sam can join this workspace for 7 days.
                </Alert>
                <Alert variant="ghost" title="Invite sent">
                  Sam can join this workspace for 7 days.
                </Alert>
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Tone</StateLabel>
              <div className="flex flex-col gap-3">
                <Alert tone="info" title="Invite sent">
                  Sam can join this workspace for 7 days.
                </Alert>
                <Alert tone="success" title="Backup complete" />
                <Alert tone="warning" title="Quota at 88%">
                  Storage is almost full.
                </Alert>
                <Alert tone="danger" title="Payment failed">
                  Update the card on file.
                </Alert>
                <Alert tone="neutral" title="Maintenance tonight" onDismiss={() => undefined}>
                  The workspace will pause from 01:00 to 03:00 UTC.
                </Alert>
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Empty, skeleton, progress</StateLabel>
              <EmptyState
                icon={<DkMessageInboxTray size={32} strokeWidth={1.5} absoluteStrokeWidth />}
                title="No messages"
                body="Mentions and reviews will show up here."
              />
              <div className="mt-6 flex justify-center">
                <EmptyPopup
                  size="sm"
                  icon={<DkMagnifyingGlassFind strokeWidth={1.5} absoluteStrokeWidth />}
                  title="No results"
                  body="Try a different search."
                />
              </div>
              <div className="mt-6">
                <Skeleton loading label="Loading profile">
                  <div className="flex items-center gap-4">
                    <Avatar name="Maya Chen" size="lg" />
                    <div className="flex-1">
                      <Label as="p">Maya Chen</Label>
                      <Caption>Workspace owner</Caption>
                    </div>
                  </div>
                </Skeleton>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Skeleton variant="outline" lines={3} />
                <Skeleton variant="pill" className="h-8 w-[120px]" />
              </div>
              <Progress className="mt-6" label="Seat usage" value={72} />
              <Progress className="mt-5" variant="pill" tone="warning" label="Storage" value={88} />
              <Progress className="mt-5" indeterminate label="Preparing" />
            </DemoCard>
            <DemoCard>
              <StateLabel>Checkbox</StateLabel>
              <div className="flex flex-col gap-4">
                <Checkbox
                  label="Weekly digest"
                  checked={digest}
                  onChange={(event) => setDigest(event.target.checked)}
                />
                <Checkbox label="Checked" defaultChecked />
                <Checkbox label="Mixed" indeterminate />
                <Checkbox label="Invalid" invalid />
                <Checkbox label="Disabled" disabled />
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Tabs</StateLabel>
              <div className="flex flex-col gap-6">
                {TABS_VARIANTS.map((variant) => (
                  <div key={variant} className="flex flex-col gap-2">
                    <Caption>{TABS_VARIANT_LABEL[variant]}</Caption>
                    <Tabs
                      variant={variant}
                      value={galleryTab}
                      onChange={setGalleryTab}
                      fullWidth={variant !== 'underline' && variant !== 'ghost'}
                      items={[
                        { id: 'all', label: 'All' },
                        { id: 'live', label: 'Live' },
                        { id: 'review', label: 'In review', badge: 1 },
                      ]}
                      aria-label={TABS_VARIANT_LABEL[variant]}
                    />
                  </div>
                ))}
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Pagination</StateLabel>
              <PaginationPreview />
            </DemoCard>
          </div>
        </Section>

        <Section id="chrome" title="Chrome" intro="Auth frame, success, site nav, and footer. These compose the smaller controls above.">
          <DemoCard className="overflow-hidden p-0">
            <StateLabel>Auth nav</StateLabel>
            <div className="relative h-[880px] overflow-auto bg-bg-primary max-[734px]:h-[720px]">
              <AuthLayout navLinkTo="#signin" navLinkLabel="Sign in">
                <AuthBrand title="Create Account" subhead="One account. Everything DevKit." />
                <form className="mt-8 flex flex-col" onSubmit={(event) => event.preventDefault()}>
                  <div className="flex flex-col gap-4">
                    <TextField
                      icon={<DkPersonUserProfile size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                      placeholder="Name"
                      defaultValue="Alex Rivera"
                    />
                    <TextField
                      icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                      placeholder="Email"
                      defaultValue="alex@roboticela.com"
                    />
                    <PasswordField placeholder="Password" defaultValue="password" />
                  </div>
                  <Button className="mt-6" type="submit">
                    Continue
                  </Button>
                  <Divider>or continue with</Divider>
                  <AuthProviderStack className="gap-y-3">
                    <GoogleButton lastUsed />
                    <AppleButton />
                    <MicrosoftButton />
                    <GitHubButton />
                    <FacebookButton />
                    <XButton />
                    <PasskeyButton />
                    <RoboticelaButton />
                  </AuthProviderStack>
                  <div className="mt-3">
                    <OtherWaysButton />
                  </div>
                  <AuthLegal />
                </form>
              </AuthLayout>
            </div>
          </DemoCard>

          <div className="mt-4 grid gap-4 min-[735px]:grid-cols-2">
            <DemoCard>
              <AuthSuccess
                title="Check your email"
                body="We sent a 6-digit code to confirm it’s you."
                email="alex@roboticela.com"
                action={<Button>Open Mail</Button>}
              />
            </DemoCard>
            <DemoCard>
              <AuthBrand
                title="Link expired"
                subhead="This sign-in link is no longer valid. Request a new one to continue."
                narrowSubhead
                icon={<DkPadlockSecureClosed size={44} strokeWidth={1.5} absoluteStrokeWidth />}
              />
              <Button className="mt-8">Send a new link</Button>
            </DemoCard>
          </div>
        </Section>
      </main>

      <div className="mt-8">
        <SiteNav />
        <div className="flex min-h-[200px] items-center justify-center bg-bg-secondary text-sm text-text-tertiary">
          Page content sits under the bar.
        </div>
        <SiteFooter />
      </div>
    </div>
  )
}
