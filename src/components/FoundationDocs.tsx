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
  StateStack,
  DocsSwatchGrid,
  DocsTable,
  DocsTokenGroup,
  DocsUsage,
} from './DocsCard'
import { Card, CardGrid } from './Card'
import { Alert } from './Alert'
import { RuleCard } from './RuleCard'
import { DocsHeader, DocsSectionTitle } from './DocsCopy'
import { DocsPager } from './DocsPager'
import { Anchor } from './Anchor'
import { Body, Caption, Heading, Subhead, type TextVariant } from './Text'

const COLOR_GROUPS = [
  {
    label: 'Brand',
    note: 'Your main interactive color. We provide variations for hover, active, disabled, and focus states so everything looks polished.',
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
    note: 'A special teal color used exclusively for success messages, verified badges, and active status indicators.',
    tokens: ['accent-teal', 'accent-teal-subtle'],
  },
  {
    label: 'Semantic',
    note: 'Status colors that enhance your messages. These always work together with clear text to communicate meaning.',
    tokens: ['success', 'success-subtle', 'warning', 'warning-subtle', 'danger', 'danger-hover', 'danger-subtle'],
  },
  {
    label: 'Text',
    note: 'Text colors optimized for different purposes. Primary for headlines, secondary for body text, and tertiary for supporting information.',
    tokens: ['text-primary', 'text-secondary', 'text-tertiary', 'text-disabled', 'text-on-brand', 'text-link'],
  },
  {
    label: 'Background',
    note: 'Background colors that create depth and organization. From the main background to subtle surfaces and interactive states.',
    tokens: ['bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-elevated', 'bg-hover', 'bg-active'],
  },
  {
    label: 'Border',
    note: 'Border colors for different contexts. From subtle separators to prominent borders for important sections.',
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
  { value: 1024, use: 'Wide sections' },
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
      <DocsHeader crumb={`Components / Foundations / ${title}`} title={title} description={description} />
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
        description="A beautiful color palette that adapts perfectly to both light and dark themes, giving your interface a premium look."
        usage={
          <DocsUsage>
              <Body>
                We use one primary color for all interactive elements like buttons and links, creating a consistent and familiar experience.
                Teal is reserved for special success messages and verification badges. Status colors like red, orange, and green 
                always appear alongside clear text to make sure everyone understands the message.
              </Body>
            <CardGrid columns={3} gap="sm">
              <Card variant="subtle" size="sm" eyebrow="01" title="Consistent experience" description="Every button, link, and interactive element uses the same primary color, making your interface feel unified and professional." />
              <Card variant="subtle" size="sm" eyebrow="02" title="Smart color system" description="Our colors automatically adjust between light and dark themes, so your content always looks perfect no matter which mode users prefer." />
              <Card variant="subtle" size="sm" eyebrow="03" title="Clear visual hierarchy" description="Different background layers help organize your content naturally, making it easy for users to focus on what matters most." />
            </CardGrid>
            <CardGrid columns={2} gap="sm">
              <RuleCard size="sm" tone="success" title="Do" items={[
                'Use the primary color for your main action buttons and links.',
                'Reserve red for delete actions and error messages only.',
                'Make sure button text stands out clearly against its background.',
              ]} />
              <RuleCard size="sm" tone="danger" title="Don’t" items={[
                'Avoid using teal for buttons or regular links.',
                'Keep colors consistent across light and dark themes.',
                'Make sure there is always enough contrast for easy reading.',
              ]} />
            </CardGrid>
          </DocsUsage>
        }
        tokens={
          <>
            <DocsSectionTitle>Tokens</DocsSectionTitle>
            <StateStack gap={10}>
              {COLOR_GROUPS.map((group) => (
                <DocsTokenGroup key={group.label} title={group.label} note={group.note}>
                  <DocsSwatchGrid tokens={group.tokens} />
                </DocsTokenGroup>
              ))}
            </StateStack>
          </>
        }
        extra={
          <section id="contrast" className="mt-12 scroll-mt-20">
            <DocsSectionTitle>Contrast</DocsSectionTitle>
            <Body className="mb-6">
                These color combinations are carefully chosen to ensure excellent readability in both light and dark themes. 
                Switch between themes to see how they automatically adapt while maintaining perfect contrast and clarity.
              </Body>
            <DocsCardGrid columns={2}>
              {CONTRAST.map((item) => (
                <DocsContrastCard key={item.label} fg={item.fg} bg={item.bg} label={item.label} />
              ))}
            </DocsCardGrid>
          </section>
        }
        a11y={
                    <Alert title="Requirements">
            <p className="m-0">{"We design with everyone in mind. Colors work together with clear words and visual cues to create an accessible experience."}</p>
            <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
              <li>{"All text is easy to read with excellent contrast in both light and dark themes."}</li>
              <li>{"Focused elements have a clear visual indicator, making keyboard navigation effortless."}</li>
              <li>{"Disabled elements are visually distinct and clearly cannot be interacted with."}</li>
              <li>{"Important messages always include both color and text to ensure everyone understands."}</li>
              <li>{"Required fields, selections, and toggles are clearly marked with more than just color."}</li>
            </ul>
          </Alert>
        }
      />
    )
  }

  if (slug === 'typography') {
    return (
      <FoundationFrame
        slug={slug}
        title="Typography"
        description="Beautiful, readable text styles that create a clear visual hierarchy and make your content easy to scan."
        usage={
          <DocsUsage>
              <Body>
                Text styles are organized in a natural hierarchy from large headlines to body text and captions. This helps users
                quickly understand your content and navigate through it with ease. Each style is optimized for its specific purpose.
              </Body>
            <CardGrid columns={3} gap="sm">
              <Card variant="subtle" size="sm" eyebrow="01" title="Clear purpose" description="Each text style has a specific purpose, from grabbing attention with headlines to providing details with body text." />
              <Card variant="subtle" size="sm" eyebrow="02" title="Natural flow" description="Headlines introduce ideas, subheadings provide context, and body text explains the details in a smooth, logical order." />
              <Card variant="subtle" size="sm" eyebrow="03" title="Native feel" description="We use your system fonts, so everything feels familiar and loads instantly without any extra downloads." />
            </CardGrid>
            <CardGrid columns={2} gap="sm">
              <RuleCard size="sm" tone="success" title="Do" items={[
                'Start with clear headlines, followed by supportive subheadings and detailed body text.',
                'Use small text for secondary information like timestamps and metadata.',
                'Label your form fields clearly so everyone knows what to enter.',
              ]} />
              <RuleCard size="sm" tone="danger" title="Don’t" items={[
                'Avoid skipping heading levels, as this can confuse both users and screen readers.',
                'Stick to the provided text styles for a consistent look throughout.',
                'Use large display text sparingly to maintain its impact.',
              ]} />
            </CardGrid>
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
                    <Alert title="Requirements">
            <p className="m-0">{"Our typography is designed to work perfectly for everyone, including people using screen readers and other assistive technologies."}</p>
            <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
              <li>{"All headings are properly structured so screen readers can navigate your content easily."}</li>
              <li>{"Heading levels follow a logical order, making it simple for everyone to understand the content structure."}</li>
              <li>{"Visual appearance and document structure work together to create a seamless experience."}</li>
              <li>{"Small text is reserved for secondary information, never for essential instructions."}</li>
              <li>{"Important messages are clear even without color, ensuring everyone gets the information."}</li>
              <li>{"Text width is optimized for comfortable reading, reducing eye strain and improving comprehension."}</li>
            </ul>
          </Alert>
        }
      />
    )
  }

  if (slug === 'spacing') {
    return (
      <FoundationFrame
        slug={slug}
        title="Spacing"
        description="Consistent spacing that creates a clean, organized layout and helps users focus on your content."
        usage={
          <DocsUsage>
              <Body>
                Thoughtful spacing makes your interface breathe and helps users understand which elements belong together.
                Related items are close, while distinct sections have more space between them, creating a natural visual flow.
              </Body>
            <CardGrid columns={3} gap="sm">
              <Card variant="subtle" size="sm" eyebrow="01" title="Consistent rhythm" description="A carefully crafted spacing scale creates visual harmony throughout your interface." />
              <Card variant="subtle" size="sm" eyebrow="02" title="Clear organization" description="Spacing helps users quickly distinguish between individual items, groups, and major sections." />
              <Card variant="subtle" size="sm" eyebrow="03" title="Touch friendly" description="All buttons and interactive elements are sized for easy tapping on any device." />
            </CardGrid>
            <CardGrid columns={2} gap="sm">
              <RuleCard size="sm" tone="success" title="Do" items={[
                'Use comfortable spacing between icons and their labels for easy scanning.',
                'Adjust spacing appropriately for different screen sizes.',
                'Match spacing to text sizes for a balanced, professional look.',
              ]} />
              <RuleCard size="sm" tone="danger" title="Don’t" items={[
                'Stick to the spacing scale for consistent visual rhythm.',
                'Use spacing itself to create depth instead of adding shadows.',
                'Keep touch targets large enough for comfortable interaction.',
              ]} />
            </CardGrid>
          </DocsUsage>
        }
        tokens={
          <>
            <DocsSectionTitle>Tokens</DocsSectionTitle>
            <StateStack gap={3}>
              {SPACE.map((item) => (
                <DocsMeasureRow key={item.value} value={item.value} width={item.value} caption={item.use} />
              ))}
            </StateStack>
          </>
        }
        a11y={
                    <Alert title="Requirements">
            <p className="m-0">{"Spacing creates breathing room and helps organize content, while maintaining accessibility for everyone."}</p>
            <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
              <li>{"All interactive elements are sized for comfortable touch and click interaction."}</li>
              <li>{"Labels and controls are properly associated for screen reader users."}</li>
              <li>{"Animations respect user preferences for reduced motion."}</li>
              <li>{"Content has comfortable margins on all screen sizes, ensuring nothing feels cramped."}</li>
            </ul>
          </Alert>
        }
      />
    )
  }

  if (slug === 'radius') {
    return (
      <FoundationFrame
        slug={slug}
        title="Radius"
        description="Smooth, modern rounded corners that give your interface a polished, friendly appearance."
        usage={
          <DocsUsage>
              <Body>
                Rounded corners help users understand what they are looking at. Buttons have pill shapes, input fields have subtle rounding, 
                and cards have smooth, welcoming corners. This creates a visual language that makes your interface intuitive and approachable.
              </Body>
            <CardGrid columns={3} gap="sm">
              <Card variant="subtle" size="sm" eyebrow="01" title="Purposeful rounding" description="Each level of rounding has a specific purpose, from subtle inputs to friendly buttons." />
              <Card variant="subtle" size="sm" eyebrow="02" title="Visual harmony" description="Elements inside containers use appropriate rounding to create a polished, cohesive look." />
              <Card variant="subtle" size="sm" eyebrow="03" title="Clean design" description="Depth comes from colors and spacing rather than shadows, keeping the interface modern and flat." />
            </CardGrid>
            <CardGrid columns={2} gap="sm">
              <RuleCard size="sm" tone="success" title="Do" items={[
                'Buttons and switches have fully rounded pill shapes for a friendly feel.',
                'Input fields have subtle rounding that feels comfortable and approachable.',
                'Large surfaces like cards and modals have generous rounding for a premium look.',
              ]} />
              <RuleCard size="sm" tone="danger" title="Don’t" items={[
                'Keep rounding consistent within button groups for a unified appearance.',
                'Stick to the standard rounding values for visual consistency.',
                'Use complete rounding on all corners unless elements are deliberately connected.',
              ]} />
            </CardGrid>
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
                    <Alert title="Requirements">
            <ul className="m-0 list-disc space-y-1.5 pl-4">
              <li>{"Rounded corners are visual styling. All interactive elements maintain comfortable touch and click areas."}</li>
              <li>{"Focus indicators follow the same rounding as their elements for a polished appearance."}</li>
              <li>{"Borders maintain consistent contrast at corners for optimal visibility."}</li>
            </ul>
          </Alert>
        }
      />
    )
  }

  if (slug === 'layout') {
    return (
      <FoundationFrame
        slug={slug}
        title="Layout"
        description="Responsive layouts that look beautiful on every device, from phones to large desktop screens."
        usage={
          <DocsUsage>
              <Body>
                Our layouts are mobile first, meaning they look great on phones and automatically enhance for larger screens.
                Content stays comfortable and readable at every size, with generous margins and intelligent spacing that adapts to your device.
              </Body>
            <CardGrid columns={3} gap="sm">
              <Card variant="subtle" size="sm" eyebrow="01" title="Start small" description="We design for mobile phones first, then enhance the experience for tablets and desktops." />
              <Card variant="subtle" size="sm" eyebrow="02" title="Comfortable reading" description="Text width is optimized for easy reading, preventing lines from becoming too long." />
              <Card variant="subtle" size="sm" eyebrow="03" title="Flexible grids" description="Content arranges itself intelligently, flowing naturally from one column on phones to multiple columns on larger screens." />
            </CardGrid>
            <CardGrid columns={2} gap="sm">
              <RuleCard size="sm" tone="success" title="Do" items={[
                'Navigation adapts beautifully from mobile menus to full navigation bars.',
                'Important actions stay visible and accessible without scrolling.',
                'Forms adjust intelligently, with full width fields on phones and side by side layouts on larger screens.',
              ]} />
              <RuleCard size="sm" tone="danger" title="Don’t" items={[
                'Avoid hiding important actions in hover menus on touch devices.',
                'Keep text comfortable to read by preventing lines from getting too wide.',
                'Make sure navigation works well on all screen sizes, not just desktops.',
              ]} />
            </CardGrid>
          </DocsUsage>
        }
        tokens={
          <StateStack gap={10}>
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
              <StateStack gap={3}>
                {WIDTHS.map((item) => (
                  <DocsScaleRow
                    key={item.value}
                    value={item.value}
                    bar={item.value}
                    max={1024}
                    caption={item.use}
                  />
                ))}
              </StateStack>
            </DocsTokenGroup>
          </StateStack>
        }
        a11y={
                    <Alert title="Requirements">
            <p className="m-0">{"Our layouts work beautifully for everyone, on every device, including people using assistive technologies."}</p>
            <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
              <li>{"Everything works perfectly even on small screens and with browser zoom, ensuring no one is left out."}</li>
              <li>{"Page structure is properly marked up so screen readers can navigate easily."}</li>
              <li>{"Keyboard navigation flows naturally and intuitively through the content."}</li>
              <li>{"Fixed headers and navigation never block important content when keyboards appear."}</li>
              <li>{"Content reflows naturally instead of forcing horizontal scrolling."}</li>
            </ul>
          </Alert>
        }
      />
    )
  }

  if (slug === 'shadows') {
    return (
      <FoundationFrame
        slug={slug}
        title="Shadows"
        description="A small elevation scale that adapts to light and dark, plus the two OS-specific shadows for the Dock and its icon tiles."
        usage={
          <DocsUsage>
              <Body>
                Shadows give the interface its sense of height. Most surfaces use one of four steps — small,
                medium, large, and modal — and each step has a light and dark variant so elevation reads the
                same on any theme. Two special shadows live outside the generic scale: the Dock’s diffuse float
                and the slight lift under each Dock icon tile.
              </Body>
            <CardGrid columns={3} gap="sm">
              <Card variant="subtle" size="sm" eyebrow="01" title="Elevation is meaning" description="Higher shadow, higher layer. A card never outshadows the modal above it." />
              <Card variant="subtle" size="sm" eyebrow="02" title="Soft, never hard" description="Every shadow is diffuse with no hard edge. The Dock shadow especially should read as floating, not stuck." />
              <Card variant="subtle" size="sm" eyebrow="03" title="Theme matched" description="Light and dark each carry their own values. Read the token and the right one applies itself." />
            </CardGrid>
            <CardGrid columns={2} gap="sm">
              <RuleCard size="sm" tone="success" title="Do" items={[
                'Use the token for the layer you are on — sm for controls, md for cards, lg for panels, modal for dialogs.',
                'Use --shadow-dock only for the Dock shell and --shadow-icon only for Dock tiles and minimized windows.',
                'Let the theme switch do the work. Component code never branches on light or dark.',
              ]} />
              <RuleCard size="sm" tone="danger" title="Don’t" items={[
                'Do not write a one-off box-shadow. If a value is missing, add it to the scale first, then use it.',
                'Do not stack shadows to fake more elevation. Move up a step instead.',
                'Do not use dark-theme shadow strength on a light surface — it reads as dirt, not depth.',
              ]} />
            </CardGrid>
          </DocsUsage>
        }
        tokens={
          <StateStack gap={10}>
            <div>
              <DocsSectionTitle>Scale</DocsSectionTitle>
              <DocsTable
                columns={['Token', 'Light', 'Dark', 'Use']}
                minWidth="640px"
                monoColumns={[0, 1, 2]}
                rows={[
                  ['--shadow-sm', '0 1px 3px / 8%', '0 1px 3px / 30%', 'Controls and small chips.'],
                  ['--shadow-md', '0 4px 24px / 8%', '0 4px 24px / 40%', 'Cards, tooltips, dropdowns.'],
                  ['--shadow-lg', '0 12px 32px / 12%', '0 12px 40px / 50%', 'Panels and floating windows.'],
                  ['--shadow-modal', '0 20px 60px / 20%', '0 20px 60px / 60%', 'Dialogs and sheets above everything.'],
                  ['--shadow-dock', '0 8px 32px / 15%', '0 8px 32px / 25%', 'The Dock shell — diffuse, no hard edge.'],
                  ['--shadow-icon', '0 2px 6px / 15%', '0 2px 6px / 30%', 'Under each Dock icon tile.'],
                ]}
              />
            </div>
          </StateStack>
        }
        a11y={
                    <Alert title="Requirements">
            <p className="m-0">{"Shadows are decorative depth. They never carry meaning on their own."}</p>
            <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
              <li>{"Layer and focus are conveyed by order and markup, not by shadow alone."}</li>
              <li>{"Elevation changes never replace visible focus indicators."}</li>
              <li>{"Shadows do not affect contrast requirements for text on any surface."}</li>
            </ul>
          </Alert>
        }
      />
    )
  }

  if (slug === 'glass') {
    return (
      <FoundationFrame
        slug={slug}
        title="Glass"
        description="The five blur and tint weight classes for every translucent surface in the OS, in light and dark."
        usage={
          <DocsUsage>
              <Body>
                Every glass surface in the system is one of five weight classes — tooltip, panel, menu bar,
                dock, or modal. Each pairs a backdrop blur with a tint, a hairline border, and an inner top
                highlight, and each has light and dark values. The blur always samples the real content behind
                the surface, never a static image.
              </Body>
            <CardGrid columns={3} gap="sm">
              <Card variant="subtle" size="sm" eyebrow="01" title="Five classes, that’s all" description="New surfaces pick the closest existing class. A sixth recipe is never invented ad hoc." />
              <Card variant="subtle" size="sm" eyebrow="02" title="Real backdrop" description="Backdrop filter blurs live content — wallpaper, windows — not a baked image." />
              <Card variant="subtle" size="sm" eyebrow="03" title="Tint over blur" description="The tint sits under the blur. Together they keep text legible on any background." />
            </CardGrid>
            <CardGrid columns={2} gap="sm">
              <RuleCard size="sm" tone="success" title="Do" items={[
                'Reference the blur and tint tokens as a pair for the surface you are building.',
                'Keep the hairline border and top rim highlight — they are what sell the glass edge.',
                'Use tooltip glass for small transient labels, panel for menus, modal for sheets.',
              ]} />
              <RuleCard size="sm" tone="danger" title="Don’t" items={[
                'Do not fake the blur with a pre-blurred background image.',
                'Do not mix a blur from one class with a tint from another.',
                'Do not put long-form reading on glass — use a solid surface.',
              ]} />
            </CardGrid>
          </DocsUsage>
        }
        tokens={
          <StateStack gap={10}>
            <div>
              <DocsSectionTitle>Weight classes</DocsSectionTitle>
              <DocsTable
                columns={['Class', 'Blur', 'Dark tint', 'Light tint']}
                minWidth="640px"
                monoColumns={[0, 1]}
                rows={[
                  ['tooltip', 'blur(12px)', 'rgba(28,28,30,0.9)', 'rgba(255,255,255,0.9)'],
                  ['panel', 'blur(20px) saturate(180%)', 'rgba(28,28,30,0.85)', 'rgba(255,255,255,0.85)'],
                  ['menubar', 'blur(24px) saturate(180%)', 'rgba(28,28,30,0.72)', 'rgba(255,255,255,0.72)'],
                  ['dock', 'blur(30px) saturate(180%)', 'rgba(28,28,30,0.55)', 'rgba(255,255,255,0.55)'],
                  ['modal', 'blur(30px)', 'rgba(20,20,22,0.85)', 'rgba(245,245,247,0.85)'],
                ]}
              />
            </div>
            <div>
              <DocsSectionTitle>Edge</DocsSectionTitle>
              <DocsTable
                columns={['Token', 'Dark', 'Light', 'Use']}
                minWidth="560px"
                monoColumns={[0, 1, 2]}
                rows={[
                  ['--glass-border', 'white / 10%', 'black / 8%', 'The hairline glass edge.'],
                  ['--glass-border-subtle', 'white / 8%', 'black / 6%', 'Quieter edge, such as the Dock in dark.'],
                  ['--glass-highlight', 'white / 15%', 'white / 40%', 'Inner top-edge rim light.'],
                ]}
              />
            </div>
          </StateStack>
        }
        a11y={
                    <Alert title="Requirements">
            <p className="m-0">{"Glass must never compromise readability."}</p>
            <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
              <li>{"Text on a glass surface meets the same contrast requirements as on a solid surface — the tint guarantees it on any backdrop."}</li>
              <li>{"Backdrop blur is decorative. Content stays understandable when blur is unavailable."}</li>
              <li>{"Reduced transparency settings may replace glass with a solid surface; components must not depend on seeing through it."}</li>
            </ul>
          </Alert>
        }
      />
    )
  }

  if (slug === 'motion') {
    return (
      <FoundationFrame
        slug={slug}
        title="Motion"
        description="Two easing curves and one duration scale for every transition in the system."
        usage={
          <DocsUsage>
              <Body>
                Motion is restrained on purpose. Almost everything uses the standard ease. The spring curve is
                reserved for the few interactions defined system-wide as alive moments — the Dock magnification
                settle and notification banner entrances — so it keeps feeling special instead of becoming
                generic bounciness.
              </Body>
            <CardGrid columns={3} gap="sm">
              <Card variant="subtle" size="sm" eyebrow="01" title="Two curves" description="Standard for everything. Spring only where the system defines an alive moment." />
              <Card variant="subtle" size="sm" eyebrow="02" title="One duration ladder" description="100 to 600ms in seven steps. Hover is fast, entrances are moderate, page-scale moves are slow." />
              <Card variant="subtle" size="sm" eyebrow="03" title="Out faster than in" description="Dismissing should feel prompt. Exits pick a step quicker than their entrance." />
            </CardGrid>
            <CardGrid columns={2} gap="sm">
              <RuleCard size="sm" tone="success" title="Do" items={[
                'Pick the nearest duration token — 150ms for hovers, 200–300ms for state changes, 400ms or more for large moves.',
                'Keep spring for the Dock magnification settle and notification banners, exactly as specified.',
                'Honor prefers-reduced-motion by removing non-essential animation.',
              ]} />
              <RuleCard size="sm" tone="danger" title="Don’t" items={[
                'Do not apply the spring curve to ordinary transitions. Overuse is what makes an OS feel gimmicky.',
                'Do not invent durations outside the scale.',
                'Do not animate layout properties per frame when a transform will do.',
              ]} />
            </CardGrid>
          </DocsUsage>
        }
        tokens={
          <StateStack gap={10}>
            <div>
              <DocsSectionTitle>Easing</DocsSectionTitle>
              <DocsTable
                columns={['Token', 'Curve', 'Reserved for']}
                minWidth="560px"
                monoColumns={[0, 1]}
                rows={[
                  ['--ease-standard', 'cubic-bezier(0.28,0.11,0.32,1)', 'Every transition by default.'],
                  ['--ease-spring', 'cubic-bezier(0.34,1.56,0.64,1)', 'Dock magnification settle, notification banner entrance.'],
                ]}
              />
            </div>
            <DocsTokenGroup title="Duration">
              <StateStack gap={3}>
                {[
                  ['--duration-instant', 100, 'Micro feedback, tooltip exit'],
                  ['--duration-fast', 150, 'Hovers, fades, shell resizes'],
                  ['--duration-base', 200, 'State crossfades, compress bounce'],
                  ['--duration-moderate', 250, 'Menus and popovers'],
                  ['--duration-slow', 300, 'Panels, drop flights'],
                  ['--duration-slower', 400, 'Genie restore, large moves'],
                  ['--duration-slowest', 600, 'Page-scale transitions'],
                ].map(([token, ms, use]) => (
                  <DocsScaleRow key={token as string} value={ms as number} bar={ms as number} max={600} caption={`${token} — ${use}`} />
                ))}
              </StateStack>
            </DocsTokenGroup>
          </StateStack>
        }
        a11y={
                    <Alert title="Requirements">
            <p className="m-0">{"Motion is an enhancement, never a requirement."}</p>
            <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
              <li>{"All non-essential animation is removed under prefers-reduced-motion; state still changes instantly and correctly."}</li>
              <li>{"No animation flashes or strobes. Nothing animates faster than three flashes per second."}</li>
              <li>{"Actions never wait for an animation to become effective — motion is feedback, not a gate."}</li>
            </ul>
          </Alert>
        }
      />
    )
  }

  if (slug === 'z-index') {
    return (
      <FoundationFrame
        slug={slug}
        title="Z-Index"
        description="The OS layering scale from the desktop to the tooltip, with window order computed at runtime."
        usage={
          <DocsUsage>
              <Body>
                Layering is fixed and total: desktop at the bottom, then windows, the Dock, the menu bar,
                notifications, Spotlight and modals, context menus, and tooltips on top. Windows are the only
                moving part — a focused window computes its z-index at runtime from a base plus its focus
                order, always capped below the Dock.
              </Body>
            <CardGrid columns={3} gap="sm">
              <Card variant="subtle" size="sm" eyebrow="01" title="A fixed ladder" description="Every surface knows its rung. Nothing ad hoc, nothing z-index: 9999." />
              <Card variant="subtle" size="sm" eyebrow="02" title="Windows move, nothing else" description="Focus reorder is base plus order index, capped at --z-window-max, always below the Dock." />
              <Card variant="subtle" size="sm" eyebrow="03" title="Transient floats highest" description="Context menus and tooltips outrank everything because they answer the current action." />
            </CardGrid>
            <CardGrid columns={2} gap="sm">
              <RuleCard size="sm" tone="success" title="Do" items={[
                'Use the token for your surface class. If the class is missing, add it here first.',
                'Compute window z as --z-window-base plus the focus order, and clamp at --z-window-max.',
                'Keep modals and Spotlight on the same rung — they never appear together.',
              ]} />
              <RuleCard size="sm" tone="danger" title="Don’t" items={[
                'Do not let a window’s computed z-index exceed the Dock, menu bar, or notification layers.',
                'Do not escalate with arbitrary values when two elements overlap — fix the class instead.',
                'Do not put persistent chrome in the tooltip or context-menu ranges.',
              ]} />
            </CardGrid>
          </DocsUsage>
        }
        tokens={
          <StateStack gap={10}>
            <div>
              <DocsSectionTitle>Scale</DocsSectionTitle>
              <DocsTable
                columns={['Token', 'Value', 'Layer']}
                minWidth="480px"
                monoColumns={[0, 1]}
                rows={[
                  ['--z-desktop', '0', 'Wallpaper and desktop icons.'],
                  ['--z-window-base', '10', 'First window; each focus increments.'],
                  ['--z-window-max', '500', 'Hard cap for any window.'],
                  ['--z-dock', '600', 'The Dock shell and everything in it.'],
                  ['--z-menubar', '700', 'The top menu bar.'],
                  ['--z-notifications', '800', 'Banners and alerts.'],
                  ['--z-spotlight / --z-modal', '900', 'Spotlight and modal sheets.'],
                  ['--z-context-menu', '950', 'Right-click and dropdown menus.'],
                  ['--z-tooltip', '1000', 'Tooltips, above everything.'],
                ]}
              />
            </div>
          </StateStack>
        }
        a11y={
                    <Alert title="Requirements">
            <p className="m-0">{"Visual stacking must match the reading and focus order."}</p>
            <ul className="m-0 mt-3 list-disc space-y-1.5 pl-4">
              <li>{"A higher layer never hides focusable content from keyboard users — focus moves to the top layer."}</li>
              <li>{"Modals trap focus while open; nothing beneath them is reachable until they close."}</li>
              <li>{"Layer changes are announced by structure and focus movement, not by position alone."}</li>
            </ul>
          </Alert>
        }
      />
    )
  }

  return null
}
