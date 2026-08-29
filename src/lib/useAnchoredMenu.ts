'use client'

import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react'

type PlaceOptions = {
  from?: 'trigger' | 'root'
  minWidth?: number
  maxWidth?: number
  estimatedHeight?: number
}

export function useAnchoredMenu(deps: unknown[] = [], options: PlaceOptions = {}) {
  const { from = 'trigger', minWidth = 280, maxWidth = 360, estimatedHeight = 360 } = options
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({})
  const [openUp, setOpenUp] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listId = useId()

  useLayoutEffect(() => {
    if (!open) return

    function place() {
      const trigger = triggerRef.current
      const root = rootRef.current
      if (!trigger) return
      const rect = trigger.getBoundingClientRect()
      const fieldRect = root?.getBoundingClientRect()
      const gap = 8
      const spaceBelow = window.innerHeight - rect.bottom - gap
      const spaceAbove = rect.top - gap
      const shouldOpenUp = spaceBelow < estimatedHeight && spaceAbove > spaceBelow
      const baseWidth = from === 'root' && fieldRect ? fieldRect.width : rect.width
      const width = Math.min(maxWidth, Math.max(baseWidth, minWidth))
      const leftAnchor = from === 'root' && fieldRect ? fieldRect.left : rect.left
      const left = Math.min(Math.max(12, leftAnchor), window.innerWidth - width - 12)

      if (shouldOpenUp) {
        setOpenUp(true)
        setMenuStyle({
          position: 'fixed',
          left,
          width,
          bottom: window.innerHeight - rect.top + gap,
          top: 'auto',
          maxHeight: Math.min(360, Math.max(220, spaceAbove - 8)),
        })
      } else {
        setOpenUp(false)
        setMenuStyle({
          position: 'fixed',
          left,
          width,
          top: rect.bottom + gap,
          bottom: 'auto',
          maxHeight: Math.min(360, Math.max(220, spaceBelow - 8)),
        })
      }
    }

    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, estimatedHeight, from, maxWidth, minWidth, ...deps])

  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => searchRef.current?.focus(), 40)

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node
      if (rootRef.current?.contains(target)) return
      if (menuRef.current?.contains(target)) return
      setOpen(false)
      setQuery('')
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        setQuery('')
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function close() {
    setOpen(false)
    setQuery('')
  }

  return {
    open,
    setOpen,
    query,
    setQuery,
    menuStyle,
    openUp,
    rootRef,
    triggerRef,
    menuRef,
    searchRef,
    listId,
    close,
  }
}

export type MenuRefs = {
  menuRef: RefObject<HTMLDivElement | null>
  searchRef: RefObject<HTMLInputElement | null>
}
