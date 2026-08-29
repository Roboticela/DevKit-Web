import { createElement, forwardRef, type CSSProperties, type ReactNode } from 'react'
import type {
  CompactGlyph,
  CompactGlyphNode,
  GlyphAttr,
  GlyphNode,
  GlyphProps,
  IconType,
} from './types'

function expandNode(node: CompactGlyphNode | GlyphNode): GlyphNode {
  if ('tag' in node && node.tag) {
    return {
      tag: node.tag,
      attr: node.attr,
      child: node.child?.map(expandNode),
    }
  }
  const compact = node as CompactGlyphNode
  return {
    tag: compact.t ?? 'path',
    attr: compact.a,
    child: compact.c?.map(expandNode),
  }
}

export function expandGlyph(data: CompactGlyph | GlyphNode): GlyphNode {
  if ('tag' in data && data.tag) {
    return data
  }
  const compact = data as CompactGlyph
  return {
    tag: 'svg',
    attr: compact.a,
    child: compact.c?.map(expandNode),
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

function normalizeAttr(attr: GlyphAttr | undefined, idPrefix?: string): Record<string, unknown> {
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

function treeToElement(tree: GlyphNode[] | undefined, idPrefix?: string): ReactNode {
  if (!tree?.length) return null
  return tree.map((node, index) =>
    createElement(
      node.tag,
      { key: index, ...normalizeAttr(node.attr, idPrefix) },
      treeToElement(node.child, idPrefix),
    ),
  )
}

const SVG_DEFAULTS = {
  stroke: 'currentColor',
  fill: 'currentColor',
  strokeWidth: 0,
  xmlns: 'http://www.w3.org/2000/svg',
  overflow: 'visible',
} as const

export function createGlyph(name: string, raw: CompactGlyph | GlyphNode): IconType {
  const data = expandGlyph(raw)
  const idPrefix = `${name}-`
  const Icon = forwardRef<SVGSVGElement, GlyphProps>(
    ({ size, color, title, className, children, style, ...rest }, ref) => {
      const computedSize = size ?? '1em'
      const attr = normalizeAttr(data.attr, idPrefix)
      return createElement(
        'svg',
        {
          ref,
          ...SVG_DEFAULTS,
          ...attr,
          ...rest,
          className: [className, 'block shrink-0'].filter(Boolean).join(' '),
          style: {
            display: 'block',
            ...(color ? { color } : null),
            ...(typeof attr.style === 'object' && attr.style ? attr.style : null),
            ...style,
          },
          height: computedSize,
          width: computedSize,
          xmlns: 'http://www.w3.org/2000/svg',
        },
        [
          title ? createElement('title', { key: 'title' }, title) : null,
          treeToElement(data.child, idPrefix),
          children,
        ],
      )
    },
  )
  Icon.displayName = name
  return Icon
}

export function createPack(data: Record<string, CompactGlyph | GlyphNode>) {
  const pack: Record<string, IconType> = {}
  for (const [name, node] of Object.entries(data)) {
    pack[name] = createGlyph(name, node)
  }
  return pack
}

export function GlyphSvg({
  data,
  size = 24,
  className,
  title,
  uid,
}: {
  data: CompactGlyph | GlyphNode
  size?: number
  className?: string
  title?: string
  uid?: string
}) {
  const glyph = expandGlyph(data)
  const idPrefix = uid ? `${uid}-` : undefined
  const attr = normalizeAttr(glyph.attr, idPrefix)
  return createElement(
    'svg',
    {
      ...SVG_DEFAULTS,
      ...attr,
      xmlns: 'http://www.w3.org/2000/svg',
      width: size,
      height: size,
      className: [className, 'block shrink-0'].filter(Boolean).join(' '),
      style: {
        display: 'block',
        ...(typeof attr.style === 'object' && attr.style ? (attr.style as CSSProperties) : null),
      },
      'aria-hidden': title ? undefined : true,
    },
    [title ? createElement('title', { key: 'title' }, title) : null, treeToElement(glyph.child, idPrefix)],
  )
}
