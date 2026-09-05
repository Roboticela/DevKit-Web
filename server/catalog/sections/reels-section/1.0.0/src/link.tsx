'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'

/** Template-agnostic link (replaces next/link in published packages). */
export default function Link({
  href = '#',
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string; children?: ReactNode }) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}
