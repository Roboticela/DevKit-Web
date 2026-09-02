/**
 * Public API for @roboticela/devkit — FREE components only.
 * Premium pages, sections, and scaffolds are server-delivered packages
 * (see devkit page add / section add / scaffold add).
 */

// ── Primitives (free) ───────────────────────────────────────────────────────
export { Button } from '../components/Button'
export type { ButtonSize, ButtonVariant } from '../components/Button'
export { Modal } from '../components/Modal'
export type { ModalAction, ModalActionTone, ModalSize, ModalTone, ModalVariant } from '../components/Modal'
export { Alert } from '../components/Alert'
export type { AlertSize, AlertTone, AlertVariant } from '../components/Alert'
export { Badge } from '../components/Badge'
export type { BadgeShape, BadgeSize, BadgeTone, BadgeVariant } from '../components/Badge'
export { Avatar, AvatarGroup } from '../components/Avatar'
export type { AvatarShape, AvatarSize, AvatarStatus, AvatarTone, AvatarVariant } from '../components/Avatar'
export { TextField, AuthField } from '../components/TextField'
export type { TextFieldPreview, TextFieldSize, TextFieldVariant } from '../components/TextField'
export { Textarea } from '../components/Textarea'
export type { TextareaPreview, TextareaSize, TextareaVariant } from '../components/Textarea'
export { Checkbox, CheckboxGroup } from '../components/Checkbox'
export type { CheckboxPreview, CheckboxSize, CheckboxTone, CheckboxVariant } from '../components/Checkbox'
export { Switch, SwitchGroup, SwitchItem } from '../components/Switch'
export type { SwitchSize, SwitchVariant } from '../components/Switch'
export { Tabs } from '../components/Tabs'
export type { TabItem, TabsAlign, TabsPreview, TabsSize, TabsVariant } from '../components/Tabs'
export { DataTable } from '../components/DataTable'
export type { DataColumn, DataTableAlign, DataTableLayout, DataTablePreview, DataTableSize, DataTableVariant } from '../components/DataTable'
export { Pagination } from '../components/Pagination'
export type { PaginationAlign, PaginationLayout, PaginationPreview, PaginationSize, PaginationVariant } from '../components/Pagination'
export { Dropdown } from '../components/Dropdown'
export type { DropdownOption, SelectTriggerSize, SelectTriggerVariant } from '../components/Dropdown'
export { StatCard } from '../components/StatCard'
export type { StatCardAlign, StatCardDelta, StatCardProps, StatCardSize, StatCardTone, StatCardVariant } from '../components/StatCard'
export { EmptyState } from '../components/EmptyState'
export type { EmptyStateAlign, EmptyStateSize, EmptyStateTone, EmptyStateVariant } from '../components/EmptyState'
export { Loader } from '../components/Loader'
export type { LoaderLayout, LoaderSize, LoaderTone, LoaderVariant } from '../components/Loader'
export { Skeleton } from '../components/Skeleton'
export type { SkeletonMotion, SkeletonShape, SkeletonSize, SkeletonVariant } from '../components/Skeleton'
export { Divider } from '../components/Divider'
export type { DividerAlign, DividerOrientation, DividerSize, DividerTone, DividerVariant } from '../components/Divider'
export { Anchor } from '../components/Anchor'
export type { AnchorArrow, AnchorPreview, AnchorSize, AnchorTone, AnchorVariant } from '../components/Anchor'
export { IconButton } from '../components/IconButton'
export type { IconButtonSize, IconButtonStatus, IconButtonVariant } from '../components/IconButton'
export { ThemeToggle } from '../components/ThemeToggle'
export type { ThemeToggleVariant } from '../components/ThemeToggle'
export { BrandLogo } from '../components/BrandLogo'
export type { BrandLogoVariant } from '../components/BrandLogo'
export { PageHeader } from '../components/PageHeader'
export type { PageHeaderAlign, PageHeaderLayout, PageHeaderSize, PageHeaderVariant } from '../components/PageHeader'

export {
  DkAddPlusCreate,
  DkCloseDismissCancel,
  DkChevronCaretDown,
  DkChevronCaretLeft,
  DkChevronCaretRight,
  DkMagnifyingGlassFind,
  DkGearSettingsPreferences,
  DkNotificationBellAlert,
  DkPersonUserProfile,
  DkVisibilityEyeShown,
  DkVisibilityEyeHidden,
} from '../icons'

export { ThemeProvider, useTheme } from '../lib/theme'
export { brand } from '../lib/devkit'
export type { Brand } from '../lib/devkit'
