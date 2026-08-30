export type SubdivisionKind = 'state' | 'province' | 'territory' | 'emirate' | 'nation' | 'region'

export type Subdivision = {
  id: string
  country: string
  code: string
  name: string
  kind: SubdivisionKind
}

export type County = {
  id: string
  subdivision: string
  name: string
}

export type City = {
  id: string
  country: string
  subdivision: string
  county?: string
  name: string
}

function pack(
  country: string,
  kind: SubdivisionKind,
  rows: readonly (readonly [string, string])[],
): Subdivision[] {
  return rows.map(([code, name]) => ({
    id: `${country}-${code}`,
    country,
    code,
    name,
    kind,
  }))
}

/** ISO 3166-2 starter catalog for address forms. Pass `items` on a select to use your own list. */
export const SUBDIVISIONS: Subdivision[] = [
  ...pack('US', 'state', [
    ['AL', 'Alabama'],
    ['AK', 'Alaska'],
    ['AZ', 'Arizona'],
    ['AR', 'Arkansas'],
    ['CA', 'California'],
    ['CO', 'Colorado'],
    ['CT', 'Connecticut'],
    ['DE', 'Delaware'],
    ['DC', 'District of Columbia'],
    ['FL', 'Florida'],
    ['GA', 'Georgia'],
    ['HI', 'Hawaii'],
    ['ID', 'Idaho'],
    ['IL', 'Illinois'],
    ['IN', 'Indiana'],
    ['IA', 'Iowa'],
    ['KS', 'Kansas'],
    ['KY', 'Kentucky'],
    ['LA', 'Louisiana'],
    ['ME', 'Maine'],
    ['MD', 'Maryland'],
    ['MA', 'Massachusetts'],
    ['MI', 'Michigan'],
    ['MN', 'Minnesota'],
    ['MS', 'Mississippi'],
    ['MO', 'Missouri'],
    ['MT', 'Montana'],
    ['NE', 'Nebraska'],
    ['NV', 'Nevada'],
    ['NH', 'New Hampshire'],
    ['NJ', 'New Jersey'],
    ['NM', 'New Mexico'],
    ['NY', 'New York'],
    ['NC', 'North Carolina'],
    ['ND', 'North Dakota'],
    ['OH', 'Ohio'],
    ['OK', 'Oklahoma'],
    ['OR', 'Oregon'],
    ['PA', 'Pennsylvania'],
    ['RI', 'Rhode Island'],
    ['SC', 'South Carolina'],
    ['SD', 'South Dakota'],
    ['TN', 'Tennessee'],
    ['TX', 'Texas'],
    ['UT', 'Utah'],
    ['VT', 'Vermont'],
    ['VA', 'Virginia'],
    ['WA', 'Washington'],
    ['WV', 'West Virginia'],
    ['WI', 'Wisconsin'],
    ['WY', 'Wyoming'],
  ]),
  ...pack('CA', 'province', [
    ['AB', 'Alberta'],
    ['BC', 'British Columbia'],
    ['MB', 'Manitoba'],
    ['NB', 'New Brunswick'],
    ['NL', 'Newfoundland and Labrador'],
    ['NS', 'Nova Scotia'],
    ['ON', 'Ontario'],
    ['PE', 'Prince Edward Island'],
    ['QC', 'Quebec'],
    ['SK', 'Saskatchewan'],
  ]),
  ...pack('CA', 'territory', [
    ['NT', 'Northwest Territories'],
    ['NU', 'Nunavut'],
    ['YT', 'Yukon'],
  ]),
  ...pack('PK', 'province', [
    ['BA', 'Balochistan'],
    ['GB', 'Gilgit-Baltistan'],
    ['JK', 'Azad Jammu and Kashmir'],
    ['KP', 'Khyber Pakhtunkhwa'],
    ['PB', 'Punjab'],
    ['SD', 'Sindh'],
  ]),
  ...pack('PK', 'territory', [['IS', 'Islamabad Capital Territory']]),
  ...pack('AU', 'state', [
    ['NSW', 'New South Wales'],
    ['QLD', 'Queensland'],
    ['SA', 'South Australia'],
    ['TAS', 'Tasmania'],
    ['VIC', 'Victoria'],
    ['WA', 'Western Australia'],
  ]),
  ...pack('AU', 'territory', [
    ['ACT', 'Australian Capital Territory'],
    ['NT', 'Northern Territory'],
  ]),
  ...pack('AE', 'emirate', [
    ['AZ', 'Abu Dhabi'],
    ['AJ', 'Ajman'],
    ['DU', 'Dubai'],
    ['FU', 'Fujairah'],
    ['RK', 'Ras Al Khaimah'],
    ['SH', 'Sharjah'],
    ['UQ', 'Umm Al Quwain'],
  ]),
  ...pack('GB', 'nation', [
    ['ENG', 'England'],
    ['NIR', 'Northern Ireland'],
    ['SCT', 'Scotland'],
    ['WLS', 'Wales'],
  ]),
  ...pack('DE', 'state', [
    ['BW', 'Baden-Württemberg'],
    ['BY', 'Bavaria'],
    ['BE', 'Berlin'],
    ['BB', 'Brandenburg'],
    ['HB', 'Bremen'],
    ['HH', 'Hamburg'],
    ['HE', 'Hesse'],
    ['MV', 'Mecklenburg-Vorpommern'],
    ['NI', 'Lower Saxony'],
    ['NW', 'North Rhine-Westphalia'],
    ['RP', 'Rhineland-Palatinate'],
    ['SL', 'Saarland'],
    ['SN', 'Saxony'],
    ['ST', 'Saxony-Anhalt'],
    ['SH', 'Schleswig-Holstein'],
    ['TH', 'Thuringia'],
  ]),
]

function counties(rows: readonly (readonly [string, string, string])[]): County[] {
  return rows.map(([subdivision, slug, name]) => ({
    id: `${subdivision}:${slug}`,
    subdivision,
    name,
  }))
}

export const COUNTIES: County[] = counties([
  ['US-CA', 'alameda', 'Alameda'],
  ['US-CA', 'los-angeles', 'Los Angeles'],
  ['US-CA', 'orange', 'Orange'],
  ['US-CA', 'sacramento', 'Sacramento'],
  ['US-CA', 'san-diego', 'San Diego'],
  ['US-CA', 'san-francisco', 'San Francisco'],
  ['US-CA', 'santa-clara', 'Santa Clara'],
  ['US-NY', 'bronx', 'Bronx'],
  ['US-NY', 'kings', 'Kings'],
  ['US-NY', 'nassau', 'Nassau'],
  ['US-NY', 'new-york', 'New York'],
  ['US-NY', 'queens', 'Queens'],
  ['US-NY', 'suffolk', 'Suffolk'],
  ['US-NY', 'westchester', 'Westchester'],
  ['US-TX', 'bexar', 'Bexar'],
  ['US-TX', 'dallas', 'Dallas'],
  ['US-TX', 'harris', 'Harris'],
  ['US-TX', 'travis', 'Travis'],
  ['US-IL', 'cook', 'Cook'],
  ['US-WA', 'king', 'King'],
  ['US-FL', 'miami-dade', 'Miami-Dade'],
  ['PK-SD', 'hyderabad', 'Hyderabad'],
  ['PK-SD', 'karachi-central', 'Karachi Central'],
  ['PK-SD', 'karachi-east', 'Karachi East'],
  ['PK-SD', 'karachi-south', 'Karachi South'],
  ['PK-SD', 'karachi-west', 'Karachi West'],
  ['PK-SD', 'korangi', 'Korangi'],
  ['PK-SD', 'malir', 'Malir'],
  ['PK-SD', 'sukkur', 'Sukkur'],
  ['PK-PB', 'faisalabad', 'Faisalabad'],
  ['PK-PB', 'lahore', 'Lahore'],
  ['PK-PB', 'multan', 'Multan'],
  ['PK-PB', 'rawalpindi', 'Rawalpindi'],
  ['PK-KP', 'peshawar', 'Peshawar'],
  ['PK-BA', 'quetta', 'Quetta'],
  ['PK-IS', 'islamabad', 'Islamabad'],
  ['GB-ENG', 'greater-london', 'Greater London'],
  ['GB-ENG', 'greater-manchester', 'Greater Manchester'],
  ['GB-ENG', 'west-midlands', 'West Midlands'],
  ['GB-ENG', 'west-yorkshire', 'West Yorkshire'],
  ['GB-SCT', 'city-of-edinburgh', 'City of Edinburgh'],
  ['GB-WLS', 'cardiff', 'Cardiff'],
  ['GB-NIR', 'belfast', 'Belfast'],
])

function cities(rows: readonly (readonly [string, string, string, string])[]): City[] {
  return rows.map(([subdivision, countySlug, slug, name]) => ({
    id: `${subdivision}:${slug}`,
    country: subdivision.slice(0, 2),
    subdivision,
    county: countySlug ? `${subdivision}:${countySlug}` : undefined,
    name,
  }))
}

export const CITIES: City[] = cities([
  ['US-CA', 'los-angeles', 'los-angeles', 'Los Angeles'],
  ['US-CA', 'los-angeles', 'long-beach', 'Long Beach'],
  ['US-CA', 'los-angeles', 'pasadena', 'Pasadena'],
  ['US-CA', 'los-angeles', 'santa-monica', 'Santa Monica'],
  ['US-CA', 'orange', 'anaheim', 'Anaheim'],
  ['US-CA', 'orange', 'irvine', 'Irvine'],
  ['US-CA', 'san-diego', 'san-diego', 'San Diego'],
  ['US-CA', 'san-francisco', 'san-francisco', 'San Francisco'],
  ['US-CA', 'santa-clara', 'san-jose', 'San Jose'],
  ['US-CA', 'alameda', 'oakland', 'Oakland'],
  ['US-CA', 'sacramento', 'sacramento', 'Sacramento'],
  ['US-NY', 'new-york', 'new-york', 'New York'],
  ['US-NY', 'kings', 'brooklyn', 'Brooklyn'],
  ['US-NY', 'queens', 'queens', 'Queens'],
  ['US-NY', 'bronx', 'bronx', 'The Bronx'],
  ['US-NY', 'westchester', 'yonkers', 'Yonkers'],
  ['US-TX', 'harris', 'houston', 'Houston'],
  ['US-TX', 'dallas', 'dallas', 'Dallas'],
  ['US-TX', 'travis', 'austin', 'Austin'],
  ['US-TX', 'bexar', 'san-antonio', 'San Antonio'],
  ['US-IL', 'cook', 'chicago', 'Chicago'],
  ['US-WA', 'king', 'seattle', 'Seattle'],
  ['US-FL', 'miami-dade', 'miami', 'Miami'],
  ['US-AZ', '', 'phoenix', 'Phoenix'],
  ['US-CO', '', 'denver', 'Denver'],
  ['US-GA', '', 'atlanta', 'Atlanta'],
  ['US-MA', '', 'boston', 'Boston'],
  ['US-DC', '', 'washington', 'Washington'],
  ['PK-SD', 'karachi-south', 'karachi', 'Karachi'],
  ['PK-SD', 'hyderabad', 'hyderabad', 'Hyderabad'],
  ['PK-SD', 'sukkur', 'sukkur', 'Sukkur'],
  ['PK-PB', 'lahore', 'lahore', 'Lahore'],
  ['PK-PB', 'rawalpindi', 'rawalpindi', 'Rawalpindi'],
  ['PK-PB', 'faisalabad', 'faisalabad', 'Faisalabad'],
  ['PK-PB', 'multan', 'multan', 'Multan'],
  ['PK-KP', 'peshawar', 'peshawar', 'Peshawar'],
  ['PK-BA', 'quetta', 'quetta', 'Quetta'],
  ['PK-IS', 'islamabad', 'islamabad', 'Islamabad'],
  ['CA-ON', '', 'toronto', 'Toronto'],
  ['CA-ON', '', 'ottawa', 'Ottawa'],
  ['CA-ON', '', 'mississauga', 'Mississauga'],
  ['CA-BC', '', 'vancouver', 'Vancouver'],
  ['CA-QC', '', 'montreal', 'Montreal'],
  ['CA-AB', '', 'calgary', 'Calgary'],
  ['AU-NSW', '', 'sydney', 'Sydney'],
  ['AU-VIC', '', 'melbourne', 'Melbourne'],
  ['AU-QLD', '', 'brisbane', 'Brisbane'],
  ['AU-WA', '', 'perth', 'Perth'],
  ['AU-SA', '', 'adelaide', 'Adelaide'],
  ['AU-ACT', '', 'canberra', 'Canberra'],
  ['AE-DU', '', 'dubai', 'Dubai'],
  ['AE-AZ', '', 'abu-dhabi', 'Abu Dhabi'],
  ['AE-SH', '', 'sharjah', 'Sharjah'],
  ['GB-ENG', 'greater-london', 'london', 'London'],
  ['GB-ENG', 'greater-manchester', 'manchester', 'Manchester'],
  ['GB-ENG', 'west-midlands', 'birmingham', 'Birmingham'],
  ['GB-SCT', 'city-of-edinburgh', 'edinburgh', 'Edinburgh'],
  ['GB-WLS', 'cardiff', 'cardiff', 'Cardiff'],
  ['GB-NIR', 'belfast', 'belfast', 'Belfast'],
  ['DE-BE', '', 'berlin', 'Berlin'],
  ['DE-BY', '', 'munich', 'Munich'],
  ['DE-HH', '', 'hamburg', 'Hamburg'],
  ['DE-HE', '', 'frankfurt', 'Frankfurt'],
  ['DE-NW', '', 'cologne', 'Cologne'],
])

function matches(query: string, ...parts: Array<string | undefined>) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return parts.some((part) => part?.toLowerCase().includes(q))
}

export function findSubdivision(id: string | null | undefined) {
  if (!id) return null
  return SUBDIVISIONS.find((item) => item.id === id) ?? null
}

export function findCounty(id: string | null | undefined) {
  if (!id) return null
  return COUNTIES.find((item) => item.id === id) ?? null
}

export function findCity(id: string | null | undefined) {
  if (!id) return null
  return CITIES.find((item) => item.id === id) ?? null
}

export function stateDisplayName(id: string | null | undefined) {
  return findSubdivision(id)?.name ?? (id || 'Not set')
}

export function countyDisplayName(id: string | null | undefined) {
  return findCounty(id)?.name ?? (id || 'Not set')
}

export function cityDisplayName(id: string | null | undefined) {
  return findCity(id)?.name ?? (id || 'Not set')
}

export function subdivisionNoun(country: string | null | undefined) {
  switch (country?.toUpperCase()) {
    case 'CA':
    case 'PK':
      return 'Province'
    case 'AE':
      return 'Emirate'
    case 'GB':
      return 'Nation'
    case 'US':
    case 'AU':
    case 'DE':
    case 'IN':
    case 'MX':
      return 'State'
    default:
      return 'State or province'
  }
}

export function sortedSubdivisionsForSearch(query: string, country?: string | null) {
  const iso = country?.trim().toUpperCase()
  const list = SUBDIVISIONS.filter((item) => !iso || item.country === iso).sort((a, b) =>
    a.name.localeCompare(b.name),
  )
  return list.filter((item) => matches(query, item.name, item.code, item.id, item.country))
}

export function sortedCountiesForSearch(query: string, subdivision?: string | null) {
  const parent = subdivision?.trim()
  const list = COUNTIES.filter((item) => !parent || item.subdivision === parent).sort((a, b) =>
    a.name.localeCompare(b.name),
  )
  return list.filter((item) => matches(query, item.name, item.id, item.subdivision))
}

export function sortedCitiesForSearch(
  query: string,
  scope: { country?: string | null; subdivision?: string | null; county?: string | null } = {},
) {
  const country = scope.country?.trim().toUpperCase()
  const subdivision = scope.subdivision?.trim()
  const county = scope.county?.trim()
  const list = CITIES.filter((item) => {
    if (county) return item.county === county
    if (subdivision) return item.subdivision === subdivision
    if (country) return item.country === country
    return true
  }).sort((a, b) => a.name.localeCompare(b.name))
  return list.filter((item) => matches(query, item.name, item.id, item.subdivision, item.county))
}
