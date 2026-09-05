export function mergeContent<T extends object>(defaults: T, content?: Partial<T>): T {
  if (!content) return defaults
  const next = { ...defaults }
  for (const key of Object.keys(content) as (keyof T)[]) {
    const value = content[key]
    if (value === undefined) continue
    const base = defaults[key]
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      base &&
      typeof base === 'object' &&
      !Array.isArray(base)
    ) {
      next[key] = { ...(base as object), ...(value as object) } as T[keyof T]
    } else {
      next[key] = value as T[keyof T]
    }
  }
  return next
}
