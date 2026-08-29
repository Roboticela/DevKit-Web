import { DocsHeader } from './DocsCopy'
import { DocsPager } from './DocsPager'

export function DocsArticleStub({
  eyebrow,
  title,
  description = 'This article is in progress.',
  prev,
  next,
}: {
  eyebrow: string
  title: string
  description?: string
  prev?: { href: string; label: string }
  next?: { href: string; label: string }
}) {
  return (
    <article>
      <DocsHeader crumb={eyebrow} title={title} description={description} />
      <DocsPager className="mt-12" prev={prev} next={next} />
    </article>
  )
}
