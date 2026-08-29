export type Country = {
  iso: string
  name: string
  dial: string
}

/** ISO 3166-1 alpha-2 + dialing code. Sorted by name at runtime. */
export const COUNTRIES: Country[] = [
  { iso: 'AF', name: 'Afghanistan', dial: '93' },
  { iso: 'AL', name: 'Albania', dial: '355' },
  { iso: 'DZ', name: 'Algeria', dial: '213' },
  { iso: 'AR', name: 'Argentina', dial: '54' },
  { iso: 'AM', name: 'Armenia', dial: '374' },
  { iso: 'AU', name: 'Australia', dial: '61' },
  { iso: 'AT', name: 'Austria', dial: '43' },
  { iso: 'AZ', name: 'Azerbaijan', dial: '994' },
  { iso: 'BH', name: 'Bahrain', dial: '973' },
  { iso: 'BD', name: 'Bangladesh', dial: '880' },
  { iso: 'BY', name: 'Belarus', dial: '375' },
  { iso: 'BE', name: 'Belgium', dial: '32' },
  { iso: 'BZ', name: 'Belize', dial: '501' },
  { iso: 'BJ', name: 'Benin', dial: '229' },
  { iso: 'BT', name: 'Bhutan', dial: '975' },
  { iso: 'BO', name: 'Bolivia', dial: '591' },
  { iso: 'BA', name: 'Bosnia and Herzegovina', dial: '387' },
  { iso: 'BR', name: 'Brazil', dial: '55' },
  { iso: 'BN', name: 'Brunei', dial: '673' },
  { iso: 'BG', name: 'Bulgaria', dial: '359' },
  { iso: 'KH', name: 'Cambodia', dial: '855' },
  { iso: 'CM', name: 'Cameroon', dial: '237' },
  { iso: 'CA', name: 'Canada', dial: '1' },
  { iso: 'CL', name: 'Chile', dial: '56' },
  { iso: 'CN', name: 'China', dial: '86' },
  { iso: 'CO', name: 'Colombia', dial: '57' },
  { iso: 'CR', name: 'Costa Rica', dial: '506' },
  { iso: 'HR', name: 'Croatia', dial: '385' },
  { iso: 'CU', name: 'Cuba', dial: '53' },
  { iso: 'CY', name: 'Cyprus', dial: '357' },
  { iso: 'CZ', name: 'Czechia', dial: '420' },
  { iso: 'DK', name: 'Denmark', dial: '45' },
  { iso: 'DO', name: 'Dominican Republic', dial: '1' },
  { iso: 'EC', name: 'Ecuador', dial: '593' },
  { iso: 'EG', name: 'Egypt', dial: '20' },
  { iso: 'SV', name: 'El Salvador', dial: '503' },
  { iso: 'EE', name: 'Estonia', dial: '372' },
  { iso: 'ET', name: 'Ethiopia', dial: '251' },
  { iso: 'FI', name: 'Finland', dial: '358' },
  { iso: 'FR', name: 'France', dial: '33' },
  { iso: 'GE', name: 'Georgia', dial: '995' },
  { iso: 'DE', name: 'Germany', dial: '49' },
  { iso: 'GH', name: 'Ghana', dial: '233' },
  { iso: 'GR', name: 'Greece', dial: '30' },
  { iso: 'GT', name: 'Guatemala', dial: '502' },
  { iso: 'HN', name: 'Honduras', dial: '504' },
  { iso: 'HK', name: 'Hong Kong', dial: '852' },
  { iso: 'HU', name: 'Hungary', dial: '36' },
  { iso: 'IS', name: 'Iceland', dial: '354' },
  { iso: 'IN', name: 'India', dial: '91' },
  { iso: 'ID', name: 'Indonesia', dial: '62' },
  { iso: 'IR', name: 'Iran', dial: '98' },
  { iso: 'IQ', name: 'Iraq', dial: '964' },
  { iso: 'IE', name: 'Ireland', dial: '353' },
  { iso: 'IL', name: 'Israel', dial: '972' },
  { iso: 'IT', name: 'Italy', dial: '39' },
  { iso: 'JM', name: 'Jamaica', dial: '1' },
  { iso: 'JP', name: 'Japan', dial: '81' },
  { iso: 'JO', name: 'Jordan', dial: '962' },
  { iso: 'KZ', name: 'Kazakhstan', dial: '7' },
  { iso: 'KE', name: 'Kenya', dial: '254' },
  { iso: 'KW', name: 'Kuwait', dial: '965' },
  { iso: 'KG', name: 'Kyrgyzstan', dial: '996' },
  { iso: 'LA', name: 'Laos', dial: '856' },
  { iso: 'LV', name: 'Latvia', dial: '371' },
  { iso: 'LB', name: 'Lebanon', dial: '961' },
  { iso: 'LY', name: 'Libya', dial: '218' },
  { iso: 'LT', name: 'Lithuania', dial: '370' },
  { iso: 'LU', name: 'Luxembourg', dial: '352' },
  { iso: 'MO', name: 'Macao', dial: '853' },
  { iso: 'MY', name: 'Malaysia', dial: '60' },
  { iso: 'MV', name: 'Maldives', dial: '960' },
  { iso: 'MT', name: 'Malta', dial: '356' },
  { iso: 'MX', name: 'Mexico', dial: '52' },
  { iso: 'MD', name: 'Moldova', dial: '373' },
  { iso: 'MN', name: 'Mongolia', dial: '976' },
  { iso: 'ME', name: 'Montenegro', dial: '382' },
  { iso: 'MA', name: 'Morocco', dial: '212' },
  { iso: 'MM', name: 'Myanmar', dial: '95' },
  { iso: 'NP', name: 'Nepal', dial: '977' },
  { iso: 'NL', name: 'Netherlands', dial: '31' },
  { iso: 'NZ', name: 'New Zealand', dial: '64' },
  { iso: 'NI', name: 'Nicaragua', dial: '505' },
  { iso: 'NG', name: 'Nigeria', dial: '234' },
  { iso: 'MK', name: 'North Macedonia', dial: '389' },
  { iso: 'NO', name: 'Norway', dial: '47' },
  { iso: 'OM', name: 'Oman', dial: '968' },
  { iso: 'PK', name: 'Pakistan', dial: '92' },
  { iso: 'PA', name: 'Panama', dial: '507' },
  { iso: 'PY', name: 'Paraguay', dial: '595' },
  { iso: 'PE', name: 'Peru', dial: '51' },
  { iso: 'PH', name: 'Philippines', dial: '63' },
  { iso: 'PL', name: 'Poland', dial: '48' },
  { iso: 'PT', name: 'Portugal', dial: '351' },
  { iso: 'PR', name: 'Puerto Rico', dial: '1' },
  { iso: 'QA', name: 'Qatar', dial: '974' },
  { iso: 'RO', name: 'Romania', dial: '40' },
  { iso: 'RU', name: 'Russia', dial: '7' },
  { iso: 'SA', name: 'Saudi Arabia', dial: '966' },
  { iso: 'RS', name: 'Serbia', dial: '381' },
  { iso: 'SG', name: 'Singapore', dial: '65' },
  { iso: 'SK', name: 'Slovakia', dial: '421' },
  { iso: 'SI', name: 'Slovenia', dial: '386' },
  { iso: 'ZA', name: 'South Africa', dial: '27' },
  { iso: 'KR', name: 'South Korea', dial: '82' },
  { iso: 'ES', name: 'Spain', dial: '34' },
  { iso: 'LK', name: 'Sri Lanka', dial: '94' },
  { iso: 'SE', name: 'Sweden', dial: '46' },
  { iso: 'CH', name: 'Switzerland', dial: '41' },
  { iso: 'TW', name: 'Taiwan', dial: '886' },
  { iso: 'TJ', name: 'Tajikistan', dial: '992' },
  { iso: 'TZ', name: 'Tanzania', dial: '255' },
  { iso: 'TH', name: 'Thailand', dial: '66' },
  { iso: 'TN', name: 'Tunisia', dial: '216' },
  { iso: 'TR', name: 'Turkey', dial: '90' },
  { iso: 'TM', name: 'Turkmenistan', dial: '993' },
  { iso: 'UA', name: 'Ukraine', dial: '380' },
  { iso: 'AE', name: 'United Arab Emirates', dial: '971' },
  { iso: 'GB', name: 'United Kingdom', dial: '44' },
  { iso: 'US', name: 'United States', dial: '1' },
  { iso: 'UY', name: 'Uruguay', dial: '598' },
  { iso: 'UZ', name: 'Uzbekistan', dial: '998' },
  { iso: 'VE', name: 'Venezuela', dial: '58' },
  { iso: 'VN', name: 'Vietnam', dial: '84' },
  { iso: 'YE', name: 'Yemen', dial: '967' },
  { iso: 'ZW', name: 'Zimbabwe', dial: '263' },
]

const PREFERRED_ISO = ['US', 'GB', 'CA', 'AU', 'IN', 'PK', 'AE', 'SA', 'DE', 'FR']

export function countryFlag(iso: string) {
  return iso
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
}

/** Windows often can't render emoji flags — use CDN images instead. */
export function countryFlagUrl(iso: string, width = 40) {
  return `https://flagcdn.com/w${width}/${iso.trim().toLowerCase()}.png`
}

export function getCountryByIso(iso: string) {
  return COUNTRIES.find((country) => country.iso === iso) ?? COUNTRIES.find((c) => c.iso === 'US')!
}

const DIAL_SORTED = [...COUNTRIES].sort((a, b) => b.dial.length - a.dial.length)

export function parsePhoneValue(value: string, fallbackIso = 'US') {
  const trimmed = value.trim()
  if (!trimmed) {
    return { country: getCountryByIso(fallbackIso), national: '' }
  }

  const normalized = trimmed.replace(/[^\d+]/g, '')
  const digits = normalized.startsWith('+') ? normalized.slice(1) : normalized.replace(/\D/g, '')

  if (normalized.startsWith('+')) {
    const match = DIAL_SORTED.find((country) => digits.startsWith(country.dial))
    if (match) {
      const dialLength = match.dial.length
      const sameDial = COUNTRIES.filter(
        (country) => country.dial === match.dial && digits.startsWith(country.dial),
      )
      const preferred =
        sameDial.find((country) => country.iso === fallbackIso) ??
        sameDial.find((country) => country.iso === 'US') ??
        match
      return {
        country: preferred,
        national: digits.slice(dialLength),
      }
    }
  }

  return {
    country: getCountryByIso(fallbackIso),
    national: digits,
  }
}

export function composePhoneValue(dial: string, national: string) {
  const number = national.replace(/\D/g, '')
  if (!number) return ''
  return `+${dial.replace(/\D/g, '')}${number}`
}

/** `X` = digit. Punctuation is inserted as-you-type. */
const NANP_PATTERN = '(XXX) XXX-XXXX'

const NATIONAL_PATTERNS: Record<string, string> = {
  US: NANP_PATTERN,
  CA: NANP_PATTERN,
  PR: NANP_PATTERN,
  DO: NANP_PATTERN,
  JM: NANP_PATTERN,
  GB: 'XXXX XXXXXX',
  AU: 'XXX XXX XXX',
  NZ: 'XX XXX XXXX',
  IE: 'XXX XXX XXXX',
  IN: 'XXXXX XXXXX',
  PK: 'XXX XXXXXXX',
  AE: 'XX XXX XXXX',
  SA: 'XX XXX XXXX',
  QA: 'XXXX XXXX',
  KW: 'XXXX XXXX',
  BH: 'XXXX XXXX',
  OM: 'XXXX XXXX',
  DE: 'XXX XXXXXXX',
  FR: 'X XX XX XX XX',
  IT: 'XXX XXX XXXX',
  ES: 'XXX XX XX XX',
  PT: 'XXX XXX XXX',
  NL: 'X XXXX XXXX',
  BE: 'XXX XX XX XX',
  CH: 'XX XXX XX XX',
  AT: 'XXX XXXXXXX',
  SE: 'XX XXX XX XX',
  NO: 'XXX XX XXX',
  DK: 'XX XX XX XX',
  FI: 'XXX XXX XXXX',
  PL: 'XXX XXX XXX',
  BR: '(XX) XXXXX-XXXX',
  MX: 'XX XXXX XXXX',
  AR: 'XX XXXX-XXXX',
  CL: 'X XXXX XXXX',
  CO: 'XXX XXX XXXX',
  PE: 'XXX XXX XXX',
  JP: 'XX-XXXX-XXXX',
  KR: 'XX-XXXX-XXXX',
  CN: 'XXX XXXX XXXX',
  HK: 'XXXX XXXX',
  SG: 'XXXX XXXX',
  MY: 'XX-XXX XXXX',
  TH: 'XX XXX XXXX',
  VN: 'XXX XXX XXXX',
  ID: 'XXX-XXXX-XXXX',
  PH: 'XXX XXX XXXX',
  TR: 'XXX XXX XXXX',
  EG: 'XX XXXX XXXX',
  NG: 'XXX XXX XXXX',
  ZA: 'XX XXX XXXX',
  KE: 'XXX XXX XXX',
  IL: 'XX-XXX-XXXX',
  RU: 'XXX XXX-XX-XX',
  UA: 'XX XXX XX XX',
  BD: 'XXXX XXXXXX',
}

function patternForIso(iso: string) {
  return NATIONAL_PATTERNS[iso.toUpperCase()] ?? 'XXX XXX XXXX'
}

export function nationalDigitLimit(iso: string) {
  return (patternForIso(iso).match(/X/g) ?? []).length
}

export function formatNationalNumber(national: string, iso: string) {
  const digits = national.replace(/\D/g, '')
  if (!digits) return ''

  const pattern = patternForIso(iso)
  const clipped = digits.slice(0, nationalDigitLimit(iso))
  let result = ''
  let index = 0

  for (const char of pattern) {
    if (index >= clipped.length) break
    if (char === 'X') {
      result += clipped[index]
      index += 1
    } else {
      result += char
    }
  }

  return result
}

export function caretFromDigitCount(formatted: string, digitCount: number) {
  if (digitCount <= 0) return 0
  let seen = 0
  for (let i = 0; i < formatted.length; i += 1) {
    if (/\d/.test(formatted[i]!)) {
      seen += 1
      if (seen === digitCount) return i + 1
    }
  }
  return formatted.length
}

export function formatPhoneDisplay(value: string | null | undefined) {
  if (!value?.trim()) return 'Not set'
  const { country, national } = parsePhoneValue(value)
  if (!national) return `+${country.dial}`
  return `+${country.dial} ${formatNationalNumber(national, country.iso)}`
}

export function sortedCountriesForSearch(query: string) {
  const q = query.trim().toLowerCase().replace(/^\+/, '')
  const list = [...COUNTRIES].sort((a, b) => {
    const aPref = PREFERRED_ISO.indexOf(a.iso)
    const bPref = PREFERRED_ISO.indexOf(b.iso)
    if (aPref !== -1 || bPref !== -1) {
      if (aPref === -1) return 1
      if (bPref === -1) return -1
      return aPref - bPref
    }
    return a.name.localeCompare(b.name)
  })

  if (!q) return list

  return list.filter((country) => {
    return (
      country.name.toLowerCase().includes(q) ||
      country.iso.toLowerCase().includes(q) ||
      country.dial.includes(q) ||
      `+${country.dial}`.includes(q)
    )
  })
}
