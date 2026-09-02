import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkArrowRightward: Icon = createIcon('DkArrowRightward', [
  ['path', { d: 'M5 12H19', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round' }],
  [
    'path',
    {
      d: 'M13.5 6.5L19 12L13.5 17.5',
      stroke: 'currentColor',
      strokeWidth: '1.8',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
  ],
])
