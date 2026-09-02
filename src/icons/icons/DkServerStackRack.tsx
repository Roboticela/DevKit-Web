import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkServerStackRack: Icon = createIcon('DkServerStackRack', [
  ['rect', { x: '4', y: '3.5', width: '16', height: '7', rx: '2', stroke: 'currentColor', strokeWidth: '1.8' }],
  ['rect', { x: '4', y: '13.5', width: '16', height: '7', rx: '2', stroke: 'currentColor', strokeWidth: '1.8' }],
  ['circle', { cx: '8', cy: '7', r: '1', fill: 'currentColor' }],
  ['circle', { cx: '8', cy: '17', r: '1', fill: 'currentColor' }],
  ['path', { d: 'M12 7H17M12 17H17', stroke: 'currentColor', strokeWidth: '1.6', strokeLinecap: 'round' }],
])
