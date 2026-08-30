'use client'

import { adjacentDocs, DOCS_ITEMS } from '@/lib/docs-catalog'
import {
  DocsCard,
  DocsCardGrid,
  DocsContrastCard,
  DocsInlineCode,
  DocsMeasureRow,
  DocsRadiusCard,
  DocsScaleRow,
  DocsStack,
  DocsSwatchGrid,
  DocsTable,
  DocsTokenGroup,
  DocsUsage,
} from './DocsCard'
import { A11ySection, DocsDoDont, DocsPrinciples, DocsProse } from './DocsGuide'
import { DocsHeader, DocsMetaBadges, DocsSectionTitle } from './DocsCopy'
import { DocsPager } from './DocsPager'
import { Anchor } from './Anchor'
import { Body, Caption, Heading, Subhead, type TextVariant } from './Text'

const COLOR_GROUPS = [
  {
    label: 'Brand',
    note: 'The only interactive accent. Hover, active, disabled, and focus exist so a primary button never invents a second blue.',
    tokens: [
      'brand-primary',
      'brand-primary-hover',
      'brand-primary-active',
      'brand-primary-disabled',
      'brand-primary-subtle',
    ],
  },
  {
    label: 'Accent',
    note: 'Teal is reserved for verified, active, and success badges. Never use it as a second call to action.',
    tokens: ['accent-teal', 'accent-teal-subtle'],
  },
  {
    label: 'Semantic',
    note: 'Status color is a supplement, not the message. Pair it with words.',
    tokens: ['success', 'success-subtle', 'warning', 'warning-subtle', 'danger', 'danger-hover', 'danger-subtle'],
  },
  {
    label: 'Text',
    note: 'Primary for headlines, secondary for body, tertiary for captions. Disabled is not a body color.',
    tokens: ['text-primary', 'text-secondary', 'text-tertiary', 'text-disabled', 'text-on-brand', 'text-link'],
  },
  {
    label: 'Background',
    note: 'Secondary is a large surface. Tertiary is a nested control sitting on that surface.',
    tokens: ['bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-elevated', 'bg-hover', 'bg-active'],
  },
  {
    label: 'Border',
    note: 'Default for fields and cards. Subtle for table rows. Strong for a danger zone.',
    tokens: ['border-default', 'border-subtle', 'border-strong', 'border-focus', 'border-danger'],
  },
]

const CONTRAST = [
  { fg: 'text-primary', bg: 'bg-primary', label: 'Headline on page' },
  { fg: 'text-secondary', bg: 'bg-primary', label: 'Body on page' },
  { fg: 'text-tertiary', bg: 'bg-secondary', label: 'Caption on card' },
  { fg: 'text-on-brand', bg: 'brand-primary', label: 'Label on primary' },
  { fg: 'text-link', bg: 'bg-primary', label: 'Inline link' },
  { fg: 'danger', bg: 'danger-subtle', label: 'Error on banner' },
]

const TYPE_ROWS: { role: string; variant: TextVariant; size: string; weight: string; tracking: string; use: string }[] = [
  { role: 'Display', variant: 'display', size: '80px / 40px', weight: '600', tracking: '-0.015em', use: 'One hero idea per screen.' },
  { role: 'Heading 1', variant: 'h1', size: '56px / 32px', weight: '600', tracking: '-0.015em', use: 'Page title.' },
  { role: 'Heading 2', variant: 'h2', size: '40px / 28px', weight: '600', tracking: '-0.01em', use: 'Section title.' },
  { role: 'Heading 3', variant: 'h3', size: '28px / 21px', weight: '600', tracking: '-0.005em', use: 'Card or subsection.' },
  { role: 'Subhead', variant: 'subhead', size: '24px / 19px', weight: '400', tracking: '0', use: 'One line under a heading.' },
  { role: 'Content', variant: 'content', size: '19px / 17px', weight: '400', tracking: '0', use: 'Reading size.' },
  { role: 'Content small', variant: 'content-sm', size: '17px', weight: '400', tracking: '0', use: 'Dense supporting copy.' },
  { role: 'Caption', variant: 'caption', size: '12px', weight: '400', tracking: '0', use: 'Meta, timestamps, hints.' },
  { role: 'Eyebrow', variant: 'eyebrow', size: '12px', weight: '400', tracking: '0.05em', use: 'A short label above a heading.' },
  { role: 'Label', variant: 'label', size: '17px', weight: '500', tracking: '0', use: 'Controls and fields.' },
]

const SPACE = [
  { value: 4, use: 'Icon padding, hairline gaps' },
  { value: 8, use: 'Inline icon-to-label' },
  { value: 12, use: 'Compact stacks' },
  { value: 16, use: 'Field padding, mobile gutters' },
  { value: 24, use: 'Desktop gutters, related blocks' },
  { value: 32, use: 'Card padding' },
  { value: 48, use: 'Grouped sections' },
  { value: 64, use: 'Large section gaps' },
  { value: 96, use: 'Marketing breathing room' },
  { value: 128, use: 'Hero isolation' },
]

const RADII = [
  { value: 8, label: 'Control', use: 'Text fields, compact menus, and 44px inputs.' },
  { value: 12, label: 'Card', use: 'Small cards, grouped lists, and docs panels.' },
  { value: 18, label: 'Panel', use: 'Large cards, images, and dialogs.' },
  { value: 980, label: 'Pill', use: 'Buttons, switches, and chip-like controls.' },
] as const

const BREAKPOINTS = [
  { query: '≤ 734px', label: 'Mobile', padding: '22px', columns: '1, 16px gutters', note: 'Default. Design here first.' },
  { query: '735–1068px', label: 'Tablet', padding: '40px', columns: '12, 24px gutters', note: 'Two columns when the content needs it.' },
  { query: '≥ 1069px', label: 'Desktop', padding: 'min(5vw, 80px)', columns: '12, 24px gutters', note: 'Wide marketing at 1024px, docs at 760px.' },
] as const

const WIDTHS = [
  { value: 692, use: 'Single-column copy' },
  { value: 760, use: 'Docs article' },
  { value: 900, use: 'Wide docs' },
  { value: 980, use: 'Text-focused marketing' },
  { value: 1024, use: 'Marketing sections and site nav' },
] as const

function FoundationFrame({
  slug,
  title,
  description,
  usage,
  tokens,
  extra,
  a11y,
}: {
  slug: string
  title: string
  description: string
  usage: React.ReactNode
  tokens: React.ReactNode
  extra?: React.ReactNode
  a11y: React.ReactNode
}) {
  return (
    <article>
      <DocsHeader crumb={`Components / Foundations / ${title}`} title={title} description={description}>
        <DocsMetaBadges />
      </DocsHeader>
      <section id="usage" className="mt-10 scroll-mt-20">
        <DocsSectionTitle>Usage</DocsSectionTitle>
        {usage}
      </section>
      <section id="tokens" className="mt-12 scroll-mt-20">
        {tokens}
      </section>
      {extra}
      <section id="accessibility" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Accessibility</DocsSectionTitle>
        {a11y}
      </section>
      <DocsPager className="mt-12" {...adjacentDocs(DOCS_ITEMS, slug)} />
    </article>
  )
}

export function FoundationDocs({ slug }: { slug: string }) {
  if (slug === 'colors') {
    return (
      <FoundationFrame
        slug={slug}
        title="Colors"
        description="Tokens for brand, status, type, surfaces, and borders. Use a token so light and dark stay correct."
        usage={
          <DocsUsage>
            <DocsProse>
              <Body>
                Interactive color is a single accent: <DocsInlineCode>--brand-primary</DocsInlineCode>.
                Teal is not a second brand. It marks verified, active, and success. Status red, orange, and green
                appear only when the copy already states the outcome.
              </Body>
            </DocsProse>
            <DocsPrinciples
              items={[
                {
                  title: 'One accent',
                  body: 'Buttons, links, toggles, and focus rings all use brand-primary. Never introduce a competing CTA color.',
                },
                {
                  title: 'Tokens, not hex',
                  body: 'Never mix light-mode and dark-mode hex in the same view. The token swaps both themes.',
                },
                {
                  title: 'Layered surfaces',
                  body: 'Secondary is a large surface. Tertiary is a nested field or chip sitting inside it.',
                },
              ]}
            />
            <DocsDoDont
              doItems={[
                'Use brand-primary for the primary action and inline links.',
                'Use danger only for destructive actions and errors.',
                'Put text-on-brand on filled primary and danger buttons.',
              ]}
              dontItems={[
                'Do not use teal for buttons or links.',
                'Do not set color with a raw hex when a token exists.',
                'Do not place tertiary text on a tertiary background.',
              ]}
            />
          </DocsUsage>
        }
        tokens={
          <>
            <DocsSectionTitle>Tokens</DocsSectionTitle>
            <DocsStack gap={10}>
              {COLOR_GROUPS.map((group) => (
                <DocsTokenGroup key={group.label} title={group.label} note={group.note}>
                  <DocsSwatchGrid tokens={group.tokens} />
                </DocsTokenGroup>
              ))}
            </DocsStack>
          </>
        }
        extra={
          <section id="contrast" className="mt-12 scroll-mt-20">
            <DocsSectionTitle>Contrast</DocsSectionTitle>
            <DocsProse className="mb-6">
              <Body>
                These pairs are the approved reading combinations. Toggle the page theme and confirm each pair still
                holds. If a surface is dark, use the dark-mode token — do not lighten the type by hand.
              </Body>
            </DocsProse>
            <DocsCardGrid columns={2}>
              {CONTRAST.map((item) => (
                <DocsContrastCard key={item.label} fg={item.fg} bg={item.bg} label={item.label} />
              ))}
            </DocsCardGrid>
          </section>
        }
        a11y={
          <A11ySection
            intro="Color is never the only signal. Contrast, wording, and focus have to work together."
            items={[
              'Body and heading text meet WCAG AA against their paired background in both themes.',
              'Focus is a 2px brand ring, not a color shift alone.',
              'Disabled text uses --text-disabled and is not the only cue — the control is also inert.',
              'Error, warning, and success copy repeats the meaning in words, not only in hue.',
              'Do not convey required, selected, or on/off with color alone.',
            ]}
          />
        }
      />
    )
  }

  if (slug === 'typography') {
    return (
      <FoundationFrame
        slug={slug}
        title="Typography"
        description="The type scale for the kit. Size, weight, and tracking live here and the Text components apply them."
        usage={
          <DocsUsage>
            <DocsProse>
              <Body>
                Use Heading, Subhead, and Body in that order. One display line per screen. Do not skip heading levels
                to chase a size — change the visual level, or set <DocsInlineCode>as</DocsInlineCode> when
                the HTML outline needs a different tag.
              </Body>
            </DocsProse>
            <DocsPrinciples
              items={[
                {
                  title: 'Role over size',
                  body: 'Pick Display, H1, or Caption for meaning. The mobile size is already built in.',
                },
                {
                  title: 'One idea',
                  body: 'A heading states the idea. A subhead supports it once. Body carries the rest.',
                },
                {
                  title: 'System font',
                  body: 'SF Pro / system UI. No custom webfont. Tracking is already on the variant.',
                },
              ]}
            />
            <DocsDoDont
              doItems={[
                'Start with Heading, then Subhead, then Body.',
                'Keep captions at 12px for meta only — not essential reading.',
                'Use Label on fields and controls, not as a paragraph.',
              ]}
              dontItems={[
                'Do not skip from h1 to h3 because h3 looks closer to the design.',
                'Do not set font-size by hand when a Text variant exists.',
                'Do not use display more than once in a viewport.',
              ]}
            />
            <Anchor href="/components/text" variant="standalone" size="md">
              Open Text
            </Anchor>
          </DocsUsage>
        }
        tokens={
          <>
            <DocsSectionTitle>Scale</DocsSectionTitle>
            <DocsTable
              columns={['Role', 'Component', 'Size', 'Weight', 'Tracking', 'Use']}
              minWidth="640px"
              monoColumns={[1, 2, 4]}
              rows={TYPE_ROWS.map((row) => [row.role, row.variant, row.size, row.weight, row.tracking, row.use])}
            />
          </>
        }
        extra={
          <section id="stack" className="mt-12 scroll-mt-20">
            <DocsSectionTitle>Stack</DocsSectionTitle>
            <DocsCard padding="lg" className="flex flex-col gap-3">
              <Caption as="span" className="uppercase tracking-[0.05em]">
                Product
              </Caption>
              <Heading>Almost before we knew it, we had left the ground.</Heading>
              <Subhead>Use Heading, Subhead, and Body. Keep one idea per block.</Subhead>
              <Body>
                The stack is the default reading order on marketing pages, docs, and empty states. Pair it with a
                single primary action when the screen needs one.
              </Body>
            </DocsCard>
          </section>
        }
        a11y={
          <A11ySection
            intro="The visual scale and the document outline are separate. Keep both honest."
            items={[
              'Heading renders a real h1–h3 (display is an h1). Do not fake headings with bold Body.',
              'Do not skip levels. An h1 is followed by h2, not h3.',
              'When the visual size and the outline disagree, keep the correct tag and pass as.',
              'Caption at 12px is supporting copy. Do not put essential instructions there.',
              'Danger and success tones are not enough — the sentence must still make sense in grayscale.',
              'Line length stays near 692px for reading. Wider layouts are for chrome, not paragraphs.',
            ]}
          />
        }
      />
    )
  }

  if (slug === 'spacing') {
    return (
      <FoundationFrame
        slug={slug}
        title="Spacing"
        description="The only spacing steps the kit uses. Pick the nearest value on this scale instead of inventing a new gap."
        usage={
          <DocsUsage>
            <DocsProse>
              <Body>
                Spacing is layout, not decoration. Related items sit 8–16px apart. Distinct groups sit 24–48px apart.
                Section padding is 88px on small screens and 140px on desktop.
              </Body>
            </DocsProse>
            <DocsPrinciples
              items={[
                { title: 'Closed scale', body: '4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Nothing else.' },
                { title: 'Inside, then out', body: 'Pad a card 32px. Separate cards 24px. Separate sections 88px or 140px.' },
                { title: 'Touch first', body: 'Interactive rows and buttons stay at least 44px tall, matching fields.' },
              ]}
            />
            <DocsDoDont
              doItems={[
                'Use 8px between an icon and its label.',
                'Use 24px gutters on desktop grids, 16px on mobile.',
                'Match vertical rhythm to the type: 12px under a caption, 24px under a heading.',
              ]}
              dontItems={[
                'Do not use odd values such as 10, 18, or 20.',
                'Do not add drop shadows to fake separation — space and surface color do that.',
                'Do not shrink a control below 44px to save a few pixels.',
              ]}
            />
          </DocsUsage>
        }
        tokens={
          <>
            <DocsSectionTitle>Tokens</DocsSectionTitle>
            <DocsStack gap={3}>
              {SPACE.map((item) => (
                <DocsMeasureRow key={item.value} value={item.value} width={item.value} caption={item.use} />
              ))}
            </DocsStack>
          </>
        }
        a11y={
          <A11ySection
            intro="Space helps people parse a screen. It is not a substitute for headings, names, or focus."
            items={[
              'Keep at least 44×44px for pointer and touch targets.',
              'Do not rely on proximity alone to show a control belongs to a label — associate them in the DOM.',
              'Respect reduced motion; spacing does not animate independently of the kit easing.',
              'On small screens, 22px edge padding keeps content off the device chrome.',
            ]}
          />
        }
      />
    )
  }

  if (slug === 'radius') {
    return (
      <FoundationFrame
        slug={slug}
        title="Radius"
        description="Corner rounding for fields, cards, panels, and pills. Match the radius to what the object is."
        usage={
          <DocsUsage>
            <DocsProse>
              <Body>
                Radius signals what the object is. A pill is an action. An 8px corner is an input. An 18px corner is a
                surface you look at, not a control you press. Nested radii step down — a 18px card contains 12px or 8px
                children, never a larger radius inside a smaller one.
              </Body>
            </DocsProse>
            <DocsPrinciples
              items={[
                { title: 'Four values', body: '8, 12, 18, and 980. 980 reads as a pill at any size.' },
                { title: 'Nested step-down', body: 'The inner radius is smaller than the outer, or they share the same step.' },
                { title: 'No shadows', body: 'Elevation is background, not a drop shadow. Radius is enough to separate.' },
              ]}
            />
            <DocsDoDont
              doItems={[
                'Use 980px on Button, Switch, and other pill controls.',
                'Use 8px on Text Field, Select, and 44px inputs.',
                'Use 18px on modals, large cards, and product images.',
              ]}
              dontItems={[
                'Do not mix a pill button with 8px siblings in an attached toolbar without flattening both.',
                'Do not use 4px or 16px — they are not on the scale.',
                'Do not round only one corner unless the layout is a clustered SegmentedToolbar.',
              ]}
            />
          </DocsUsage>
        }
        tokens={
          <>
            <DocsSectionTitle>Tokens</DocsSectionTitle>
            <DocsCardGrid columns={2}>
              {RADII.map((item) => (
                <DocsRadiusCard key={item.value} value={item.value} label={item.label} use={item.use} />
              ))}
            </DocsCardGrid>
          </>
        }
        a11y={
          <A11ySection
            items={[
              'Radius is visual only. It does not change hit area — keep 44px controls.',
              'Focus rings follow the same radius as the control so the outline does not clip.',
              'Do not reduce contrast at corners with extra borders; use --border-default.',
            ]}
          />
        }
      />
    )
  }

  if (slug === 'layout') {
    return (
      <FoundationFrame
        slug={slug}
        title="Layout"
        description="Breakpoints, content widths, and page padding. Start from the small screen and add columns as the viewport grows."
        usage={
          <DocsUsage>
            <DocsProse>
              <Body>
                Design the small screen, then add columns. Edge padding is 22px below 735px, 40px through tablet, and
                up to 80px on desktop. Content never stretches past its max width — extra space becomes margin, not
                wider type.
              </Body>
            </DocsProse>
            <DocsPrinciples
              items={[
                { title: 'Mobile first', body: 'Base styles are the small screen. min-[735px] and min-[1069px] add layout, not the other way around.' },
                { title: 'One column to read', body: '692px for copy. 760px for docs. 1024px for marketing chrome.' },
                { title: '12 columns', body: '24px gutters on desktop, 16px on mobile. Do not invent a 16-column grid.' },
              ]}
            />
            <DocsDoDont
              doItems={[
                'Collapse navigation into a sheet below 735px.',
                'Keep a single primary action visible without horizontal scroll.',
                'Use full-width controls in forms on mobile; inline them from tablet up.',
              ]}
              dontItems={[
                'Do not hide essential actions behind hover on a touch breakpoint.',
                'Do not let paragraphs grow with the viewport past 692px.',
                'Do not use a desktop-only sidebar as the only way to navigate.',
              ]}
            />
          </DocsUsage>
        }
        tokens={
          <DocsStack gap={10}>
            <div>
              <DocsSectionTitle>Breakpoints</DocsSectionTitle>
              <DocsTable
                columns={['Range', 'Name', 'Edge padding', 'Grid', 'Note']}
                minWidth="560px"
                monoColumns={[0, 2]}
                rows={BREAKPOINTS.map((row) => [row.query, row.label, row.padding, row.columns, row.note])}
              />
            </div>
            <DocsTokenGroup title="Content width">
              <DocsStack gap={3}>
                {WIDTHS.map((item) => (
                  <DocsScaleRow
                    key={item.value}
                    value={item.value}
                    bar={item.value}
                    max={1024}
                    caption={item.use}
                  />
                ))}
              </DocsStack>
            </DocsTokenGroup>
          </DocsStack>
        }
        a11y={
          <A11ySection
            intro="Layout has to reflow. If it only works at 1440px, it is not done."
            items={[
              'The page remains usable at 320px and at 200% zoom without clipping essential controls.',
              'Landmarks belong on the shell: a banner for Site Nav, navigation for sidebars, main for the article.',
              'Do not trap keyboard focus in a column that is visually hidden on mobile.',
              'Sticky chrome stays 44px and does not cover the focused field when the keyboard opens.',
              'Prefer CSS grid and flex wrap over horizontal scroll for primary content.',
            ]}
          />
        }
      />
    )
  }

  return null
}
