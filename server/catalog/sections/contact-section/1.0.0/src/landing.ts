import { cn } from './cn'
import { EASE } from './styles'

export type LandingLink = {
  label: string
  href: string
}

export type LandingSectionProps<T> = {
  content?: Partial<T>
  className?: string
}

export const landingEase = EASE

export const landingFocus = cn(
  'focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-blue',
)

export const landingShell = cn(
  'box-border min-h-dvh max-w-full overflow-x-hidden bg-bg-primary font-sans text-text-primary antialiased',
  '[--scene-bleed:min(48vh,420px)]',
)

export const landingReveal = 'relative overflow-visible'
export const landingRevealScene = cn(
  'pointer-events-none absolute inset-x-0 z-0 overflow-visible',
  'top-[calc(-1*var(--scene-bleed))] bottom-[calc(-1*var(--scene-bleed))]',
)
export const landingRevealSceneFlush = 'pointer-events-none absolute inset-0 z-0 overflow-visible'
export const landingRevealCopy = 'relative z-[3] w-full'

export const landingInner = 'mx-auto w-full max-w-[1024px] text-center'
export const landingInnerHero = 'mx-auto w-full max-w-[692px] text-center'
export const landingInnerCopy = 'mx-auto w-full max-w-[692px] text-center'
export const landingInnerWide = 'mx-auto w-full max-w-[980px] text-center'
export const landingInnerServices = 'mx-auto w-full max-w-[1024px] text-center'

export const landingHero = cn(
  'relative flex min-h-dvh flex-col items-center justify-center overflow-visible text-center',
  'px-[22px] pt-[88px] pb-16',
  'min-[735px]:px-10 min-[735px]:pt-[140px] min-[735px]:pb-[100px]',
  'min-[1069px]:px-[min(5vw,80px)]',
)

export const landingSection = cn(
  'relative scroll-mt-11 overflow-visible px-[22px] py-[88px]',
  'min-[735px]:px-10 min-[735px]:py-[140px]',
  'min-[1069px]:px-[min(5vw,80px)]',
)

export const landingSectionAlt = 'bg-bg-secondary'
export const landingSectionBase = 'bg-bg-primary'

export const landingDisplay = cn(
  'm-0 max-w-none text-[40px] font-semibold tracking-[-0.015em] text-text-primary',
  'leading-[1.05] min-[735px]:text-[80px]',
)

export const landingHeadline = cn(
  'm-0 text-[32px] font-semibold tracking-[-0.015em] text-text-primary leading-[1.07]',
  'min-[735px]:text-[56px]',
)

export const landingHeadlineCompact = cn(
  'm-0 text-[32px] font-semibold tracking-[-0.01em] text-text-primary leading-[1.1]',
  'min-[735px]:text-[40px]',
)

export const landingLede = cn(
  'mx-auto mt-4 max-w-[692px] text-[17px] font-normal leading-[1.47] text-text-secondary',
  'min-[735px]:text-[19px] min-[735px]:leading-[1.42]',
)

export const landingLedeTight = cn(
  'mx-auto mt-2 max-w-[692px] text-[17px] font-normal leading-[1.47] text-text-tertiary',
)

export const landingHeroBody = cn(
  'mx-auto mt-6 max-w-[560px] text-[19px] font-normal leading-[1.33] text-gray-500',
  'min-[735px]:text-2xl',
)

export const landingHeroTagline =
  'mx-auto mt-3 max-w-[560px] text-[17px] font-normal leading-[1.47] text-text-tertiary/90'

export const landingActions = 'mt-8 flex flex-wrap justify-center gap-3'
export const landingActionsHero = 'mt-10 flex flex-wrap justify-center gap-4'
export const landingActionsContact = 'mt-[168px] flex flex-wrap justify-center gap-4 min-[735px]:mt-[224px]'

export const landingBtn = cn(
  'inline-flex h-[50px] items-center justify-center rounded-[980px] px-[22px] no-underline',
  'text-[17px] font-medium leading-none transition-colors duration-150',
  landingEase,
  landingFocus,
  'min-[735px]:h-11',
)

export const landingBtnPrimary = cn(
  landingBtn,
  'border border-brand-primary bg-brand-primary text-text-on-brand',
  'hover:border-brand-primary-hover hover:bg-brand-primary-hover',
  'active:border-brand-primary-active active:bg-brand-primary-active',
)

export const landingBtnQuiet = cn(
  landingBtn,
  'border border-btn-secondary-border bg-btn-secondary-bg text-btn-secondary-text',
  'hover:border-brand-primary hover:bg-btn-secondary-hover-bg hover:text-text-on-brand',
  'active:border-brand-primary-active active:bg-brand-primary-active active:text-text-on-brand',
)

export const landingBtnQuietFill = cn(landingBtnQuiet, 'bg-bg-secondary')

export const landingEyebrow = cn(
  'm-0 mb-6 text-[14px] font-semibold uppercase tracking-[0.06em] leading-[1.33] text-blue',
)

export const landingIdeaTitle = cn(
  'm-0 text-[32px] font-semibold tracking-[-0.01em] text-text-primary leading-[1.1]',
  'min-[735px]:whitespace-nowrap min-[735px]:text-[48px]',
)

export const landingIdeaProse =
  'mx-auto mt-6 max-w-[600px] text-[19px] font-normal leading-[1.5] text-text-secondary'

export const landingTrustProse =
  'mx-auto max-w-[600px] text-[17px] font-normal leading-[1.6] text-text-secondary'

export const landingTrustClose =
  'mx-auto mt-6 max-w-[600px] text-[19px] font-medium leading-[1.42] text-text-primary'

export const landingTextLink = cn(
  'mt-8 inline-flex items-center gap-1.5 text-[17px] font-medium leading-none text-blue no-underline',
  'transition-colors duration-300',
  landingEase,
  'hover:text-blue-hover hover:no-underline',
  landingFocus,
)

export const landingTextLinkMore = 'mt-4 text-sm font-medium'

export const landingReels = cn(
  'relative isolate max-w-full overflow-x-hidden overflow-y-visible bg-black px-0 py-[72px] text-white',
  'min-[735px]:py-[120px]',
)

export const landingReelsHead =
  'relative z-[3] mx-auto mb-16 w-full max-w-[692px] px-[22px] text-center before:pointer-events-none before:absolute before:-inset-x-12 before:-top-20 before:-bottom-6 before:z-[-1] before:bg-[radial-gradient(circle_at_50%_40%,color-mix(in_srgb,var(--brand-primary)_8%,transparent),transparent_60%)] before:content-[\'\']'

export const landingReelsTitle =
  'm-0 text-[40px] font-semibold tracking-[-0.01em] leading-[1.1] text-white'

export const landingReelsLede =
  'mx-auto mt-2 text-[17px] font-normal leading-[1.47] text-[#a1a1a6]'

export const landingBuilding = cn(
  'relative overflow-hidden bg-bg-primary pt-0 pr-0 pb-[calc(27vh-16px)] pl-0',
  'min-[735px]:pb-[calc(27vh-20px)]',
)

export const landingBuildingPin = cn(
  'relative min-h-[min(100svh,880px)] overflow-visible pb-40',
  'min-[735px]:min-h-[min(100svh,920px)] min-[735px]:pb-[200px]',
)

export const landingBuildingCanvas = cn(
  'pointer-events-none absolute right-0 left-0 z-0 w-full max-w-full overflow-hidden opacity-0',
  'top-[calc(-1*min(16vh,120px))] -bottom-[30vh]',
  'transition-opacity duration-300',
)

export const landingBuildingContent = cn(
  'relative z-[1] mx-auto max-w-[692px] px-6 pt-[72px] pb-10 text-center',
  'min-[735px]:px-6 min-[735px]:pt-24 min-[735px]:pb-12',
)

export const landingBuildingEyebrow = cn(
  landingEyebrow,
  'tracking-[0.12em]',
)

export const landingBuildingHeadline = cn(
  'm-0 text-[40px] font-semibold tracking-[-0.01em] leading-[1.25] text-text-primary',
  'max-[760px]:text-[28px]',
)

export const landingBuildingProse =
  'mx-auto mt-6 max-w-[600px] text-[19px] font-normal leading-[1.5] text-text-secondary'
