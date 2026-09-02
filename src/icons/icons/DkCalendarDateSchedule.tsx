import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkCalendarDateSchedule: Icon = createIcon('DkCalendarDateSchedule', [
  ['rect', { x: '3.5', y: '5', width: '17', height: '16', rx: '3', stroke: 'currentColor', strokeWidth: '1.8' }],
  ['path', { d: 'M7.5 3.5V7', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round' }],
  ['path', { d: 'M16.5 3.5V7', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round' }],
  ['path', { d: 'M3.5 9.5H20.5', stroke: 'currentColor', strokeWidth: '1.8' }],
  ['circle', { cx: '8', cy: '13.5', r: '0.8', fill: 'currentColor' }],
  ['circle', { cx: '12', cy: '13.5', r: '0.8', fill: 'currentColor' }],
  ['circle', { cx: '16', cy: '13.5', r: '0.8', fill: 'currentColor' }],
  ['circle', { cx: '8', cy: '17.5', r: '0.8', fill: 'currentColor' }],
  ['circle', { cx: '12', cy: '17.5', r: '0.8', fill: 'currentColor' }],
])
