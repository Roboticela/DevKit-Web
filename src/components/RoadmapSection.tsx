'use client'

import { BuildingToward, ROADMAP_SECTION_CONTENT, type RoadmapSectionContent } from './BuildingToward'
import { HomeShell } from './HomeShell'
import { type LandingSectionProps } from '@/lib/landing'

export type { RoadmapSectionContent }
export { ROADMAP_SECTION_CONTENT }

export type RoadmapSectionProps = LandingSectionProps<RoadmapSectionContent>

export function RoadmapSection({ content, className }: RoadmapSectionProps = {}) {
  return (
    <HomeShell className={className}>
      <BuildingToward content={content} />
    </HomeShell>
  )
}
