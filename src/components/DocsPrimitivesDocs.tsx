'use client'

import type { ComponentType, ReactNode } from 'react'
import { Button } from './Button'
import {
  DocsCard,
  DocsCardGrid,
  DocsContrastCard,
  DocsInlineCode,
  DocsMeasureRow,
  DocsPrincipleCard,
  DocsRadiusCard,
  DocsRelated,
  DocsRuleCard,
  DocsScaleRow,
  DocsSnippet,
  DocsStack,
  DocsStateCard,
  DocsStateGrid,
  DocsStateGroup,
  DocsSwatch,
  DocsSwatchGrid,
  DocsTable,
  DocsTokenGroup,
  DocsUsage,
} from './DocsCard'
import { A11ySection, DocsDoDont, DocsKeys, DocsPrinciples, DocsProse } from './DocsGuide'
import { KitDocArticle, KitPreviewBody } from './KitDocArticle'
import type { PropRow } from './PropsTable'
import { RelatedCard } from './RelatedCard'
import { Body, Caption, Label } from './Text'

function p(name: string, type: string, defaultValue: string, description: string): PropRow {
  return { name, type, defaultValue, description }
}

function guide(
  body: ReactNode,
  principles: { title: string; body: string }[],
  doItems: string[],
  dontItems: string[],
  a11y: string[],
) {
  return {
    usage: (
      <DocsUsage>
        <DocsProse>
          <Body>{body}</Body>
        </DocsProse>
        <DocsPrinciples items={principles} />
        <DocsDoDont doItems={doItems} dontItems={dontItems} />
      </DocsUsage>
    ),
    accessibility: <A11ySection items={a11y} />,
  }
}

const CHILDREN = p('children', 'ReactNode', '—', 'Content inside the surface.')
const CLASS = p('className', 'string', 'undefined', 'Optional class names on the root.')
const LABEL = p('label', 'string', '—', 'Caption under the tile.')

type Def = {
  title: string
  description: string
  Demo: ComponentType
  code: string
  states?: { label: string; node: ReactNode }[]
  props: PropRow[]
  wide?: boolean
  usage?: ReactNode
  accessibility?: ReactNode
}

const PRIMITIVES: Record<string, Def> = {
  'docs-card': {
    title: 'Card',
    description: 'A rounded surface for principles, stacks, and other docs content.',
    ...guide(
      'Use Card for a quiet surface in docs. Padding sm, md, and lg cover compact rows, principle cards, and type stacks.',
      [
        { title: 'Surface only', body: 'No border and no drop shadow. Background secondary does the separation.' },
        { title: 'One idea', body: 'Put one principle, one stack, or one sample on a card. Do not mix jobs.' },
        { title: 'Step down', body: 'Nested content uses 12px or 8px radius, never larger than the card.' },
      ],
      ['Use padding lg for a type stack.', 'Keep copy short so the card stays even with its neighbors.', 'Pair cards in Card Grid.'],
      ['Do not add a drop shadow.', 'Do not use Card as a pressable control.', 'Do not nest a larger radius inside a smaller one.'],
      ['Card is a layout surface, not a landmark. Headings inside it must still be real heading tags.', 'Do not rely on the gray fill alone to show a grouping if the copy needs a heading.'],
    ),
    Demo: () => (
      <DocsCard>
        <Label as="p">One accent</Label>
        <Body size="sm" className="mt-2">
          Buttons, links, and focus rings all use brand primary.
        </Body>
      </DocsCard>
    ),
    code: `<DocsCard>\n  <Label as="p">One accent</Label>\n  <Body size="sm">Buttons, links, and focus rings all use brand primary.</Body>\n</DocsCard>\n`,
    states: [
      {
        label: 'Small',
        node: (
          <DocsCard padding="sm">
            <Caption>Compact</Caption>
          </DocsCard>
        ),
      },
      {
        label: 'Medium',
        node: (
          <DocsCard>
            <Caption>Default</Caption>
          </DocsCard>
        ),
      },
      {
        label: 'Large',
        node: (
          <DocsCard padding="lg">
            <Caption>Stack</Caption>
          </DocsCard>
        ),
      },
    ],
    props: [
      CHILDREN,
      p("padding", "'none' | 'sm' | 'md' | 'lg'", "'md'", 'Inner spacing. Large is for type stacks.'),
      CLASS,
    ],
  },
  'docs-card-grid': {
    title: 'Card Grid',
    description: 'A responsive grid for docs cards. Use two, three, four, or six columns.',
    ...guide(
      'Card Grid lays out sibling cards. Two columns for do and don’t. Three for principles. Four for swatches. Six for compact state tiles.',
      [
        { title: 'Count first', body: 'Pick columns from the number of siblings, not from the viewport.' },
        { title: 'Collapse', body: 'The grid drops to one or two columns on small screens by itself.' },
        { title: 'Same height', body: 'Keep card copy similar so the row reads as one set.' },
      ],
      ['Use two columns for Do Don’t.', 'Use three columns for Principles.', 'Use four columns for Swatch Grid.'],
      ['Do not force six columns on a mobile layout by hand.', 'Do not mix card jobs in one grid.', 'Do not add extra gap values.'],
      ['Order in the DOM is the reading order. Put the primary card first.', 'A grid is not a list unless the children are list items.'],
    ),
    Demo: () => (
      <DocsCardGrid columns={3} className="w-full">
        <DocsCard>
          <Caption>01</Caption>
        </DocsCard>
        <DocsCard>
          <Caption>02</Caption>
        </DocsCard>
        <DocsCard>
          <Caption>03</Caption>
        </DocsCard>
      </DocsCardGrid>
    ),
    wide: true,
    code: `<DocsCardGrid columns={3}>\n  <DocsCard>…</DocsCard>\n</DocsCardGrid>\n`,
    props: [
      CHILDREN,
      p('columns', '2 | 3 | 4 | 6', '3', 'Preferred column count. Six is compact and wraps to the width that fits.'),
      CLASS,
    ],
  },
  'docs-stack': {
    title: 'Stack',
    description: 'A vertical stack with the kit spacing scale. Use it to group docs blocks.',
    ...guide(
      'Stack is a column with a gap from the spacing scale. Use 6 for usage sections, 10 for token groups, 3 for measure rows.',
      [
        { title: 'Closed scale', body: 'Only 3, 4, 6, 8, and 10. Those map to 12, 16, 24, 32, and 40 pixels.' },
        { title: 'One job', body: 'A stack groups related blocks. Distinct sections stay as page sections.' },
        { title: 'Usage first', body: 'Usage is Stack at gap 6. Prefer Usage when the block is a usage section.' },
      ],
      ['Use gap 6 for prose plus principles.', 'Use gap 10 between token families.', 'Use gap 3 for spacing bars.'],
      ['Do not invent a gap such as 5 or 7.', 'Do not use Stack for a two column layout.', 'Do not wrap a single child unless you need the gap for future siblings.'],
      ['Stack does not change semantics. Headings and lists inside it stay as they are.', 'Vertical space is not a substitute for a heading.'],
    ),
    Demo: () => (
      <DocsStack gap={6} className="w-full max-w-[320px]">
        <DocsCard padding="sm">
          <Caption>First</Caption>
        </DocsCard>
        <DocsCard padding="sm">
          <Caption>Second</Caption>
        </DocsCard>
      </DocsStack>
    ),
    code: `<DocsStack gap={6}>\n  <DocsCard>First</DocsCard>\n  <DocsCard>Second</DocsCard>\n</DocsStack>\n`,
    props: [
      CHILDREN,
      p('gap', '3 | 4 | 6 | 8 | 10', '6', 'Vertical gap on the spacing scale.'),
      CLASS,
    ],
  },
  'docs-usage': {
    title: 'Usage',
    description: 'The standard vertical rhythm for a usage section: prose, principles, then do and don’t.',
    ...guide(
      'Usage is the wrapper for a usage section. Put Prose, Principles, and Do Don’t inside it, in that order.',
      [
        { title: 'Fixed order', body: 'Prose, then principles, then do and don’t. Related links come last if needed.' },
        { title: 'One section', body: 'Usage is the body of the Usage heading, not a second page title.' },
        { title: 'Same gap', body: 'The gap is 24px. Do not override it.' },
      ],
      ['Start with one short paragraph.', 'Follow with three principles.', 'Close with Do Don’t.'],
      ['Do not put a live demo inside Usage.', 'Do not skip principles to jump to do and don’t.', 'Do not change the gap.'],
      ['The Usage heading on the page is the section title. This component is only the body.', 'Keep the first paragraph as the summary a screen reader hears after the heading.'],
    ),
    Demo: () => (
      <DocsUsage className="w-full">
        <DocsProse>
          <Body>Prose, then principles, then do and don’t.</Body>
        </DocsProse>
        <DocsDoDont doItems={['Keep this order.']} dontItems={['Do not skip the prose.']} />
      </DocsUsage>
    ),
    wide: true,
    code: `<DocsUsage>\n  <DocsProse>…</DocsProse>\n  <DocsPrinciples items={items} />\n  <DocsDoDont doItems={doItems} dontItems={dontItems} />\n</DocsUsage>\n`,
    props: [CHILDREN, CLASS],
  },
  'docs-token-group': {
    title: 'Token Group',
    description: 'A labeled group of token samples with an optional note.',
    ...guide(
      'Token Group labels a family of swatches, bars, or radius cards. The title is an h3. The note is supporting copy.',
      [
        { title: 'Family name', body: 'The title is Brand, Text, or Content width — not a sentence.' },
        { title: 'Note then samples', body: 'A short note, then the grid or bars.' },
        { title: 'One family', body: 'Do not mix text tokens and background tokens in one group.' },
      ],
      ['Use a title for every family.', 'Keep the note to one sentence.', 'Put Swatch Grid or Measure Row inside.'],
      ['Do not use Token Group as a page heading.', 'Do not omit the title when several groups sit in a row.', 'Do not put interactive controls here.'],
      ['The title renders as an h3. Keep the page outline honest.', 'The note is not a heading.'],
    ),
    Demo: () => (
      <DocsTokenGroup title="Brand" note="The only interactive accent.">
        <DocsSwatchGrid tokens={['brand-primary', 'brand-primary-hover']} />
      </DocsTokenGroup>
    ),
    wide: true,
    code: `<DocsTokenGroup title="Brand" note="The only interactive accent.">\n  <DocsSwatchGrid tokens={['brand-primary']} />\n</DocsTokenGroup>\n`,
    props: [
      p('title', 'string', 'undefined', 'Group heading. Renders as an h3.'),
      p('note', 'string', 'undefined', 'One supporting sentence.'),
      CHILDREN,
    ],
  },
  'docs-state-card': {
    title: 'State Card',
    description: 'A labeled tile that shows one control state on a quiet surface.',
    ...guide(
      'State Card is a sample of one control state. The caption is the state name. Pass inert when the control is only a preview.',
      [
        { title: 'One state', body: 'Default, hover, disabled, or loading. Not a playground.' },
        { title: 'Quiet chrome', body: 'Secondary fill, 12px radius. Brand fill only for on brand text.' },
        { title: 'Inert previews', body: 'Pass inert when pointer events would confuse the page.' },
      ],
      ['Use stretch for fields so the input can fill 320px.', 'Use size lg for textareas.', 'Pass inert on button state grids.'],
      ['Do not put two controls in one tile.', 'Do not use State Card as a settings row.', 'Do not leave a preview pressable if it does not do anything.'],
      ['The caption is visible text, not an accessible name for the control.', 'Inert tiles are not in the tab order. Do not put the only instructions inside them.'],
    ),
    Demo: () => (
      <DocsStateCard label="Default">
        <Button fullWidth={false}>Button</Button>
      </DocsStateCard>
    ),
    code: `<DocsStateCard label="Default">\n  <Button>Button</Button>\n</DocsStateCard>\n`,
    props: [
      LABEL,
      CHILDREN,
      p("surface", "'secondary' | 'brand'", "'secondary'", 'Tile background.'),
      p('inert', 'boolean', 'false', 'Blocks pointer events on the preview.'),
      p("align", "'center' | 'start' | 'stretch'", "'center'", 'How the sample sits in the tile. Stretch wraps fields at 320px.'),
      p("size", "'md' | 'lg'", "'md'", 'Minimum height. Large is for textareas.'),
      p('wide', 'boolean', 'false', 'When stretch, fill the tile instead of capping at 320px.'),
      CLASS,
    ],
  },
  'docs-state-grid': {
    title: 'State Grid',
    description: 'A grid of state cards. Matches the live states section on kit pages.',
    ...guide(
      'State Grid is Card Grid with a 16px gap. Use three columns for most states, six for a compact button row that wraps to the width that actually fits.',
      [
        { title: 'Same as live states', body: 'This is the layout behind the States heading on a kit page.' },
        { title: 'Six for buttons', body: 'Compact rows keep each tile at least 12rem so the control stays inside the card.' },
        { title: 'Cards only', body: 'Children should be State Card.' },
      ],
      ['Use three columns for field states.', 'Use six columns for button variants.', 'Keep labels short.'],
      ['Do not put prose in this grid.', 'Do not mix field samples and button samples in one grid.', 'Do not change the gap.'],
      ['Each tile’s caption is the name of that state. Keep those names unique in the grid.', 'Inert previews must not be the only way to learn a state. Props and copy still describe it.'],
    ),
    Demo: () => (
      <DocsStateGrid className="w-full">
        <DocsStateCard label="Default">
          <Button fullWidth={false}>Button</Button>
        </DocsStateCard>
        <DocsStateCard label="Disabled" inert>
          <Button fullWidth={false} disabled>
            Button
          </Button>
        </DocsStateCard>
        <DocsStateCard label="Loading" inert>
          <Button fullWidth={false} loading loadingText="Loading...">
            Button
          </Button>
        </DocsStateCard>
      </DocsStateGrid>
    ),
    wide: true,
    code: `<DocsStateGrid>\n  <DocsStateCard label="Default"><Button>Button</Button></DocsStateCard>\n</DocsStateGrid>\n`,
    props: [
      CHILDREN,
      p('columns', '2 | 3 | 4 | 6', '3', 'Preferred column count. Six is compact and wraps so each tile stays wide enough for the control.'),
      CLASS,
    ],
  },
  'docs-state-group': {
    title: 'State Group',
    description: 'A caption plus a grid of state cards, for appearance, size, or tone.',
    ...guide(
      'State Group labels a set of states. Appearance, Size, Tone, and State are the usual titles.',
      [
        { title: 'Caption first', body: 'The title is secondary, medium, and sits above the grid.' },
        { title: 'One axis', body: 'Do not mix size and tone in the same group.' },
        { title: 'Stack groups', body: 'Several groups sit in a Stack at gap 10.' },
      ],
      ['Use Appearance, Size, Tone, and State as titles.', 'Put a State Grid inside.', 'Keep one axis per group.'],
      ['Do not use this as a page heading.', 'Do not hide the title.', 'Do not nest groups.'],
      ['The group title is a caption, not a heading. The States heading on the page owns the outline.', 'If the group must be a landmark, pass a real heading instead of this component.'],
    ),
    Demo: () => (
      <DocsStateGroup title="Appearance">
        <DocsStateGrid>
          <DocsStateCard label="Primary">
            <Button fullWidth={false}>Button</Button>
          </DocsStateCard>
          <DocsStateCard label="Secondary">
            <Button variant="secondary" fullWidth={false}>
              Button
            </Button>
          </DocsStateCard>
        </DocsStateGrid>
      </DocsStateGroup>
    ),
    wide: true,
    code: `<DocsStateGroup title="Appearance">\n  <DocsStateGrid>…</DocsStateGrid>\n</DocsStateGroup>\n`,
    props: [p('title', 'string', '—', 'Group caption.'), CHILDREN],
  },
  'docs-swatch': {
    title: 'Swatch',
    description: 'A color chip that shows the token fill and its CSS variable name.',
    ...guide(
      'Swatch renders var(--token) as a fill and prints the token name in mono. Pass the token without the leading dashes.',
      [
        { title: 'Token not hex', body: 'The fill comes from the CSS variable so both themes stay correct.' },
        { title: 'Name on the chip', body: 'The caption is the token, not a marketing name.' },
        { title: 'Grid it', body: 'Prefer Swatch Grid for a family.' },
      ],
      ['Pass brand-primary, not --brand-primary.', 'Use Swatch Grid for four or more chips.', 'Keep the token list in palette order.'],
      ['Do not hardcode a hex on the chip.', 'Do not use Swatch as a color picker.', 'Do not mix light and dark hex in a note beside it.'],
      ['The token name is visible text. If you describe the color in words, keep those words next to the chip.', 'Color is never the only signal in the surrounding copy.'],
    ),
    Demo: () => <DocsSwatch token="brand-primary" />,
    code: `<DocsSwatch token="brand-primary" />\n`,
    states: [
      { label: 'Brand', node: <DocsSwatch token="brand-primary" /> },
      { label: 'Danger', node: <DocsSwatch token="danger" /> },
      { label: 'Secondary', node: <DocsSwatch token="bg-secondary" /> },
    ],
    props: [p('token', 'string', '—', 'CSS variable name without the leading dashes.')],
  },
  'docs-swatch-grid': {
    title: 'Swatch Grid',
    description: 'A four column grid of color swatches for a token family.',
    ...guide(
      'Swatch Grid maps a list of token names to Swatch. Use it inside Token Group.',
      [
        { title: 'Family order', body: 'Follow the palette: rest, hover, active, disabled, subtle.' },
        { title: 'Four columns', body: 'Two on small screens. Do not override the grid.' },
        { title: 'Names in data', body: 'The tokens array is the source of truth.' },
      ],
      ['Group by Brand, Text, Background, and Border.', 'Keep hover and active next to rest.', 'Put the grid inside Token Group.'],
      ['Do not shuffle tokens for a prettier row.', 'Do not pass hex values.', 'Do not mix text and background in one grid.'],
      ['Each swatch already shows its token name. Do not hide that name.', 'A family still needs a Token Group title in the outline.'],
    ),
    Demo: () => (
      <DocsSwatchGrid tokens={['brand-primary', 'success', 'warning', 'danger']} />
    ),
    wide: true,
    code: `<DocsSwatchGrid tokens={['brand-primary', 'success', 'warning', 'danger']} />\n`,
    props: [p('tokens', 'string[]', '—', 'Token names without the leading dashes.')],
  },
  'docs-contrast-card': {
    title: 'Contrast Card',
    description: 'A reading pair of foreground and background tokens, shown at body size.',
    ...guide(
      'Contrast Card paints a background token and sets type to a foreground token. Toggle the page theme to confirm the pair still holds.',
      [
        { title: 'Approved pairs', body: 'Only show combinations that meet the reading floor.' },
        { title: 'Body size', body: 'The sample is 19px, the same as Body.' },
        { title: 'Theme check', body: 'The tokens swap in dark mode. Do not lighten type by hand.' },
      ],
      ['Use text-primary on bg-primary for headlines.', 'Use text-on-brand on brand-primary for filled buttons.', 'Keep the label as a short use case.'],
      ['Do not show a failing pair as a recommendation.', 'Do not set color with a hex.', 'Do not use this as a hero.'],
      ['The sample sentence must stay readable in both themes.', 'The label names the pair. It is not a heading.'],
    ),
    Demo: () => (
      <DocsContrastCard fg="text-primary" bg="bg-primary" label="Headline on page" />
    ),
    wide: true,
    code: `<DocsContrastCard fg="text-primary" bg="bg-primary" label="Headline on page" />\n`,
    props: [
      p('fg', 'string', '—', 'Foreground token without dashes.'),
      p('bg', 'string', '—', 'Background token without dashes.'),
      LABEL,
    ],
  },
  'docs-radius-card': {
    title: 'Radius Card',
    description: 'A sample corner next to its name, pixel value, and intended use.',
    ...guide(
      'Radius Card shows 8, 12, 18, or 980 as a sample block. The label is Control, Card, Panel, or Pill.',
      [
        { title: 'Four values', body: 'Nothing else is on the scale.' },
        { title: 'Name the job', body: 'Control, Card, Panel, Pill — not Small or Large.' },
        { title: 'True radius', body: 'The sample uses the pixel value, including 980 for a pill.' },
      ],
      ['Use 8 for fields.', 'Use 18 for large surfaces.', 'Use 980 for buttons and switches.'],
      ['Do not show 4 or 16.', 'Do not round only one corner in the sample.', 'Do not mix a pill sample with an 8px sibling in one card.'],
      ['Radius is visual only. Hit area stays 44px.', 'The pixel value is in mono so it is not mistaken for a heading.'],
    ),
    Demo: () => <DocsRadiusCard value={18} label="Panel" use="Large cards, images, and dialogs." />,
    code: `<DocsRadiusCard value={18} label="Panel" use="Large cards, images, and dialogs." />\n`,
    props: [
      p('value', 'number', '—', 'Corner radius in pixels.'),
      LABEL,
      p('use', 'string', '—', 'Where this radius belongs.'),
    ],
  },
  'docs-scale-row': {
    title: 'Scale Row',
    description: 'A percentage bar for content widths and other values relative to a max.',
    ...guide(
      'Scale Row draws a bar as a percent of max, default 1024. Use it for content widths.',
      [
        { title: 'Relative', body: '692 on a 1024 max is a short bar, not a 692px bar.' },
        { title: 'Caption under', body: 'The use case sits under the bar.' },
        { title: 'Mono value', body: 'The leading number is the token, not a percent.' },
      ],
      ['Use 1024 as max for layout widths.', 'Keep captions to a few words.', 'Stack rows at gap 3.'],
      ['Do not use this for spacing steps. Use Measure Row.', 'Do not animate the bar.', 'Do not omit the caption.'],
      ['The value is text, not an image of a number.', 'The bar is decorative. The caption states the use.'],
    ),
    Demo: () => (
      <DocsStack gap={3} className="w-full">
        <DocsScaleRow value={692} bar={692} caption="Single column copy" />
        <DocsScaleRow value={1024} bar={1024} caption="Marketing sections" />
      </DocsStack>
    ),
    wide: true,
    code: `<DocsScaleRow value={692} bar={692} caption="Single column copy" />\n`,
    props: [
      p('value', 'number | string', '—', 'Leading label, usually the pixel width.'),
      p('bar', 'number', '—', 'Length used to compute the percent.'),
      p('max', 'number', '1024', 'Denominator for the percent.'),
      p('caption', 'string', '—', 'Use case under the bar.'),
    ],
  },
  'docs-measure-row': {
    title: 'Measure Row',
    description: 'A pixel bar for spacing steps, shown at their true width.',
    ...guide(
      'Measure Row draws a bar at the real pixel width. Use it for the spacing scale.',
      [
        { title: 'True size', body: '16 means a 16px bar, not a percent.' },
        { title: 'Caption beside', body: 'The use case sits on the same row.' },
        { title: 'Closed scale', body: '4, 8, 12, 16, 24, 32, 48, 64, 96, 128.' },
      ],
      ['Show every step on the scale.', 'Keep the caption to the typical use.', 'Stack at gap 3.'],
      ['Do not use this for content widths. Use Scale Row.', 'Do not skip a step to save space.', 'Do not use odd values such as 10 or 20.'],
      ['The leading number is the token. Do not replace it with an icon.', 'The bar is decorative. The caption carries the meaning.'],
    ),
    Demo: () => (
      <DocsStack gap={3} className="w-full">
        <DocsMeasureRow value={8} width={8} caption="Inline icon to label" />
        <DocsMeasureRow value={24} width={24} caption="Desktop gutters" />
        <DocsMeasureRow value={32} width={32} caption="Card padding" />
      </DocsStack>
    ),
    wide: true,
    code: `<DocsMeasureRow value={8} width={8} caption="Inline icon to label" />\n`,
    props: [
      p('value', 'number', '—', 'Leading label, usually the pixel step.'),
      p('width', 'number', '—', 'Bar width in pixels.'),
      p('caption', 'string', '—', 'Typical use.'),
    ],
  },
  'docs-table': {
    title: 'Docs Table',
    description: 'A simple table for scales, breakpoints, and keyboard maps.',
    ...guide(
      'Docs Table is a quiet table with a secondary header row. Pass columns, then rows of cells. Mark mono columns by index.',
      [
        { title: 'Data first', body: 'Role, size, and use. Not a data grid with sorting.' },
        { title: 'Mono for tokens', body: 'Pass monoColumns for variant names and pixel values.' },
        { title: 'Scroll wide', body: 'minWidth keeps the table from crushing on small screens.' },
      ],
      ['Use it for the type scale and breakpoints.', 'Keep headers short.', 'Put Key cells in a keyboard table through Keys.'],
      ['Do not use this for product records. Use Table.', 'Do not stripe rows.', 'Do not put a primary action in a cell.'],
      ['The first column is the row header in spirit. Keep it unique.', 'Do not use layout tables. This is tabular data.'],
    ),
    Demo: () => (
      <DocsTable
        columns={['Role', 'Size', 'Use']}
        monoColumns={[1]}
        minWidth="360px"
        rows={[
          ['Heading 1', '56px / 32px', 'Page title.'],
          ['Body', '19px / 17px', 'Reading size.'],
        ]}
      />
    ),
    wide: true,
    code: `<DocsTable\n  columns={['Role', 'Size', 'Use']}\n  monoColumns={[1]}\n  rows={[['Heading 1', '56px / 32px', 'Page title.']]}\n/>\n`,
    props: [
      p('columns', 'string[]', '—', 'Header labels.'),
      p('rows', 'ReactNode[][]', '—', 'Cells, one array per row.'),
      p('minWidth', 'string', "'480px'", 'Minimum table width before horizontal scroll.'),
      p('monoColumns', 'number[]', '[]', 'Column indexes that render in mono.'),
    ],
  },
  'docs-snippet': {
    title: 'Snippet',
    description: 'A monospace code sample on a secondary surface.',
    ...guide(
      'Snippet is a short import or JSX sample. Use Code Panel when the sample belongs under a live demo.',
      [
        { title: 'Short', body: 'A few lines. Long examples belong in Code Panel.' },
        { title: 'Copy as written', body: 'Do not wrap or comment inside the sample to explain it.' },
        { title: 'Quiet chrome', body: 'Secondary fill, 18px radius, no border.' },
      ],
      ['Use it under Usage on Icons and Country Flag.', 'Keep the sample runnable.', 'Prefer Code Panel next to a live demo.'],
      ['Do not syntax highlight by hand with extra spans.', 'Do not put a snippet inside a principle card.', 'Do not use this for error messages.'],
      ['Code is in a pre and code pair so it copies as text.', 'A snippet is not a figure. If it needs a caption, put the caption in Body above it.'],
    ),
    Demo: () => <DocsSnippet>{`import { DocsCard } from '@/components'\n\n<DocsCard>One accent</DocsCard>`}</DocsSnippet>,
    wide: true,
    code: `<DocsSnippet>{\`import { DocsCard } from '@/components'\`}</DocsSnippet>\n`,
    props: [CHILDREN],
  },
  'docs-related': {
    title: 'Related',
    description: 'A three column grid for related component links.',
    ...guide(
      'Related lays out Related Card in three columns. Use it at the end of a kit page for sibling components.',
      [
        { title: 'Three', body: 'Up to three siblings from the same sidebar section.' },
        { title: 'Same shape', body: 'Each child is a Related Card: title plus one line.' },
        { title: 'After a11y', body: 'Related sits below Accessibility, above the pager.' },
      ],
      ['Link to siblings, not to random pages.', 'Keep descriptions to one sentence.', 'Use the same grid on every kit page.'],
      ['Do not add a fourth card.', 'Do not use this for marketing tiles.', 'Do not omit the description.'],
      ['Each card is a link with a visible title. Do not add a redundant aria-label.', 'Three cards collapse to one column on small screens.'],
    ),
    Demo: () => (
      <DocsRelated>
        <RelatedCard href="/components/docs-card" title="Card" description="A rounded surface for docs content." />
        <RelatedCard href="/components/docs-stack" title="Stack" description="A vertical stack with the kit spacing scale." />
        <RelatedCard href="/components/docs-table" title="Docs Table" description="A simple table for scales and breakpoints." />
      </DocsRelated>
    ),
    wide: true,
    code: `<DocsRelated>\n  <RelatedCard href="/components/docs-card" title="Card" description="A rounded surface for docs content." />\n</DocsRelated>\n`,
    props: [CHILDREN],
  },
  'docs-principle-card': {
    title: 'Principle Card',
    description: 'A numbered principle with a short title and supporting line.',
    ...guide(
      'Principle Card is one of three rules. The index is 01, 02, 03 in brand color. Prefer Principles when you have a set.',
      [
        { title: 'Three', body: 'A set is three cards. Two feels unfinished. Four is a list.' },
        { title: 'Title then body', body: 'A short name, then one supporting sentence.' },
        { title: 'Number is order', body: '01 is the first thing to remember, not a rank.' },
      ],
      ['Keep the title to two or three words.', 'Write the body as a complete sentence.', 'Use Principles to lay out the set.'],
      ['Do not use this for a feature grid.', 'Do not skip numbers.', 'Do not put a button on the card.'],
      ['The number is visual. The title is the name of the principle.', 'Do not rely on the number color alone. The words stand on their own.'],
    ),
    Demo: () => (
      <DocsPrincipleCard index={1} title="One accent" body="Buttons, links, and focus rings all use brand primary." />
    ),
    code: `<DocsPrincipleCard index={1} title="One accent" body="Buttons, links, and focus rings all use brand primary." />\n`,
    props: [
      p('index', 'number', '—', '1-based number, shown as 01.'),
      p('title', 'string', '—', 'Short name.'),
      p('body', 'string', '—', 'Supporting sentence.'),
    ],
  },
  'docs-rule-card': {
    title: 'Rule Card',
    description: 'A do or don’t list with a success or danger tone.',
    ...guide(
      'Rule Card is one column of Do or Don’t. Prefer Do Don’t for the pair. Success is Do. Danger is Don’t.',
      [
        { title: 'Tone matches the title', body: 'Success with Do. Danger with Don’t. Do not swap them.' },
        { title: 'Complete lines', body: 'Each item is a full instruction, not a fragment.' },
        { title: 'Dots not icons', body: 'A small fill marks the list. The words carry the rule.' },
      ],
      ['Put three items in each list.', 'Start don’t items with Do not.', 'Use Do Don’t for the pair.'],
      ['Do not use warning tone.', 'Do not mix do items into a don’t card.', 'Do not use this for a changelog.'],
      ['Color is extra. “Do” and “Don’t” are in the title text.', 'Lists are real ul elements. Do not rebuild them with divs.'],
    ),
    Demo: () => (
      <DocsRuleCard
        tone="success"
        title="Do"
        items={['Use brand primary for the primary action.', 'Use danger only for destructive actions.']}
      />
    ),
    code: `<DocsRuleCard tone="success" title="Do" items={['Use brand primary for the primary action.']} />\n`,
    props: [
      p("tone", "'success' | 'danger'", '—', 'Do is success. Don’t is danger.'),
      p('title', 'string', '—', 'Usually Do or Don’t.'),
      p('items', 'string[]', '—', 'Rules in the list.'),
    ],
  },
  'docs-inline-code': {
    title: 'Inline Code',
    description: 'A monospace token or prop name inside a sentence.',
    ...guide(
      'Inline Code marks a token, prop, or import path inside Body. Use Snippet for a block.',
      [
        { title: 'Names only', body: 'as, --brand-primary, @/icons. Not a whole sentence.' },
        { title: 'Same size', body: '13px mono, no fill, so it sits in Body.' },
        { title: 'Rare', body: 'One or two per paragraph. More belongs in a snippet.' },
      ],
      ['Use it for prop names such as as and label.', 'Use it for import paths.', 'Keep the surrounding sentence readable without it.'],
      ['Do not use it for emphasis on ordinary words.', 'Do not put a block of JSX here.', 'Do not change the font size.'],
      ['Code in a sentence is still read as text. Say “the as prop” if the name alone is unclear.', 'Do not use color alone to mark a token. Mono is the signal.'],
    ),
    Demo: () => (
      <Body>
        Pass <DocsInlineCode>as</DocsInlineCode> when the visual size and the document outline disagree.
      </Body>
    ),
    code: `<Body>Pass <DocsInlineCode>as</DocsInlineCode> when the visual size and the document outline disagree.</Body>\n`,
    props: [CHILDREN],
  },
  'docs-prose': {
    title: 'Prose',
    description: 'A reading column capped at 692px for docs body copy.',
    ...guide(
      'Prose wraps Body in a 692px column. Pass a string or Body children. Use it as the first block in Usage.',
      [
        { title: 'Reading width', body: '692px is the single column copy width. Do not stretch it.' },
        { title: 'Short', body: 'One or two paragraphs. Detail belongs in principles.' },
        { title: 'Real Body', body: 'A string child becomes Body. Prefer Body when you need Inline Code.' },
      ],
      ['Open Usage with Prose.', 'Keep it under the Usage heading.', 'Use Body size sm only when the note sits under a token group.'],
      ['Do not put a grid inside Prose.', 'Do not set a custom max width.', 'Do not use Prose for a hero.'],
      ['Prose is a div. Headings stay outside it, as section titles.', 'Line length stays near 692px so the paragraph remains readable.'],
    ),
    Demo: () => (
      <DocsProse>
        <Body>Interactive color is a single accent. Teal is not a second brand.</Body>
      </DocsProse>
    ),
    wide: true,
    code: `<DocsProse>\n  <Body>Interactive color is a single accent.</Body>\n</DocsProse>\n`,
    props: [CHILDREN, CLASS],
  },
  'docs-principles': {
    title: 'Principles',
    description: 'Three principle cards in a row. Use them to state how a component should be used.',
    ...guide(
      'Principles maps items to Principle Card. Pass three items. The index is assigned in order.',
      [
        { title: 'Always three', body: 'The grid is built for three cards.' },
        { title: 'How not what', body: 'State the rule, not a feature list.' },
        { title: 'After prose', body: 'Usage order is prose, principles, do and don’t.' },
      ],
      ['Write titles as two or three words.', 'Keep bodies to one sentence.', 'Put this inside Usage.'],
      ['Do not pass one item.', 'Do not use this as a marketing feature row.', 'Do not number the titles yourself.'],
      ['Each card title is the name of the principle. The number is visual order.', 'Three cards wrap on small screens. DOM order is still 01, 02, 03.'],
    ),
    Demo: () => (
      <DocsPrinciples
        items={[
          { title: 'One accent', body: 'Buttons, links, and focus rings all use brand primary.' },
          { title: 'Tokens, not hex', body: 'The token swaps both themes. Never mix hex from light and dark.' },
          { title: 'Layered surfaces', body: 'Secondary is a large surface. Tertiary is a nested field.' },
        ]}
      />
    ),
    wide: true,
    code: `<DocsPrinciples\n  items={[\n    { title: 'One accent', body: 'Buttons, links, and focus rings all use brand primary.' },\n  ]}\n/>\n`,
    props: [p('items', '{ title: string; body: string }[]', '—', 'Three principles, in order.')],
  },
  'docs-do-dont': {
    title: 'Do Don’t',
    description: 'A paired do list and don’t list for a usage section.',
    ...guide(
      'Do Don’t is two Rule Cards. Do on the left, Don’t on the right. Collapse to a column on small screens.',
      [
        { title: 'Pair always', body: 'Never ship a usage section with only Do or only Don’t.' },
        { title: 'Same count', body: 'Three and three keeps the cards even.' },
        { title: 'Do not first', body: 'Don’t items start with Do not so they read as rules, not slogans.' },
      ],
      ['Put this after Principles.', 'Keep items parallel: a do has a matching don’t.', 'Use complete sentences.'],
      ['Do not swap the columns.', 'Do not add a third card.', 'Do not use exclamation points.'],
      ['Do and Don’t are in the titles, not only in color.', 'Each list is a ul. Screen readers hear a list, not a paragraph.'],
    ),
    Demo: () => (
      <DocsDoDont
        doItems={['Use brand primary for the primary action.', 'Use danger only for errors.']}
        dontItems={['Do not use teal for buttons.', 'Do not set color with a raw hex.']}
      />
    ),
    wide: true,
    code: `<DocsDoDont\n  doItems={['Use brand primary for the primary action.']}\n  dontItems={['Do not use teal for buttons.']}\n/>\n`,
    props: [
      p('doItems', 'string[]', '—', 'Rules on the Do card.'),
      p('dontItems', 'string[]', '—', 'Rules on the Don’t card.'),
    ],
  },
  'docs-keys': {
    title: 'Keys',
    description: 'A keyboard table with Key and Action columns.',
    ...guide(
      'Keys renders a Docs Table of shortcuts. Pass keys as an array so chords can be several Kbd chips.',
      [
        { title: 'Key then action', body: 'The first column is the shortcut. The second is what it does.' },
        { title: 'One row per action', body: 'Tab, Space, and Enter are separate rows even if they share a verb.' },
        { title: 'Under a11y', body: 'Keys sits below the requirements callout.' },
      ],
      ['Use Tab, Space, and Enter as the words on the chips.', 'Keep actions to a few words.', 'Put Keys inside Accessibility Section when the control has shortcuts.'],
      ['Do not invent shortcuts the control does not have.', 'Do not use symbols such as ⌘ unless the product is Mac only.', 'Do not put Keys above the requirements.'],
      ['Kbd is the visual for a key. The action column is plain text.', 'Do not rely on the chip shape alone. The character inside is the name of the key.'],
    ),
    Demo: () => (
      <DocsKeys
        rows={[
          { keys: ['Tab'], action: 'Focus the control' },
          { keys: ['Space'], action: 'Activate' },
          { keys: ['Enter'], action: 'Activate' },
        ]}
      />
    ),
    wide: true,
    code: `<DocsKeys\n  rows={[\n    { keys: ['Tab'], action: 'Focus the control' },\n    { keys: ['Space'], action: 'Activate' },\n  ]}\n/>\n`,
    props: [p('rows', '{ keys: string[]; action: string }[]', '—', 'One shortcut per row.')],
  },
  'a11y-section': {
    title: 'Accessibility Section',
    description: 'Requirements in a callout, with an optional keyboard table below.',
    ...guide(
      'Accessibility Section is the body under the Accessibility heading. Intro plus a list of requirements, then Keys if the control has shortcuts.',
      [
        { title: 'Requirements first', body: 'The callout title is Requirements. The intro is one sentence.' },
        { title: 'Words not color', body: 'Each item still makes sense in grayscale.' },
        { title: 'Keys last', body: 'Pass keys only when the control is a keyboard target.' },
      ],
      ['Open with a complete intro sentence.', 'List concrete rules, not slogans.', 'Include Tab, Space, and Enter when they apply.'],
      ['Do not leave this section empty.', 'Do not duplicate the usage do and don’t list here.', 'Do not hide keyboard rules in a tooltip.'],
      ['This sits under a real Accessibility heading on the page.', 'The callout is an aside. The list inside it is the requirements.'],
    ),
    Demo: () => (
      <A11ySection
        intro="A button is a native control. Do not recreate it with a clickable div."
        items={['Uses a native button element.', 'Tab to focus. Space or Enter to press.']}
        keys={[
          { keys: ['Tab'], action: 'Focus the button' },
          { keys: ['Enter'], action: 'Activate' },
        ]}
      />
    ),
    wide: true,
    code: `<A11ySection\n  intro="A button is a native control."\n  items={['Uses a native button element.']}\n  keys={[{ keys: ['Tab'], action: 'Focus the button' }]}\n/>\n`,
    props: [
      p('intro', 'string', 'undefined', 'Opening sentence in the callout.'),
      p('items', 'string[]', '—', 'Requirement list.'),
      p('keys', '{ keys: string[]; action: string }[]', 'undefined', 'Optional keyboard table.'),
      CLASS,
    ],
  },
}

export function DocsPrimitivesDocs({ slug }: { slug: string }) {
  const def = PRIMITIVES[slug]
  if (!def) return null
  const Demo = def.Demo
  return (
    <KitDocArticle
      slug={slug}
      title={def.title}
      description={def.description}
      demo={<Demo />}
      code={def.code}
      states={def.states}
      props={def.props}
      wide={def.wide}
      usage={def.usage}
      accessibility={def.accessibility}
    />
  )
}

export function PrimitivePreview({ slug }: { slug: string }) {
  const def = PRIMITIVES[slug]
  if (!def) return null
  const Demo = def.Demo
  return <KitPreviewBody demo={<Demo />} states={def.states} wide={def.wide} />
}

export function hasPrimitiveDoc(slug: string) {
  return slug in PRIMITIVES
}
