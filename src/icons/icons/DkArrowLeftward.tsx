import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkArrowLeftward: Icon = createIcon('DkArrowLeftward', [
  ['path', { d: 'M19 12H5', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round' }],
  [
    'path',
    {
      d: 'M10.5 6.5L5 12L10.5 17.5',
      stroke: 'currentColor',
      strokeWidth: '1.8',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
  ],
])
