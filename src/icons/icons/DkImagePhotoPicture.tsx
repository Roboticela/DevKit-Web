import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkImagePhotoPicture: Icon = createIcon('DkImagePhotoPicture', [
  ['rect', { x: '3.5', y: '4', width: '17', height: '16', rx: '3', stroke: 'currentColor', strokeWidth: '1.8' }],
  ['circle', { cx: '8.5', cy: '9', r: '1.5', stroke: 'currentColor', strokeWidth: '1.6' }],
  [
    'path',
    {
      d: 'M4.5 17L9 13L12 15.5L15 12.5L19.5 17',
      stroke: 'currentColor',
      strokeWidth: '1.8',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
  ],
])
