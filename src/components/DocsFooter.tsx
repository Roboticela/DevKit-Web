import Link from 'next/link'
import { brand } from '@/lib/devkit'
import { Caption } from './Text'

const LINKS = [
  { href: '/components/button', label: 'Docs' },
  { href: '/components/button', label: 'Components' },
  { href: '/pages/sign-in', label: 'Pages' },
  { href: '/components/button', label: 'Guides' },
] as const

export function DocsFooter() {
  return (
    <footer className="border-t border-border-default bg-bg-secondary">
      <div className="mx-auto flex max-w-[1024px] flex-col gap-6 px-[22px] py-12 min-[735px]:flex-row min-[735px]:items-center min-[735px]:justify-between min-[735px]:px-10">
        <Caption>
          © {new Date().getFullYear()} {brand.companyName}. {brand.name} component library.
        </Caption>
        <nav className="flex flex-wrap gap-5" aria-label="Footer">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-text-tertiary no-underline hover:text-text-primary"
            >
              <Caption as="span">{link.label}</Caption>
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
