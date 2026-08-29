import { iconSourceTokens } from './names'
import { ICON_PACKS } from './sets'

const GROUPS: string[][] = [
  ['search', 'find', 'lookup', 'magnify', 'magnifier', 'query', 'inspect'],
  ['home', 'house', 'start', 'dashboard'],
  ['menu', 'hamburger', 'nav', 'navigation', 'sidebar'],
  ['back', 'return', 'previous'],
  ['forward', 'next', 'continue'],
  ['arrow', 'direction', 'pointer', 'caret', 'chevron'],
  ['up', 'upward', 'above', 'ascend'],
  ['down', 'downward', 'below', 'descend'],
  ['left', 'leftward', 'west'],
  ['right', 'rightward', 'east'],
  ['add', 'plus', 'create', 'new', 'insert'],
  ['remove', 'minus', 'subtract', 'decrease'],
  ['delete', 'trash', 'bin', 'waste', 'discard'],
  ['edit', 'pencil', 'pen', 'write', 'modify', 'compose'],
  ['save', 'disk', 'floppy'],
  ['download', 'saveas', 'export'],
  ['upload', 'import', 'sendfile'],
  ['share', 'forwarding', 'send'],
  ['copy', 'duplicate', 'clone', 'clipboard'],
  ['paste', 'insertclip'],
  ['cut', 'scissors'],
  ['undo', 'revert', 'counterclockwise'],
  ['redo', 'repeat', 'clockwise'],
  ['refresh', 'reload', 'sync', 'update', 'rotate'],
  ['close', 'dismiss', 'cancel', 'x', 'times', 'exit'],
  ['check', 'checkmark', 'done', 'complete', 'success', 'tick', 'ok'],
  ['error', 'fail', 'failure', 'danger', 'critical'],
  ['warning', 'alert', 'caution', 'triangle'],
  ['info', 'information', 'help', 'question', 'support'],
  ['eye', 'view', 'visible', 'visibility', 'show', 'preview'],
  ['hide', 'hidden', 'invisible', 'blind', 'off'],
  ['filter', 'funnel', 'refine'],
  ['sort', 'order', 'arrange'],
  ['user', 'person', 'profile', 'account', 'avatar', 'member', 'contact'],
  ['people', 'group', 'team', 'users', 'community'],
  ['mail', 'email', 'envelope', 'inbox', 'message'],
  ['chat', 'comment', 'bubble', 'conversation', 'talk'],
  ['phone', 'call', 'telephone', 'mobile', 'handset'],
  ['bell', 'notification', 'alertbell', 'ring'],
  ['play', 'startmedia', 'resume'],
  ['pause', 'hold'],
  ['stop', 'halt'],
  ['record', 'rec'],
  ['camera', 'photo', 'photograph', 'snapshot', 'capture'],
  ['image', 'picture', 'gallery', 'media'],
  ['video', 'film', 'movie'],
  ['music', 'audio', 'song', 'note', 'sound'],
  ['volume', 'speaker', 'loud', 'quiet'],
  ['mute', 'silent', 'nosound'],
  ['mic', 'microphone', 'voice', 'speak'],
  ['file', 'document', 'page', 'paper', 'doc'],
  ['folder', 'directory', 'archive'],
  ['attach', 'attachment', 'paperclip', 'clip'],
  ['settings', 'gear', 'cog', 'preferences', 'config', 'options', 'tune', 'sliders'],
  ['lock', 'locked', 'secure', 'security', 'padlock', 'private'],
  ['unlock', 'unlocked', 'openlock', 'public'],
  ['key', 'access', 'password', 'credential', 'token'],
  ['shield', 'protect', 'guard', 'safety'],
  ['fingerprint', 'biometric', 'touchid'],
  ['cart', 'basket', 'checkout', 'commerce'],
  ['bag', 'shopping', 'purchase', 'buy', 'shop', 'store'],
  ['card', 'payment', 'credit', 'debit'],
  ['money', 'currency', 'dollar', 'cash', 'banknote', 'finance'],
  ['price', 'tag', 'label', 'offer'],
  ['clock', 'time', 'watch', 'hour', 'schedule'],
  ['calendar', 'date', 'day', 'event', 'agenda'],
  ['history', 'past', 'recent'],
  ['map', 'location', 'pin', 'marker', 'place', 'gps'],
  ['globe', 'world', 'earth', 'web', 'internet', 'language'],
  ['compass', 'navigate', 'bearing'],
  ['laptop', 'computer', 'notebook', 'pc'],
  ['desktop', 'monitor', 'display', 'screen'],
  ['tablet', 'ipad'],
  ['printer', 'print'],
  ['battery', 'charge', 'power'],
  ['wifi', 'wireless', 'network', 'signal', 'connection', 'rss', 'broadcast', 'antenna'],
  ['bluetooth', 'pair'],
  ['sun', 'day', 'light', 'daytime', 'bright'],
  ['moon', 'night', 'dark', 'sleep'],
  ['cloud', 'weather', 'overcast'],
  ['rain', 'storm', 'shower'],
  ['snow', 'winter', 'cold'],
  ['wind', 'breeze', 'air'],
  ['heart', 'like', 'love', 'favorite', 'favourite'],
  ['star', 'rating', 'bookmark', 'featured'],
  ['flag', 'report', 'mark'],
  ['link', 'url', 'chain', 'bind', 'hyperlink'],
  ['fire', 'flame', 'hot', 'trending'],
  ['zap', 'lightning', 'bolt', 'flash', 'energy'],
  ['grid', 'matrix', 'tiles', 'gallery', 'apps'],
  ['list', 'rows', 'items', 'bullets'],
  ['layout', 'template', 'frame', 'artboard'],
  ['code', 'source', 'developer', 'programming', 'chevrons'],
  ['terminal', 'console', 'cli', 'prompt', 'shell'],
  ['bug', 'debug', 'issue', 'defect'],
  ['git', 'branch', 'commit', 'version'],
  ['database', 'data', 'storage', 'server', 'table'],
  ['chart', 'graph', 'analytics', 'stats', 'metrics'],
  ['bold', 'italic', 'underline', 'typography', 'font', 'text', 'type'],
  ['align', 'leftalign', 'rightalign', 'center', 'justify'],
  ['crop', 'resize', 'scale'],
  ['zoom', 'enlarge', 'shrink'],
  ['external', 'launch', 'openaway', 'outbound'],
  ['login', 'signin', 'enter', 'session'],
  ['logout', 'signout', 'leave'],
  ['downloadcloud', 'uploadcloud'],
  ['box', 'package', 'parcel', 'shipping'],
  ['truck', 'delivery', 'shippingvan'],
  ['plane', 'flight', 'travel', 'airport'],
  ['car', 'vehicle', 'drive', 'auto'],
  ['bike', 'bicycle', 'cycle'],
  ['train', 'rail', 'subway'],
  ['bus', 'transit'],
  ['anchor', 'nautical', 'ship', 'boat'],
  ['coffee', 'cafe', 'drink', 'beverage'],
  ['food', 'meal', 'restaurant', 'eat'],
  ['gift', 'present', 'reward'],
  ['award', 'badge', 'medal', 'trophy', 'achievement'],
  ['sparkle', 'shine', 'highlight', 'magic', 'newfeature'],
  ['palette', 'color', 'swatch', 'paint', 'theme'],
  ['contrast', 'lightmode', 'darkmode', 'appearance'],
  ['logo', 'brand', 'identity', 'wordmark'],
  ['github', 'octocat', 'repository', 'opensource'],
  ['twitter', 'xsocial', 'social'],
  ['facebook', 'meta', 'socialnetwork'],
  ['google', 'gmail', 'searchengine'],
  ['apple', 'ios', 'macos'],
  ['android', 'playstore'],
  ['book', 'read', 'library', 'learn'],
  ['graduation', 'education', 'school', 'university'],
  ['briefcase', 'work', 'job', 'office', 'business'],
  ['building', 'city', 'companyhq'],
  ['pinpaper', 'sticky', 'note'],
  ['inbox', 'tray', 'received'],
  ['outbox', 'sent'],
  ['reply', 'respond'],
  ['forwardmail', 'redirect'],
  ['printscreen', 'screenshot'],
  ['fullscreen', 'expand', 'maximize'],
  ['minimize', 'collapse', 'window'],
  ['more', 'ellipsis', 'kebab', 'overflow', 'dots'],
  ['drag', 'move', 'handle', 'reorder'],
  ['pin', 'unpin', 'stick'],
  ['hammer', 'tool', 'build', 'wrench', 'repair'],
  ['lab', 'science', 'beaker', 'experiment'],
  ['health', 'medical', 'hospital', 'plusmedical'],
  ['accessibility', 'a11y', 'wheelchair', 'inclusive'],
  ['translate', 'language', 'locale', 'i18n'],
  ['notificationdot', 'status', 'unread'],
]

const MEANING: Record<string, string[]> = {}
for (const group of GROUPS) {
  for (const word of group) {
    const extra = group.filter((item) => item !== word)
    MEANING[word] = [...new Set([...(MEANING[word] ?? []), ...extra])]
  }
}

const STYLE_TAGS: Record<string, string[]> = {
  OutlineStroke: ['outline'],
  SolidFill: ['fill', 'solid'],
  DualTone: ['duotone'],
  BrandLogo: ['brand', 'logo'],
  RegularLine: ['regular', 'line'],
  CompactMini: ['mini', 'compact'],
  SharpFill: ['sharp'],
  LightWeight: ['lightweight'],
  BoldWeight: ['boldweight'],
  ThinWeight: ['thinweight'],
}

const KIT_TAGS: Record<string, string[]> = {
  DkRoboticelaBrandLogo: ['roboticela', 'logo', 'brand', 'company', 'mark', 'identity'],
  DkProductBrandMarkBadge: ['logo', 'brand', 'badge', 'product', 'mark'],
  DkAccessTokenKeyhole: ['token', 'key', 'access', 'auth', 'security', 'api'],
  DkLayeredStackPlanes: ['stack', 'layers', 'depth', 'planes'],
  DkProductSparkleHighlightBurst: ['sparkle', 'highlight', 'new', 'feature', 'magic'],
  DkBranchingFlowNodes: ['flow', 'nodes', 'graph', 'workflow', 'branch'],
  DkTypographyLetterformsPair: ['typography', 'font', 'type', 'letters', 'text'],
  DkColorSwatchTiles: ['color', 'swatch', 'palette', 'theme'],
  DkInsertionSlotPlus: ['add', 'insert', 'slot', 'create', 'plus'],
  DkDocumentPageFold: ['document', 'file', 'page', 'paper'],
  DkSignalPulseRings: ['signal', 'pulse', 'live', 'activity', 'status'],
  DkSourceCodeChevronsPair: ['code', 'source', 'developer', 'chevrons'],
  DkLightDarkContrastSplit: ['theme', 'light', 'dark', 'contrast', 'appearance'],
  DkHexagonNodeHub: ['node', 'hub', 'network', 'hexagon'],
  DkArtboardCropMarksFrame: ['artboard', 'frame', 'crop', 'design', 'layout'],
  DkLinkedChainBind: ['link', 'chain', 'url', 'bind', 'connect'],
  DkDotGridMatrix: ['grid', 'dots', 'matrix', 'layout'],
  DkGithubOctocatBrandLogo: ['github', 'octocat', 'git', 'code', 'brand', 'social'],
}

const STOP = new Set([
  'a',
  'an',
  'the',
  'of',
  'and',
  'or',
  'to',
  'for',
  'in',
  'on',
  'at',
  'by',
  'with',
  'from',
  'is',
  'it',
  'as',
  'dk',
  'kit',
  'fa',
  'md',
  'hi',
  'io',
  'gi',
  'tb',
  'pi',
  'ri',
  'si',
  'bs',
  'bi',
  'ai',
  'fi',
  'go',
  'gr',
  'cg',
  'di',
  'im',
  'lu',
  'wi',
  'ti',
  'ci',
  'rx',
  'sl',
  'fc',
  'vsc',
  'tfi',
  'lia',
  'hi2',
  'io5',
  'fa6',
  'ioios',
  'iomd',
  'illustrated',
  'mark',
  'glyph',
])

const PACK_LABEL = Object.fromEntries(ICON_PACKS.map((pack) => [pack.id, pack.label.toLowerCase()]))

function addTag(tags: string[], seen: Set<string>, value: string, allowStop = false) {
  const tag = value.trim().toLowerCase()
  if (!tag || tag.length < 2 || /^\d+$/.test(tag) || seen.has(tag)) return
  if (!allowStop && STOP.has(tag)) return
  seen.add(tag)
  tags.push(tag)
}

export function iconTags(pack: string, key: string, name: string): string[] {
  const source = iconSourceTokens(pack, key)
  const tags: string[] = []
  const seen = new Set<string>()

  for (const extra of KIT_TAGS[name] ?? []) addTag(tags, seen, extra, true)

  for (const word of source.words) {
    addTag(tags, seen, word)
    for (const synonym of MEANING[word.toLowerCase()] ?? []) addTag(tags, seen, synonym)
  }

  if (source.style) {
    for (const tag of STYLE_TAGS[source.style] ?? []) addTag(tags, seen, tag)
  }

  return tags
}

export function describeIcon(pack: string, key: string, name: string): { tags: string[]; search: string } {
  const tags = iconTags(pack, key, name)
  const search = [name, key, pack, PACK_LABEL[pack] ?? '', ...tags].join(' ').toLowerCase()
  return { tags, search }
}
