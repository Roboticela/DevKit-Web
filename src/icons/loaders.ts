// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CompactGlyph, IconNode } from './types'

export const PACK_LOADERS: Record<string, () => Promise<{ default: Record<string, CompactGlyph> }>> = {
  ai: () => import('./data/ai.json'),
  bi: () => import('./data/bi.json'),
  bs: () => import('./data/bs.json'),
  cg: () => import('./data/cg.json'),
  ci: () => import('./data/ci.json'),
  di: () => import('./data/di.json'),
  fa: () => import('./data/fa.json'),
  fa6: () => import('./data/fa6.json'),
  fc: () => import('./data/fc.json'),
  fi: () => import('./data/fi.json'),
  gi: () => import('./data/gi.json'),
  go: () => import('./data/go.json'),
  gr: () => import('./data/gr.json'),
  hi: () => import('./data/hi.json'),
  hi2: () => import('./data/hi2.json'),
  im: () => import('./data/im.json'),
  io: () => import('./data/io.json'),
  io5: () => import('./data/io5.json'),
  lia: () => import('./data/lia.json'),
  lu: () => import('./data/lu.json'),
  md: () => import('./data/md.json'),
  pi: () => import('./data/pi.json'),
  ri: () => import('./data/ri.json'),
  rx: () => import('./data/rx.json'),
  si: () => import('./data/si.json'),
  sl: () => import('./data/sl.json'),
  tb: () => import('./data/tb.json'),
  tfi: () => import('./data/tfi.json'),
  ti: () => import('./data/ti.json'),
  vsc: () => import('./data/vsc.json'),
  wi: () => import('./data/wi.json'),
}

export const loadLucideData = () => import('./data/lucide.json') as Promise<{ default: Record<string, IconNode> }>
