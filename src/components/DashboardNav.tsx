'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import {
  DkNavigationMenuBars,
  DkCloseDismissCancel
} from '@/icons'
import { cn } from '@/lib/cn'
import { BrandLogo } from './BrandLogo'
import { IconButton } from './IconButton'
import { NavSearch, type NavSearchSize, type NavSearchVariant } from './NavSearch'
import { ProfileButton } from './ProfileButton'
import { Label } from './Text'

export function DashboardNav({
  title,
  search,
  menuOpen = false,
  onMenuClick,
  userName,
  userImage,
  onUserClick,
  actions,
  brandHref,
  showBrand = true,
  className,
}: {
  title?: string
  search?: {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    variant?: NavSearchVariant
    size?: NavSearchSize
    shortcut?: string
    loading?: boolean
    disabled?: boolean
  }
  menuOpen?: boolean
  onMenuClick?: () => void
  userName?: string
  userImage?: string | null
  onUserClick?: () => void
  actions?: ReactNode
  brandHref?: string
  showBrand?: boolean
  className?: string
}) {
  return (
    <header
      className={cn(
        'relative z-[2] grid h-[52px] shrink-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border-default bg-bg-primary px-4',
        'min-[735px]:grid-cols-[1fr_auto_1fr] min-[735px]:gap-4 min-[735px]:px-6',
        className,
      )}
    >
      <div className="flex items-center gap-2 justify-self-start">
        {onMenuClick ? (
          <IconButton
            label={menuOpen ? 'Close menu' : 'Open menu'}
            size="sm"
            className="min-[735px]:hidden"
            aria-expanded={menuOpen}
            onClick={onMenuClick}
          >
            {menuOpen ? (
              <DkCloseDismissCancel size={18} strokeWidth={1.6} absoluteStrokeWidth />
            ) : (
              <DkNavigationMenuBars size={18} strokeWidth={1.6} absoluteStrokeWidth />
            )}
          </IconButton>
        ) : null}
        {showBrand ? (
          brandHref ? (
            <Link href={brandHref} className="flex items-center text-text-primary no-underline">
              <BrandLogo variant="text" size={18} labelClassName="hidden min-[735px]:inline" />
            </Link>
          ) : (
            <BrandLogo variant="text" size={18} labelClassName="hidden min-[735px]:inline" />
          )
        ) : null}
      </div>

      {title ? (
        <Label as="h1" className="min-w-0 justify-self-start truncate min-[735px]:justify-self-center">
          {title}
        </Label>
      ) : (
        <span />
      )}

      <div className="flex items-center justify-self-end gap-2 min-[735px]:gap-3">
        {search ? (
          <NavSearch
            value={search.value}
            onChange={search.onChange}
            placeholder={search.placeholder}
            variant={search.variant}
            size={search.size}
            shortcut={search.shortcut}
            loading={search.loading}
            disabled={search.disabled}
          />
        ) : null}
        {actions}
        {onUserClick || userName || userImage ? (
          <ProfileButton src={userImage} name={userName} onClick={onUserClick} />
        ) : null}
      </div>
    </header>
  )
}
