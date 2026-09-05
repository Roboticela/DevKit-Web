export function cssTokenColor(token: string, fallback = 0x0e7aff): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(token).trim()
  if (raw.startsWith('#')) {
    const hex = raw.slice(1)
    if (hex.length === 3) {
      return parseInt(`${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`, 16)
    }
    return parseInt(hex.slice(0, 6), 16)
  }
  const rgb = raw.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i)
  if (rgb) {
    return (Number(rgb[1]) << 16) + (Number(rgb[2]) << 8) + Number(rgb[3])
  }
  return fallback
}
