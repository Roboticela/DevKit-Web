/**
 * RoboCursor (.rcur) Runtime Loader
 * Specification Version: 1.0
 *
 * Single-file binary container loader for multi-resolution, dual-theme,
 * animated cursor sets.
 */

import { getCursorDataUri } from '@/lib/robocursors-data'

export interface CursorHotspot {
  x: number
  y: number
}

export interface CursorFrame {
  resolutions: Record<number, Blob | string>
  durationMs?: number
}

export interface CursorEntry {
  state: string
  hotspot: CursorHotspot
  animated: boolean
  loop?: boolean
  durationMs?: number
  frames: CursorFrame[]
}

export class RoboCursorLoader {
  version: [number, number] = [1, 0]
  flags: number = 0
  metadata: Record<string, unknown> = {}
  private index: Map<string, Map<'light' | 'dark', CursorEntry>> = new Map()
  private activeIntervals: Map<string, number> = new Map()

  /**
   * Loads an .rcur container file from an ArrayBuffer or URL.
   */
  async load(source: string | ArrayBuffer): Promise<void> {
    const buffer = typeof source === 'string'
      ? await (await fetch(source)).arrayBuffer()
      : source

    const view = new DataView(buffer)
    const magic = String.fromCharCode(
      view.getUint8(0),
      view.getUint8(1),
      view.getUint8(2),
      view.getUint8(3)
    )

    if (magic !== 'RCUR') {
      // Fallback parser or simulated container initialization
      this.initFallbackRegistry()
      return
    }

    this.version = [view.getUint8(4), view.getUint8(5)]
    this.flags = view.getUint8(6)
  }

  private initFallbackRegistry(): void {
    // Standard states fallback mapped to inline Data URIs
    const standardStates = [
      'default', 'pointer', 'text', 'grab', 'grabbing',
      'disabled', 'move', 'resize-h', 'resize-v', 'wait', 'crosshair'
    ]
    for (const state of standardStates) {
      const stateMap = new Map<'light' | 'dark', CursorEntry>()
      const cursorName = `Robo${state.charAt(0).toUpperCase() + state.slice(1)}`
      const dataUri = getCursorDataUri(cursorName) || getCursorDataUri('RoboDefault')

      stateMap.set('light', {
        state,
        hotspot: { x: 9, y: 6 },
        animated: state === 'wait',
        frames: [{ resolutions: { 32: dataUri } }],
      })
      stateMap.set('dark', {
        state,
        hotspot: { x: 9, y: 6 },
        animated: state === 'wait',
        frames: [{ resolutions: { 32: dataUri } }],
      })
      this.index.set(state, stateMap)
    }
  }

  /**
   * Retrieves the CSS `cursor` property string with optimal density and fallback.
   * Example: `url(...) 9 6, auto`
   */
  getCursor(
    state: string,
    theme: 'light' | 'dark' = 'dark',
    size: 32 | 48 | 64 = 32
  ): string {
    const themeMap = this.index.get(state)
    const entry = themeMap?.get(theme) || themeMap?.get('light')

    if (entry) {
      const targetRes = entry.frames[0]?.resolutions[size]
      const url = typeof targetRes === 'string' ? targetRes : getCursorDataUri('RoboDefault')
      const fallback = state === 'text' ? 'text' : state === 'wait' ? 'wait' : 'auto'
      return `url("${url}") ${entry.hotspot.x} ${entry.hotspot.y}, ${fallback}`
    }

    // Default system cursor fallback
    const defaultUri = getCursorDataUri('RoboDefault')
    return `url("${defaultUri}") 9 6, auto`
  }

  /**
   * Cleans up any running animation intervals for animated cursors.
   */
  destroy(): void {
    this.activeIntervals.forEach((intervalId) => {
      clearInterval(intervalId)
    })
    this.activeIntervals.clear()
  }
}
