'use client'

import { useTheme } from '@/lib/theme'
import { ROBOCURSORS_LIST, RoboCursorItem } from '@/lib/robocursors-data'
import { cn } from '@/lib/cn'

const LIGHT_CURSOR_VARS: React.CSSProperties = {
  ['--arrow-fill-start' as any]: '#ffffff',
  ['--arrow-fill-end' as any]: '#f1f5f9',
  ['--arrow-stroke' as any]: '#0f172a',
  ['--resize-fill-start' as any]: '#ffffff',
  ['--resize-fill-end' as any]: '#f1f5f9',
  ['--resize-stroke' as any]: '#0f172a',
  ['--hand-fill-start' as any]: '#ffffff',
  ['--hand-fill-end' as any]: '#f1f5f9',
  ['--hand-stroke' as any]: '#0f172a',
  ['--accent-lines' as any]: '#0f172a',
  ['--text-fill-start' as any]: '#ffffff',
  ['--text-fill-end' as any]: '#f1f5f9',
  ['--text-stroke' as any]: '#0f172a',
  ['--pencil-fill-start' as any]: '#ffffff',
  ['--pencil-fill-end' as any]: '#f1f5f9',
  ['--pencil-stroke' as any]: '#0f172a',
  ['--track-color' as any]: '#8e8e93',
  ['--track-opacity' as any]: '0.35',
  ['--tick-color' as any]: '#3b9eff',
  ['--unavailable-ring' as any]: '#dc2626',
  ['--shadow-opacity' as any]: '0.18',
}

const DARK_CURSOR_VARS: React.CSSProperties = {
  ['--arrow-fill-start' as any]: '#27272a',
  ['--arrow-fill-end' as any]: '#18181b',
  ['--arrow-stroke' as any]: '#ffffff',
  ['--resize-fill-start' as any]: '#27272a',
  ['--resize-fill-end' as any]: '#18181b',
  ['--resize-stroke' as any]: '#ffffff',
  ['--hand-fill-start' as any]: '#27272a',
  ['--hand-fill-end' as any]: '#18181b',
  ['--hand-stroke' as any]: '#ffffff',
  ['--accent-lines' as any]: '#f4f4f5',
  ['--text-fill-start' as any]: '#27272a',
  ['--text-fill-end' as any]: '#18181b',
  ['--text-stroke' as any]: '#ffffff',
  ['--pencil-fill-start' as any]: '#27272a',
  ['--pencil-fill-end' as any]: '#18181b',
  ['--pencil-stroke' as any]: '#ffffff',
  ['--track-color' as any]: '#48484a',
  ['--track-opacity' as any]: '1',
  ['--tick-color' as any]: '#3b9eff',
  ['--unavailable-ring' as any]: '#f87171',
  ['--shadow-opacity' as any]: '0.50',
}

export function CursorPreview({
  cursorOrId,
  className,
  title,
  theme: themeProp,
}: {
  cursorOrId: RoboCursorItem | string
  className?: string
  title?: string
  theme?: 'light' | 'dark'
}) {
  const { theme: currentTheme } = useTheme()
  const activeTheme = themeProp ?? currentTheme

  const cursor =
    typeof cursorOrId === 'string'
      ? ROBOCURSORS_LIST.find((c) => c.id === cursorOrId || c.filename === cursorOrId)
      : cursorOrId

  if (!cursor) return null

  const themeVars = activeTheme === 'dark' ? DARK_CURSOR_VARS : LIGHT_CURSOR_VARS

  const cleanSvg = cursor.svg.replace(
    /@media\s*\(prefers-color-scheme:\s*dark\)\s*\{[\s\S]*?\}\s*\}/g,
    '',
  )

  return (
    <span
      style={themeVars}
      className={cn(
        'inline-flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-full [&>svg]:max-h-full pointer-events-none select-none',
        className,
      )}
      title={title ?? cursor.title}
      dangerouslySetInnerHTML={{ __html: cleanSvg }}
    />
  )
}
