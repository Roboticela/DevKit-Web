import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkPersonUserProfile: Icon = createIcon('DkPersonUserProfile', [
  [
    'circle',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'cx': '12',
      'cy': '8.5',
      'r': '3.5'
    }
  ],
  [
    'path',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'd': 'M5.5 19C6.5 16 9 14.5 12 14.5C15 14.5 17.5 16 18.5 19'
    }
  ]
])
