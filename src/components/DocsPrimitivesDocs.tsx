'use client'

import type { ComponentType, ReactNode } from 'react'
import {
  DocsSnippet,
  DocsUsage,
} from './DocsCard'
import { Alert } from './Alert'
import { Card, CardGrid } from './Card'
import { RuleCard } from './RuleCard'
import { KitDocArticle, KitPreviewBody } from './KitDocArticle'
import type { PropRow } from './PropsTable'
import { Body } from './Text'

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
        <Body>{body}</Body>
        <CardGrid columns={3} gap="sm">
          {principles.map((item, index) => (
            <Card
              key={item.title}
              variant="subtle"
              size="sm"
              eyebrow={String(index + 1).padStart(2, '0')}
              title={item.title}
              description={item.body}
            />
          ))}
        </CardGrid>
        <CardGrid columns={2} gap="sm">
          <RuleCard size="sm" tone="success" title="Do" items={doItems} />
          <RuleCard size="sm" tone="danger" title="Don’t" items={dontItems} />
        </CardGrid>
      </DocsUsage>
    ),
    accessibility: (
      <Alert title="Requirements">
        <ul className="m-0 list-disc space-y-1.5 pl-4">
          {a11y.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Alert>
    ),
  }
}

const CHILDREN = p('children', 'ReactNode', '—', 'Content inside the surface.')

type Def = {
  title: string
  description: string
  Demo: ComponentType
  code: string
  states?: { label: string; node: ReactNode }[]
  statesContent?: ReactNode
  props: PropRow[]
  wide?: boolean
  usage?: ReactNode
  accessibility?: ReactNode
}


const PRIMITIVES: Record<string, Def> = {
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
      ['Do not syntax highlight by hand with extra spans.', 'Do not put a snippet inside a card.', 'Do not use this for error messages.'],
      ['Code is in a pre and code pair so it copies as text.', 'A snippet is not a figure. If it needs a caption, put the caption in Body above it.'],
    ),
    Demo: () => <DocsSnippet>{`import { Card } from '@/components'\n\n<Card variant="subtle" title="One accent" />`}</DocsSnippet>,
    wide: true,
    code: `<DocsSnippet>{\`import { Card } from '@/components'\`}</DocsSnippet>\n`,
    props: [CHILDREN],
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
      statesContent={def.statesContent}
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
  return <KitPreviewBody demo={<Demo />} states={def.states} statesContent={def.statesContent} wide={def.wide} />
}

export function hasPrimitiveDoc(slug: string) {
  return slug in PRIMITIVES
}
