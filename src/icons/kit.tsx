/* eslint-disable @next/next/no-img-element */
import type { ComponentType } from 'react'
import { createLucideIcon } from './create-icon'
import type { LucideProps } from './types'

type KitIconProps = Pick<
  LucideProps,
  'size' | 'className' | 'title' | 'color' | 'strokeWidth' | 'absoluteStrokeWidth'
>

export function DkRoboticelaBrandLogo({ size = 24, className, title }: KitIconProps) {
  const dim = Number(size) || 24

  return (
    <span
      className={['inline-flex shrink-0 items-center justify-center overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
      style={{ width: dim, height: dim }}
      role="img"
      aria-label={title ?? 'Roboticela'}
    >
      <img
        src="/roboticela-mark.svg"
        alt=""
        width={dim}
        height={dim}
        className="block size-full object-contain"
        draggable={false}
        decoding="async"
      />
    </span>
  )
}

export const DkProductBrandMarkBadge = createLucideIcon('dk-product-brand-mark-badge', [
  ['rect', { x: '4', y: '4', width: '16', height: '16', rx: '4' }],
  ['path', { d: 'M9 9h3.5a2.5 2.5 0 0 1 0 5H9V9z' }],
  ['path', { d: 'M9 14h4' }],
])

export const DkAccessTokenKeyhole = createLucideIcon('dk-access-token-keyhole', [
  ['rect', { x: '4', y: '4', width: '16', height: '16', rx: '4' }],
  ['circle', { cx: '12', cy: '12', r: '3.5' }],
  ['path', { d: 'M12 8.5v7' }],
])

export const DkLayeredStackPlanes = createLucideIcon('dk-layered-stack-planes', [
  ['path', { d: 'M4.5 8.5 12 4.5l7.5 4L12 12.5z' }],
  ['path', { d: 'M4.5 12.5 12 16.5l7.5-4' }],
  ['path', { d: 'M4.5 16.5 12 20.5l7.5-4' }],
])

export const DkProductSparkleHighlightBurst = createLucideIcon('dk-product-sparkle-highlight-burst', [
  ['path', { d: 'm12 3 1.35 5.15L18.5 9.5 13.35 11.85 12 17l-1.35-5.15L5.5 9.5l5.15-1.35z' }],
  ['path', { d: 'M18.5 15.5 19.2 18l2.3.7-2.3.7-.7 2.5-.7-2.5-2.3-.7 2.3-.7z' }],
])

export const DkBranchingFlowNodes = createLucideIcon('dk-branching-flow-nodes', [
  ['circle', { cx: '6', cy: '12', r: '2.5' }],
  ['circle', { cx: '18', cy: '7', r: '2.5' }],
  ['circle', { cx: '18', cy: '17', r: '2.5' }],
  ['path', { d: 'M8.5 11.2c2.4-.4 4.2-2.2 6.8-3.2' }],
  ['path', { d: 'M8.5 12.8c2.4.4 4.2 2.2 6.8 3.2' }],
])

export const DkTypographyLetterformsPair = createLucideIcon('dk-typography-letterforms-pair', [
  ['path', { d: 'M5 6h9' }],
  ['path', { d: 'M9.5 6v12' }],
  ['path', { d: 'M7 18h5' }],
  ['path', { d: 'M14.5 11h5' }],
  ['path', { d: 'M17 11v7' }],
])

export const DkColorSwatchTiles = createLucideIcon('dk-color-swatch-tiles', [
  ['rect', { x: '4', y: '4', width: '10.5', height: '10.5', rx: '2.5' }],
  ['path', { d: 'M14.5 9.5h2.5A3 3 0 0 1 20 12.5v5A2.5 2.5 0 0 1 17.5 20h-5a3 3 0 0 1-3-3v-2.5' }],
])

export const DkInsertionSlotPlus = createLucideIcon('dk-insertion-slot-plus', [
  ['rect', { x: '4', y: '4', width: '16', height: '16', rx: '4' }],
  ['path', { d: 'M12 8.5v7' }],
  ['path', { d: 'M8.5 12h7' }],
])

export const DkDocumentPageFold = createLucideIcon('dk-document-page-fold', [
  ['path', { d: 'M7 4.5h7.5L19 9v10.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 7 19.5z' }],
  ['path', { d: 'M14.5 4.5V9H19' }],
  ['path', { d: 'M9.5 13h5' }],
  ['path', { d: 'M9.5 16.5h3.5' }],
])

export const DkSignalPulseRings = createLucideIcon('dk-signal-pulse-rings', [
  ['circle', { cx: '12', cy: '12', r: '2' }],
  ['circle', { cx: '12', cy: '12', r: '5.5' }],
  ['circle', { cx: '12', cy: '12', r: '9' }],
])

export const DkSourceCodeChevronsPair = createLucideIcon('dk-source-code-chevrons-pair', [
  ['path', { d: 'm8 8-4 4 4 4' }],
  ['path', { d: 'm16 8 4 4-4 4' }],
  ['path', { d: 'm13.2 6-2.4 12' }],
])

export const DkLightDarkContrastSplit = createLucideIcon('dk-light-dark-contrast-split', [
  ['circle', { cx: '12', cy: '12', r: '8' }],
  ['path', { d: 'M12 4a8 8 0 0 0 0 16z', fill: 'currentColor' }],
])

export const DkHexagonNodeHub = createLucideIcon('dk-hexagon-node-hub', [
  ['path', { d: 'M12 4.5 19 9v6l-7 4.5L5 15V9z' }],
  ['circle', { cx: '12', cy: '12', r: '1.5' }],
])

export const DkArtboardCropMarksFrame = createLucideIcon('dk-artboard-crop-marks-frame', [
  ['path', { d: 'M8 5H6a1 1 0 0 0-1 1v2' }],
  ['path', { d: 'M16 5h2a1 1 0 0 1 1 1v2' }],
  ['path', { d: 'M8 19H6a1 1 0 0 1-1-1v-2' }],
  ['path', { d: 'M16 19h2a1 1 0 0 0 1-1v-2' }],
  ['rect', { x: '8.5', y: '8.5', width: '7', height: '7', rx: '1.5' }],
])

export const DkLinkedChainBind = createLucideIcon('dk-linked-chain-bind', [
  ['path', { d: 'M9.2 14.8 8 16a3.4 3.4 0 1 1 0-4.8l3-3A3.4 3.4 0 0 1 15.8 8' }],
  ['path', { d: 'M14.8 9.2 16 8a3.4 3.4 0 1 1 0 4.8l-3 3A3.4 3.4 0 0 1 8.2 16' }],
])

export const DkDotGridMatrix = createLucideIcon('dk-dot-grid-matrix', [
  ['circle', { cx: '7', cy: '7', r: '1.2' }],
  ['circle', { cx: '12', cy: '7', r: '1.2' }],
  ['circle', { cx: '17', cy: '7', r: '1.2' }],
  ['circle', { cx: '7', cy: '12', r: '1.2' }],
  ['circle', { cx: '12', cy: '12', r: '2' }],
  ['circle', { cx: '17', cy: '12', r: '1.2' }],
  ['circle', { cx: '7', cy: '17', r: '1.2' }],
  ['circle', { cx: '12', cy: '17', r: '1.2' }],
  ['circle', { cx: '17', cy: '17', r: '1.2' }],
])

export const DkGithubOctocatBrandLogo = createLucideIcon('dk-github-octocat-brand-logo', [
  [
    'path',
    {
      fill: 'currentColor',
      stroke: 'none',
      d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-1.024-.015-1.86-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z',
    },
  ],
])

export const KIT_ICONS: { name: string; Icon: ComponentType<KitIconProps> }[] = [
  { name: 'DkRoboticelaBrandLogo', Icon: DkRoboticelaBrandLogo },
  { name: 'DkProductBrandMarkBadge', Icon: DkProductBrandMarkBadge },
  { name: 'DkAccessTokenKeyhole', Icon: DkAccessTokenKeyhole },
  { name: 'DkLayeredStackPlanes', Icon: DkLayeredStackPlanes },
  { name: 'DkProductSparkleHighlightBurst', Icon: DkProductSparkleHighlightBurst },
  { name: 'DkBranchingFlowNodes', Icon: DkBranchingFlowNodes },
  { name: 'DkTypographyLetterformsPair', Icon: DkTypographyLetterformsPair },
  { name: 'DkColorSwatchTiles', Icon: DkColorSwatchTiles },
  { name: 'DkInsertionSlotPlus', Icon: DkInsertionSlotPlus },
  { name: 'DkDocumentPageFold', Icon: DkDocumentPageFold },
  { name: 'DkSignalPulseRings', Icon: DkSignalPulseRings },
  { name: 'DkSourceCodeChevronsPair', Icon: DkSourceCodeChevronsPair },
  { name: 'DkLightDarkContrastSplit', Icon: DkLightDarkContrastSplit },
  { name: 'DkHexagonNodeHub', Icon: DkHexagonNodeHub },
  { name: 'DkArtboardCropMarksFrame', Icon: DkArtboardCropMarksFrame },
  { name: 'DkLinkedChainBind', Icon: DkLinkedChainBind },
  { name: 'DkDotGridMatrix', Icon: DkDotGridMatrix },
  { name: 'DkGithubOctocatBrandLogo', Icon: DkGithubOctocatBrandLogo },
]
