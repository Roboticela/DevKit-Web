'use client'

import { cn } from '@/lib/cn'
import {
  landingReels,
  landingReelsHead,
  landingReelsLede,
  landingReelsTitle,
  landingTextLinkMore,
  type LandingLink,
  type LandingSectionProps,
} from '@/lib/landing'
import { mergeContent } from '@/lib/merge-content'
import { AuroraParticles } from './AuroraParticles'
import { HomeShell } from './HomeShell'
import { HomeTextLink } from './HomeTextLink'
import { ReelStrip, type Reel } from './ReelStrip'
import { RevealSection } from './RevealSection'

const REEL_AVATAR = '/reels/previews/avatar.png'

export const REELS_SECTION_ITEMS: Reel[] = [
  {
    id: 'alpine',
    handle: '@wildframes',
    caption: 'Chasing alpine mornings',
    tags: '#mountains #wanderlust #calm',
    audio: 'Alpine Echoes',
    image: '/reels/previews/alpine.png',
    avatar: REEL_AVATAR,
    video: '/reels/cell-cam.mp4',
    to: '/reels',
    views: 2100,
    likes: 8200,
    comments: 214,
    shares: 96,
  },
  {
    id: 'lake',
    handle: '@earthtones',
    caption: 'Still waters, loud thoughts',
    tags: '#lakeside #hiking #peace',
    audio: 'Calm Horizons',
    image: '/reels/previews/lake.png',
    avatar: REEL_AVATAR,
    video: '/reels/cell-hub.mp4',
    to: '/reels',
    views: 3700,
    likes: 11300,
    comments: 308,
    shares: 142,
  },
  {
    id: 'city',
    handle: '@visualstories',
    caption: 'Neon nights and city lights',
    tags: '#nightlife #cityvibes #explore',
    audio: 'Original Audio',
    image: '/reels/previews/city.png',
    avatar: REEL_AVATAR,
    video: '/reels/cell-light.mp4',
    to: '/reels',
    views: 9600,
    likes: 12400,
    comments: 342,
    shares: 120,
  },
  {
    id: 'surf',
    handle: '@saltandswell',
    caption: 'Inside the blue',
    tags: '#surf #ocean #barrel',
    audio: 'Tidal Rush',
    image: '/reels/previews/surf.png',
    avatar: REEL_AVATAR,
    video: '/reels/cell-power.mp4',
    to: '/reels',
    views: 5200,
    likes: 9100,
    comments: 287,
    shares: 133,
  },
  {
    id: 'balloon',
    handle: '@drift.diaries',
    caption: 'Above the canyons',
    tags: '#balloon #goldenhour #travel',
    audio: 'First Light',
    image: '/reels/previews/balloon.png',
    avatar: REEL_AVATAR,
    video: '/reels/cell-speaker.mp4',
    to: '/reels',
    views: 4800,
    likes: 7400,
    comments: 198,
    shares: 88,
  },
  {
    id: 'sunset',
    handle: '@golden.hour',
    caption: 'Sunset state of mind',
    tags: '#sunset #skylover #mood',
    audio: 'Golden Hour',
    image: '/reels/previews/sunset.png',
    avatar: REEL_AVATAR,
    video: '/reels/cell-tag.mp4',
    to: '/reels',
    views: 3100,
    likes: 6800,
    comments: 173,
    shares: 71,
  },
  {
    id: 'desert',
    handle: '@night.trails',
    caption: 'Stars over the dunes',
    tags: '#desert #nightsky #wander',
    audio: 'Quiet Dunes',
    image: '/reels/previews/desert.png',
    avatar: REEL_AVATAR,
    video: '/reels/cell-cam.mp4',
    to: '/reels',
    views: 4400,
    likes: 7900,
    comments: 156,
    shares: 84,
  },
]

export type ReelsSectionContent = {
  title: string
  lede: string
  viewAll: LandingLink
  reels: Reel[]
}

export const REELS_SECTION_CONTENT: ReelsSectionContent = {
  title: 'Watch Us Build',
  lede: "Short clips of what we're working on, before it's finished.",
  viewAll: { label: 'Watch All Reels', href: '/reels' },
  reels: REELS_SECTION_ITEMS,
}

export type ReelsSectionProps = LandingSectionProps<ReelsSectionContent>

export function ReelsSection({ content, className }: ReelsSectionProps = {}) {
  const copy = mergeContent(REELS_SECTION_CONTENT, content)
  return (
    <HomeShell className={className}>
      <RevealSection
        className={landingReels}
        id="reels"
        aria-labelledby="home-reels-title"
        once
        fade={false}
      >
        <AuroraParticles />
        <div className={landingReelsHead}>
          <h2 id="home-reels-title" className={landingReelsTitle}>
            {copy.title}
          </h2>
          <p className={landingReelsLede}>{copy.lede}</p>
          <HomeTextLink className={cn(landingTextLinkMore, 'text-[#3b9eff] hover:text-[#5cadff]')} href={copy.viewAll.href}>
            {copy.viewAll.label}
          </HomeTextLink>
        </div>
        <ReelStrip reels={copy.reels} />
      </RevealSection>
    </HomeShell>
  )
}
