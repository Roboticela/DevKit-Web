'use client'

import {
  AVAILABLE_CURSOR_PACKS,
  ROBOCURSORS_LIST,
} from '@/lib/robocursors-data'
import { Badge } from './Badge'
import { CursorPreview } from './CursorPreview'
import { DocsHeader, DocsSectionTitle } from './DocsCopy'
import { DocsInlineCode, DocsUsage } from './DocsCard'
import { Card, CardGrid } from './Card'
import { RuleCard } from './RuleCard'
import { DocsPager } from './DocsPager'
import { Body, Caption } from './Text'

export function CursorsDocs() {
  return (
    <article className="min-w-0 pb-16">
      <DocsHeader
        crumb="Foundations"
        title="Cursor Packs"
        description="Comprehensive vector cursor collections for RoboticelaOS and modern web apps. Choose a pack below to launch its interactive testing playground and export assets in dual-theme SVG or native .rcur binary format."
      />

      {/* Guidance */}
      <section id="overview" className="mt-8 scroll-mt-20">
        <DocsSectionTitle>Architecture & Formats</DocsSectionTitle>
        <DocsUsage>
          <Body>
            DevKit organizes cursors into cohesive system packs. Every pack defines calibrated hotspot anchors and provides both standards-compliant vector SVGs and single-file binary containers.
          </Body>
          <CardGrid columns={3} gap="sm">
            <Card
              variant="subtle"
              size="sm"
              eyebrow="01"
              title="Dedicated Studios"
              description="Each pack features its own playground where you can test live affordances, resizers, and drawing tools."
            />
            <Card
              variant="subtle"
              size="sm"
              eyebrow="02"
              title="Dual-Theme Adaptive"
              description="SVGs dynamically adjust colors between light and dark modes via CSS variables and media queries."
            />
            <Card
              variant="subtle"
              size="sm"
              eyebrow="03"
              title="RoboCursor (.rcur)"
              description="A custom binary container bundling multi-resolution PNGs, theme variants, and animated frame timings."
            />
          </CardGrid>
          <CardGrid columns={2} gap="sm">
            <RuleCard
              size="sm"
              tone="success"
              title="Do"
              items={[
                'Click into a pack studio to test its cursors in real interactive UI scenarios.',
                'Import SVG files directly for standard CSS cursor: url(...) implementations.',
                'Use the .rcur loader when multi-density raster caching and wait animations are required.',
              ]}
            />
            <RuleCard
              size="sm"
              tone="danger"
              title="Don’t"
              items={[
                'Do not mix cursors from different visual packs within the same desktop interface.',
                'Do not omit hotspot coordinates when applying cursors to custom containers.',
                'Do not hardcode dark mode cursors in light theme views.',
              ]}
            />
          </CardGrid>
        </DocsUsage>
      </section>

      {/* CURSOR PACKS SECTION */}
      <section id="packs" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Available Cursor Packs</DocsSectionTitle>
        <Body className="mb-6">
          Click any pack card to enter its interactive playground and access its full cursor directory, hotspot blueprints, and code exports.
        </Body>

        <div className="grid grid-cols-1 gap-4 max-w-3xl">
          {AVAILABLE_CURSOR_PACKS.map((pack) => (
            <Card
              key={pack.id}
              variant="subtle"
              size="md"
              href={`/components/cursors/${pack.id}`}
              className="cursor-pointer transition-colors hover:border-border-strong"
              title={pack.name}
              description={
                pack.description ??
                `${pack.totalCursors} vector cursors calibrated with pixel-exact hotspots, dual-theme adaptation, and animated wait spinners.`
              }
            >
              {/* Visual Preview Grid of all cursors */}
              <div className="mt-4 grid grid-cols-6 sm:grid-cols-9 gap-2 rounded-xl bg-bg-secondary p-3 transition-colors">
                {ROBOCURSORS_LIST.map((cursor) => (
                  <div
                    key={cursor.id}
                    className="flex aspect-square items-center justify-center rounded-lg bg-bg-primary shadow-xs"
                    title={`${cursor.title} (${cursor.stateName})`}
                  >
                    <CursorPreview cursorOrId={cursor} className="size-6" />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* SUPPORTED FORMATS */}
      <section id="formats" className="mt-14 scroll-mt-20">
        <DocsSectionTitle>Supported Export Formats</DocsSectionTitle>
        <Body className="mb-4">
          All cursors in every pack can be consumed in both standard web vector formats and high-performance binary formats.
        </Body>

        <CardGrid columns={2} gap="sm">
          <Card
            variant="subtle"
            size="sm"
            eyebrow="Web Vector"
            title="SVG & CSS Data URLs"
            description="Crisp at any screen resolution, fully editable in design tools, and compatible with all modern browsers via standard CSS cursor: url(...) rules."
          >
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge variant="pill" size="sm">Pure SVG</Badge>
              <Badge variant="pill" size="sm">Tailwind CSS</Badge>
              <Badge variant="pill" size="sm">React JSX</Badge>
            </div>
          </Card>

          <Card
            variant="subtle"
            size="sm"
            eyebrow="Native Container"
            title="RoboCursor (.rcur)"
            description="Single-file binary container bundling 32px, 48px, and 64px pre-rasterized frames, dark/light themes, and animation timing into one zero-dependency file."
          >
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge variant="pill" size="sm">Multi-Density</Badge>
              <Badge variant="pill" size="sm">Animated Spinners</Badge>
              <Badge variant="pill" size="sm">TypeScript Loader</Badge>
            </div>
          </Card>
        </CardGrid>
      </section>

      {/* STATE ID REGISTRY TABLE */}
      <section id="states-table" className="mt-14 scroll-mt-20">
        <DocsSectionTitle>Standard State ID Registry</DocsSectionTitle>
        <Body className="mb-4">
          The standardized enum table used across all RoboticelaOS cursor packs for runtime lookup.
        </Body>

        <div className="overflow-hidden rounded-xl border border-border-default bg-bg-surface">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border-default bg-bg-secondary text-text-tertiary font-mono uppercase">
              <tr>
                <th className="p-3">State ID</th>
                <th className="p-3">State Name</th>
                <th className="p-3">Standard Hotspot (32px)</th>
                <th className="p-3">RoboticelaOS Mapping</th>
                <th className="p-3">Affordance / Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default/50 font-mono">
              {ROBOCURSORS_LIST.map((c) => (
                <tr key={c.id} className="hover:bg-bg-secondary/60 transition-colors">
                  <td className="p-3 font-semibold text-brand-primary">{c.stateId}</td>
                  <td className="p-3 text-text-primary">{c.stateName}</td>
                  <td className="p-3 text-text-secondary">({c.hotspot32.x}, {c.hotspot32.y})</td>
                  <td className="p-3 text-text-tertiary">{c.filename}</td>
                  <td className="p-3 font-sans text-text-secondary">{c.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <DocsPager
        prev={{ href: '/components/icons', label: 'Icons' }}
        next={{ href: '/components/brand-logo', label: 'Brand Logo' }}
      />
    </article>
  )
}
