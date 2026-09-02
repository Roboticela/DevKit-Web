import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkDeleteRemoveTrash: Icon = createIcon('DkDeleteRemoveTrash', [
  ['path', { d: 'M5 7H19', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round' }],
  [
    'path',
    {
      d: 'M9 7V5H15V7',
      stroke: 'currentColor',
      strokeWidth: '1.8',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
  ],
  [
    'path',
    {
      d: 'M7 7L7.7 19C7.8 20.1 8.7 20.8 9.7 20.8H14.3C15.3 20.8 16.2 20.1 16.3 19L17 7',
      stroke: 'currentColor',
      strokeWidth: '1.8',
      strokeLinejoin: 'round',
    },
  ],
  ['path', { d: 'M10 11V17M14 11V17', stroke: 'currentColor', strokeWidth: '1.6', strokeLinecap: 'round' }],
])
