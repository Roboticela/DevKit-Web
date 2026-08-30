'use client'

import { useMemo, useState } from 'react'
import {
  DkChartColumnIncreasing,
  DkNotificationBellAlert,
  DkKanbanFolderBoard,
  DkMessageInboxTray,
  DkAppDashboardLayoutTiles,
  DkLogoutExitSession,
  DkAddPlusCreate,
  DkGearSettingsPreferences,
  DkPeopleUsersGroup,
  DkEnvelopeMessageMail,
  DkPencilWriteEdit
} from '@/icons'
import { Alert } from './Alert'
import { Badge } from './Badge'
import { Breadcrumbs } from './Breadcrumbs'
import { Button } from './Button'
import { Checkbox } from './Checkbox'
import { DashboardShell } from './DashboardShell'
import { DataTable } from './DataTable'
import { EmptyState } from './EmptyState'
import { IconButton } from './IconButton'
import { Modal } from './Modal'
import { PageHeader } from './PageHeader'
import { Pagination } from './Pagination'
import { Progress } from './Progress'
import { Skeleton } from './Skeleton'
import { StatCard } from './StatCard'
import { Tabs } from './Tabs'
import { Textarea } from './Textarea'
import { TextField } from './TextField'
import { ThemeToggle } from './ThemeToggle'

const ICON = { size: 18, strokeWidth: 1.5, absoluteStrokeWidth: true } as const

const PROJECTS = [
  { id: '1', name: 'Atlas Checkout', status: 'Live', owner: 'Alex Rivera', updated: 'Aug 28' },
  { id: '2', name: 'Northstar Auth', status: 'In review', owner: 'Sam Chen', updated: 'Aug 26' },
  { id: '3', name: 'Harbor Admin', status: 'Paused', owner: 'Jordan Lee', updated: 'Aug 21' },
  { id: '4', name: 'Pulse Analytics', status: 'Live', owner: 'Riley Patel', updated: 'Aug 19' },
] as const

function statusTone(status: string) {
  if (status === 'Live') return 'verified' as const
  if (status === 'In review') return 'unverified' as const
  return 'neutral' as const
}

export function DashboardPreview({ full = false }: { full?: boolean }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [page, setPage] = useState('overview')
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('all')
  const [inviteOpen, setInviteOpen] = useState(false)
  const [tablePage, setTablePage] = useState(1)
  const [banner, setBanner] = useState(true)
  const [productAlerts, setProductAlerts] = useState(true)
  const [weekly, setWeekly] = useState(true)
  const [note, setNote] = useState('')

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

  const titles: Record<string, string> = {
    overview: 'Overview',
    projects: 'Projects',
    customers: 'Customers',
    analytics: 'Analytics',
    inbox: 'Inbox',
    settings: 'Settings',
    logout: 'Overview',
  }

  function navigate(id: string) {
    if (id === 'logout') {
      setPage('overview')
      return
    }
    setPage(id)
    setTablePage(1)
  }

  return (
    <DashboardShell
      className={full ? 'h-dvh' : 'h-full'}
      title={titles[page] ?? 'Overview'}
      sections={sections}
      activeId={page}
      onNavigate={navigate}
      sidebarOpen={sidebarOpen}
      onSidebarOpenChange={setSidebarOpen}
      search={{ value: search, onChange: setSearch, placeholder: 'Search' }}
      userName="Alex Rivera"
      onUserClick={() => navigate('settings')}
      brandHref="/"
      navActions={
        <IconButton label="Notifications" size="sm" badge={3}>
          <DkNotificationBellAlert size={16} strokeWidth={1.6} absoluteStrokeWidth />
        </IconButton>
      }
      footer={<ThemeToggle />}
    >
      <div className="mx-auto w-full max-w-[980px] px-4 py-8 min-[735px]:px-8 min-[735px]:py-12">
        {page === 'overview' ? (
          <div className="flex flex-col gap-8">
            <div>
              <Breadcrumbs
                items={[
                  { label: 'Workspace', onClick: () => navigate('overview') },
                  { label: 'Overview' },
                ]}
              />
              <PageHeader
                className="mt-4"
                eyebrow="Today"
                title="Overview"
                description="Ship status, revenue, and the work that still needs a decision."
                actions={
                  <div className="w-full min-[735px]:w-[168px]">
                    <Button onClick={() => setInviteOpen(true)}>Invite</Button>
                  </div>
                }
              />
            </div>
            {banner ? (
              <Alert
                tone="info"
                title="Two-factor is off for 3 teammates"
                onDismiss={() => setBanner(false)}
              >
                Ask them to finish setup before Friday.
              </Alert>
            ) : null}
            <div className="grid gap-4 min-[735px]:grid-cols-2 min-[1069px]:grid-cols-4">
              <StatCard label="Revenue" value="$48,290" delta={{ value: '+12%', tone: 'up' }} hint="vs last month" />
              <StatCard label="Active users" value="2,841" delta={{ value: '+4%', tone: 'up' }} hint="vs last week" />
              <StatCard label="Open tickets" value="18" delta={{ value: '−2', tone: 'down' }} hint="this week" />
              <StatCard label="Conversion" value="3.2%" delta={{ value: '0.0%', tone: 'neutral' }} hint="unchanged" />
            </div>
            <Tabs
              aria-label="Projects"
              value={tab}
              onChange={setTab}
              items={[
                { id: 'all', label: 'All' },
                { id: 'live', label: 'Live' },
                { id: 'review', label: 'In review' },
              ]}
            />
            <DataTable
              data={PROJECTS.filter((row) => {
                if (tab === 'live') return row.status === 'Live'
                if (tab === 'review') return row.status === 'In review'
                return true
              })}
              rowKey={(row) => row.id}
              empty={
                <EmptyState
                  size="sm"
                  title="No projects"
                  body="Nothing matches this filter."
                />
              }
              columns={[
                { key: 'name', header: 'Project' },
                {
                  key: 'status',
                  header: 'Status',
                  render: (row) => <Badge tone={statusTone(row.status)}>{row.status}</Badge>,
                },
                { key: 'owner', header: 'Owner', hideOnMobile: true },
                { key: 'updated', header: 'Updated' },
              ]}
            />
          </div>
        ) : null}

        {page === 'projects' ? (
          <div className="flex flex-col gap-8">
            <PageHeader
              title="Projects"
              description="Four active products. Invite a teammate to a workspace."
              actions={
                <div className="w-full min-[735px]:w-[168px]">
                  <Button onClick={() => setInviteOpen(true)}>
                    <span className="inline-flex items-center gap-2">
                      <DkAddPlusCreate size={16} strokeWidth={2} absoluteStrokeWidth />
                      New
                    </span>
                  </Button>
                </div>
              }
            />
            <DataTable
              data={[...PROJECTS]}
              rowKey={(row) => row.id}
              columns={[
                { key: 'name', header: 'Project' },
                {
                  key: 'status',
                  header: 'Status',
                  render: (row) => <Badge tone={statusTone(row.status)}>{row.status}</Badge>,
                },
                { key: 'owner', header: 'Owner', hideOnMobile: true },
                { key: 'updated', header: 'Updated' },
              ]}
            />
            <Pagination page={tablePage} pageCount={3} onChange={setTablePage} />
          </div>
        ) : null}

        {page === 'customers' ? (
          <div className="flex flex-col gap-8">
            <PageHeader title="Customers" description="Loading the latest accounts." />
            <div className="rounded-[18px] border border-border-default bg-bg-elevated p-6 dark:bg-bg-secondary">
              <div className="flex flex-col gap-4">
                {Array.from({ length: 4 }, (_, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Skeleton shape="circle" size="lg" />
                    <div className="min-w-0 flex-1">
                      <Skeleton lines={2} />
                    </div>
                    <Skeleton variant="pill" className="h-6 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {page === 'analytics' ? (
          <div className="flex flex-col gap-8">
            <PageHeader title="Analytics" description="Capacity and conversion for this billing period." />
            <div className="flex flex-col gap-6 rounded-[18px] border border-border-default bg-bg-elevated p-6 min-[735px]:p-8 dark:bg-bg-secondary">
              <Progress label="Seat usage" value={72} />
              <Progress variant="subtle" label="API quota" value={41} />
              <Progress variant="pill" tone="warning" label="Storage" value={88} />
            </div>
          </div>
        ) : null}

        {page === 'inbox' ? (
          <EmptyState
            icon={<DkMessageInboxTray size={36} strokeWidth={1.5} absoluteStrokeWidth />}
            title="Inbox is clear"
            body="New mentions and review requests will land here."
            action={<Button onClick={() => navigate('projects')}>View projects</Button>}
          />
        ) : null}

        {page === 'settings' ? (
          <div className="flex max-w-[480px] flex-col gap-8">
            <PageHeader title="Settings" description="Workspace alerts and a note for your team." />
            <div className="flex flex-col gap-4">
              <Checkbox
                label="Product alerts"
                checked={productAlerts}
                onChange={(event) => setProductAlerts(event.target.checked)}
              />
              <Checkbox
                label="Weekly summary"
                checked={weekly}
                onChange={(event) => setWeekly(event.target.checked)}
              />
              <Checkbox label="SMS backup codes" disabled />
            </div>
            <Textarea
              variant="well"
              icon={<DkPencilWriteEdit size={18} strokeWidth={1.6} absoluteStrokeWidth />}
              placeholder="Internal note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              maxLength={160}
              count
            />
          </div>
        ) : null}
      </div>

      <Modal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        title="Invite a teammate"
        footer={
          <>
            <Button onClick={() => setInviteOpen(false)}>Send invite</Button>
            <Button variant="ghost" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
          </>
        }
      >
        <p className="m-0 mb-4">They’ll get a link to join this workspace.</p>
        <TextField
          icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
          placeholder="Email"
          defaultValue="sam@roboticela.com"
        />
      </Modal>
    </DashboardShell>
  )
}
