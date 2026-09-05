import { DocsHeader } from './DocsCopy'
import { DocsPager } from './DocsPager'

export function DocsArticleStub({
  eyebrow,
  title,
  description = 'This article is in progress.',
  prev,
  next,
  sceneBleed = false,
}: {
  eyebrow: string
  title: string
  description?: string
  prev?: { href: string; label: string }
  next?: { href: string; label: string }
  sceneBleed?: boolean
}) {
  return (
    <article
      className={`relative overflow-visible${sceneBleed ? ' section-scene' : ''}`}
    >
      <DocsHeader crumb={eyebrow} title={title} description={description} />
      <DocsPager className="mt-12" prev={prev} next={next} />
    </article>
  )
}
