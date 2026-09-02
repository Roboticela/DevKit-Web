import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkAtSign: Icon = createIcon('DkAtSign', [
  [
    'circle',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'cx': '12',
      'cy': '12',
      'r': '9'
    }
  ],
  [
    'circle',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'cx': '12',
      'cy': '12',
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
      'd': 'M15.5 12.5C15.5 14.5 14 16 12 16C10 16 8.5 14.3 8.5 12C8.5 9.7 10 8 12 8C13.2 8 14.2 8.6 14.8 9.5'
    }
  ]
])
