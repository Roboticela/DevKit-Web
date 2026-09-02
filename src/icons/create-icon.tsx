import { createElement, forwardRef, type CSSProperties, type ReactNode } from 'react'
import type { BrandAttr, BrandGlyph, BrandNode, Icon, IconNode, IconProps } from './types'

const STROKE_DEFAULTS = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

function hasA11yProp(props: IconProps) {
  return props['aria-label'] != null || props['aria-labelledby'] != null
}

export function createIcon(name: string, nodes: IconNode): Icon {
  const Icon = forwardRef<SVGSVGElement, IconProps>(
    (
      { size = 24, color, title, className, children, style, absoluteStrokeWidth: _absoluteStrokeWidth, ...rest },
      ref,
    ) =>
      createElement(
        'svg',
        {
          ref,
          ...STROKE_DEFAULTS,
          ...rest,
          width: size,
          height: size,
          className: ['block shrink-0', className].filter(Boolean).join(' '),
          style: { display: 'block', ...(color ? { color } : null), ...style },
          role: title || hasA11yProp(rest) ? 'img' : undefined,
          'aria-hidden': title || hasA11yProp(rest) ? undefined : true,
        },
        [
          title ? createElement('title', { key: 'title' }, title) : null,
          ...nodes.map(([tag, attrs], index) => createElement(tag, { key: index, ...attrs })),
          children,
        ],
      ),
  )
  Icon.displayName = name
  return Icon
}

function expandBrandNode(node: BrandNode): { tag: string; attr?: BrandAttr; child?: BrandNode[] } {
  return {
    tag: node.t ?? 'path',
    attr: node.a,
    child: node.c,
  }
}

function cssToStyle(value: string): CSSProperties {
  const style: Record<string, string> = {}
  for (const part of value.split(';')) {
    const idx = part.indexOf(':')
    if (idx < 0) continue
    const rawKey = part.slice(0, idx).trim()
    const rawVal = part.slice(idx + 1).trim()
    if (!rawKey) continue
    const key = rawKey.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())
    style[key] = rawVal
  }
  return style as CSSProperties
}

function scopeUrl(value: string, prefix: string) {
  return value.replace(/url\(#([^)]+)\)/g, (_match, id: string) => `url(#${prefix}${id})`)
}

function brandAttr(attr: BrandAttr | undefined, idPrefix?: string): Record<string, unknown> {
  if (!attr) return {}
  const out: Record<string, unknown> = {}
  for (const [rawKey, value] of Object.entries(attr)) {
    if (value === undefined) continue
    const key =
      rawKey === 'class'
        ? 'className'
        : rawKey.includes('-')
          ? rawKey.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())
          : rawKey

    if (key === 'style' && typeof value === 'string') {
      out.style = cssToStyle(value)
      continue
    }

    if (typeof value === 'string' && idPrefix) {
      if (key === 'id') {
        out.id = `${idPrefix}${value}`
        continue
      }
      if (value.includes('url(#')) {
        out[key] = scopeUrl(value, idPrefix)
        continue
      }
    }

    out[key] = value
  }
  return out
}

function brandTree(nodes: BrandNode[] | undefined, idPrefix?: string): ReactNode {
  if (!nodes?.length) return null
  return nodes.map((node, index) => {
    const expanded = expandBrandNode(node)
    return createElement(
      expanded.tag,
      { key: index, ...brandAttr(expanded.attr, idPrefix) },
      brandTree(expanded.child, idPrefix),
    )
  })
}

export function createBrandIcon(name: string, glyph: BrandGlyph): Icon {
  const idPrefix = `${name}-`
  const Icon = forwardRef<SVGSVGElement, IconProps>(
    (
      { size = 24, color, title, className, children, style, absoluteStrokeWidth: _absoluteStrokeWidth, ...rest },
      ref,
    ) => {
      const rootAttr = brandAttr(glyph.a, idPrefix)
      return createElement(
        'svg',
        {
          ref,
          xmlns: 'http://www.w3.org/2000/svg',
          overflow: 'visible',
          ...rootAttr,
          ...rest,
          width: size,
          height: size,
          className: ['block shrink-0', className].filter(Boolean).join(' '),
          style: {
            display: 'block',
            ...(color ? { color } : null),
            ...(typeof rootAttr.style === 'object' && rootAttr.style ? rootAttr.style : null),
            ...style,
          },
          role: title ? 'img' : undefined,
          'aria-hidden': title ? undefined : true,
        },
        [
          title ? createElement('title', { key: 'title' }, title) : null,
          brandTree(glyph.c, idPrefix),
          children,
        ],
      )
    },
  )
  Icon.displayName = name
  return Icon
}
