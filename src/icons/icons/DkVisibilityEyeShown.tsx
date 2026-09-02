import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkVisibilityEyeShown: Icon = createIcon('DkVisibilityEyeShown', [
  [
    'path',
    {
      d: 'M3.5 12C5.7 8.3 8.5 6.5 12 6.5C15.5 6.5 18.3 8.3 20.5 12C18.3 15.7 15.5 17.5 12 17.5C8.5 17.5 5.7 15.7 3.5 12Z',
      stroke: 'currentColor',
      strokeWidth: '1.8',
      strokeLinejoin: 'round',
    },
  ],
  ['circle', { cx: '12', cy: '12', r: '2.8', stroke: 'currentColor', strokeWidth: '1.8' }],
])
