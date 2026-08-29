import { createElement, forwardRef, type ReactNode } from 'react'
import type { IconNode, LucideIcon, LucideProps, SVGElementType } from './types'

const DEFAULT_ATTRS = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function toKebabCase(value: string) {
  return value
    .replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replaceAll(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

function hasA11yProp(props: LucideProps) {
  return Boolean(
    props['aria-label'] ||
      props['aria-labelledby'] ||
      props['aria-describedby'] ||
      props.role === 'img' ||
      props.title,
  )
}

function mergeClass(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(' ')
}

export function createLucideIcon(iconName: string, iconNode: IconNode): LucideIcon {
  const kebab = toKebabCase(iconName)
  const Icon = forwardRef<SVGSVGElement, LucideProps>(
    (
      {
        color = 'currentColor',
        size = 24,
        strokeWidth = 2,
        absoluteStrokeWidth,
        className,
        children,
        title,
        style,
        ...rest
      },
      ref,
    ) => {
      const width = Number(strokeWidth)
      const dim = Number(size) || 24
      const calculatedStrokeWidth = absoluteStrokeWidth ? (width * 24) / dim : strokeWidth

      return createElement(
        'svg',
        {
          ref,
          ...DEFAULT_ATTRS,
          width: size,
          height: size,
          stroke: color,
          strokeWidth: calculatedStrokeWidth,
          className: mergeClass('lucide', `lucide-${kebab}`, 'block shrink-0', className),
          ...(!children && !hasA11yProp({ title, style, ...rest }) ? { 'aria-hidden': 'true' } : null),
          ...rest,
          overflow: rest.overflow ?? 'visible',
          style: { display: 'block', ...style },
        },
        [
          ...iconNode.map(([tag, attrs], index) =>
            createElement(tag as SVGElementType, { key: index, ...attrs }),
          ),
          title ? createElement('title', { key: 'title' }, title) : null,
          ...(Array.isArray(children) ? children : [children]),
        ].filter(Boolean) as ReactNode[],
      )
    },
  )

  Icon.displayName = iconName
  return Icon
}

export function createLucidePack(data: Record<string, IconNode>) {
  const pack: Record<string, LucideIcon> = {}
  for (const [name, node] of Object.entries(data)) {
    pack[name] = createLucideIcon(name, node)
  }
  return pack
}

export function LucideSvg({
  node,
  size = 24,
  className,
  title,
  strokeWidth = 2,
  absoluteStrokeWidth = true,
}: {
  node: IconNode
  size?: number
  className?: string
  title?: string
  strokeWidth?: number
  absoluteStrokeWidth?: boolean
}) {
  const dim = Number(size) || 24
  const width = Number(strokeWidth)
  const calculatedStrokeWidth = absoluteStrokeWidth ? (width * 24) / dim : strokeWidth
  return createElement(
    'svg',
    {
      ...DEFAULT_ATTRS,
      width: size,
      height: size,
      overflow: 'visible',
      strokeWidth: calculatedStrokeWidth,
      className: mergeClass('block shrink-0', className),
      style: { display: 'block' },
      'aria-hidden': title ? undefined : true,
    },
    [
      title ? createElement('title', { key: 'title' }, title) : null,
      ...node.map(([tag, attrs], index) =>
        createElement(tag as SVGElementType, { key: attrs.key ?? index, ...attrs }),
      ),
    ],
  )
}
