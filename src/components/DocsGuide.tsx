import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Callout } from './Callout'
import { DocsCardGrid, DocsPrincipleCard, DocsRuleCard, DocsTable } from './DocsCard'
import { Kbd } from './Kbd'
import { Body } from './Text'

export function DocsProse({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex max-w-[692px] flex-col gap-3', className)}>
      {typeof children === 'string' ? <Body>{children}</Body> : children}
    </div>
  )
}

export function DocsPrinciples({
  items,
}: {
  items: { title: string; body: string }[]
}) {
  return (
    <DocsCardGrid columns={3}>
      {items.map((item, index) => (
        <DocsPrincipleCard key={item.title} index={index + 1} title={item.title} body={item.body} />
      ))}
    </DocsCardGrid>
  )
}

export function DocsDoDont({
  doItems,
  dontItems,
}: {
  doItems: string[]
  dontItems: string[]
}) {
  return (
    <DocsCardGrid columns={2}>
      <DocsRuleCard tone="success" title="Do" items={doItems} />
      <DocsRuleCard tone="danger" title="Don’t" items={dontItems} />
    </DocsCardGrid>
  )
}

export function DocsKeys({
  rows,
}: {
  rows: { keys: string[]; action: string }[]
}) {
  return (
    <DocsTable
      columns={['Key', 'Action']}
      rows={rows.map((row) => [
        <span key={row.action} className="inline-flex flex-wrap items-center gap-1">
          {row.keys.map((key) => (
            <Kbd key={key}>{key}</Kbd>
          ))}
        </span>,
        row.action,
      ])}
    />
  )
}

export function A11ySection({
  intro,
  items,
  keys,
  className,
}: {
  intro?: string
  items: string[]
  keys?: { keys: string[]; action: string }[]
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <Callout title="Requirements">
        {intro ? <p className="m-0">{intro}</p> : null}
        <ul className={cn('m-0 list-disc space-y-1.5 pl-4', intro && 'mt-3')}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Callout>
      {keys?.length ? <DocsKeys rows={keys} /> : null}
    </div>
  )
}
