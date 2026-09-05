/** Frame timing without THREE.Clock (deprecated in favor of Timer). */
export function createFrameClock() {
  let last = performance.now()
  let elapsed = 0

  return {
    get elapsed() {
      return elapsed
    },
    delta(now = performance.now()) {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      elapsed += dt
      return dt
    },
    skipGap(now = performance.now()) {
      last = now
    },
  }
}
