'use client'

import { useCallback, useMemo, useSyncExternalStore } from 'react'

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('popstate', onStoreChange)
  return () => window.removeEventListener('popstate', onStoreChange)
}

function getPathname() {
  return typeof window === 'undefined' ? '/' : window.location.pathname
}

function getSearch() {
  return typeof window === 'undefined' ? '' : window.location.search
}

/** Template-agnostic navigation (replaces next/navigation in published packages). */
export function usePathname() {
  return useSyncExternalStore(subscribe, getPathname, () => '/')
}

export function useSearchParams() {
  const search = useSyncExternalStore(subscribe, getSearch, () => '')
  return useMemo(() => new URLSearchParams(search), [search])
}

export function useRouter() {
  const push = useCallback((href: string) => {
    window.location.assign(href)
  }, [])
  const replace = useCallback((href: string) => {
    window.location.replace(href)
  }, [])
  const back = useCallback(() => {
    window.history.back()
  }, [])
  return { push, replace, back, prefetch() {} }
}

export function notFound() {
  throw new Error('Not found')
}
