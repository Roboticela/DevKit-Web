import { createIcon } from '../create-icon'
import type { Icon } from '../types'

export const DkTerminalCommandLine: Icon = createIcon('DkTerminalCommandLine', [
  ['rect', { x: '3.5', y: '4', width: '17', height: '16', rx: '3', stroke: 'currentColor', strokeWidth: '1.8' }],
  [
    'path',
    {
      d: 'M7 9L10 12L7 15',
      stroke: 'currentColor',
      strokeWidth: '1.8',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
  ],
  ['path', { d: 'M12.5 15H17', stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round' }],
])
