export const brand = {
  name: 'DevKit',
  shortName: 'DevKit',
  companyName: 'Roboticela',
  accountName: 'DevKit Account',
  taglineSignIn: 'Use your DevKit Account',
  taglineCreate: 'One account. Everything DevKit.',
  supportUrl: 'https://roboticela.com',
  supportLabel: 'roboticela.com',
  logoSrc: '/favicon.svg',
  iconSrc: '/favicon.svg',
  recoveryCodesFilename: 'devkit-recovery-codes.txt',
} as const

export type Brand = typeof brand
