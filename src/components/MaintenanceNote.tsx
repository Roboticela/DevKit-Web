import { Anchor } from './Anchor'
import { Caption, Label } from './Text'

export function MaintenanceNote({
  title = 'Maintenance Note',
  children = 'Keep this composition tree in sync with the page’s real component usage. Don’t invent structure that isn’t in the source.',
  href = '/pages/documentation-article',
  linkLabel = 'Contributing Guide',
}: {
  title?: string
  children?: string
  href?: string
  linkLabel?: string
}) {
  return (
    <div className="mt-4 rounded-xl border border-border-default bg-bg-secondary p-3">
      <Label as="p">{title}</Label>
      <Caption tone="secondary" className="mt-1 mb-2">
        {children}
      </Caption>
      <Anchor href={href} size="sm">
        {linkLabel}
      </Anchor>
    </div>
  )
}
