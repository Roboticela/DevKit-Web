'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  DkAppDashboardLayoutTiles,
  DkChartColumnIncreasing,
  DkEnvelopeMessageMail,
  DkGearSettingsPreferences,
  DkGlobeWorldEarth,
  DkKanbanFolderBoard,
  DkLogoutExitSession,
  DkMessageInboxTray,
  DkNotificationBellAlert,
  DkPadlockSecureClosed,
  DkPeopleUsersGroup,
  DkPersonUserProfile,
} from '@/icons'
import type { SettingsPreviewState } from '@/lib/pages-catalog'
import { DashboardShell } from './DashboardShell'
import { IconButton } from './IconButton'
import { PageHeader } from './PageHeader'
import { SettingsList, SettingsRow } from './SettingsRow'
import { Switch } from './Switch'
import { ThemeToggle } from './ThemeToggle'

const ICON = { size: 18, strokeWidth: 1.5, absoluteStrokeWidth: true } as const
const GLYPH = { strokeWidth: 1.85, absoluteStrokeWidth: true } as const

function SettingsSwitch({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange?: (next: boolean) => void
}) {
  return <Switch size="sm" checked={checked} onChange={onChange ?? (() => undefined)} label={label} />
}

export function SettingsPage({
  state = 'default',
  full = true,
}: {
  state?: SettingsPreviewState
  full?: boolean
}) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(state === 'sidebar-collapsed')
  const [search, setSearch] = useState('')
  const [alerts, setAlerts] = useState(true)
  const [digest, setDigest] = useState(false)
  const [appearance, setAppearance] = useState('system')
  const [signingOut, setSigningOut] = useState(state === 'signing-out')

  const twoFactorOn = state !== 'two-factor-off'

  useEffect(() => {
    setSidebarCollapsed(state === 'sidebar-collapsed')
    setSigningOut(state === 'signing-out')
  }, [state])

  const sections = useMemo(() => {
    const query = search.trim().toLowerCase()
    const main = [
      { id: 'overview', label: 'Overview', icon: <DkAppDashboardLayoutTiles {...ICON} /> },
      { id: 'projects', label: 'Projects', icon: <DkKanbanFolderBoard {...ICON} /> },
      { id: 'customers', label: 'Customers', icon: <DkPeopleUsersGroup {...ICON} /> },
      { id: 'analytics', label: 'Analytics', icon: <DkChartColumnIncreasing {...ICON} /> },
      { id: 'inbox', label: 'Inbox', icon: <DkMessageInboxTray {...ICON} />, badge: 3 },
    ].filter((item) => !query || item.label.toLowerCase().includes(query))

    const account = [
      { id: 'settings', label: 'Settings', icon: <DkGearSettingsPreferences {...ICON} /> },
      { id: 'logout', label: 'Log out', icon: <DkLogoutExitSession {...ICON} />, tone: 'danger' as const },
    ].filter((item) => !query || item.label.toLowerCase().includes(query))

    return [
      { label: 'Workspace', items: main },
      { label: 'Account', items: account },
    ].filter((section) => section.items.length > 0)
  }, [search])

  function navigate(id: string) {
    if (id === 'settings') return
    if (id === 'logout') {
      setSigningOut(true)
      router.push('/sign-in')
      return
    }
    router.push('/dashboard')
  }

  return (
    <DashboardShell
      className={full ? 'h-dvh' : 'h-full'}
      title="Settings"
      sections={sections}
      activeId="settings"
      onNavigate={navigate}
      sidebarOpen={sidebarOpen}
      onSidebarOpenChange={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      onSidebarCollapsedChange={setSidebarCollapsed}
      search={{ value: search, onChange: setSearch, placeholder: 'Search' }}
      userName="Alex Rivera"
      onUserClick={() => undefined}
      brandHref="/"
      navActions={
        <IconButton label="Notifications" size="sm" badge={3}>
          <DkNotificationBellAlert size={16} strokeWidth={1.6} absoluteStrokeWidth />
        </IconButton>
      }
      footer={<ThemeToggle variant={sidebarCollapsed ? 'switch' : 'default'} />}
    >
      <div className="mx-auto w-full max-w-[980px] px-4 py-8 min-[735px]:px-8 min-[735px]:py-12">
        <PageHeader
          title="Settings"
          description="Profile, security, and how this workspace reaches you."
        />
        <div className="mt-8 flex max-w-[480px] flex-col gap-8">
          <SettingsList header="Notifications" footer="Alerts arrive as they happen.">
            <SettingsRow
              icon={<DkNotificationBellAlert {...GLYPH} />}
              iconTone="danger"
              label="Product alerts"
              description="Push and email"
              control={<SettingsSwitch label="Product alerts" checked={alerts} onChange={setAlerts} />}
            />
            <SettingsRow
              icon={<DkEnvelopeMessageMail {...GLYPH} />}
              iconTone="brand"
              label="Weekly digest"
              description="A summary every Monday"
              control={<SettingsSwitch label="Weekly digest" checked={digest} onChange={setDigest} />}
            />
          </SettingsList>
          <SettingsList header="Account">
            <SettingsRow
              icon={<DkPersonUserProfile {...GLYPH} />}
              iconTone="muted"
              label="Name"
              value="Alex Rivera"
              onClick={() => undefined}
            />
            <SettingsRow
              icon={<DkGlobeWorldEarth {...GLYPH} />}
              iconTone="teal"
              label="Language"
              value="English"
              onClick={() => undefined}
            />
            <SettingsRow
              icon={<DkPadlockSecureClosed {...GLYPH} />}
              iconTone={twoFactorOn ? 'success' : 'warning'}
              label="Two-factor authentication"
              value={twoFactorOn ? 'On' : 'Off'}
              onClick={() => router.push('/setup-2fa')}
            />
          </SettingsList>
          <SettingsList header="Appearance">
            <SettingsRow
              layout="selection"
              label="System"
              selected={appearance === 'system'}
              onClick={() => setAppearance('system')}
            />
            <SettingsRow
              layout="selection"
              label="Light"
              selected={appearance === 'light'}
              onClick={() => setAppearance('light')}
            />
            <SettingsRow
              layout="selection"
              label="Dark"
              selected={appearance === 'dark'}
              onClick={() => setAppearance('dark')}
            />
          </SettingsList>
          <SettingsList>
            <SettingsRow
              layout="action"
              align="center"
              tone="danger"
              label="Sign out"
              loading={signingOut}
              onClick={() => navigate('logout')}
            />
          </SettingsList>
        </div>
      </div>
    </DashboardShell>
  )
}
