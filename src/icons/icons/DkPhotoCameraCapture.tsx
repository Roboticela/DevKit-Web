import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkPhotoCameraCapture: Icon = createIcon('DkPhotoCameraCapture', [
  [
    'rect',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'x': '4',
      'y': '7.5',
      'width': '16',
      'height': '11.5',
      'rx': '2'
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
      'cy': '13',
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
      'd': 'M9 7.5L10.5 5.5H13.5L15 7.5'
    }
  ]
])
