import { cn } from './cn'
import { EASE } from './styles'

export const landingSelectRoot = 'relative w-full font-sans'

export const landingSelectTrigger = cn(
  'flex h-11 w-full items-center gap-3 rounded-xl border border-border-default bg-bg-elevated px-4 pr-3.5',
  'text-left font-sans text-[15px] font-normal text-text-primary',
  'transition-[border-color] duration-150 dark:bg-bg-secondary',
  EASE,
  'disabled:cursor-not-allowed disabled:opacity-55',
  'focus-visible:border-brand-primary focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand-primary-focus-ring',
)

export const landingSelectTriggerOpen = cn(
  'border-brand-primary outline-2 outline-offset-0 outline-brand-primary-focus-ring',
)

export const landingSelectLeading =
  'inline-flex size-[22px] h-4 shrink-0 items-center justify-center overflow-hidden rounded-[3px] text-text-tertiary [&_img]:block [&_img]:size-full [&_img]:rounded-[3px] [&_img]:object-cover'

export const landingSelectValue = 'min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap'

export const landingSelectPlaceholder = 'text-text-tertiary'

export const landingSelectChevron = cn(
  'inline-flex shrink-0 text-text-tertiary transition-transform duration-200',
  EASE,
)

export const landingSelectChevronOpen = 'rotate-180'

export const landingSelectMenu = cn(
  'z-50 flex flex-col overflow-hidden rounded-2xl border border-border-default bg-bg-elevated p-2.5 text-text-primary',
  'origin-top animate-select-in dark:bg-bg-secondary',
  'motion-reduce:animate-none',
)

export const landingSelectMenuUp = 'origin-bottom'

export const landingSelectSearch = 'relative mb-2 shrink-0'

export const landingSelectSearchIcon =
  'pointer-events-none absolute top-1/2 left-3 inline-flex -translate-y-1/2 text-text-tertiary'

export const landingSelectSearchInput = cn(
  'h-9 w-full rounded-[10px] border border-border-default bg-bg-hover py-0 pr-3 pl-9',
  'font-sans text-sm text-text-primary caret-text-primary outline-none placeholder:text-text-tertiary',
  'focus-visible:border-brand-primary focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand-primary-focus-ring',
)

export const landingSelectList = 'min-h-0 flex-1 overflow-x-hidden overflow-y-auto'

export const landingSelectEmpty = 'm-0 px-3 py-6 text-center text-sm text-text-tertiary'

export const landingSelectOption = cn(
  'flex min-h-11 w-full items-center gap-3 rounded-[10px] border-0 bg-transparent px-2.5 py-0',
  'text-left font-sans text-text-primary transition-colors duration-150',
  EASE,
  'hover:bg-bg-hover focus-visible:bg-bg-hover focus-visible:outline-none',
  'disabled:cursor-not-allowed disabled:opacity-[0.48] disabled:hover:bg-transparent disabled:focus-visible:bg-transparent',
)

export const landingSelectOptionUnavailable =
  'cursor-not-allowed opacity-[0.48] hover:bg-transparent focus-visible:bg-transparent'

export const landingSelectOptionLeading =
  'inline-flex h-[18px] w-6 shrink-0 items-center justify-center overflow-hidden rounded-[3px] text-text-tertiary [&_img]:block [&_img]:h-[18px] [&_img]:w-6 [&_img]:rounded-[3px] [&_img]:object-cover'

export const landingSelectOptionCopy = 'flex min-w-0 flex-1 items-baseline justify-between gap-3'

export const landingSelectOptionName = 'min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-normal'

export const landingSelectOptionNameSelected = 'font-medium'

export const landingSelectOptionCode = 'shrink-0 text-xs font-medium tracking-[0.02em] text-text-tertiary'

export const landingSelectCheck = 'shrink-0 text-brand-primary'
