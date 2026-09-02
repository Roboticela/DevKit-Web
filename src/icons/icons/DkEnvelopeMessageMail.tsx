import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkEnvelopeMessageMail: Icon = createIcon('DkEnvelopeMessageMail', [
  ['rect', { x: '3.5', y: '5.5', width: '17', height: '13', rx: '3', stroke: 'currentColor', strokeWidth: '1.8' }],
  [
    'path',
    {
      d: 'M5 7.5L10.3 12C11.3 12.8 12.7 12.8 13.7 12L19 7.5',
      stroke: 'currentColor',
      strokeWidth: '1.8',
      strokeLinecap: 'round',
    },
  ],
])
