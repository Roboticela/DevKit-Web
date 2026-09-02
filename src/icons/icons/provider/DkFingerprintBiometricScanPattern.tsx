import { createIcon } from '../../create-icon'
import type { Icon } from '../../types'

const S = {
  stroke: 'currentColor',
  strokeWidth: '1.5',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

/**
 * Passkey / biometric mark — organic fingerprint ridges that stay
 * legible at 18–20px (Touch ID–adjacent, not nested U blobs).
 */
export const DkFingerprintBiometricScanPattern: Icon = createIcon(
  'DkFingerprintBiometricScanPattern',
  [
    [
      'path',
      {
        ...S,
        d: 'M7.86 4.24C9.05 3.46 10.47 3 12 3c4.14 0 7.5 3.36 7.5 7.5 0 2.92-.56 5.71-1.57 8.27',
      },
    ],
    [
      'path',
      {
        ...S,
        d: 'M5.74 6.36C4.96 7.55 4.5 8.97 4.5 10.5c0 1.47-.42 2.84-1.15 3.99',
      },
    ],
    [
      'path',
      {
        ...S,
        d: 'M5.34 18.05C7.15 16.06 8.25 13.41 8.25 10.5c0-2.07 1.68-3.75 3.75-3.75s3.75 1.68 3.75 3.75c0 .53-.02 1.05-.06 1.56',
      },
    ],
    [
      'path',
      {
        ...S,
        d: 'M12 10.5c0 3.72-1.36 7.13-3.6 9.75',
      },
    ],
    [
      'path',
      {
        ...S,
        d: 'M15.03 15.65c-.55 1.92-1.39 3.71-2.48 5.33',
      },
    ],
  ],
)
