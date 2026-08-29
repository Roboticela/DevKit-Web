/* eslint-disable @next/next/no-img-element */

export function RoboticelaMark({ size = 20 }: { size?: number }) {
  const height = Math.round(size * (465.62 / 403.54))

  return (
    <img
      src="/roboticela-mark.svg"
      alt=""
      width={size}
      height={height}
      className="block object-contain"
      draggable={false}
      decoding="async"
    />
  )
}
