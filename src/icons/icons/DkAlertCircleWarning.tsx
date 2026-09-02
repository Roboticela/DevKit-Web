import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkAlertCircleWarning: Icon = createIcon('DkAlertCircleWarning', [
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
    'path',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'd': 'M12 8V13'
    }
  ],
  [
    'circle',
    {
      'stroke': 'none',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'cx': '12',
      'cy': '16.5',
      'r': '0.9',
      'fill': 'currentColor'
    }
  ]
])
