import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkPanelLeftwardOpened: Icon = createIcon('DkPanelLeftwardOpened', [
  [
    'rect',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'x': '4',
      'y': '4.5',
      'width': '16',
      'height': '15',
      'rx': '2'
    }
  ],
  [
    'line',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'x1': '10',
      'y1': '4.5',
      'x2': '10',
      'y2': '19.5'
    }
  ],
  [
    'path',
    {
      'stroke': 'currentColor',
      'strokeWidth': '1.8',
      'strokeLinecap': 'round',
      'strokeLinejoin': 'round',
      'd': 'M7.5 9.5L10 12L7.5 14.5'
    }
  ]
])
