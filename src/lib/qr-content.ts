import { brand } from '@/lib/devkit'

export const QR_CONTENT_KINDS = [
  'text',
  'url',
  'totp',
  'email',
  'phone',
  'sms',
  'wifi',
  'geo',
] as const

export type QrContentKind = (typeof QR_CONTENT_KINDS)[number]

export type QrContent =
  | { kind: 'text'; text: string }
  | { kind: 'url'; href: string }
  | { kind: 'totp'; secret: string; issuer?: string; accountName?: string }
  | { kind: 'email'; to: string; subject?: string; body?: string }
  | { kind: 'phone'; number: string }
  | { kind: 'sms'; number: string; message?: string }
  | {
      kind: 'wifi'
      ssid: string
      password?: string
      encryption?: 'WPA' | 'WEP' | 'nopass'
      hidden?: boolean
    }
  | { kind: 'geo'; latitude: number; longitude: number }

function escapeWifiField(value: string) {
  return value.replace(/([\\;,"])/g, '\\$1')
}

export function buildTotpAuthUri({
  secret,
  issuer = brand.companyName,
  accountName = 'user@example.com',
}: {
  secret: string
  issuer?: string
  accountName?: string
}) {
  const label = `${issuer}:${accountName}`
  const params = new URLSearchParams({ secret, issuer })
  return `otpauth://totp/${encodeURIComponent(label)}?${params.toString()}`
}

export function buildUrlQrValue(href: string) {
  return href.trim()
}

export function buildTextQrValue(text: string) {
  return text.trim()
}

export function buildEmailQrValue({
  to,
  subject,
  body,
}: {
  to: string
  subject?: string
  body?: string
}) {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const query = params.toString()
  return query ? `mailto:${to}?${query}` : `mailto:${to}`
}

export function buildPhoneQrValue(number: string) {
  return `tel:${number.trim()}`
}

export function buildSmsQrValue({ number, message }: { number: string; message?: string }) {
  const trimmed = number.trim()
  return message ? `SMSTO:${trimmed}:${message}` : `sms:${trimmed}`
}

export function buildWifiQrValue({
  ssid,
  password = '',
  encryption = password ? 'WPA' : 'nopass',
  hidden = false,
}: {
  ssid: string
  password?: string
  encryption?: 'WPA' | 'WEP' | 'nopass'
  hidden?: boolean
}) {
  const parts = [
    `T:${encryption}`,
    `S:${escapeWifiField(ssid)}`,
  ]
  if (encryption !== 'nopass') {
    parts.push(`P:${escapeWifiField(password)}`)
  }
  if (hidden) {
    parts.push('H:true')
  }
  return `WIFI:${parts.join(';')};;`
}

export function buildGeoQrValue({ latitude, longitude }: { latitude: number; longitude: number }) {
  return `geo:${latitude},${longitude}`
}

export function encodeQrContent(content: QrContent): string {
  switch (content.kind) {
    case 'text':
      return buildTextQrValue(content.text)
    case 'url':
      return buildUrlQrValue(content.href)
    case 'totp':
      return buildTotpAuthUri({
        secret: content.secret,
        issuer: content.issuer,
        accountName: content.accountName,
      })
    case 'email':
      return buildEmailQrValue(content)
    case 'phone':
      return buildPhoneQrValue(content.number)
    case 'sms':
      return buildSmsQrValue(content)
    case 'wifi':
      return buildWifiQrValue(content)
    case 'geo':
      return buildGeoQrValue(content)
    default:
      return ''
  }
}
