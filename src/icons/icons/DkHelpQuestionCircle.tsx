import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkHelpQuestionCircle: Icon = createIcon('DkHelpQuestionCircle', [
  ['circle', { cx: '12', cy: '12', r: '8.5', stroke: 'currentColor', strokeWidth: '1.8' }],
  [
    'path',
    {
      d: 'M9.5 9.2C9.8 7.8 10.8 7 12.2 7C13.9 7 15 8 15 9.4C15 10.7 14.2 11.3 13.2 12C12.3 12.6 12 13.1 12 14',
      stroke: 'currentColor',
      strokeWidth: '1.8',
      strokeLinecap: 'round',
    },
  ],
  ['circle', { cx: '12', cy: '17', r: '0.9', fill: 'currentColor' }],
])
