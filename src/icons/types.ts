import type {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
  SVGProps,
} from 'react'

export type SVGElementType =
  | 'circle'
  | 'ellipse'
  | 'g'
  | 'line'
  | 'path'
  | 'polygon'
  | 'polyline'
  | 'rect'

export type IconNode = [elementName: SVGElementType, attrs: Record<string, string>][]

export interface LucideProps extends SVGProps<SVGSVGElement> {
  size?: string | number
  color?: string
  absoluteStrokeWidth?: boolean
  title?: string
}

export type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>

export type GlyphAttr = Record<string, string | number | undefined>

export type GlyphNode = {
  tag: string
  attr?: GlyphAttr
  child?: GlyphNode[]
}

export type CompactGlyphNode = {
  t?: string
  a?: GlyphAttr
  c?: CompactGlyphNode[]
}

export type CompactGlyph = {
  a?: GlyphAttr
  c?: CompactGlyphNode[]
}

export interface GlyphProps extends SVGProps<SVGSVGElement> {
  size?: string | number
  color?: string
  title?: string
  children?: ReactNode
}

export type IconType = ForwardRefExoticComponent<
  Omit<GlyphProps, 'ref'> & RefAttributes<SVGSVGElement>
>
