import type { ReactNode } from 'react'
import Link from './link'
import { ArrowRight } from 'lucide-react'
import { cn } from './cn'
import { landingEase, landingTextLink } from './landing'
export function HomeTextLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link className={cn(landingTextLink, 'group', className)} href={href}>
      {children}
      <span className="relative block size-[0.72em] shrink-0 overflow-hidden" aria-hidden="true">
        <ArrowRight
          className={cn(
            'absolute inset-0 size-full transition-transform duration-[400ms]',
            landingEase,
            'group-hover:translate-x-[120%] motion-reduce:translate-x-0 motion-reduce:transition-none',
          )}
        />
        <ArrowRight
          className={cn(
            'absolute inset-0 size-full -translate-x-[120%] transition-transform duration-[400ms]',
            landingEase,
            'group-hover:translate-x-0 motion-reduce:translate-x-0 motion-reduce:transition-none',
          )}
        />
      </span>
    </Link>
  )
}
