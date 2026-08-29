'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import {
  DkNotificationBellAlert,
  DkChevronCaretRight,
  DkPaymentCreditCard,
  DkFingerprintBiometricScan,
  DkMessageInboxTray,
  DkRoundKeyAccess,
  DkPadlockSecureClosed,
  DkLogoutExitSession,
  DkEnvelopeMessageMail,
  DkDevicesDesktopAndMobile,
  DkSecurityShieldProtect,
  DkHandheldMobilePhone,
  DkPersonUserProfile
} from '@/icons'
import { AVAILABLE_COUNTRY_ISOS } from '@/lib/languages'
import { Alert } from './Alert'
import { AuthBrand, AuthLayout, AuthSuccess } from './AuthLayout'
import { AuthProviderStack } from './AuthProviderButton'
import { AvatarEditor } from './AvatarEditor'
import { AvatarPicker, type AvatarPickerHandle } from './AvatarPicker'
import { Badge } from './Badge'
import { Button } from './Button'
import { ButtonLabel, ButtonSpinner } from './ButtonLabel'
import { Checkbox } from './Checkbox'
import { ConfirmAction } from './ConfirmAction'
import { ConfirmDialog } from './ConfirmDialog'
import { CountrySelect } from './CountrySelect'
import { DashboardPreview } from './DashboardPreview'
import { DatePicker, type DateRange } from './DatePicker'
import { Divider } from './Divider'
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
import { IconTab } from './IconTab'
import { KeyValueRow } from './KeyValueRow'
import { LanguageSelect } from './LanguageSelect'
import { ListGroup, ListRow, TextAction } from './ListRow'
import { LoadingScreen } from './LoadingScreen'
import { NavSearch } from './NavSearch'
import { OtpBoxes } from './OtpBoxes'
import { Pagination } from './Pagination'
import { PasswordReveal } from './PasswordReveal'
import { PhoneInput } from './PhoneInput'
import { ProfileButton } from './ProfileButton'
import { Progress } from './Progress'
import { Radio } from './Radio'
import { RecoveryCodesList, RecoveryInput } from './RecoveryInput'
import { SearchSelect } from './SearchSelect'
import { CheckItem, ScoreRing } from './ScoreRing'
import { SettingsList, SettingsRow } from './SettingsRow'
import { SidebarNavItem } from './DashboardSidebar'
import { Slider } from './Slider'
import { SiteFooter } from './SiteFooter'
import { SiteNav } from './SiteNav'
import { Skeleton } from './Skeleton'
import { Switch, SwitchGroup, SwitchItem, SWITCH_VARIANTS, type SwitchVariant } from './Switch'
import { TextField } from './TextField'
import { AuthLegal, ErrorText, StatusText, TextLink } from './TextLink'
import { ThemeIconToggle } from './ThemeIconToggle'
import { ThemeToggle } from './ThemeToggle'
import { Body, Caption, Eyebrow, Heading, Subhead } from './Text'
import { TotpManualKey } from './TotpManualKey'
import { VerificationMethodCard } from './VerificationMethodCard'

const CITIES = [
  { value: 'khi', label: 'Karachi', meta: 'PK' },
  { value: 'lhr', label: 'Lahore', meta: 'PK' },
  { value: 'isb', label: 'Islamabad', meta: 'PK' },
  { value: 'dxb', label: 'Dubai', meta: 'AE' },
  { value: 'nyc', label: 'New York', meta: 'US' },
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
  const [showPassword, setShowPassword] = useState(false)
  const [city, setCity] = useState('khi')
  const [country, setCountry] = useState<string | null>('PK')
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
  const [page, setPage] = useState(1)
  const pickerRef = useRef<AvatarPickerHandle>(null)
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null)
  const [editorSrc, setEditorSrc] = useState<string | null>(null)
  const [editorOpen, setEditorOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [iconTab, setIconTab] = useState('profile')
  const [navQuery, setNavQuery] = useState('')
  const [sidebarPiece, setSidebarPiece] = useState('profile')
  const [radioPlan, setRadioPlan] = useState('pro')
  const [sliderValue, setSliderValue] = useState(0.65)

  return (
    <div className="min-h-dvh bg-bg-primary font-sans text-text-primary">
      <header className="sticky top-0 z-[200] border-b border-border-subtle bg-[color-mix(in_srgb,var(--bg-primary)_72%,transparent)] backdrop-blur-[20px] backdrop-saturate-[180%]">
        <div className="mx-auto flex h-11 max-w-[1024px] items-center justify-between gap-4 px-[22px] min-[735px]:px-10 min-[1069px]:px-[min(5vw,80px)]">
          <p className="m-0 text-xs font-semibold tracking-[-0.01em]">Components</p>
          <nav className="hidden min-w-0 items-center gap-5 overflow-x-auto min-[735px]:flex">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="whitespace-nowrap text-xs font-normal text-[color-mix(in_srgb,var(--text-primary)_80%,transparent)] no-underline hover:text-brand-primary"
              >
                {section.label}
              </a>
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

        <Section id="buttons" title="Buttons" intro="Pill controls at 44px. Primary, secondary, provider, action, ghost, and danger — rest, hover, loading, and disabled.">
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
                  <ButtonSpinner />
                  <ButtonSpinner light />
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-brand-primary">
                    <ButtonSpinner light />
                  </span>
                </div>
              </div>
            </DemoCard>
          </div>
        </Section>

        <Section id="fields" title="Fields" intro="Auth fields at 17px with 12px corners. Icon, password reveal, focus ring, error, and disabled.">
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
                <TextField
                  icon={<DkPadlockSecureClosed size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  trailing={
                    <PasswordReveal
                      visible={showPassword}
                      onToggle={() => setShowPassword((current) => !current)}
                    />
                  }
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
                <TextField
                  icon={<DkPadlockSecureClosed size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  placeholder="Password"
                  disabled
                  defaultValue="••••••••"
                />
                <ErrorText className="mt-0">Incorrect email or password.</ErrorText>
                <StatusText className="mt-0">Check your inbox for a code.</StatusText>
                <TextLink href="#forgot" className="self-end text-sm">
                  Forgot password?
                </TextLink>
              </div>
            </DemoCard>
          </div>
        </Section>

        <Section id="selects" title="Selects" intro="Searchable menus with the same trigger, search field, option, and empty states. Country and language share that menu.">
          <div className="grid gap-4 min-[735px]:grid-cols-2">
            <DemoCard>
              <StateLabel>Search select</StateLabel>
              <div className="flex flex-col gap-4">
                <SearchSelect
                  label="City"
                  value={city}
                  onChange={setCity}
                  options={CITIES}
                  placeholder="Select a city"
                />
                <SearchSelect
                  label="City"
                  value=""
                  onChange={() => undefined}
                  options={CITIES}
                  placeholder="Placeholder"
                />
                <SearchSelect
                  label="City"
                  value="khi"
                  onChange={() => undefined}
                  options={CITIES}
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
          </div>
        </Section>

        <Section id="date" title="Date picker" intro="Single and range. Open the calendar for today, selected, outside month, disabled, and sheet layout on small screens.">
          <div className="grid gap-4 min-[735px]:grid-cols-2">
            <DemoCard>
              <StateLabel>Single</StateLabel>
              <div className="flex flex-col gap-4">
                <DatePicker value={date} onChange={setDate} />
                <DatePicker value={null} onChange={() => undefined} placeholder="Select a date" />
                <DatePicker value={date} onChange={() => undefined} disabled />
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Range</StateLabel>
              <DatePicker mode="range" rangeValue={range} onRangeChange={setRange} />
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
                <TextLink href="#resend" className="text-sm">
                  Didn&apos;t receive a code? Resend
                </TextLink>
              </div>
            </DemoCard>

            <div className="grid gap-4 min-[735px]:grid-cols-2">
              <DemoCard>
                <StateLabel>Recovery</StateLabel>
                <RecoveryInput value={recovery} onChange={setRecovery} />
                <RecoveryCodesList
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
                  icon={<DkFingerprintBiometricScan size={28} strokeWidth={1.6} absoluteStrokeWidth />}
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
              <div className="flex flex-wrap gap-2">
                <Badge>Primary</Badge>
                <Badge tone="verified">Verified</Badge>
                <Badge tone="unverified">Unverified</Badge>
                <Badge tone="neutral">Active</Badge>
              </div>
              <Divider />
              <AuthLegal className="mt-0" />
            </DemoCard>
            <DemoCard className="min-h-[280px] min-[735px]:col-span-2">
              <StateLabel>Loading — full and delayed copy</StateLabel>
              <div className="h-[220px] overflow-hidden rounded-[12px] bg-bg-primary">
                <LoadingScreen embedded status="Setting things up…" delayMs={2500} />
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
              <Button
                variant="ghost"
                size="sm"
                fullWidth={false}
                className="mt-4 h-auto px-0 text-brand-primary hover:underline"
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
              </Button>
            </DemoCard>

            <DemoCard>
              <StateLabel>Settings row</StateLabel>
              <SettingsList>
                <SettingsRow
                  label="Email notifications"
                  description="Product updates and security alerts"
                  control={<Switch checked={notify} onChange={setNotify} label="Email notifications" size="sm" />}
                />
                <SettingsRow
                  label="Language"
                  description="English (US)"
                  control={<DkChevronCaretRight size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  onClick={() => undefined}
                />
                <SettingsRow
                  label="Delete account"
                  description="Permanently remove this profile"
                  danger
                  control={<DkChevronCaretRight size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                  onClick={() => setLogoutOpen(true)}
                />
              </SettingsList>
            </DemoCard>

            <DemoCard>
              <StateLabel>Field label and hint</StateLabel>
              <FormField label="Username" hint="Available" hintTone="ok">
                <TextField defaultValue="alex" />
              </FormField>
              <FieldRow className="mt-4">
                <FormField label="City" optional>
                  <TextField placeholder="Karachi" />
                </FormField>
                <FormField label="Postal" hint="Required" hintTone="error">
                  <TextField invalid placeholder="00000" />
                </FormField>
              </FieldRow>
            </DemoCard>

            <DemoCard>
              <StateLabel>List row</StateLabel>
              <ListGroup>
                <ListRow
                  title="alex@roboticela.com"
                  meta="Primary · Verified"
                  trailing={
                    <>
                      <Badge tone="verified">Verified</Badge>
                      <ConfirmAction onConfirm={() => undefined} />
                    </>
                  }
                />
                <ListRow
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
            </DemoCard>

            <DemoCard>
              <StateLabel>Score ring and check item</StateLabel>
              <div className="flex items-center gap-6">
                <ScoreRing score={72} />
                <div className="flex flex-col">
                  <CheckItem done>Password</CheckItem>
                  <CheckItem done>Two-factor</CheckItem>
                  <CheckItem>Recovery codes</CheckItem>
                </div>
              </div>
            </DemoCard>

            <DemoCard>
              <StateLabel>Key-value row</StateLabel>
              <div className="border-t border-border-default">
                <KeyValueRow label="Email" value="alex@roboticela.com" />
                <KeyValueRow label="Username" value="@alex" />
                <KeyValueRow label="Plan" value={<Badge tone="neutral">Pro</Badge>} />
              </div>
            </DemoCard>

            <DemoCard>
              <StateLabel>Sidebar item</StateLabel>
              <div className="flex max-w-[260px] flex-col gap-1">
                <SidebarNavItem
                  item={{
                    id: 'profile',
                    label: 'Profile',
                    icon: <DkPersonUserProfile size={16} strokeWidth={1.6} absoluteStrokeWidth />,
                  }}
                  active={sidebarPiece === 'profile'}
                  onSelect={setSidebarPiece}
                />
                <SidebarNavItem
                  item={{
                    id: 'security',
                    label: 'Security',
                    icon: <DkSecurityShieldProtect size={16} strokeWidth={1.6} absoluteStrokeWidth />,
                    badge: 2,
                  }}
                  active={sidebarPiece === 'security'}
                  onSelect={setSidebarPiece}
                />
                <SidebarNavItem
                  item={{
                    id: 'billing',
                    label: 'Billing',
                    icon: <DkPaymentCreditCard size={16} strokeWidth={1.6} absoluteStrokeWidth />,
                  }}
                  active={sidebarPiece === 'billing'}
                  onSelect={setSidebarPiece}
                />
                <SidebarNavItem
                  item={{
                    id: 'logout',
                    label: 'Log out',
                    icon: <DkLogoutExitSession size={16} strokeWidth={1.6} absoluteStrokeWidth />,
                    tone: 'danger',
                  }}
                  onSelect={() => setLogoutOpen(true)}
                />
              </div>
            </DemoCard>

            <DemoCard>
              <StateLabel>Icon tab</StateLabel>
              <div className="flex gap-0.5">
                <IconTab
                  icon={<DkPersonUserProfile size={16} strokeWidth={1.6} absoluteStrokeWidth />}
                  label="Profile"
                  active={iconTab === 'profile'}
                  onClick={() => setIconTab('profile')}
                />
                <IconTab
                  icon={<DkSecurityShieldProtect size={16} strokeWidth={1.6} absoluteStrokeWidth />}
                  label="Security"
                  active={iconTab === 'security'}
                  onClick={() => setIconTab('security')}
                />
                <IconTab
                  icon={<DkNotificationBellAlert size={16} strokeWidth={1.6} absoluteStrokeWidth />}
                  label="Alerts"
                  active={iconTab === 'alerts'}
                  onClick={() => setIconTab('alerts')}
                />
                <IconTab
                  icon={<DkLogoutExitSession size={16} strokeWidth={1.6} absoluteStrokeWidth />}
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
                <ProfileButton name="Alex Rivera" src={avatarSrc} onClick={() => undefined} />
              </div>
            </DemoCard>

            <DemoCard>
              <StateLabel>Slider and radio</StateLabel>
              <Slider
                label="Zoom"
                min={0}
                max={1}
                step={0.01}
                value={sliderValue}
                onValueChange={setSliderValue}
              />
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
                <Radio name="plan" label="Disabled" disabled />
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
          intro="App chrome: top bar, collapsible sidebar, and the pieces that sit inside — stats, tables, tabs, alerts, empty, and progress. Open the full layout on small screens to use the drawer."
        >
          <DemoCard className="overflow-hidden p-0">
            <div className="flex items-center justify-between gap-4 px-8 pt-8 pb-3 max-[734px]:px-4">
              <StateLabel>Shell — navbar and sidebar</StateLabel>
              <Link
                href="/dashboard"
                className="text-xs font-medium text-brand-primary no-underline hover:underline"
              >
                Open full layout
              </Link>
            </div>
            <div className="h-[720px] border-t border-border-subtle bg-bg-primary max-[734px]:h-[560px]">
              <DashboardPreview />
            </div>
          </DemoCard>

          <div className="mt-4 grid gap-4 min-[735px]:grid-cols-2">
            <DemoCard>
              <StateLabel>Alerts</StateLabel>
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
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Empty, skeleton, progress</StateLabel>
              <EmptyState
                icon={<DkMessageInboxTray size={32} strokeWidth={1.5} absoluteStrokeWidth />}
                title="No messages"
                body="Mentions and reviews will show up here."
              />
              <div className="mt-6 flex items-center gap-4">
                <Skeleton className="size-11 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-3.5 w-[55%]" />
                  <Skeleton className="mt-2 h-3 w-[35%]" />
                </div>
              </div>
              <Progress className="mt-6" label="Seat usage" value={72} />
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
                <Checkbox label="Disabled" disabled />
              </div>
            </DemoCard>
            <DemoCard>
              <StateLabel>Pagination</StateLabel>
              <Pagination page={page} pageCount={5} onChange={setPage} />
            </DemoCard>
          </div>
        </Section>

        <Section id="chrome" title="Chrome" intro="Auth frame, success, site nav, and footer. These compose the smaller controls above.">
          <DemoCard className="overflow-hidden p-0">
            <StateLabel>Auth layout</StateLabel>
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
                    <TextField
                      icon={<DkPadlockSecureClosed size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                      type="password"
                      placeholder="Password"
                      defaultValue="password"
                      trailing={
                        <PasswordReveal visible={false} onToggle={() => undefined} />
                      }
                    />
                  </div>
                  <Button className="mt-6" type="submit">
                    Continue
                  </Button>
                  <Divider />
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
