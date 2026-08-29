import { cn } from './cn'

export const EASE = 'ease-[cubic-bezier(0.28,0.11,0.32,1)]'

export const FOCUS_RING = cn(
  'outline-none',
  'focus:border-brand-primary',
  'focus:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
)

export const FOCUS_VISIBLE_RING = cn(
  'outline-none',
  'focus-visible:border-brand-primary',
  'focus-visible:shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
)

export const OPEN_RING = cn(
  'border-brand-primary',
  'shadow-[0_0_0_2px_var(--brand-primary-focus-ring)]',
)

export const FIELD_INVALID = cn(
  'outline-none',
  'border-danger dark:border-danger',
  'aria-[invalid=true]:border-danger dark:aria-[invalid=true]:border-danger',
  'focus:border-danger dark:focus:border-danger',
  'aria-[invalid=true]:focus:border-danger dark:aria-[invalid=true]:focus:border-danger',
  'focus:shadow-[0_0_0_2px_var(--danger-focus-ring)]',
)

export const FIELD_VALID = cn(
  'outline-none',
  'border-success',
  'focus:border-success',
  'focus:shadow-[0_0_0_2px_var(--success-focus-ring)]',
)

export const FIELD_SURFACE =
  'border-border-default bg-bg-elevated text-text-primary dark:border-border-default dark:bg-bg-secondary'

export const AUTH_FIELD_SURFACE =
  'border-border-default bg-bg-elevated text-text-primary dark:border-border-strong dark:bg-bg-primary'

export const CONTROL_TRIGGER = cn(
  'flex h-11 w-full items-center gap-3 rounded-[12px] border px-4 pr-3.5 text-left font-sans text-[15px] font-normal',
  FIELD_SURFACE,
  'cursor-pointer transition-[border-color,box-shadow] duration-150',
  EASE,
  FOCUS_VISIBLE_RING,
  'disabled:cursor-not-allowed disabled:opacity-55',
)

export const MENU_SURFACE = cn(
  'z-50 flex flex-col overflow-hidden rounded-2xl border border-border-default bg-bg-elevated p-2.5 text-text-primary',
  'box-border dark:bg-bg-secondary',
  'origin-top animate-select-in',
)

export const MENU_SEARCH_INPUT = cn(
  'h-9 w-full rounded-[10px] border border-border-default bg-bg-hover px-3 pl-9 font-sans text-sm text-text-primary caret-text-primary',
  'placeholder:text-text-tertiary',
  FOCUS_RING,
)

export const MENU_OPTION = cn(
  'flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-[10px] border-0 bg-transparent px-2.5 text-left font-sans text-text-primary',
  'transition-colors duration-150',
  EASE,
  'hover:bg-bg-hover focus-visible:bg-bg-hover focus-visible:outline-none',
  'disabled:cursor-not-allowed disabled:opacity-[0.48] disabled:hover:bg-transparent',
)

export const PILL_BUTTON = cn(
  'inline-flex cursor-pointer items-center justify-center rounded-[980px] font-sans font-medium leading-none',
  'transition-colors duration-150 ease-linear',
)
