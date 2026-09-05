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

  return null
}
