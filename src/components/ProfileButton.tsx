import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Avatar } from './Avatar'

export function ProfileButton({
  src,
  name,
  className,
  ...rest
}: {
  src?: string | null
  name?: string
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex size-8 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border-default bg-bg-secondary p-0',
        'dark:bg-bg-secondary',
        className,
      )}
      aria-label={name ? `${name} profile` : 'Profile'}
      {...rest}
    >
      <Avatar src={src} name={name} size="md" className="border-0" />
    </button>
  )
}
