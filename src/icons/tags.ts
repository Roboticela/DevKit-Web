const ICON_TAGS: Record<string, string[]> = {
  DkDashboardOverviewGrid: ['dashboard', 'overview', 'grid', 'layout'],
  DkAnalyticsBarChart: ['analytics', 'chart', 'bars', 'stats'],
  DkActivityInsightsPulse: ['activity', 'pulse', 'insights', 'trend'],
  DkUsersPeopleGroup: ['users', 'people', 'team', 'group'],
  DkProjectsFolder: ['projects', 'folder', 'workspace'],
  DkRevenuePaymentsCard: ['revenue', 'payments', 'billing', 'card'],
  DkCalendarDateSchedule: ['calendar', 'date', 'schedule', 'events'],
  DkNotificationsBellAlert: ['notifications', 'bell', 'alert'],
  DkSettingsGearPreferences: ['settings', 'gear', 'preferences'],
  DkSearchMagnifyingGlass: ['search', 'find', 'magnify', 'lookup'],
  DkSecurityShieldVerified: ['security', 'shield', 'verified', 'auth'],
  DkHelpQuestionCircle: ['help', 'question', 'support', 'faq'],
  DkHomeHouse: ['home', 'house', 'start'],
  DkAddPlusCreate: ['add', 'plus', 'create', 'new'],
  DkArrowRightward: ['arrow', 'right', 'forward', 'next'],
  DkArrowLeftward: ['arrow', 'left', 'back', 'previous'],
  DkChevronCaretDown: ['chevron', 'caret', 'down', 'dropdown'],
  DkFilterFunnelNarrow: ['filter', 'funnel', 'sort'],
  DkDownloadArrowSave: ['download', 'save', 'export'],
  DkUploadArrowSend: ['upload', 'import', 'send'],
  DkPencilWriteEdit: ['edit', 'pencil', 'write'],
  DkDeleteRemoveTrash: ['delete', 'trash', 'remove'],
  DkClipboardCopyDuplicate: ['copy', 'duplicate', 'clipboard'],
  DkTaskCompleteCheckmark: ['check', 'done', 'complete', 'success'],
  DkCloseDismissCancel: ['close', 'cancel', 'dismiss'],
  DkMoreOptionsEllipsis: ['more', 'options', 'ellipsis'],
  DkMoreOptionsEllipsisVertical: ['more', 'options', 'ellipsis', 'vertical'],
  DkHyperlinkChainBind: ['link', 'url', 'chain', 'hyperlink'],
  DkEnvelopeMessageMail: ['mail', 'email', 'envelope'],
  DkChatMessageBubble: ['chat', 'message', 'bubble'],
  DkStarFavoriteRating: ['star', 'favorite', 'rating'],
  DkBookmarkRibbonSave: ['bookmark', 'save', 'ribbon'],
  DkVisibilityEyeShown: ['eye', 'visibility', 'view'],
  DkPadlockSecureClosed: ['lock', 'padlock', 'secure', 'password'],
  DkLightningBoltEnergy: ['lightning', 'bolt', 'energy'],
  DkAiSparkHighlightBurst: ['ai', 'spark', 'magic', 'assistant'],
  DkDatabaseCylinderStore: ['database', 'store', 'data'],
  DkCloudStorageWeather: ['cloud', 'storage', 'sync'],
  DkSourceCodeBrackets: ['code', 'source', 'developer'],
  DkTerminalCommandLine: ['terminal', 'command', 'shell'],
  DkServerStackRack: ['server', 'stack', 'host'],
  DkGlobeWorldEarth: ['globe', 'world', 'web'],
  DkFolderDirectory: ['folder', 'directory', 'files'],
  DkImagePhotoPicture: ['image', 'photo', 'picture'],
  DkNavigationMenuBars: ['navigation', 'menu', 'bars'],
  DkRoboticela: ['roboticela', 'logo', 'brand', 'mark'],
  DkDevKitBrandLogo: ['devkit', 'logo', 'brand', 'product'],
  DkGoogleBrandLogo: ['google', 'logo', 'brand', 'provider'],
  DkGithubOctocatBrandLogo: ['github', 'logo', 'brand', 'provider'],
  DkAppleBrandLogo: ['apple', 'logo', 'brand', 'provider'],
  DkMicrosoftBrandLogo: ['microsoft', 'logo', 'brand', 'provider'],
  DkFacebookBrandLogo: ['facebook', 'logo', 'brand', 'provider'],
  DkXBrandLogo: ['x', 'twitter', 'logo', 'brand', 'provider'],
  DkLinkedInBrandLogo: ['linkedin', 'logo', 'brand', 'provider'],
  DkDiscordBrandLogo: ['discord', 'logo', 'brand', 'provider'],
  DkSlackBrandLogo: ['slack', 'logo', 'brand', 'provider'],
  DkFingerprintBiometricScanPattern: ['passkey', 'fingerprint', 'biometric', 'provider'],
}

function splitTokens(name: string): string[] {
  const body = name.startsWith('Dk') ? name.slice(2) : name
  return body
    .replaceAll(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replaceAll(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
}

export function iconTags(name: string): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const token of [...splitTokens(name), ...(ICON_TAGS[name] ?? [])]) {
    const key = token.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    out.push(token)
  }
  return out
}

export function describeIcon(name: string): { tags: string[]; search: string } {
  const tags = iconTags(name)
  return { tags, search: [name, ...tags].join(' ').toLowerCase() }
}
