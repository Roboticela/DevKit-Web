'use client'

import {
  Cable,
  CircleHelp,
  Clapperboard,
  Cloud,
  Fingerprint,
  Headphones,
  KeyRound,
  Layers,
  PenTool,
  Play,
  RefreshCw,
  Shield,
  Smartphone,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import type { CatalogIcon } from './landing-catalog'
const ICONS: Record<CatalogIcon, LucideIcon> = {
  studio: PenTool,
  canvas: Layers,
  devices: Smartphone,
  cloud: Cloud,
  audio: Headphones,
  accessories: Cable,
  signin: Fingerprint,
  recovery: KeyRound,
  sync: RefreshCw,
  help: CircleHelp,
  account: UserRound,
  security: Shield,
  reel: Clapperboard,
  clip: Play,
}

const SIZES = {
  sm: 16,
  md: 20,
  lg: 36,
  xl: 72,
} as const

export function CategoryIcon({
  name,
  size = 'md',
}: {
  name?: CatalogIcon
  size?: keyof typeof SIZES
}) {
  if (!name) return null
  const Glyph = ICONS[name]
  const px = SIZES[size]
  return <Glyph size={px} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />
}
