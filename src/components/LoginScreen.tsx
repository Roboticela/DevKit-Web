'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { GlassSurface } from './GlassSurface'
import { PasswordField } from './PasswordField'
import { Avatar } from './Avatar'
import { HomeTextLink } from './HomeTextLink'

export type UserAccount = {
  id: string
  name: string
  avatar: string
  email?: string
}

/** Login Screen (67) — user selector + glass password field, same look as Sign In. */
export function LoginScreen({
  users,
  defaultUser,
  onUserSelect,
  onPasswordSubmit,
  className,
}: {
  users: UserAccount[]
  defaultUser?: string
  onUserSelect: (id: string) => void
  onPasswordSubmit: (id: string, password: string) => void
  className?: string
}) {
  const [selected, setSelected] = useState<string | undefined>(defaultUser)
  const [password, setPassword] = useState('')
  const [focused, setFocused] = useState(false)

  // Fix: remove the duplicate useState import issue
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit() {
    onPasswordSubmit?.(selected ?? '', password)
    setFocused(false)
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-6 py-8',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-3">
        {users.map((user) => (
          <button
            key={user.id}
            type="button"
            onClick={() => {
              setSelected(user.id)
              setFocused(true)
            }}
            className={cn(
              'flex flex-col items-center gap-2',
              selected === user.id ? 'outline-none' : 'cursor-pointer',
              focused && selected === user.id && 'ring-2 ring-brand-primary ring-offset-2',
            )}
          >
            <Avatar src={user.avatar} size="xl" />
            <span className="text-[15px] font-medium text-text-primary">{user.name}</span>
            {user.email ? <span className="text-[12px] text-text-tertiary">{user.email}</span> : null}
          </button>
        ))}
        <div className="mt-2 h-px w-24 bg-[var(--border-subtle)]" />
        <a
          href="#"
          onClick={() => onUserSelect?.(users[0].id)}
          className="text-[13px] font-medium text-brand-primary hover:underline"
        >
          Switch User
        </a>
      </div>
      <GlassSurface weight="modal" className="w-full max-w-sm">
        <PasswordField
          placeholder="Enter your password"
          autoComplete="current-password"
          icon={
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          }
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
            setFocused(true)
          }}
          onKeyDown={(event) => event.key === 'Enter' && handleSubmit()}
          className="!bg-[var(--bg-tertiary)] !border-[var(--border-subtle)] focus:!border-[var(--border-focus)] focus:!ring-2 focus:!ring-[var(--brand-primary)] focus:!ring-offset-[var(--bg-tertiary)]"
        />
        <p
          className="mt-2 text-center text-[13px] text-text-tertiary"
        >
          Or press Enter to unlock
        </p>
      </GlassSurface>
    </div>
  )
}
