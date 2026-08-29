'use client'

import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Caption } from './Text'

export function Slider({
  label,
  value,
  onValueChange,
  className,
  tone = 'default',
  ...rest
}: {
  label?: string
  value: number
  onValueChange: (value: number) => void
  tone?: 'default' | 'onDark'
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'>) {
  return (
    <label className={cn('flex min-w-0 flex-1 flex-col gap-2', className)}>
      {label ? (
        <Caption
          as="span"
          align="center"
          className={tone === 'onDark' ? 'text-[#a1a1a6]' : undefined}
        >
          {label}
        </Caption>
      ) : null}
      <input
        type="range"
        className={cn('dk-range', tone === 'onDark' && 'dk-range--dark')}
        value={value}
        onChange={(event) => onValueChange(Number(event.target.value))}
        {...rest}
      />
    </label>
  )
}
