'use client'

import Link from './link'
import { cn } from './cn'
import { landingBtnPrimary, landingFocus } from './landing'
export type ProductCardContent = {
  slug: string
  name: string
  lede: string
  image: string
  href: string
  tone: 'light' | 'dark'
}

export const PRODUCT_MARQUEE_HERO: ProductCardContent = {
  slug: 'hub',
  name: 'Hub',
  lede: 'Paired in one tap. Quiet on the desk.',
  image: '/products/showcase-hub.png',
  href: '/products/device-kit/hub',
  tone: 'light',
}

export const PRODUCT_MARQUEE_ITEMS: ProductCardContent[] = [
  {
    slug: 'air-line',
    name: 'Air Line',
    lede: 'All-day wireless. Tuned for voice and music.',
    image: '/products/showcase-air-line.png',
    href: '/products/audio/air-line',
    tone: 'light',
  },
  {
    slug: 'key',
    name: 'Key',
    lede: 'A passkey you can hold. Built for travel.',
    image: '/products/showcase-key.png',
    href: '/products/device-kit/key',
    tone: 'dark',
  },
  {
    slug: 'light',
    name: 'Light',
    lede: 'A calm, smart light for any space.',
    image: '/products/showcase-light.png',
    href: '/products/accessories',
    tone: 'light',
  },
  {
    slug: 'cam',
    name: 'Cam',
    lede: 'See the room. Stay out of the way.',
    image: '/products/showcase-cam.png',
    href: '/products/device-kit',
    tone: 'dark',
  },
]

function ProductCard({
  unit,
  hero = false,
  cta,
}: {
  unit: ProductCardContent
  hero?: boolean
  cta: string
}) {
  return (
    <Link
      className={cn(
        'relative flex flex-col items-center overflow-hidden text-center no-underline',
        landingFocus,
        hero
          ? 'min-h-[560px] px-[22px] pt-16 min-[735px]:min-h-[680px] min-[735px]:px-10 min-[735px]:pt-20 min-[1069px]:min-h-[740px] min-[1069px]:pt-[88px]'
          : 'min-h-[520px] px-[22px] pt-12 min-[735px]:min-h-[620px] min-[735px]:px-8 min-[735px]:pt-16',
        unit.tone === 'dark' ? 'bg-black text-white' : 'bg-[#e8f4f8] text-text-primary',
        hero && unit.tone === 'light' && 'bg-[radial-gradient(circle_at_50%_42%,#d7eef8_0%,#e8f4f8_42%,#ffffff_78%)]',
      )}
      href={unit.href}
      aria-label={`${unit.name}. ${cta}`}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={unit.image}
          alt=""
          width={hero ? 1600 : 900}
          height={hero ? 900 : 1200}
          className="block size-full object-cover object-bottom"
        />
      </div>
      <div className="relative z-[1] flex w-full max-w-[692px] flex-none flex-col items-center">
        <h3
          className={cn(
            'm-0 font-semibold',
            hero
              ? 'text-[40px] tracking-[-0.015em] leading-[1.07] min-[735px]:text-[56px]'
              : 'text-[32px] tracking-[-0.01em] leading-[1.1] min-[735px]:text-[40px]',
          )}
        >
          {unit.name}
        </h3>
        <p
          className={cn(
            'mt-2 mb-0 max-w-[520px] font-normal leading-[1.33]',
            hero ? 'text-[19px] min-[735px]:text-2xl' : 'text-[19px] min-[735px]:text-[21px]',
            unit.tone === 'dark' ? 'text-white' : 'text-text-primary',
          )}
        >
          {unit.lede}
        </p>
        <span className={cn(landingBtnPrimary, 'mt-5')}>{cta}</span>
      </div>
    </Link>
  )
}

export function ProductMarquee({
  hero = PRODUCT_MARQUEE_HERO,
  items = PRODUCT_MARQUEE_ITEMS,
  cta = 'Learn more',
}: {
  hero?: ProductCardContent
  items?: ProductCardContent[]
  cta?: string
}) {
  return (
    <div className="ml-[calc(50%-50vw)] w-screen max-w-[100vw] px-3 pb-3">
      <ProductCard unit={hero} hero cta={cta} />
      <div className="mt-3 grid grid-cols-1 gap-3 p-0 min-[735px]:grid-cols-2">
        {items.map((unit) => (
          <ProductCard key={unit.slug} unit={unit} cta={cta} />
        ))}
      </div>
    </div>
  )
}
