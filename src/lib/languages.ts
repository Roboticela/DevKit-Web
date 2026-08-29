export type Language = {
  id: string
  name: string
  native: string
}

/** Display languages for locale pickers. Only listed ids in AVAILABLE_LANGUAGE_IDS are selectable. */
export const LANGUAGES: Language[] = [
  { id: 'en-US', name: 'English (United States)', native: 'English' },
  { id: 'en-GB', name: 'English (United Kingdom)', native: 'English' },
  { id: 'en-AU', name: 'English (Australia)', native: 'English' },
  { id: 'en-CA', name: 'English (Canada)', native: 'English' },
  { id: 'ar-SA', name: 'Arabic', native: 'العربية' },
  { id: 'bn-BD', name: 'Bengali', native: 'বাংলা' },
  { id: 'zh-CN', name: 'Chinese (Simplified)', native: '简体中文' },
  { id: 'zh-TW', name: 'Chinese (Traditional)', native: '繁體中文' },
  { id: 'hr-HR', name: 'Croatian', native: 'Hrvatski' },
  { id: 'cs-CZ', name: 'Czech', native: 'Čeština' },
  { id: 'da-DK', name: 'Danish', native: 'Dansk' },
  { id: 'nl-NL', name: 'Dutch', native: 'Nederlands' },
  { id: 'fi-FI', name: 'Finnish', native: 'Suomi' },
  { id: 'fr-FR', name: 'French', native: 'Français' },
  { id: 'fr-CA', name: 'French (Canada)', native: 'Français' },
  { id: 'de-DE', name: 'German', native: 'Deutsch' },
  { id: 'el-GR', name: 'Greek', native: 'Ελληνικά' },
  { id: 'gu-IN', name: 'Gujarati', native: 'ગુજરાતી' },
  { id: 'he-IL', name: 'Hebrew', native: 'עברית' },
  { id: 'hi-IN', name: 'Hindi', native: 'हिन्दी' },
  { id: 'hu-HU', name: 'Hungarian', native: 'Magyar' },
  { id: 'id-ID', name: 'Indonesian', native: 'Bahasa Indonesia' },
  { id: 'it-IT', name: 'Italian', native: 'Italiano' },
  { id: 'ja-JP', name: 'Japanese', native: '日本語' },
  { id: 'kn-IN', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { id: 'ko-KR', name: 'Korean', native: '한국어' },
  { id: 'ms-MY', name: 'Malay', native: 'Bahasa Melayu' },
  { id: 'ml-IN', name: 'Malayalam', native: 'മലയാളം' },
  { id: 'mr-IN', name: 'Marathi', native: 'मराठी' },
  { id: 'nb-NO', name: 'Norwegian', native: 'Norsk' },
  { id: 'fa-IR', name: 'Persian', native: 'فارسی' },
  { id: 'pl-PL', name: 'Polish', native: 'Polski' },
  { id: 'pt-BR', name: 'Portuguese (Brazil)', native: 'Português' },
  { id: 'pt-PT', name: 'Portuguese (Portugal)', native: 'Português' },
  { id: 'pa-IN', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { id: 'ro-RO', name: 'Romanian', native: 'Română' },
  { id: 'ru-RU', name: 'Russian', native: 'Русский' },
  { id: 'sk-SK', name: 'Slovak', native: 'Slovenčina' },
  { id: 'es-ES', name: 'Spanish (Spain)', native: 'Español' },
  { id: 'es-MX', name: 'Spanish (Mexico)', native: 'Español' },
  { id: 'sv-SE', name: 'Swedish', native: 'Svenska' },
  { id: 'ta-IN', name: 'Tamil', native: 'தமிழ்' },
  { id: 'te-IN', name: 'Telugu', native: 'తెలుగు' },
  { id: 'th-TH', name: 'Thai', native: 'ไทย' },
  { id: 'tr-TR', name: 'Turkish', native: 'Türkçe' },
  { id: 'uk-UA', name: 'Ukrainian', native: 'Українська' },
  { id: 'ur-PK', name: 'Urdu', native: 'اردو' },
  { id: 'vi-VN', name: 'Vietnamese', native: 'Tiếng Việt' },
]

/** Currently shipping locales. */
export const AVAILABLE_LANGUAGE_IDS = ['en-US'] as const

/** Currently shipping storefront countries. */
export const AVAILABLE_COUNTRY_ISOS = ['PK'] as const

export function languageDisplayName(id: string | null | undefined) {
  if (!id) return 'Not set'
  return LANGUAGES.find((language) => language.id === id)?.name ?? id
}

export function sortedLanguagesForSearch(query: string) {
  const q = query.trim().toLowerCase()
  const list = [...LANGUAGES].sort((a, b) => a.name.localeCompare(b.name))
  if (!q) return list
  return list.filter((language) => {
    return (
      language.name.toLowerCase().includes(q) ||
      language.native.toLowerCase().includes(q) ||
      language.id.toLowerCase().includes(q)
    )
  })
}
