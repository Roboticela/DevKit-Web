'use client'

import { cn } from '@/lib/cn'

export type SwatchPickerProps = {
  /** CSS colors for the row. */
  colors: string[]
  value?: string
  onChange?: (color: string) => void
  /** Accessible group label. */
  label?: string
  className?: string
}

/**
 * Color Swatch Picker Row — a wrap row of round swatches with a double-ring
 * selection (border + offset brand ring), distinct from the hover scale.
 * Used by accent-color pickers and product color selectors.
 */
export function SwatchPicker({ colors, value, onChange, label, className }: SwatchPickerProps) {
  return (
    <div role="radiogroup" aria-label={label} className={cn('flex flex-wrap gap-2', className)}>
      {colors.map((color) => {
        const selected = color === value
        return (
          <button
            key={color}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={color}
            onClick={() => onChange?.(color)}
            style={{ background: color }}
            className={cn(
              'relative size-8 rounded-full border-2 transition-[transform,border-color] duration-150',
              'cursor-[var(--cursor-pointer)] motion-reduce:transition-none',
              selected ? 'border-[var(--text-primary)]' : 'border-transparent hover:scale-[1.08]',
            )}
          >
            {selected ? (
              <span
                aria-hidden
                className="absolute -inset-[5px] rounded-full border-[1.5px] border-[var(--brand-primary)]"
              />
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
