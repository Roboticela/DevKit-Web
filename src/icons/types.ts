import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'

export type IconNode = [tag: string, attrs: Record<string, string>][]

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: string | number
  color?: string
  title?: string
  absoluteStrokeWidth?: boolean
}

export type Icon = ForwardRefExoticComponent<Omit<IconProps, 'ref'> & RefAttributes<SVGSVGElement>>

export type BrandAttr = Record<string, string | number | undefined>

export type BrandNode = {
  t?: string
  a?: BrandAttr
  c?: BrandNode[]
}

export type BrandGlyph = {
  a?: BrandAttr
  c?: BrandNode[]
}
