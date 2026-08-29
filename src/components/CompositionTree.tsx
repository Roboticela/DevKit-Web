import Link from 'next/link'
import { cn } from '@/lib/cn'

export type CompositionNode = {
  label: string
  href?: string
  note?: string
  children?: CompositionNode[]
}

function TreeRows({
  nodes,
  ancestorsLast = [],
}: {
  nodes: CompositionNode[]
  ancestorsLast?: boolean[]
}) {
  return (
    <>
      {nodes.map((node, index) => {
        const last = index === nodes.length - 1
        const prefix = ancestorsLast
          .slice(0, -1)
          .map((wasLast) => (wasLast ? '   ' : '│  '))
          .join('')
        const branch = ancestorsLast.length === 0 ? '' : last ? '└─ ' : '├─ '

        return (
          <li key={`${node.label}-${index}`} className="list-none">
            <span className="text-text-disabled">
              {prefix}
              {branch}
            </span>
            {node.href ? (
              <Link href={node.href} className="text-brand-primary no-underline hover:underline">
                {node.label}
              </Link>
            ) : (
              <span className="text-text-secondary">{node.label}</span>
            )}
            {node.note ? <span className="text-text-tertiary"> {node.note}</span> : null}
            {node.children?.length ? (
              <ul className="m-0 p-0">
                <TreeRows nodes={node.children} ancestorsLast={[...ancestorsLast, last]} />
              </ul>
            ) : null}
          </li>
        )
      })}
    </>
  )
}

export function CompositionTree({
  tree,
  className,
}: {
  tree: CompositionNode[]
  className?: string
}) {
  return (
    <div
      className={cn(
        'overflow-x-auto rounded-2xl border border-border-default bg-bg-secondary p-4 font-mono text-[13px] leading-[1.7]',
        className,
      )}
    >
      <ul className="m-0 p-0">
        <TreeRows nodes={tree} />
      </ul>
    </div>
  )
}
