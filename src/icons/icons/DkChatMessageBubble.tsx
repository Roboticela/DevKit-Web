import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkChatMessageBubble: Icon = createIcon('DkChatMessageBubble', [
  [
    'path',
    {
      d: 'M20 11.5C20 15.6 16.4 19 12 19C10.7 19 9.5 18.7 8.4 18.2L4.5 20L5.7 16.3C4.6 15 4 13.3 4 11.5C4 7.4 7.6 4 12 4C16.4 4 20 7.4 20 11.5Z',
      stroke: 'currentColor',
      strokeWidth: '1.8',
      strokeLinejoin: 'round',
    },
  ],
  ['circle', { cx: '8.5', cy: '11.5', r: '0.9', fill: 'currentColor' }],
  ['circle', { cx: '12', cy: '11.5', r: '0.9', fill: 'currentColor' }],
  ['circle', { cx: '15.5', cy: '11.5', r: '0.9', fill: 'currentColor' }],
])
