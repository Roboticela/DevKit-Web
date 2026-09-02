import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkUsersPeopleGroup: Icon = createIcon('DkUsersPeopleGroup', [
  ['circle', { cx: '9', cy: '8', r: '3.5', stroke: 'currentColor', strokeWidth: '1.8' }],
  [
    'path',
    {
      d: 'M3.5 20C3.9 16.8 6 15 9 15C12 15 14.1 16.8 14.5 20',
      stroke: 'currentColor',
      strokeWidth: '1.8',
      strokeLinecap: 'round',
    },
  ],
  [
    'path',
    {
      d: 'M15.5 5.2C16.2 5.7 16.7 6.6 16.7 7.7C16.7 9.4 15.4 10.8 13.7 10.8',
      stroke: 'currentColor',
      strokeWidth: '1.8',
      strokeLinecap: 'round',
    },
  ],
  [
    'path',
    {
      d: 'M16 15.2C18.6 15.5 20.2 17.1 20.5 20',
      stroke: 'currentColor',
      strokeWidth: '1.8',
      strokeLinecap: 'round',
    },
  ],
])
