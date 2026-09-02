import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkPadlockSecureClosed: Icon = createIcon('DkPadlockSecureClosed', [
  ['rect', { x: '5', y: '10', width: '14', height: '11', rx: '3', stroke: 'currentColor', strokeWidth: '1.8' }],
  [
    'path',
    {
      d: 'M8 10V7.5C8 5.3 9.8 3.5 12 3.5C14.2 3.5 16 5.3 16 7.5V10',
      stroke: 'currentColor',
      strokeWidth: '1.8',
      strokeLinecap: 'round',
    },
  ],
  ['circle', { cx: '12', cy: '15.5', r: '1', fill: 'currentColor' }],
])
