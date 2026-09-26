'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { ListRow } from '@/components/ListRow'
import { IconButton } from '@/components/IconButton'
import { Badge } from '@/components/Badge'
import {
  DkChevronCaretRight as ChevronRight,
  DkChevronCaretDown as ChevronDown,
  DkChevronCaretLeft as ChevronLeft,
  DkHomeHouse as Home,
  DkFolderDirectory as Folder,
  DkStarFavoriteRating as Star,
  DkStarFavoriteRating as Tag,
  DkCloseDismissCancel as X,
  DkAppDashboardLayoutTiles,
  DkEnvelopeMessageMail,
  DkTerminalCommandLine,
  DkShoppingBagPurchase,
  DkRadiantSunDaylightAppearance,
  DkGearSettingsPreferences,
  DkPeopleUsersGroup,
  DkNotificationBellAlert,
  DkNavigationMenuBars,
  DkInformationCircleDetails,
  DkCalendarDateSchedule,
  DkPlayMediaTriangle,
  DkMessageInboxTray,
  DkDesktopComputerDisplayScreen,
  DkChartLine,
  DkChartColumnIncreasing,
  DkDevicesDesktopAndMobile,
  DkSecurityShieldProtect,
} from '@/icons'

const FAVORITES = [
  { id: 'desktop', label: 'Desktop', icon: <Folder size={16} strokeWidth={1.6} />, path: '/Desktop', pinned: true },
  { id: 'documents', label: 'Documents', icon: <Folder size={16} strokeWidth={1.6} />, path: '/Documents', pinned: true },
  { id: 'downloads', label: 'Downloads', icon: <Folder size={16} strokeWidth={1.6} />, path: '/Downloads', pinned: true },
  { id: 'applications', label: 'Applications', icon: <Folder size={16} strokeWidth={1.6} />, path: '/Applications', pinned: true },
] as const

const LOCATIONS = [
  { id: 'desktop', label: 'Desktop', path: '/Desktop', icon: <Folder size={16} strokeWidth={1.6} /> },
  { id: 'documents', label: 'Documents', path: '/Documents', icon: <Folder size={16} strokeWidth={1.6} /> },
  { id: 'downloads', label: 'Downloads', path: '/Downloads', icon: <Folder size={16} strokeWidth={1.6} /> },
  { id: 'applications', label: 'Applications', path: '/Applications', icon: <Folder size={16} strokeWidth={1.6} /> },
  { id: 'home', label: 'Home', path: '/Users/alex', icon: <Home size={16} strokeWidth={1.6} /> },
  { id: 'trash', label: 'Trash', path: '/Trash', icon: <X size={16} strokeWidth={1.6} /> },
] as const

const TAGS = [
  { id: 'tag-work', label: 'Work', color: '#3b82f6' },
  { id: 'tag-personal', label: 'Personal', color: '#10b981' },
  { id: 'tag-photos', label: 'Photos', color: '#f59e0b' },
] as const

function TagDot({ color }: { color: string }) {
  return <span className="inline-flex size-2 rounded-full" style={{ backgroundColor: color }} />
}

const APPS = [
  { id: 'calculator', label: 'Calculator', icon: <DkPlayMediaTriangle size={16} strokeWidth={1.6} /> },
  { id: 'notes', label: 'Notes', icon: <DkMessageInboxTray size={16} strokeWidth={1.6} /> },
  { id: 'calendar', label: 'Calendar', icon: <DkCalendarDateSchedule size={16} strokeWidth={1.6} /> },
  { id: 'mail', label: 'Mail', icon: <DkEnvelopeMessageMail size={16} strokeWidth={1.6} /> },
  { id: 'terminal', label: 'Terminal', icon: <DkTerminalCommandLine size={16} strokeWidth={1.6} /> },
  { id: 'store', label: 'App Store', icon: <DkShoppingBagPurchase size={16} strokeWidth={1.6} /> },
  { id: 'screensaver', label: 'Screensaver', icon: <DkRadiantSunDaylightAppearance size={16} strokeWidth={1.6} /> },
] as const

const SETTINGS = [
  { id: 'general', label: 'General', icon: <DkAppDashboardLayoutTiles size={16} strokeWidth={1.6} /> },
  { id: 'wallpaper', label: 'Wallpaper', icon: <DkDesktopComputerDisplayScreen size={16} strokeWidth={1.6} /> },
  { id: 'dock', label: 'Dock & Menu Bar', icon: <DkNavigationMenuBars size={16} strokeWidth={1.6} /> },
  { id: 'displays', label: 'Displays', icon: <DkDesktopComputerDisplayScreen size={16} strokeWidth={1.6} /> },
  { id: 'sound', label: 'Sound', icon: <DkChartLine size={16} strokeWidth={1.6} /> },
  { id: 'network', label: 'Network / Wi-Fi', icon: <DkDevicesDesktopAndMobile size={16} strokeWidth={1.6} /> },
  { id: 'bluetooth', label: 'Bluetooth', icon: <DkSecurityShieldProtect size={16} strokeWidth={1.6} /> },
  { id: 'storage', label: 'Storage', icon: <DkChartColumnIncreasing size={16} strokeWidth={1.6} /> },
  { id: 'users', label: 'Users & Accounts', icon: <DkPeopleUsersGroup size={16} strokeWidth={1.6} /> },
  { id: 'battery', label: 'Battery / Energy', icon: <DkMessageInboxTray size={16} strokeWidth={1.6} /> },
  { id: 'notifications', label: 'Notifications', icon: <DkNotificationBellAlert size={16} strokeWidth={1.6} /> },
  { id: 'accessibility', label: 'Accessibility', icon: <DkSecurityShieldProtect size={16} strokeWidth={1.6} /> },
  { id: 'focus', label: 'Focus Modes', icon: <DkNavigationMenuBars size={16} strokeWidth={1.6} /> },
  { id: 'about', label: 'About', icon: <DkInformationCircleDetails size={16} strokeWidth={1.6} /> },
] as const

/** Sidebar (72) — Favorites, Locations, Tags + Apps + full OS Settings shell. */
export function FilesSidebar({
  favorites,
  onFavoriteMove,
}: {
  favorites: string[]
  onFavoriteMove: (from: number, to: number) => void
}) {
  const [collapsed, setCollapsed] = useState<string | null>(null)

  const toggleSection = (id: string) => {
    setCollapsed((prev) => (prev === id ? null : id))
  }

  return (
    <div className="flex h-full flex-col overflow-hidden border-r border-[var(--border-subtle)] bg-[var(--bg-tertiary)]">
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-[13px] font-medium text-text-primary">Sidebar</span>
        <IconButton
          label="Collapse sidebar"
          size="sm"
          variant="ghost"
          onClick={() => setCollapsed((prev) => (prev === 'all' ? null : 'all'))}
        >
          <ChevronLeft size={16} strokeWidth={1.6} />
        </IconButton>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-2">
        <section className="sidebar-section">
          <button
            className="sidebar-section-header"
            onClick={() => toggleSection('favorites')}
            aria-expanded={collapsed !== 'favorites'}
          >
            <span className="flex items-center gap-2">
              <Star size={14} strokeWidth={1.6} className="text-text-tertiary" />
              Favorites
            </span>
            <ChevronRight
              size={14}
              strokeWidth={1.6}
              className={cn('transition-transform duration-200', collapsed === 'favorites' && 'rotate-90')}
            />
          </button>
          {collapsed !== 'favorites' ? (
            <div className="sidebar-section-items">
              <div className="mt-2 flex flex-col gap-0.5">
                {FAVORITES.map((fav, index) => (
                  <button
                    key={fav.id}
                    type="button"
                    className="w-full flex items-center gap-2 rounded-[var(--radius-md)] px-3 py-2 text-left text-[14px] text-text-primary hover:bg-[var(--brand-primary-subtle)]"
                    onClick={() => {}}
                  >
                    <span className="shrink-0">{fav.icon}</span>
                    <span className="flex-1 truncate">{fav.label}</span>
                    {fav.pinned && <Badge size="sm">pin</Badge>}
                    {index > 0 && (
                      <IconButton
                        label="Move favorite"
                        size="sm"
                        variant="ghost"
                        className="-mr-1"
                        onClick={(event) => {
                          event.stopPropagation()
                          onFavoriteMove(index, index - 1)
                        }}
                      >
                        <ChevronDown size={14} strokeWidth={1.6} />
                      </IconButton>
                    )}
                    {index < favorites.length - 1 && (
                      <IconButton
                        label="Move favorite"
                        size="sm"
                        variant="ghost"
                        className="-mr-1"
                        onClick={(event) => {
                          event.stopPropagation()
                          onFavoriteMove(index, index + 1)
                        }}
                      >
                        <ChevronDown size={14} strokeWidth={1.6} />
                      </IconButton>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <div className="mt-4 sidebar-section">
          <button
            className="sidebar-section-header"
            onClick={() => toggleSection('locations')}
            aria-expanded={collapsed !== 'locations'}
          >
            <span className="flex items-center gap-2">
              <Folder size={14} strokeWidth={1.6} className="text-text-tertiary" />
              Locations
            </span>
            <ChevronRight
              size={14}
              strokeWidth={1.6}
              className={cn('transition-transform duration-200', collapsed === 'locations' && 'rotate-90')}
            />
          </button>
          {collapsed !== 'locations' ? (
            <div className="sidebar-section-items">
              <div className="mt-2 flex flex-col gap-0.5">
                {LOCATIONS.map((loc) => (
                  <ListRow
                    key={loc.id}
                    title={loc.label}
                    leading={<span className="shrink-0">{loc.icon}</span>}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-4 sidebar-section">
          <button
            className="sidebar-section-header"
            onClick={() => toggleSection('tags')}
            aria-expanded={collapsed !== 'tags'}
          >
            <span className="flex items-center gap-2">
              <Tag size={14} strokeWidth={1.6} className="text-text-tertiary" />
              Tags
            </span>
            <ChevronRight
              size={14}
              strokeWidth={1.6}
              className={cn('transition-transform duration-200', collapsed === 'tags' && 'rotate-90')}
            />
          </button>
          {collapsed !== 'tags' ? (
            <div className="sidebar-section-items">
              <div className="mt-2 flex flex-col gap-1 px-3">
                {TAGS.map((tag) => (
                  <ListRow
                    key={tag.id}
                    title={tag.label}
                    leading={<TagDot color={tag.color} />}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-4 sidebar-section">
          <button
            className="sidebar-section-header"
            onClick={() => toggleSection('apps')}
            aria-expanded={collapsed !== 'apps'}
          >
            <span className="flex items-center gap-2">
              <DkAppDashboardLayoutTiles size={14} strokeWidth={1.6} className="text-text-tertiary" />
              Applications
            </span>
            <ChevronRight
              size={14}
              strokeWidth={1.6}
              className={cn('transition-transform duration-200', collapsed === 'apps' && 'rotate-90')}
            />
          </button>
          {collapsed !== 'apps' ? (
            <div className="sidebar-section-items">
              <div className="mt-2 flex flex-col gap-0.5">
                {APPS.map((app) => (
                  <ListRow
                    key={app.id}
                    title={app.label}
                    leading={<span className="shrink-0">{app.icon}</span>}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-4 sidebar-section">
          <button
            className="sidebar-section-header"
            onClick={() => toggleSection('settings')}
            aria-expanded={collapsed !== 'settings'}
          >
            <span className="flex items-center gap-2">
              <DkGearSettingsPreferences size={14} strokeWidth={1.6} className="text-text-tertiary" />
              OS Settings
            </span>
            <ChevronRight
              size={14}
              strokeWidth={1.6}
              className={cn('transition-transform duration-200', collapsed === 'settings' && 'rotate-90')}
            />
          </button>
          {collapsed !== 'settings' ? (
            <div className="sidebar-section-items">
              <div className="mt-2 flex flex-col gap-0.5">
                {SETTINGS.map((setting) => (
                  <ListRow
                    key={setting.id}
                    title={setting.label}
                    leading={<span className="shrink-0">{setting.icon}</span>}
                    onClick={() => {}}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
