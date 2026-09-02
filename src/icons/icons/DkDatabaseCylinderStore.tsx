import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkDatabaseCylinderStore: Icon = createIcon('DkDatabaseCylinderStore', [
  ['ellipse', { cx: '12', cy: '5.5', rx: '7.5', ry: '3', stroke: 'currentColor', strokeWidth: '1.8' }],
  [
    'path',
    {
      d: 'M4.5 5.5V12C4.5 13.7 7.9 15 12 15C16.1 15 19.5 13.7 19.5 12V5.5',
      stroke: 'currentColor',
      strokeWidth: '1.8',
    },
  ],
  [
    'path',
    {
      d: 'M4.5 12V18.5C4.5 20.2 7.9 21.5 12 21.5C16.1 21.5 19.5 20.2 19.5 18.5V12',
      stroke: 'currentColor',
      strokeWidth: '1.8',
    },
  ],
])
