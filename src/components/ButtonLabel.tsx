import type { ReactNode } from 'react'
import { Loader } from './Loader'

export function ButtonSpinner({
  light = false,
  onWhite = false,
  className,
  size = 16,
}: {
  light?: boolean
  onWhite?: boolean
  className?: string
  size?: number
}) {
  return (
    <Loader
      decorative
      size={size}
      onDark={light}
      tone={onWhite ? 'brand' : 'default'}
      className={className}
    />
  )
}

export function ButtonLabel({
  loading,
  loadingText,
  light,
  children,
}: {
  loading?: boolean
  loadingText?: string
  light?: boolean
  children: ReactNode
}) {
  return (
    <span className="inline-flex items-center justify-center gap-2">
      {loading ? <Loader decorative size="sm" onDark={light} /> : null}
      <span className="inline-flex items-center justify-center gap-2">
        {loading && loadingText ? loadingText : children}
      </span>
    </span>
  )
}
