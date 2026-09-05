'use client'

import { useState, type ComponentProps, type ComponentType, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import {
  DkClipboardCopyDuplicate,
  DkFavoriteHeartLove,
  DkMessageInboxTray,
  DkAppDashboardLayoutTiles,
  DkPadlockSecureClosed,
  DkEnvelopeMessageMail,
  DkFingerprintBiometricScanPattern,
  DkDevicesDesktopAndMobile,
  DkRoundKeyAccess,
  DkPersonUserProfile,
  DkAtSign,
  DkFoldedMapTerritoryMapPinLocation,
  DkAddPlusCreate,
  DkRefreshClockwiseRotate,
  DkFloppyDiskSave,
  DkMagnifyingGlassFind,
  DkAnalogClockTime,
  DkGearSettingsPreferences,
  DkShareExportForward,
  DkSecurityShieldProtect,
  DkHandheldMobilePhone,
  DkWasteBinDelete,
  DkLayoutGrid,
  DkBulletedListItems,
  DkRowsThree,
  DkGlobeWorldEarth,
  DkTextAlignStart,
  DkTextAlignCenter,
  DkTextAlignEnd,
  DkTypographyBoldWeight,
  DkTypographyItalicSlant,
  DkTypographyUnderline,
  DkPencilWriteEdit,
  DkDocumentPageFold,
  DkNotificationBellAlert,
  DkLogoutExitSession,
  DkResidentialHouseHome,
  DkFileFolderDirectory,
  DkFileFolderDirectoryOpened,
  DkSparkleHighlightBurst,
  DkPaperBanknoteCurrency,
  DkPeopleUsersGroup,
  DkChartLine,
  DkSuccessCircleCheckmark,
  DkWarningTriangleAlert,
} from '@/icons'
import { Alert, ALERT_SIZES, ALERT_TONES, ALERT_VARIANTS, type AlertSize, type AlertTone, type AlertVariant } from './Alert'
import { Anchor } from './Anchor'
import { AuthNav } from './AuthNav'
import { AuthProviderStack } from './AuthProviderButton'
import { Avatar, AvatarGroup, AVATAR_SHAPES, AVATAR_SIZES, AVATAR_STATUSES, AVATAR_TONES, AVATAR_VARIANTS, AVATAR_SHAPE_LABEL, AVATAR_SIZE_LABEL, AVATAR_STATUS_LABEL, AVATAR_TONE_LABEL, AVATAR_VARIANT_LABEL } from './Avatar'
import { AvatarEditor } from './AvatarEditor'
import { AvatarPicker } from './AvatarPicker'
import {
  Badge,
  BADGE_SHAPES,
  BADGE_SIZES,
  BADGE_TONES,
  BADGE_VARIANTS,
  BADGE_SHAPE_LABEL,
  BADGE_SIZE_LABEL,
  BADGE_TONE_LABEL,
  BADGE_VARIANT_LABEL,
} from './Badge'
import { BrandLogo } from './BrandLogo'
import {
  Breadcrumbs,
  BREADCRUMB_SEPARATORS,
  BREADCRUMB_SEPARATOR_LABEL,
  BREADCRUMB_SIZES,
  BREADCRUMB_SIZE_LABEL,
  BREADCRUMB_VARIANTS,
  BREADCRUMB_VARIANT_LABEL,
} from './Breadcrumbs'
import { Button } from './Button'
import { Checkbox, CheckboxGroup, CHECKBOX_SIZES, CHECKBOX_TONES, CHECKBOX_VARIANTS, type CheckboxSize, type CheckboxTone, type CheckboxVariant } from './Checkbox'
import {
  ConfirmAction,
  CONFIRM_ACTION_TONES,
  CONFIRM_ACTION_VARIANTS,
  type ConfirmActionTone,
  type ConfirmActionVariant,
} from './ConfirmAction'
import {
  ConfirmDialog,
  CONFIRM_DIALOG_SIZES,
  CONFIRM_DIALOG_TONES,
  CONFIRM_DIALOG_VARIANTS,
  CONFIRM_DIALOG_SIZE_LABEL,
  CONFIRM_DIALOG_TONE_LABEL,
  CONFIRM_DIALOG_VARIANT_LABEL,
  type ConfirmDialogSize,
  type ConfirmDialogTone,
  type ConfirmDialogVariant,
} from './ConfirmDialog'
import { CountrySelect } from './CountrySelect'
import { DashboardNav } from './DashboardNav'
import { DashboardShell } from './DashboardShell'
import {
  DashboardSidebar,
  SidebarNavItem,
  SIDEBAR_SIZES,
  SIDEBAR_SIZE_LABEL,
  SIDEBAR_VARIANTS,
  SIDEBAR_VARIANT_LABEL,
  type SidebarItem,
  type SidebarItemPreview,
  type SidebarSection,
  type SidebarSize,
  type SidebarVariant,
} from './DashboardSidebar'
import { TableDemo, TableStates } from './TableDocs'
import {
  DatePicker,
  DATE_PICKER_SIZES,
  DATE_PICKER_VARIANTS,
  type DatePickerPreview,
  type DatePickerSize,
  type DatePickerVariant,
  type DateRange,
} from './DatePicker'
import {
  Divider,
  DIVIDER_ALIGNS,
  DIVIDER_ORIENTATIONS,
  DIVIDER_SIZES,
  DIVIDER_TONES,
  DIVIDER_VARIANTS,
  DIVIDER_ALIGN_LABEL,
  DIVIDER_ORIENTATION_LABEL,
  DIVIDER_SIZE_LABEL,
  DIVIDER_TONE_LABEL,
  DIVIDER_VARIANT_LABEL,
} from './Divider'
import { Dropdown, SELECT_SIZES, SELECT_VARIANTS, type DropdownOption, type SelectTriggerSize, type SelectTriggerVariant } from './Dropdown'
import {
  EmptyPopup,
  EMPTY_POPUP_SIZES,
  EMPTY_POPUP_SURFACES,
  EMPTY_POPUP_TONES,
  EMPTY_POPUP_VARIANTS,
  EMPTY_POPUP_SIZE_LABEL,
  EMPTY_POPUP_SURFACE_LABEL,
  EMPTY_POPUP_TONE_LABEL,
  EMPTY_POPUP_VARIANT_LABEL,
} from './EmptyPopup'
import {
  EmptyState,
  EMPTY_STATE_SIZES,
  EMPTY_STATE_TONES,
  EMPTY_STATE_VARIANTS,
  EMPTY_STATE_SIZE_LABEL,
  EMPTY_STATE_TONE_LABEL,
  EMPTY_STATE_VARIANT_LABEL,
} from './EmptyState'
import {
  FieldLabel,
  FieldRow,
  FormField,
  FIELD_HINT_TONES,
  FIELD_LABEL_SIZES,
  FIELD_LABEL_TONES,
  FORM_FIELD_LAYOUTS,
  type FieldHintTone,
  type FieldLabelSize,
  type FieldLabelTone,
  type FormFieldLayout,
} from './FieldLabel'
import { IconButton } from './IconButton'
import {
  IconTab,
  IconTabBar,
  ICON_TAB_LAYOUTS,
  ICON_TAB_SIZES,
  ICON_TAB_VARIANTS,
  ICON_TAB_LAYOUT_LABEL,
  ICON_TAB_SIZE_LABEL,
  ICON_TAB_VARIANT_LABEL,
} from './IconTab'
import {
  KeyValueGroup,
  KeyValueRow,
  KEY_VALUE_LAYOUTS,
  KEY_VALUE_SIZES,
  KEY_VALUE_TONES,
  KEY_VALUE_VARIANTS,
  KEY_VALUE_LAYOUT_LABEL,
  KEY_VALUE_SIZE_LABEL,
  KEY_VALUE_TONE_LABEL,
  KEY_VALUE_VARIANT_LABEL,
} from './KeyValueRow'
import { KitDocArticle, KitPreviewBody } from './KitDocArticle'
import { PreviewFrame } from './PreviewMode'
import { StateCard, StateGrid, StateGroup, StateStack } from './DocsCard'
import {
  alertGuide,
  bodyGuide,
  brandLogoGuide,
  breadcrumbGuide,
  captionGuide,
  checkboxGuide,
  citySelectGuide,
  confirmActionGuide,
  confirmDialogGuide,
  countrySelectGuide,
  countySelectGuide,
  datePickerGuide,
  dividerGuide,
  emptyPopupGuide,
  emptyStateGuide,
  avatarGuide,
  avatarEditorGuide,
  avatarPickerGuide,
  authNavGuide,
  badgeGuide,
  cardGuide,
  cardGridGuide,
  stackGuide,
  tokenGroupGuide,
  stateCardGuide,
  stateGridGuide,
  stateGroupGuide,
  swatchGuide,
  swatchGridGuide,
  contrastCardGuide,
  radiusCardGuide,
  scaleRowGuide,
  relatedGuide,
  ruleCardGuide,
  inlineCodeGuide,
  usageGuide,
  eyebrowGuide,
  fieldLabelGuide,
  headingGuide,
  iconButtonGuide,
  iconTabGuide,
  keyValueRowGuide,
  labelGuide,
  languageSelectGuide,
  listRowGuide,
  loadingScreenGuide,
  loaderGuide,
  modalGuide,
  commandPaletteGuide,
  navSearchGuide,
  numberFieldGuide,
  otpGuide,
  qrGuide,
  pageHeaderGuide,
  paginationGuide,
  passwordFieldGuide,
  passwordRevealGuide,
  phoneInputGuide,
  profileButtonGuide,
  progressGuide,
  radioGuide,
  recoveryGuide,
  scoreRingGuide,
  segmentedGuide,
  selectGuide,
  settingsRowGuide,
  sheetNavGuide,
  sidebarNavGuide,
  skeletonGuide,
  sliderGuide,
  stateSelectGuide,
  statCardGuide,
  subheadGuide,
  switchGuide,
  tableGuide,
  tabsGuide,
  textareaGuide,
  textFieldGuide,
  themeIconToggleGuide,
  themeToggleGuide,
} from './kit-guides'
import { LanguageSelect } from './LanguageSelect'
import {
  ListGroup,
  ListMark,
  ListRow,
  TextAction,
  LIST_ROW_SIZES,
  LIST_ROW_TONES,
  LIST_ROW_VARIANTS,
  LIST_ROW_SIZE_LABEL,
  LIST_ROW_TONE_LABEL,
  LIST_ROW_VARIANT_LABEL,
  type ListRowPreview,
  type ListRowSize,
  type ListRowVariant,
} from './ListRow'
import {
  Loader,
  LOADER_SIZES,
  LOADER_TONES,
  LOADER_VARIANTS,
  LOADER_SIZE_LABEL,
  LOADER_TONE_LABEL,
  LOADER_VARIANT_LABEL,
} from './Loader'
import {
  LoadingScreen,
  LOADING_SCREEN_INDICATORS,
  LOADING_SCREEN_SIZES,
  LOADING_SCREEN_VARIANTS,
  LOADING_SCREEN_INDICATOR_LABEL,
  LOADING_SCREEN_SIZE_LABEL,
  LOADING_SCREEN_VARIANT_LABEL,
} from './LoadingScreen'
import {
  CommandPalette,
  CommandSearch,
  COMMAND_PALETTE_SIZES,
  COMMAND_PALETTE_VARIANTS,
  COMMAND_PALETTE_VARIANT_LABEL,
  COMMAND_PALETTE_SIZE_LABEL,
  COMMAND_SEARCH_SIZES,
  COMMAND_SEARCH_VARIANTS,
  COMMAND_SEARCH_VARIANT_LABEL,
  COMMAND_SEARCH_SIZE_LABEL,
  type CommandItem,
  type CommandPaletteSize,
  type CommandPaletteVariant,
} from './CommandPalette'
import {
  Modal,
  MODAL_SIZES,
  MODAL_TONES,
  MODAL_VARIANTS,
  MODAL_SIZE_LABEL,
  MODAL_TONE_LABEL,
  MODAL_VARIANT_LABEL,
  type ModalSize,
  type ModalTone,
  type ModalVariant,
} from './Modal'
import {
  NumberField,
  NUMBER_FIELD_ALIGN_LABEL,
  NUMBER_FIELD_ALIGNS,
  NUMBER_FIELD_SIZES,
  NUMBER_FIELD_STEPPERS,
  NUMBER_FIELD_UNIT_LABEL,
  NUMBER_FIELD_WIDTH_LABEL,
  NUMBER_FIELD_WIDTHS,
  NUMBER_FIELD_UNITS,
  NUMBER_FIELD_VARIANT_LABEL,
  NUMBER_FIELD_VARIANTS,
  type NumberFieldAlign,
  type NumberFieldSize,
  type NumberFieldStepper,
  type NumberFieldUnit,
  type NumberFieldVariant,
  type NumberFieldWidth,
} from './NumberField'
import {
  NavSearch,
  NAV_SEARCH_SIZES,
  NAV_SEARCH_SIZE_LABEL,
  NAV_SEARCH_VARIANTS,
  NAV_SEARCH_VARIANT_LABEL,
  type NavSearchSize,
  type NavSearchVariant,
} from './NavSearch'
import { OtpBoxes, OTP_BOXES_SIZES, OTP_BOXES_VARIANTS, type OtpBoxesSize, type OtpBoxesVariant } from './OtpBoxes'
import { OtherWaysButton } from './OtherWaysButton'
import { PageHeaderDemo, PageHeaderStates } from './PageHeaderDocs'
import {
  Pagination,
  PAGINATION_ALIGNS,
  PAGINATION_LAYOUTS,
  PAGINATION_SIZES,
  PAGINATION_VARIANTS,
  PAGINATION_ALIGN_LABEL,
  PAGINATION_LAYOUT_LABEL,
  PAGINATION_SIZE_LABEL,
  PAGINATION_VARIANT_LABEL,
} from './Pagination'
import { PasswordField, PASSWORD_FIELD_VARIANTS } from './PasswordField'
import {
  PasswordReveal,
  PASSWORD_REVEAL_SIZES,
  PASSWORD_REVEAL_VARIANTS,
  type PasswordRevealSize,
  type PasswordRevealVariant,
} from './PasswordReveal'
import { PhoneInput } from './PhoneInput'
import { CitySelect, CountySelect, StateSelect } from './PlaceSelect'
import {
  SOCIAL_LOGIN_MORE_PROVIDERS,
  SOCIAL_LOGIN_PRIMARY_PROVIDERS,
  SOCIAL_LOGIN_PROVIDERS,
  SocialLoginButton,
  type SocialLoginProvider,
} from './SocialLoginButton'
import {
  ProfileButton,
  PROFILE_BUTTON_LAYOUTS,
  PROFILE_BUTTON_SIZES,
  PROFILE_BUTTON_VARIANTS,
  PROFILE_BUTTON_LAYOUT_LABEL,
  PROFILE_BUTTON_SIZE_LABEL,
  PROFILE_BUTTON_VARIANT_LABEL,
} from './ProfileButton'
import { Progress, PROGRESS_SIZES, PROGRESS_TONES, PROGRESS_VARIANTS, PROGRESS_SIZE_LABEL, PROGRESS_TONE_LABEL, PROGRESS_VARIANT_LABEL } from './Progress'
import { type PropRow } from './PropsTable'
import { Radio, RadioGroup, RADIO_SIZES, RADIO_TONES, RADIO_VARIANTS, type RadioSize, type RadioTone, type RadioVariant } from './Radio'
import {
  RecoveryCodesList,
  RecoveryInput,
  RECOVERY_INPUT_MODES,
  RECOVERY_INPUT_SIZES,
  RECOVERY_INPUT_VARIANTS,
  type RecoveryInputMode,
  type RecoveryInputSize,
  type RecoveryInputVariant,
} from './RecoveryInput'
import {
  ScoreRing,
  SCORE_RING_SIZES,
  SCORE_RING_TONES,
  SCORE_RING_VARIANTS,
  SCORE_RING_SIZE_LABEL,
  SCORE_RING_TONE_LABEL,
  SCORE_RING_VARIANT_LABEL,
} from './ScoreRing'
import { SelectTrigger } from './SelectTrigger'
import { SegmentedControl, SegmentedToolbar, SEGMENTED_VARIANTS, type SegmentedVariant } from './SegmentedControl'
import {
  SettingsList,
  SettingsRow,
  SETTINGS_ROW_ICON_TONES,
  SETTINGS_ROW_SIZES,
  SETTINGS_ROW_TONES,
  SETTINGS_ROW_VARIANTS,
  SETTINGS_ROW_ICON_TONE_LABEL,
  SETTINGS_ROW_SIZE_LABEL,
  SETTINGS_ROW_TONE_LABEL,
  SETTINGS_ROW_VARIANT_LABEL,
  type SettingsRowPreview,
  type SettingsRowSize,
  type SettingsRowVariant,
} from './SettingsRow'
import {
  SheetNav,
  SHEET_NAV_LAYOUTS,
  SHEET_NAV_LAYOUT_LABEL,
  SHEET_NAV_SIZES,
  SHEET_NAV_SIZE_LABEL,
  SHEET_NAV_TONES,
  SHEET_NAV_TONE_LABEL,
  SHEET_NAV_VARIANTS,
  SHEET_NAV_VARIANT_LABEL,
  type SheetNavLayout,
  type SheetNavSize,
  type SheetNavTone,
  type SheetNavVariant,
} from './SheetNav'
import { Skeleton, SKELETON_MOTIONS, SKELETON_MOTION_LABEL, SKELETON_SHAPES, SKELETON_SHAPE_LABEL, SKELETON_SIZES, SKELETON_SIZE_LABEL, SKELETON_VARIANTS, SKELETON_VARIANT_LABEL } from './Skeleton'
import { DataTable } from './DataTable'
import { PageHeader } from './PageHeader'
import {
  RangeSlider,
  Slider,
  SLIDER_FIELDS,
  SLIDER_FIELD_LABEL,
  SLIDER_SIZES,
  SLIDER_VARIANT_LABEL,
  SLIDER_VARIANTS,
  type SliderField,
  type SliderSize,
  type SliderVariant,
} from './Slider'
import {
  StatCard,
  STAT_CARD_ALIGNS,
  STAT_CARD_ALIGN_LABEL,
  STAT_CARD_DELTA_LABEL,
  STAT_CARD_DELTA_TONES,
  STAT_CARD_SIZES,
  STAT_CARD_SIZE_LABEL,
  STAT_CARD_TONES,
  STAT_CARD_TONE_LABEL,
  STAT_CARD_VARIANTS,
  STAT_CARD_VARIANT_LABEL,
} from './StatCard'
import {
  Card,
  CardGrid,
  CARD_SIZES,
  CARD_SIZE_LABEL,
  CARD_TONES,
  CARD_TONE_LABEL,
  CARD_VARIANTS,
  CARD_VARIANT_LABEL,
  CARD_GRID_ALIGNS,
  CARD_GRID_ALIGN_LABEL,
  CARD_GRID_COLUMNS,
  CARD_GRID_COLUMN_LABEL,
  CARD_GRID_GAPS,
  CARD_GRID_GAP_LABEL,
  CARD_GRID_WIDTHS,
  CARD_GRID_WIDTH_LABEL,
  type CardPreview,
  type CardSize,
  type CardTone,
  type CardVariant,
} from './Card'
import {
  Stack,
  STACK_ALIGNS,
  STACK_ALIGN_LABEL,
  STACK_DIRECTIONS,
  STACK_DIRECTION_LABEL,
  STACK_GAPS,
  STACK_GAP_LABEL,
  STACK_JUSTIFIES,
  STACK_JUSTIFY_LABEL,
  STACK_SIZES,
  STACK_SIZE_LABEL,
  STACK_TONES,
  STACK_TONE_LABEL,
  STACK_VARIANTS,
  STACK_VARIANT_LABEL,
  type StackPreview,
} from './Stack'
import {
  Usage,
  USAGE_GAPS,
  USAGE_GAP_LABEL,
  USAGE_LAYOUTS,
  USAGE_LAYOUT_LABEL,
  USAGE_SIZES,
  USAGE_SIZE_LABEL,
  USAGE_TONES,
  USAGE_TONE_LABEL,
  USAGE_VARIANTS,
  USAGE_VARIANT_LABEL,
  type UsagePreview,
  type UsageProps,
} from './Usage'
import {
  TokenGroup,
  TOKEN_GROUP_COLUMNS,
  TOKEN_GROUP_COLUMN_LABEL,
  TOKEN_GROUP_GAPS,
  TOKEN_GROUP_GAP_LABEL,
  TOKEN_GROUP_SIZES,
  TOKEN_GROUP_SIZE_LABEL,
  TOKEN_GROUP_TONES,
  TOKEN_GROUP_TONE_LABEL,
  TOKEN_GROUP_VARIANTS,
  TOKEN_GROUP_VARIANT_LABEL,
  type TokenGroupPreview,
  type TokenGroupProps,
} from './TokenGroup'
import {
  StateCard as KitStateCard,
  STATE_CARD_ALIGNS,
  STATE_CARD_ALIGN_LABEL,
  STATE_CARD_GAPS,
  STATE_CARD_GAP_LABEL,
  STATE_CARD_SIZES,
  STATE_CARD_SIZE_LABEL,
  STATE_CARD_TONES,
  STATE_CARD_TONE_LABEL,
  STATE_CARD_VARIANTS,
  STATE_CARD_VARIANT_LABEL,
  type StateCardPreview,
  type StateCardProps,
} from './StateCard'
import {
  StateGrid as KitStateGrid,
  STATE_GRID_ALIGNS,
  STATE_GRID_ALIGN_LABEL,
  STATE_GRID_COLUMNS,
  STATE_GRID_COLUMN_LABEL,
  STATE_GRID_GAPS,
  STATE_GRID_GAP_LABEL,
  STATE_GRID_SIZES,
  STATE_GRID_SIZE_LABEL,
  STATE_GRID_TONES,
  STATE_GRID_TONE_LABEL,
  STATE_GRID_VARIANTS,
  STATE_GRID_VARIANT_LABEL,
  STATE_GRID_WIDTHS,
  STATE_GRID_WIDTH_LABEL,
  type StateGridPreview,
  type StateGridProps,
} from './StateGrid'
import {
  StateGroup as KitStateGroup,
  STATE_GROUP_ALIGNS,
  STATE_GROUP_ALIGN_LABEL,
  STATE_GROUP_COLUMNS,
  STATE_GROUP_COLUMN_LABEL,
  STATE_GROUP_GAPS,
  STATE_GROUP_GAP_LABEL,
  STATE_GROUP_SIZES,
  STATE_GROUP_SIZE_LABEL,
  STATE_GROUP_TONES,
  STATE_GROUP_TONE_LABEL,
  STATE_GROUP_VARIANTS,
  STATE_GROUP_VARIANT_LABEL,
  STATE_GROUP_WIDTHS,
  STATE_GROUP_WIDTH_LABEL,
  type StateGroupPreview,
  type StateGroupProps,
} from './StateGroup'
import {
  Swatch,
  SWATCH_SIZES,
  SWATCH_SIZE_LABEL,
  SWATCH_TONES,
  SWATCH_TONE_LABEL,
  SWATCH_VARIANTS,
  SWATCH_VARIANT_LABEL,
  type SwatchPreview,
  type SwatchProps,
} from './Swatch'
import {
  SwatchGrid,
  SWATCH_GRID_ALIGNS,
  SWATCH_GRID_ALIGN_LABEL,
  SWATCH_GRID_COLUMNS,
  SWATCH_GRID_COLUMN_LABEL,
  SWATCH_GRID_GAPS,
  SWATCH_GRID_GAP_LABEL,
  SWATCH_GRID_SIZES,
  SWATCH_GRID_SIZE_LABEL,
  SWATCH_GRID_TONES,
  SWATCH_GRID_TONE_LABEL,
  SWATCH_GRID_VARIANTS,
  SWATCH_GRID_VARIANT_LABEL,
  SWATCH_GRID_WIDTHS,
  SWATCH_GRID_WIDTH_LABEL,
  type SwatchGridColumns,
  type SwatchGridPreview,
  type SwatchGridProps,
} from './SwatchGrid'
import {
  ContrastCard,
  CONTRAST_CARD_SIZES,
  CONTRAST_CARD_SIZE_LABEL,
  CONTRAST_CARD_TONES,
  CONTRAST_CARD_TONE_LABEL,
  CONTRAST_CARD_VARIANTS,
  CONTRAST_CARD_VARIANT_LABEL,
  type ContrastCardPreview,
  type ContrastCardProps,
} from './ContrastCard'
import {
  RadiusCard,
  RADIUS_CARD_SCALE,
  RADIUS_CARD_SIZES,
  RADIUS_CARD_SIZE_LABEL,
  RADIUS_CARD_TONES,
  RADIUS_CARD_TONE_LABEL,
  RADIUS_CARD_VALUE_LABEL,
  RADIUS_CARD_VALUE_USE,
  RADIUS_CARD_VARIANTS,
  RADIUS_CARD_VARIANT_LABEL,
  type RadiusCardPreview,
  type RadiusCardProps,
} from './RadiusCard'
import {
  ScaleRow,
  SCALE_ROW_SIZES,
  SCALE_ROW_SIZE_LABEL,
  SCALE_ROW_TONES,
  SCALE_ROW_TONE_LABEL,
  SCALE_ROW_VARIANTS,
  SCALE_ROW_VARIANT_LABEL,
  SCALE_ROW_SPACE,
  SCALE_ROW_WIDTHS,
  type ScaleRowPreview,
  type ScaleRowProps,
} from './ScaleRow'
import {
  Related,
  RELATED_ALIGNS,
  RELATED_ALIGN_LABEL,
  RELATED_COLUMNS,
  RELATED_COLUMN_LABEL,
  RELATED_GAPS,
  RELATED_GAP_LABEL,
  RELATED_SIZES,
  RELATED_SIZE_LABEL,
  RELATED_TONES,
  RELATED_TONE_LABEL,
  RELATED_VARIANTS,
  RELATED_VARIANT_LABEL,
  RELATED_WIDTHS,
  RELATED_WIDTH_LABEL,
  type RelatedColumns,
  type RelatedItem,
  type RelatedPreview,
  type RelatedProps,
} from './Related'
import { RelatedCard } from './RelatedCard'
import {
  RuleCard,
  RULE_CARD_SIZES,
  RULE_CARD_SIZE_LABEL,
  RULE_CARD_TONES,
  RULE_CARD_TONE_LABEL,
  RULE_CARD_VARIANTS,
  RULE_CARD_VARIANT_LABEL,
  type RuleCardPreview,
  type RuleCardProps,
} from './RuleCard'
import {
  InlineCode,
  INLINE_CODE_SIZES,
  INLINE_CODE_SIZE_LABEL,
  INLINE_CODE_TONES,
  INLINE_CODE_TONE_LABEL,
  INLINE_CODE_VARIANTS,
  INLINE_CODE_VARIANT_LABEL,
  type InlineCodePreview,
  type InlineCodeProps,
} from './InlineCode'
import { Switch, SwitchGroup, SwitchItem, SWITCH_VARIANTS, type SwitchVariant } from './Switch'
import { Tabs, TABS_ALIGNS, TABS_SIZES, TABS_VARIANTS, TABS_ALIGN_LABEL, TABS_SIZE_LABEL, TABS_VARIANT_LABEL } from './Tabs'
import { Body, Caption, Eyebrow, Heading, Label, Subhead } from './Text'
import { Textarea, TEXTAREA_SIZES, TEXTAREA_VARIANTS, type TextareaSize, type TextareaVariant } from './Textarea'
import {
  TextField,
  TEXT_FIELD_SIZES,
  TEXT_FIELD_VARIANTS,
  type TextFieldSize,
  type TextFieldVariant,
} from './TextField'
import { ThemeIconToggle } from './ThemeIconToggle'
import { ThemeToggle } from './ThemeToggle'
import { QrCode, QR_CODE_SIZES, QR_CODE_VARIANTS } from './QrCode'
import type { QrCodeSize, QrCodeVariant } from './QrCode'
import { TotpManualKey } from './TotpManualKey'
import { VerificationMethodCard } from './VerificationMethodCard'

function p(name: string, type: string, defaultValue: string, description: string): PropRow {
  return { name, type, defaultValue, description }
}

type DocDef = {
  title: string
  description: string
  Demo: ComponentType
  code: string
  states?: { label: string; node: ReactNode }[]
  statesContent?: ReactNode
  props: PropRow[]
  wide?: boolean
  stateColumns?: 1 | 2 | 3 | 4 | 6
  usage?: ReactNode
  accessibility?: ReactNode
}

const glyph = { strokeWidth: 1.75, absoluteStrokeWidth: true } as const

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function IconButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <IconButton label="Search">
        <DkMagnifyingGlassFind size={18} {...glyph} />
      </IconButton>
      <IconButton label="Favorite" variant="subtle">
        <DkFavoriteHeartLove size={18} {...glyph} />
      </IconButton>
      <IconButton label="Share" variant="outline">
        <DkShareExportForward size={18} {...glyph} />
      </IconButton>
      <IconButton label="Add" variant="primary" onAction={() => wait(900)}>
        <DkAddPlusCreate size={18} {...glyph} />
      </IconButton>
      <IconButton label="Copy" onAction={() => wait(900)}>
        <DkClipboardCopyDuplicate size={18} {...glyph} />
      </IconButton>
      <IconButton label="Locked" disabled>
        <DkPadlockSecureClosed size={18} {...glyph} />
      </IconButton>
    </div>
  )
}

function BrandLogoDemo() {
  return (
    <div className="flex min-w-0 flex-col items-start gap-6">
      <BrandLogo variant="lockup" size={20} />
      <BrandLogo variant="text" size={20} />
      <div className="flex items-center gap-6">
        <BrandLogo size={32} />
        <BrandLogo variant="icon" size={32} />
      </div>
    </div>
  )
}

const SWITCH_VARIANT_LABEL: Record<SwitchVariant, string> = {
  primary: 'Primary',
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  danger: 'Danger',
}

function SwitchDemo() {
  const [variants, setVariants] = useState<Record<SwitchVariant, boolean>>({
    primary: true,
    subtle: true,
    outline: false,
    ghost: true,
    danger: false,
  })
  const [notify, setNotify] = useState(true)
  const [digest, setDigest] = useState(false)
  const [alerts, setAlerts] = useState(true)
  const [preview, setPreview] = useState(true)

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-8">
      <div className="flex flex-wrap items-end justify-center gap-x-6 gap-y-4">
        {SWITCH_VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <Switch
              variant={variant}
              checked={variants[variant]}
              onChange={(next) => setVariants((current) => ({ ...current, [variant]: next }))}
              label={SWITCH_VARIANT_LABEL[variant]}
            />
            <Caption as="span">{SWITCH_VARIANT_LABEL[variant]}</Caption>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <Caption as="span">Group</Caption>
        <SwitchGroup label="Preferences">
          <SwitchItem
            title="Notifications"
            description="Push and email alerts"
            checked={notify}
            onChange={setNotify}
          />
          <SwitchItem
            title="Weekly digest"
            description="A summary every Monday"
            checked={digest}
            onChange={setDigest}
            variant="subtle"
          />
          <SwitchItem
            title="Security alerts"
            description="Sign-in and recovery"
            checked={alerts}
            onChange={setAlerts}
            variant="danger"
          />
          <SwitchItem
            title="Preview features"
            checked={preview}
            onChange={setPreview}
            variant="outline"
            size="sm"
          />
        </SwitchGroup>
      </div>
    </div>
  )
}

const RANGE = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
] as const

const VARIANT_LABEL: Record<SegmentedVariant, string> = {
  subtle: 'Subtle',
  outline: 'Outline',
  ghost: 'Ghost',
  primary: 'Primary',
  pill: 'Pill',
}

function viewIcon(name: 'grid' | 'list' | 'gallery', size = 18) {
  const props = { size, ...glyph }
  if (name === 'grid') return <DkLayoutGrid {...props} />
  if (name === 'list') return <DkBulletedListItems {...props} />
  return <DkRowsThree {...props} />
}

function alignIcon(name: 'start' | 'center' | 'end', size = 18) {
  const props = { size, ...glyph }
  if (name === 'start') return <DkTextAlignStart {...props} />
  if (name === 'center') return <DkTextAlignCenter {...props} />
  return <DkTextAlignEnd {...props} />
}

function SegmentedDemo() {
  const [text, setText] = useState<'day' | 'week' | 'month'>('week')
  const [both, setBoth] = useState<'grid' | 'list' | 'gallery'>('list')
  const [icon, setIcon] = useState<'start' | 'center' | 'end'>('center')
  const [grouped, setGrouped] = useState<'edit' | 'preview' | 'code'>('preview')
  const [action, setAction] = useState<'day' | 'week' | 'month'>('week')

  return (
    <div className="flex w-full flex-col gap-8">
      <SegmentedControl
        label="Text"
        value={text}
        onChange={setText}
        fullWidth
        options={[...RANGE]}
      />
      <SegmentedControl
        label="Icon and text"
        content="both"
        value={both}
        onChange={setBoth}
        fullWidth
        options={[
          { value: 'grid', label: 'Grid', icon: viewIcon('grid') },
          { value: 'list', label: 'List', icon: viewIcon('list') },
          { value: 'gallery', label: 'Gallery', icon: viewIcon('gallery') },
        ]}
      />
      <SegmentedControl
        label="Icon"
        content="icon"
        value={icon}
        onChange={setIcon}
        options={[
          { value: 'start', label: 'Align left', icon: alignIcon('start') },
          { value: 'center', label: 'Align center', icon: alignIcon('center') },
          { value: 'end', label: 'Align right', icon: alignIcon('end') },
        ]}
      />
      <SegmentedControl
        label="Grouped buttons"
        mode="grouped"
        value={grouped}
        onChange={setGrouped}
        fullWidth
        options={[
          { value: 'edit', label: 'Edit' },
          { value: 'preview', label: 'Preview' },
          { value: 'code', label: 'Code' },
        ]}
      />
      <SegmentedControl
        label="On action"
        value={action}
        onChange={setAction}
        fullWidth
        onAction={() => wait(900)}
        options={[...RANGE]}
      />
      <div className="flex flex-col gap-2">
        <Caption as="span">Together</Caption>
        <SegmentedToolbar>
          <SegmentedControl
            content="icon"
            value={icon}
            onChange={setIcon}
            options={[
              { value: 'start', label: 'Align left', icon: alignIcon('start') },
              { value: 'center', label: 'Align center', icon: alignIcon('center') },
              { value: 'end', label: 'Align right', icon: alignIcon('end') },
            ]}
          />
          <IconButton label="Refresh" onAction={() => wait(900)}>
            <DkRefreshClockwiseRotate size={18} {...glyph} />
          </IconButton>
          <Button fullWidth={false} size="md" onClick={() => undefined}>
            Save
          </Button>
        </SegmentedToolbar>
      </div>
    </div>
  )
}

function SegmentedStates() {
  const [range, setRange] = useState<'day' | 'week' | 'month'>('week')
  const [view, setView] = useState<'grid' | 'list' | 'gallery'>('grid')
  const [align, setAlign] = useState<'start' | 'center' | 'end'>('center')
  const [style, setStyle] = useState<'bold' | 'italic' | 'underline'>('bold')
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [mail, setMail] = useState<'all' | 'unread' | 'flagged'>('unread')

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Appearance
        </Caption>
        <div className="flex flex-col gap-6">
          {SEGMENTED_VARIANTS.map((item) => (
            <div key={item} className="flex flex-col gap-2">
              <Caption>{VARIANT_LABEL[item]}</Caption>
              <SegmentedControl
                variant={item}
                value={range}
                onChange={setRange}
                fullWidth
                options={[...RANGE]}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Content
        </Caption>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Caption>Icon and text</Caption>
            <SegmentedControl
              content="both"
              value={view}
              onChange={setView}
              fullWidth
              options={[
                { value: 'grid', label: 'Grid', icon: viewIcon('grid') },
                { value: 'list', label: 'List', icon: viewIcon('list') },
                { value: 'gallery', label: 'Gallery', icon: viewIcon('gallery') },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Icon and text, primary</Caption>
            <SegmentedControl
              content="both"
              variant="primary"
              value={view}
              onChange={setView}
              fullWidth
              options={[
                { value: 'grid', label: 'Grid', icon: viewIcon('grid') },
                { value: 'list', label: 'List', icon: viewIcon('list') },
                { value: 'gallery', label: 'Gallery', icon: viewIcon('gallery') },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Icon</Caption>
            <SegmentedControl
              content="icon"
              value={align}
              onChange={setAlign}
              options={[
                { value: 'start', label: 'Align left', icon: alignIcon('start') },
                { value: 'center', label: 'Align center', icon: alignIcon('center') },
                { value: 'end', label: 'Align right', icon: alignIcon('end') },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Icon, pill</Caption>
            <SegmentedControl
              content="icon"
              variant="pill"
              value={style}
              onChange={setStyle}
              options={[
                { value: 'bold', label: 'Bold', icon: <DkTypographyBoldWeight size={18} {...glyph} /> },
                { value: 'italic', label: 'Italic', icon: <DkTypographyItalicSlant size={18} {...glyph} /> },
                { value: 'underline', label: 'Underline', icon: <DkTypographyUnderline size={18} {...glyph} /> },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Badge</Caption>
            <SegmentedControl
              value={mail}
              onChange={setMail}
              fullWidth
              options={[
                { value: 'all', label: 'All', badge: 128 },
                { value: 'unread', label: 'Unread', badge: 12 },
                { value: 'flagged', label: 'Flagged', badge: 3 },
              ]}
            />
          </div>
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Size
        </Caption>
        <div className="flex flex-col gap-6">
          {(['sm', 'md', 'lg'] as const).map((item) => (
            <div key={item} className="flex flex-col gap-2">
              <Caption>{item === 'sm' ? 'Small' : item === 'md' ? 'Medium' : 'Large'}</Caption>
              <SegmentedControl
                size={item}
                value={size}
                onChange={setSize}
                fullWidth
                options={[
                  { value: 'sm', label: 'Small' },
                  { value: 'md', label: 'Medium' },
                  { value: 'lg', label: 'Large' },
                ]}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          State
        </Caption>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Caption>Disabled</Caption>
            <SegmentedControl disabled value="week" onChange={() => undefined} fullWidth options={[...RANGE]} />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Option disabled</Caption>
            <SegmentedControl
              value="week"
              onChange={() => undefined}
              fullWidth
              options={[
                { value: 'day', label: 'Day' },
                { value: 'week', label: 'Week' },
                { value: 'year', label: 'Year', disabled: true },
              ]}
            />
          </div>
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Grouped buttons
        </Caption>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Caption>Text</Caption>
            <SegmentedControl
              mode="grouped"
              value={range}
              onChange={setRange}
              fullWidth
              options={[...RANGE]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Icon and text</Caption>
            <SegmentedControl
              mode="grouped"
              content="both"
              value={view}
              onChange={setView}
              fullWidth
              options={[
                { value: 'grid', label: 'Grid', icon: viewIcon('grid') },
                { value: 'list', label: 'List', icon: viewIcon('list') },
                { value: 'gallery', label: 'Gallery', icon: viewIcon('gallery') },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Icon buttons</Caption>
            <SegmentedControl
              mode="grouped"
              content="icon"
              variant="outline"
              value={align}
              onChange={setAlign}
              options={[
                { value: 'start', label: 'Align left', icon: alignIcon('start') },
                { value: 'center', label: 'Align center', icon: alignIcon('center') },
                { value: 'end', label: 'Align right', icon: alignIcon('end') },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Primary grouped</Caption>
            <SegmentedControl
              mode="grouped"
              variant="primary"
              value={range}
              onChange={setRange}
              fullWidth
              options={[...RANGE]}
            />
          </div>
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Loaders and actions
        </Caption>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Caption>Loading segment</Caption>
            <SegmentedControl
              value="week"
              onChange={() => undefined}
              fullWidth
              options={[
                { value: 'day', label: 'Day' },
                { value: 'week', label: 'Week', loading: true },
                { value: 'month', label: 'Month' },
              ]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>On action</Caption>
            <SegmentedControl
              value={range}
              onChange={setRange}
              fullWidth
              onAction={() => wait(900)}
              options={[...RANGE]}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Icon action</Caption>
            <SegmentedControl
              content="icon"
              variant="outline"
              value={align}
              onChange={setAlign}
              options={[
                {
                  value: 'start',
                  label: 'Align left',
                  icon: alignIcon('start'),
                  onAction: () => wait(700),
                },
                {
                  value: 'center',
                  label: 'Align center',
                  icon: alignIcon('center'),
                  onAction: () => wait(700),
                },
                {
                  value: 'end',
                  label: 'Align right',
                  icon: alignIcon('end'),
                  onAction: () => wait(700),
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Together
        </Caption>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Caption>Segmented, icon button, and button</Caption>
            <SegmentedToolbar>
              <SegmentedControl
                mode="grouped"
                value={range}
                onChange={setRange}
                options={[...RANGE]}
              />
              <IconButton label="Refresh" onAction={() => wait(900)}>
                <DkRefreshClockwiseRotate size={18} {...glyph} />
              </IconButton>
              <Button fullWidth={false}>Apply</Button>
            </SegmentedToolbar>
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Leading and trailing</Caption>
            <SegmentedControl
              value={view}
              onChange={setView}
              content="both"
              fullWidth
              options={[
                { value: 'grid', label: 'Grid', icon: viewIcon('grid') },
                { value: 'list', label: 'List', icon: viewIcon('list') },
                { value: 'gallery', label: 'Gallery', icon: viewIcon('gallery') },
              ]}
              leading={
                <IconButton label="Add" variant="subtle" onAction={() => wait(700)}>
                  <DkAddPlusCreate size={18} {...glyph} />
                </IconButton>
              }
              trailing={
                <>
                  <IconButton label="Refresh" variant="outline" onAction={() => wait(700)}>
                    <DkRefreshClockwiseRotate size={18} {...glyph} />
                  </IconButton>
                  <Button fullWidth={false} size="md">
                    Save
                  </Button>
                </>
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Attached</Caption>
            <SegmentedToolbar attached>
              <SegmentedControl
                variant="ghost"
                mode="grouped"
                value={range}
                onChange={setRange}
                className="flex-1"
                options={[...RANGE]}
              />
              <Button fullWidth={false} size="md">
                Apply
              </Button>
            </SegmentedToolbar>
          </div>
        </div>
      </div>
    </div>
  )
}

const CONFIRM_VARIANT_LABEL: Record<ConfirmActionVariant, string> = {
  text: 'Text',
  ghost: 'Ghost',
  subtle: 'Subtle',
  outline: 'Outline',
  solid: 'Solid',
}

const CONFIRM_TONE_LABEL: Record<ConfirmActionTone, string> = {
  danger: 'Danger',
  brand: 'Brand',
  neutral: 'Neutral',
}

function ConfirmActionDemo() {
  return (
    <div className="flex w-full flex-wrap items-end justify-center gap-x-5 gap-y-4">
      {CONFIRM_ACTION_VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-2">
          <ConfirmAction variant={variant} onConfirm={() => undefined} />
          <Caption as="span">{CONFIRM_VARIANT_LABEL[variant]}</Caption>
        </div>
      ))}
    </div>
  )
}

function ConfirmActionStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid>
          {CONFIRM_ACTION_VARIANTS.map((variant) => (
            <StateCard key={variant} label={CONFIRM_VARIANT_LABEL[variant]}>
              <ConfirmAction variant={variant} onConfirm={() => undefined} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid>
          {CONFIRM_ACTION_TONES.map((tone) => (
            <StateCard key={`text-${tone}`} label={`Text, ${CONFIRM_TONE_LABEL[tone].toLowerCase()}`}>
              <ConfirmAction
                tone={tone}
                label={tone === 'brand' ? 'Send' : tone === 'neutral' ? 'Archive' : 'Remove'}
                confirmLabel={tone === 'brand' ? 'Send now?' : 'Confirm?'}
                onConfirm={() => undefined}
              />
            </StateCard>
          ))}
          {CONFIRM_ACTION_TONES.map((tone) => (
            <StateCard key={`solid-${tone}`} label={`Solid, ${CONFIRM_TONE_LABEL[tone].toLowerCase()}`}>
              <ConfirmAction
                variant="solid"
                tone={tone}
                label={tone === 'brand' ? 'Publish' : tone === 'neutral' ? 'Move' : 'Delete'}
                confirmLabel={tone === 'brand' ? 'Publish now?' : 'Confirm?'}
                onConfirm={() => undefined}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={3}>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <StateCard key={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}>
              <ConfirmAction variant="outline" size={size} onConfirm={() => undefined} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid>
          <StateCard label="Loading">
            <ConfirmAction variant="solid" loading onConfirm={() => undefined} />
          </StateCard>
          <StateCard label="Loading, brand">
            <ConfirmAction
              variant="solid"
              tone="brand"
              label="Send"
              loading
              loadingText="Sending…"
              onConfirm={() => undefined}
            />
          </StateCard>
          <StateCard label="Disabled">
            <ConfirmAction variant="outline" disabled onConfirm={() => undefined} />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

const FIELD_GLYPH = { size: 18, strokeWidth: 1.6, absoluteStrokeWidth: true } as const

const TEXT_FIELD_VARIANT_LABEL: Record<TextFieldVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
  underline: 'Underline',
  pill: 'Pill',
}

const TEXT_FIELD_SIZE_LABEL: Record<TextFieldSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

function FieldState({ label, children }: { label: string; children: ReactNode }) {
  return (
    <StateCard label={label} align="stretch">
      {children}
    </StateCard>
  )
}

function TextFieldDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-4">
      {TEXT_FIELD_VARIANTS.map((variant) => (
        <TextField
          key={variant}
          variant={variant}
          icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
          placeholder={`${TEXT_FIELD_VARIANT_LABEL[variant]} email`}
        />
      ))}
    </div>
  )
}

function TextFieldStates() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Appearance
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          {TEXT_FIELD_VARIANTS.map((variant) => (
            <FieldState key={variant} label={TEXT_FIELD_VARIANT_LABEL[variant]}>
              <TextField
                variant={variant}
                icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
                placeholder="Email address"
              />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Size
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-3">
          {TEXT_FIELD_SIZES.map((size) => (
            <FieldState key={size} label={TEXT_FIELD_SIZE_LABEL[size]}>
              <TextField
                size={size}
                icon={<DkEnvelopeMessageMail size={size === 'sm' ? 16 : 18} strokeWidth={1.6} absoluteStrokeWidth />}
                placeholder="Email address"
              />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          State
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          <FieldState label="Empty">
            <TextField icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />} placeholder="Email address" />
          </FieldState>
          <FieldState label="Filled">
            <TextField
              icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
              placeholder="Email address"
              defaultValue="alex@roboticela.com"
            />
          </FieldState>
          <FieldState label="Hover">
            <TextField
              icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
              placeholder="Email address"
              preview="hover"
            />
          </FieldState>
          <FieldState label="Focus">
            <TextField
              icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
              placeholder="Email address"
              defaultValue="alex@roboticela.com"
              preview="focus"
            />
          </FieldState>
          <FieldState label="Invalid">
            <TextField
              icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
              placeholder="Email address"
              defaultValue="alex"
              invalid
            />
          </FieldState>
          <FieldState label="Valid">
            <TextField
              icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
              placeholder="Email address"
              defaultValue="alex@roboticela.com"
              valid
            />
          </FieldState>
          <FieldState label="Disabled">
            <TextField
              icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
              placeholder="Email address"
              defaultValue="alex@roboticela.com"
              disabled
            />
          </FieldState>
          <FieldState label="Read only">
            <TextField
              icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
              placeholder="Email address"
              defaultValue="alex@roboticela.com"
              readOnly
            />
          </FieldState>
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Icons
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          <FieldState label="Name">
            <TextField
              icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
              placeholder="Display name"
              defaultValue="Alex Rivera"
            />
          </FieldState>
          <FieldState label="Username">
            <TextField icon={<DkAtSign {...FIELD_GLYPH} />} placeholder="Username" defaultValue="alex" />
          </FieldState>
          <FieldState label="Search">
            <TextField
              variant="pill"
              icon={<DkMagnifyingGlassFind {...FIELD_GLYPH} />}
              placeholder="Search"
            />
          </FieldState>
          <FieldState label="Location">
            <TextField
              variant="subtle"
              icon={<DkFoldedMapTerritoryMapPinLocation {...FIELD_GLYPH} />}
              placeholder="City"
              defaultValue="Karachi"
            />
          </FieldState>
          <FieldState label="Phone">
            <TextField
              variant="ghost"
              icon={<DkHandheldMobilePhone {...FIELD_GLYPH} />}
              placeholder="Phone number"
              defaultValue="+1 415 555 2671"
            />
          </FieldState>
          <FieldState label="Underline">
            <TextField
              variant="underline"
              icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
              placeholder="Full name"
            />
          </FieldState>
        </div>
      </div>
    </div>
  )
}

function PasswordRevealDemo() {
  const [open, setOpen] = useState<Record<PasswordRevealVariant, boolean>>({
    ghost: false,
    subtle: false,
    outline: true,
    text: false,
    pill: true,
  })

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {PASSWORD_REVEAL_VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-2">
            <PasswordReveal
              inField={false}
              variant={variant}
              visible={open[variant]}
              onToggle={() => setOpen((current) => ({ ...current, [variant]: !current[variant] }))}
            />
            <Caption as="span">{PASSWORD_REVEAL_LABEL[variant]}</Caption>
          </div>
        ))}
      </div>
      <PasswordField defaultValue="password" />
    </div>
  )
}

const PASSWORD_REVEAL_LABEL: Record<PasswordRevealVariant, string> = {
  ghost: 'Ghost',
  subtle: 'Subtle',
  outline: 'Outline',
  text: 'Text',
  pill: 'Pill',
}

const PASSWORD_REVEAL_SIZE_LABEL: Record<PasswordRevealSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

function PasswordRevealStates() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Appearance
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          {PASSWORD_REVEAL_VARIANTS.map((variant) => (
            <FieldState key={variant} label={PASSWORD_REVEAL_LABEL[variant]}>
              <PasswordField reveal={variant} defaultValue="password" />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Size
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-3">
          {PASSWORD_REVEAL_SIZES.map((size) => (
            <FieldState key={size} label={PASSWORD_REVEAL_SIZE_LABEL[size]}>
              <PasswordField size={size} reveal="pill" defaultValue="password" />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          State
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          <FieldState label="Hidden">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {PASSWORD_REVEAL_VARIANTS.map((variant) => (
                <PasswordReveal
                  key={variant}
                  inField={false}
                  variant={variant}
                  visible={false}
                  onToggle={() => undefined}
                />
              ))}
            </div>
          </FieldState>
          <FieldState label="Shown">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {PASSWORD_REVEAL_VARIANTS.map((variant) => (
                <PasswordReveal
                  key={variant}
                  inField={false}
                  variant={variant}
                  visible
                  onToggle={() => undefined}
                />
              ))}
            </div>
          </FieldState>
          <FieldState label="Disabled">
            <PasswordField reveal="ghost" defaultValue="password" disabled />
          </FieldState>
        </div>
      </div>
    </div>
  )
}

function PasswordFieldDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-4">
      {PASSWORD_FIELD_VARIANTS.map((variant) => (
        <PasswordField
          key={variant}
          variant={variant}
          placeholder={`${TEXT_FIELD_VARIANT_LABEL[variant]} password`}
          defaultValue="password"
        />
      ))}
    </div>
  )
}

function PasswordFieldStates() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Appearance
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          {PASSWORD_FIELD_VARIANTS.map((variant) => (
            <FieldState key={variant} label={TEXT_FIELD_VARIANT_LABEL[variant]}>
              <PasswordField variant={variant} defaultValue="password" />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Reveal
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          {PASSWORD_REVEAL_VARIANTS.map((reveal) => (
            <FieldState key={reveal} label={PASSWORD_REVEAL_LABEL[reveal]}>
              <PasswordField reveal={reveal} defaultValue="password" />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Size
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-3">
          {TEXT_FIELD_SIZES.map((size) => (
            <FieldState key={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}>
              <PasswordField size={size} defaultValue="password" />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          State
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          <FieldState label="Empty">
            <PasswordField />
          </FieldState>
          <FieldState label="Filled">
            <PasswordField defaultValue="password" />
          </FieldState>
          <FieldState label="Shown">
            <PasswordField defaultValue="password" visible />
          </FieldState>
          <FieldState label="Hover">
            <PasswordField defaultValue="password" preview="hover" />
          </FieldState>
          <FieldState label="Focus">
            <PasswordField defaultValue="password" preview="focus" />
          </FieldState>
          <FieldState label="Invalid">
            <PasswordField defaultValue="123" invalid />
          </FieldState>
          <FieldState label="Valid">
            <PasswordField defaultValue="password" valid />
          </FieldState>
          <FieldState label="Disabled">
            <PasswordField defaultValue="password" disabled />
          </FieldState>
        </div>
      </div>
    </div>
  )
}

const TEXTAREA_VARIANT_LABEL: Record<TextareaVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
  underline: 'Underline',
  well: 'Well',
  composer: 'Composer',
}

const TEXTAREA_SIZE_LABEL: Record<TextareaSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

function AreaState({ label, children }: { label: string; children: ReactNode }) {
  return (
    <StateCard label={label} align="stretch" size="lg" wide>
      {children}
    </StateCard>
  )
}

function TextareaDemo() {
  return (
    <div className="grid w-full gap-4 min-[735px]:grid-cols-2">
      {TEXTAREA_VARIANTS.filter((variant) => variant !== 'composer').map((variant) => (
        <Textarea
          key={variant}
          variant={variant}
          size="sm"
          rows={3}
          icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
          placeholder={`${TEXTAREA_VARIANT_LABEL[variant]} note`}
        />
      ))}
      <div className="min-[735px]:col-span-2">
        <Textarea
          variant="composer"
          icon={<DkMessageInboxTray {...FIELD_GLYPH} />}
          placeholder="Write a note for your team"
          hint="Visible to your workspace"
          maxLength={160}
          defaultValue="Ship the auth kit on Monday."
        />
      </div>
    </div>
  )
}

function TextareaStates() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Appearance
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          {TEXTAREA_VARIANTS.map((variant) => (
            <AreaState key={variant} label={TEXTAREA_VARIANT_LABEL[variant]}>
              <Textarea
                variant={variant}
                size="sm"
                rows={3}
                icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
                placeholder="Write a note"
                maxLength={variant === 'composer' ? 80 : undefined}
                hint={variant === 'composer' ? 'Visible to your team' : undefined}
              />
            </AreaState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Size
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-3">
          {TEXTAREA_SIZES.map((size) => (
            <AreaState key={size} label={TEXTAREA_SIZE_LABEL[size]}>
              <Textarea
                size={size}
                rows={size === 'lg' ? 5 : 3}
                icon={<DkPencilWriteEdit size={size === 'sm' ? 16 : 18} strokeWidth={1.6} absoluteStrokeWidth />}
                placeholder="Write a note"
              />
            </AreaState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          State
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          <AreaState label="Empty">
            <Textarea size="sm" rows={3} icon={<DkPencilWriteEdit {...FIELD_GLYPH} />} placeholder="Write a note" />
          </AreaState>
          <AreaState label="Filled">
            <Textarea
              size="sm"
              rows={3}
              icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
              placeholder="Write a note"
              defaultValue="Ship the auth kit on Monday."
            />
          </AreaState>
          <AreaState label="Hover">
            <Textarea
              size="sm"
              rows={3}
              icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
              placeholder="Write a note"
              preview="hover"
            />
          </AreaState>
          <AreaState label="Focus">
            <Textarea
              size="sm"
              rows={3}
              icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
              placeholder="Write a note"
              defaultValue="Ship the auth kit on Monday."
              preview="focus"
            />
          </AreaState>
          <AreaState label="Invalid">
            <Textarea
              size="sm"
              rows={3}
              icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
              placeholder="Write a note"
              defaultValue="Too short"
              invalid
            />
          </AreaState>
          <AreaState label="Valid">
            <Textarea
              size="sm"
              rows={3}
              icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
              placeholder="Write a note"
              defaultValue="Ship the auth kit on Monday."
              valid
            />
          </AreaState>
          <AreaState label="Disabled">
            <Textarea
              size="sm"
              rows={3}
              icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
              placeholder="Write a note"
              defaultValue="Locked"
              disabled
            />
          </AreaState>
          <AreaState label="Read only">
            <Textarea
              size="sm"
              rows={3}
              icon={<DkPencilWriteEdit {...FIELD_GLYPH} />}
              placeholder="Write a note"
              defaultValue="Published copy."
              readOnly
            />
          </AreaState>
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Composer
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          <AreaState label="Feedback">
            <Textarea
              variant="composer"
              size="sm"
              icon={<DkMessageInboxTray {...FIELD_GLYPH} />}
              placeholder="What can we improve?"
              hint="Sent to the product team"
              maxLength={120}
            />
          </AreaState>
          <AreaState label="Well, counted">
            <Textarea
              variant="well"
              size="sm"
              rows={3}
              icon={<DkDocumentPageFold {...FIELD_GLYPH} />}
              placeholder="Internal note"
              defaultValue="Keep the Monday launch note short."
              count
              maxLength={80}
            />
          </AreaState>
        </div>
      </div>
    </div>
  )
}

const SELECT_GLYPH = { size: 18, strokeWidth: 1.6, absoluteStrokeWidth: true } as const

const SELECT_SIZE_OPTIONS: DropdownOption[] = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
]

const SELECT_PLAN_OPTIONS: DropdownOption[] = [
  {
    value: 'starter',
    label: 'Starter',
    description: 'One workspace',
    icon: <DkLayoutGrid {...SELECT_GLYPH} />,
  },
  {
    value: 'team',
    label: 'Team',
    description: 'Up to ten people',
    icon: <DkRowsThree {...SELECT_GLYPH} />,
  },
  {
    value: 'studio',
    label: 'Studio',
    description: 'Unlimited seats',
    icon: <DkAppDashboardLayoutTiles {...SELECT_GLYPH} />,
  },
  {
    value: 'enterprise',
    label: 'Enterprise',
    description: 'Coming later',
    icon: <DkGlobeWorldEarth {...SELECT_GLYPH} />,
    disabled: true,
  },
]

const SELECT_VARIANT_LABEL: Record<SelectTriggerVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
  underline: 'Underline',
  pill: 'Pill',
}

function SelectPlay({
  value: initial = 'md',
  options = SELECT_SIZE_OPTIONS,
  ...rest
}: {
  value?: string
  options?: DropdownOption[]
  label?: string
  variant?: SelectTriggerVariant
  size?: SelectTriggerSize
  icon?: ReactNode
  placeholder?: string
  searchable?: boolean
  searchPlaceholder?: string
  invalid?: boolean
  valid?: boolean
  disabled?: boolean
  compact?: boolean
}) {
  const [value, setValue] = useState(initial)
  return <Dropdown value={value} onChange={setValue} options={options} {...rest} />
}

function SelectDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-4">
      {SELECT_VARIANTS.map((variant) => (
        <SelectPlay
          key={variant}
          variant={variant}
          icon={<DkGlobeWorldEarth {...SELECT_GLYPH} />}
          placeholder={`${SELECT_VARIANT_LABEL[variant]} select`}
        />
      ))}
    </div>
  )
}

function SelectStates() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Appearance
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          {SELECT_VARIANTS.map((variant) => (
            <FieldState key={variant} label={SELECT_VARIANT_LABEL[variant]}>
              <SelectPlay variant={variant} />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Icons
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2">
          <FieldState label="Field icon">
            <SelectPlay icon={<DkGlobeWorldEarth {...SELECT_GLYPH} />} placeholder="Region" />
          </FieldState>
          <FieldState label="Option icons">
            <SelectPlay value="team" options={SELECT_PLAN_OPTIONS} placeholder="Plan" />
          </FieldState>
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Search
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2">
          <FieldState label="Filterable list">
            <SelectPlay
              searchable
              searchPlaceholder="Search plans"
              value="team"
              options={SELECT_PLAN_OPTIONS}
              placeholder="Plan"
            />
          </FieldState>
          <FieldState label="Search, subtle">
            <SelectPlay
              variant="subtle"
              searchable
              searchPlaceholder="Search"
              icon={<DkMagnifyingGlassFind {...SELECT_GLYPH} />}
              options={SELECT_PLAN_OPTIONS}
              placeholder="Plan"
            />
          </FieldState>
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          Size
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-3">
          {SELECT_SIZES.map((size) => (
            <FieldState key={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}>
              <SelectPlay size={size} icon={<DkGlobeWorldEarth {...SELECT_GLYPH} />} />
            </FieldState>
          ))}
        </div>
      </div>

      <div>
        <Caption className="mb-3 font-medium" tone="secondary">
          State
        </Caption>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 min-[735px]:grid-cols-3">
          <FieldState label="Empty">
            <SelectPlay value="" placeholder="Choose a size" />
          </FieldState>
          <FieldState label="Filled">
            <SelectPlay />
          </FieldState>
          <FieldState label="Hover">
            <SelectTrigger preview="hover">Medium</SelectTrigger>
          </FieldState>
          <FieldState label="Open">
            <SelectTrigger preview="open" leading={<DkGlobeWorldEarth {...SELECT_GLYPH} />}>
              Medium
            </SelectTrigger>
          </FieldState>
          <FieldState label="Invalid">
            <SelectPlay invalid />
          </FieldState>
          <FieldState label="Valid">
            <SelectPlay valid />
          </FieldState>
          <FieldState label="Disabled">
            <SelectPlay disabled />
          </FieldState>
          <FieldState label="Compact">
            <SelectPlay compact />
          </FieldState>
        </div>
      </div>
    </div>
  )
}

function CountryDemo() {
  const [value, setValue] = useState<string | null>('US')
  return <CountrySelect value={value} onChange={setValue} />
}

function AddressStack({
  showCounty = false,
  showCity = false,
}: {
  showCounty?: boolean
  showCity?: boolean
}) {
  const [country, setCountry] = useState<string | null>('US')
  const [state, setState] = useState<string | null>('US-CA')
  const [county, setCounty] = useState<string | null>('US-CA:los-angeles')
  const [city, setCity] = useState<string | null>('US-CA:los-angeles')

  function changeCountry(next: string | null) {
    setCountry(next)
    setState(null)
    setCounty(null)
    setCity(null)
  }

  function changeState(next: string | null) {
    setState(next)
    setCounty(null)
    setCity(null)
  }

  function changeCounty(next: string | null) {
    setCounty(next)
    setCity(null)
  }

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-4">
      <CountrySelect
        value={country}
        onChange={changeCountry}
        allowClear={false}
      />
      <StateSelect country={country} value={state} onChange={changeState} />
      {showCounty ? (
        <CountySelect state={state} value={county} onChange={changeCounty} />
      ) : null}
      {showCity ? (
        <CitySelect
          country={country}
          state={state}
          county={county}
          value={city}
          onChange={setCity}
        />
      ) : null}
    </div>
  )
}

function StateDemo() {
  return <AddressStack />
}

function CountyDemo() {
  return <AddressStack showCounty />
}

function CityDemo() {
  return <AddressStack showCounty showCity />
}

function LanguageDemo() {
  const [value, setValue] = useState<string | null>('en-US')
  return <LanguageSelect value={value} onChange={setValue} />
}

function PhoneDemo() {
  const [value, setValue] = useState('+14155552671')
  return <PhoneInput value={value} onChange={setValue} />
}

function CountryPlay({
  value: initial = 'US',
  ...rest
}: {
  value?: string | null
  variant?: SelectTriggerVariant
  size?: SelectTriggerSize
  disabled?: boolean
  compact?: boolean
  allowClear?: boolean
  placeholder?: string
}) {
  const [value, setValue] = useState<string | null>(initial)
  return <CountrySelect value={value} onChange={setValue} {...rest} />
}

function LanguagePlay({
  value: initial = 'en-US',
  ...rest
}: {
  value?: string | null
  variant?: SelectTriggerVariant
  size?: SelectTriggerSize
  disabled?: boolean
  compact?: boolean
  placeholder?: string
}) {
  const [value, setValue] = useState(initial ?? 'en-US')
  return <LanguageSelect value={value} onChange={setValue} {...rest} />
}

function PhonePlay({
  value: initial = '+14155552671',
  disabled,
}: {
  value?: string
  disabled?: boolean
}) {
  const [value, setValue] = useState(initial)
  return <PhoneInput value={value} onChange={setValue} disabled={disabled} />
}

function CountryStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid>
          {SELECT_VARIANTS.map((variant) => (
            <FieldState key={variant} label={SELECT_VARIANT_LABEL[variant]}>
              <CountryPlay variant={variant} />
            </FieldState>
          ))}
        </StateGrid>
      </StateGroup>
      <StateGroup title="Size">
        <StateGrid columns={3}>
          {SELECT_SIZES.map((size) => (
            <FieldState key={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}>
              <CountryPlay size={size} />
            </FieldState>
          ))}
        </StateGrid>
      </StateGroup>
      <StateGroup title="State">
        <StateGrid>
          <FieldState label="Empty">
            <CountryPlay value={null} />
          </FieldState>
          <FieldState label="Filled">
            <CountryPlay />
          </FieldState>
          <FieldState label="Compact">
            <CountryPlay compact />
          </FieldState>
          <FieldState label="Disabled">
            <CountryPlay disabled />
          </FieldState>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function StateStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Cascade">
        <StateGrid columns={2}>
          <FieldState label="Country, then region">
            <AddressStack />
          </FieldState>
          <FieldState label="Disabled">
            <StateSelect country="US" value="US-CA" onChange={() => undefined} disabled />
          </FieldState>
        </StateGrid>
      </StateGroup>
      <StateGroup title="Appearance">
        <StateGrid>
          {SELECT_VARIANTS.map((variant) => (
            <FieldState key={variant} label={SELECT_VARIANT_LABEL[variant]}>
              <StateSelect country="US" value="US-CA" onChange={() => undefined} variant={variant} />
            </FieldState>
          ))}
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function CountyStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Cascade">
        <StateGrid columns={2}>
          <FieldState label="Country, region, county">
            <AddressStack showCounty />
          </FieldState>
          <FieldState label="Disabled">
            <CountySelect state="US-CA" value="US-CA:los-angeles" onChange={() => undefined} disabled />
          </FieldState>
        </StateGrid>
      </StateGroup>
      <StateGroup title="Appearance">
        <StateGrid>
          {SELECT_VARIANTS.map((variant) => (
            <FieldState key={variant} label={SELECT_VARIANT_LABEL[variant]}>
              <CountySelect state="US-CA" value="US-CA:los-angeles" onChange={() => undefined} variant={variant} />
            </FieldState>
          ))}
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function CityStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Cascade">
        <StateGrid columns={2}>
          <FieldState label="Full address stack">
            <AddressStack showCounty showCity />
          </FieldState>
          <FieldState label="Disabled">
            <CitySelect country="US" state="US-CA" value="US-CA:los-angeles" onChange={() => undefined} disabled />
          </FieldState>
        </StateGrid>
      </StateGroup>
      <StateGroup title="Appearance">
        <StateGrid>
          {SELECT_VARIANTS.map((variant) => (
            <FieldState key={variant} label={SELECT_VARIANT_LABEL[variant]}>
              <CitySelect country="US" state="US-CA" value="US-CA:los-angeles" onChange={() => undefined} variant={variant} />
            </FieldState>
          ))}
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function LanguageStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid>
          {SELECT_VARIANTS.map((variant) => (
            <FieldState key={variant} label={SELECT_VARIANT_LABEL[variant]}>
              <LanguagePlay variant={variant} />
            </FieldState>
          ))}
        </StateGrid>
      </StateGroup>
      <StateGroup title="Size">
        <StateGrid columns={3}>
          {SELECT_SIZES.map((size) => (
            <FieldState key={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}>
              <LanguagePlay size={size} />
            </FieldState>
          ))}
        </StateGrid>
      </StateGroup>
      <StateGroup title="State">
        <StateGrid>
          <FieldState label="Filled">
            <LanguagePlay />
          </FieldState>
          <FieldState label="Compact">
            <LanguagePlay compact />
          </FieldState>
          <FieldState label="Disabled">
            <LanguagePlay disabled />
          </FieldState>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function PhoneStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="State">
        <StateGrid>
          <FieldState label="United States">
            <PhonePlay />
          </FieldState>
          <FieldState label="Pakistan">
            <PhonePlay value="+923001234567" />
          </FieldState>
          <FieldState label="United Kingdom">
            <PhonePlay value="+447911123456" />
          </FieldState>
          <FieldState label="Empty national">
            <PhonePlay value="+1" />
          </FieldState>
          <FieldState label="Disabled">
            <PhonePlay disabled />
          </FieldState>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function ProgressDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-8">
      <div className="flex flex-col gap-6">
        {PROGRESS_VARIANTS.map((variant) => (
          <Progress
            key={variant}
            variant={variant}
            label={PROGRESS_VARIANT_LABEL[variant]}
            value={variant === 'ghost' ? 48 : 64}
          />
        ))}
      </div>
      <div className="flex flex-col gap-6">
        {PROGRESS_VARIANTS.map((variant) => (
          <Progress
            key={`unknown-${variant}`}
            variant={variant}
            label={`${PROGRESS_VARIANT_LABEL[variant]} unknown`}
            indeterminate
          />
        ))}
      </div>
    </div>
  )
}

function ProgressStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid>
          {PROGRESS_VARIANTS.map((variant) => (
            <StateCard key={variant} label={PROGRESS_VARIANT_LABEL[variant]} align="stretch">
              <Progress variant={variant} label={PROGRESS_VARIANT_LABEL[variant]} value={64} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={3}>
          {PROGRESS_SIZES.map((size) => (
            <StateCard key={size} label={PROGRESS_SIZE_LABEL[size]} align="stretch">
              <Progress size={size} label={PROGRESS_SIZE_LABEL[size]} value={64} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={3}>
          {PROGRESS_SIZES.map((size) => (
            <StateCard key={`pill-${size}`} label={PROGRESS_SIZE_LABEL[size]} align="stretch">
              <Progress variant="pill" size={size} label={PROGRESS_SIZE_LABEL[size]} value={64} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid>
          {PROGRESS_TONES.map((tone) => (
            <StateCard key={tone} label={PROGRESS_TONE_LABEL[tone]} align="stretch">
              <Progress tone={tone} label={PROGRESS_TONE_LABEL[tone]} value={tone === 'success' ? 100 : 64} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="On dark">
        <StateGrid>
          {PROGRESS_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={PROGRESS_VARIANT_LABEL[variant]}
              align="stretch"
              className="bg-black"
            >
              <Progress variant={variant} label={PROGRESS_VARIANT_LABEL[variant]} value={64} onDark />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Unknown">
        <StateGrid>
          {PROGRESS_VARIANTS.map((variant) => (
            <StateCard key={`unknown-${variant}`} label={PROGRESS_VARIANT_LABEL[variant]} align="stretch">
              <Progress variant={variant} label="Preparing" indeterminate />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Unknown size">
        <StateGrid columns={3}>
          {PROGRESS_SIZES.map((size) => (
            <StateCard key={`unknown-size-${size}`} label={PROGRESS_SIZE_LABEL[size]} align="stretch">
              <Progress size={size} label="Preparing" indeterminate />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Unknown pill size">
        <StateGrid columns={3}>
          {PROGRESS_SIZES.map((size) => (
            <StateCard key={`unknown-pill-${size}`} label={PROGRESS_SIZE_LABEL[size]} align="stretch">
              <Progress variant="pill" size={size} label="Preparing" indeterminate />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Unknown tone">
        <StateGrid>
          {PROGRESS_TONES.map((tone) => (
            <StateCard key={`unknown-tone-${tone}`} label={PROGRESS_TONE_LABEL[tone]} align="stretch">
              <Progress tone={tone} label="Preparing" indeterminate />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Unknown on dark">
        <StateGrid>
          {PROGRESS_VARIANTS.map((variant) => (
            <StateCard
              key={`unknown-dark-${variant}`}
              label={PROGRESS_VARIANT_LABEL[variant]}
              align="stretch"
              className="bg-black"
            >
              <Progress variant={variant} label="Preparing" indeterminate onDark />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid>
          <StateCard label="Empty" align="stretch">
            <Progress label="Waiting" value={0} />
          </StateCard>
          <StateCard label="Partial" align="stretch">
            <Progress label="Uploading" value={64} />
          </StateCard>
          <StateCard label="Complete" align="stretch">
            <Progress label="Done" value={100} tone="success" />
          </StateCard>
          <StateCard label="Failed" align="stretch">
            <Progress label="Upload failed" value={28} tone="danger" />
          </StateCard>
          <StateCard label="No percent" align="stretch">
            <Progress label="Installing" value={38} showValue={false} />
          </StateCard>
          <StateCard label="Unlabeled" align="stretch">
            <Progress value={72} />
          </StateCard>
          <StateCard label="Disabled" align="stretch">
            <Progress label="Paused" value={41} disabled />
          </StateCard>
          <StateCard label="Unknown unlabeled" align="stretch">
            <Progress indeterminate />
          </StateCard>
          <StateCard label="Unknown disabled" align="stretch">
            <Progress label="Preparing" indeterminate disabled />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function ScoreRingDemo() {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="flex flex-wrap items-end justify-center gap-8">
        {SCORE_RING_VARIANTS.map((variant) => (
          <ScoreRing
            key={variant}
            variant={variant}
            score={variant === 'ghost' ? 48 : 72}
            label={SCORE_RING_VARIANT_LABEL[variant]}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-end justify-center gap-8">
        {SCORE_RING_VARIANTS.map((variant) => (
          <ScoreRing
            key={`unknown-${variant}`}
            variant={variant}
            indeterminate
            label={`${SCORE_RING_VARIANT_LABEL[variant]} unknown`}
          />
        ))}
      </div>
    </div>
  )
}

function ScoreRingStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid>
          {SCORE_RING_VARIANTS.map((variant) => (
            <StateCard key={variant} label={SCORE_RING_VARIANT_LABEL[variant]} className="bg-bg-primary">
              <ScoreRing variant={variant} label={SCORE_RING_VARIANT_LABEL[variant]} score={72} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={3}>
          {SCORE_RING_SIZES.map((size) => (
            <StateCard key={size} label={SCORE_RING_SIZE_LABEL[size]} className="bg-bg-primary">
              <ScoreRing size={size} label={SCORE_RING_SIZE_LABEL[size]} score={72} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={3}>
          {SCORE_RING_SIZES.map((size) => (
            <StateCard key={`pill-${size}`} label={SCORE_RING_SIZE_LABEL[size]} className="bg-bg-primary">
              <ScoreRing variant="pill" size={size} label={SCORE_RING_SIZE_LABEL[size]} score={72} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid>
          {SCORE_RING_TONES.map((tone) => (
            <StateCard key={tone} label={SCORE_RING_TONE_LABEL[tone]} className="bg-bg-primary">
              <ScoreRing
                tone={tone}
                label={SCORE_RING_TONE_LABEL[tone]}
                score={tone === 'success' ? 100 : 72}
                showCheck={tone === 'success'}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="On dark">
        <StateGrid>
          {SCORE_RING_VARIANTS.map((variant) => (
            <StateCard key={`dark-${variant}`} label={SCORE_RING_VARIANT_LABEL[variant]} className="bg-black">
              <ScoreRing variant={variant} label={SCORE_RING_VARIANT_LABEL[variant]} score={72} onDark />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Unknown">
        <StateGrid>
          {SCORE_RING_VARIANTS.map((variant) => (
            <StateCard
              key={`unknown-${variant}`}
              label={SCORE_RING_VARIANT_LABEL[variant]}
              className="bg-bg-primary"
            >
              <ScoreRing variant={variant} label="Preparing" indeterminate />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Unknown size">
        <StateGrid columns={3}>
          {SCORE_RING_SIZES.map((size) => (
            <StateCard key={`unknown-size-${size}`} label={SCORE_RING_SIZE_LABEL[size]} className="bg-bg-primary">
              <ScoreRing size={size} label="Preparing" indeterminate />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Unknown pill size">
        <StateGrid columns={3}>
          {SCORE_RING_SIZES.map((size) => (
            <StateCard key={`unknown-pill-${size}`} label={SCORE_RING_SIZE_LABEL[size]} className="bg-bg-primary">
              <ScoreRing variant="pill" size={size} label="Preparing" indeterminate />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Unknown tone">
        <StateGrid>
          {SCORE_RING_TONES.map((tone) => (
            <StateCard key={`unknown-tone-${tone}`} label={SCORE_RING_TONE_LABEL[tone]} className="bg-bg-primary">
              <ScoreRing tone={tone} label="Preparing" indeterminate />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Unknown on dark">
        <StateGrid>
          {SCORE_RING_VARIANTS.map((variant) => (
            <StateCard
              key={`unknown-dark-${variant}`}
              label={SCORE_RING_VARIANT_LABEL[variant]}
              className="bg-black"
            >
              <ScoreRing variant={variant} label="Preparing" indeterminate onDark />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid>
          <StateCard label="Empty" className="bg-bg-primary">
            <ScoreRing label="Waiting" score={0} />
          </StateCard>
          <StateCard label="Partial" className="bg-bg-primary">
            <ScoreRing label="Profile" score={72} />
          </StateCard>
          <StateCard label="Complete" className="bg-bg-primary">
            <ScoreRing label="Done" score={100} tone="success" />
          </StateCard>
          <StateCard label="Checked" className="bg-bg-primary">
            <ScoreRing label="Verified" score={100} tone="success" showCheck />
          </StateCard>
          <StateCard label="Failed" className="bg-bg-primary">
            <ScoreRing label="Failed" score={28} tone="danger" />
          </StateCard>
          <StateCard label="No percent" className="bg-bg-primary">
            <ScoreRing label="Health" score={86} showValue={false} />
          </StateCard>
          <StateCard label="Unlabeled" className="bg-bg-primary">
            <ScoreRing score={72} />
          </StateCard>
          <StateCard label="Disabled" className="bg-bg-primary">
            <ScoreRing label="Paused" score={41} disabled />
          </StateCard>
          <StateCard label="Unknown unlabeled" className="bg-bg-primary">
            <ScoreRing indeterminate />
          </StateCard>
          <StateCard label="Unknown disabled" className="bg-bg-primary">
            <ScoreRing label="Preparing" indeterminate disabled />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function SkeletonDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-6">
      <Skeleton loading label="Loading stats">
        <StatCard
          label="Revenue"
          value="$48,290"
          delta={{ value: '+12.4%', tone: 'up' }}
          hint="vs last month"
        />
      </Skeleton>
      <Skeleton loading label="Loading profile">
        <div className="flex items-center gap-3">
          <Avatar name="Maya Chen" size="lg" />
          <div className="min-w-0 flex-1">
            <Label as="p">Maya Chen</Label>
            <Caption>Workspace owner</Caption>
          </div>
        </div>
      </Skeleton>
      <Skeleton loading label="Loading action">
        <Button>Save changes</Button>
      </Skeleton>
    </div>
  )
}

function SkeletonLiveToggle() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="flex w-full flex-col gap-4">
      <Button variant="secondary" fullWidth={false} size="sm" onClick={() => setLoading((value) => !value)}>
        {loading ? 'Show content' : 'Show skeleton'}
      </Button>
      <Skeleton loading={loading} label="Loading stats">
        <StatCard
          label="Revenue"
          value="$48,290"
          delta={{ value: '+12.4%', tone: 'up' }}
          hint="vs last month"
        />
      </Skeleton>
    </div>
  )
}

function SkeletonStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Auto">
        <StateGrid columns={2}>
          <StateCard label="Toggle" align="stretch" wide>
            <SkeletonLiveToggle />
          </StateCard>
          <StateCard label="Button" align="stretch" wide>
            <Skeleton loading label="Loading action">
              <Button>Save changes</Button>
            </Skeleton>
          </StateCard>
          <StateCard label="Field" align="stretch" wide>
            <Skeleton loading label="Loading field">
              <TextField placeholder="Email address" />
            </Skeleton>
          </StateCard>
          <StateCard label="Avatar row" align="stretch" wide>
            <Skeleton loading label="Loading profile">
              <div className="flex w-full items-center gap-3">
                <Avatar name="Maya Chen" size="lg" />
                <div className="min-w-0 flex-1">
                  <Label as="p">Maya Chen</Label>
                  <Caption>Workspace owner</Caption>
                </div>
              </div>
            </Skeleton>
          </StateCard>
          <StateCard label="Alert" align="stretch" wide>
            <Skeleton loading label="Loading alert">
              <Alert tone="info" title="Workspace is in sync">
                Changes publish to every seat.
              </Alert>
            </Skeleton>
          </StateCard>
          <StateCard label="Stat card" align="stretch" wide>
            <Skeleton loading label="Loading stats">
              <StatCard
                label="Revenue"
                value="$48,290"
                delta={{ value: '+12.4%', tone: 'up' }}
                hint="vs last month"
              />
            </Skeleton>
          </StateCard>
          <StateCard label="Page header" align="stretch" wide>
            <Skeleton loading label="Loading header">
              <PageHeader title="Projects" description="Everything currently in flight." />
            </Skeleton>
          </StateCard>
          <StateCard label="Table" align="stretch" wide>
            <Skeleton loading label="Loading table">
              <DataTable
                size="sm"
                data={[
                  { id: '1', name: 'Atlas Checkout', status: 'Live' },
                  { id: '2', name: 'Northstar Auth', status: 'In review' },
                ]}
                rowKey={(row) => row.id}
                columns={[
                  { key: 'name', header: 'Name' },
                  { key: 'status', header: 'Status' },
                ]}
                minWidth="320px"
              />
            </Skeleton>
          </StateCard>
          <StateCard label="Key value" align="stretch" wide>
            <Skeleton loading label="Loading details">
              <KeyValueGroup>
                <KeyValueRow label="Email" value="alex@roboticela.com" />
                <KeyValueRow label="Username" value="@alex" />
              </KeyValueGroup>
            </Skeleton>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {SKELETON_VARIANTS.map((variant) => (
            <StateCard key={variant} label={SKELETON_VARIANT_LABEL[variant]} align="stretch" wide>
              <Skeleton variant={variant} lines={3} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Shape">
        <StateGrid columns={2}>
          {SKELETON_SHAPES.map((shape) => (
            <StateCard
              key={shape}
              label={SKELETON_SHAPE_LABEL[shape]}
              align={shape === 'circle' || shape === 'square' ? 'center' : 'stretch'}
              wide
            >
              <Skeleton shape={shape} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={3}>
          {SKELETON_SIZES.map((size) => (
            <StateCard key={size} label={SKELETON_SIZE_LABEL[size]} align="stretch">
              <Skeleton size={size} lines={3} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Circle size">
        <StateGrid columns={3}>
          {SKELETON_SIZES.map((size) => (
            <StateCard key={`circle-${size}`} label={SKELETON_SIZE_LABEL[size]}>
              <Skeleton shape="circle" size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Motion">
        <StateGrid columns={3}>
          {SKELETON_MOTIONS.map((motion) => (
            <StateCard key={motion} label={SKELETON_MOTION_LABEL[motion]} align="stretch">
              <Skeleton motion={motion} lines={3} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          <StateCard label="Line" align="stretch" wide>
            <Skeleton />
          </StateCard>
          <StateCard label="Three lines" align="stretch" wide>
            <Skeleton lines={3} label="Loading article" />
          </StateCard>
          <StateCard label="Heading and lines" align="stretch" wide>
            <div className="flex w-full flex-col gap-3">
              <Skeleton shape="heading" />
              <Skeleton lines={3} />
            </div>
          </StateCard>
          <StateCard label="Avatar row" align="stretch" wide>
            <div className="flex w-full items-center gap-3">
              <Skeleton shape="circle" />
              <div className="min-w-0 flex-1">
                <Skeleton lines={2} />
              </div>
            </div>
          </StateCard>
          <StateCard label="Image and copy" align="stretch" wide>
            <div className="flex w-full flex-col gap-3">
              <Skeleton shape="rect" size="sm" />
              <Skeleton shape="heading" size="sm" />
              <Skeleton lines={2} size="sm" />
            </div>
          </StateCard>
          <StateCard label="Pill button" align="stretch" wide>
            <Skeleton variant="pill" className="h-11 w-[140px]" />
          </StateCard>
          <StateCard label="Outline circle">
            <Skeleton variant="outline" shape="circle" size="lg" />
          </StateCard>
          <StateCard label="Static" align="stretch" wide>
            <Skeleton motion="none" lines={3} />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function EmptyIcon({ name = 'inbox' }: { name?: 'inbox' | 'search' | 'lock' | 'grid' | 'refresh' }) {
  const Icon =
    name === 'search'
      ? DkMagnifyingGlassFind
      : name === 'lock'
        ? DkPadlockSecureClosed
        : name === 'grid'
          ? DkLayoutGrid
          : name === 'refresh'
            ? DkRefreshClockwiseRotate
            : DkMessageInboxTray
  return <Icon strokeWidth={1.5} absoluteStrokeWidth />
}

function EmptyAction({
  children = 'New project',
  size = 'md',
  variant,
  disabled,
}: {
  children?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
}) {
  return (
    <Button size={size} variant={variant} disabled={disabled}>
      {children}
    </Button>
  )
}

function EmptyStateDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-4">
      {EMPTY_STATE_VARIANTS.map((variant) => (
        <EmptyState
          key={variant}
          variant={variant}
          icon={<EmptyIcon />}
          title={EMPTY_STATE_VARIANT_LABEL[variant]}
          body="Mentions and reviews will show up here."
        />
      ))}
    </div>
  )
}

function EmptyStateStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {EMPTY_STATE_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={EMPTY_STATE_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <EmptyState
                variant={variant}
                icon={<EmptyIcon />}
                title="No messages"
                body="Mentions and reviews will show up here."
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {EMPTY_STATE_SIZES.map((size) => (
            <StateCard key={size} label={EMPTY_STATE_SIZE_LABEL[size]} align="stretch" wide size="lg" className="bg-bg-primary">
              <EmptyState
                size={size}
                icon={<EmptyIcon />}
                title="No projects"
                body="Create a project to get started."
                action={<EmptyAction size={size === 'lg' ? 'md' : size}>New project</EmptyAction>}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {EMPTY_STATE_TONES.map((tone) => (
            <StateCard key={tone} label={EMPTY_STATE_TONE_LABEL[tone]} align="stretch" wide className="bg-bg-primary">
              <EmptyState
                tone={tone}
                icon={<EmptyIcon name={tone === 'danger' ? 'refresh' : tone === 'warning' ? 'lock' : 'inbox'} />}
                title={
                  tone === 'success'
                    ? 'Inbox is clear'
                    : tone === 'warning'
                      ? 'No access'
                      : tone === 'danger'
                        ? 'Could not load'
                        : 'No messages'
                }
                body={
                  tone === 'success'
                    ? 'New mentions will land here.'
                    : tone === 'warning'
                      ? 'Ask an owner to invite you to this workspace.'
                      : tone === 'danger'
                        ? 'Check the connection, then try again.'
                        : 'Mentions and reviews will show up here.'
                }
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="On dark">
        <StateGrid columns={2}>
          {EMPTY_STATE_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={EMPTY_STATE_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <EmptyState
                variant={variant}
                icon={<EmptyIcon />}
                title="No messages"
                body="Mentions and reviews will show up here."
                onDark
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          <StateCard label="Title only" align="stretch" wide className="bg-bg-primary">
            <EmptyState title="No projects" />
          </StateCard>
          <StateCard label="No icon" align="stretch" wide className="bg-bg-primary">
            <EmptyState title="No projects" body="Create a project to get started." />
          </StateCard>
          <StateCard label="First use" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              icon={<EmptyIcon name="grid" />}
              title="No projects"
              body="Create a project to get started."
              action={<EmptyAction>New project</EmptyAction>}
            />
          </StateCard>
          <StateCard label="No results" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              icon={<EmptyIcon name="search" />}
              title="No results"
              body="Try a different search."
            />
          </StateCard>
          <StateCard label="Could not load" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              tone="danger"
              icon={<EmptyIcon name="refresh" />}
              title="Could not load"
              body="Check the connection, then try again."
              action={<EmptyAction variant="secondary">Try again</EmptyAction>}
            />
          </StateCard>
          <StateCard label="No access" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              tone="warning"
              icon={<EmptyIcon name="lock" />}
              title="No access"
              body="Ask an owner to invite you to this workspace."
            />
          </StateCard>
          <StateCard label="With secondary" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              icon={<EmptyIcon name="grid" />}
              title="No projects"
              body="Create a project or import one you already have."
              action={<EmptyAction>New project</EmptyAction>}
              secondary={<EmptyAction variant="ghost">Import</EmptyAction>}
            />
          </StateCard>
          <StateCard label="Start" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              align="start"
              variant="outline"
              icon={<EmptyIcon />}
              title="No messages"
              body="Mentions and reviews will show up here."
              action={<EmptyAction size="sm">Refresh</EmptyAction>}
            />
          </StateCard>
          <StateCard label="Disabled action" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              icon={<EmptyIcon name="grid" />}
              title="No projects"
              body="You need permission to create one."
              action={<EmptyAction disabled>New project</EmptyAction>}
            />
          </StateCard>
          <StateCard label="Outline, action" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              variant="outline"
              icon={<EmptyIcon />}
              title="Inbox is clear"
              body="New mentions and review requests will land here."
              action={<EmptyAction variant="secondary">View projects</EmptyAction>}
            />
          </StateCard>
          <StateCard label="Pill, small" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              variant="pill"
              size="sm"
              icon={<EmptyIcon name="search" />}
              title="No results"
              body="Try a different search."
            />
          </StateCard>
          <StateCard label="Ghost, large" align="stretch" wide className="bg-bg-primary">
            <EmptyState
              variant="ghost"
              size="lg"
              icon={<EmptyIcon />}
              title="Inbox is clear"
              body="New mentions and review requests will land here."
            />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function EmptyPopupDemo() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-4">
      {EMPTY_POPUP_VARIANTS.map((variant) => (
        <EmptyPopup
          key={variant}
          variant={variant}
          icon={<EmptyIcon name="search" />}
          title={EMPTY_POPUP_VARIANT_LABEL[variant]}
          body="Try a different search."
        />
      ))}
    </div>
  )
}

function EmptyPopupStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {EMPTY_POPUP_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={EMPTY_POPUP_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <div className="flex justify-center">
                <EmptyPopup
                  variant={variant}
                  icon={<EmptyIcon name="search" />}
                  title="No results"
                  body="Try a different search."
                />
              </div>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {EMPTY_POPUP_SIZES.map((size) => (
            <StateCard key={size} label={EMPTY_POPUP_SIZE_LABEL[size]} align="stretch" wide className="bg-bg-primary">
              <div className="flex justify-center">
                <EmptyPopup
                  size={size}
                  icon={<EmptyIcon name="inbox" />}
                  title="No notifications"
                  body="You are all caught up."
                  action={<EmptyAction size="sm">Refresh</EmptyAction>}
                />
              </div>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {EMPTY_POPUP_TONES.map((tone) => (
            <StateCard key={tone} label={EMPTY_POPUP_TONE_LABEL[tone]} align="stretch" wide className="bg-bg-primary">
              <div className="flex justify-center">
                <EmptyPopup
                  tone={tone}
                  icon={<EmptyIcon name={tone === 'danger' ? 'refresh' : tone === 'warning' ? 'lock' : 'inbox'} />}
                  title={
                    tone === 'success'
                      ? 'Inbox is clear'
                      : tone === 'warning'
                        ? 'No access'
                        : tone === 'danger'
                          ? 'Could not load'
                          : 'No notifications'
                  }
                  body={
                    tone === 'success'
                      ? 'New mentions will land here.'
                      : tone === 'warning'
                        ? 'Ask an owner to invite you.'
                        : tone === 'danger'
                          ? 'Check the connection, then try again.'
                          : 'Mentions will show up here.'
                  }
                />
              </div>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Surface">
        <StateGrid columns={2}>
          {EMPTY_POPUP_SURFACES.map((surface) => (
            <StateCard
              key={surface}
              label={EMPTY_POPUP_SURFACE_LABEL[surface]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <div className="flex justify-center">
                <EmptyPopup
                  surface={surface}
                  variant="outline"
                  icon={<EmptyIcon name="search" />}
                  title="No results"
                  body="Try a different search."
                />
              </div>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          <StateCard label="Title only" align="stretch" wide className="bg-bg-primary">
            <div className="flex justify-center">
              <EmptyPopup title="No results" />
            </div>
          </StateCard>
          <StateCard label="No icon" align="stretch" wide className="bg-bg-primary">
            <div className="flex justify-center">
              <EmptyPopup title="No results" body="Try a different search." />
            </div>
          </StateCard>
          <StateCard label="No notifications" align="stretch" wide className="bg-bg-primary">
            <div className="flex justify-center">
              <EmptyPopup
                icon={<EmptyIcon name="inbox" />}
                title="No notifications"
                body="You are all caught up."
              />
            </div>
          </StateCard>
          <StateCard label="Could not load" align="stretch" wide className="bg-bg-primary">
            <div className="flex justify-center">
              <EmptyPopup
                tone="danger"
                icon={<EmptyIcon name="refresh" />}
                title="Could not load"
                body="Check the connection, then try again."
                action={<EmptyAction size="sm" variant="secondary">Try again</EmptyAction>}
              />
            </div>
          </StateCard>
          <StateCard label="Plain in a menu" align="stretch" wide className="bg-bg-primary">
            <div className="mx-auto w-full max-w-[280px] overflow-hidden rounded-2xl border border-border-default bg-bg-elevated p-2.5 dark:bg-bg-secondary">
              <EmptyPopup
                surface="plain"
                size="sm"
                icon={<EmptyIcon name="search" />}
                title="No results"
                body="Try a different search."
              />
            </div>
          </StateCard>
          <StateCard label="With secondary" align="stretch" wide className="bg-bg-primary">
            <div className="flex justify-center">
              <EmptyPopup
                icon={<EmptyIcon name="grid" />}
                title="No projects"
                body="Create one or import."
                action={<EmptyAction size="sm">New</EmptyAction>}
                secondary={<EmptyAction size="sm" variant="ghost">Import</EmptyAction>}
              />
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function LoadingFrame({
  children,
  height = 'h-[200px]',
  onDark = false,
}: {
  children: ReactNode
  height?: string
  onDark?: boolean
}) {
  return (
    <div className={`w-full overflow-hidden rounded-[12px] ${height} ${onDark ? 'bg-black' : 'bg-bg-primary'}`}>
      {children}
    </div>
  )
}

function LoadingState({
  variant,
  size,
  indicator,
  preview = 'initial',
  showLogo,
  showStatus,
  onDark,
  height,
}: {
  variant?: 'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'
  size?: 'sm' | 'md' | 'lg'
  indicator?: 'spinner' | 'bar' | 'none'
  preview?: 'initial' | 'delayed'
  showLogo?: boolean
  showStatus?: boolean
  onDark?: boolean
  height?: string
}) {
  return (
    <LoadingFrame height={height} onDark={onDark}>
      <LoadingScreen
        embedded
        variant={variant}
        size={size}
        indicator={indicator}
        preview={preview}
        showLogo={showLogo}
        showStatus={showStatus}
        onDark={onDark}
        status="Setting things up…"
        delayedStatus="This is taking longer than usual…"
      />
    </LoadingFrame>
  )
}

function LoadingScreenDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-4">
      {LOADING_SCREEN_VARIANTS.map((variant) => (
        <LoadingState key={variant} variant={variant} />
      ))}
    </div>
  )
}

function LoadingScreenStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {LOADING_SCREEN_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={LOADING_SCREEN_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <LoadingState variant={variant} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {LOADING_SCREEN_SIZES.map((size) => (
            <StateCard
              key={size}
              label={LOADING_SCREEN_SIZE_LABEL[size]}
              align="stretch"
              wide
              size="lg"
              className="bg-bg-primary"
            >
              <LoadingState
                size={size}
                height={size === 'sm' ? 'h-[160px]' : size === 'lg' ? 'h-[260px]' : 'h-[200px]'}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Indicator">
        <StateGrid columns={2}>
          {LOADING_SCREEN_INDICATORS.map((indicator) => (
            <StateCard
              key={indicator}
              label={LOADING_SCREEN_INDICATOR_LABEL[indicator]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <LoadingState indicator={indicator} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="On dark">
        <StateGrid columns={2}>
          {LOADING_SCREEN_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={LOADING_SCREEN_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <LoadingState variant={variant} onDark />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          <StateCard label="Initial" align="stretch" wide className="bg-bg-primary">
            <LoadingState preview="initial" />
          </StateCard>
          <StateCard label="Delayed" align="stretch" wide className="bg-bg-primary">
            <LoadingState preview="delayed" />
          </StateCard>
          <StateCard label="No mark" align="stretch" wide className="bg-bg-primary">
            <LoadingState showLogo={false} />
          </StateCard>
          <StateCard label="No status" align="stretch" wide className="bg-bg-primary">
            <LoadingState showStatus={false} />
          </StateCard>
          <StateCard label="Bar" align="stretch" wide className="bg-bg-primary">
            <LoadingState indicator="bar" />
          </StateCard>
          <StateCard label="Bar, delayed" align="stretch" wide className="bg-bg-primary">
            <LoadingState indicator="bar" preview="delayed" />
          </StateCard>
          <StateCard label="Mark only" align="stretch" wide className="bg-bg-primary">
            <LoadingState indicator="none" showStatus={false} />
          </StateCard>
          <StateCard label="Outline, delayed" align="stretch" wide className="bg-bg-primary">
            <LoadingState variant="outline" preview="delayed" />
          </StateCard>
          <StateCard label="Pill, small" align="stretch" wide className="bg-bg-primary">
            <LoadingState variant="pill" size="sm" height="h-[160px]" />
          </StateCard>
          <StateCard label="Ghost, large" align="stretch" wide className="bg-bg-primary">
            <LoadingState variant="ghost" size="lg" height="h-[260px]" />
          </StateCard>
          <StateCard label="Delayed on dark" align="stretch" wide className="bg-black">
            <LoadingState preview="delayed" onDark />
          </StateCard>
          <StateCard label="Bar on dark" align="stretch" wide className="bg-black">
            <LoadingState indicator="bar" onDark />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function LoaderDemo() {
  return (
    <div className="flex w-full flex-wrap items-end justify-center gap-8">
      {LOADER_VARIANTS.map((variant) => (
        <Loader key={variant} variant={variant} label={LOADER_VARIANT_LABEL[variant]} />
      ))}
    </div>
  )
}

function LoaderStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid>
          {LOADER_VARIANTS.map((variant) => (
            <StateCard key={variant} label={LOADER_VARIANT_LABEL[variant]} className="bg-bg-primary">
              <Loader variant={variant} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={3}>
          {LOADER_SIZES.map((size) => (
            <StateCard key={size} label={LOADER_SIZE_LABEL[size]} className="bg-bg-primary">
              <Loader size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid>
          {LOADER_TONES.map((tone) => (
            <StateCard key={tone} label={LOADER_TONE_LABEL[tone]} className="bg-bg-primary">
              <Loader tone={tone} label={LOADER_TONE_LABEL[tone]} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="On dark">
        <StateGrid>
          {LOADER_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={LOADER_VARIANT_LABEL[variant]}
              className="bg-black"
            >
              <Loader variant={variant} onDark />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid>
          <StateCard label="Spinning" className="bg-bg-primary">
            <Loader />
          </StateCard>
          <StateCard label="Static" className="bg-bg-primary">
            <Loader spinning={false} />
          </StateCard>
          <StateCard label="With label" className="bg-bg-primary">
            <Loader label="Saving" />
          </StateCard>
          <StateCard label="Inline" className="bg-bg-primary">
            <Loader layout="inline" label="Loading messages" />
          </StateCard>
          <StateCard label="Disabled" className="bg-bg-primary">
            <Loader label="Paused" disabled />
          </StateCard>
          <StateCard label="Default tone" className="bg-bg-primary">
            <Loader tone="default" label="Loading" />
          </StateCard>
          <StateCard label="Pill, small" className="bg-bg-primary">
            <Loader variant="pill" size="sm" />
          </StateCard>
          <StateCard label="Ghost, large" className="bg-bg-primary">
            <Loader variant="ghost" size="lg" />
          </StateCard>
          <StateCard label="Outline, inline" className="bg-bg-primary">
            <Loader variant="outline" layout="inline" label="Refreshing" />
          </StateCard>
          <StateCard label="Danger" className="bg-bg-primary">
            <Loader tone="danger" label="Retrying" />
          </StateCard>
          <StateCard label="Inline on dark" className="bg-black">
            <Loader layout="inline" label="Loading" onDark />
          </StateCard>
          <StateCard label="Pill on dark" className="bg-black">
            <Loader variant="pill" onDark />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function CheckboxDemo() {
  const [outline, setOutline] = useState(true)
  const [digest, setDigest] = useState(true)
  const [product, setProduct] = useState(false)
  const [ack, setAck] = useState(false)
  const selected = Number(digest) + Number(product)

  return (
    <CheckboxGroup label="Email preferences" className="w-full max-w-[320px] gap-4">
      <Checkbox
        variant="outline"
        label="Outline"
        checked={outline}
        onChange={(event) => setOutline(event.target.checked)}
      />
      <Checkbox
        variant="subtle"
        label="Subtle"
        checked={outline}
        onChange={(event) => setOutline(event.target.checked)}
      />
      <Checkbox
        variant="ghost"
        label="Ghost"
        checked={outline}
        onChange={(event) => setOutline(event.target.checked)}
      />
      <Checkbox
        label="All email"
        checked={selected === 2}
        indeterminate={selected === 1}
        onChange={(event) => {
          const next = event.target.checked
          setDigest(next)
          setProduct(next)
        }}
      />
      <Checkbox
        className="pl-7"
        label="Weekly digest"
        checked={digest}
        onChange={(event) => setDigest(event.target.checked)}
      />
      <Checkbox
        className="pl-7"
        label="Product updates"
        checked={product}
        onChange={(event) => setProduct(event.target.checked)}
      />
      <Checkbox
        tone="danger"
        label="I understand this will delete the project"
        checked={ack}
        onChange={(event) => setAck(event.target.checked)}
      />
    </CheckboxGroup>
  )
}

const CHECKBOX_VARIANT_LABEL: Record<CheckboxVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
}

const CHECKBOX_TONE_LABEL: Record<CheckboxTone, string> = {
  brand: 'Brand',
  danger: 'Danger',
}

const CHECKBOX_SIZE_LABEL: Record<CheckboxSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

function CheckboxStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid>
          {CHECKBOX_VARIANTS.map((variant) => (
            <StateCard key={variant} label={CHECKBOX_VARIANT_LABEL[variant]}>
              <Checkbox variant={variant} label={CHECKBOX_VARIANT_LABEL[variant]} defaultChecked />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {CHECKBOX_TONES.map((tone) => (
            <StateCard key={tone} label={CHECKBOX_TONE_LABEL[tone]}>
              <Checkbox tone={tone} label={tone === 'danger' ? 'Delete this project' : 'Product updates'} defaultChecked />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={3}>
          {CHECKBOX_SIZES.map((size) => (
            <StateCard key={size} label={CHECKBOX_SIZE_LABEL[size]}>
              <Checkbox size={size} label={CHECKBOX_SIZE_LABEL[size]} defaultChecked />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid>
          <StateCard label="Unchecked">
            <Checkbox label="Off" />
          </StateCard>
          <StateCard label="Checked">
            <Checkbox label="On" defaultChecked />
          </StateCard>
          <StateCard label="Mixed">
            <Checkbox label="Some" indeterminate />
          </StateCard>
          <StateCard label="Hover" inert>
            <Checkbox label="Hover" preview="hover" />
          </StateCard>
          <StateCard label="Focus" inert>
            <Checkbox label="Focus" preview="focus" />
          </StateCard>
          <StateCard label="Active" inert>
            <Checkbox label="Active" preview="active" />
          </StateCard>
          <StateCard label="Invalid">
            <Checkbox label="Required" invalid />
          </StateCard>
          <StateCard label="Invalid, on">
            <Checkbox label="Required" invalid defaultChecked />
          </StateCard>
          <StateCard label="Disabled">
            <Checkbox label="Locked" disabled />
          </StateCard>
          <StateCard label="Disabled, on">
            <Checkbox label="Locked" defaultChecked disabled />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function RadioDemo() {
  const [pay, setPay] = useState('card')
  const [chrome, setChrome] = useState('outline')
  const [severity, setSeverity] = useState('keep')

  return (
    <div className="flex w-full max-w-[320px] flex-col gap-6">
      <RadioGroup label="Appearance" className="gap-1">
        <Radio
          variant="outline"
          name="docs-radio-chrome"
          label="Outline"
          checked={chrome === 'outline'}
          onChange={() => setChrome('outline')}
        />
        <Radio
          variant="subtle"
          name="docs-radio-chrome"
          label="Subtle"
          checked={chrome === 'subtle'}
          onChange={() => setChrome('subtle')}
        />
        <Radio
          variant="ghost"
          name="docs-radio-chrome"
          label="Ghost"
          checked={chrome === 'ghost'}
          onChange={() => setChrome('ghost')}
        />
      </RadioGroup>
      <RadioGroup label="Payment" className="gap-1">
        <Radio
          name="docs-radio-pay"
          label="Card"
          checked={pay === 'card'}
          onChange={() => setPay('card')}
        />
        <Radio
          name="docs-radio-pay"
          label="Bank transfer"
          checked={pay === 'bank'}
          onChange={() => setPay('bank')}
        />
        <Radio
          name="docs-radio-pay"
          label="Invoice"
          checked={pay === 'invoice'}
          onChange={() => setPay('invoice')}
        />
      </RadioGroup>
      <RadioGroup label="Project" className="gap-1">
        <Radio
          name="docs-radio-severity"
          label="Keep the project"
          checked={severity === 'keep'}
          onChange={() => setSeverity('keep')}
        />
        <Radio
          tone="danger"
          name="docs-radio-severity"
          label="Delete the project"
          checked={severity === 'delete'}
          onChange={() => setSeverity('delete')}
        />
      </RadioGroup>
    </div>
  )
}

const RADIO_VARIANT_LABEL: Record<RadioVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
}

const RADIO_TONE_LABEL: Record<RadioTone, string> = {
  brand: 'Brand',
  danger: 'Danger',
}

const RADIO_SIZE_LABEL: Record<RadioSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

function RadioStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid>
          {RADIO_VARIANTS.map((variant) => (
            <StateCard key={variant} label={RADIO_VARIANT_LABEL[variant]}>
              <Radio variant={variant} label={RADIO_VARIANT_LABEL[variant]} checked />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {RADIO_TONES.map((tone) => (
            <StateCard key={tone} label={RADIO_TONE_LABEL[tone]}>
              <Radio
                tone={tone}
                label={tone === 'danger' ? 'Delete the project' : 'Keep the project'}
                checked
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={3}>
          {RADIO_SIZES.map((size) => (
            <StateCard key={size} label={RADIO_SIZE_LABEL[size]}>
              <Radio size={size} label={RADIO_SIZE_LABEL[size]} checked />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid>
          <StateCard label="Unchecked">
            <Radio label="Off" />
          </StateCard>
          <StateCard label="Checked">
            <Radio label="On" checked />
          </StateCard>
          <StateCard label="Hover" inert>
            <Radio label="Hover" preview="hover" />
          </StateCard>
          <StateCard label="Hover, on" inert>
            <Radio label="Hover" checked preview="hover" />
          </StateCard>
          <StateCard label="Focus" inert>
            <Radio label="Focus" preview="focus" />
          </StateCard>
          <StateCard label="Active" inert>
            <Radio label="Active" preview="active" />
          </StateCard>
          <StateCard label="Invalid">
            <Radio label="Required" invalid />
          </StateCard>
          <StateCard label="Invalid, on">
            <Radio label="Required" invalid checked />
          </StateCard>
          <StateCard label="Disabled">
            <Radio label="Locked" disabled />
          </StateCard>
          <StateCard label="Disabled, on">
            <Radio label="Locked" checked disabled />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function StateSlider({
  initial = 48,
  ...props
}: {
  initial?: number
  variant?: SliderVariant
  size?: SliderSize
  label?: string
  disabled?: boolean
  invalid?: boolean
  valid?: boolean
  preview?: 'hover' | 'focus' | 'active'
  tone?: 'default' | 'onDark'
  showValue?: boolean
  showEnds?: boolean
  marks?: boolean | number[]
  min?: number
  max?: number
  step?: number
  field?: boolean | SliderField
  unit?: 'none' | 'percent' | 'currency' | 'degree' | 'px'
  prefix?: string
  suffix?: string
  fieldVariant?: NumberFieldVariant
  fieldSize?: NumberFieldSize
  fieldStepper?: NumberFieldStepper
  fieldAlign?: NumberFieldAlign
  fieldWidth?: NumberFieldWidth
  fieldCompact?: boolean
  fieldReadOnly?: boolean
  fieldPlaceholder?: string
}) {
  const [value, setValue] = useState(initial)
  return <Slider {...props} value={value} onValueChange={setValue} />
}

function StateRange({
  initial = [24, 72] as [number, number],
  ...props
}: {
  initial?: [number, number]
  variant?: SliderVariant
  size?: SliderSize
  label?: string
  disabled?: boolean
  invalid?: boolean
  showValue?: boolean
  showEnds?: boolean
  formatValue?: (value: number) => string
  field?: boolean | SliderField
  unit?: 'none' | 'percent' | 'currency' | 'degree' | 'px'
}) {
  const [value, setValue] = useState<[number, number]>(initial)
  return <RangeSlider {...props} value={value} onValueChange={setValue} />
}

function SliderDemo() {
  const [value, setValue] = useState(48)
  const [range, setRange] = useState<[number, number]>([24, 72])

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-6">
      {SLIDER_VARIANTS.map((variant) => (
        <Slider
          key={variant}
          variant={variant}
          label={SLIDER_VARIANT_LABEL[variant]}
          value={value}
          onValueChange={setValue}
          field="end"
          unit="percent"
        />
      ))}
      <Slider
        label="Opacity"
        field="start"
        unit="percent"
        value={value}
        onValueChange={setValue}
      />
      <Slider
        label="Quantity"
        field="end"
        fieldStepper="split"
        fieldAlign="center"
        value={value}
        onValueChange={setValue}
      />
      <RangeSlider
        label="Price"
        field="both"
        unit="currency"
        value={range}
        onValueChange={setRange}
        showEnds
      />
    </div>
  )
}

function SliderStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid>
          {SLIDER_VARIANTS.map((variant) => (
            <StateCard key={variant} label={SLIDER_VARIANT_LABEL[variant]} align="stretch">
              <StateSlider variant={variant} label={SLIDER_VARIANT_LABEL[variant]} showValue />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={3}>
          {SLIDER_SIZES.map((size) => (
            <StateCard key={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'} align="stretch">
              <StateSlider size={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Range">
        <StateGrid>
          {SLIDER_VARIANTS.map((variant) => (
            <StateCard key={variant} label={SLIDER_VARIANT_LABEL[variant]} align="stretch">
              <StateRange variant={variant} label={SLIDER_VARIANT_LABEL[variant]} showValue />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="With field">
        <StateGrid>
          {SLIDER_VARIANTS.map((variant) => (
            <StateCard key={variant} label={SLIDER_VARIANT_LABEL[variant]} align="stretch">
              <StateSlider variant={variant} label={SLIDER_VARIANT_LABEL[variant]} field="end" unit="percent" />
            </StateCard>
          ))}
          {SLIDER_FIELDS.map((layout) => (
            <StateCard key={layout} label={SLIDER_FIELD_LABEL[layout]} align="stretch">
              {layout === 'both' ? (
                <StateRange label="Price" field={layout} unit="currency" />
              ) : (
                <StateSlider label="Opacity" field={layout} unit="percent" />
              )}
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Field chrome">
        <StateGrid>
          {NUMBER_FIELD_VARIANTS.map((fieldVariant) => (
            <StateCard key={fieldVariant} label={NUMBER_FIELD_VARIANT_LABEL[fieldVariant]} align="stretch">
              <StateSlider
                label={NUMBER_FIELD_VARIANT_LABEL[fieldVariant]}
                field="end"
                unit="percent"
                fieldVariant={fieldVariant}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Field stepper">
        <StateGrid columns={2}>
          {NUMBER_FIELD_STEPPERS.map((fieldStepper) => (
            <StateCard key={fieldStepper} label={fieldStepper === 'stack' ? 'Stack' : 'Split'} align="stretch">
              <StateSlider
                label={fieldStepper === 'stack' ? 'Opacity' : 'Quantity'}
                field="end"
                unit={fieldStepper === 'stack' ? 'percent' : 'none'}
                fieldStepper={fieldStepper}
                fieldAlign={fieldStepper === 'split' ? 'center' : undefined}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Field width">
        <StateGrid columns={2}>
          {NUMBER_FIELD_WIDTHS.map((fieldWidth) => (
            <StateCard key={fieldWidth} label={NUMBER_FIELD_WIDTH_LABEL[fieldWidth]} align="stretch">
              <StateSlider
                label={NUMBER_FIELD_WIDTH_LABEL[fieldWidth]}
                field="end"
                unit="percent"
                fieldWidth={fieldWidth}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Field align">
        <StateGrid columns={3}>
          {NUMBER_FIELD_ALIGNS.map((fieldAlign) => (
            <StateCard key={fieldAlign} label={NUMBER_FIELD_ALIGN_LABEL[fieldAlign]} align="stretch">
              <StateSlider
                label={NUMBER_FIELD_ALIGN_LABEL[fieldAlign]}
                field="end"
                unit="percent"
                fieldAlign={fieldAlign}
                fieldWidth="fill"
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Field size">
        <StateGrid columns={3}>
          {NUMBER_FIELD_SIZES.map((fieldSize) => (
            <StateCard key={fieldSize} label={fieldSize === 'sm' ? 'Small' : fieldSize === 'md' ? 'Medium' : 'Large'} align="stretch">
              <StateSlider
                label={fieldSize === 'sm' ? 'Small' : fieldSize === 'md' ? 'Medium' : 'Large'}
                field="end"
                unit="percent"
                fieldSize={fieldSize}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          <StateCard label="Default" align="stretch">
            <StateSlider label="Volume" showValue />
          </StateCard>
          <StateCard label="On dark" align="stretch" className="bg-black">
            <StateSlider tone="onDark" label="Zoom" showValue initial={65} min={1} max={100} />
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid>
          <StateCard label="Rest" align="stretch">
            <StateSlider label="Volume" showValue />
          </StateCard>
          <StateCard label="Hover" inert align="stretch">
            <StateSlider label="Volume" showValue preview="hover" />
          </StateCard>
          <StateCard label="Focus" inert align="stretch">
            <StateSlider label="Volume" showValue preview="focus" />
          </StateCard>
          <StateCard label="Active" inert align="stretch">
            <StateSlider label="Volume" showValue preview="active" />
          </StateCard>
          <StateCard label="With ends" align="stretch">
            <StateSlider label="Volume" showValue showEnds />
          </StateCard>
          <StateCard label="Marks" align="stretch">
            <StateSlider label="Quality" marks={[0, 25, 50, 75, 100]} showEnds initial={50} />
          </StateCard>
          <StateCard label="Invalid" align="stretch">
            <StateSlider label="Required" invalid showValue initial={0} />
          </StateCard>
          <StateCard label="Valid" align="stretch">
            <StateSlider label="Complete" valid showValue initial={100} />
          </StateCard>
          <StateCard label="Disabled" align="stretch">
            <StateSlider label="Locked" disabled showValue />
          </StateCard>
          <StateCard label="Field, invalid" align="stretch">
            <StateSlider label="Required" field="end" unit="percent" invalid />
          </StateCard>
          <StateCard label="Field, disabled" align="stretch">
            <StateSlider label="Locked" field="end" unit="percent" disabled />
          </StateCard>
          <StateCard label="Field, read only" align="stretch">
            <StateSlider label="Locked field" field="end" unit="percent" fieldReadOnly />
          </StateCard>
          <StateCard label="Range, disabled" align="stretch">
            <StateRange label="Locked" disabled showValue />
          </StateCard>
          <StateCard label="Range, invalid" align="stretch">
            <StateRange label="Required" invalid showValue />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function StateNumber({
  initial = 48,
  ...props
}: {
  initial?: number | null
  variant?: NumberFieldVariant
  size?: NumberFieldSize
  unit?: NumberFieldUnit
  stepper?: NumberFieldStepper
  width?: NumberFieldWidth
  disabled?: boolean
  invalid?: boolean
  valid?: boolean
  readOnly?: boolean
  preview?: 'hover' | 'focus'
  min?: number
  max?: number
  step?: number
  compact?: boolean
  placeholder?: string
  prefix?: string
  suffix?: string
  'aria-label'?: string
}) {
  const [value, setValue] = useState<number | null>(initial)
  return <NumberField {...props} value={value} onValueChange={setValue} />
}

function NumberFieldDemo() {
  const [value, setValue] = useState<number | null>(48)
  const [qty, setQty] = useState<number | null>(2)
  const [price, setPrice] = useState<number | null>(24)

  return (
    <div className="flex w-full max-w-[360px] flex-col gap-4">
      {NUMBER_FIELD_VARIANTS.map((variant) => (
        <NumberField
          key={variant}
          variant={variant}
          unit="percent"
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
          aria-label={`${NUMBER_FIELD_VARIANT_LABEL[variant]} percent`}
        />
      ))}
      <NumberField
        unit="currency"
        value={price}
        onValueChange={setPrice}
        min={0}
        step={0.5}
        aria-label="Price"
      />
      <NumberField
        stepper="split"
        value={qty}
        onValueChange={setQty}
        min={1}
        max={99}
        aria-label="Quantity"
      />
      <NumberField
        width="fill"
        unit="percent"
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        aria-label="Fill width"
      />
    </div>
  )
}

function NumberFieldStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid>
          {NUMBER_FIELD_VARIANTS.map((variant) => (
            <StateCard key={variant} label={NUMBER_FIELD_VARIANT_LABEL[variant]} align="stretch">
              <StateNumber variant={variant} unit="percent" aria-label={NUMBER_FIELD_VARIANT_LABEL[variant]} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={3}>
          {NUMBER_FIELD_SIZES.map((size) => (
            <StateCard key={size} label={size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'} align="stretch">
              <StateNumber size={size} unit="percent" aria-label={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Unit">
        <StateGrid>
          {NUMBER_FIELD_UNITS.map((unit) => (
            <StateCard key={unit} label={NUMBER_FIELD_UNIT_LABEL[unit]} align="stretch">
              <StateNumber
                unit={unit}
                initial={unit === 'currency' ? 24 : unit === 'px' ? 16 : 48}
                step={unit === 'currency' ? 0.5 : 1}
                aria-label={NUMBER_FIELD_UNIT_LABEL[unit]}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Width">
        <StateGrid columns={2}>
          {NUMBER_FIELD_WIDTHS.map((width) => (
            <StateCard key={width} label={NUMBER_FIELD_WIDTH_LABEL[width]} align="stretch">
              <StateNumber width={width} unit="percent" aria-label={NUMBER_FIELD_WIDTH_LABEL[width]} />
            </StateCard>
          ))}
          {NUMBER_FIELD_VARIANTS.map((variant) => (
            <StateCard key={`clip-${variant}`} label={`${NUMBER_FIELD_VARIANT_LABEL[variant]}, clipped`} align="stretch">
              <StateNumber
                variant={variant}
                initial={123456789012}
                aria-label={`${NUMBER_FIELD_VARIANT_LABEL[variant]} overflow`}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Stepper">
        <StateGrid columns={2}>
          {NUMBER_FIELD_STEPPERS.map((stepper) => (
            <StateCard key={stepper} label={stepper === 'stack' ? 'Stack' : 'Split'} align="stretch">
              <StateNumber
                stepper={stepper}
                initial={stepper === 'split' ? 2 : 48}
                min={stepper === 'split' ? 1 : 0}
                max={stepper === 'split' ? 99 : 100}
                unit={stepper === 'stack' ? 'percent' : 'none'}
                aria-label={stepper === 'stack' ? 'Opacity' : 'Quantity'}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid>
          <StateCard label="Empty" align="stretch">
            <StateNumber initial={null} placeholder="0" aria-label="Empty" />
          </StateCard>
          <StateCard label="Filled" align="stretch">
            <StateNumber unit="percent" aria-label="Filled" />
          </StateCard>
          <StateCard label="Hover" inert align="stretch">
            <StateNumber unit="percent" preview="hover" aria-label="Hover" />
          </StateCard>
          <StateCard label="Focus" inert align="stretch">
            <StateNumber unit="percent" preview="focus" aria-label="Focus" />
          </StateCard>
          <StateCard label="Invalid" align="stretch">
            <StateNumber unit="percent" invalid initial={140} aria-label="Invalid" />
          </StateCard>
          <StateCard label="Valid" align="stretch">
            <StateNumber unit="percent" valid aria-label="Valid" />
          </StateCard>
          <StateCard label="Disabled" align="stretch">
            <StateNumber unit="percent" disabled aria-label="Disabled" />
          </StateCard>
          <StateCard label="Read only" align="stretch">
            <StateNumber unit="percent" readOnly aria-label="Read only" />
          </StateCard>
          <StateCard label="At minimum" align="stretch">
            <StateNumber unit="percent" min={0} max={100} initial={0} aria-label="Minimum" />
          </StateCard>
          <StateCard label="At maximum" align="stretch">
            <StateNumber unit="percent" min={0} max={100} initial={100} aria-label="Maximum" />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function DateDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-4">
      {DATE_PICKER_VARIANTS.map((variant) => (
        <DatePlay
          key={variant}
          variant={variant}
          placeholder={`${DATE_VARIANT_LABEL[variant]} date`}
        />
      ))}
    </div>
  )
}

const DATE_VARIANT_LABEL: Record<DatePickerVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
  underline: 'Underline',
  pill: 'Pill',
}

const DATE_SIZE_LABEL: Record<DatePickerSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

function DatePlay({
  value: initial = '2026-08-29',
  ...rest
}: {
  value?: string | null
  variant?: DatePickerVariant
  size?: DatePickerSize
  invalid?: boolean
  valid?: boolean
  disabled?: boolean
  compact?: boolean
  placeholder?: string
  preview?: DatePickerPreview
}) {
  const [value, setValue] = useState<string | null>(initial)
  return <DatePicker value={value} onChange={setValue} {...rest} />
}

function RangePlay({
  value: initial = { start: '2026-08-12', end: '2026-08-20' },
  ...rest
}: {
  value?: DateRange
  variant?: DatePickerVariant
  size?: DatePickerSize
  invalid?: boolean
  valid?: boolean
  disabled?: boolean
  placeholder?: string
}) {
  const [range, setRange] = useState<DateRange>(initial)
  return <DatePicker mode="range" rangeValue={range} onRangeChange={setRange} {...rest} />
}

function DatePickerStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid>
          {DATE_PICKER_VARIANTS.map((variant) => (
            <StateCard key={variant} label={DATE_VARIANT_LABEL[variant]} align="stretch">
              <DatePlay variant={variant} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={3}>
          {DATE_PICKER_SIZES.map((size) => (
            <StateCard key={size} label={DATE_SIZE_LABEL[size]} align="stretch">
              <DatePlay size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Mode">
        <StateGrid columns={2}>
          <StateCard label="Single" align="stretch">
            <DatePlay />
          </StateCard>
          <StateCard label="Range" align="stretch">
            <RangePlay />
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid>
          <StateCard label="Empty" align="stretch">
            <DatePlay value={null} placeholder="Select a date" />
          </StateCard>
          <StateCard label="Filled" align="stretch">
            <DatePlay />
          </StateCard>
          <StateCard label="Hover" align="stretch" inert>
            <DatePlay preview="hover" />
          </StateCard>
          <StateCard label="Open" align="stretch" inert>
            <DatePlay preview="open" />
          </StateCard>
          <StateCard label="Invalid" align="stretch">
            <DatePlay invalid />
          </StateCard>
          <StateCard label="Valid" align="stretch">
            <DatePlay valid />
          </StateCard>
          <StateCard label="Disabled" align="stretch">
            <DatePlay disabled />
          </StateCard>
          <StateCard label="Disabled, empty" align="stretch">
            <DatePlay value={null} placeholder="Select a date" disabled />
          </StateCard>
          <StateCard label="Compact" align="stretch">
            <DatePlay compact />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function OtpDemo() {
  const [value, setValue] = useState(['', '', '', '', '', ''])
  return (
    <div className="w-full max-w-[420px]">
      <OtpBoxes value={value} onChange={setValue} />
    </div>
  )
}

const OTP_EMPTY = ['', '', '', '', '', '']
const OTP_PARTIAL = ['4', '8', '2', '', '', '']
const OTP_FULL = ['4', '8', '2', '9', '1', '0']
const OTP_NOOP = () => undefined

const OTP_VARIANT_LABEL: Record<OtpBoxesVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
  underline: 'Underline',
  pill: 'Pill',
}

const OTP_SIZE_LABEL: Record<OtpBoxesSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

function OtpStateCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <StateCard label={label} align="stretch" size="lg" wide>
      {children}
    </StateCard>
  )
}

function OtpStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateStack gap={4}>
          {OTP_BOXES_VARIANTS.map((variant) => (
            <OtpStateCard key={variant} label={OTP_VARIANT_LABEL[variant]}>
              <OtpBoxes variant={variant} value={OTP_PARTIAL} onChange={OTP_NOOP} />
            </OtpStateCard>
          ))}
        </StateStack>
      </StateGroup>

      <StateGroup title="Size">
        <StateStack gap={4}>
          {OTP_BOXES_SIZES.map((size) => (
            <OtpStateCard key={size} label={OTP_SIZE_LABEL[size]}>
              <OtpBoxes size={size} value={OTP_PARTIAL} onChange={OTP_NOOP} />
            </OtpStateCard>
          ))}
        </StateStack>
      </StateGroup>

      <StateGroup title="Length">
        <StateStack gap={4}>
          <OtpStateCard label="Four">
            <OtpBoxes length={4} value={['1', '9', '', '']} onChange={OTP_NOOP} />
          </OtpStateCard>
          <OtpStateCard label="Six">
            <OtpBoxes value={OTP_PARTIAL} onChange={OTP_NOOP} />
          </OtpStateCard>
          <OtpStateCard label="Eight, split">
            <OtpBoxes
              length={8}
              split={4}
              value={['1', '4', '2', '8', '', '', '', '']}
              onChange={OTP_NOOP}
            />
          </OtpStateCard>
        </StateStack>
      </StateGroup>

      <StateGroup title="State">
        <StateStack gap={4}>
          <OtpStateCard label="Empty">
            <OtpBoxes value={OTP_EMPTY} onChange={OTP_NOOP} />
          </OtpStateCard>
          <OtpStateCard label="Partial">
            <OtpBoxes value={OTP_PARTIAL} onChange={OTP_NOOP} />
          </OtpStateCard>
          <OtpStateCard label="Filled">
            <OtpBoxes value={OTP_FULL} onChange={OTP_NOOP} />
          </OtpStateCard>
          <OtpStateCard label="Hover">
            <OtpBoxes value={OTP_PARTIAL} onChange={OTP_NOOP} preview="hover" />
          </OtpStateCard>
          <OtpStateCard label="Focus">
            <OtpBoxes value={OTP_PARTIAL} onChange={OTP_NOOP} preview="focus" />
          </OtpStateCard>
          <OtpStateCard label="Valid">
            <OtpBoxes value={OTP_FULL} onChange={OTP_NOOP} valid />
          </OtpStateCard>
          <OtpStateCard label="Invalid">
            <OtpBoxes value={OTP_FULL} onChange={OTP_NOOP} invalid />
          </OtpStateCard>
          <OtpStateCard label="Shaking">
            <OtpBoxes value={OTP_EMPTY} onChange={OTP_NOOP} invalid shaking />
          </OtpStateCard>
          <OtpStateCard label="Masked">
            <OtpBoxes value={OTP_FULL} onChange={OTP_NOOP} masked />
          </OtpStateCard>
          <OtpStateCard label="Disabled">
            <OtpBoxes value={OTP_EMPTY} onChange={OTP_NOOP} disabled />
          </OtpStateCard>
          <OtpStateCard label="Disabled, filled">
            <OtpBoxes value={OTP_FULL} onChange={OTP_NOOP} disabled />
          </OtpStateCard>
        </StateStack>
      </StateGroup>
    </StateStack>
  )
}

const SAMPLE_TOTP_CONTENT = { kind: 'totp' as const, secret: 'JBSWY3DPEHPK3PXP' }
const SAMPLE_URL_CONTENT = { kind: 'url' as const, href: 'https://roboticela.com' }
const SAMPLE_WIFI_CONTENT = {
  kind: 'wifi' as const,
  ssid: 'Roboticela-Guest',
  password: 'welcome-home',
}
const SAMPLE_TEXT_CONTENT = { kind: 'text' as const, text: 'Scan to connect with Roboticela.' }

function QrDemo() {
  return (
    <div className="flex w-full justify-center">
      <QrCode content={SAMPLE_TOTP_CONTENT} alt="Authenticator QR code" variant="branded" />
    </div>
  )
}

const QR_VARIANT_LABEL: Record<QrCodeVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
  embedded: 'Embedded',
  branded: 'Branded',
}

const QR_SIZE_LABEL: Record<QrCodeSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

function QrStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateStack gap={4}>
          {QR_CODE_VARIANTS.map((variant) => (
            <OtpStateCard key={variant} label={QR_VARIANT_LABEL[variant]}>
              <QrCode content={SAMPLE_TOTP_CONTENT} variant={variant} className="mt-0" />
            </OtpStateCard>
          ))}
        </StateStack>
      </StateGroup>

      <StateGroup title="Size">
        <StateStack gap={4}>
          {QR_CODE_SIZES.map((size) => (
            <OtpStateCard key={size} label={QR_SIZE_LABEL[size]}>
              <QrCode content={SAMPLE_TOTP_CONTENT} size={size} className="mt-0" />
            </OtpStateCard>
          ))}
        </StateStack>
      </StateGroup>

      <StateGroup title="Content">
        <StateStack gap={4}>
          <OtpStateCard label="TOTP — authenticator setup">
            <QrCode content={SAMPLE_TOTP_CONTENT} alt="Authenticator QR code" className="mt-0" />
          </OtpStateCard>
          <OtpStateCard label="URL — link or download">
            <QrCode content={SAMPLE_URL_CONTENT} alt="Visit Roboticela" className="mt-0" />
          </OtpStateCard>
          <OtpStateCard label="Wi‑Fi — network join">
            <QrCode content={SAMPLE_WIFI_CONTENT} alt="Join guest Wi‑Fi" className="mt-0" />
          </OtpStateCard>
          <OtpStateCard label="Text — plain message">
            <QrCode content={SAMPLE_TEXT_CONTENT} alt="Roboticela message" className="mt-0" />
          </OtpStateCard>
        </StateStack>
      </StateGroup>

      <StateGroup title="Logo">
        <StateStack gap={4}>
          <OtpStateCard label="Brand logo — default">
            <QrCode content={SAMPLE_URL_CONTENT} className="mt-0" />
          </OtpStateCard>
          <OtpStateCard label="No logo">
            <QrCode content={SAMPLE_URL_CONTENT} logo={false} className="mt-0" />
          </OtpStateCard>
        </StateStack>
      </StateGroup>

      <StateGroup title="State">
        <StateStack gap={4}>
          <OtpStateCard label="Default">
            <QrCode content={SAMPLE_TOTP_CONTENT} className="mt-0" />
          </OtpStateCard>
          <OtpStateCard label="Loading">
            <QrCode content={SAMPLE_TOTP_CONTENT} loading className="mt-0" />
          </OtpStateCard>
          <OtpStateCard label="Error">
            <QrCode content={SAMPLE_TOTP_CONTENT} error className="mt-0" />
          </OtpStateCard>
          <OtpStateCard label="Expired">
            <QrCode content={SAMPLE_TOTP_CONTENT} expired className="mt-0" />
          </OtpStateCard>
          <OtpStateCard label="Disabled">
            <QrCode content={SAMPLE_TOTP_CONTENT} disabled className="mt-0" />
          </OtpStateCard>
        </StateStack>
      </StateGroup>
    </StateStack>
  )
}

const FIELD_LABEL_SIZE_LABEL: Record<FieldLabelSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

const FIELD_LABEL_TONE_LABEL: Record<FieldLabelTone, string> = {
  default: 'Default',
  danger: 'Danger',
  success: 'Success',
  warning: 'Warning',
  disabled: 'Disabled',
}

const FIELD_HINT_TONE_LABEL: Record<FieldHintTone, string> = {
  default: 'Default',
  ok: 'Success',
  error: 'Error',
  warning: 'Warning',
  success: 'Success',
  danger: 'Error',
}

const FORM_FIELD_LAYOUT_LABEL: Record<FormFieldLayout, string> = {
  stacked: 'Stacked',
  inline: 'Inline',
}

function FieldLabelDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-6">
      <FormField htmlFor="demo-name" label="Display name" hint="Shown on your public profile.">
        <TextField
          id="demo-name"
          icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
          placeholder="Alex Rivera"
        />
      </FormField>
      <FormField htmlFor="demo-user" label="Username" optional>
        <TextField id="demo-user" icon={<DkAtSign {...FIELD_GLYPH} />} placeholder="alex" />
      </FormField>
      <FormField htmlFor="demo-email" label="Email" required hint="Use a work address.">
        <TextField
          id="demo-email"
          icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
          placeholder="alex@roboticela.com"
        />
      </FormField>
    </div>
  )
}

function FieldLabelStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Size">
        <StateGrid columns={1}>
          {FIELD_LABEL_SIZES.map((size) => (
            <FieldState key={size} label={FIELD_LABEL_SIZE_LABEL[size]}>
              <FormField
                htmlFor={`docs-label-size-${size}`}
                label="Display name"
                size={size}
                hint="Shown on your public profile."
              >
                <TextField
                  id={`docs-label-size-${size}`}
                  size={size}
                  icon={
                    <DkPersonUserProfile
                      size={size === 'sm' ? 16 : 18}
                      strokeWidth={1.6}
                      absoluteStrokeWidth
                    />
                  }
                  placeholder="Alex Rivera"
                />
              </FormField>
            </FieldState>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Necessity">
        <StateGrid columns={1}>
          <FieldState label="Default">
            <FormField htmlFor="docs-label-default" label="Display name">
              <TextField
                id="docs-label-default"
                icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
                placeholder="Alex Rivera"
              />
            </FormField>
          </FieldState>
          <FieldState label="Optional">
            <FormField htmlFor="docs-label-optional" label="Username" optional>
              <TextField id="docs-label-optional" icon={<DkAtSign {...FIELD_GLYPH} />} placeholder="alex" />
            </FormField>
          </FieldState>
          <FieldState label="Required">
            <FormField htmlFor="docs-label-required" label="Email" required>
              <TextField
                id="docs-label-required"
                icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
                placeholder="alex@roboticela.com"
              />
            </FormField>
          </FieldState>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={1}>
          {FIELD_LABEL_TONES.map((tone) => (
            <FieldState key={tone} label={FIELD_LABEL_TONE_LABEL[tone]}>
              <FormField
                htmlFor={`docs-label-tone-${tone}`}
                label="Display name"
                tone={tone}
                disabled={tone === 'disabled'}
              >
                <TextField
                  id={`docs-label-tone-${tone}`}
                  icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
                  placeholder="Alex Rivera"
                  defaultValue="Alex Rivera"
                  disabled={tone === 'disabled'}
                  invalid={tone === 'danger'}
                  valid={tone === 'success'}
                />
              </FormField>
            </FieldState>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Hint">
        <StateGrid columns={1}>
          {FIELD_HINT_TONES.map((tone) => (
            <FieldState key={tone} label={FIELD_HINT_TONE_LABEL[tone]}>
              <FormField
                htmlFor={`docs-hint-${tone}`}
                label="Username"
                hint={
                  tone === 'ok'
                    ? 'Available'
                    : tone === 'error'
                      ? 'Already taken'
                      : tone === 'warning'
                        ? 'This name is in use on another team'
                        : 'Shown on your public profile.'
                }
                hintTone={tone}
                invalid={tone === 'error'}
                valid={tone === 'ok'}
              >
                <TextField
                  id={`docs-hint-${tone}`}
                  icon={<DkAtSign {...FIELD_GLYPH} />}
                  placeholder="alex"
                  defaultValue="alex"
                  invalid={tone === 'error'}
                  valid={tone === 'ok'}
                />
              </FormField>
            </FieldState>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={1}>
          {FORM_FIELD_LAYOUTS.map((layout) => (
            <FieldState key={layout} label={FORM_FIELD_LAYOUT_LABEL[layout]}>
              <FormField
                htmlFor={`docs-label-layout-${layout}`}
                label="Display name"
                hint="Shown on your public profile."
                layout={layout}
              >
                <TextField
                  id={`docs-label-layout-${layout}`}
                  icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
                  placeholder="Alex Rivera"
                />
              </FormField>
            </FieldState>
          ))}
          <FieldState label="Row">
            <FieldRow>
              <FormField htmlFor="docs-label-row-city" label="City" optional>
                <TextField
                  id="docs-label-row-city"
                  icon={<DkFoldedMapTerritoryMapPinLocation {...FIELD_GLYPH} />}
                  placeholder="Karachi"
                />
              </FormField>
              <FormField htmlFor="docs-label-row-postal" label="Postal" required hint="Required" hintTone="error">
                <TextField
                  id="docs-label-row-postal"
                  icon={<DkFoldedMapTerritoryMapPinLocation {...FIELD_GLYPH} />}
                  placeholder="00000"
                  invalid
                />
              </FormField>
            </FieldRow>
          </FieldState>
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={1}>
          <FieldState label="Empty">
            <FormField htmlFor="docs-label-empty" label="Display name" hint="Shown on your public profile.">
              <TextField
                id="docs-label-empty"
                icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
                placeholder="Alex Rivera"
              />
            </FormField>
          </FieldState>
          <FieldState label="Filled">
            <FormField htmlFor="docs-label-filled" label="Display name">
              <TextField
                id="docs-label-filled"
                icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
                placeholder="Alex Rivera"
                defaultValue="Alex Rivera"
              />
            </FormField>
          </FieldState>
          <FieldState label="Invalid">
            <FormField
              htmlFor="docs-label-invalid"
              label="Email"
              required
              invalid
              hint="Enter a valid email."
              hintTone="error"
            >
              <TextField
                id="docs-label-invalid"
                icon={<DkEnvelopeMessageMail {...FIELD_GLYPH} />}
                placeholder="alex@roboticela.com"
                defaultValue="alex"
                invalid
              />
            </FormField>
          </FieldState>
          <FieldState label="Valid">
            <FormField
              htmlFor="docs-label-valid"
              label="Username"
              valid
              hint="Available"
              hintTone="ok"
            >
              <TextField
                id="docs-label-valid"
                icon={<DkAtSign {...FIELD_GLYPH} />}
                placeholder="alex"
                defaultValue="alex"
                valid
              />
            </FormField>
          </FieldState>
          <FieldState label="Warning">
            <FormField
              htmlFor="docs-label-warning"
              label="Username"
              tone="warning"
              hint="This name is in use on another team"
              hintTone="warning"
            >
              <TextField
                id="docs-label-warning"
                icon={<DkAtSign {...FIELD_GLYPH} />}
                placeholder="alex"
                defaultValue="alex"
              />
            </FormField>
          </FieldState>
          <FieldState label="Disabled">
            <FormField htmlFor="docs-label-disabled" label="Display name" disabled hint="Managed by your team.">
              <TextField
                id="docs-label-disabled"
                icon={<DkPersonUserProfile {...FIELD_GLYPH} />}
                placeholder="Alex Rivera"
                defaultValue="Alex Rivera"
                disabled
              />
            </FormField>
          </FieldState>
          <FieldState label="Label only">
            <FieldLabel htmlFor="docs-label-only">Display name</FieldLabel>
          </FieldState>
          <FieldState label="Hidden label">
            <FormField>
              <FieldLabel htmlFor="docs-label-hidden" visuallyHidden>
                Search
              </FieldLabel>
              <TextField
                id="docs-label-hidden"
                variant="pill"
                icon={<DkMagnifyingGlassFind {...FIELD_GLYPH} />}
                placeholder="Search"
              />
            </FormField>
          </FieldState>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function RecoveryDemo() {
  const [value, setValue] = useState('XJ4K-9M2P')
  return (
    <div className="w-full max-w-[400px]">
      <RecoveryInput value={value} onChange={setValue} />
    </div>
  )
}

const RECOVERY_SAMPLE = 'XK4M-92QP'
const RECOVERY_PARTIAL = 'XK4M'
const RECOVERY_KEY = 'H7QK-9M2P-L4TN-3W8D'
const RECOVERY_APPLE = 'H7QK-9M2P-L4TN-3W8D-P0AV-61CK-H9QE'
const RECOVERY_NOOP = () => undefined

const RECOVERY_VARIANT_LABEL: Record<RecoveryInputVariant, string> = {
  outline: 'Outline',
  subtle: 'Subtle',
  ghost: 'Ghost',
  underline: 'Underline',
  pill: 'Pill',
}

const RECOVERY_SIZE_LABEL: Record<RecoveryInputSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

const RECOVERY_MODE_LABEL: Record<RecoveryInputMode, string> = {
  field: 'Field',
  groups: 'Groups',
}

function RecoveryStateCard({
  label,
  inert = false,
  children,
}: {
  label: string
  inert?: boolean
  children: ReactNode
}) {
  return (
    <StateCard label={label} align="stretch" size="lg" wide inert={inert}>
      {children}
    </StateCard>
  )
}

function RecoveryStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid>
          {RECOVERY_INPUT_VARIANTS.map((variant) => (
            <RecoveryStateCard key={variant} label={RECOVERY_VARIANT_LABEL[variant]}>
              <RecoveryInput
                variant={variant}
                value={RECOVERY_SAMPLE}
                onChange={RECOVERY_NOOP}
                label={RECOVERY_VARIANT_LABEL[variant]}
              />
            </RecoveryStateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={3}>
          {RECOVERY_INPUT_SIZES.map((size) => (
            <RecoveryStateCard key={size} label={RECOVERY_SIZE_LABEL[size]}>
              <RecoveryInput
                size={size}
                value={RECOVERY_SAMPLE}
                onChange={RECOVERY_NOOP}
                label={RECOVERY_SIZE_LABEL[size]}
              />
            </RecoveryStateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Mode">
        <StateGrid columns={2}>
          {RECOVERY_INPUT_MODES.map((mode) => (
            <RecoveryStateCard key={mode} label={RECOVERY_MODE_LABEL[mode]}>
              <RecoveryInput
                mode={mode}
                value={RECOVERY_SAMPLE}
                onChange={RECOVERY_NOOP}
                label={RECOVERY_MODE_LABEL[mode]}
              />
            </RecoveryStateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Length">
        <StateStack gap={4}>
          <RecoveryStateCard label="Eight, backup code">
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Sixteen, field">
            <RecoveryInput length={16} value={RECOVERY_KEY} onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Sixteen, groups">
            <RecoveryInput mode="groups" length={16} value={RECOVERY_KEY} onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Twenty-eight, recovery key">
            <RecoveryInput mode="groups" length={28} value={RECOVERY_APPLE} onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
        </StateStack>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid>
          <RecoveryStateCard label="Empty">
            <RecoveryInput value="" onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Partial">
            <RecoveryInput value={RECOVERY_PARTIAL} onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Filled">
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Hover" inert>
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} preview="hover" />
          </RecoveryStateCard>
          <RecoveryStateCard label="Focus" inert>
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} preview="focus" />
          </RecoveryStateCard>
          <RecoveryStateCard label="Valid">
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} valid hint="Code accepted" />
          </RecoveryStateCard>
          <RecoveryStateCard label="Invalid">
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} invalid hint="Incorrect code, try again" />
          </RecoveryStateCard>
          <RecoveryStateCard label="Shaking">
            <RecoveryInput value="" onChange={RECOVERY_NOOP} invalid shaking hint="Incorrect code, try again" />
          </RecoveryStateCard>
          <RecoveryStateCard label="Masked">
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} masked />
          </RecoveryStateCard>
          <RecoveryStateCard label="Read only">
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} readOnly />
          </RecoveryStateCard>
          <RecoveryStateCard label="Disabled">
            <RecoveryInput value="" onChange={RECOVERY_NOOP} disabled />
          </RecoveryStateCard>
          <RecoveryStateCard label="Disabled, filled">
            <RecoveryInput value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} disabled />
          </RecoveryStateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Groups, state">
        <StateGrid>
          <RecoveryStateCard label="Empty">
            <RecoveryInput mode="groups" value="" onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Partial">
            <RecoveryInput mode="groups" value={RECOVERY_PARTIAL} onChange={RECOVERY_NOOP} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Hover" inert>
            <RecoveryInput mode="groups" value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} preview="hover" />
          </RecoveryStateCard>
          <RecoveryStateCard label="Focus" inert>
            <RecoveryInput mode="groups" value={RECOVERY_PARTIAL} onChange={RECOVERY_NOOP} preview="focus" />
          </RecoveryStateCard>
          <RecoveryStateCard label="Valid">
            <RecoveryInput mode="groups" value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} valid />
          </RecoveryStateCard>
          <RecoveryStateCard label="Invalid">
            <RecoveryInput mode="groups" value={RECOVERY_SAMPLE} onChange={RECOVERY_NOOP} invalid />
          </RecoveryStateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Codes list">
        <StateGrid columns={2}>
          <RecoveryStateCard label="Subtle">
            <RecoveryCodesList codes={['XK4M-92QP', 'L7TN-3W8D', 'P0AV-61CK', 'H9QE-44BM']} />
          </RecoveryStateCard>
          <RecoveryStateCard label="Outline, copy and download">
            <RecoveryCodesList
              variant="outline"
              columns={3}
              copyable
              downloadable
              codes={[
                'XK4M-92QP',
                'L7TN-3W8D',
                'P0AV-61CK',
                'H9QE-44BM',
                'R3ST-55LM',
                'N8WK-77QJ',
                'T2VX-88PK',
                'M5BY-11ZN',
                'K7PL-22WX',
                'F4HM-33YN',
                'D9QK-44ZT',
                'B6JR-55UV',
              ]}
            />
          </RecoveryStateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

const BREADCRUMB_PATH = [
  { label: 'Projects', onClick: () => undefined },
  { label: 'Atlas', onClick: () => undefined },
  { label: 'Settings' },
]

function crumbGlyph(name: 'home' | 'folder' | 'open') {
  const Icon =
    name === 'home'
      ? DkResidentialHouseHome
      : name === 'open'
        ? DkFileFolderDirectoryOpened
        : DkFileFolderDirectory
  return <Icon strokeWidth={1.75} absoluteStrokeWidth />
}

function BreadcrumbDemo() {
  const labels = ['Projects', 'Atlas', 'Settings']
  const [here, setHere] = useState(2)
  const items = labels.slice(0, here + 1).map((label, index) => ({
    label,
    onClick: index < here ? () => setHere(index) : undefined,
  }))

  return (
    <div className="flex w-full flex-col gap-5">
      {BREADCRUMB_VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <Caption>{BREADCRUMB_VARIANT_LABEL[variant]}</Caption>
          <Breadcrumbs variant={variant} items={items} />
        </div>
      ))}
    </div>
  )
}

function BreadcrumbStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {BREADCRUMB_VARIANTS.map((variant) => (
            <StateCard key={variant} label={BREADCRUMB_VARIANT_LABEL[variant]} align="stretch" wide className="bg-bg-primary">
              <Breadcrumbs variant={variant} items={BREADCRUMB_PATH} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {BREADCRUMB_SIZES.map((size) => (
            <StateCard key={size} label={BREADCRUMB_SIZE_LABEL[size]} align="stretch" wide>
              <Breadcrumbs size={size} items={BREADCRUMB_PATH} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Separator">
        <StateGrid columns={2}>
          {BREADCRUMB_SEPARATORS.map((separator) => (
            <StateCard key={separator} label={BREADCRUMB_SEPARATOR_LABEL[separator]} align="stretch" wide>
              <Breadcrumbs separator={separator} items={BREADCRUMB_PATH} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          <StateCard label="Default" align="stretch" wide>
            <Breadcrumbs items={BREADCRUMB_PATH} />
          </StateCard>
          <StateCard label="Hover" align="stretch" wide inert>
            <Breadcrumbs items={BREADCRUMB_PATH} preview="hover" previewIndex={0} />
          </StateCard>
          <StateCard label="Focus" align="stretch" wide inert>
            <Breadcrumbs items={BREADCRUMB_PATH} preview="focus" previewIndex={0} />
          </StateCard>
          <StateCard label="Active" align="stretch" wide inert>
            <Breadcrumbs items={BREADCRUMB_PATH} preview="active" previewIndex={0} />
          </StateCard>
          <StateCard label="Current" align="stretch" wide>
            <Breadcrumbs items={[{ label: 'Settings' }]} />
          </StateCard>
          <StateCard label="Disabled" align="stretch" wide>
            <Breadcrumbs
              items={[
                { label: 'Projects', onClick: () => undefined },
                { label: 'Atlas', onClick: () => undefined, disabled: true },
                { label: 'Settings' },
              ]}
            />
          </StateCard>
          <StateCard label="Collapsed" align="stretch" wide>
            <Breadcrumbs
              maxItems={4}
              items={[
                { label: 'Home', onClick: () => undefined },
                { label: 'Library', onClick: () => undefined },
                { label: 'Projects', onClick: () => undefined },
                { label: 'Atlas', onClick: () => undefined },
                { label: 'Production', onClick: () => undefined },
                { label: 'Settings' },
              ]}
            />
          </StateCard>
          <StateCard label="Icons" align="stretch" wide>
            <Breadcrumbs
              items={[
                { label: 'Home', icon: crumbGlyph('home'), iconOnly: true, onClick: () => undefined },
                { label: 'Projects', icon: crumbGlyph('folder'), onClick: () => undefined },
                { label: 'Atlas', icon: crumbGlyph('open') },
              ]}
            />
          </StateCard>
          <StateCard label="Pill, hover" align="stretch" wide inert className="bg-bg-primary">
            <Breadcrumbs variant="pill" items={BREADCRUMB_PATH} preview="hover" previewIndex={0} />
          </StateCard>
          <StateCard label="Fill, current" align="stretch" wide className="bg-bg-primary">
            <Breadcrumbs variant="fill" items={BREADCRUMB_PATH} />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

const TAB_ITEMS = [
  { id: 'all', label: 'All' },
  { id: 'live', label: 'Live' },
  { id: 'review', label: 'In review' },
]

function SidebarWidth({ children }: { children: ReactNode }) {
  return <div className="w-full max-w-[260px]">{children}</div>
}

function TabsDemo() {
  const [value, setValue] = useState('all')
  return (
    <div className="flex w-full flex-col gap-8">
      {TABS_VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <Caption>{TABS_VARIANT_LABEL[variant]}</Caption>
          <Tabs
            variant={variant}
            value={value}
            onChange={setValue}
            items={TAB_ITEMS}
            fullWidth
            aria-label={TABS_VARIANT_LABEL[variant]}
          />
        </div>
      ))}
    </div>
  )
}

function TabsPlay({
  variant,
  size,
  align,
  fullWidth = true,
  disabled,
  preview,
  items = TAB_ITEMS,
  value: controlled,
  onChange,
  label,
}: {
  variant?: (typeof TABS_VARIANTS)[number]
  size?: (typeof TABS_SIZES)[number]
  align?: (typeof TABS_ALIGNS)[number]
  fullWidth?: boolean
  disabled?: boolean
  preview?: 'hover' | 'focus'
  items?: { id: string; label: string; icon?: ReactNode; badge?: number | string; disabled?: boolean }[]
  value?: string
  onChange?: (id: string) => void
  label: string
}) {
  const [local, setLocal] = useState(controlled ?? items[0]?.id ?? 'all')
  const value = controlled ?? local
  return (
    <Tabs
      variant={variant}
      size={size}
      align={align}
      fullWidth={fullWidth}
      disabled={disabled}
      preview={preview}
      value={value}
      onChange={onChange ?? setLocal}
      items={items}
      aria-label={label}
    />
  )
}

function TabsStates() {
  const [value, setValue] = useState('all')
  const [view, setView] = useState('grid')
  const [mail, setMail] = useState('unread')

  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <div className="flex flex-col gap-6">
          {TABS_VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-col gap-2">
              <Caption>{TABS_VARIANT_LABEL[variant]}</Caption>
              <TabsPlay
                variant={variant}
                value={value}
                onChange={setValue}
                label={TABS_VARIANT_LABEL[variant]}
              />
            </div>
          ))}
        </div>
      </StateGroup>

      <StateGroup title="Size">
        <div className="flex flex-col gap-6">
          {TABS_SIZES.map((size) => (
            <div key={size} className="flex flex-col gap-2">
              <Caption>{TABS_SIZE_LABEL[size]}</Caption>
              <TabsPlay size={size} value={value} onChange={setValue} label={TABS_SIZE_LABEL[size]} />
            </div>
          ))}
        </div>
      </StateGroup>

      <StateGroup title="Content">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Caption>Icon and label</Caption>
            <Tabs
              variant="subtle"
              fullWidth
              value={view}
              onChange={setView}
              items={[
                { id: 'grid', label: 'Grid', icon: viewIcon('grid', 16) },
                { id: 'list', label: 'List', icon: viewIcon('list', 16) },
                { id: 'gallery', label: 'Gallery', icon: viewIcon('gallery', 16) },
              ]}
              aria-label="View"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Badge</Caption>
            <Tabs
              value={mail}
              onChange={setMail}
              items={[
                { id: 'all', label: 'All' },
                { id: 'unread', label: 'Unread', badge: 12 },
                { id: 'flagged', label: 'Flagged', badge: 2 },
              ]}
              aria-label="Mail"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Icon, badge, pill</Caption>
            <Tabs
              variant="pill"
              fullWidth
              value={mail}
              onChange={setMail}
              items={[
                { id: 'all', label: 'All', icon: viewIcon('grid', 16) },
                { id: 'unread', label: 'Unread', icon: viewIcon('list', 16), badge: 12 },
                { id: 'flagged', label: 'Flagged', icon: viewIcon('gallery', 16), badge: 2 },
              ]}
              aria-label="Mail, pill"
            />
          </div>
        </div>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          {TABS_VARIANTS.flatMap((variant) => [
            <StateCard
              key={`${variant}-hover`}
              label={`${TABS_VARIANT_LABEL[variant]}, hover`}
              inert
              align="stretch"
              wide
              className="overflow-visible py-8"
            >
              <TabsPlay variant={variant} preview="hover" label={`${TABS_VARIANT_LABEL[variant]} hover`} />
            </StateCard>,
            <StateCard
              key={`${variant}-focus`}
              label={`${TABS_VARIANT_LABEL[variant]}, focus`}
              inert
              align="stretch"
              wide
              className="overflow-visible py-8"
            >
              <TabsPlay variant={variant} preview="focus" label={`${TABS_VARIANT_LABEL[variant]} focus`} />
            </StateCard>,
          ])}
          <StateCard label="Disabled tab" align="stretch" wide>
            <TabsPlay
              value={value}
              onChange={setValue}
              items={[
                { id: 'all', label: 'All' },
                { id: 'live', label: 'Live' },
                { id: 'review', label: 'In review', disabled: true },
              ]}
              label="Disabled tab"
            />
          </StateCard>
          <StateCard label="Disabled" inert align="stretch" wide>
            <TabsPlay disabled label="Disabled" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <div className="flex flex-col gap-6">
          {TABS_ALIGNS.map((align) => (
            <div key={align} className="flex flex-col gap-2">
              <Caption>{TABS_ALIGN_LABEL[align]}</Caption>
              <TabsPlay
                variant="subtle"
                align={align}
                value={value}
                onChange={setValue}
                label={TABS_ALIGN_LABEL[align]}
              />
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <Caption>Narrow</Caption>
            <SidebarWidth>
              <Tabs
                value={value}
                onChange={setValue}
                items={[
                  { id: 'all', label: 'All' },
                  { id: 'live', label: 'Live' },
                  { id: 'review', label: 'In review' },
                  { id: 'paused', label: 'Paused' },
                  { id: 'archived', label: 'Archived' },
                ]}
                aria-label="Narrow"
              />
            </SidebarWidth>
          </div>
        </div>
      </StateGroup>
    </StateStack>
  )
}

const ICON_TAB_ITEMS = [
  { id: 'home', label: 'Home', icon: <DkAppDashboardLayoutTiles /> },
  { id: 'inbox', label: 'Inbox', icon: <DkMessageInboxTray />, badge: 3 },
  { id: 'alerts', label: 'Alerts', icon: <DkNotificationBellAlert /> },
  { id: 'profile', label: 'Profile', icon: <DkPersonUserProfile /> },
]

function TabBarWidth({ children }: { children: ReactNode }) {
  return <div className="w-full min-w-0 max-w-[375px]">{children}</div>
}

function IconTabDemo() {
  const [value, setValue] = useState('home')
  return (
    <div className="flex w-full flex-col items-center gap-8">
      {ICON_TAB_VARIANTS.map((variant) => (
        <div key={variant} className="flex w-full max-w-[375px] flex-col gap-2">
          <Caption>{ICON_TAB_VARIANT_LABEL[variant]}</Caption>
          <IconTabBar
            variant={variant}
            value={value}
            onChange={setValue}
            items={ICON_TAB_ITEMS}
            aria-label={ICON_TAB_VARIANT_LABEL[variant]}
          />
        </div>
      ))}
    </div>
  )
}

function IconTabStates() {
  const [value, setValue] = useState('home')
  const [view, setView] = useState('inbox')
  const items = ICON_TAB_ITEMS

  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <div className="flex flex-col gap-6">
          {ICON_TAB_VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-col gap-2">
              <Caption>{ICON_TAB_VARIANT_LABEL[variant]}</Caption>
              <TabBarWidth>
                <IconTabBar
                  variant={variant}
                  value={value}
                  onChange={setValue}
                  items={items}
                  aria-label={ICON_TAB_VARIANT_LABEL[variant]}
                />
              </TabBarWidth>
            </div>
          ))}
        </div>
      </StateGroup>

      <StateGroup title="Layout">
        <div className="flex flex-col gap-6">
          {ICON_TAB_LAYOUTS.map((layout) => (
            <div key={layout} className="flex flex-col gap-2">
              <Caption>{ICON_TAB_LAYOUT_LABEL[layout]}</Caption>
              <TabBarWidth>
                <IconTabBar
                  layout={layout}
                  variant={layout === 'stacked' ? 'ghost' : 'subtle'}
                  fullWidth={layout !== 'icon'}
                  value={view}
                  onChange={setView}
                  items={items}
                  aria-label={ICON_TAB_LAYOUT_LABEL[layout]}
                />
              </TabBarWidth>
            </div>
          ))}
        </div>
      </StateGroup>

      <StateGroup title="Size">
        <div className="flex flex-col gap-6">
          {ICON_TAB_SIZES.map((size) => (
            <div key={size} className="flex flex-col gap-2">
              <Caption>{ICON_TAB_SIZE_LABEL[size]}</Caption>
              <TabBarWidth>
                <IconTabBar
                  size={size}
                  value={value}
                  onChange={setValue}
                  items={items}
                  aria-label={ICON_TAB_SIZE_LABEL[size]}
                />
              </TabBarWidth>
            </div>
          ))}
        </div>
      </StateGroup>

      <StateGroup title="Content">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Caption>Badge</Caption>
            <TabBarWidth>
              <IconTabBar
                value={view}
                onChange={setView}
                items={items}
                aria-label="Badge"
              />
            </TabBarWidth>
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Inline, pill</Caption>
            <TabBarWidth>
              <IconTabBar
                layout="inline"
                variant="pill"
                fullWidth
                value={view}
                onChange={setView}
                items={items}
                aria-label="Inline pill"
              />
            </TabBarWidth>
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Icon, fill</Caption>
            <IconTabBar
              layout="icon"
              variant="fill"
              fullWidth={false}
              value={view}
              onChange={setView}
              items={items}
              aria-label="Icon fill"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Danger</Caption>
            <TabBarWidth>
              <div className="flex items-stretch gap-1">
                <IconTabBar
                  className="min-w-0 flex-1"
                  value={value}
                  onChange={setValue}
                  items={items.slice(0, 3)}
                  aria-label="Main"
                />
                <IconTab
                  tone="danger"
                  icon={<DkLogoutExitSession />}
                  label="Log out"
                  onClick={() => undefined}
                />
              </div>
            </TabBarWidth>
          </div>
        </div>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={3}>
          <StateCard label="Default">
            <IconTab icon={<DkAppDashboardLayoutTiles />} label="Home" />
          </StateCard>
          <StateCard label="Hover">
            <IconTab icon={<DkAppDashboardLayoutTiles />} label="Home" preview="hover" />
          </StateCard>
          <StateCard label="Focus">
            <IconTab icon={<DkAppDashboardLayoutTiles />} label="Home" preview="focus" />
          </StateCard>
          <StateCard label="Selected">
            <IconTab icon={<DkAppDashboardLayoutTiles />} label="Home" active />
          </StateCard>
          <StateCard label="Fill selected">
            <IconTab icon={<DkAppDashboardLayoutTiles />} label="Home" variant="fill" active />
          </StateCard>
          <StateCard label="Pill selected">
            <IconTab icon={<DkAppDashboardLayoutTiles />} label="Home" variant="pill" active />
          </StateCard>
          <StateCard label="Badge">
            <IconTab icon={<DkMessageInboxTray />} label="Inbox" badge={3} active />
          </StateCard>
          <StateCard label="Disabled">
            <IconTab icon={<DkPadlockSecureClosed />} label="Locked" disabled />
          </StateCard>
          <StateCard label="Danger">
            <IconTab icon={<DkLogoutExitSession />} label="Log out" tone="danger" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Bar">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Caption>Disabled item</Caption>
            <TabBarWidth>
              <IconTabBar
                value={value}
                onChange={setValue}
                items={[
                  items[0],
                  items[1],
                  { ...items[2], disabled: true },
                  items[3],
                ]}
                aria-label="Disabled item"
              />
            </TabBarWidth>
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Disabled</Caption>
            <TabBarWidth>
              <IconTabBar
                disabled
                value={value}
                onChange={setValue}
                items={items}
                aria-label="Disabled bar"
              />
            </TabBarWidth>
          </div>
        </div>
      </StateGroup>
    </StateStack>
  )
}

function PaginationDemo() {
  const [page, setPage] = useState(2)
  const [longPage, setLongPage] = useState(12)
  const [compactPage, setCompactPage] = useState(3)

  return (
    <div className="flex w-full flex-col gap-8">
      {PAGINATION_VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-2">
          <Caption>{PAGINATION_VARIANT_LABEL[variant]}</Caption>
          <Pagination variant={variant} page={page} pageCount={5} onChange={setPage} />
        </div>
      ))}
      <div className="flex flex-col gap-2">
        <Caption>Many pages</Caption>
        <Pagination page={longPage} pageCount={48} onChange={setLongPage} />
      </div>
      <div className="flex flex-col gap-2">
        <Caption>Compact</Caption>
        <Pagination layout="compact" page={compactPage} pageCount={48} onChange={setCompactPage} />
      </div>
      <div className="flex flex-col gap-2">
        <Caption>Simple</Caption>
        <Pagination layout="simple" page={compactPage} pageCount={48} onChange={setCompactPage} />
      </div>
    </div>
  )
}

function PaginationStates() {
  const [page, setPage] = useState(12)
  const [shortPage, setShortPage] = useState(2)
  const [layoutPage, setLayoutPage] = useState(8)
  const noop = () => undefined

  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <div className="flex flex-col gap-6">
          {PAGINATION_VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-col gap-2">
              <Caption>{PAGINATION_VARIANT_LABEL[variant]}</Caption>
              <Pagination
                variant={variant}
                page={page}
                pageCount={48}
                onChange={setPage}
                aria-label={PAGINATION_VARIANT_LABEL[variant]}
              />
            </div>
          ))}
        </div>
      </StateGroup>

      <StateGroup title="Layout">
        <div className="flex flex-col gap-6">
          {PAGINATION_LAYOUTS.map((layout) => (
            <div key={layout} className="flex flex-col gap-2">
              <Caption>{PAGINATION_LAYOUT_LABEL[layout]}</Caption>
              <Pagination
                layout={layout}
                page={layoutPage}
                pageCount={48}
                onChange={setLayoutPage}
                aria-label={PAGINATION_LAYOUT_LABEL[layout]}
              />
            </div>
          ))}
        </div>
      </StateGroup>

      <StateGroup title="Size">
        <div className="flex flex-col gap-6">
          {PAGINATION_SIZES.map((size) => (
            <div key={size} className="flex flex-col gap-2">
              <Caption>{PAGINATION_SIZE_LABEL[size]}</Caption>
              <Pagination
                size={size}
                page={page}
                pageCount={48}
                onChange={setPage}
                aria-label={PAGINATION_SIZE_LABEL[size]}
              />
            </div>
          ))}
        </div>
      </StateGroup>

      <StateGroup title="Window">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Caption>Few pages</Caption>
            <Pagination page={shortPage} pageCount={5} onChange={setShortPage} aria-label="Few pages" />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Start</Caption>
            <Pagination page={1} pageCount={48} onChange={noop} aria-label="Start" />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Middle</Caption>
            <Pagination page={12} pageCount={48} onChange={noop} aria-label="Middle" />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>End</Caption>
            <Pagination page={48} pageCount={48} onChange={noop} aria-label="End" />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Tight window</Caption>
            <Pagination
              page={12}
              pageCount={48}
              siblingCount={0}
              onChange={noop}
              aria-label="Tight window"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Caption>Wide window</Caption>
            <Pagination
              page={12}
              pageCount={48}
              siblingCount={2}
              onChange={noop}
              aria-label="Wide window"
            />
          </div>
        </div>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          <StateCard label="Default" align="stretch" wide>
            <Pagination page={3} pageCount={5} onChange={noop} />
          </StateCard>
          <StateCard label="Hover" align="stretch" wide inert>
            <Pagination page={3} pageCount={5} onChange={noop} preview="hover" />
          </StateCard>
          <StateCard label="Focus" align="stretch" wide inert>
            <Pagination page={3} pageCount={5} onChange={noop} preview="focus" />
          </StateCard>
          <StateCard label="Active" align="stretch" wide inert>
            <Pagination page={3} pageCount={5} onChange={noop} preview="active" />
          </StateCard>
          <StateCard label="First page" align="stretch" wide>
            <Pagination page={1} pageCount={5} onChange={noop} />
          </StateCard>
          <StateCard label="Last page" align="stretch" wide>
            <Pagination page={5} pageCount={5} onChange={noop} />
          </StateCard>
          <StateCard label="Single page" align="stretch" wide>
            <Pagination page={1} pageCount={1} onChange={noop} />
          </StateCard>
          <StateCard label="Disabled" align="stretch" wide>
            <Pagination page={3} pageCount={5} onChange={noop} disabled />
          </StateCard>
          <StateCard label="Loading" align="stretch" wide>
            <Pagination page={3} pageCount={5} onChange={noop} loading />
          </StateCard>
          <StateCard label="Next hover" align="stretch" wide inert>
            <Pagination
              page={3}
              pageCount={5}
              onChange={noop}
              preview="hover"
              previewTarget="next"
            />
          </StateCard>
          <StateCard label="First and last" align="stretch" wide>
            <Pagination page={12} pageCount={48} onChange={noop} showFirstLast />
          </StateCard>
          <StateCard label="Full width" align="stretch" wide>
            <Pagination page={3} pageCount={5} onChange={noop} fullWidth />
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Align">
        <div className="flex flex-col gap-6">
          {PAGINATION_ALIGNS.map((align) => (
            <div key={align} className="flex flex-col gap-2">
              <Caption>{PAGINATION_ALIGN_LABEL[align]}</Caption>
              <Pagination
                align={align}
                page={3}
                pageCount={5}
                onChange={noop}
                aria-label={PAGINATION_ALIGN_LABEL[align]}
              />
            </div>
          ))}
        </div>
      </StateGroup>
    </StateStack>
  )
}

const COMMAND_GLYPH = { size: 16, strokeWidth: 1.75, absoluteStrokeWidth: true } as const

const COMMAND_ITEMS: CommandItem[] = [
  {
    id: 'new-file',
    label: 'New file',
    group: 'Actions',
    shortcut: '⌘N',
    icon: <DkAddPlusCreate {...COMMAND_GLYPH} />,
  },
  {
    id: 'settings',
    label: 'Settings',
    group: 'Actions',
    shortcut: '⌘,',
    description: 'Preferences for this workspace',
    icon: <DkGearSettingsPreferences {...COMMAND_GLYPH} />,
  },
  {
    id: 'copy',
    label: 'Copy link',
    group: 'Actions',
    shortcut: '⌘C',
    icon: <DkClipboardCopyDuplicate {...COMMAND_GLYPH} />,
  },
  {
    id: 'button',
    label: 'Button',
    group: 'Go to',
    meta: 'Buttons',
    description: 'The main control for running an action.',
    icon: <DkDocumentPageFold {...COMMAND_GLYPH} />,
  },
  {
    id: 'modal',
    label: 'Modal',
    group: 'Go to',
    meta: 'Overlay',
    description: 'A focused overlay for a form or a decision.',
    icon: <DkDocumentPageFold {...COMMAND_GLYPH} />,
  },
  {
    id: 'profile',
    label: 'Alex Rivera',
    group: 'People',
    description: 'View profile',
    icon: <DkPersonUserProfile {...COMMAND_GLYPH} />,
  },
]

const NAV_ITEMS: CommandItem[] = [
  { id: 'store', label: 'Find a Store', group: 'Quick Links', kind: 'link' },
  { id: 'products', label: 'Products', group: 'Quick Links', kind: 'link' },
  { id: 'services', label: 'Services', group: 'Quick Links', kind: 'link' },
  { id: 'support', label: 'Support', group: 'Quick Links', kind: 'link' },
  {
    id: 'recent-settings',
    label: 'Settings',
    group: 'Suggested',
    description: 'Workspace preferences',
    icon: <DkAnalogClockTime {...COMMAND_GLYPH} />,
  },
  {
    id: 'recent-button',
    label: 'Button',
    group: 'Suggested',
    description: 'Components',
    icon: <DkMagnifyingGlassFind {...COMMAND_GLYPH} />,
  },
]

function CommandPaletteDemo() {
  const [open, setOpen] = useState<CommandPaletteVariant | null>(null)
  const close = () => setOpen(null)
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <CommandSearch placeholder="Search commands…" onClick={() => setOpen('command')} active={open === 'command'} />
        <CommandSearch variant="subtle" placeholder="Search" shortcut={false} onClick={() => setOpen('spotlight')} active={open === 'spotlight'} />
        <CommandSearch variant="icon" placeholder="Search" shortcut={false} onClick={() => setOpen('nav')} active={open === 'nav'} />
      </div>
      <div className="flex w-full flex-wrap gap-2">
        {COMMAND_PALETTE_VARIANTS.map((variant) => (
          <Button
            key={variant}
            fullWidth={false}
            variant="action"
            onClick={() => setOpen(variant)}
          >
            {COMMAND_PALETTE_VARIANT_LABEL[variant]}
          </Button>
        ))}
      </div>
      {COMMAND_PALETTE_VARIANTS.map((variant) => (
        <CommandPalette
          key={variant}
          open={open === variant}
          onClose={close}
          variant={variant}
          items={variant === 'nav' ? NAV_ITEMS : COMMAND_ITEMS}
          placeholder={variant === 'nav' ? 'Search' : 'Search commands…'}
          onSelect={close}
        />
      ))}
    </div>
  )
}

function CommandPalettePreview({
  variant = 'command',
  size = 'md',
  query = '',
  index = 0,
  loading = false,
  items = COMMAND_ITEMS,
}: {
  variant?: CommandPaletteVariant
  size?: CommandPaletteSize
  query?: string
  index?: number
  loading?: boolean
  items?: CommandItem[]
}) {
  return (
    <CommandPalette
      open
      embedded
      variant={variant}
      size={size}
      query={query}
      index={index}
      loading={loading}
      items={items}
      onClose={() => undefined}
      onSelect={() => undefined}
    />
  )
}

function CommandPaletteStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {COMMAND_PALETTE_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={COMMAND_PALETTE_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              size="lg"
              className="overflow-hidden p-0"
            >
              <CommandPalettePreview
                variant={variant}
                items={variant === 'nav' ? NAV_ITEMS : COMMAND_ITEMS}
                query={variant === 'command' ? 'set' : ''}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {COMMAND_PALETTE_SIZES.map((size) => (
            <StateCard
              key={size}
              label={COMMAND_PALETTE_SIZE_LABEL[size]}
              align="stretch"
              wide
              size="lg"
              className="overflow-hidden p-0"
            >
              <CommandPalettePreview size={size} query="new" />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          <StateCard label="Idle" align="stretch" wide size="lg" className="overflow-hidden p-0">
            <CommandPalettePreview />
          </StateCard>
          <StateCard label="Typing" align="stretch" wide size="lg" className="overflow-hidden p-0">
            <CommandPalettePreview query="set" />
          </StateCard>
          <StateCard label="Selected" align="stretch" wide size="lg" className="overflow-hidden p-0">
            <CommandPalettePreview query="a" index={1} />
          </StateCard>
          <StateCard label="Empty" align="stretch" wide size="lg" className="overflow-hidden p-0">
            <CommandPalettePreview query="xyz" />
          </StateCard>
          <StateCard label="Loading" align="stretch" wide size="lg" className="overflow-hidden p-0">
            <CommandPalettePreview query="set" loading />
          </StateCard>
          <StateCard label="Spotlight typing" align="stretch" wide size="lg" className="overflow-hidden p-0">
            <CommandPalettePreview variant="spotlight" query="button" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Search trigger">
        <StateGrid columns={2}>
          {COMMAND_SEARCH_VARIANTS.map((variant) => (
            <StateCard key={variant} label={COMMAND_SEARCH_VARIANT_LABEL[variant]}>
              <CommandSearch
                variant={variant}
                placeholder="Search"
                shortcut={variant === 'outline' || variant === 'pill' ? '⌘K' : false}
                onClick={() => undefined}
              />
            </StateCard>
          ))}
          <StateCard label="Disabled">
            <CommandSearch placeholder="Search" disabled onClick={() => undefined} />
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Trigger size">
        <StateGrid columns={3}>
          {COMMAND_SEARCH_SIZES.map((size) => (
            <StateCard key={size} label={COMMAND_SEARCH_SIZE_LABEL[size]}>
              <CommandSearch
                size={size}
                placeholder="Search"
                shortcut={size === 'sm' ? '⌘K' : false}
                onClick={() => undefined}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function ModalDemo() {
  const [open, setOpen] = useState<ModalVariant | null>(null)
  const close = () => setOpen(null)
  return (
    <>
      <div className="flex w-full flex-wrap gap-2">
        {MODAL_VARIANTS.map((variant) => (
          <Button
            key={variant}
            fullWidth={false}
            variant={variant === 'alert' ? 'danger' : 'action'}
            onClick={() => setOpen(variant)}
          >
            {MODAL_VARIANT_LABEL[variant]}
          </Button>
        ))}
      </div>
      <Modal
        open={open === 'dialog'}
        onClose={close}
        title="Invite teammate"
        description="They’ll get a link to join this workspace."
        actions={[
          { label: 'Send invite', tone: 'primary', onClick: close },
          { label: 'Cancel', tone: 'cancel', onClick: close },
        ]}
      >
        <TextField
          icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
          placeholder="Email"
          defaultValue="sam@roboticela.com"
        />
      </Modal>
      <Modal
        open={open === 'alert'}
        onClose={close}
        variant="alert"
        tone="danger"
        icon
        title="Delete this project?"
        description="This cannot be undone."
        actions={[
          { label: 'Cancel', tone: 'cancel', onClick: close },
          { label: 'Delete', tone: 'danger', onClick: close },
        ]}
      />
      <Modal
        open={open === 'sheet'}
        onClose={close}
        variant="sheet"
        title="Edit profile"
        description="This name is shown on your public profile."
        actions={[
          { label: 'Save', tone: 'primary', onClick: close },
          { label: 'Cancel', tone: 'cancel', onClick: close },
        ]}
      >
        <TextField
          icon={<DkPersonUserProfile size={18} strokeWidth={1.6} absoluteStrokeWidth />}
          placeholder="Name"
          defaultValue="Alex Rivera"
        />
      </Modal>
      <Modal
        open={open === 'action'}
        onClose={close}
        variant="action"
        title="Photo"
        actions={[
          { label: 'Copy link', onClick: close },
          { label: 'Share', onClick: close },
          { label: 'Delete', tone: 'danger', onClick: close },
          { label: 'Cancel', tone: 'cancel', onClick: close },
        ]}
      />
    </>
  )
}

const MODAL_TONE_COPY: Record<ModalTone, { title: string; description: string }> = {
  default: { title: 'Invite teammate', description: 'They’ll get a link to join this workspace.' },
  danger: { title: 'Delete this project?', description: 'This cannot be undone.' },
  success: { title: 'Invite sent', description: 'Sam can join for 7 days.' },
  warning: { title: 'Unsaved changes', description: 'Leave without saving?' },
}

function ModalPreview({
  variant = 'dialog',
  size = 'md',
  tone = 'default',
  title,
  description,
  icon,
  showClose,
  dismissible,
  loading,
  children,
  actions,
}: {
  variant?: ModalVariant
  size?: ModalSize
  tone?: ModalTone
  title?: string
  description?: string
  icon?: boolean
  showClose?: boolean
  dismissible?: boolean
  loading?: boolean
  children?: ReactNode
  actions?: {
    label: string
    tone?: 'primary' | 'danger' | 'cancel' | 'default'
    loading?: boolean
    loadingText?: string
    disabled?: boolean
  }[]
}) {
  const copy = MODAL_TONE_COPY[tone]
  const dialogActions =
    actions ??
    (variant === 'action'
      ? [
          { label: 'Copy link', tone: 'default' as const },
          { label: 'Share', tone: 'default' as const },
          { label: 'Delete', tone: 'danger' as const },
          { label: 'Cancel', tone: 'cancel' as const },
        ]
      : variant === 'alert'
        ? [
            { label: 'Cancel', tone: 'cancel' as const },
            {
              label: tone === 'danger' ? 'Delete' : 'Continue',
              tone: tone === 'danger' ? ('danger' as const) : ('primary' as const),
              loading,
              loadingText: loading ? 'Working…' : undefined,
              disabled: loading,
            },
          ]
        : [
            {
              label: tone === 'danger' ? 'Delete' : 'Send invite',
              tone: tone === 'danger' ? ('danger' as const) : ('primary' as const),
              loading,
              loadingText: loading ? 'Sending…' : undefined,
            },
            { label: 'Cancel', tone: 'cancel' as const, disabled: loading },
          ])

  return (
    <Modal
      open
      embedded
      onClose={() => undefined}
      variant={variant}
      size={size}
      tone={tone}
      icon={icon}
      showClose={showClose}
      dismissible={dismissible}
      loading={loading}
      title={title ?? (variant === 'action' ? 'Select an option' : copy.title)}
      description={description ?? (variant === 'action' ? undefined : copy.description)}
      actions={dialogActions}
    >
      {children}
    </Modal>
  )
}

function ModalStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {MODAL_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={MODAL_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              size="lg"
              className="p-0 overflow-hidden"
            >
              <ModalPreview variant={variant} tone={variant === 'alert' ? 'danger' : 'default'} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {MODAL_SIZES.map((size) => (
            <StateCard
              key={size}
              label={MODAL_SIZE_LABEL[size]}
              align="stretch"
              wide
              size="lg"
              className="p-0 overflow-hidden"
            >
              <ModalPreview size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {MODAL_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={MODAL_TONE_LABEL[tone]}
              align="stretch"
              wide
              size="lg"
              className="p-0 overflow-hidden"
            >
              <ModalPreview variant="alert" tone={tone} icon />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          <StateCard label="Default" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ModalPreview />
          </StateCard>
          <StateCard label="With icon" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ModalPreview icon />
          </StateCard>
          <StateCard label="Title only" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ModalPreview description="" title="Invite teammate" />
          </StateCard>
          <StateCard label="No close" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ModalPreview showClose={false} dismissible={false} />
          </StateCard>
          <StateCard label="Loading" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ModalPreview loading dismissible={false} />
          </StateCard>
          <StateCard label="Disabled action" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ModalPreview
              actions={[
                { label: 'Send invite', tone: 'primary', disabled: true },
                { label: 'Cancel', tone: 'cancel' },
              ]}
            />
          </StateCard>
          <StateCard label="Form" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ModalPreview>
              <TextField
                icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                placeholder="Email"
                defaultValue="sam@roboticela.com"
              />
            </ModalPreview>
          </StateCard>
          <StateCard label="Scrolling" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ModalPreview size="sm" description="Read the terms before you continue.">
              <p className="m-0">
                This workspace is for your team. Invited people can view projects, leave comments, and create new
                items. You can change access later in Settings.
              </p>
              <p className="mt-3 mb-0">
                Sending an invite does not bill a seat until they accept. You can revoke the link at any time.
              </p>
            </ModalPreview>
          </StateCard>
          <StateCard label="Destructive alert" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ModalPreview variant="alert" tone="danger" icon />
          </StateCard>
          <StateCard label="Action sheet" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ModalPreview variant="action" />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function ConfirmDialogDemo() {
  const [open, setOpen] = useState<ConfirmDialogVariant | null>(null)
  const close = () => setOpen(null)
  return (
    <>
      <div className="flex w-full flex-wrap gap-2">
        {CONFIRM_DIALOG_VARIANTS.map((variant) => (
          <Button
            key={variant}
            fullWidth={false}
            variant={variant === 'alert' ? 'danger' : 'action'}
            onClick={() => setOpen(variant)}
          >
            {CONFIRM_DIALOG_VARIANT_LABEL[variant]}
          </Button>
        ))}
      </div>
      <ConfirmDialog
        open={open === 'alert'}
        onClose={close}
        title="Delete this project?"
        body="This cannot be undone."
        confirmLabel="Delete"
        onConfirm={close}
      />
      <ConfirmDialog
        open={open === 'dialog'}
        onClose={close}
        variant="dialog"
        tone="brand"
        icon
        title="Publish this page?"
        body="It will be visible to everyone on the web."
        confirmLabel="Publish"
        onConfirm={close}
      />
      <ConfirmDialog
        open={open === 'sheet'}
        onClose={close}
        variant="sheet"
        tone="warning"
        icon
        title="Leave without saving?"
        body="Your edits will be lost."
        confirmLabel="Leave"
        onConfirm={close}
      />
      <ConfirmDialog
        open={open === 'action'}
        onClose={close}
        variant="action"
        title="This photo"
        body="Choose what happens next."
        confirmLabel="Delete"
        onConfirm={close}
      />
    </>
  )
}

const CONFIRM_TONE_COPY: Record<
  ConfirmDialogTone,
  { title: string; body: string; confirm: string }
> = {
  danger: { title: 'Delete this project?', body: 'This cannot be undone.', confirm: 'Delete' },
  brand: { title: 'Publish this page?', body: 'It will be visible to everyone.', confirm: 'Publish' },
  warning: { title: 'Leave without saving?', body: 'Your edits will be lost.', confirm: 'Leave' },
  success: { title: 'Restore this version?', body: 'It becomes the current draft.', confirm: 'Restore' },
  neutral: { title: 'Archive this project?', body: 'You can find it later in Archive.', confirm: 'Archive' },
}

function ConfirmPreview({
  variant = 'alert',
  size = 'md',
  tone = 'danger',
  icon,
  showCancel = true,
  showClose,
  dismissible,
  loading,
  confirmDisabled,
  secondaryLabel,
  title,
  body,
  confirmLabel,
}: {
  variant?: ConfirmDialogVariant
  size?: ConfirmDialogSize
  tone?: ConfirmDialogTone
  icon?: boolean
  showCancel?: boolean
  showClose?: boolean
  dismissible?: boolean
  loading?: boolean
  confirmDisabled?: boolean
  secondaryLabel?: string
  title?: string
  body?: string | false
  confirmLabel?: string
}) {
  const copy = CONFIRM_TONE_COPY[tone]
  return (
    <ConfirmDialog
      open
      embedded
      onClose={() => undefined}
      onConfirm={() => undefined}
      onSecondary={secondaryLabel ? () => undefined : undefined}
      variant={variant}
      size={size}
      tone={tone}
      icon={icon}
      showCancel={showCancel}
      showClose={showClose}
      dismissible={dismissible}
      loading={loading}
      confirmDisabled={confirmDisabled}
      secondaryLabel={secondaryLabel}
      title={title ?? copy.title}
      body={body === false ? undefined : (body ?? copy.body)}
      confirmLabel={confirmLabel ?? copy.confirm}
    />
  )
}

function ConfirmDialogStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {CONFIRM_DIALOG_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={CONFIRM_DIALOG_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              size="lg"
              className="p-0 overflow-hidden"
            >
              <ConfirmPreview variant={variant} tone={variant === 'alert' || variant === 'action' ? 'danger' : 'brand'} icon={variant === 'dialog' || variant === 'sheet'} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {CONFIRM_DIALOG_SIZES.map((size) => (
            <StateCard
              key={size}
              label={CONFIRM_DIALOG_SIZE_LABEL[size]}
              align="stretch"
              wide
              size="lg"
              className="p-0 overflow-hidden"
            >
              <ConfirmPreview size={size} icon />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {CONFIRM_DIALOG_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={CONFIRM_DIALOG_TONE_LABEL[tone]}
              align="stretch"
              wide
              size="lg"
              className="p-0 overflow-hidden"
            >
              <ConfirmPreview tone={tone} icon />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          <StateCard label="Default" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ConfirmPreview />
          </StateCard>
          <StateCard label="With icon" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ConfirmPreview icon />
          </StateCard>
          <StateCard label="Title only" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ConfirmPreview body={false} />
          </StateCard>
          <StateCard label="Single action" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ConfirmPreview showCancel={false} tone="brand" icon />
          </StateCard>
          <StateCard label="Three actions" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ConfirmPreview
              tone="warning"
              icon
              title="Unsaved changes"
              body="Save before you leave?"
              confirmLabel="Save"
              secondaryLabel="Don’t save"
            />
          </StateCard>
          <StateCard label="Loading" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ConfirmPreview loading icon />
          </StateCard>
          <StateCard label="Disabled confirm" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ConfirmPreview confirmDisabled icon />
          </StateCard>
          <StateCard label="Locked" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ConfirmPreview dismissible={false} icon />
          </StateCard>
          <StateCard label="With close" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ConfirmPreview variant="dialog" tone="brand" icon showClose />
          </StateCard>
          <StateCard label="Action sheet" align="stretch" wide size="lg" className="p-0 overflow-hidden">
            <ConfirmPreview variant="action" />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function NavSearchPlay({
  value: initial = '',
  ...rest
}: {
  value?: string
  placeholder?: string
  variant?: NavSearchVariant
  size?: NavSearchSize
  shortcut?: string
  loading?: boolean
  disabled?: boolean
  expanded?: boolean
  defaultExpanded?: boolean
  preview?: 'hover' | 'focus'
  active?: boolean
  onActivate?: () => void
}) {
  const [value, setValue] = useState(initial)
  return <NavSearch value={value} onChange={setValue} {...rest} />
}

function NavSearchDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex w-full max-w-[280px] flex-col items-center gap-4">
      {NAV_SEARCH_VARIANTS.map((variant) => (
        <NavSearchPlay
          key={variant}
          variant={variant}
          placeholder={NAV_SEARCH_VARIANT_LABEL[variant]}
          shortcut={variant === 'pill' ? '⌘K' : undefined}
          onActivate={variant === 'icon' ? () => setOpen(true) : undefined}
          active={variant === 'icon' ? open : undefined}
        />
      ))}
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        items={COMMAND_ITEMS}
        placeholder="Search commands…"
        onSelect={() => setOpen(false)}
      />
    </div>
  )
}

function NavSearchStates() {
  const [iconOpen, setIconOpen] = useState(false)
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {NAV_SEARCH_VARIANTS.map((variant) => (
            <StateCard key={variant} label={NAV_SEARCH_VARIANT_LABEL[variant]}>
              <NavSearchPlay
                variant={variant}
                placeholder="Search"
                onActivate={variant === 'icon' ? () => setIconOpen(true) : undefined}
                active={variant === 'icon' ? iconOpen : undefined}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {NAV_SEARCH_SIZES.map((size) => (
            <StateCard key={size} label={NAV_SEARCH_SIZE_LABEL[size]}>
              <NavSearchPlay size={size} placeholder="Search" />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          <StateCard label="Empty">
            <NavSearchPlay placeholder="Search" />
          </StateCard>
          <StateCard label="Hover">
            <NavSearchPlay placeholder="Search" preview="hover" />
          </StateCard>
          <StateCard label="Focus">
            <NavSearchPlay value="Projects" preview="focus" />
          </StateCard>
          <StateCard label="Filled">
            <NavSearchPlay value="Projects" />
          </StateCard>
          <StateCard label="Loading">
            <NavSearchPlay value="Alex" loading />
          </StateCard>
          <StateCard label="Disabled">
            <NavSearchPlay value="Projects" disabled />
          </StateCard>
          <StateCard label="Shortcut">
            <NavSearchPlay placeholder="Search" shortcut="⌘K" />
          </StateCard>
          <StateCard label="Icon, hover">
            <NavSearchPlay variant="icon" placeholder="Search" preview="hover" />
          </StateCard>
          <StateCard label="Icon, expanded">
            <NavSearchPlay variant="icon" expanded placeholder="Search" />
          </StateCard>
        </StateGrid>
      </StateGroup>
      <CommandPalette
        open={iconOpen}
        onClose={() => setIconOpen(false)}
        items={COMMAND_ITEMS}
        placeholder="Search commands…"
        onSelect={() => setIconOpen(false)}
      />
    </StateStack>
  )
}

const SIDEBAR_GLYPH = { size: 18, strokeWidth: 1.5, absoluteStrokeWidth: true } as const

function sidebarSections(opts?: { disabled?: boolean; collapsible?: boolean }): SidebarSection[] {
  return [
    {
      label: 'Workspace',
      collapsible: opts?.collapsible,
      items: [
        { id: 'overview', label: 'Overview', icon: <DkAppDashboardLayoutTiles {...SIDEBAR_GLYPH} /> },
        { id: 'projects', label: 'Projects', icon: <DkFileFolderDirectory {...SIDEBAR_GLYPH} /> },
        { id: 'inbox', label: 'Inbox', icon: <DkMessageInboxTray {...SIDEBAR_GLYPH} />, badge: 3 },
      ],
    },
    {
      label: 'Account',
      collapsible: opts?.collapsible,
      items: [
        {
          id: 'settings',
          label: 'Settings',
          icon: <DkGearSettingsPreferences {...SIDEBAR_GLYPH} />,
          disabled: opts?.disabled,
        },
        {
          id: 'logout',
          label: 'Log out',
          icon: <DkLogoutExitSession {...SIDEBAR_GLYPH} />,
          tone: 'danger',
        },
      ],
    },
  ]
}

function SidebarPlay({
  variant = 'fill',
  size = 'md',
  collapsed = false,
  collapsible = false,
  search = false,
  account = false,
  collapsibleSections = false,
  canvas = false,
  className,
}: {
  variant?: SidebarVariant
  size?: SidebarSize
  collapsed?: boolean
  collapsible?: boolean
  search?: boolean
  account?: boolean
  collapsibleSections?: boolean
  canvas?: boolean
  className?: string
}) {
  const [active, setActive] = useState('overview')
  const [query, setQuery] = useState('')
  const [rail, setRail] = useState(collapsed)
  const titles: Record<string, string> = {
    overview: 'Overview',
    projects: 'Projects',
    inbox: 'Inbox',
    settings: 'Settings',
    logout: 'Overview',
  }

  const sidebar = (
    <DashboardSidebar
      variant={variant}
      size={size}
      collapsed={collapsible ? rail : collapsed}
      onCollapsedChange={collapsible ? setRail : undefined}
      collapsible={collapsible}
      brand
      activeId={active}
      onSelect={setActive}
      sections={sidebarSections({ collapsible: collapsibleSections })}
      search={search ? { value: query, onChange: setQuery, placeholder: 'Search' } : undefined}
      account={
        account
          ? { name: 'Alex Rivera', detail: 'Workspace owner', onClick: () => setActive('settings') }
          : undefined
      }
      footer={<ThemeToggle variant={(collapsible ? rail : collapsed) ? 'switch' : 'default'} />}
      className={canvas ? undefined : 'h-full'}
    />
  )

  if (!canvas) return sidebar

  return (
    <div className={cn('flex h-full min-h-0 w-full overflow-hidden bg-bg-primary', className)}>
      {sidebar}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[52px] shrink-0 items-center border-b border-border-default px-5">
          <Label as="span">{titles[active] ?? 'Overview'}</Label>
        </div>
        <div className="min-h-0 flex-1 bg-bg-primary" />
      </div>
    </div>
  )
}

function SidebarDemo() {
  return (
    <div className="-m-8 h-[480px] w-[calc(100%+4rem)] overflow-hidden">
      <SidebarPlay canvas collapsible account />
    </div>
  )
}

function SidebarItemPlay({
  label,
  item,
  active,
  preview,
}: {
  label: string
  item: SidebarItem
  active?: boolean
  preview?: SidebarItemPreview
}) {
  return (
    <StateCard label={label} align="stretch">
      <div className="w-full max-w-[240px]">
        <SidebarNavItem item={item} active={active} preview={preview} />
      </div>
    </StateCard>
  )
}

function SidebarStates() {
  const overview: SidebarItem = {
    id: 'overview',
    label: 'Overview',
    icon: <DkAppDashboardLayoutTiles {...SIDEBAR_GLYPH} />,
  }
  const inbox: SidebarItem = {
    id: 'inbox',
    label: 'Inbox',
    icon: <DkMessageInboxTray {...SIDEBAR_GLYPH} />,
    badge: 3,
  }
  const locked: SidebarItem = {
    id: 'settings',
    label: 'Settings',
    icon: <DkGearSettingsPreferences {...SIDEBAR_GLYPH} />,
    disabled: true,
  }
  const logout: SidebarItem = {
    id: 'logout',
    label: 'Log out',
    icon: <DkLogoutExitSession {...SIDEBAR_GLYPH} />,
    tone: 'danger',
  }

  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {SIDEBAR_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={SIDEBAR_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              size="lg"
              className="overflow-hidden p-0 items-stretch min-h-[360px]"
            >
              <div className="h-[360px] w-full">
                <SidebarPlay variant={variant} canvas />
              </div>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {SIDEBAR_SIZES.map((size) => (
            <StateCard
              key={size}
              label={SIDEBAR_SIZE_LABEL[size]}
              align="stretch"
              wide
              size="lg"
              className="overflow-hidden p-0 items-stretch min-h-[360px]"
            >
              <div className="h-[360px] w-full">
                <SidebarPlay size={size} canvas />
              </div>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Mode">
        <StateGrid columns={2}>
          <StateCard
            label="Expanded"
            align="stretch"
            wide
            size="lg"
            className="overflow-hidden p-0 items-stretch min-h-[360px]"
          >
            <div className="h-[360px] w-full">
              <SidebarPlay canvas collapsible />
            </div>
          </StateCard>
          <StateCard
            label="Rail"
            align="stretch"
            wide
            size="lg"
            className="overflow-hidden p-0 items-stretch min-h-[360px]"
          >
            <div className="h-[360px] w-full">
              <SidebarPlay canvas collapsed collapsible />
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Item">
        <StateGrid>
          <SidebarItemPlay label="Default" item={overview} />
          <SidebarItemPlay label="Hover" item={overview} preview="hover" />
          <SidebarItemPlay label="Focus" item={overview} preview="focus" />
          <SidebarItemPlay label="Active" item={overview} preview="active" />
          <SidebarItemPlay label="Selected" item={overview} active />
          <SidebarItemPlay label="Disabled" item={locked} />
          <SidebarItemPlay label="Badge" item={inbox} />
          <SidebarItemPlay label="Danger" item={logout} />
        </StateGrid>
      </StateGroup>

      <StateGroup title="Composition">
        <StateGrid columns={2}>
          <StateCard
            label="Search"
            align="stretch"
            wide
            size="lg"
            className="overflow-hidden p-0 items-stretch min-h-[360px]"
          >
            <div className="h-[360px] w-full">
              <SidebarPlay canvas search />
            </div>
          </StateCard>
          <StateCard
            label="Account"
            align="stretch"
            wide
            size="lg"
            className="overflow-hidden p-0 items-stretch min-h-[360px]"
          >
            <div className="h-[360px] w-full">
              <SidebarPlay canvas account />
            </div>
          </StateCard>
          <StateCard
            label="Collapsible groups"
            align="stretch"
            wide
            size="lg"
            className="overflow-hidden p-0 items-stretch min-h-[360px]"
          >
            <div className="h-[360px] w-full">
              <SidebarPlay canvas collapsibleSections />
            </div>
          </StateCard>
          <StateCard
            label="Brand and canvas"
            align="stretch"
            wide
            size="lg"
            className="overflow-hidden p-0 items-stretch min-h-[360px]"
          >
            <div className="h-[360px] w-full">
              <SidebarPlay canvas account collapsible />
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function AuthNavPreview({
  navLinkTo,
  navLinkLabel,
}: {
  navLinkTo?: string
  navLinkLabel?: string
}) {
  return (
    <PreviewFrame className="bg-bg-primary">
      <AuthNav contained navLinkTo={navLinkTo} navLinkLabel={navLinkLabel} />
    </PreviewFrame>
  )
}

function AuthNavDemo() {
  return <AuthNavPreview navLinkTo="/pages/create-account" navLinkLabel="Create one" />
}

function AuthNavStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Trailing link">
        <div className="flex w-full flex-col gap-8">
          <StateCard label="Create one" align="stretch" wide>
            <AuthNavPreview navLinkTo="/pages/create-account" navLinkLabel="Create one" />
          </StateCard>
          <StateCard label="Sign in" align="stretch" wide>
            <AuthNavPreview navLinkTo="/pages/sign-in" navLinkLabel="Sign in" />
          </StateCard>
          <StateCard label="Theme only" align="stretch" wide>
            <AuthNavPreview />
          </StateCard>
        </div>
      </StateGroup>
    </StateStack>
  )
}

function DashboardNavDemo() {
  const [search, setSearch] = useState('')
  return (
    <PreviewFrame>
      <DashboardNav title="Projects" search={{ value: search, onChange: setSearch }} userName="Alex Rivera" />
    </PreviewFrame>
  )
}

function ShellDemo() {
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [search, setSearch] = useState('')
  return (
    <PreviewFrame className="h-[360px]" previewClassName="h-[calc(100dvh-2.75rem)]">
      <DashboardShell
        title="Overview"
        sidebarOpen={open}
        onSidebarOpenChange={setOpen}
        sidebarCollapsed={collapsed}
        onSidebarCollapsedChange={setCollapsed}
        search={{ value: search, onChange: setSearch }}
        userName="Alex Rivera"
        brandHref="/"
        sections={sidebarSections()}
        activeId="overview"
        footer={<ThemeToggle variant={collapsed ? 'switch' : 'default'} />}
      >
        <p className="m-0 p-6 text-sm text-text-secondary">Main canvas</p>
      </DashboardShell>
    </PreviewFrame>
  )
}

const BADGE_GLYPH = { strokeWidth: 2.25, absoluteStrokeWidth: true } as const

function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="fill">New</Badge>
      <Badge variant="subtle" tone="verified" dot pulse>
        Live
      </Badge>
      <Badge variant="outline" tone="warning">
        In review
      </Badge>
      <Badge variant="ghost" tone="neutral">
        Beta
      </Badge>
      <Badge variant="pill" tone="neutral">
        Pro
      </Badge>
      <Badge variant="fill" tone="danger" count={3} />
    </div>
  )
}

function RemovableBadgePlay() {
  const [gone, setGone] = useState(false)
  if (gone) {
    return (
      <button
        type="button"
        className="cursor-pointer border-0 bg-transparent p-0 text-[12px] text-brand-primary"
        onClick={() => setGone(false)}
      >
        Restore
      </button>
    )
  }
  return (
    <Badge tone="neutral" onDismiss={() => setGone(true)}>
      Filters
    </Badge>
  )
}

function BadgeStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid>
          {BADGE_VARIANTS.map((variant) => (
            <StateCard key={variant} label={BADGE_VARIANT_LABEL[variant]}>
              <Badge variant={variant}>New</Badge>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={3}>
          {BADGE_SIZES.map((size) => (
            <StateCard key={size} label={BADGE_SIZE_LABEL[size]}>
              <Badge size={size}>New</Badge>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={3}>
          {BADGE_TONES.map((tone) => (
            <StateCard key={tone} label={BADGE_TONE_LABEL[tone]}>
              <Badge tone={tone}>{BADGE_TONE_LABEL[tone]}</Badge>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Fill">
        <StateGrid columns={3}>
          {BADGE_TONES.map((tone) => (
            <StateCard key={`fill-${tone}`} label={BADGE_TONE_LABEL[tone]}>
              <Badge variant="fill" tone={tone}>
                {BADGE_TONE_LABEL[tone]}
              </Badge>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Outline">
        <StateGrid columns={3}>
          {BADGE_TONES.map((tone) => (
            <StateCard key={`outline-${tone}`} label={BADGE_TONE_LABEL[tone]}>
              <Badge variant="outline" tone={tone}>
                {BADGE_TONE_LABEL[tone]}
              </Badge>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Ghost">
        <StateGrid columns={3}>
          {BADGE_TONES.map((tone) => (
            <StateCard key={`ghost-${tone}`} label={BADGE_TONE_LABEL[tone]}>
              <Badge variant="ghost" tone={tone} dot>
                {BADGE_TONE_LABEL[tone]}
              </Badge>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Shape">
        <StateGrid columns={2}>
          {BADGE_SHAPES.map((shape) => (
            <StateCard key={shape} label={BADGE_SHAPE_LABEL[shape]}>
              <Badge shape={shape} tone="neutral">
                Category
              </Badge>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid>
          <StateCard label="Default">
            <Badge>New</Badge>
          </StateCard>
          <StateCard label="Dot">
            <Badge tone="verified" dot>
              Live
            </Badge>
          </StateCard>
          <StateCard label="Pulse">
            <Badge tone="verified" dot pulse>
              Live
            </Badge>
          </StateCard>
          <StateCard label="Icon">
            <Badge tone="success" icon={<DkSuccessCircleCheckmark {...BADGE_GLYPH} />}>
              Verified
            </Badge>
          </StateCard>
          <StateCard label="Warning icon">
            <Badge tone="warning" icon={<DkWarningTriangleAlert {...BADGE_GLYPH} />}>
              Review
            </Badge>
          </StateCard>
          <StateCard label="Count">
            <Badge variant="fill" tone="danger" count={3} />
          </StateCard>
          <StateCard label="Overflow">
            <Badge variant="fill" tone="danger" count={128} />
          </StateCard>
          <StateCard label="Count, brand">
            <Badge variant="fill" count={12} />
          </StateCard>
          <StateCard label="Dot only">
            <Badge tone="success" dot />
          </StateCard>
          <StateCard label="Loading">
            <Badge loading>Saving</Badge>
          </StateCard>
          <StateCard label="Disabled">
            <Badge disabled>Paused</Badge>
          </StateCard>
          <StateCard label="Removable">
            <RemovableBadgePlay />
          </StateCard>
          <StateCard label="Pill, large">
            <Badge variant="pill" size="lg" tone="neutral">
              Pro
            </Badge>
          </StateCard>
          <StateCard label="Ghost, small">
            <Badge variant="ghost" size="sm" tone="warning" dot>
              Away
            </Badge>
          </StateCard>
          <StateCard label="Rounded">
            <Badge shape="rounded" tone="brand">
              Docs
            </Badge>
          </StateCard>
          <StateCard label="Long label">
            <Badge tone="neutral">In review · waiting</Badge>
          </StateCard>
          <StateCard label="Fill, verified">
            <Badge variant="fill" tone="verified">
              Active
            </Badge>
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

const STAT_SPARK = [18, 22, 19, 26, 24, 31, 28, 36]
const STAT_SPARK_DOWN = [36, 32, 34, 28, 24, 22, 18, 16]

function StatIcon({ name = 'revenue' }: { name?: 'revenue' | 'people' | 'inbox' | 'chart' }) {
  const node =
    name === 'people' ? (
      <DkPeopleUsersGroup strokeWidth={1.75} absoluteStrokeWidth />
    ) : name === 'inbox' ? (
      <DkMessageInboxTray strokeWidth={1.75} absoluteStrokeWidth />
    ) : name === 'chart' ? (
      <DkChartLine strokeWidth={1.75} absoluteStrokeWidth />
    ) : (
      <DkPaperBanknoteCurrency strokeWidth={1.75} absoluteStrokeWidth />
    )
  return node
}

const CARD_COPY = {
  eyebrow: 'Workspace',
  title: 'Team library',
  description: 'Shared files, comments, and reviews in one place.',
}

function CardPhoto({ onDark = false }: { onDark?: boolean }) {
  return (
    <span
      className={cn('block h-full w-full', onDark ? 'bg-[#3a3a3c]' : 'bg-bg-tertiary dark:bg-bg-active')}
    />
  )
}

function CardDemo() {
  return (
    <div className="grid w-full gap-4 min-[735px]:grid-cols-2">
      {CARD_VARIANTS.map((variant) => (
        <Card
          key={variant}
          variant={variant}
          eyebrow={CARD_COPY.eyebrow}
          title={CARD_COPY.title}
          description={CARD_COPY.description}
          icon={<DkAppDashboardLayoutTiles {...glyph} />}
        />
      ))}
    </div>
  )
}

function CardTile({
  variant,
  size,
  tone,
  ...rest
}: {
  variant?: CardVariant
  size?: CardSize
  tone?: CardTone
} & Omit<ComponentProps<typeof Card>, 'title' | 'description' | 'eyebrow'>) {
  return (
    <Card
      variant={variant}
      size={size}
      tone={tone}
      eyebrow={CARD_COPY.eyebrow}
      title={CARD_COPY.title}
      description={CARD_COPY.description}
      {...rest}
    />
  )
}

const CARD_CHROME: { label: string; preview?: CardPreview; selected?: boolean; disabled?: boolean; loading?: boolean }[] = [
  { label: 'Default' },
  { label: 'Hover', preview: 'hover' },
  { label: 'Focus', preview: 'focus' },
  { label: 'Active', preview: 'active' },
  { label: 'Selected', selected: true },
  { label: 'Disabled', disabled: true },
  { label: 'Loading', loading: true },
]

function CardStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {CARD_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={CARD_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <CardTile variant={variant} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {CARD_SIZES.map((size) => (
            <StateCard
              key={size}
              label={CARD_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <CardTile size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={2}>
          {CARD_SIZES.map((size) => (
            <StateCard
              key={`pill-${size}`}
              label={CARD_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <CardTile variant="pill" size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {CARD_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={CARD_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <CardTile tone={tone} icon={<DkAppDashboardLayoutTiles {...glyph} />} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      {CARD_VARIANTS.map((variant) => (
        <StateGroup key={variant} title={`${CARD_VARIANT_LABEL[variant]} tone`}>
          <StateGrid columns={2}>
            {CARD_TONES.map((tone) => (
              <StateCard
                key={`${variant}-${tone}`}
                label={CARD_TONE_LABEL[tone]}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <CardTile variant={variant} tone={tone} icon={<DkAppDashboardLayoutTiles {...glyph} />} />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="On dark">
        <StateGrid columns={2}>
          {CARD_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={CARD_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <CardTile variant={variant} onDark icon={<DkAppDashboardLayoutTiles {...glyph} />} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Media">
        <StateGrid columns={2}>
          {CARD_VARIANTS.map((variant) => (
            <StateCard
              key={`media-${variant}`}
              label={CARD_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <CardTile variant={variant} media={<CardPhoto />} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={2}>
          <StateCard label="Icon" align="stretch" wide className="bg-bg-primary">
            <CardTile icon={<DkAppDashboardLayoutTiles {...glyph} />} />
          </StateCard>
          <StateCard label="Media and icon" align="stretch" wide className="bg-bg-primary">
            <Card
              media={<CardPhoto />}
              icon={<DkFileFolderDirectory {...glyph} />}
              eyebrow={CARD_COPY.eyebrow}
              title={CARD_COPY.title}
              description={CARD_COPY.description}
            />
          </StateCard>
          <StateCard label="Title only" align="stretch" wide className="bg-bg-primary">
            <Card title={CARD_COPY.title} />
          </StateCard>
          <StateCard label="Eyebrow" align="stretch" wide className="bg-bg-primary">
            <Card eyebrow={CARD_COPY.eyebrow} title={CARD_COPY.title} />
          </StateCard>
          <StateCard label="Badge" align="stretch" wide className="bg-bg-primary">
            <Card
              eyebrow={CARD_COPY.eyebrow}
              title={CARD_COPY.title}
              description={CARD_COPY.description}
            >
              <Badge tone="verified">Live</Badge>
            </Card>
          </StateCard>
          <StateCard label="Footer" align="stretch" wide className="bg-bg-primary">
            <CardTile
              footer={
                <Button size="sm" fullWidth={false}>
                  Open
                </Button>
              }
            />
          </StateCard>
          <StateCard label="Media and footer" align="stretch" wide className="bg-bg-primary">
            <CardTile
              media={<CardPhoto />}
              footer={
                <Button size="sm" fullWidth={false}>
                  Open
                </Button>
              }
            />
          </StateCard>
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <CardTile href="#card" icon={<DkAppDashboardLayoutTiles {...glyph} />} description="Open the library." />
          </StateCard>
          <StateCard label="Button" align="stretch" wide className="bg-bg-primary">
            <CardTile
              onClick={() => undefined}
              icon={<DkFileFolderDirectory {...glyph} />}
              description="Choose this workspace."
            />
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          {CARD_CHROME.map((item) => (
            <StateCard
              key={item.label}
              label={item.label}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <CardTile
                href="#card"
                preview={item.preview}
                selected={item.selected}
                disabled={item.disabled}
                loading={item.loading}
                media={item.loading ? <CardPhoto /> : undefined}
                icon={<DkAppDashboardLayoutTiles {...glyph} />}
              />
            </StateCard>
          ))}
          <StateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <Card title={CARD_COPY.title} />
          </StateCard>
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <CardTile href="#card" icon={<DkAppDashboardLayoutTiles {...glyph} />} description="Open the library." />
          </StateCard>
          <StateCard label="Button" align="stretch" wide className="bg-bg-primary">
            <CardTile
              onClick={() => undefined}
              icon={<DkFileFolderDirectory {...glyph} />}
              description="Choose this workspace."
            />
          </StateCard>
          <StateCard label="Selected, brand" align="stretch" wide className="bg-bg-primary">
            <CardTile selected tone="brand" icon={<DkAppDashboardLayoutTiles {...glyph} />} />
          </StateCard>
          <StateCard label="Disabled, danger" align="stretch" wide className="bg-bg-primary">
            <CardTile disabled tone="danger" href="#card" icon={<DkWarningTriangleAlert {...glyph} />} />
          </StateCard>
          <StateCard label="Loading, media" align="stretch" wide className="bg-bg-primary">
            <Card loading media={<CardPhoto />} eyebrow={CARD_COPY.eyebrow} title={CARD_COPY.title} />
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Height">
        <StateGrid columns={1}>
          <StateCard label="Equal height" align="stretch" wide className="bg-bg-primary">
            <div className="grid grid-cols-1 items-stretch gap-3 min-[735px]:grid-cols-2">
              <Card
                fullHeight
                eyebrow="Inbox"
                title="Notes"
                description="A short line."
                footer={
                  <Button size="sm" fullWidth={false}>
                    Open
                  </Button>
                }
              />
              <Card
                fullHeight
                eyebrow={CARD_COPY.eyebrow}
                title={CARD_COPY.title}
                description="Shared files, comments, and reviews in one place. Keep the row even when one card has more to say."
                footer={
                  <Button size="sm" fullWidth={false}>
                    Open
                  </Button>
                }
              />
            </div>
          </StateCard>
          <StateCard label="Unequal height" align="stretch" wide className="bg-bg-primary">
            <div className="grid grid-cols-1 items-start gap-3 min-[735px]:grid-cols-2">
              <Card eyebrow="Inbox" title="Notes" description="A short line." />
              <Card
                eyebrow={CARD_COPY.eyebrow}
                title={CARD_COPY.title}
                description="Shared files, comments, and reviews in one place. Keep the row even when one card has more to say."
              />
            </div>
          </StateCard>
          <StateCard label="Mixed height" align="stretch" wide className="bg-bg-primary">
            <div className="grid h-[260px] grid-cols-1 items-stretch gap-3 min-[735px]:h-[220px] min-[735px]:grid-cols-2">
              <Card
                fullHeight
                eyebrow="Inbox"
                title="Notes"
                description="This card fills the row."
                footer={
                  <Button size="sm" fullWidth={false}>
                    Open
                  </Button>
                }
              />
              <Card eyebrow={CARD_COPY.eyebrow} title={CARD_COPY.title} description="This card hugs its copy." />
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Width">
        <StateGrid columns={1}>
          <StateCard label="Equal width" align="stretch" wide className="bg-bg-primary">
            <div className="grid grid-cols-1 gap-3 min-[735px]:grid-cols-2">
              <Card eyebrow="Inbox" title="Notes" description="A short line." />
              <Card eyebrow={CARD_COPY.eyebrow} title={CARD_COPY.title} description={CARD_COPY.description} />
            </div>
          </StateCard>
          <StateCard label="Unequal width" align="stretch" wide className="bg-bg-primary">
            <div className="flex flex-wrap items-start gap-3">
              <Card fullWidth={false} eyebrow="Inbox" title="Notes" />
              <Card
                fullWidth={false}
                className="max-w-[280px]"
                eyebrow={CARD_COPY.eyebrow}
                title={CARD_COPY.title}
                description={CARD_COPY.description}
              />
            </div>
          </StateCard>
          <StateCard label="Mixed width" align="stretch" wide className="bg-bg-primary">
            <div className="flex flex-col items-stretch gap-3 min-[735px]:flex-row">
              <Card fullWidth={false} fullHeight eyebrow="Inbox" title="Notes" description="Hugs the title." />
              <Card
                fullHeight
                className="min-[735px]:flex-1"
                eyebrow={CARD_COPY.eyebrow}
                title={CARD_COPY.title}
                description="Fills the rest of the row."
              />
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>

      {CARD_VARIANTS.map((variant) => (
        <StateGroup key={`state-${variant}`} title={CARD_VARIANT_LABEL[variant]}>
          <StateGrid columns={2}>
            {CARD_CHROME.map((item) => (
              <StateCard
                key={`${variant}-${item.label}`}
                label={item.label}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <CardTile
                  variant={variant}
                  href="#card"
                  preview={item.preview}
                  selected={item.selected}
                  disabled={item.disabled}
                  loading={item.loading}
                />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}
    </StateStack>
  )
}

const CARD_GRID_ITEMS = [
  { eyebrow: 'Inbox', title: 'Notes', description: 'A short line.' },
  { eyebrow: 'Workspace', title: 'Team library', description: 'Shared files, comments, and reviews in one place.' },
  { eyebrow: 'Review', title: 'Design crit', description: 'Comments and files for this week.' },
  { eyebrow: 'Archive', title: 'Old projects', description: 'Work that has already shipped.' },
] as const

type SampleCardOptions = {
  footer?: boolean
  variant?: CardVariant
  size?: CardSize
  tone?: CardTone
  onDark?: boolean
  media?: boolean
  icon?: boolean
  loading?: boolean
  disabled?: boolean
  selected?: boolean
  preview?: CardPreview
  href?: boolean
}

function sampleCards(count = 3, options: SampleCardOptions = {}) {
  const pressable =
    options.href || options.preview === 'hover' || options.preview === 'focus' || options.preview === 'active'
  return CARD_GRID_ITEMS.slice(0, count).map((item) => (
    <Card
      key={item.title}
      variant={options.variant}
      size={options.size}
      tone={options.tone}
      onDark={options.onDark}
      loading={options.loading}
      disabled={options.disabled}
      selected={options.selected}
      preview={options.preview}
      href={pressable ? '#card-grid' : undefined}
      media={options.media ? <CardPhoto onDark={options.onDark} /> : undefined}
      icon={options.icon ? <DkAppDashboardLayoutTiles {...glyph} /> : undefined}
      eyebrow={item.eyebrow}
      title={item.title}
      description={item.description}
      footer={
        options.footer ? (
          <Button size="sm" fullWidth={false}>
            Open
          </Button>
        ) : undefined
      }
    />
  ))
}

function CardGridDemo() {
  return (
    <CardGrid columns={3} className="w-full">
      {sampleCards(3)}
    </CardGrid>
  )
}

function CardGridStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={1}>
          {CARD_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={CARD_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <CardGrid columns={2}>{sampleCards(2, { variant })}</CardGrid>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={1}>
          {CARD_SIZES.map((size) => (
            <StateCard
              key={size}
              label={CARD_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <CardGrid columns={2}>{sampleCards(2, { size })}</CardGrid>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={1}>
          {CARD_SIZES.map((size) => (
            <StateCard
              key={`pill-${size}`}
              label={CARD_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <CardGrid columns={2}>{sampleCards(2, { variant: 'pill', size })}</CardGrid>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={1}>
          {CARD_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={CARD_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <CardGrid columns={2}>{sampleCards(2, { tone, icon: true })}</CardGrid>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      {CARD_VARIANTS.map((variant) => (
        <StateGroup key={variant} title={`${CARD_VARIANT_LABEL[variant]} tone`}>
          <StateGrid columns={1}>
            {CARD_TONES.map((tone) => (
              <StateCard
                key={`${variant}-${tone}`}
                label={CARD_TONE_LABEL[tone]}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <CardGrid columns={2}>{sampleCards(2, { variant, tone, icon: true })}</CardGrid>
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="On dark">
        <StateGrid columns={1}>
          {CARD_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={CARD_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <CardGrid columns={2}>{sampleCards(2, { variant, onDark: true, icon: true })}</CardGrid>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Media">
        <StateGrid columns={1}>
          {CARD_VARIANTS.map((variant) => (
            <StateCard
              key={`media-${variant}`}
              label={CARD_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <CardGrid columns={2}>{sampleCards(2, { variant, media: true })}</CardGrid>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={1}>
          <StateCard label="Icon" align="stretch" wide className="bg-bg-primary">
            <CardGrid columns={2}>{sampleCards(2, { icon: true })}</CardGrid>
          </StateCard>
          <StateCard label="Media and icon" align="stretch" wide className="bg-bg-primary">
            <CardGrid columns={2}>{sampleCards(2, { media: true, icon: true })}</CardGrid>
          </StateCard>
          <StateCard label="Title only" align="stretch" wide className="bg-bg-primary">
            <CardGrid columns={2}>
              {CARD_GRID_ITEMS.slice(0, 2).map((item) => (
                <Card key={item.title} title={item.title} />
              ))}
            </CardGrid>
          </StateCard>
          <StateCard label="Footer" align="stretch" wide className="bg-bg-primary">
            <CardGrid columns={2}>{sampleCards(2, { footer: true })}</CardGrid>
          </StateCard>
          <StateCard label="Media and footer" align="stretch" wide className="bg-bg-primary">
            <CardGrid columns={2}>{sampleCards(2, { media: true, footer: true })}</CardGrid>
          </StateCard>
          <StateCard label="Mixed appearance" align="stretch" wide className="bg-bg-primary">
            <CardGrid columns={3}>
              {CARD_GRID_ITEMS.slice(0, 3).map((item, index) => (
                <Card
                  key={item.title}
                  variant={CARD_VARIANTS[index]}
                  eyebrow={item.eyebrow}
                  title={item.title}
                  description={item.description}
                  icon={<DkAppDashboardLayoutTiles {...glyph} />}
                />
              ))}
            </CardGrid>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={1}>
          {CARD_CHROME.map((item) => (
            <StateCard
              key={item.label}
              label={item.label}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <CardGrid columns={2}>
                {sampleCards(2, {
                  href: true,
                  preview: item.preview,
                  selected: item.selected,
                  disabled: item.disabled,
                  loading: item.loading,
                  media: item.loading,
                  icon: true,
                })}
              </CardGrid>
            </StateCard>
          ))}
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <CardGrid columns={2}>{sampleCards(2, { href: true, icon: true })}</CardGrid>
          </StateCard>
          <StateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <CardGrid columns={2}>
              {CARD_GRID_ITEMS.slice(0, 2).map((item) => (
                <Card key={item.title} title={item.title} />
              ))}
            </CardGrid>
          </StateCard>
          <StateCard label="Selected, brand" align="stretch" wide className="bg-bg-primary">
            <CardGrid columns={2}>{sampleCards(2, { selected: true, tone: 'brand', icon: true })}</CardGrid>
          </StateCard>
          <StateCard label="Disabled, danger" align="stretch" wide className="bg-bg-primary">
            <CardGrid columns={2}>{sampleCards(2, { disabled: true, tone: 'danger', href: true, icon: true })}</CardGrid>
          </StateCard>
          <StateCard label="Loading, media" align="stretch" wide className="bg-bg-primary">
            <CardGrid columns={2}>{sampleCards(2, { loading: true, media: true })}</CardGrid>
          </StateCard>
          <StateCard label="Mixed" align="stretch" wide className="bg-bg-primary">
            <CardGrid columns={3}>
              <Card
                preview="hover"
                href="#card-grid"
                eyebrow={CARD_GRID_ITEMS[0].eyebrow}
                title={CARD_GRID_ITEMS[0].title}
                description={CARD_GRID_ITEMS[0].description}
                icon={<DkAppDashboardLayoutTiles {...glyph} />}
              />
              <Card
                selected
                eyebrow={CARD_GRID_ITEMS[1].eyebrow}
                title={CARD_GRID_ITEMS[1].title}
                description={CARD_GRID_ITEMS[1].description}
                icon={<DkAppDashboardLayoutTiles {...glyph} />}
              />
              <Card
                disabled
                href="#card-grid"
                eyebrow={CARD_GRID_ITEMS[2].eyebrow}
                title={CARD_GRID_ITEMS[2].title}
                description={CARD_GRID_ITEMS[2].description}
                icon={<DkFileFolderDirectory {...glyph} />}
              />
            </CardGrid>
          </StateCard>
        </StateGrid>
      </StateGroup>

      {CARD_VARIANTS.map((variant) => (
        <StateGroup key={`state-${variant}`} title={CARD_VARIANT_LABEL[variant]}>
          <StateGrid columns={1}>
            {CARD_CHROME.map((item) => (
              <StateCard
                key={`${variant}-${item.label}`}
                label={item.label}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <CardGrid columns={2}>
                  {sampleCards(2, {
                    variant,
                    href: true,
                    preview: item.preview,
                    selected: item.selected,
                    disabled: item.disabled,
                    loading: item.loading,
                    icon: true,
                  })}
                </CardGrid>
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="Columns">
        <StateGrid columns={1}>
          {CARD_GRID_COLUMNS.map((columns) => (
            <StateCard
              key={columns}
              label={CARD_GRID_COLUMN_LABEL[columns]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <CardGrid columns={columns}>{sampleCards(columns === 1 ? 2 : columns)}</CardGrid>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Height">
        <StateGrid columns={1}>
          {CARD_GRID_ALIGNS.map((align) => (
            <StateCard
              key={align}
              label={CARD_GRID_ALIGN_LABEL[align]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <CardGrid columns={2} align={align}>
                {sampleCards(2, { footer: true })}
              </CardGrid>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Width">
        <StateGrid columns={1}>
          {CARD_GRID_WIDTHS.map((widths) => (
            <StateCard
              key={widths}
              label={CARD_GRID_WIDTH_LABEL[widths]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <CardGrid columns={2} widths={widths} align="start">
                {sampleCards(2)}
              </CardGrid>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Gap">
        <StateGrid columns={1}>
          {CARD_GRID_GAPS.map((gap) => (
            <StateCard
              key={gap}
              label={CARD_GRID_GAP_LABEL[gap]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <CardGrid columns={2} gap={gap}>
                {sampleCards(2)}
              </CardGrid>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

const STACK_ITEMS = [
  { title: 'Notes', description: 'A short line.' },
  { title: 'Library', description: 'Shared files in one place.' },
  { title: 'Review', description: 'Comments for this week.' },
] as const

function stackCards(count = 3) {
  return STACK_ITEMS.slice(0, count).map((item) => (
    <Card key={item.title} size="sm" title={item.title} description={item.description} />
  ))
}

const STACK_CHROME: { label: string; preview?: StackPreview; selected?: boolean; disabled?: boolean; loading?: boolean }[] = [
  { label: 'Default' },
  { label: 'Hover', preview: 'hover' },
  { label: 'Focus', preview: 'focus' },
  { label: 'Active', preview: 'active' },
  { label: 'Selected', selected: true },
  { label: 'Disabled', disabled: true },
  { label: 'Loading', loading: true },
]

function StackDemo() {
  return (
    <div className="grid w-full gap-4 min-[735px]:grid-cols-2">
      {STACK_VARIANTS.map((variant) => (
        <Stack key={variant} variant={variant} gap="sm">
          {stackCards(2)}
        </Stack>
      ))}
    </div>
  )
}

function StackStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {STACK_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={STACK_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <Stack variant={variant} gap="sm">
                {stackCards(2)}
              </Stack>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {STACK_SIZES.map((size) => (
            <StateCard
              key={size}
              label={STACK_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <Stack variant="subtle" size={size} gap="sm">
                {stackCards(2)}
              </Stack>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={2}>
          {STACK_SIZES.map((size) => (
            <StateCard
              key={`pill-${size}`}
              label={STACK_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <Stack variant="pill" size={size} gap="sm">
                {stackCards(2)}
              </Stack>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {STACK_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={STACK_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <Stack variant="subtle" tone={tone} gap="sm">
                {stackCards(2)}
              </Stack>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      {STACK_VARIANTS.map((variant) => (
        <StateGroup key={variant} title={`${STACK_VARIANT_LABEL[variant]} tone`}>
          <StateGrid columns={2}>
            {STACK_TONES.map((tone) => (
              <StateCard
                key={`${variant}-${tone}`}
                label={STACK_TONE_LABEL[tone]}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <Stack variant={variant} tone={tone} gap="sm">
                  {stackCards(2)}
                </Stack>
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="On dark">
        <StateGrid columns={2}>
          {STACK_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={STACK_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <Stack variant={variant} onDark gap="sm">
                <Card size="sm" onDark title="Notes" description="A short line." />
                <Card size="sm" onDark title="Library" description="Shared files in one place." />
              </Stack>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Direction">
        <StateGrid columns={1}>
          {STACK_DIRECTIONS.map((direction) => (
            <StateCard
              key={direction}
              label={STACK_DIRECTION_LABEL[direction]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <Stack direction={direction} variant="subtle" gap="sm">
                {stackCards(direction === 'horizontal' ? 2 : 3)}
              </Stack>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Align">
        <StateGrid columns={2}>
          {STACK_ALIGNS.map((align) => (
            <StateCard
              key={align}
              label={STACK_ALIGN_LABEL[align]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <Stack variant="subtle" align={align} gap="sm">
                <Card size="sm" fullWidth={align !== 'stretch'} title="Notes" />
                <Card size="sm" title="Library" description="Shared files in one place." />
              </Stack>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Justify">
        <StateGrid columns={1}>
          {STACK_JUSTIFIES.map((justify) => (
            <StateCard
              key={justify}
              label={STACK_JUSTIFY_LABEL[justify]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <Stack direction="horizontal" variant="subtle" justify={justify} gap="sm" wrap>
                <Card size="sm" fullWidth={false} title="Notes" />
                <Card size="sm" fullWidth={false} title="Library" />
              </Stack>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Gap">
        <StateGrid columns={2}>
          {STACK_GAPS.map((gap) => (
            <StateCard
              key={gap}
              label={STACK_GAP_LABEL[gap]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <Stack variant="subtle" gap={gap}>
                {stackCards(2)}
              </Stack>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={1}>
          <StateCard label="Wrap" align="stretch" wide className="bg-bg-primary">
            <Stack direction="horizontal" variant="subtle" gap="sm" wrap className="max-w-[280px]">
              {stackCards(3)}
            </Stack>
          </StateCard>
          <StateCard label="Actions" align="stretch" wide className="bg-bg-primary">
            <Stack direction="horizontal" gap="sm" align="center">
              <Button size="sm" fullWidth={false}>
                Save
              </Button>
              <Button size="sm" variant="secondary" fullWidth={false}>
                Cancel
              </Button>
            </Stack>
          </StateCard>
          <StateCard label="Hug width" align="stretch" wide className="bg-bg-primary">
            <Stack variant="subtle" fullWidth={false} gap="sm">
              <Card size="sm" fullWidth={false} title="Notes" />
              <Card size="sm" fullWidth={false} title="Library" />
            </Stack>
          </StateCard>
          <StateCard label="Full height" align="stretch" wide className="bg-bg-primary">
            <div className="flex h-[220px] items-stretch gap-3">
              <Stack variant="subtle" fullHeight gap="sm" className="flex-1">
                {stackCards(2)}
              </Stack>
              <Stack variant="outline" fullHeight justify="between" gap="sm" className="flex-1">
                <Card size="sm" title="Notes" description="A short line." />
                <Card size="sm" title="Library" description="Pushed to the end of the column." />
              </Stack>
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          {STACK_CHROME.map((item) => (
            <StateCard
              key={item.label}
              label={item.label}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <Stack
                variant="subtle"
                href="#stack"
                preview={item.preview}
                selected={item.selected}
                disabled={item.disabled}
                loading={item.loading}
                gap="sm"
              >
                {stackCards(2)}
              </Stack>
            </StateCard>
          ))}
          <StateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <Stack variant="subtle" gap="sm" />
          </StateCard>
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <Stack variant="subtle" href="#stack" gap="sm">
              {stackCards(2)}
            </Stack>
          </StateCard>
          <StateCard label="Button" align="stretch" wide className="bg-bg-primary">
            <Stack variant="subtle" onClick={() => undefined} gap="sm">
              {stackCards(2)}
            </Stack>
          </StateCard>
          <StateCard label="Selected, brand" align="stretch" wide className="bg-bg-primary">
            <Stack variant="subtle" selected tone="brand" gap="sm">
              {stackCards(2)}
            </Stack>
          </StateCard>
          <StateCard label="Disabled, danger" align="stretch" wide className="bg-bg-primary">
            <Stack variant="subtle" disabled tone="danger" href="#stack" gap="sm">
              {stackCards(2)}
            </Stack>
          </StateCard>
        </StateGrid>
      </StateGroup>

      {STACK_VARIANTS.map((variant) => (
        <StateGroup key={`state-${variant}`} title={STACK_VARIANT_LABEL[variant]}>
          <StateGrid columns={2}>
            {STACK_CHROME.map((item) => (
              <StateCard
                key={`${variant}-${item.label}`}
                label={item.label}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <Stack
                  variant={variant}
                  href="#stack"
                  preview={item.preview}
                  selected={item.selected}
                  disabled={item.disabled}
                  loading={item.loading}
                  gap="sm"
                >
                  {stackCards(2)}
                </Stack>
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}
    </StateStack>
  )
}

const USAGE_PROSE =
  'Usage is the how-to block for a feature or a flow. Start with one paragraph that says what to do, then list the three rules, then close with do and don’t. Keep the copy long enough to read as a sentence, not a label.'
const USAGE_PRINCIPLES = [
  {
    title: 'Order',
    body: 'Body, then principles, then do and don’t. Related links sit outside the block so this group stays one job.',
  },
  {
    title: 'One card per line',
    body: 'Each principle and each do or don’t card fills the row. The number sits beside the copy so the line can run without wrapping into a tight column.',
  },
  {
    title: 'One job',
    body: 'A usage block explains the thing on the page. Do not mix a metric, a form, or a live demo into it.',
  },
]
const USAGE_DO = [
  'Start with one short paragraph that a person can read after the heading.',
  'Put three principles on their own rows, then close with do and don’t.',
]
const USAGE_DONT = [
  'Do not pack three principles into one row. The copy wraps and the block feels cramped.',
  'Do not skip Body to jump to do and don’t.',
]

function UsageTile(props: UsageProps) {
  return (
    <Usage
      prose={USAGE_PROSE}
      principles={USAGE_PRINCIPLES}
      doItems={USAGE_DO}
      dontItems={USAGE_DONT}
      {...props}
    />
  )
}

const USAGE_CHROME: { label: string; preview?: UsagePreview; selected?: boolean; disabled?: boolean; loading?: boolean }[] = [
  { label: 'Default' },
  { label: 'Hover', preview: 'hover' },
  { label: 'Focus', preview: 'focus' },
  { label: 'Active', preview: 'active' },
  { label: 'Selected', selected: true },
  { label: 'Disabled', disabled: true },
  { label: 'Loading', loading: true },
]

function UsageDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      {USAGE_VARIANTS.map((variant) => (
        <UsageTile key={variant} variant={variant} />
      ))}
    </div>
  )
}

function UsageStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={1}>
          {USAGE_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={USAGE_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <UsageTile variant={variant} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={1}>
          {USAGE_SIZES.map((size) => (
            <StateCard
              key={size}
              label={USAGE_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <UsageTile variant="subtle" size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={1}>
          {USAGE_SIZES.map((size) => (
            <StateCard
              key={`pill-${size}`}
              label={USAGE_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <UsageTile variant="pill" size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={1}>
          {USAGE_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={USAGE_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <UsageTile variant="subtle" tone={tone} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      {USAGE_VARIANTS.map((variant) => (
        <StateGroup key={variant} title={`${USAGE_VARIANT_LABEL[variant]} tone`}>
          <StateGrid columns={1}>
            {USAGE_TONES.map((tone) => (
              <StateCard
                key={`${variant}-${tone}`}
                label={USAGE_TONE_LABEL[tone]}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <UsageTile variant={variant} tone={tone} />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="On dark">
        <StateGrid columns={1}>
          {USAGE_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={USAGE_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <UsageTile variant={variant} onDark />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={1}>
          {USAGE_LAYOUTS.map((layout) => (
            <StateCard
              key={layout}
              label={USAGE_LAYOUT_LABEL[layout]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <UsageTile variant="subtle" layout={layout} />
            </StateCard>
          ))}
          <StateCard label="Title" align="stretch" wide className="bg-bg-primary">
            <UsageTile variant="subtle" eyebrow="Library" title="How to share a file" />
          </StateCard>
          <StateCard label="Body only" align="stretch" wide className="bg-bg-primary">
            <Usage variant="subtle" prose={USAGE_PROSE} />
          </StateCard>
          <StateCard label="Principles only" align="stretch" wide className="bg-bg-primary">
            <Usage variant="subtle" principles={USAGE_PRINCIPLES} />
          </StateCard>
          <StateCard label="Do and don’t only" align="stretch" wide className="bg-bg-primary">
            <Usage variant="subtle" doItems={USAGE_DO} dontItems={USAGE_DONT} />
          </StateCard>
          <StateCard label="Hug width" align="stretch" wide className="bg-bg-primary">
            <Usage variant="subtle" fullWidth={false} prose={USAGE_PROSE} principles={USAGE_PRINCIPLES.slice(0, 1)} />
          </StateCard>
          <StateCard label="Full height" align="stretch" wide className="bg-bg-primary">
            <div className="flex min-h-[280px] items-stretch">
              <UsageTile variant="subtle" fullHeight />
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Gap">
        <StateGrid columns={1}>
          {USAGE_GAPS.map((gap) => (
            <StateCard
              key={gap}
              label={USAGE_GAP_LABEL[gap]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <UsageTile variant="subtle" gap={gap} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={1}>
          {USAGE_CHROME.map((item) => (
            <StateCard
              key={item.label}
              label={item.label}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <UsageTile
                variant="subtle"
                href="#usage"
                preview={item.preview}
                selected={item.selected}
                disabled={item.disabled}
                loading={item.loading}
              />
            </StateCard>
          ))}
          <StateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <Usage variant="subtle" />
          </StateCard>
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <UsageTile variant="subtle" href="#usage" />
          </StateCard>
          <StateCard label="Button" align="stretch" wide className="bg-bg-primary">
            <UsageTile variant="subtle" onClick={() => undefined} />
          </StateCard>
          <StateCard label="Selected, brand" align="stretch" wide className="bg-bg-primary">
            <UsageTile variant="subtle" selected tone="brand" />
          </StateCard>
          <StateCard label="Disabled, danger" align="stretch" wide className="bg-bg-primary">
            <UsageTile variant="subtle" disabled tone="danger" href="#usage" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      {USAGE_VARIANTS.map((variant) => (
        <StateGroup key={`state-${variant}`} title={USAGE_VARIANT_LABEL[variant]}>
          <StateGrid columns={1}>
            {USAGE_CHROME.map((item) => (
              <StateCard
                key={`${variant}-${item.label}`}
                label={item.label}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <UsageTile
                  variant={variant}
                  href="#usage"
                  preview={item.preview}
                  selected={item.selected}
                  disabled={item.disabled}
                  loading={item.loading}
                />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}
    </StateStack>
  )
}

const TOKEN_GROUP_SAMPLES = ['brand-primary', 'text-primary', 'bg-secondary', 'border-default'] as const

function TokenChip({ token, onDark }: { token: string; onDark?: boolean }) {
  return (
    <div
      className={cn(
        'min-w-0 overflow-hidden rounded-[12px] border',
        onDark ? 'border-[#38383a]' : 'border-border-default',
      )}
    >
      <div
        className={cn('h-12 border-b', onDark ? 'border-[#2c2c2e]' : 'border-border-subtle')}
        style={{ background: `var(--${token})` }}
      />
      <p
        className={cn(
          'm-0 truncate px-2 py-1.5 font-mono text-[11px]',
          onDark ? 'text-[#a1a1a6]' : 'text-text-secondary',
        )}
      >
        --{token}
      </p>
    </div>
  )
}

function tokenChips(onDark?: boolean) {
  return TOKEN_GROUP_SAMPLES.map((token) => <TokenChip key={token} token={token} onDark={onDark} />)
}

function TokenGroupTile({
  title = 'Brand',
  note = 'The only interactive accent.',
  columns = 4,
  onDark,
  children,
  ...props
}: TokenGroupProps) {
  return (
    <TokenGroup title={title} note={note} columns={columns} onDark={onDark} {...props}>
      {children ?? tokenChips(onDark)}
    </TokenGroup>
  )
}

const TOKEN_GROUP_CHROME: {
  label: string
  preview?: TokenGroupPreview
  selected?: boolean
  disabled?: boolean
  loading?: boolean
}[] = [
  { label: 'Default' },
  { label: 'Hover', preview: 'hover' },
  { label: 'Focus', preview: 'focus' },
  { label: 'Active', preview: 'active' },
  { label: 'Selected', selected: true },
  { label: 'Disabled', disabled: true },
  { label: 'Loading', loading: true },
]

function TokenGroupDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      {TOKEN_GROUP_VARIANTS.map((variant) => (
        <TokenGroupTile key={variant} variant={variant} />
      ))}
    </div>
  )
}

function TokenGroupStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={1}>
          {TOKEN_GROUP_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={TOKEN_GROUP_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <TokenGroupTile variant={variant} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={1}>
          {TOKEN_GROUP_SIZES.map((size) => (
            <StateCard
              key={size}
              label={TOKEN_GROUP_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <TokenGroupTile variant="subtle" size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={1}>
          {TOKEN_GROUP_SIZES.map((size) => (
            <StateCard
              key={`pill-${size}`}
              label={TOKEN_GROUP_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <TokenGroupTile variant="pill" size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={1}>
          {TOKEN_GROUP_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={TOKEN_GROUP_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <TokenGroupTile variant="subtle" tone={tone} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      {TOKEN_GROUP_VARIANTS.map((variant) => (
        <StateGroup key={variant} title={`${TOKEN_GROUP_VARIANT_LABEL[variant]} tone`}>
          <StateGrid columns={1}>
            {TOKEN_GROUP_TONES.map((tone) => (
              <StateCard
                key={`${variant}-${tone}`}
                label={TOKEN_GROUP_TONE_LABEL[tone]}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <TokenGroupTile variant={variant} tone={tone} />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="On dark">
        <StateGrid columns={1}>
          {TOKEN_GROUP_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={TOKEN_GROUP_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <TokenGroupTile variant={variant} onDark />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={1}>
          {TOKEN_GROUP_COLUMNS.map((columns) => (
            <StateCard
              key={columns}
              label={TOKEN_GROUP_COLUMN_LABEL[columns]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <TokenGroupTile variant="subtle" columns={columns} />
            </StateCard>
          ))}
          <StateCard label="Title" align="stretch" wide className="bg-bg-primary">
            <TokenGroupTile variant="subtle" note="" />
          </StateCard>
          <StateCard label="Note" align="stretch" wide className="bg-bg-primary">
            <TokenGroupTile variant="subtle" title="" />
          </StateCard>
          <StateCard label="Samples only" align="stretch" wide className="bg-bg-primary">
            <TokenGroupTile variant="subtle" title="" note="" />
          </StateCard>
          <StateCard label="Ungrouped children" align="stretch" wide className="bg-bg-primary">
            <TokenGroup variant="subtle" title="Brand" note="The only interactive accent.">
              <div className="flex w-full flex-col gap-3">{tokenChips()}</div>
            </TokenGroup>
          </StateCard>
          <StateCard label="Hug width" align="stretch" wide className="bg-bg-primary">
            <TokenGroupTile variant="subtle" fullWidth={false} columns={2} />
          </StateCard>
          <StateCard label="Full height" align="stretch" wide className="bg-bg-primary">
            <div className="flex min-h-[240px] items-stretch">
              <TokenGroupTile variant="subtle" fullHeight />
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Gap">
        <StateGrid columns={1}>
          {TOKEN_GROUP_GAPS.map((gap) => (
            <StateCard
              key={gap}
              label={TOKEN_GROUP_GAP_LABEL[gap]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <TokenGroupTile variant="subtle" gap={gap} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={1}>
          {TOKEN_GROUP_CHROME.map((item) => (
            <StateCard
              key={item.label}
              label={item.label}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <TokenGroupTile
                variant="subtle"
                href="#token-group"
                preview={item.preview}
                selected={item.selected}
                disabled={item.disabled}
                loading={item.loading}
              />
            </StateCard>
          ))}
          <StateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <TokenGroup variant="subtle" />
          </StateCard>
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <TokenGroupTile variant="subtle" href="#token-group" />
          </StateCard>
          <StateCard label="Button" align="stretch" wide className="bg-bg-primary">
            <TokenGroupTile variant="subtle" onClick={() => undefined} />
          </StateCard>
          <StateCard label="Selected, brand" align="stretch" wide className="bg-bg-primary">
            <TokenGroupTile variant="subtle" selected tone="brand" />
          </StateCard>
          <StateCard label="Disabled, danger" align="stretch" wide className="bg-bg-primary">
            <TokenGroupTile variant="subtle" disabled tone="danger" href="#token-group" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      {TOKEN_GROUP_VARIANTS.map((variant) => (
        <StateGroup key={`state-${variant}`} title={TOKEN_GROUP_VARIANT_LABEL[variant]}>
          <StateGrid columns={1}>
            {TOKEN_GROUP_CHROME.map((item) => (
              <StateCard
                key={`${variant}-${item.label}`}
                label={item.label}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <TokenGroupTile
                  variant={variant}
                  href="#token-group"
                  preview={item.preview}
                  selected={item.selected}
                  disabled={item.disabled}
                  loading={item.loading}
                />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}
    </StateStack>
  )
}

function StateCardSample({ onDark }: { onDark?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex h-11 items-center justify-center rounded-[980px] px-[22px] text-[17px] font-medium leading-none text-white',
        onDark ? 'bg-[#3b9eff]' : 'bg-brand-primary',
      )}
    >
      Button
    </span>
  )
}

function StateCardTile({
  label = 'Default',
  onDark,
  children,
  ...props
}: StateCardProps) {
  return (
    <KitStateCard label={label} onDark={onDark} {...props}>
      {children ?? <StateCardSample onDark={onDark} />}
    </KitStateCard>
  )
}

const STATE_CARD_CHROME: {
  label: string
  preview?: StateCardPreview
  selected?: boolean
  disabled?: boolean
  loading?: boolean
}[] = [
  { label: 'Default' },
  { label: 'Hover', preview: 'hover' },
  { label: 'Focus', preview: 'focus' },
  { label: 'Active', preview: 'active' },
  { label: 'Selected', selected: true },
  { label: 'Disabled', disabled: true },
  { label: 'Loading', loading: true },
]

function StateCardDemo() {
  return (
    <div className="grid w-full gap-4 min-[735px]:grid-cols-2">
      {STATE_CARD_VARIANTS.map((variant) => (
        <StateCardTile key={variant} variant={variant} label={STATE_CARD_VARIANT_LABEL[variant]} />
      ))}
    </div>
  )
}

function StateCardStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {STATE_CARD_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={STATE_CARD_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateCardTile variant={variant} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {STATE_CARD_SIZES.map((size) => (
            <StateCard
              key={size}
              label={STATE_CARD_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateCardTile size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={2}>
          {STATE_CARD_SIZES.map((size) => (
            <StateCard
              key={`pill-${size}`}
              label={STATE_CARD_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateCardTile variant="pill" size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {STATE_CARD_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={STATE_CARD_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateCardTile tone={tone} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      {STATE_CARD_VARIANTS.map((variant) => (
        <StateGroup key={variant} title={`${STATE_CARD_VARIANT_LABEL[variant]} tone`}>
          <StateGrid columns={2}>
            {STATE_CARD_TONES.map((tone) => (
              <StateCard
                key={`${variant}-${tone}`}
                label={STATE_CARD_TONE_LABEL[tone]}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <StateCardTile variant={variant} tone={tone} />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="On dark">
        <StateGrid columns={2}>
          {STATE_CARD_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={STATE_CARD_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <StateCardTile variant={variant} onDark />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={2}>
          {STATE_CARD_ALIGNS.map((align) => (
            <StateCard
              key={align}
              label={STATE_CARD_ALIGN_LABEL[align]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              {align === 'stretch' ? (
                <StateCardTile align="stretch" label="Stretch">
                  <TextField placeholder="Email" />
                </StateCardTile>
              ) : (
                <StateCardTile align={align} label={STATE_CARD_ALIGN_LABEL[align]} />
              )}
            </StateCard>
          ))}
          <StateCard label="Wide" align="stretch" wide className="bg-bg-primary">
            <StateCardTile align="stretch" wide label="Wide">
              <TextField placeholder="Email" />
            </StateCardTile>
          </StateCard>
          <StateCard label="Label" align="stretch" wide className="bg-bg-primary">
            <KitStateCard variant="subtle" label="Default" />
          </StateCard>
          <StateCard label="Sample only" align="stretch" wide className="bg-bg-primary">
            <KitStateCard>
              <StateCardSample />
            </KitStateCard>
          </StateCard>
          <StateCard label="Inert" align="stretch" wide className="bg-bg-primary">
            <StateCardTile inert label="Inert" />
          </StateCard>
          <StateCard label="Hug width" align="stretch" wide className="bg-bg-primary">
            <StateCardTile fullWidth={false} />
          </StateCard>
          <StateCard label="Full height" align="stretch" wide className="bg-bg-primary">
            <div className="flex min-h-[240px] items-stretch">
              <StateCardTile fullHeight />
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Gap">
        <StateGrid columns={2}>
          {STATE_CARD_GAPS.map((gap) => (
            <StateCard
              key={gap}
              label={STATE_CARD_GAP_LABEL[gap]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateCardTile gap={gap} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          {STATE_CARD_CHROME.map((item) => (
            <StateCard
              key={item.label}
              label={item.label}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateCardTile
                href="#state-card"
                preview={item.preview}
                selected={item.selected}
                disabled={item.disabled}
                loading={item.loading}
              />
            </StateCard>
          ))}
          <StateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <KitStateCard />
          </StateCard>
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <StateCardTile href="#state-card" />
          </StateCard>
          <StateCard label="Button" align="stretch" wide className="bg-bg-primary">
            <StateCardTile onClick={() => undefined} />
          </StateCard>
          <StateCard label="Selected, brand" align="stretch" wide className="bg-bg-primary">
            <StateCardTile selected tone="brand" />
          </StateCard>
          <StateCard label="Disabled, danger" align="stretch" wide className="bg-bg-primary">
            <StateCardTile disabled tone="danger" href="#state-card" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      {STATE_CARD_VARIANTS.map((variant) => (
        <StateGroup key={`state-${variant}`} title={STATE_CARD_VARIANT_LABEL[variant]}>
          <StateGrid columns={2}>
            {STATE_CARD_CHROME.map((item) => (
              <StateCard
                key={`${variant}-${item.label}`}
                label={item.label}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <StateCardTile
                  variant={variant}
                  href="#state-card"
                  preview={item.preview}
                  selected={item.selected}
                  disabled={item.disabled}
                  loading={item.loading}
                />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}
    </StateStack>
  )
}

const STATE_GRID_LABELS = ['Default', 'Hover', 'Focus', 'Active', 'Disabled', 'Loading'] as const

function tileCount(columns: 1 | 2 | 3 | 4 | 6 = 3) {
  if (columns === 1) return 2
  if (columns === 6) return 6
  return columns
}

function sampleStateCards(count = 3, options: Omit<StateCardProps, 'label' | 'children'> = {}) {
  const { onDark, ...rest } = options
  return STATE_GRID_LABELS.slice(0, count).map((label) => (
    <KitStateCard key={label} label={label} onDark={onDark} {...rest}>
      <StateCardSample onDark={onDark} />
    </KitStateCard>
  ))
}

function StateGridTile({
  columns = 3,
  onDark,
  children,
  ...props
}: StateGridProps) {
  return (
    <KitStateGrid columns={columns} onDark={onDark} {...props}>
      {children ?? sampleStateCards(tileCount(columns), { onDark })}
    </KitStateGrid>
  )
}

const STATE_GRID_CHROME: {
  label: string
  preview?: StateGridPreview
  selected?: boolean
  disabled?: boolean
  loading?: boolean
}[] = [
  { label: 'Default' },
  { label: 'Hover', preview: 'hover' },
  { label: 'Focus', preview: 'focus' },
  { label: 'Active', preview: 'active' },
  { label: 'Selected', selected: true },
  { label: 'Disabled', disabled: true },
  { label: 'Loading', loading: true },
]

function StateGridDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      {STATE_GRID_VARIANTS.map((variant) => (
        <StateGridTile key={variant} variant={variant} columns={3} />
      ))}
    </div>
  )
}

function StateGridStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={1}>
          {STATE_GRID_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={STATE_GRID_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGridTile variant={variant} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={1}>
          {STATE_GRID_SIZES.map((size) => (
            <StateCard
              key={size}
              label={STATE_GRID_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGridTile variant="subtle" size={size} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={1}>
          {STATE_GRID_SIZES.map((size) => (
            <StateCard
              key={`pill-${size}`}
              label={STATE_GRID_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGridTile variant="pill" size={size} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={1}>
          {STATE_GRID_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={STATE_GRID_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGridTile variant="subtle" tone={tone} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      {STATE_GRID_VARIANTS.map((variant) => (
        <StateGroup key={variant} title={`${STATE_GRID_VARIANT_LABEL[variant]} tone`}>
          <StateGrid columns={1}>
            {STATE_GRID_TONES.map((tone) => (
              <StateCard
                key={`${variant}-${tone}`}
                label={STATE_GRID_TONE_LABEL[tone]}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <StateGridTile variant={variant} tone={tone} columns={2} />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="On dark">
        <StateGrid columns={1}>
          {STATE_GRID_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={STATE_GRID_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <StateGridTile variant={variant} onDark columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={1}>
          <StateCard label="Mixed appearance" align="stretch" wide className="bg-bg-primary">
            <KitStateGrid columns={3}>
              {STATE_CARD_VARIANTS.slice(0, 3).map((variant) => (
                <KitStateCard key={variant} variant={variant} label={STATE_CARD_VARIANT_LABEL[variant]}>
                  <StateCardSample />
                </KitStateCard>
              ))}
            </KitStateGrid>
          </StateCard>
          <StateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <KitStateGrid variant="subtle" columns={2} />
          </StateCard>
          <StateCard label="Hug width" align="stretch" wide className="bg-bg-primary">
            <StateGridTile variant="subtle" fullWidth={false} columns={2} />
          </StateCard>
          <StateCard label="Full height" align="stretch" wide className="bg-bg-primary">
            <div className="flex min-h-[240px] items-stretch">
              <StateGridTile variant="subtle" fullHeight columns={2} />
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Columns">
        <StateGrid columns={1}>
          {STATE_GRID_COLUMNS.map((columns) => (
            <StateCard
              key={columns}
              label={STATE_GRID_COLUMN_LABEL[columns]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGridTile variant="subtle" columns={columns} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Height">
        <StateGrid columns={1}>
          {STATE_GRID_ALIGNS.map((align) => (
            <StateCard
              key={align}
              label={STATE_GRID_ALIGN_LABEL[align]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGridTile variant="subtle" align={align} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Width">
        <StateGrid columns={1}>
          {STATE_GRID_WIDTHS.map((widths) => (
            <StateCard
              key={widths}
              label={STATE_GRID_WIDTH_LABEL[widths]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGridTile variant="subtle" widths={widths} align="start" columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Gap">
        <StateGrid columns={1}>
          {STATE_GRID_GAPS.map((gap) => (
            <StateCard
              key={gap}
              label={STATE_GRID_GAP_LABEL[gap]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGridTile variant="subtle" gap={gap} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={1}>
          {STATE_GRID_CHROME.map((item) => (
            <StateCard
              key={item.label}
              label={item.label}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGridTile
                variant="subtle"
                columns={2}
                href="#state-grid"
                preview={item.preview}
                selected={item.selected}
                disabled={item.disabled}
                loading={item.loading}
              />
            </StateCard>
          ))}
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <StateGridTile variant="subtle" columns={2} href="#state-grid" />
          </StateCard>
          <StateCard label="Button" align="stretch" wide className="bg-bg-primary">
            <StateGridTile variant="subtle" columns={2} onClick={() => undefined} />
          </StateCard>
          <StateCard label="Selected, brand" align="stretch" wide className="bg-bg-primary">
            <StateGridTile variant="subtle" columns={2} selected tone="brand" />
          </StateCard>
          <StateCard label="Disabled, danger" align="stretch" wide className="bg-bg-primary">
            <StateGridTile variant="subtle" columns={2} disabled tone="danger" href="#state-grid" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      {STATE_GRID_VARIANTS.map((variant) => (
        <StateGroup key={`state-${variant}`} title={STATE_GRID_VARIANT_LABEL[variant]}>
          <StateGrid columns={1}>
            {STATE_GRID_CHROME.map((item) => (
              <StateCard
                key={`${variant}-${item.label}`}
                label={item.label}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <StateGridTile
                  variant={variant}
                  columns={2}
                  href="#state-grid"
                  preview={item.preview}
                  selected={item.selected}
                  disabled={item.disabled}
                  loading={item.loading}
                />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}
    </StateStack>
  )
}

function StateGroupTile({
  title = 'Appearance',
  columns = 3,
  onDark,
  children,
  ...props
}: StateGroupProps) {
  return (
    <KitStateGroup title={title} columns={columns} onDark={onDark} {...props}>
      {children ?? sampleStateCards(tileCount(columns), { onDark })}
    </KitStateGroup>
  )
}

const STATE_GROUP_CHROME: {
  label: string
  preview?: StateGroupPreview
  selected?: boolean
  disabled?: boolean
  loading?: boolean
}[] = [
  { label: 'Default' },
  { label: 'Hover', preview: 'hover' },
  { label: 'Focus', preview: 'focus' },
  { label: 'Active', preview: 'active' },
  { label: 'Selected', selected: true },
  { label: 'Disabled', disabled: true },
  { label: 'Loading', loading: true },
]

function StateGroupDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      {STATE_GROUP_VARIANTS.map((variant) => (
        <StateGroupTile key={variant} variant={variant} columns={3} />
      ))}
    </div>
  )
}

function StateGroupStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={1}>
          {STATE_GROUP_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={STATE_GROUP_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGroupTile variant={variant} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={1}>
          {STATE_GROUP_SIZES.map((size) => (
            <StateCard
              key={size}
              label={STATE_GROUP_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGroupTile variant="subtle" size={size} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={1}>
          {STATE_GROUP_SIZES.map((size) => (
            <StateCard
              key={`pill-${size}`}
              label={STATE_GROUP_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGroupTile variant="pill" size={size} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={1}>
          {STATE_GROUP_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={STATE_GROUP_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGroupTile variant="subtle" tone={tone} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      {STATE_GROUP_VARIANTS.map((variant) => (
        <StateGroup key={variant} title={`${STATE_GROUP_VARIANT_LABEL[variant]} tone`}>
          <StateGrid columns={1}>
            {STATE_GROUP_TONES.map((tone) => (
              <StateCard
                key={`${variant}-${tone}`}
                label={STATE_GROUP_TONE_LABEL[tone]}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <StateGroupTile variant={variant} tone={tone} columns={2} />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="On dark">
        <StateGrid columns={1}>
          {STATE_GROUP_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={STATE_GROUP_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <StateGroupTile variant={variant} onDark columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={1}>
          <StateCard label="Title" align="stretch" wide className="bg-bg-primary">
            <KitStateGroup variant="subtle" title="Appearance" />
          </StateCard>
          <StateCard label="Grid only" align="stretch" wide className="bg-bg-primary">
            <KitStateGroup variant="subtle" columns={2} title="">
              {sampleStateCards(2)}
            </KitStateGroup>
          </StateCard>
          <StateCard label="Ungrouped children" align="stretch" wide className="bg-bg-primary">
            <KitStateGroup variant="subtle" title="Appearance">
              <KitStateGrid columns={2}>{sampleStateCards(2)}</KitStateGrid>
            </KitStateGroup>
          </StateCard>
          <StateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <KitStateGroup variant="subtle" />
          </StateCard>
          <StateCard label="Hug width" align="stretch" wide className="bg-bg-primary">
            <StateGroupTile variant="subtle" fullWidth={false} columns={2} />
          </StateCard>
          <StateCard label="Full height" align="stretch" wide className="bg-bg-primary">
            <div className="flex min-h-[240px] items-stretch">
              <StateGroupTile variant="subtle" fullHeight columns={2} />
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Columns">
        <StateGrid columns={1}>
          {STATE_GROUP_COLUMNS.map((columns) => (
            <StateCard
              key={columns}
              label={STATE_GROUP_COLUMN_LABEL[columns]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGroupTile variant="subtle" columns={columns} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Height">
        <StateGrid columns={1}>
          {STATE_GROUP_ALIGNS.map((align) => (
            <StateCard
              key={align}
              label={STATE_GROUP_ALIGN_LABEL[align]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGroupTile variant="subtle" align={align} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Width">
        <StateGrid columns={1}>
          {STATE_GROUP_WIDTHS.map((widths) => (
            <StateCard
              key={widths}
              label={STATE_GROUP_WIDTH_LABEL[widths]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGroupTile variant="subtle" widths={widths} align="start" columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Gap">
        <StateGrid columns={1}>
          {STATE_GROUP_GAPS.map((gap) => (
            <StateCard
              key={gap}
              label={STATE_GROUP_GAP_LABEL[gap]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGroupTile variant="subtle" gap={gap} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={1}>
          {STATE_GROUP_CHROME.map((item) => (
            <StateCard
              key={item.label}
              label={item.label}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StateGroupTile
                variant="subtle"
                columns={2}
                href="#state-group"
                preview={item.preview}
                selected={item.selected}
                disabled={item.disabled}
                loading={item.loading}
              />
            </StateCard>
          ))}
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <StateGroupTile variant="subtle" columns={2} href="#state-group" />
          </StateCard>
          <StateCard label="Button" align="stretch" wide className="bg-bg-primary">
            <StateGroupTile variant="subtle" columns={2} onClick={() => undefined} />
          </StateCard>
          <StateCard label="Selected, brand" align="stretch" wide className="bg-bg-primary">
            <StateGroupTile variant="subtle" columns={2} selected tone="brand" />
          </StateCard>
          <StateCard label="Disabled, danger" align="stretch" wide className="bg-bg-primary">
            <StateGroupTile variant="subtle" columns={2} disabled tone="danger" href="#state-group" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      {STATE_GROUP_VARIANTS.map((variant) => (
        <StateGroup key={`state-${variant}`} title={STATE_GROUP_VARIANT_LABEL[variant]}>
          <StateGrid columns={1}>
            {STATE_GROUP_CHROME.map((item) => (
              <StateCard
                key={`${variant}-${item.label}`}
                label={item.label}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <StateGroupTile
                  variant={variant}
                  columns={2}
                  href="#state-group"
                  preview={item.preview}
                  selected={item.selected}
                  disabled={item.disabled}
                  loading={item.loading}
                />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}
    </StateStack>
  )
}

function SwatchTile({
  token = 'brand-primary',
  ...props
}: SwatchProps) {
  return <Swatch token={token} {...props} />
}

const SWATCH_CHROME: {
  label: string
  preview?: SwatchPreview
  selected?: boolean
  disabled?: boolean
  loading?: boolean
}[] = [
  { label: 'Default' },
  { label: 'Hover', preview: 'hover' },
  { label: 'Focus', preview: 'focus' },
  { label: 'Active', preview: 'active' },
  { label: 'Selected', selected: true },
  { label: 'Disabled', disabled: true },
  { label: 'Loading', loading: true },
]

const SWATCH_SAMPLE_TOKENS = [
  'brand-primary',
  'text-primary',
  'bg-secondary',
  'border-default',
  'success',
  'danger',
] as const

function SwatchDemo() {
  return (
    <div className="grid w-full gap-4 min-[735px]:grid-cols-2">
      {SWATCH_VARIANTS.map((variant) => (
        <SwatchTile key={variant} variant={variant} />
      ))}
    </div>
  )
}

function SwatchStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {SWATCH_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={SWATCH_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SwatchTile variant={variant} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {SWATCH_SIZES.map((size) => (
            <StateCard
              key={size}
              label={SWATCH_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SwatchTile size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={2}>
          {SWATCH_SIZES.map((size) => (
            <StateCard
              key={`pill-${size}`}
              label={SWATCH_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SwatchTile variant="pill" size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {SWATCH_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={SWATCH_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SwatchTile tone={tone} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      {SWATCH_VARIANTS.map((variant) => (
        <StateGroup key={variant} title={`${SWATCH_VARIANT_LABEL[variant]} tone`}>
          <StateGrid columns={2}>
            {SWATCH_TONES.map((tone) => (
              <StateCard
                key={`${variant}-${tone}`}
                label={SWATCH_TONE_LABEL[tone]}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <SwatchTile variant={variant} tone={tone} />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="On dark">
        <StateGrid columns={2}>
          {SWATCH_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={SWATCH_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <SwatchTile variant={variant} onDark />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={2}>
          {SWATCH_SAMPLE_TOKENS.map((token) => (
            <StateCard key={token} label={token} align="stretch" wide className="bg-bg-primary">
              <SwatchTile token={token} />
            </StateCard>
          ))}
          <StateCard label="Fill only" align="stretch" wide className="bg-bg-primary">
            <SwatchTile named={false} />
          </StateCard>
          <StateCard label="Custom name" align="stretch" wide className="bg-bg-primary">
            <SwatchTile name="Brand" />
          </StateCard>
          <StateCard label="Hug width" align="stretch" wide className="bg-bg-primary">
            <SwatchTile fullWidth={false} className="w-[160px]" />
          </StateCard>
          <StateCard label="Full height" align="stretch" wide className="bg-bg-primary">
            <div className="flex min-h-[200px] items-stretch">
              <SwatchTile fullHeight />
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          {SWATCH_CHROME.map((item) => (
            <StateCard
              key={item.label}
              label={item.label}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SwatchTile
                href="#swatch"
                preview={item.preview}
                selected={item.selected}
                disabled={item.disabled}
                loading={item.loading}
              />
            </StateCard>
          ))}
          <StateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <Swatch />
          </StateCard>
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <SwatchTile href="#swatch" />
          </StateCard>
          <StateCard label="Button" align="stretch" wide className="bg-bg-primary">
            <SwatchTile onClick={() => undefined} />
          </StateCard>
          <StateCard label="Selected, brand" align="stretch" wide className="bg-bg-primary">
            <SwatchTile selected tone="brand" />
          </StateCard>
          <StateCard label="Disabled, danger" align="stretch" wide className="bg-bg-primary">
            <SwatchTile disabled tone="danger" href="#swatch" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      {SWATCH_VARIANTS.map((variant) => (
        <StateGroup key={`state-${variant}`} title={SWATCH_VARIANT_LABEL[variant]}>
          <StateGrid columns={2}>
            {SWATCH_CHROME.map((item) => (
              <StateCard
                key={`${variant}-${item.label}`}
                label={item.label}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <SwatchTile
                  variant={variant}
                  href="#swatch"
                  preview={item.preview}
                  selected={item.selected}
                  disabled={item.disabled}
                  loading={item.loading}
                />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}
    </StateStack>
  )
}

const SWATCH_GRID_FAMILY = ['brand-primary', 'success', 'warning', 'danger'] as const
const SWATCH_GRID_SIX = [
  'brand-primary',
  'brand-primary-hover',
  'success',
  'warning',
  'danger',
  'text-primary',
] as const

function swatchGridTokens(columns: SwatchGridColumns): string[] {
  if (columns === 1) return ['brand-primary', 'success']
  if (columns === 3) return ['brand-primary', 'success', 'warning']
  if (columns === 6) return [...SWATCH_GRID_SIX]
  return [...SWATCH_GRID_FAMILY]
}

function SwatchGridTile({
  tokens,
  columns = 4,
  ...props
}: SwatchGridProps) {
  return <SwatchGrid tokens={tokens ?? swatchGridTokens(columns)} columns={columns} {...props} />
}

const SWATCH_GRID_CHROME: {
  label: string
  preview?: SwatchGridPreview
  selected?: boolean
  disabled?: boolean
  loading?: boolean
}[] = [
  { label: 'Default' },
  { label: 'Hover', preview: 'hover' },
  { label: 'Focus', preview: 'focus' },
  { label: 'Active', preview: 'active' },
  { label: 'Selected', selected: true },
  { label: 'Disabled', disabled: true },
  { label: 'Loading', loading: true },
]

function SwatchGridDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      {SWATCH_GRID_VARIANTS.map((variant) => (
        <SwatchGridTile key={variant} variant={variant} columns={4} />
      ))}
    </div>
  )
}

function SwatchGridStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={1}>
          {SWATCH_GRID_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={SWATCH_GRID_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SwatchGridTile variant={variant} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={1}>
          {SWATCH_GRID_SIZES.map((size) => (
            <StateCard
              key={size}
              label={SWATCH_GRID_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SwatchGridTile variant="subtle" size={size} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={1}>
          {SWATCH_GRID_SIZES.map((size) => (
            <StateCard
              key={`pill-${size}`}
              label={SWATCH_GRID_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SwatchGridTile variant="pill" size={size} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={1}>
          {SWATCH_GRID_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={SWATCH_GRID_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SwatchGridTile variant="subtle" tone={tone} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      {SWATCH_GRID_VARIANTS.map((variant) => (
        <StateGroup key={variant} title={`${SWATCH_GRID_VARIANT_LABEL[variant]} tone`}>
          <StateGrid columns={1}>
            {SWATCH_GRID_TONES.map((tone) => (
              <StateCard
                key={`${variant}-${tone}`}
                label={SWATCH_GRID_TONE_LABEL[tone]}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <SwatchGridTile variant={variant} tone={tone} columns={2} />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="On dark">
        <StateGrid columns={1}>
          {SWATCH_GRID_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={SWATCH_GRID_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <SwatchGridTile variant={variant} onDark columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={1}>
          <StateCard label="Mixed appearance" align="stretch" wide className="bg-bg-primary">
            <SwatchGrid columns={2}>
              <Swatch token="brand-primary" variant="outline" />
              <Swatch token="success" variant="subtle" />
              <Swatch token="warning" variant="fill" />
              <Swatch token="danger" variant="pill" />
            </SwatchGrid>
          </StateCard>
          <StateCard label="Fill only" align="stretch" wide className="bg-bg-primary">
            <SwatchGridTile named={false} columns={2} />
          </StateCard>
          <StateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <SwatchGrid variant="subtle" tokens={[]} columns={2} />
          </StateCard>
          <StateCard label="Hug width" align="stretch" wide className="bg-bg-primary">
            <SwatchGridTile variant="subtle" fullWidth={false} columns={2} />
          </StateCard>
          <StateCard label="Full height" align="stretch" wide className="bg-bg-primary">
            <div className="flex min-h-[240px] items-stretch">
              <SwatchGridTile variant="subtle" fullHeight columns={2} />
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Columns">
        <StateGrid columns={1}>
          {SWATCH_GRID_COLUMNS.map((columns) => (
            <StateCard
              key={columns}
              label={SWATCH_GRID_COLUMN_LABEL[columns]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SwatchGridTile variant="subtle" columns={columns} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Height">
        <StateGrid columns={1}>
          {SWATCH_GRID_ALIGNS.map((align) => (
            <StateCard
              key={align}
              label={SWATCH_GRID_ALIGN_LABEL[align]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              {align === 'start' ? (
                <SwatchGrid variant="subtle" columns={2} align="start">
                  <Swatch token="brand-primary" />
                  <Swatch token="success" named={false} />
                </SwatchGrid>
              ) : (
                <SwatchGridTile variant="subtle" align={align} columns={2} />
              )}
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Width">
        <StateGrid columns={1}>
          {SWATCH_GRID_WIDTHS.map((widths) => (
            <StateCard
              key={widths}
              label={SWATCH_GRID_WIDTH_LABEL[widths]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SwatchGridTile variant="subtle" widths={widths} align="start" columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Gap">
        <StateGrid columns={1}>
          {SWATCH_GRID_GAPS.map((gap) => (
            <StateCard
              key={gap}
              label={SWATCH_GRID_GAP_LABEL[gap]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SwatchGridTile variant="subtle" gap={gap} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={1}>
          {SWATCH_GRID_CHROME.map((item) => (
            <StateCard
              key={item.label}
              label={item.label}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SwatchGridTile
                variant="subtle"
                columns={2}
                href="#swatch-grid"
                preview={item.preview}
                selected={item.selected}
                disabled={item.disabled}
                loading={item.loading}
              />
            </StateCard>
          ))}
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <SwatchGridTile variant="subtle" columns={2} href="#swatch-grid" />
          </StateCard>
          <StateCard label="Button" align="stretch" wide className="bg-bg-primary">
            <SwatchGridTile variant="subtle" columns={2} onClick={() => undefined} />
          </StateCard>
          <StateCard label="Selected, brand" align="stretch" wide className="bg-bg-primary">
            <SwatchGridTile variant="subtle" columns={2} selected tone="brand" />
          </StateCard>
          <StateCard label="Disabled, danger" align="stretch" wide className="bg-bg-primary">
            <SwatchGridTile variant="subtle" columns={2} disabled tone="danger" href="#swatch-grid" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      {SWATCH_GRID_VARIANTS.map((variant) => (
        <StateGroup key={`state-${variant}`} title={SWATCH_GRID_VARIANT_LABEL[variant]}>
          <StateGrid columns={1}>
            {SWATCH_GRID_CHROME.map((item) => (
              <StateCard
                key={`${variant}-${item.label}`}
                label={item.label}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <SwatchGridTile
                  variant={variant}
                  columns={2}
                  href="#swatch-grid"
                  preview={item.preview}
                  selected={item.selected}
                  disabled={item.disabled}
                  loading={item.loading}
                />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}
    </StateStack>
  )
}

function ContrastCardTile({
  fg = 'text-primary',
  bg = 'bg-primary',
  label = 'Headline on page',
  ...props
}: ContrastCardProps) {
  return <ContrastCard fg={fg} bg={bg} label={label} {...props} />
}

const CONTRAST_CARD_CHROME: {
  label: string
  preview?: ContrastCardPreview
  selected?: boolean
  disabled?: boolean
  loading?: boolean
}[] = [
  { label: 'Default' },
  { label: 'Hover', preview: 'hover' },
  { label: 'Focus', preview: 'focus' },
  { label: 'Active', preview: 'active' },
  { label: 'Selected', selected: true },
  { label: 'Disabled', disabled: true },
  { label: 'Loading', loading: true },
]

const CONTRAST_CARD_PAIRS = [
  { fg: 'text-primary', bg: 'bg-primary', label: 'Headline on page' },
  { fg: 'text-secondary', bg: 'bg-primary', label: 'Body on page' },
  { fg: 'text-tertiary', bg: 'bg-secondary', label: 'Caption on card' },
  { fg: 'text-on-brand', bg: 'brand-primary', label: 'Label on primary' },
  { fg: 'text-link', bg: 'bg-primary', label: 'Inline link' },
  { fg: 'danger', bg: 'danger-subtle', label: 'Error on banner' },
] as const

function ContrastCardDemo() {
  return (
    <div className="grid w-full gap-4 min-[735px]:grid-cols-2">
      {CONTRAST_CARD_VARIANTS.map((variant) => (
        <ContrastCardTile key={variant} variant={variant} />
      ))}
    </div>
  )
}

function ContrastCardStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {CONTRAST_CARD_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={CONTRAST_CARD_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <ContrastCardTile variant={variant} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {CONTRAST_CARD_SIZES.map((size) => (
            <StateCard
              key={size}
              label={CONTRAST_CARD_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <ContrastCardTile variant="subtle" size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={2}>
          {CONTRAST_CARD_SIZES.map((size) => (
            <StateCard
              key={`pill-${size}`}
              label={CONTRAST_CARD_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <ContrastCardTile variant="pill" size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {CONTRAST_CARD_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={CONTRAST_CARD_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <ContrastCardTile variant="subtle" tone={tone} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      {CONTRAST_CARD_VARIANTS.map((variant) => (
        <StateGroup key={variant} title={`${CONTRAST_CARD_VARIANT_LABEL[variant]} tone`}>
          <StateGrid columns={2}>
            {CONTRAST_CARD_TONES.map((tone) => (
              <StateCard
                key={`${variant}-${tone}`}
                label={CONTRAST_CARD_TONE_LABEL[tone]}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <ContrastCardTile variant={variant} tone={tone} />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="On dark">
        <StateGrid columns={2}>
          {CONTRAST_CARD_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={CONTRAST_CARD_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <ContrastCardTile variant={variant} onDark />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={2}>
          {CONTRAST_CARD_PAIRS.map((pair) => (
            <StateCard key={pair.label} label={pair.label} align="stretch" wide className="bg-bg-primary">
              <ContrastCardTile fg={pair.fg} bg={pair.bg} label={pair.label} />
            </StateCard>
          ))}
          <StateCard label="Sample only" align="stretch" wide className="bg-bg-primary">
            <ContrastCardTile named={false} />
          </StateCard>
          <StateCard label="Custom sample" align="stretch" wide className="bg-bg-primary">
            <ContrastCardTile sample="Aa Bb Cc 0123" label="Glyphs" />
          </StateCard>
          <StateCard label="Hug width" align="stretch" wide className="bg-bg-primary">
            <ContrastCardTile fullWidth={false} className="w-[240px]" />
          </StateCard>
          <StateCard label="Full height" align="stretch" wide className="bg-bg-primary">
            <div className="flex min-h-[200px] items-stretch">
              <ContrastCardTile fullHeight />
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          {CONTRAST_CARD_CHROME.map((item) => (
            <StateCard
              key={item.label}
              label={item.label}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <ContrastCardTile
                variant="subtle"
                href="#contrast-card"
                preview={item.preview}
                selected={item.selected}
                disabled={item.disabled}
                loading={item.loading}
              />
            </StateCard>
          ))}
          <StateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <ContrastCard />
          </StateCard>
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <ContrastCardTile variant="subtle" href="#contrast-card" />
          </StateCard>
          <StateCard label="Button" align="stretch" wide className="bg-bg-primary">
            <ContrastCardTile variant="subtle" onClick={() => undefined} />
          </StateCard>
          <StateCard label="Selected, brand" align="stretch" wide className="bg-bg-primary">
            <ContrastCardTile variant="subtle" selected tone="brand" />
          </StateCard>
          <StateCard label="Disabled, danger" align="stretch" wide className="bg-bg-primary">
            <ContrastCardTile variant="subtle" disabled tone="danger" href="#contrast-card" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      {CONTRAST_CARD_VARIANTS.map((variant) => (
        <StateGroup key={`state-${variant}`} title={CONTRAST_CARD_VARIANT_LABEL[variant]}>
          <StateGrid columns={2}>
            {CONTRAST_CARD_CHROME.map((item) => (
              <StateCard
                key={`${variant}-${item.label}`}
                label={item.label}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <ContrastCardTile
                  variant={variant}
                  href="#contrast-card"
                  preview={item.preview}
                  selected={item.selected}
                  disabled={item.disabled}
                  loading={item.loading}
                />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}
    </StateStack>
  )
}

function RadiusCardTile({
  value = 18,
  label = 'Panel',
  use = 'Large cards, images, and dialogs.',
  ...props
}: RadiusCardProps) {
  return <RadiusCard value={value} label={label} use={use} {...props} />
}

const RADIUS_CARD_CHROME: {
  label: string
  preview?: RadiusCardPreview
  selected?: boolean
  disabled?: boolean
  loading?: boolean
}[] = [
  { label: 'Default' },
  { label: 'Hover', preview: 'hover' },
  { label: 'Focus', preview: 'focus' },
  { label: 'Active', preview: 'active' },
  { label: 'Selected', selected: true },
  { label: 'Disabled', disabled: true },
  { label: 'Loading', loading: true },
]

function RadiusCardDemo() {
  return (
    <div className="grid w-full gap-4 min-[735px]:grid-cols-2">
      {RADIUS_CARD_VARIANTS.map((variant) => (
        <RadiusCardTile key={variant} variant={variant} />
      ))}
    </div>
  )
}

function RadiusCardStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {RADIUS_CARD_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={RADIUS_CARD_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RadiusCardTile variant={variant} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {RADIUS_CARD_SIZES.map((size) => (
            <StateCard
              key={size}
              label={RADIUS_CARD_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RadiusCardTile size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={2}>
          {RADIUS_CARD_SIZES.map((size) => (
            <StateCard
              key={`pill-${size}`}
              label={RADIUS_CARD_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RadiusCardTile variant="pill" size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {RADIUS_CARD_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={RADIUS_CARD_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RadiusCardTile tone={tone} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      {RADIUS_CARD_VARIANTS.map((variant) => (
        <StateGroup key={variant} title={`${RADIUS_CARD_VARIANT_LABEL[variant]} tone`}>
          <StateGrid columns={2}>
            {RADIUS_CARD_TONES.map((tone) => (
              <StateCard
                key={`${variant}-${tone}`}
                label={RADIUS_CARD_TONE_LABEL[tone]}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <RadiusCardTile variant={variant} tone={tone} />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="On dark">
        <StateGrid columns={2}>
          {RADIUS_CARD_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={RADIUS_CARD_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <RadiusCardTile variant={variant} onDark />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={2}>
          {RADIUS_CARD_SCALE.map((value) => (
            <StateCard
              key={value}
              label={RADIUS_CARD_VALUE_LABEL[value]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RadiusCardTile
                value={value}
                label={RADIUS_CARD_VALUE_LABEL[value]}
                use={RADIUS_CARD_VALUE_USE[value]}
              />
            </StateCard>
          ))}
          <StateCard label="Sample only" align="stretch" wide className="bg-bg-primary">
            <RadiusCardTile named={false} />
          </StateCard>
          <StateCard label="Hug width" align="stretch" wide className="bg-bg-primary">
            <RadiusCardTile fullWidth={false} />
          </StateCard>
          <StateCard label="Full height" align="stretch" wide className="bg-bg-primary">
            <div className="flex min-h-[200px] items-stretch">
              <RadiusCardTile fullHeight />
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          {RADIUS_CARD_CHROME.map((item) => (
            <StateCard
              key={item.label}
              label={item.label}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RadiusCardTile
                href="#radius-card"
                preview={item.preview}
                selected={item.selected}
                disabled={item.disabled}
                loading={item.loading}
              />
            </StateCard>
          ))}
          <StateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <RadiusCard />
          </StateCard>
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <RadiusCardTile href="#radius-card" />
          </StateCard>
          <StateCard label="Button" align="stretch" wide className="bg-bg-primary">
            <RadiusCardTile onClick={() => undefined} />
          </StateCard>
          <StateCard label="Selected, brand" align="stretch" wide className="bg-bg-primary">
            <RadiusCardTile selected tone="brand" />
          </StateCard>
          <StateCard label="Disabled, danger" align="stretch" wide className="bg-bg-primary">
            <RadiusCardTile disabled tone="danger" href="#radius-card" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      {RADIUS_CARD_VARIANTS.map((variant) => (
        <StateGroup key={`state-${variant}`} title={RADIUS_CARD_VARIANT_LABEL[variant]}>
          <StateGrid columns={2}>
            {RADIUS_CARD_CHROME.map((item) => (
              <StateCard
                key={`${variant}-${item.label}`}
                label={item.label}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <RadiusCardTile
                  variant={variant}
                  href="#radius-card"
                  preview={item.preview}
                  selected={item.selected}
                  disabled={item.disabled}
                  loading={item.loading}
                />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}
    </StateStack>
  )
}

function ScaleRowTile({
  value = 692,
  bar = 692,
  caption = 'Single column copy',
  ...props
}: ScaleRowProps) {
  return <ScaleRow value={value} bar={bar} caption={caption} {...props} />
}

const SCALE_ROW_CHROME: {
  label: string
  preview?: ScaleRowPreview
  selected?: boolean
  disabled?: boolean
  loading?: boolean
}[] = [
  { label: 'Default' },
  { label: 'Hover', preview: 'hover' },
  { label: 'Focus', preview: 'focus' },
  { label: 'Active', preview: 'active' },
  { label: 'Selected', selected: true },
  { label: 'Disabled', disabled: true },
  { label: 'Loading', loading: true },
]

function ScaleRowDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      {SCALE_ROW_VARIANTS.map((variant) => (
        <ScaleRowTile key={variant} variant={variant} />
      ))}
    </div>
  )
}

function ScaleRowStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={1}>
          {SCALE_ROW_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={SCALE_ROW_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <ScaleRowTile variant={variant} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={1}>
          {SCALE_ROW_SIZES.map((size) => (
            <StateCard
              key={size}
              label={SCALE_ROW_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <ScaleRowTile variant="subtle" size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={1}>
          {SCALE_ROW_SIZES.map((size) => (
            <StateCard
              key={`pill-${size}`}
              label={SCALE_ROW_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <ScaleRowTile variant="pill" size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={1}>
          {SCALE_ROW_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={SCALE_ROW_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <ScaleRowTile variant="subtle" tone={tone} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      {SCALE_ROW_VARIANTS.map((variant) => (
        <StateGroup key={variant} title={`${SCALE_ROW_VARIANT_LABEL[variant]} tone`}>
          <StateGrid columns={1}>
            {SCALE_ROW_TONES.map((tone) => (
              <StateCard
                key={`${variant}-${tone}`}
                label={SCALE_ROW_TONE_LABEL[tone]}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <ScaleRowTile variant={variant} tone={tone} />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="On dark">
        <StateGrid columns={1}>
          {SCALE_ROW_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={SCALE_ROW_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <ScaleRowTile variant={variant} onDark />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={1}>
          {SCALE_ROW_WIDTHS.map((item) => (
            <StateCard
              key={item.value}
              label={String(item.value)}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <ScaleRowTile value={item.value} bar={item.value} caption={item.caption} />
            </StateCard>
          ))}
          <StateCard label="Spacing scale" align="stretch" wide className="bg-bg-primary">
            <Stack gap="sm">
              {SCALE_ROW_SPACE.map((item) => (
                <ScaleRow
                  key={item.value}
                  value={item.value}
                  width={item.value}
                  caption={item.caption}
                />
              ))}
            </Stack>
          </StateCard>
          <StateCard label="True size" align="stretch" wide className="bg-bg-primary">
            <ScaleRow value={32} width={32} caption="Card padding" />
          </StateCard>
          <StateCard label="Bar only" align="stretch" wide className="bg-bg-primary">
            <ScaleRowTile named={false} />
          </StateCard>
          <StateCard label="Custom max" align="stretch" wide className="bg-bg-primary">
            <ScaleRowTile value={692} bar={692} max={760} caption="Copy on a 760 max" />
          </StateCard>
          <StateCard label="Hug width" align="stretch" wide className="bg-bg-primary">
            <ScaleRowTile fullWidth={false} className="w-[320px]" />
          </StateCard>
          <StateCard label="Full height" align="stretch" wide className="bg-bg-primary">
            <div className="flex min-h-[120px] items-stretch">
              <ScaleRowTile variant="subtle" fullHeight />
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={1}>
          {SCALE_ROW_CHROME.map((item) => (
            <StateCard
              key={item.label}
              label={item.label}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <ScaleRowTile
                variant="subtle"
                href="#scale-row"
                preview={item.preview}
                selected={item.selected}
                disabled={item.disabled}
                loading={item.loading}
              />
            </StateCard>
          ))}
          <StateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <ScaleRow />
          </StateCard>
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <ScaleRowTile variant="subtle" href="#scale-row" />
          </StateCard>
          <StateCard label="Button" align="stretch" wide className="bg-bg-primary">
            <ScaleRowTile variant="subtle" onClick={() => undefined} />
          </StateCard>
          <StateCard label="Selected, brand" align="stretch" wide className="bg-bg-primary">
            <ScaleRowTile variant="subtle" selected tone="brand" />
          </StateCard>
          <StateCard label="Disabled, danger" align="stretch" wide className="bg-bg-primary">
            <ScaleRowTile variant="subtle" disabled tone="danger" href="#scale-row" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      {SCALE_ROW_VARIANTS.map((variant) => (
        <StateGroup key={`state-${variant}`} title={SCALE_ROW_VARIANT_LABEL[variant]}>
          <StateGrid columns={1}>
            {SCALE_ROW_CHROME.map((item) => (
              <StateCard
                key={`${variant}-${item.label}`}
                label={item.label}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <ScaleRowTile
                  variant={variant}
                  href="#scale-row"
                  preview={item.preview}
                  selected={item.selected}
                  disabled={item.disabled}
                  loading={item.loading}
                />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}
    </StateStack>
  )
}

const RELATED_FAMILY: RelatedItem[] = [
  { href: '/components/card', title: 'Card', description: 'A quiet surface for a title and supporting copy.' },
  { href: '/components/stack', title: 'Stack', description: 'A row or column of items with even space.' },
  { href: '/components/table', title: 'Table', description: 'A structured list of records with headers and sort.' },
  { href: '/components/badge', title: 'Badge', description: 'A short status, count, or category on a row.' },
]

const RELATED_SIX: RelatedItem[] = [
  ...RELATED_FAMILY,
  { href: '/components/button', title: 'Button', description: 'The main control for running an action.' },
  { href: '/components/anchor', title: 'Anchor', description: 'A text link to another screen or the open web.' },
]

function relatedItems(columns: RelatedColumns): RelatedItem[] {
  if (columns === 1) return RELATED_FAMILY.slice(0, 2)
  if (columns === 3) return RELATED_FAMILY.slice(0, 3)
  if (columns === 6) return RELATED_SIX
  return [...RELATED_FAMILY]
}

function RelatedTile({
  items,
  columns = 3,
  ...props
}: RelatedProps) {
  return <Related items={items ?? relatedItems(columns)} columns={columns} {...props} />
}

const RELATED_CHROME: {
  label: string
  preview?: RelatedPreview
  selected?: boolean
  disabled?: boolean
  loading?: boolean
}[] = [
  { label: 'Default' },
  { label: 'Hover', preview: 'hover' },
  { label: 'Focus', preview: 'focus' },
  { label: 'Active', preview: 'active' },
  { label: 'Selected', selected: true },
  { label: 'Disabled', disabled: true },
  { label: 'Loading', loading: true },
]

function RelatedDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      {RELATED_VARIANTS.map((variant) => (
        <RelatedTile key={variant} variant={variant} columns={3} />
      ))}
    </div>
  )
}

function RelatedStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={1}>
          {RELATED_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={RELATED_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RelatedTile variant={variant} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={1}>
          {RELATED_SIZES.map((size) => (
            <StateCard
              key={size}
              label={RELATED_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RelatedTile variant="subtle" size={size} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={1}>
          {RELATED_SIZES.map((size) => (
            <StateCard
              key={`pill-${size}`}
              label={RELATED_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RelatedTile variant="pill" size={size} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={1}>
          {RELATED_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={RELATED_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RelatedTile variant="subtle" tone={tone} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      {RELATED_VARIANTS.map((variant) => (
        <StateGroup key={variant} title={`${RELATED_VARIANT_LABEL[variant]} tone`}>
          <StateGrid columns={1}>
            {RELATED_TONES.map((tone) => (
              <StateCard
                key={`${variant}-${tone}`}
                label={RELATED_TONE_LABEL[tone]}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <RelatedTile variant={variant} tone={tone} columns={2} />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="On dark">
        <StateGrid columns={1}>
          {RELATED_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={RELATED_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <RelatedTile variant={variant} onDark columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={1}>
          <StateCard label="One card" align="stretch" wide className="bg-bg-primary">
            <Related variant="subtle" columns={2} items={RELATED_FAMILY.slice(0, 1)} />
          </StateCard>
          <StateCard label="Two cards" align="stretch" wide className="bg-bg-primary">
            <RelatedTile variant="subtle" columns={2} />
          </StateCard>
          <StateCard label="Three cards" align="stretch" wide className="bg-bg-primary">
            <RelatedTile variant="subtle" columns={3} />
          </StateCard>
          <StateCard label="Children" align="stretch" wide className="bg-bg-primary">
            <Related variant="subtle" columns={2}>
              <RelatedCard href="/components/card" title="Card" description="A quiet surface for a title and supporting copy." />
              <RelatedCard href="/components/stack" title="Stack" description="A row or column of items with even space." />
            </Related>
          </StateCard>
          <StateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <Related variant="subtle" items={[]} columns={2} />
          </StateCard>
          <StateCard label="Hug width" align="stretch" wide className="bg-bg-primary">
            <RelatedTile variant="subtle" fullWidth={false} columns={2} />
          </StateCard>
          <StateCard label="Full height" align="stretch" wide className="bg-bg-primary">
            <div className="flex min-h-[240px] items-stretch">
              <RelatedTile variant="subtle" fullHeight columns={2} />
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Columns">
        <StateGrid columns={1}>
          {RELATED_COLUMNS.map((columns) => (
            <StateCard
              key={columns}
              label={RELATED_COLUMN_LABEL[columns]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RelatedTile variant="subtle" columns={columns} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Height">
        <StateGrid columns={1}>
          {RELATED_ALIGNS.map((align) => (
            <StateCard
              key={align}
              label={RELATED_ALIGN_LABEL[align]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              {align === 'start' ? (
                <Related variant="subtle" columns={2} align="start">
                  <RelatedCard href="/components/card" title="Card" description="A quiet surface." />
                  <RelatedCard
                    href="/components/stack"
                    title="Stack"
                    description="A row or column of items with even space between them. Use it to group cards, actions, or fields."
                  />
                </Related>
              ) : (
                <RelatedTile variant="subtle" align={align} columns={2} />
              )}
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Width">
        <StateGrid columns={1}>
          {RELATED_WIDTHS.map((widths) => (
            <StateCard
              key={widths}
              label={RELATED_WIDTH_LABEL[widths]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RelatedTile variant="subtle" widths={widths} align="start" columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Gap">
        <StateGrid columns={1}>
          {RELATED_GAPS.map((gap) => (
            <StateCard
              key={gap}
              label={RELATED_GAP_LABEL[gap]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RelatedTile variant="subtle" gap={gap} columns={2} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={1}>
          {RELATED_CHROME.map((item) => (
            <StateCard
              key={item.label}
              label={item.label}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RelatedTile
                variant="subtle"
                columns={2}
                href="#related"
                preview={item.preview}
                selected={item.selected}
                disabled={item.disabled}
                loading={item.loading}
              />
            </StateCard>
          ))}
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <RelatedTile variant="subtle" columns={2} href="#related" />
          </StateCard>
          <StateCard label="Button" align="stretch" wide className="bg-bg-primary">
            <RelatedTile variant="subtle" columns={2} onClick={() => undefined} />
          </StateCard>
          <StateCard label="Selected, brand" align="stretch" wide className="bg-bg-primary">
            <RelatedTile variant="subtle" columns={2} selected tone="brand" />
          </StateCard>
          <StateCard label="Disabled, danger" align="stretch" wide className="bg-bg-primary">
            <RelatedTile variant="subtle" columns={2} disabled tone="danger" href="#related" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      {RELATED_VARIANTS.map((variant) => (
        <StateGroup key={`state-${variant}`} title={RELATED_VARIANT_LABEL[variant]}>
          <StateGrid columns={1}>
            {RELATED_CHROME.map((item) => (
              <StateCard
                key={`${variant}-${item.label}`}
                label={item.label}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <RelatedTile
                  variant={variant}
                  columns={2}
                  href="#related"
                  preview={item.preview}
                  selected={item.selected}
                  disabled={item.disabled}
                  loading={item.loading}
                />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}
    </StateStack>
  )
}

const RULE_DO = [
  'Use brand primary for the primary action.',
  'Use danger only for destructive actions.',
  'Keep each line a complete instruction.',
]

const RULE_DONT = [
  'Do not mix do items into a don’t card.',
  'Do not use this for a changelog.',
  'Do not rebuild the list with divs.',
]

function RuleCardTile({
  items,
  tone = 'success',
  ...props
}: RuleCardProps) {
  return <RuleCard items={items ?? (tone === 'danger' ? RULE_DONT : RULE_DO)} tone={tone} {...props} />
}

const RULE_CARD_CHROME: {
  label: string
  preview?: RuleCardPreview
  selected?: boolean
  disabled?: boolean
  loading?: boolean
}[] = [
  { label: 'Default' },
  { label: 'Hover', preview: 'hover' },
  { label: 'Focus', preview: 'focus' },
  { label: 'Active', preview: 'active' },
  { label: 'Selected', selected: true },
  { label: 'Disabled', disabled: true },
  { label: 'Loading', loading: true },
]

function RuleCardDemo() {
  return (
    <div className="grid w-full gap-4 min-[735px]:grid-cols-2">
      {RULE_CARD_VARIANTS.map((variant) => (
        <RuleCardTile key={variant} variant={variant} />
      ))}
    </div>
  )
}

function RuleCardStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {RULE_CARD_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={RULE_CARD_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RuleCardTile variant={variant} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {RULE_CARD_SIZES.map((size) => (
            <StateCard
              key={size}
              label={RULE_CARD_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RuleCardTile variant="subtle" size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={2}>
          {RULE_CARD_SIZES.map((size) => (
            <StateCard
              key={`pill-${size}`}
              label={RULE_CARD_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RuleCardTile variant="pill" size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {RULE_CARD_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={RULE_CARD_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RuleCardTile variant="subtle" tone={tone} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      {RULE_CARD_VARIANTS.map((variant) => (
        <StateGroup key={variant} title={`${RULE_CARD_VARIANT_LABEL[variant]} tone`}>
          <StateGrid columns={2}>
            {RULE_CARD_TONES.map((tone) => (
              <StateCard
                key={`${variant}-${tone}`}
                label={RULE_CARD_TONE_LABEL[tone]}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <RuleCardTile variant={variant} tone={tone} />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="On dark">
        <StateGrid columns={2}>
          {RULE_CARD_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={RULE_CARD_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <RuleCardTile variant={variant} onDark />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={2}>
          <StateCard label="Do" align="stretch" wide className="bg-bg-primary">
            <RuleCardTile />
          </StateCard>
          <StateCard label="Don’t" align="stretch" wide className="bg-bg-primary">
            <RuleCardTile tone="danger" />
          </StateCard>
          <StateCard label="One item" align="stretch" wide className="bg-bg-primary">
            <RuleCardTile items={['Use brand primary for the primary action.']} />
          </StateCard>
          <StateCard label="List only" align="stretch" wide className="bg-bg-primary">
            <RuleCardTile named={false} />
          </StateCard>
          <StateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <RuleCard />
          </StateCard>
          <StateCard label="Hug width" align="stretch" wide className="bg-bg-primary">
            <RuleCardTile fullWidth={false} className="w-[280px]" />
          </StateCard>
          <StateCard label="Full height" align="stretch" wide className="bg-bg-primary">
            <div className="flex min-h-[220px] items-stretch">
              <RuleCardTile fullHeight />
            </div>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          {RULE_CARD_CHROME.map((item) => (
            <StateCard
              key={item.label}
              label={item.label}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <RuleCardTile
                variant="subtle"
                href="#rule-card"
                preview={item.preview}
                selected={item.selected}
                disabled={item.disabled}
                loading={item.loading}
              />
            </StateCard>
          ))}
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <RuleCardTile variant="subtle" href="#rule-card" />
          </StateCard>
          <StateCard label="Button" align="stretch" wide className="bg-bg-primary">
            <RuleCardTile variant="subtle" onClick={() => undefined} />
          </StateCard>
          <StateCard label="Selected, brand" align="stretch" wide className="bg-bg-primary">
            <RuleCardTile variant="subtle" selected tone="brand" />
          </StateCard>
          <StateCard label="Disabled, danger" align="stretch" wide className="bg-bg-primary">
            <RuleCardTile variant="subtle" disabled tone="danger" href="#rule-card" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      {RULE_CARD_VARIANTS.map((variant) => (
        <StateGroup key={`state-${variant}`} title={RULE_CARD_VARIANT_LABEL[variant]}>
          <StateGrid columns={2}>
            {RULE_CARD_CHROME.map((item) => (
              <StateCard
                key={`${variant}-${item.label}`}
                label={item.label}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <RuleCardTile
                  variant={variant}
                  href="#rule-card"
                  preview={item.preview}
                  selected={item.selected}
                  disabled={item.disabled}
                  loading={item.loading}
                />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}
    </StateStack>
  )
}

const INLINE_CODE_SAMPLES = [
  { label: 'Prop', code: 'as' },
  { label: 'Token', code: '--brand-primary' },
  { label: 'Path', code: '@/icons' },
  { label: 'String', code: 'variant="subtle"' },
  { label: 'Import', code: 'import { Card }' },
  { label: 'Boolean', code: 'true' },
] as const

function InlineCodeTile({
  code = 'as',
  ...props
}: InlineCodeProps) {
  return <InlineCode code={code} {...props} />
}

function InlineCodeLine({
  code = 'as',
  ...props
}: InlineCodeProps) {
  return (
    <Body>
      Pass <InlineCodeTile code={code} {...props} /> when the visual size and the document outline disagree.
    </Body>
  )
}

const INLINE_CODE_CHROME: {
  label: string
  preview?: InlineCodePreview
  selected?: boolean
  disabled?: boolean
  loading?: boolean
}[] = [
  { label: 'Default' },
  { label: 'Hover', preview: 'hover' },
  { label: 'Focus', preview: 'focus' },
  { label: 'Active', preview: 'active' },
  { label: 'Selected', selected: true },
  { label: 'Disabled', disabled: true },
  { label: 'Loading', loading: true },
]

function InlineCodeDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      {INLINE_CODE_VARIANTS.map((variant) => (
        <InlineCodeLine key={variant} variant={variant} code='variant="subtle"' />
      ))}
    </div>
  )
}

function InlineCodeStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={1}>
          {INLINE_CODE_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={INLINE_CODE_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <InlineCodeLine variant={variant} code='variant="subtle"' />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={1}>
          {INLINE_CODE_SIZES.map((size) => (
            <StateCard
              key={size}
              label={INLINE_CODE_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <InlineCodeLine variant="subtle" size={size} code="--brand-primary" />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={1}>
          {INLINE_CODE_SIZES.map((size) => (
            <StateCard
              key={`pill-${size}`}
              label={INLINE_CODE_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <InlineCodeLine variant="pill" size={size} code="--brand-primary" />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={1}>
          {INLINE_CODE_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={INLINE_CODE_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <InlineCodeLine variant="subtle" tone={tone} code="as" />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      {INLINE_CODE_VARIANTS.map((variant) => (
        <StateGroup key={variant} title={`${INLINE_CODE_VARIANT_LABEL[variant]} tone`}>
          <StateGrid columns={1}>
            {INLINE_CODE_TONES.map((tone) => (
              <StateCard
                key={`${variant}-${tone}`}
                label={INLINE_CODE_TONE_LABEL[tone]}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <InlineCodeLine variant={variant} tone={tone} code='variant="subtle"' />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}

      <StateGroup title="On dark">
        <StateGrid columns={1}>
          {INLINE_CODE_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={INLINE_CODE_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <Body className="!text-[#a1a1a6]">
                Pass <InlineCodeTile variant={variant} onDark code='variant="subtle"' /> when the visual size and the
                document outline disagree.
              </Body>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={2}>
          {INLINE_CODE_SAMPLES.map((sample) => (
            <StateCard key={sample.label} label={sample.label} align="stretch" wide className="bg-bg-primary">
              <InlineCodeLine code={sample.code} variant="subtle" />
            </StateCard>
          ))}
          <StateCard label="In a sentence" align="stretch" wide className="bg-bg-primary">
            <InlineCodeLine />
          </StateCard>
          <StateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <InlineCode variant="subtle" />
          </StateCard>
          <StateCard label="Hug width" align="stretch" wide className="bg-bg-primary">
            <InlineCodeTile variant="subtle" code="--brand-primary" />
          </StateCard>
          <StateCard label="Full width" align="stretch" wide className="bg-bg-primary">
            <InlineCodeTile variant="subtle" code="import { Card } from '@/components'" fullWidth />
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          {INLINE_CODE_CHROME.map((item) => (
            <StateCard
              key={item.label}
              label={item.label}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <InlineCodeLine
                variant="subtle"
                href="#inline-code"
                preview={item.preview}
                selected={item.selected}
                disabled={item.disabled}
                loading={item.loading}
              />
            </StateCard>
          ))}
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <InlineCodeLine variant="subtle" href="#inline-code" />
          </StateCard>
          <StateCard label="Button" align="stretch" wide className="bg-bg-primary">
            <InlineCodeLine variant="subtle" onClick={() => undefined} />
          </StateCard>
          <StateCard label="Selected, brand" align="stretch" wide className="bg-bg-primary">
            <InlineCodeLine variant="subtle" selected tone="brand" />
          </StateCard>
          <StateCard label="Disabled, danger" align="stretch" wide className="bg-bg-primary">
            <InlineCodeLine variant="subtle" disabled tone="danger" href="#inline-code" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      {INLINE_CODE_VARIANTS.map((variant) => (
        <StateGroup key={`state-${variant}`} title={INLINE_CODE_VARIANT_LABEL[variant]}>
          <StateGrid columns={2}>
            {INLINE_CODE_CHROME.map((item) => (
              <StateCard
                key={`${variant}-${item.label}`}
                label={item.label}
                align="stretch"
                wide
                className="bg-bg-primary"
              >
                <InlineCodeLine
                  variant={variant}
                  href="#inline-code"
                  preview={item.preview}
                  selected={item.selected}
                  disabled={item.disabled}
                  loading={item.loading}
                />
              </StateCard>
            ))}
          </StateGrid>
        </StateGroup>
      ))}
    </StateStack>
  )
}

function StatCardDemo() {
  return (
    <div className="grid w-full gap-4 min-[735px]:grid-cols-2">
      {STAT_CARD_VARIANTS.map((variant) => (
        <StatCard
          key={variant}
          variant={variant}
          label="Revenue"
          value="$48,290"
          delta={{ value: '+12%', tone: 'up' }}
          hint="vs last month"
          icon={<StatIcon />}
          sparkline={STAT_SPARK}
        />
      ))}
    </div>
  )
}

function StatCardStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {STAT_CARD_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={STAT_CARD_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StatCard
                variant={variant}
                label="Revenue"
                value="$48,290"
                delta={{ value: '+12%', tone: 'up' }}
                hint="vs last month"
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {STAT_CARD_SIZES.map((size) => (
            <StateCard
              key={size}
              label={STAT_CARD_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StatCard
                size={size}
                label="Revenue"
                value="$48,290"
                delta={{ value: '+12%', tone: 'up' }}
                hint="vs last month"
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Pill size">
        <StateGrid columns={2}>
          {STAT_CARD_SIZES.map((size) => (
            <StateCard
              key={`pill-${size}`}
              label={STAT_CARD_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StatCard
                variant="pill"
                size={size}
                label="Revenue"
                value="$48,290"
                delta={{ value: '+12%', tone: 'up' }}
                hint="vs last month"
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {STAT_CARD_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={STAT_CARD_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StatCard
                tone={tone}
                icon={<StatIcon name={tone === 'danger' ? 'inbox' : tone === 'success' ? 'people' : 'revenue'} />}
                label={
                  tone === 'success'
                    ? 'Active users'
                    : tone === 'warning'
                      ? 'Quota used'
                      : tone === 'danger'
                        ? 'Failed jobs'
                        : tone === 'brand'
                          ? 'Pipeline'
                          : 'Revenue'
                }
                value={
                  tone === 'success'
                    ? '2,841'
                    : tone === 'warning'
                      ? '88%'
                      : tone === 'danger'
                        ? '12'
                        : '$48,290'
                }
                delta={{
                  value: tone === 'danger' ? '+3' : tone === 'warning' ? '+6%' : '+12%',
                  tone: tone === 'danger' ? 'down' : tone === 'warning' ? 'warning' : 'up',
                }}
                hint="vs last month"
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="On dark">
        <StateGrid columns={2}>
          {STAT_CARD_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={STAT_CARD_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <StatCard
                variant={variant}
                onDark
                icon={<StatIcon />}
                label="Revenue"
                value="$48,290"
                delta={{ value: '+12%', tone: 'up' }}
                hint="vs last month"
                sparkline={STAT_SPARK}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Delta">
        <StateGrid columns={2}>
          {STAT_CARD_DELTA_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={STAT_CARD_DELTA_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StatCard
                label={
                  tone === 'down'
                    ? 'Churn'
                    : tone === 'warning'
                      ? 'Error rate'
                      : tone === 'neutral'
                        ? 'Conversion'
                        : 'Revenue'
                }
                value={tone === 'down' ? '1.8%' : tone === 'warning' ? '4.2%' : tone === 'neutral' ? '3.2%' : '$48,290'}
                delta={{
                  value: tone === 'up' ? '+12%' : tone === 'down' ? '+0.4%' : tone === 'warning' ? '+1.1%' : '0.0%',
                  tone,
                }}
                hint="vs last month"
                sparkline={tone === 'down' || tone === 'warning' ? STAT_SPARK_DOWN : STAT_SPARK}
              />
            </StateCard>
          ))}
          <StateCard label="Inverted down" align="stretch" wide className="bg-bg-primary">
            <StatCard
              icon={<StatIcon name="inbox" />}
              label="Open tickets"
              value="18"
              delta={{ value: '−2', tone: 'down', invert: true }}
              hint="this week"
              sparkline={STAT_SPARK_DOWN}
            />
          </StateCard>
          <StateCard label="Inverted up" align="stretch" wide className="bg-bg-primary">
            <StatCard
              icon={<StatIcon name="inbox" />}
              label="Open tickets"
              value="24"
              delta={{ value: '+6', tone: 'up', invert: true }}
              hint="this week"
              sparkline={[12, 14, 13, 16, 18, 20, 22, 24]}
            />
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={2}>
          {STAT_CARD_ALIGNS.map((align) => (
            <StateCard
              key={align}
              label={STAT_CARD_ALIGN_LABEL[align]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <StatCard
                align={align}
                icon={<StatIcon />}
                label="Revenue"
                value="$48,290"
                unit="/mo"
                delta={{ value: '+12%', tone: 'up' }}
                hint="vs last month"
                sparkline={STAT_SPARK}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          <StateCard label="Value only" align="stretch" wide className="bg-bg-primary">
            <StatCard label="Revenue" value="$48,290" />
          </StateCard>
          <StateCard label="Delta only" align="stretch" wide className="bg-bg-primary">
            <StatCard label="Revenue" value="$48,290" delta={{ value: '+12%', tone: 'up' }} />
          </StateCard>
          <StateCard label="Hint only" align="stretch" wide className="bg-bg-primary">
            <StatCard label="Revenue" value="$48,290" hint="Month to date" />
          </StateCard>
          <StateCard label="Unit" align="stretch" wide className="bg-bg-primary">
            <StatCard label="Session length" value="12.4" unit="min" delta={{ value: '+0.8', tone: 'up' }} hint="vs last week" />
          </StateCard>
          <StateCard label="Icon" align="stretch" wide className="bg-bg-primary">
            <StatCard
              icon={<StatIcon name="people" />}
              label="Active users"
              value="2,841"
              delta={{ value: '+4%', tone: 'up' }}
              hint="vs last week"
            />
          </StateCard>
          <StateCard label="Sparkline" align="stretch" wide className="bg-bg-primary">
            <StatCard
              label="Revenue"
              value="$48,290"
              delta={{ value: '+12%', tone: 'up' }}
              hint="vs last month"
              sparkline={STAT_SPARK}
            />
          </StateCard>
          <StateCard label="Icon and sparkline" align="stretch" wide className="bg-bg-primary">
            <StatCard
              icon={<StatIcon />}
              label="Revenue"
              value="$48,290"
              unit="/mo"
              delta={{ value: '+12%', tone: 'up' }}
              hint="vs last month"
              sparkline={STAT_SPARK}
            />
          </StateCard>
          <StateCard label="Empty" align="stretch" wide className="bg-bg-primary">
            <StatCard label="Revenue" empty hint="No data yet" />
          </StateCard>
          <StateCard label="Disabled" align="stretch" wide className="bg-bg-primary">
            <StatCard
              label="Revenue"
              value="$48,290"
              delta={{ value: '+12%', tone: 'up' }}
              hint="vs last month"
              disabled
            />
          </StateCard>
          <StateCard label="Link" align="stretch" wide className="bg-bg-primary">
            <StatCard
              icon={<StatIcon name="chart" />}
              label="Revenue"
              value="$48,290"
              delta={{ value: '+12%', tone: 'up' }}
              hint="Open report"
              href="#stat-card"
            />
          </StateCard>
          <StateCard label="Button" align="stretch" wide className="bg-bg-primary">
            <StatCard
              icon={<StatIcon name="people" />}
              label="Active users"
              value="2,841"
              delta={{ value: '+4%', tone: 'up' }}
              hint="Open list"
              onClick={() => undefined}
            />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {AVATAR_VARIANTS.map((variant) => (
        <Avatar key={variant} name="Alex Rivera" size="lg" variant={variant} />
      ))}
    </div>
  )
}

function AvatarStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={3}>
          {AVATAR_VARIANTS.map((variant) => (
            <StateCard key={variant} label={AVATAR_VARIANT_LABEL[variant]}>
              <Avatar name="Alex Rivera" size="lg" variant={variant} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={3}>
          {AVATAR_SIZES.map((size) => (
            <StateCard key={size} label={AVATAR_SIZE_LABEL[size]}>
              <Avatar name="Alex Rivera" size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={3}>
          {AVATAR_TONES.map((tone) => (
            <StateCard key={tone} label={AVATAR_TONE_LABEL[tone]}>
              <Avatar name="Alex Rivera" size="lg" tone={tone} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Presence">
        <StateGrid columns={3}>
          {AVATAR_STATUSES.filter((status) => status !== 'none').map((status) => (
            <StateCard key={status} label={AVATAR_STATUS_LABEL[status]}>
              <Avatar name="Alex Rivera" size="lg" status={status} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Shape">
        <StateGrid columns={2}>
          {AVATAR_SHAPES.map((shape) => (
            <StateCard key={shape} label={AVATAR_SHAPE_LABEL[shape]}>
              <Avatar name="Alex Rivera" size="lg" shape={shape} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={3}>
          <StateCard label="Initials">
            <Avatar name="Alex Rivera" size="lg" />
          </StateCard>
          <StateCard label="Photo">
            <Avatar name="Alex Rivera" size="lg" src="/favicon.svg" />
          </StateCard>
          <StateCard label="Icon">
            <Avatar name="Alex Rivera" size="lg" icon={<DkPersonUserProfile strokeWidth={1.5} absoluteStrokeWidth />} />
          </StateCard>
          <StateCard label="Empty">
            <Avatar size="lg" />
          </StateCard>
          <StateCard label="Disabled">
            <Avatar name="Alex Rivera" size="lg" disabled />
          </StateCard>
          <StateCard label="Single name">
            <Avatar name="Alex" size="lg" />
          </StateCard>
          <StateCard label="Rounded, online">
            <Avatar name="Sam Chen" size="lg" shape="rounded" status="online" />
          </StateCard>
          <StateCard label="Ghost, busy">
            <Avatar name="Jordan Lee" size="lg" variant="ghost" status="busy" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Group">
        <StateGrid columns={2}>
          <StateCard label="Three faces" wide>
            <AvatarGroup>
              <Avatar name="Alex Rivera" />
              <Avatar name="Sam Chen" />
              <Avatar name="Jordan Lee" />
            </AvatarGroup>
          </StateCard>
          <StateCard label="Overflow" wide>
            <AvatarGroup max={3}>
              <Avatar name="Alex Rivera" />
              <Avatar name="Sam Chen" />
              <Avatar name="Jordan Lee" />
              <Avatar name="Riley Patel" />
              <Avatar name="Morgan Diaz" />
            </AvatarGroup>
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

const LIST_MARK_GLYPH = { strokeWidth: 1.85, absoluteStrokeWidth: true } as const

function ListFace({ size = 'md' }: { size?: ListRowSize }) {
  return <Avatar name="Alex Rivera" size={size === 'lg' ? 'lg' : size} />
}

function ListSample({
  variant = 'fill',
  size = 'md',
  header,
  footer,
  children,
}: {
  variant?: ListRowVariant
  size?: ListRowSize
  header?: string
  footer?: string
  children: ReactNode
}) {
  return (
    <ListGroup variant={variant} size={size} header={header} footer={footer}>
      {children}
    </ListGroup>
  )
}

function ListRowDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      {LIST_ROW_VARIANTS.map((variant) => (
        <ListSample key={variant} variant={variant} header={LIST_ROW_VARIANT_LABEL[variant]}>
          <ListRow
            leading={
              <ListMark>
                <DkGearSettingsPreferences {...LIST_MARK_GLYPH} />
              </ListMark>
            }
            title="General"
            chevron
            onClick={() => undefined}
          />
          <ListRow
            leading={<ListFace />}
            title="Alex Rivera"
            meta="alex@roboticela.com"
            chevron
            onClick={() => undefined}
          />
        </ListSample>
      ))}
    </div>
  )
}

function ListRowStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {LIST_ROW_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={LIST_ROW_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <ListSample variant={variant}>
                <ListRow
                  leading={
                    <ListMark>
                      <DkGearSettingsPreferences {...LIST_MARK_GLYPH} />
                    </ListMark>
                  }
                  title="General"
                  chevron
                  onClick={() => undefined}
                />
                <ListRow
                  leading={<ListFace />}
                  title="Alex Rivera"
                  meta="Workspace owner"
                  chevron
                  onClick={() => undefined}
                />
              </ListSample>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {LIST_ROW_SIZES.map((size) => (
            <StateCard
              key={size}
              label={LIST_ROW_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <ListSample size={size}>
                <ListRow
                  leading={<ListFace size={size} />}
                  title="Alex Rivera"
                  meta="alex@roboticela.com"
                  chevron
                  onClick={() => undefined}
                />
                <ListRow
                  leading={
                    <ListMark>
                      <DkEnvelopeMessageMail {...LIST_MARK_GLYPH} />
                    </ListMark>
                  }
                  title="Email"
                  value="Primary"
                  chevron
                  onClick={() => undefined}
                />
              </ListSample>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {LIST_ROW_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={LIST_ROW_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <ListSample>
                <ListRow
                  tone={tone}
                  leading={
                    <ListMark tone={tone === 'default' ? 'brand' : tone}>
                      {tone === 'danger' ? (
                        <DkWasteBinDelete {...LIST_MARK_GLYPH} />
                      ) : tone === 'warning' ? (
                        <DkNotificationBellAlert {...LIST_MARK_GLYPH} />
                      ) : tone === 'success' ? (
                        <DkPadlockSecureClosed {...LIST_MARK_GLYPH} />
                      ) : (
                        <DkAddPlusCreate {...LIST_MARK_GLYPH} />
                      )}
                    </ListMark>
                  }
                  title={
                    tone === 'danger'
                      ? 'Delete account'
                      : tone === 'warning'
                        ? 'Notifications'
                        : tone === 'success'
                          ? 'Two-factor'
                          : tone === 'brand'
                            ? 'Add account'
                            : 'General'
                  }
                  chevron
                  onClick={() => undefined}
                />
              </ListSample>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          {(
            [
              ['Default', undefined],
              ['Hover', 'hover'],
              ['Focus', 'focus'],
              ['Active', 'active'],
            ] as const
          ).map(([label, preview]) => (
            <StateCard key={label} label={label} align="stretch" wide className="bg-bg-primary">
              <ListSample>
                <ListRow
                  leading={<ListFace />}
                  title="Alex Rivera"
                  meta="alex@roboticela.com"
                  chevron
                  preview={preview as ListRowPreview | undefined}
                  onClick={() => undefined}
                />
              </ListSample>
            </StateCard>
          ))}
          <StateCard label="Selected" align="stretch" wide className="bg-bg-primary">
            <ListSample>
              <ListRow title="English" value="United States" selected onClick={() => undefined} />
              <ListRow title="Español" value="España" onClick={() => undefined} />
            </ListSample>
          </StateCard>
          <StateCard label="Disabled" align="stretch" wide className="bg-bg-primary">
            <ListSample>
              <ListRow
                leading={<ListFace />}
                title="Alex Rivera"
                meta="Unavailable"
                chevron
                disabled
              />
            </ListSample>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={2}>
          <StateCard label="Title" align="stretch" wide className="bg-bg-primary">
            <ListSample>
              <ListRow title="About" chevron onClick={() => undefined} />
              <ListRow title="Legal" chevron onClick={() => undefined} />
            </ListSample>
          </StateCard>
          <StateCard label="Subtitle" align="stretch" wide className="bg-bg-primary">
            <ListSample>
              <ListRow
                leading={<ListFace />}
                title="Alex Rivera"
                meta="Workspace owner"
                chevron
                onClick={() => undefined}
              />
            </ListSample>
          </StateCard>
          <StateCard label="Value" align="stretch" wide className="bg-bg-primary">
            <ListSample>
              <ListRow title="Language" value="English" chevron onClick={() => undefined} />
              <ListRow title="Region" value="United States" chevron onClick={() => undefined} />
            </ListSample>
          </StateCard>
          <StateCard label="Mark" align="stretch" wide className="bg-bg-primary">
            <ListSample>
              <ListRow
                leading={
                  <ListMark>
                    <DkGearSettingsPreferences {...LIST_MARK_GLYPH} />
                  </ListMark>
                }
                title="General"
                chevron
                onClick={() => undefined}
              />
              <ListRow
                leading={
                  <ListMark tone="success">
                    <DkPadlockSecureClosed {...LIST_MARK_GLYPH} />
                  </ListMark>
                }
                title="Privacy"
                chevron
                onClick={() => undefined}
              />
            </ListSample>
          </StateCard>
          <StateCard label="Switch" align="stretch" wide className="bg-bg-primary">
            <ListSample>
              <ListRow
                title="Product alerts"
                trailing={<Switch size="sm" checked onChange={() => undefined} label="Product alerts" />}
              />
              <ListRow
                title="Weekly digest"
                trailing={<Switch size="sm" checked={false} onChange={() => undefined} label="Weekly digest" />}
              />
            </ListSample>
          </StateCard>
          <StateCard label="Badge" align="stretch" wide className="bg-bg-primary">
            <ListSample>
              <ListRow
                leading={<ListFace />}
                title="alex@roboticela.com"
                meta="Primary"
                trailing={<Badge tone="verified">Verified</Badge>}
                chevron
                onClick={() => undefined}
              />
            </ListSample>
          </StateCard>
          <StateCard label="Actions" align="stretch" wide className="bg-bg-primary">
            <ListSample>
              <ListRow
                leading={<Avatar name="Alex Work" size="md" status="away" />}
                title="alex.work@example.com"
                meta="Unverified"
                trailing={
                  <>
                    <TextAction>Verify</TextAction>
                    <TextAction danger>Remove</TextAction>
                  </>
                }
              />
            </ListSample>
          </StateCard>
          <StateCard label="Section" align="stretch" wide className="bg-bg-primary">
            <ListSample header="Account" footer="Used to sign in and reset your password.">
              <ListRow title="Email" value="alex@roboticela.com" chevron onClick={() => undefined} />
              <ListRow title="Phone" value="+1 (415) 555-2671" chevron onClick={() => undefined} />
            </ListSample>
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

const SETTINGS_GLYPH = { strokeWidth: 1.85, absoluteStrokeWidth: true } as const

function SettingsSample({
  variant = 'fill',
  size = 'md',
  header,
  footer,
  children,
}: {
  variant?: SettingsRowVariant
  size?: SettingsRowSize
  header?: string
  footer?: string
  children: ReactNode
}) {
  return (
    <SettingsList variant={variant} size={size} header={header} footer={footer}>
      {children}
    </SettingsList>
  )
}

function SettingsSwitch({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange?: (next: boolean) => void
}) {
  return <Switch size="sm" checked={checked} onChange={onChange ?? (() => undefined)} label={label} />
}

function SettingsRowDemo() {
  const [alerts, setAlerts] = useState(true)
  const [digest, setDigest] = useState(false)
  const [appearance, setAppearance] = useState('system')

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-8">
      <SettingsList header="Notifications" footer="Alerts arrive as they happen.">
        <SettingsRow
          icon={<DkNotificationBellAlert {...SETTINGS_GLYPH} />}
          iconTone="danger"
          label="Product alerts"
          description="Push and email"
          control={<SettingsSwitch label="Product alerts" checked={alerts} onChange={setAlerts} />}
        />
        <SettingsRow
          icon={<DkEnvelopeMessageMail {...SETTINGS_GLYPH} />}
          iconTone="brand"
          label="Weekly digest"
          description="A summary every Monday"
          control={<SettingsSwitch label="Weekly digest" checked={digest} onChange={setDigest} />}
        />
      </SettingsList>
      <SettingsList header="Account">
        <SettingsRow
          icon={<DkPersonUserProfile {...SETTINGS_GLYPH} />}
          iconTone="muted"
          label="Name"
          value="Alex Rivera"
          onClick={() => undefined}
        />
        <SettingsRow
          icon={<DkGlobeWorldEarth {...SETTINGS_GLYPH} />}
          iconTone="teal"
          label="Language"
          value="English"
          onClick={() => undefined}
        />
        <SettingsRow
          icon={<DkPadlockSecureClosed {...SETTINGS_GLYPH} />}
          iconTone="success"
          label="Two-factor"
          value="On"
          onClick={() => undefined}
        />
      </SettingsList>
      <SettingsList header="Appearance">
        <SettingsRow
          layout="selection"
          label="System"
          selected={appearance === 'system'}
          onClick={() => setAppearance('system')}
        />
        <SettingsRow
          layout="selection"
          label="Light"
          selected={appearance === 'light'}
          onClick={() => setAppearance('light')}
        />
        <SettingsRow
          layout="selection"
          label="Dark"
          selected={appearance === 'dark'}
          onClick={() => setAppearance('dark')}
        />
      </SettingsList>
      <SettingsList>
        <SettingsRow layout="action" align="center" tone="danger" label="Sign out" onClick={() => undefined} />
      </SettingsList>
    </div>
  )
}

function SettingsRowStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {SETTINGS_ROW_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={SETTINGS_ROW_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SettingsSample variant={variant}>
                <SettingsRow
                  icon={<DkGearSettingsPreferences {...SETTINGS_GLYPH} />}
                  iconTone="muted"
                  label="General"
                  onClick={() => undefined}
                />
                <SettingsRow
                  icon={<DkNotificationBellAlert {...SETTINGS_GLYPH} />}
                  iconTone="danger"
                  label="Alerts"
                  control={<SettingsSwitch label="Alerts" checked />}
                />
              </SettingsSample>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={2}>
          <StateCard label="Control" align="stretch" wide className="bg-bg-primary">
            <SettingsSample>
              <SettingsRow
                label="Product alerts"
                description="Push and email"
                control={<SettingsSwitch label="Product alerts" checked />}
              />
              <SettingsRow
                label="Weekly digest"
                control={<SettingsSwitch label="Weekly digest" checked={false} />}
              />
            </SettingsSample>
          </StateCard>
          <StateCard label="Navigation" align="stretch" wide className="bg-bg-primary">
            <SettingsSample>
              <SettingsRow label="General" onClick={() => undefined} />
              <SettingsRow label="Privacy" onClick={() => undefined} />
            </SettingsSample>
          </StateCard>
          <StateCard label="Value" align="stretch" wide className="bg-bg-primary">
            <SettingsSample>
              <SettingsRow label="Language" value="English" onClick={() => undefined} />
              <SettingsRow label="Region" value="United States" onClick={() => undefined} />
            </SettingsSample>
          </StateCard>
          <StateCard label="Selection" align="stretch" wide className="bg-bg-primary">
            <SettingsSample>
              <SettingsRow layout="selection" label="English" value="United States" selected onClick={() => undefined} />
              <SettingsRow layout="selection" label="Español" value="España" onClick={() => undefined} />
            </SettingsSample>
          </StateCard>
          <StateCard label="Action" align="stretch" wide className="bg-bg-primary">
            <SettingsSample>
              <SettingsRow layout="action" tone="brand" label="Add account" onClick={() => undefined} />
              <SettingsRow layout="action" tone="danger" label="Delete account" onClick={() => undefined} />
            </SettingsSample>
          </StateCard>
          <StateCard label="Action, centered" align="stretch" wide className="bg-bg-primary">
            <SettingsSample>
              <SettingsRow layout="action" align="center" tone="danger" label="Sign out" onClick={() => undefined} />
            </SettingsSample>
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {SETTINGS_ROW_SIZES.map((size) => (
            <StateCard
              key={size}
              label={SETTINGS_ROW_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SettingsSample size={size}>
                <SettingsRow
                  icon={<DkGlobeWorldEarth {...SETTINGS_GLYPH} />}
                  iconTone="teal"
                  label="Language"
                  value="English"
                  onClick={() => undefined}
                />
                <SettingsRow
                  label="Product alerts"
                  control={<SettingsSwitch label="Product alerts" checked />}
                />
              </SettingsSample>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Icon">
        <StateGrid columns={2}>
          {SETTINGS_ROW_ICON_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={SETTINGS_ROW_ICON_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SettingsSample>
                <SettingsRow
                  icon={
                    tone === 'danger' ? (
                      <DkWasteBinDelete {...SETTINGS_GLYPH} />
                    ) : tone === 'warning' ? (
                      <DkNotificationBellAlert {...SETTINGS_GLYPH} />
                    ) : tone === 'success' ? (
                      <DkPadlockSecureClosed {...SETTINGS_GLYPH} />
                    ) : tone === 'teal' ? (
                      <DkGlobeWorldEarth {...SETTINGS_GLYPH} />
                    ) : tone === 'muted' ? (
                      <DkGearSettingsPreferences {...SETTINGS_GLYPH} />
                    ) : (
                      <DkPersonUserProfile {...SETTINGS_GLYPH} />
                    )
                  }
                  iconTone={tone}
                  label={SETTINGS_ROW_ICON_TONE_LABEL[tone]}
                  onClick={() => undefined}
                />
              </SettingsSample>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {SETTINGS_ROW_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={SETTINGS_ROW_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SettingsSample>
                <SettingsRow
                  layout="action"
                  tone={tone}
                  label={
                    tone === 'danger' ? 'Delete account' : tone === 'brand' ? 'Add account' : 'Manage account'
                  }
                  onClick={() => undefined}
                />
              </SettingsSample>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          {(
            [
              ['Default', undefined],
              ['Hover', 'hover'],
              ['Focus', 'focus'],
              ['Active', 'active'],
            ] as const
          ).map(([label, preview]) => (
            <StateCard key={label} label={label} align="stretch" wide className="bg-bg-primary">
              <SettingsSample>
                <SettingsRow
                  icon={<DkPersonUserProfile {...SETTINGS_GLYPH} />}
                  iconTone="muted"
                  label="Name"
                  value="Alex Rivera"
                  preview={preview as SettingsRowPreview | undefined}
                  onClick={() => undefined}
                />
              </SettingsSample>
            </StateCard>
          ))}
          <StateCard label="Selected" align="stretch" wide className="bg-bg-primary">
            <SettingsSample>
              <SettingsRow layout="selection" label="English" value="United States" selected onClick={() => undefined} />
              <SettingsRow layout="selection" label="Español" value="España" onClick={() => undefined} />
            </SettingsSample>
          </StateCard>
          <StateCard label="Disabled" align="stretch" wide className="bg-bg-primary">
            <SettingsSample>
              <SettingsRow
                icon={<DkPadlockSecureClosed {...SETTINGS_GLYPH} />}
                iconTone="muted"
                label="Two-factor"
                value="Unavailable"
                disabled
                onClick={() => undefined}
              />
            </SettingsSample>
          </StateCard>
          <StateCard label="Loading" align="stretch" wide className="bg-bg-primary">
            <SettingsSample>
              <SettingsRow
                icon={<DkGlobeWorldEarth {...SETTINGS_GLYPH} />}
                iconTone="teal"
                label="Language"
                value="English"
                loading
                onClick={() => undefined}
              />
            </SettingsSample>
          </StateCard>
          <StateCard label="Description" align="stretch" wide className="bg-bg-primary">
            <SettingsSample>
              <SettingsRow
                label="Email notifications"
                description="Product updates and security alerts"
                control={<SettingsSwitch label="Email notifications" checked />}
              />
            </SettingsSample>
          </StateCard>
          <StateCard label="Badge" align="stretch" wide className="bg-bg-primary">
            <SettingsSample>
              <SettingsRow
                icon={<DkEnvelopeMessageMail {...SETTINGS_GLYPH} />}
                label="Email"
                value="alex@roboticela.com"
                badge={<Badge tone="verified">Verified</Badge>}
                onClick={() => undefined}
              />
            </SettingsSample>
          </StateCard>
          <StateCard label="Section" align="stretch" wide className="bg-bg-primary">
            <SettingsSample header="Account" footer="Used to sign in and reset your password.">
              <SettingsRow label="Email" value="alex@roboticela.com" onClick={() => undefined} />
              <SettingsRow label="Phone" value="+1 (415) 555-2671" onClick={() => undefined} />
            </SettingsSample>
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function KeyValueRowDemo() {
  return (
    <div className="flex w-full max-w-[400px] flex-col gap-6">
      {KEY_VALUE_VARIANTS.map((variant) => (
        <KeyValueGroup key={variant} variant={variant} label={KEY_VALUE_VARIANT_LABEL[variant]}>
          <KeyValueRow label="Plan" value={KEY_VALUE_VARIANT_LABEL[variant]} />
          <KeyValueRow label="Seats" value="8" />
        </KeyValueGroup>
      ))}
    </div>
  )
}

function KeyValueRowStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {KEY_VALUE_VARIANTS.map((variant) => (
            <StateCard key={variant} label={KEY_VALUE_VARIANT_LABEL[variant]} align="stretch" wide>
              <KeyValueGroup variant={variant}>
                <KeyValueRow label="Plan" value="Studio" />
                <KeyValueRow label="Seats" value="8" />
              </KeyValueGroup>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {KEY_VALUE_SIZES.map((size) => (
            <StateCard key={size} label={KEY_VALUE_SIZE_LABEL[size]} align="stretch" wide>
              <KeyValueGroup size={size}>
                <KeyValueRow label="Plan" value="Studio" />
                <KeyValueRow label="Seats" value="8" />
              </KeyValueGroup>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={2}>
          {KEY_VALUE_LAYOUTS.map((layout) => (
            <StateCard key={layout} label={KEY_VALUE_LAYOUT_LABEL[layout]} align="stretch" wide>
              <KeyValueGroup>
                <KeyValueRow layout={layout} label="Address" value="1 Infinite Loop, Cupertino" />
              </KeyValueGroup>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {KEY_VALUE_TONES.map((tone) => (
            <StateCard key={tone} label={KEY_VALUE_TONE_LABEL[tone]} align="stretch" wide>
              <KeyValueGroup>
                <KeyValueRow
                  tone={tone}
                  label="Status"
                  value={
                    tone === 'success'
                      ? 'Verified'
                      : tone === 'warning'
                        ? 'Review'
                        : tone === 'danger'
                          ? 'Failed'
                          : tone === 'brand'
                            ? 'alex@roboticela.com'
                            : 'Studio'
                  }
                />
              </KeyValueGroup>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="On dark">
        <StateGrid columns={2}>
          {KEY_VALUE_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={KEY_VALUE_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <KeyValueGroup variant={variant} onDark>
                <KeyValueRow label="Plan" value="Studio" />
                <KeyValueRow label="Seats" value="8" />
              </KeyValueGroup>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          <StateCard label="Rest" align="stretch" wide>
            <KeyValueGroup>
              <KeyValueRow label="Email" value="alex@roboticela.com" />
              <KeyValueRow label="Username" value="@alex" />
              <KeyValueRow label="Plan" value="Studio" />
            </KeyValueGroup>
          </StateCard>
          <StateCard label="Hover" align="stretch" wide>
            <KeyValueGroup>
              <KeyValueRow label="Email" value="alex@roboticela.com" copyable preview="hover" />
              <KeyValueRow label="Username" value="@alex" />
            </KeyValueGroup>
          </StateCard>
          <StateCard label="Active" align="stretch" wide>
            <KeyValueGroup>
              <KeyValueRow label="Email" value="alex@roboticela.com" copyable preview="active" />
              <KeyValueRow label="Username" value="@alex" />
            </KeyValueGroup>
          </StateCard>
          <StateCard label="Focus" align="stretch" wide>
            <KeyValueGroup>
              <KeyValueRow label="Email" value="alex@roboticela.com" copyable preview="focus" />
              <KeyValueRow label="Username" value="@alex" />
            </KeyValueGroup>
          </StateCard>
          <StateCard label="Selected" align="stretch" wide>
            <KeyValueGroup>
              <KeyValueRow label="Email" value="alex@roboticela.com" selected />
              <KeyValueRow label="Username" value="@alex" />
            </KeyValueGroup>
          </StateCard>
          <StateCard label="Disabled" align="stretch" wide>
            <KeyValueGroup>
              <KeyValueRow label="Email" value="alex@roboticela.com" disabled />
              <KeyValueRow label="Username" value="@alex" disabled />
            </KeyValueGroup>
          </StateCard>
          <StateCard label="Empty" align="stretch" wide>
            <KeyValueGroup>
              <KeyValueRow label="Website" empty />
              <KeyValueRow label="Company" placeholder="Add a company" empty />
            </KeyValueGroup>
          </StateCard>
          <StateCard label="Copied" align="stretch" wide>
            <KeyValueGroup>
              <KeyValueRow label="Email" value="alex@roboticela.com" copyable preview="copied" />
              <KeyValueRow label="Username" value="@alex" />
            </KeyValueGroup>
          </StateCard>
          <StateCard label="Invalid" align="stretch" wide>
            <KeyValueGroup>
              <KeyValueRow label="Email" value="alex" invalid hint="Enter a valid email." />
              <KeyValueRow label="Username" value="@alex" />
            </KeyValueGroup>
          </StateCard>
          <StateCard label="Copyable" align="stretch" wide>
            <KeyValueGroup>
              <KeyValueRow label="Email" value="alex@roboticela.com" copyable />
              <KeyValueRow label="Username" value="@alex" copyable />
            </KeyValueGroup>
          </StateCard>
          <StateCard label="Link" align="stretch" wide>
            <KeyValueGroup>
              <KeyValueRow label="Website" value="roboticela.com" href="#live-demo" />
              <KeyValueRow label="Docs" value="Open" onClick={() => undefined} />
            </KeyValueGroup>
          </StateCard>
          <StateCard label="Hint" align="stretch" wide>
            <KeyValueGroup>
              <KeyValueRow label="Email" value="alex@roboticela.com" hint="Used for receipts." />
              <KeyValueRow label="Username" value="@alex" />
            </KeyValueGroup>
          </StateCard>
          <StateCard label="Leading" align="stretch" wide>
            <KeyValueGroup>
              <KeyValueRow
                label="Email"
                value="alex@roboticela.com"
                leading={<DkEnvelopeMessageMail strokeWidth={1.75} absoluteStrokeWidth />}
              />
              <KeyValueRow
                label="Username"
                value="@alex"
                leading={<DkAtSign strokeWidth={1.75} absoluteStrokeWidth />}
              />
            </KeyValueGroup>
          </StateCard>
          <StateCard label="Badge" align="stretch" wide>
            <KeyValueGroup>
              <KeyValueRow label="Plan" value={<Badge tone="primary">Pro</Badge>} />
              <KeyValueRow label="Status" value={<Badge tone="verified">Active</Badge>} />
            </KeyValueGroup>
          </StateCard>
          <StateCard label="Truncated" align="stretch" wide>
            <KeyValueGroup>
              <KeyValueRow label="Email" value="alexandra.rivera.workspace@roboticela.com" />
              <KeyValueRow label="Username" value="@alex" />
            </KeyValueGroup>
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function ProfileButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {PROFILE_BUTTON_VARIANTS.map((variant) => (
        <ProfileButton key={variant} name="Alex Rivera" variant={variant} />
      ))}
    </div>
  )
}

function ProfileButtonStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={3}>
          {PROFILE_BUTTON_VARIANTS.map((variant) => (
            <StateCard key={variant} label={PROFILE_BUTTON_VARIANT_LABEL[variant]}>
              <ProfileButton name="Alex Rivera" variant={variant} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={2}>
          {PROFILE_BUTTON_LAYOUTS.map((layout) => (
            <StateCard key={layout} label={PROFILE_BUTTON_LAYOUT_LABEL[layout]} wide>
              <ProfileButton
                name="Alex Rivera"
                subtitle="alex@roboticela.com"
                layout={layout}
                variant={layout === 'avatar' ? 'fill' : layout === 'identity' ? 'ghost' : 'subtle'}
                size={layout === 'identity' ? 'md' : 'sm'}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={3}>
          {PROFILE_BUTTON_SIZES.map((size) => (
            <StateCard key={size} label={PROFILE_BUTTON_SIZE_LABEL[size]}>
              <ProfileButton name="Alex Rivera" size={size} layout="menu" variant="subtle" />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Presence">
        <StateGrid columns={2}>
          {AVATAR_STATUSES.filter((status) => status !== 'none').map((status) => (
            <StateCard key={status} label={AVATAR_STATUS_LABEL[status]}>
              <ProfileButton name="Alex Rivera" status={status} size="md" />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Shape">
        <StateGrid columns={2}>
          {AVATAR_SHAPES.map((shape) => (
            <StateCard key={shape} label={AVATAR_SHAPE_LABEL[shape]}>
              <ProfileButton name="Alex Rivera" shape={shape} size="md" />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={3}>
          {AVATAR_TONES.map((tone) => (
            <StateCard key={tone} label={AVATAR_TONE_LABEL[tone]}>
              <ProfileButton name="Alex Rivera" tone={tone} variant="ghost" size="md" />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Face">
        <StateGrid columns={3}>
          <StateCard label="Initials">
            <ProfileButton name="Alex Rivera" size="md" />
          </StateCard>
          <StateCard label="Photo">
            <ProfileButton name="Alex Rivera" src="/favicon.svg" size="md" />
          </StateCard>
          <StateCard label="Icon">
            <ProfileButton
              name="Alex Rivera"
              size="md"
              icon={<DkPersonUserProfile strokeWidth={1.5} absoluteStrokeWidth />}
            />
          </StateCard>
          <StateCard label="Empty">
            <ProfileButton size="md" />
          </StateCard>
          <StateCard label="Single name">
            <ProfileButton name="Alex" size="md" />
          </StateCard>
          <StateCard label="Badge">
            <ProfileButton name="Alex Rivera" size="md" badge={3} />
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={3}>
          <StateCard label="Rest">
            <ProfileButton name="Alex Rivera" size="md" />
          </StateCard>
          <StateCard label="Hover">
            <ProfileButton name="Alex Rivera" size="md" preview="hover" />
          </StateCard>
          <StateCard label="Focus">
            <ProfileButton name="Alex Rivera" size="md" preview="focus" />
          </StateCard>
          <StateCard label="Active">
            <ProfileButton name="Alex Rivera" size="md" preview="active" />
          </StateCard>
          <StateCard label="Open">
            <ProfileButton name="Alex Rivera" layout="menu" variant="subtle" open />
          </StateCard>
          <StateCard label="Loading">
            <ProfileButton name="Alex Rivera" size="md" loading />
          </StateCard>
          <StateCard label="Disabled">
            <ProfileButton name="Alex Rivera" size="md" disabled />
          </StateCard>
          <StateCard label="Identity, open">
            <ProfileButton
              name="Alex Rivera"
              subtitle="alex@roboticela.com"
              layout="identity"
              variant="ghost"
              size="md"
              status="online"
              open
            />
          </StateCard>
          <StateCard label="Menu, hover">
            <ProfileButton name="Alex Rivera" layout="menu" variant="pill" size="md" preview="hover" />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function AvatarPickerDemo() {
  const [src, setSrc] = useState<string | null>(null)
  return (
    <AvatarPicker
      name="Alex Rivera"
      src={src}
      onFile={(file) => setSrc(URL.createObjectURL(file))}
    />
  )
}

function AvatarPickerStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="State">
        <StateGrid columns={2}>
          <StateCard label="Add photo">
            <AvatarPicker name="Alex Rivera" onFile={() => undefined} />
          </StateCard>
          <StateCard label="Edit photo">
            <AvatarPicker name="Alex Rivera" src="/favicon.svg" onFile={() => undefined} onEdit={() => undefined} />
          </StateCard>
          <StateCard label="Disabled">
            <AvatarPicker name="Alex Rivera" disabled onFile={() => undefined} />
          </StateCard>
          <StateCard label="Disabled, photo">
            <AvatarPicker
              name="Alex Rivera"
              src="/favicon.svg"
              disabled
              onFile={() => undefined}
              onEdit={() => undefined}
            />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function AvatarEditorDemo() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button fullWidth={false} onClick={() => setOpen(true)}>
        Edit photo
      </Button>
      <AvatarEditor
        imageSrc="/favicon.svg"
        open={open}
        onCancel={() => setOpen(false)}
        onSave={async () => setOpen(false)}
        onChooseAnother={() => setOpen(false)}
        canRemove
        onRemove={async () => setOpen(false)}
      />
    </>
  )
}

function SocialProviderStack({
  providers = SOCIAL_LOGIN_PROVIDERS,
  loading = false,
  disabled = false,
  lastUsedProvider,
  loadingProvider,
  passkeyLabel,
}: {
  providers?: readonly SocialLoginProvider[]
  loading?: boolean
  disabled?: boolean
  lastUsedProvider?: SocialLoginProvider
  loadingProvider?: SocialLoginProvider
  passkeyLabel?: string
}) {
  return (
    <AuthProviderStack className="w-full max-w-[460px] gap-y-3">
      {providers.map((provider) => (
        <SocialLoginButton
          key={provider}
          provider={provider}
          loading={loading || loadingProvider === provider}
          disabled={disabled}
          lastUsed={lastUsedProvider === provider}
        >
          {provider === 'passkey' ? passkeyLabel : undefined}
        </SocialLoginButton>
      ))}
    </AuthProviderStack>
  )
}

function SocialDemo() {
  return (
    <div className="w-full max-w-[460px]">
      <SocialProviderStack />
      <div className="mt-3">
        <OtherWaysButton />
      </div>
    </div>
  )
}

function providerStackFor(provider: SocialLoginProvider): readonly SocialLoginProvider[] {
  return (SOCIAL_LOGIN_PRIMARY_PROVIDERS as readonly SocialLoginProvider[]).includes(provider)
    ? SOCIAL_LOGIN_PRIMARY_PROVIDERS
    : SOCIAL_LOGIN_MORE_PROVIDERS
}

const PROVIDER_STATE_LABEL: Record<SocialLoginProvider, string> = {
  roboticela: 'Roboticela',
  passkey: 'Passkey',
  google: 'Google',
  apple: 'Apple',
  microsoft: 'Microsoft',
  github: 'GitHub',
  facebook: 'Facebook',
  x: 'X',
  linkedin: 'LinkedIn',
  discord: 'Discord',
  slack: 'Slack',
}

function SocialStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Status">
        <div className="flex w-full flex-col gap-8">
          <StateCard label="Default" align="stretch" wide>
            <SocialProviderStack providers={SOCIAL_LOGIN_PRIMARY_PROVIDERS} />
          </StateCard>
          <StateCard label="Disabled" align="stretch" wide>
            <SocialProviderStack providers={SOCIAL_LOGIN_PRIMARY_PROVIDERS} disabled />
          </StateCard>
          <StateCard label="Last used (Google)" align="stretch" wide>
            <SocialProviderStack
              providers={SOCIAL_LOGIN_PRIMARY_PROVIDERS}
              lastUsedProvider="google"
              passkeyLabel="Sign in with Passkey"
            />
          </StateCard>
          <StateCard label="Last used (Passkey)" align="stretch" wide>
            <SocialProviderStack
              providers={SOCIAL_LOGIN_PRIMARY_PROVIDERS}
              lastUsedProvider="passkey"
              passkeyLabel="Sign in with Passkey"
            />
          </StateCard>
          <StateCard label="Last used (Roboticela)" align="stretch" wide>
            <SocialProviderStack
              providers={SOCIAL_LOGIN_PRIMARY_PROVIDERS}
              lastUsedProvider="roboticela"
              passkeyLabel="Sign in with Passkey"
            />
          </StateCard>
          <StateCard label="Other ways list" align="stretch" wide>
            <SocialProviderStack providers={SOCIAL_LOGIN_MORE_PROVIDERS} />
          </StateCard>
          {SOCIAL_LOGIN_PROVIDERS.map((provider) => (
            <StateCard
              key={provider}
              label={`Loading (${PROVIDER_STATE_LABEL[provider]})`}
              align="stretch"
              wide
            >
              <SocialProviderStack
                providers={providerStackFor(provider)}
                loadingProvider={provider}
                passkeyLabel="Sign in with Passkey"
              />
            </StateCard>
          ))}
        </div>
      </StateGroup>
    </StateStack>
  )
}

function MethodDemo() {
  const [value, setValue] = useState('email')
  return (
    <RadioGroup label="Verification method" className="w-full max-w-[460px] gap-3">
      {METHOD_DOC_SAMPLES.map((sample) => (
        <VerificationMethodCard
          key={sample.key}
          icon={sample.icon}
          title={sample.title}
          subtitle={sample.subtitle}
          disabled={'disabled' in sample ? sample.disabled : false}
          hint={'hint' in sample ? sample.hint : undefined}
          selected={!('disabled' in sample && sample.disabled) && value === sample.key}
          onClick={() => {
            if ('disabled' in sample && sample.disabled) return
            setValue(sample.key)
          }}
        />
      ))}
    </RadioGroup>
  )
}

const METHOD_DOC_GLYPH = { size: 28, strokeWidth: 1.6, absoluteStrokeWidth: true } as const

const METHOD_DOC_SAMPLES = [
  {
    key: 'email',
    title: 'Email',
    subtitle: 'Send a code to alex@roboticela.com.',
    icon: <DkEnvelopeMessageMail {...METHOD_DOC_GLYPH} />,
  },
  {
    key: 'passkey',
    title: 'Passkey',
    subtitle: 'Use Face ID, Touch ID, or your device screen lock.',
    icon: <DkFingerprintBiometricScanPattern {...METHOD_DOC_GLYPH} />,
  },
  {
    key: 'authenticator',
    title: 'Authenticator App',
    subtitle: 'Enter a code from Google Authenticator or similar.',
    icon: <DkHandheldMobilePhone {...METHOD_DOC_GLYPH} />,
  },
  {
    key: 'recovery',
    title: 'Recovery Code',
    subtitle: 'Not configured for this account',
    icon: <DkRoundKeyAccess {...METHOD_DOC_GLYPH} />,
    disabled: true,
    hint: 'Not configured for this account',
  },
  {
    key: 'device',
    title: 'Another Device',
    subtitle: 'No other signed-in devices',
    icon: <DkDevicesDesktopAndMobile {...METHOD_DOC_GLYPH} />,
    disabled: true,
    hint: 'Sign in on another device first',
  },
] as const

const METHOD_STATE_SAMPLE = METHOD_DOC_SAMPLES[0]

function MethodStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Method">
        <div className="flex w-full flex-col gap-8">
          {METHOD_DOC_SAMPLES.map((sample) => (
            <StateCard key={sample.key} label={sample.title} align="stretch" wide>
              <VerificationMethodCard
                icon={sample.icon}
                title={sample.title}
                subtitle={sample.subtitle}
                disabled={'disabled' in sample ? sample.disabled : false}
                hint={'hint' in sample ? sample.hint : undefined}
                selected={sample.key === 'email'}
              />
            </StateCard>
          ))}
        </div>
      </StateGroup>

      <StateGroup title="State">
        <div className="flex w-full flex-col gap-8">
          <StateCard label="Rest" align="stretch" wide>
            <VerificationMethodCard
              icon={METHOD_STATE_SAMPLE.icon}
              title={METHOD_STATE_SAMPLE.title}
              subtitle={METHOD_STATE_SAMPLE.subtitle}
            />
          </StateCard>
          <StateCard label="Selected" align="stretch" wide>
            <VerificationMethodCard
              icon={METHOD_STATE_SAMPLE.icon}
              title={METHOD_STATE_SAMPLE.title}
              subtitle={METHOD_STATE_SAMPLE.subtitle}
              selected
            />
          </StateCard>
          <StateCard label="Hover" align="stretch" wide inert>
            <VerificationMethodCard
              icon={METHOD_STATE_SAMPLE.icon}
              title={METHOD_STATE_SAMPLE.title}
              subtitle={METHOD_STATE_SAMPLE.subtitle}
              preview="hover"
            />
          </StateCard>
          <StateCard label="Hover, selected" align="stretch" wide inert>
            <VerificationMethodCard
              icon={METHOD_STATE_SAMPLE.icon}
              title={METHOD_STATE_SAMPLE.title}
              subtitle={METHOD_STATE_SAMPLE.subtitle}
              selected
              preview="hover"
            />
          </StateCard>
          <StateCard label="Focus" align="stretch" wide inert>
            <VerificationMethodCard
              icon={METHOD_STATE_SAMPLE.icon}
              title={METHOD_STATE_SAMPLE.title}
              subtitle={METHOD_STATE_SAMPLE.subtitle}
              preview="focus"
            />
          </StateCard>
          <StateCard label="Focus, selected" align="stretch" wide inert>
            <VerificationMethodCard
              icon={METHOD_STATE_SAMPLE.icon}
              title={METHOD_STATE_SAMPLE.title}
              subtitle={METHOD_STATE_SAMPLE.subtitle}
              selected
              preview="focus"
            />
          </StateCard>
          <StateCard label="Active" align="stretch" wide inert>
            <VerificationMethodCard
              icon={METHOD_STATE_SAMPLE.icon}
              title={METHOD_STATE_SAMPLE.title}
              subtitle={METHOD_STATE_SAMPLE.subtitle}
              preview="active"
            />
          </StateCard>
          <StateCard label="Active, selected" align="stretch" wide inert>
            <VerificationMethodCard
              icon={METHOD_STATE_SAMPLE.icon}
              title={METHOD_STATE_SAMPLE.title}
              subtitle={METHOD_STATE_SAMPLE.subtitle}
              selected
              preview="active"
            />
          </StateCard>
          <StateCard label="Disabled" align="stretch" wide>
            <VerificationMethodCard
              icon={METHOD_DOC_SAMPLES[3].icon}
              title={METHOD_DOC_SAMPLES[3].title}
              subtitle={METHOD_DOC_SAMPLES[3].subtitle}
              disabled
              hint={METHOD_DOC_SAMPLES[3].hint}
            />
          </StateCard>
          <StateCard label="Disabled, selected" align="stretch" wide>
            <VerificationMethodCard
              icon={METHOD_DOC_SAMPLES[3].icon}
              title={METHOD_DOC_SAMPLES[3].title}
              subtitle={METHOD_DOC_SAMPLES[3].subtitle}
              selected
              disabled
              hint={METHOD_DOC_SAMPLES[3].hint}
            />
          </StateCard>
        </div>
      </StateGroup>

      <StateGroup title="Group">
        <div className="flex w-full flex-col gap-8">
          <StateCard label="Default" align="stretch" wide>
            <RadioGroup label="Verification method" className="gap-3">
              {METHOD_DOC_SAMPLES.filter((sample) => !('disabled' in sample && sample.disabled)).map(
                (sample) => (
                  <VerificationMethodCard
                    key={sample.key}
                    icon={sample.icon}
                    title={sample.title}
                    subtitle={sample.subtitle}
                    selected={sample.key === 'email'}
                  />
                ),
              )}
            </RadioGroup>
          </StateCard>
          <StateCard label="Full list" align="stretch" wide>
            <RadioGroup label="Verification method" className="gap-3">
              {METHOD_DOC_SAMPLES.map((sample) => (
                <VerificationMethodCard
                  key={sample.key}
                  icon={sample.icon}
                  title={sample.title}
                  subtitle={sample.subtitle}
                  disabled={'disabled' in sample ? sample.disabled : false}
                  hint={'hint' in sample ? sample.hint : undefined}
                  selected={sample.key === 'email'}
                />
              ))}
            </RadioGroup>
          </StateCard>
          <StateCard label="None selected" align="stretch" wide>
            <RadioGroup label="Verification method" className="gap-3">
              {METHOD_DOC_SAMPLES.filter((sample) => !('disabled' in sample && sample.disabled)).map(
                (sample) => (
                  <VerificationMethodCard
                    key={sample.key}
                    icon={sample.icon}
                    title={sample.title}
                    subtitle={sample.subtitle}
                  />
                ),
              )}
            </RadioGroup>
          </StateCard>
        </div>
      </StateGroup>
    </StateStack>
  )
}

const TEXT_PROPS: PropRow[] = [
  p(
    'tone',
    "'primary' | 'secondary' | 'tertiary' | 'disabled' | 'link' | 'success' | 'warning' | 'danger' | 'on-brand'",
    'Matches the variant',
    'Color. Headings default to primary; content to secondary; caption to tertiary.',
  ),
  p('align', "'start' | 'center' | 'end'", "'start'", 'Horizontal alignment.'),
  p('as', 'ElementType', 'Semantic default', 'Rendered element. Override when the visual role differs from the HTML tag.'),
]

const ALERT_VARIANT_LABEL: Record<AlertVariant, string> = {
  subtle: 'Subtle',
  outline: 'Outline',
  solid: 'Solid',
  ghost: 'Ghost',
}

const ALERT_TONE_LABEL: Record<AlertTone, string> = {
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
  danger: 'Danger',
  neutral: 'Neutral',
}

const ALERT_SIZE_LABEL: Record<AlertSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

const ALERT_COPY = {
  title: 'Verify your email',
  body: 'We sent a link to alex@roboticela.com.',
} as const

function AlertAction({
  tone = 'info',
  solid = false,
  children = 'Resend',
}: {
  tone?: AlertTone
  solid?: boolean
  children?: string
}) {
  const color =
    solid || tone === 'neutral'
      ? solid
        ? 'text-text-on-brand hover:text-text-on-brand hover:decoration-current'
        : 'text-text-primary'
      : tone === 'success'
        ? 'text-success hover:text-success'
        : tone === 'warning'
          ? 'text-warning hover:text-warning'
          : undefined

  return (
    <Anchor
      size="sm"
      tone={tone === 'danger' ? 'danger' : 'brand'}
      className={color}
    >
      {children}
    </Anchor>
  )
}

function AlertDismissPlay() {
  const [open, setOpen] = useState(true)
  if (!open) {
    return (
      <Button variant="ghost" size="sm" fullWidth={false} onClick={() => setOpen(true)}>
        Show alert
      </Button>
    )
  }
  return (
    <Alert title="Two-factor is off" onDismiss={() => setOpen(false)}>
      Ask teammates to finish setup before Friday.
    </Alert>
  )
}

function AlertDemo() {
  return (
    <div className="flex w-full max-w-[460px] flex-col gap-4">
      {ALERT_VARIANTS.map((variant) => (
        <Alert
          key={variant}
          variant={variant}
          title={`${ALERT_VARIANT_LABEL[variant]} alert`}
        >
          {ALERT_COPY.body}
        </Alert>
      ))}
    </div>
  )
}

function AlertStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {ALERT_VARIANTS.map((variant) => (
            <StateCard key={variant} label={ALERT_VARIANT_LABEL[variant]} align="stretch" wide>
              <Alert variant={variant} title={ALERT_COPY.title}>
                {ALERT_COPY.body}
              </Alert>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {ALERT_TONES.map((tone) => (
            <StateCard key={tone} label={ALERT_TONE_LABEL[tone]} align="stretch" wide>
              <Alert
                tone={tone}
                title={
                  tone === 'success'
                    ? 'Backup complete'
                    : tone === 'warning'
                      ? 'Quota at 88%'
                      : tone === 'danger'
                        ? 'Payment failed'
                        : tone === 'neutral'
                          ? 'Maintenance tonight'
                          : ALERT_COPY.title
                }
              >
                {tone === 'success'
                  ? 'Your changes are live.'
                  : tone === 'warning'
                    ? 'Storage is almost full.'
                    : tone === 'danger'
                      ? 'Update the card on file.'
                      : tone === 'neutral'
                        ? 'The workspace will pause from 01:00 to 03:00 UTC.'
                        : ALERT_COPY.body}
              </Alert>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {ALERT_SIZES.map((size) => (
            <StateCard key={size} label={ALERT_SIZE_LABEL[size]} align="stretch" wide>
              <Alert size={size} title={ALERT_COPY.title}>
                {ALERT_COPY.body}
              </Alert>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          <StateCard label="Title and body" align="stretch" wide>
            <Alert title={ALERT_COPY.title}>{ALERT_COPY.body}</Alert>
          </StateCard>
          <StateCard label="Title only" align="stretch" wide>
            <Alert title="Backup complete" />
          </StateCard>
          <StateCard label="Body only" align="stretch" wide>
            <Alert>{ALERT_COPY.body}</Alert>
          </StateCard>
          <StateCard label="No icon" align="stretch" wide>
            <Alert icon={false} title={ALERT_COPY.title}>
              {ALERT_COPY.body}
            </Alert>
          </StateCard>
          <StateCard label="Dismiss" align="stretch" wide>
            <AlertDismissPlay />
          </StateCard>
          <StateCard label="Action" align="stretch" wide>
            <Alert title="Invite expired" action={<AlertAction />}>
              Send a new link to join this workspace.
            </Alert>
          </StateCard>
          <StateCard label="Outline, warning" align="stretch" wide>
            <Alert variant="outline" tone="warning" title="Quota at 88%">
              Storage is almost full.
            </Alert>
          </StateCard>
          <StateCard label="Solid, danger" align="stretch" wide>
            <Alert
              variant="solid"
              tone="danger"
              title="Payment failed"
              action={<AlertAction tone="danger" solid>Update card</AlertAction>}
              onDismiss={() => undefined}
            >
              Update the card on file.
            </Alert>
          </StateCard>
          <StateCard label="Ghost, success" align="stretch" wide>
            <Alert variant="ghost" tone="success" title="Saved">
              Your changes are live.
            </Alert>
          </StateCard>
          <StateCard label="Neutral, dismiss" align="stretch" wide>
            <Alert
              tone="neutral"
              title="Maintenance tonight"
              onDismiss={() => undefined}
            >
              The workspace will pause from 01:00 to 03:00 UTC.
            </Alert>
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function SheetNavFrame({
  children,
  onDark = false,
  body = true,
}: {
  children: ReactNode
  onDark?: boolean
  body?: boolean
}) {
  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-[18px] border',
        onDark ? 'border-[#38383a] bg-black' : 'border-border-default bg-bg-elevated',
      )}
    >
      {children}
      {body ? <div className={cn('h-14', onDark ? 'bg-black' : 'bg-bg-elevated')} /> : null}
    </div>
  )
}

function SheetNavPreview({
  variant = 'fill',
  layout = 'plain',
  size = 'md',
  tone = 'brand',
  title = 'Edit profile',
  subtitle,
  onDark,
  body,
  ...rest
}: {
  variant?: SheetNavVariant
  layout?: SheetNavLayout
  size?: SheetNavSize
  tone?: SheetNavTone
  title?: string
  subtitle?: string
  onDark?: boolean
  body?: boolean
  cancelDisabled?: boolean
  doneDisabled?: boolean
  loading?: boolean
  loadingText?: string
  preview?: 'hover' | 'active' | 'disabled'
  doneLabel?: ReactNode
  cancelLabel?: string
  onDone?: () => void
}) {
  return (
    <SheetNavFrame onDark={onDark} body={body}>
      <SheetNav
        title={title}
        subtitle={subtitle}
        variant={variant}
        layout={layout}
        size={size}
        tone={tone}
        onDark={onDark}
        onCancel={() => undefined}
        onDone={rest.onDone ?? (() => undefined)}
        {...rest}
      />
    </SheetNavFrame>
  )
}

function SheetNavDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      {SHEET_NAV_VARIANTS.map((variant) => (
        <SheetNavPreview key={variant} variant={variant} title={SHEET_NAV_VARIANT_LABEL[variant]} />
      ))}
    </div>
  )
}

function SheetNavStates() {
  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {SHEET_NAV_VARIANTS.map((variant) => (
            <StateCard
              key={variant}
              label={SHEET_NAV_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SheetNavPreview variant={variant} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Layout">
        <StateGrid columns={2}>
          {SHEET_NAV_LAYOUTS.map((layout) => (
            <StateCard
              key={layout}
              label={SHEET_NAV_LAYOUT_LABEL[layout]}
              align="stretch"
              wide
              size="lg"
              className="bg-bg-primary"
            >
              <SheetNavPreview
                layout={layout}
                title={layout === 'back' ? 'Photo' : layout === 'large' ? 'Settings' : 'Edit profile'}
                subtitle={layout === 'large' ? 'Name, photo, and username' : undefined}
                cancelLabel={layout === 'back' ? 'Library' : undefined}
                doneLabel={layout === 'prominent' ? 'Add' : undefined}
                body={layout !== 'large'}
              />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {SHEET_NAV_SIZES.map((size) => (
            <StateCard
              key={size}
              label={SHEET_NAV_SIZE_LABEL[size]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SheetNavPreview size={size} />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {SHEET_NAV_TONES.map((tone) => (
            <StateCard
              key={tone}
              label={SHEET_NAV_TONE_LABEL[tone]}
              align="stretch"
              wide
              className="bg-bg-primary"
            >
              <SheetNavPreview
                tone={tone}
                title={tone === 'danger' ? 'This photo' : 'Edit profile'}
                doneLabel={tone === 'danger' ? 'Delete' : 'Done'}
              />
            </StateCard>
          ))}
          <StateCard
            label="Prominent, brand"
            align="stretch"
            wide
            className="bg-bg-primary"
          >
            <SheetNavPreview layout="prominent" doneLabel="Add" />
          </StateCard>
          <StateCard
            label="Prominent, danger"
            align="stretch"
            wide
            className="bg-bg-primary"
          >
            <SheetNavPreview layout="prominent" tone="danger" title="This photo" doneLabel="Delete" />
          </StateCard>
        </StateGrid>
      </StateGroup>

      <StateGroup title="On dark">
        <StateGrid columns={2}>
          {SHEET_NAV_VARIANTS.map((variant) => (
            <StateCard
              key={`dark-${variant}`}
              label={SHEET_NAV_VARIANT_LABEL[variant]}
              align="stretch"
              wide
              className="bg-black"
            >
              <SheetNavPreview variant={variant} onDark title="Move and Scale" />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          <StateCard label="Default" align="stretch" wide className="bg-bg-primary">
            <SheetNavPreview />
          </StateCard>
          <StateCard label="Subtitle" align="stretch" wide className="bg-bg-primary">
            <SheetNavPreview subtitle="Name, photo, and username" />
          </StateCard>
          <StateCard label="Disabled Done" align="stretch" wide className="bg-bg-primary">
            <SheetNavPreview doneDisabled />
          </StateCard>
          <StateCard label="Disabled Cancel" align="stretch" wide className="bg-bg-primary">
            <SheetNavPreview cancelDisabled />
          </StateCard>
          <StateCard label="Loading" align="stretch" wide className="bg-bg-primary">
            <SheetNavPreview loading loadingText="Saving" />
          </StateCard>
          <StateCard label="Hover" align="stretch" wide className="bg-bg-primary">
            <SheetNavPreview preview="hover" />
          </StateCard>
          <StateCard label="Pressed" align="stretch" wide className="bg-bg-primary">
            <SheetNavPreview preview="active" />
          </StateCard>
          <StateCard label="Disabled" align="stretch" wide className="bg-bg-primary">
            <SheetNavPreview preview="disabled" />
          </StateCard>
          <StateCard label="No trailing" align="stretch" wide className="bg-bg-primary">
            <SheetNavFrame>
              <SheetNav title="Filters" onCancel={() => undefined} />
            </SheetNavFrame>
          </StateCard>
          <StateCard label="Long title" align="stretch" wide className="bg-bg-primary">
            <SheetNavPreview title="Edit your public profile and username" />
          </StateCard>
          <StateCard label="Close, no Done" align="stretch" wide className="bg-bg-primary">
            <SheetNavFrame>
              <SheetNav title="Info" layout="close" onCancel={() => undefined} />
            </SheetNavFrame>
          </StateCard>
          <StateCard label="Back, nested" align="stretch" wide className="bg-bg-primary">
            <SheetNavPreview layout="back" title="Details" cancelLabel="Album" doneLabel="Select" />
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

function DividerDemo() {
  return (
    <div className="flex w-full max-w-[460px] flex-col">
      <Caption align="center">Sign in with email</Caption>
      <Divider>or continue with</Divider>
      <Caption align="center">Roboticela, Apple, Google, GitHub</Caption>
    </div>
  )
}

function DividerStates() {
  const sparkle = (
    <DkSparkleHighlightBurst size={14} strokeWidth={1.75} absoluteStrokeWidth aria-hidden />
  )

  return (
    <StateStack gap={10}>
      <StateGroup title="Appearance">
        <StateGrid columns={2}>
          {DIVIDER_VARIANTS.map((variant) => (
            <StateCard key={variant} label={DIVIDER_VARIANT_LABEL[variant]} align="stretch" wide>
              <Divider variant={variant} flush />
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Labeled">
        <StateGrid columns={2}>
          {DIVIDER_VARIANTS.map((variant) => (
            <StateCard key={variant} label={DIVIDER_VARIANT_LABEL[variant]} align="stretch" wide>
              <Divider variant={variant} flush>
                or continue with
              </Divider>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Size">
        <StateGrid columns={2}>
          {DIVIDER_SIZES.map((size) => (
            <StateCard key={size} label={DIVIDER_SIZE_LABEL[size]} align="stretch" wide>
              <Divider size={size} flush>
                or continue with
              </Divider>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Tone">
        <StateGrid columns={2}>
          {DIVIDER_TONES.map((tone) => (
            <StateCard key={tone} label={DIVIDER_TONE_LABEL[tone]} align="stretch" wide>
              <Divider tone={tone} flush>
                {tone === 'success'
                  ? 'Verified'
                  : tone === 'warning'
                    ? 'Review required'
                    : tone === 'danger'
                      ? 'Danger zone'
                      : tone === 'brand'
                        ? 'DevKit'
                        : 'or continue with'}
              </Divider>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Align">
        <StateGrid columns={2}>
          {DIVIDER_ALIGNS.map((align) => (
            <StateCard key={align} label={DIVIDER_ALIGN_LABEL[align]} align="stretch" wide>
              <Divider align={align} flush>
                {align === 'start' ? 'Today' : align === 'end' ? 'Optional' : 'or continue with'}
              </Divider>
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="Orientation">
        <StateGrid columns={2}>
          {DIVIDER_ORIENTATIONS.map((orientation) => (
            <StateCard key={orientation} label={DIVIDER_ORIENTATION_LABEL[orientation]} align="stretch" wide>
              {orientation === 'horizontal' ? (
                <Divider flush>or continue with</Divider>
              ) : (
                <div className="flex h-16 items-center justify-center gap-3">
                  <Caption>Today</Caption>
                  <Divider orientation="vertical" flush />
                  <Caption>This week</Caption>
                  <Divider orientation="vertical" flush />
                  <Caption>All</Caption>
                </div>
              )}
            </StateCard>
          ))}
        </StateGrid>
      </StateGroup>

      <StateGroup title="State">
        <StateGrid columns={2}>
          <StateCard label="Default" align="stretch" wide>
            <Divider flush />
          </StateCard>
          <StateCard label="Labeled" align="stretch" wide>
            <Divider flush>or continue with</Divider>
          </StateCard>
          <StateCard label="Icon" align="stretch" wide>
            <Divider flush icon={sparkle} />
          </StateCard>
          <StateCard label="Icon and label" align="stretch" wide>
            <Divider flush icon={sparkle}>
              New
            </Divider>
          </StateCard>
          <StateCard label="Inset" align="stretch" wide>
            <div className="w-full overflow-hidden rounded-[12px] bg-bg-elevated dark:bg-bg-tertiary">
              <p className="m-0 px-4 py-3 text-[15px] text-text-primary">Notifications</p>
              <Divider inset flush />
              <p className="m-0 px-4 py-3 text-[15px] text-text-primary">Sounds</p>
              <Divider inset flush />
              <p className="m-0 px-4 py-3 text-[15px] text-text-primary">Haptics</p>
            </div>
          </StateCard>
          <StateCard label="Fade, labeled" align="stretch" wide>
            <Divider variant="fade" flush>
              or continue with
            </Divider>
          </StateCard>
          <StateCard label="Start, section" align="stretch" wide>
            <Divider align="start" flush>
              Today
            </Divider>
          </StateCard>
          <StateCard label="Dashed" align="stretch" wide>
            <Divider variant="dashed" flush>
              or
            </Divider>
          </StateCard>
          <StateCard label="Disabled" align="stretch" wide>
            <Divider disabled flush>
              or continue with
            </Divider>
          </StateCard>
          <StateCard label="Long label" align="stretch" wide>
            <Divider flush>or continue with email, passkey, or a provider</Divider>
          </StateCard>
          <StateCard label="Vertical, labeled" align="stretch" wide>
            <div className="flex h-[140px] justify-center">
              <Divider orientation="vertical" flush>
                or
              </Divider>
            </div>
          </StateCard>
          <StateCard label="Danger zone" align="stretch" wide>
            <Divider tone="danger" align="start" flush>
              Danger zone
            </Divider>
          </StateCard>
        </StateGrid>
      </StateGroup>
    </StateStack>
  )
}

const DOCS: Record<string, DocDef> = {
  heading: {
    title: 'Heading',
    description: 'The title of a page or section. Display is a hero. Levels 1, 2, and 3 follow the document outline.',
    wide: true,
    stateColumns: 1,
    ...headingGuide,
    Demo: () => (
      <div className="flex w-full flex-col gap-2">
        <Heading>A pressable control that triggers an action.</Heading>
        <Subhead>Use your DevKit Account to continue.</Subhead>
      </div>
    ),
    code: `<Heading>A pressable control that triggers an action.</Heading>\n<Subhead>Use your DevKit Account to continue.</Subhead>\n`,
    states: [
      { label: 'Display', node: <Heading level="display">DevKit.</Heading> },
      { label: 'Heading 1', node: <Heading level={1}>Welcome back</Heading> },
      { label: 'Heading 2', node: <Heading level={2}>Projects</Heading> },
      { label: 'Heading 3', node: <Heading level={3}>Account</Heading> },
      { label: 'Secondary', node: <Heading level={3} tone="secondary">Account</Heading> },
      { label: 'Center', node: <Heading level={3} align="center">Account</Heading> },
    ],
    props: [
      p('level', "1 | 2 | 3 | 'display'", '1', 'Display or h1–h3 on the type scale.'),
      ...TEXT_PROPS,
    ],
  },
  subhead: {
    title: 'Subhead',
    description: 'One supporting sentence that sits directly under a heading.',
    wide: true,
    ...subheadGuide,
    Demo: () => (
      <div className="flex w-full flex-col gap-2">
        <Heading level={3}>Welcome back</Heading>
        <Subhead>Use your DevKit Account to continue.</Subhead>
      </div>
    ),
    code: `<Heading level={3}>Welcome back</Heading>\n<Subhead>Use your DevKit Account to continue.</Subhead>\n`,
    states: [
      { label: 'Default', node: <Subhead>Use your DevKit Account to continue.</Subhead> },
      { label: 'Primary', node: <Subhead tone="primary">Use your DevKit Account to continue.</Subhead> },
      { label: 'Tertiary', node: <Subhead tone="tertiary">Use your DevKit Account to continue.</Subhead> },
      { label: 'Center', node: <Subhead align="center">Use your DevKit Account to continue.</Subhead> },
    ],
    props: TEXT_PROPS,
  },
  body: {
    title: 'Body',
    description: 'Paragraphs at the reading size. Use the default for pages and the small size inside cards.',
    wide: true,
    ...bodyGuide,
    Demo: () => (
      <Body>
        A pressable control that triggers an action. Short supporting copy sits at the content size so
        it stays readable on every screen.
      </Body>
    ),
    code: `<Body>\n  A pressable control that triggers an action.\n</Body>\n<Body size="sm">Secondary copy uses the small content size.</Body>\n`,
    states: [
      {
        label: 'Content',
        node: (
          <Body>A pressable control that triggers an action. Short supporting copy stays readable.</Body>
        ),
      },
      {
        label: 'Content small',
        node: <Body size="sm">Secondary copy uses the small content size for captions inside cards.</Body>,
      },
      { label: 'Primary', node: <Body tone="primary">Primary content for emphasis on a light surface.</Body> },
      { label: 'Danger', node: <Body tone="danger">This action cannot be undone.</Body> },
      { label: 'Disabled', node: <Body tone="disabled">This setting is unavailable.</Body> },
    ],
    props: [p('size', "'md' | 'sm'", "'md'", 'Content or content-small.'), ...TEXT_PROPS],
  },
  caption: {
    title: 'Caption',
    description: 'Quiet supporting copy for timestamps, counts, and hints. Do not put essential instructions here.',
    ...captionGuide,
    Demo: () => <Caption>Last updated Aug 29, 2026</Caption>,
    code: `<Caption>Last updated Aug 29, 2026</Caption>\n`,
    states: [
      { label: 'Default', node: <Caption>Last updated Aug 29, 2026</Caption> },
      { label: 'Secondary', node: <Caption tone="secondary">12 members</Caption> },
      { label: 'Success', node: <Caption tone="success">Saved just now</Caption> },
      { label: 'Danger', node: <Caption tone="danger">This action cannot be undone.</Caption> },
      { label: 'Center', node: <Caption align="center">Optional</Caption> },
    ],
    props: TEXT_PROPS,
  },
  eyebrow: {
    title: 'Eyebrow',
    description: 'A short uppercase kicker that sits above a heading. Keep it to a few words.',
    wide: true,
    ...eyebrowGuide,
    Demo: () => (
      <div className="flex w-full flex-col gap-2">
        <Eyebrow>Components / Typography</Eyebrow>
        <Heading level={3}>Text</Heading>
      </div>
    ),
    code: `<Eyebrow>Components / Typography</Eyebrow>\n<Heading level={3}>Text</Heading>\n`,
    states: [
      { label: 'Default', node: <Eyebrow>Components / Typography</Eyebrow> },
      { label: 'Link', node: <Eyebrow tone="link">New</Eyebrow> },
      { label: 'Center', node: <Eyebrow align="center">Product</Eyebrow> },
    ],
    props: TEXT_PROPS,
  },
  label: {
    title: 'Label',
    description: 'Medium weight text for fields and controls. In forms, prefer Field Label so the input stays associated.',
    ...labelGuide,
    Demo: () => <Label>Email address</Label>,
    code: `<Label>Email address</Label>\n`,
    states: [
      { label: 'Default', node: <Label>Email address</Label> },
      { label: 'Secondary', node: <Label tone="secondary">Optional</Label> },
      { label: 'Disabled', node: <Label tone="disabled">Unavailable</Label> },
      { label: 'Danger', node: <Label tone="danger">Invalid email</Label> },
    ],
    props: TEXT_PROPS,
  },
  'icon-button': {
    title: 'Icon Button',
    description: 'A compact button that shows only a glyph. The label prop is the accessible name.',
    ...iconButtonGuide,
    Demo: IconButtonDemo,
    wide: true,
    code: `<IconButton label="Copy" onAction={() => copy()}>\n  <DkClipboardCopyDuplicate />\n</IconButton>\n`,
    states: [
      {
        label: 'Ghost',
        node: (
          <IconButton label="Search">
            <DkMagnifyingGlassFind size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Subtle',
        node: (
          <IconButton label="Favorite" variant="subtle">
            <DkFavoriteHeartLove size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Outline',
        node: (
          <IconButton label="Share" variant="outline">
            <DkShareExportForward size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Primary',
        node: (
          <IconButton label="Add" variant="primary">
            <DkAddPlusCreate size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Danger',
        node: (
          <IconButton label="Delete" variant="danger">
            <DkWasteBinDelete size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Small',
        node: (
          <IconButton label="Settings" size="sm">
            <DkGearSettingsPreferences size={16} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Badge',
        node: (
          <IconButton label="Inbox" badge={3}>
            <DkEnvelopeMessageMail size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Action',
        node: (
          <IconButton label="Save" variant="primary" onAction={() => wait(900)}>
            <DkFloppyDiskSave size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Loading',
        node: (
          <IconButton label="Refreshing" loading>
            <DkRefreshClockwiseRotate size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Success',
        node: (
          <IconButton label="Copied" status="success">
            <DkClipboardCopyDuplicate size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Success primary',
        node: (
          <IconButton label="Saved" variant="primary" status="success">
            <DkFloppyDiskSave size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Error',
        node: (
          <IconButton label="Failed" status="error">
            <DkShareExportForward size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Loading primary',
        node: (
          <IconButton label="Saving" variant="primary" loading>
            <DkFloppyDiskSave size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Disabled',
        node: (
          <IconButton label="Locked" disabled>
            <DkPadlockSecureClosed size={18} {...glyph} />
          </IconButton>
        ),
      },
      {
        label: 'Disabled outline',
        node: (
          <IconButton label="Settings" variant="outline" disabled>
            <DkGearSettingsPreferences size={18} {...glyph} />
          </IconButton>
        ),
      },
    ],
    props: [
      p('label', 'string', '—', 'Accessible name. Required.'),
      p("variant", "'ghost' | 'subtle' | 'outline' | 'primary' | 'danger'", "'ghost'", 'Visual style of the control.'),
      p("size", "'sm' | 'md'", "'md'", 'Control size.'),
      p('loading', 'boolean', 'false', 'Replaces the icon with a spinner and disables the control.'),
      p("status", "'idle' | 'loading' | 'success' | 'error'", "'idle'", 'Controlled overlay. Success shows a check; error shows an X.'),
      p('onAction', '() => void | Promise<void>', 'undefined', 'Runs on click: spinner, then check or X, then the original icon.'),
      p('successMs', 'number', '1600', 'How long the check or X stays before the icon returns.'),
      p('badge', 'number | string', 'undefined', 'Optional count overlay.'),
      p('disabled', 'boolean', 'false', 'Prevents press. Also applied while loading, success, or error.'),
    ],
  },
  switch: {
    title: 'Switch',
    description: 'An immediate on or off setting. The change applies as soon as the control is flipped.',
    ...switchGuide,
    Demo: SwitchDemo,
    wide: true,
    code: `<Switch variant="primary" checked={on} onChange={setOn} label="Primary" />
<Switch variant="subtle" checked={on} onChange={setOn} label="Subtle" />
<Switch variant="outline" checked={on} onChange={setOn} label="Outline" />
<Switch variant="ghost" checked={on} onChange={setOn} label="Ghost" />
<Switch variant="danger" checked={on} onChange={setOn} label="Danger" />

<SwitchGroup label="Preferences">
  <SwitchItem title="Notifications" checked={on} onChange={setOn} />
  <SwitchItem title="Weekly digest" checked={digest} onChange={setDigest} variant="subtle" />
</SwitchGroup>
`,
    states: [
      { label: 'Primary off', node: <Switch checked={false} label="Primary off" /> },
      { label: 'Primary on', node: <Switch checked label="Primary on" /> },
      { label: 'Subtle off', node: <Switch checked={false} variant="subtle" label="Subtle off" /> },
      { label: 'Subtle on', node: <Switch checked variant="subtle" label="Subtle on" /> },
      { label: 'Outline off', node: <Switch checked={false} variant="outline" label="Outline off" /> },
      { label: 'Outline on', node: <Switch checked variant="outline" label="Outline on" /> },
      { label: 'Ghost off', node: <Switch checked={false} variant="ghost" label="Ghost off" /> },
      { label: 'Ghost on', node: <Switch checked variant="ghost" label="Ghost on" /> },
      { label: 'Danger off', node: <Switch checked={false} variant="danger" label="Danger off" /> },
      { label: 'Danger on', node: <Switch checked variant="danger" label="Danger on" /> },
      { label: 'Small', node: <Switch checked size="sm" label="Small" /> },
      { label: 'Medium', node: <Switch checked size="md" label="Medium" /> },
      { label: 'Large', node: <Switch checked size="lg" label="Large" /> },
      { label: 'Disabled', node: <Switch checked disabled label="Disabled" /> },
      { label: 'Loading', node: <Switch checked loading label="Loading" /> },
    ],
    props: [
      p('checked', 'boolean', '—', 'Whether the switch is on.'),
      p('onChange', '(next: boolean) => void', '—', 'Called when the value changes.'),
      p("variant", "'primary' | 'subtle' | 'outline' | 'ghost' | 'danger'", "'primary'", 'Track style. Danger is for destructive settings only.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Track size.'),
      p('disabled', 'boolean', 'false', 'Prevents interaction.'),
      p('loading', 'boolean', 'false', 'Shows a spinner in the thumb.'),
      p('label', 'string', 'undefined', 'Accessible name on Switch. Visible title lives on SwitchItem.'),
      p('title', 'string', '—', 'Visible label on SwitchItem.'),
      p('description', 'string', 'undefined', 'Optional supporting copy on SwitchItem.'),
    ],
  },
  'segmented-control': {
    title: 'Segmented Control',
    description: 'A small set of options where only one can be selected. Use it for views, ranges, and toolbars.',
    ...segmentedGuide,
    Demo: SegmentedDemo,
    wide: true,
    code: `<SegmentedControl mode="grouped" value={view} onChange={setView} options={[...]} />

<SegmentedToolbar>
  <SegmentedControl content="icon" value={align} onChange={setAlign} options={[...]} />
  <IconButton label="Refresh" onAction={reload}><DkRefreshClockwiseRotate /></IconButton>
  <Button fullWidth={false}>Save</Button>
</SegmentedToolbar>
`,
    statesContent: <SegmentedStates />,
    props: [
      p('value', 'string', '—', 'The selected option.'),
      p('options', 'SegmentedOption[]', '—', 'Labels, values, optional icons, badges, loading, and onAction.'),
      p('onChange', '(value: T) => void', '—', 'Called when the selection changes.'),
      p("mode", "'inset' | 'grouped'", "'inset'", 'Sliding thumb, or joined buttons with a selected fill.'),
      p("variant", "'subtle' | 'outline' | 'ghost' | 'primary' | 'pill'", "'subtle'", 'Track and selected style.'),
      p("content", "'label' | 'icon' | 'both'", "'label'", 'Text only, icons only, or icon plus text.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Control height. Medium is 44px, matching buttons and fields.'),
      p('fullWidth', 'boolean', 'false', 'Stretches the control to the container width.'),
      p('leading', 'ReactNode', 'undefined', 'Control before the segments, such as an Icon Button.'),
      p('trailing', 'ReactNode', 'undefined', 'Control after the segments, such as a Button.'),
      p('onAction', '(value: T) => void | Promise<void>', 'undefined', 'Runs after a segment is pressed. Shows a spinner, then a check or X. Arrow keys only change the selection.'),
      p('successMs', 'number', '1600', 'How long the check or X stays visible after onAction.'),
      p('disabled', 'boolean', 'false', 'Prevents interaction with every option.'),
      p('label', 'string', 'undefined', 'Optional caption above the control, and the accessible name.'),
      p('icon', 'ReactNode', 'undefined', 'Leading icon on a SegmentedOption.'),
      p('badge', 'number | string', 'undefined', 'Trailing count on a SegmentedOption.'),
      p('loading', 'boolean', 'false', 'Shows a spinner on that segment.'),
      p('status', "'idle' | 'loading' | 'success' | 'error'", 'undefined', 'Controlled overlay on a SegmentedOption.'),
      p('options[].onAction', '() => void | Promise<void>', 'undefined', 'Per-option action. Overrides the control-level onAction.'),
    ],
  },
  'confirm-action': {
    title: 'Confirm Action',
    ...confirmActionGuide,
    description: 'A button that asks once, then runs the action on a second press. Use it for remove, sign out, and similar row actions.',
    Demo: ConfirmActionDemo,
    wide: true,
    code: `<ConfirmAction onConfirm={remove} />
<ConfirmAction variant="ghost" onConfirm={remove} />
<ConfirmAction variant="subtle" onConfirm={remove} />
<ConfirmAction variant="outline" onConfirm={remove} />
<ConfirmAction variant="solid" onConfirm={remove} />
<ConfirmAction variant="solid" tone="brand" label="Send" confirmLabel="Send now?" onConfirm={send} />
`,
    statesContent: <ConfirmActionStates />,
    props: [
      p('onConfirm', '() => void', '—', 'Runs after the second tap.'),
      p('label', 'string', "'Remove'", 'Idle label.'),
      p('confirmLabel', 'string', "'Confirm?'", 'Armed label.'),
      p("variant", "'text' | 'ghost' | 'subtle' | 'outline' | 'solid'", "'text'", 'Chrome. Text is compact; the rest are pills. Armed state fills with the tone.'),
      p("tone", "'danger' | 'brand' | 'neutral'", "'danger'", 'Color. Danger for destructive, brand for send/publish, neutral for archive/move.'),
      p("size", "'sm' | 'md' | 'lg'", "'sm'", 'Pill height. Text stays compact until armed.'),
      p('loading', 'boolean', 'false', 'Shows a spinner and disables the control.'),
      p('loadingText', 'string', "'Removing…'", 'Label while loading.'),
      p('resetMs', 'number', '3000', 'How long the armed label stays before returning to idle.'),
      p('disabled', 'boolean', 'false', 'Prevents press.'),
    ],
  },
  'text-field': {
    title: 'Text Field',
    description: 'Collect a short answer such as a name, email, or search query. Use this when the value fits on one line.',
    ...textFieldGuide,
    Demo: TextFieldDemo,
    wide: true,
    code: `<TextField icon={<DkEnvelopeMessageMail />} placeholder="Email address" />
<TextField variant="subtle" icon={<DkEnvelopeMessageMail />} placeholder="Email address" />
<TextField variant="ghost" icon={<DkEnvelopeMessageMail />} placeholder="Email address" />
<TextField variant="underline" icon={<DkEnvelopeMessageMail />} placeholder="Email address" />
<TextField variant="pill" icon={<DkMagnifyingGlassFind />} placeholder="Search" />
`,
    statesContent: <TextFieldStates />,
    props: [
      p('icon', 'ReactNode', 'undefined', 'Leading icon inside the field. Auth and settings fields always pass one.'),
      p('trailing', 'ReactNode', 'undefined', 'Trailing control, such as Password Reveal.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Chrome. Outline matches other form controls.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height. Medium is 44px, matching buttons and selects.'),
      p('invalid', 'boolean', 'false', 'Danger border, icon, and aria-invalid.'),
      p('valid', 'boolean', 'false', 'Success border and icon. Ignored when invalid.'),
      p('disabled', 'boolean', 'false', 'Prevents entry. Explain why in nearby copy.'),
      p('autoComplete', 'string', 'undefined', 'Native autocomplete. Use email, username, name, and similar tokens.'),
      p("preview", "'hover' | 'focus'", 'undefined', 'Force a visual state without focusing the input.'),
    ],
  },
  textarea: {
    title: 'Textarea',
    description: 'Collect a note, bio, or message. Use this when the person needs room to write more than one line.',
    ...textareaGuide,
    Demo: TextareaDemo,
    wide: true,
    code: `<Textarea icon={<DkPencilWriteEdit />} placeholder="Write a note" />
<Textarea variant="subtle" icon={<DkPencilWriteEdit />} placeholder="Write a note" />
<Textarea variant="ghost" icon={<DkPencilWriteEdit />} placeholder="Write a note" />
<Textarea variant="underline" icon={<DkPencilWriteEdit />} placeholder="Write a note" />
<Textarea variant="well" icon={<DkDocumentPageFold />} placeholder="Internal note" />
<Textarea variant="composer" icon={<DkMessageInboxTray />} placeholder="Write a note" hint="Visible to your team" maxLength={160} />
`,
    statesContent: <TextareaStates />,
    props: [
      p('icon', 'ReactNode', 'undefined', 'Leading icon at the top of the field.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'well' | 'composer'", "'outline'", 'Chrome. Well is a Notes-style pad. Composer adds a footer for the count.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Type scale and minimum height.'),
      p('invalid', 'boolean', 'false', 'Danger border, icon, and aria-invalid.'),
      p('valid', 'boolean', 'false', 'Success border and icon. Ignored when invalid.'),
      p('disabled', 'boolean', 'false', 'Prevents entry.'),
      p('maxLength', 'number', 'undefined', 'Native limit. Also shows a count when set.'),
      p('count', 'boolean', 'false', 'Show a character count even without maxLength.'),
      p('hint', 'ReactNode', 'undefined', 'Caption on the composer footer, opposite the count.'),
      p("resize", "'y' | 'none'", 'well/composer: none, else y', 'Whether the field can be stretched.'),
      p("preview", "'hover' | 'focus'", 'undefined', 'Force a visual state without focusing the field.'),
    ],
  },
  'password-field': {
    title: 'Password Field',
    description: 'Collect a secret that stays hidden until the person chooses to show it. Use this on sign in and when creating an account.',
    ...passwordFieldGuide,
    Demo: PasswordFieldDemo,
    wide: true,
    code: `<PasswordField />
<PasswordField variant="subtle" />
<PasswordField variant="ghost" />
<PasswordField variant="underline" />
<PasswordField variant="pill" />
<PasswordField reveal="ghost" />
<PasswordField reveal="pill" />
`,
    statesContent: <PasswordFieldStates />,
    props: [
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Field chrome. Matches Text Field.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Height and type. Also sizes the reveal.'),
      p("reveal", "'ghost' | 'subtle' | 'outline' | 'text' | 'pill'", "'text'", 'The trailing show/hide control. Text is Show / Hide.'),
      p('visible', 'boolean', 'undefined', 'Controlled visibility. Omit to manage it inside the field.'),
      p('onVisibleChange', '(visible: boolean) => void', 'undefined', 'Called when the reveal is pressed.'),
      p('icon', 'ReactNode', 'lock', 'Leading icon. Defaults to the lock.'),
      p('invalid', 'boolean', 'false', 'Danger border, icon, and aria-invalid.'),
      p('valid', 'boolean', 'false', 'Success border and icon. Ignored when invalid.'),
      p('autoComplete', 'string', "'current-password'", 'Use current-password on sign-in and new-password on create account.'),
      p("preview", "'hover' | 'focus'", 'undefined', 'Force a visual state without focusing the field.'),
    ],
  },
  'password-reveal': {
    title: 'Password Reveal',
    description: 'Lets the person show or hide the characters in a password. Keep it inside the field, not as a separate button.',
    ...passwordRevealGuide,
    Demo: PasswordRevealDemo,
    wide: true,
    code: `<PasswordReveal visible={visible} onToggle={toggle} />
<PasswordReveal variant="subtle" visible={visible} onToggle={toggle} />
<PasswordReveal variant="outline" visible={visible} onToggle={toggle} />
<PasswordReveal variant="text" visible={visible} onToggle={toggle} />
<PasswordReveal variant="pill" visible={visible} onToggle={toggle} />

<PasswordField />
`,
    statesContent: <PasswordRevealStates />,
    props: [
      p('visible', 'boolean', '—', 'Whether the password is shown.'),
      p('onToggle', '() => void', '—', 'Called when the control is pressed.'),
      p("variant", "'ghost' | 'subtle' | 'outline' | 'text' | 'pill'", "'ghost'", 'Icon only, filled, outlined, Show/Hide text, or a labeled pill.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Hit target and type. Match the field size.'),
      p('inField', 'boolean', 'true', 'Position inside a Text Field. Set false for a standalone control.'),
      p('showLabel', 'string', "'Show'", 'Label on the text and pill variants.'),
      p('hideLabel', 'string', "'Hide'", 'Label while the password is visible.'),
      p('disabled', 'boolean', 'false', 'Prevents press.'),
    ],
  },
  select: {
    title: 'Select',
    description:
      'Pick one option from a list. Use this when the choices are too many to show as radios and only one answer is allowed. Search the list when it is long. The menu matches the width of the field.',
    ...selectGuide,
    Demo: SelectDemo,
    wide: true,
    code: `<Dropdown value={value} onChange={setValue} options={options} />
<Dropdown variant="subtle" value={value} onChange={setValue} options={options} />
<Dropdown variant="ghost" icon={<DkGlobeWorldEarth />} value={value} onChange={setValue} options={options} />
<Dropdown variant="underline" value={value} onChange={setValue} options={options} />
<Dropdown variant="pill" value={value} onChange={setValue} options={options} />

<Dropdown
  searchable
  icon={<DkGlobeWorldEarth />}
  options={[
    { value: 'team', label: 'Team', icon: <DkRowsThree />, description: 'Up to ten people' },
  ]}
/>
`,
    statesContent: <SelectStates />,
    props: [
      p('value', 'string', '—', 'The selected option.'),
      p('options', 'DropdownOption[]', '—', 'Menu items. Each can include icon, description, and disabled.'),
      p('onChange', '(value: string) => void', '—', 'Called when an option is chosen.'),
      p('icon', 'ReactNode', 'undefined', 'Leading icon on the field. Replaced by the selected option icon when present.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Field chrome. Matches Text Field.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height. Compact defaults to small.'),
      p('searchable', 'boolean', 'false', 'Adds a search field at the top of the popup.'),
      p('searchPlaceholder', 'string', "'Search'", 'Placeholder for the search field.'),
      p('placeholder', 'string', "'Select'", 'Shown when no option is selected.'),
      p('label', 'string', 'undefined', 'Visible caption above the field.'),
      p('ariaLabel', 'string', 'undefined', 'Accessible name when the visible label is omitted.'),
      p('invalid', 'boolean', 'false', 'Danger border and aria-invalid.'),
      p('valid', 'boolean', 'false', 'Success border. Ignored when invalid.'),
      p('compact', 'boolean', 'false', 'Smaller trigger for toolbars. The popup still matches the field width.'),
      p('disabled', 'boolean', 'false', 'Prevents opening the menu.'),
    ],
  },
  'country-select': {
    title: 'Country Select',
    description: 'Ask for a country. The menu is searchable and shows a flag. Pass the chosen country into region and city fields.',
    ...countrySelectGuide,
    Demo: CountryDemo,
    wide: true,
    code: `<CountrySelect value={iso} onChange={setIso} />
<CountrySelect variant="subtle" value={iso} onChange={setIso} />
<CountrySelect size="sm" value={iso} onChange={setIso} />
`,
    statesContent: <CountryStates />,
    props: [
      p('value', 'string | null', '—', 'ISO 3166-1 alpha-2 code.'),
      p('onChange', '(next: string | null) => void', '—', 'Called when the country changes. Clear state, county, and city in the same handler.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Field chrome. Matches Select.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height. Compact defaults to small.'),
      p('allowClear', 'boolean', 'true', 'Adds a Not set option that stores null.'),
      p('enabledIsos', 'string[]', 'undefined', 'When set, other countries stay in the list as Coming soon.'),
      p('compact', 'boolean', 'false', 'Smaller trigger and flags.'),
      p('disabled', 'boolean', 'false', 'Prevents opening the menu.'),
      p('label', 'string', "'Country'", 'Accessible name.'),
      p('placeholder', 'string', "'Select a country'", 'Shown when no country is selected.'),
    ],
  },
  'state-select': {
    title: 'State Select',
    description:
      'Ask for a state, province, or emirate after the country is known. The caption changes to match that country, for example State in the United States and Province in Pakistan.',
    ...stateSelectGuide,
    Demo: StateDemo,
    wide: true,
    code: `<CountrySelect value={country} onChange={setCountry} />
<StateSelect country={country} value={state} onChange={setState} />
`,
    statesContent: <StateStates />,
    props: [
      p('value', 'string | null', '—', 'ISO 3166-2 code, such as US-CA or PK-SD.'),
      p('country', 'string | null', 'null', 'ISO country. When set, only that country’s regions are listed.'),
      p('onChange', '(next: string | null) => void', '—', 'Called when the region changes. Clear county and city in the same handler.'),
      p('items', 'Subdivision[]', 'catalog', 'Replace the starter catalog with your own list.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Field chrome. Matches Select.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height.'),
      p('allowClear', 'boolean', 'true', 'Adds a Not set option that stores null.'),
      p('disabled', 'boolean', 'false', 'Prevents opening the menu.'),
      p('label', 'string', 'noun for the country', 'Accessible name. Defaults to State, Province, Emirate, and so on.'),
    ],
  },
  'county-select': {
    title: 'County Select',
    description:
      'Ask for a county or district after a region is chosen. Hide this field in countries that do not use this layer.',
    ...countySelectGuide,
    Demo: CountyDemo,
    wide: true,
    code: `<StateSelect country={country} value={state} onChange={setState} />
<CountySelect state={state} value={county} onChange={setCounty} />
`,
    statesContent: <CountyStates />,
    props: [
      p('value', 'string | null', '—', 'County id, such as US-CA:los-angeles.'),
      p('state', 'string | null', 'null', 'ISO 3166-2 region. When set, only that region’s counties are listed.'),
      p('onChange', '(next: string | null) => void', '—', 'Called when the county changes. Clear city in the same handler.'),
      p('items', 'County[]', 'catalog', 'Replace the starter catalog with your own list.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Field chrome. Matches Select.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height.'),
      p('allowClear', 'boolean', 'true', 'Adds a Not set option that stores null.'),
      p('disabled', 'boolean', 'false', 'Prevents opening the menu.'),
      p('label', 'string', "'County'", 'Accessible name.'),
    ],
  },
  'city-select': {
    title: 'City Select',
    description:
      'Ask for a city. Narrow the list with the country, region, or county already chosen. Pass your own list when the product needs a full directory.',
    ...citySelectGuide,
    Demo: CityDemo,
    wide: true,
    code: `<CountrySelect value={country} onChange={setCountry} />
<StateSelect country={country} value={state} onChange={setState} />
<CountySelect state={state} value={county} onChange={setCounty} />
<CitySelect country={country} state={state} county={county} value={city} onChange={setCity} />
`,
    statesContent: <CityStates />,
    props: [
      p('value', 'string | null', '—', 'City id, such as US-CA:los-angeles.'),
      p('country', 'string | null', 'null', 'ISO country. Used when state is not set.'),
      p('state', 'string | null', 'null', 'ISO 3166-2 region. Takes priority over country.'),
      p('county', 'string | null', 'null', 'County id. Takes priority over state.'),
      p('onChange', '(next: string | null) => void', '—', 'Called when the city changes.'),
      p('items', 'City[]', 'catalog', 'Replace the starter catalog with your own list.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Field chrome. Matches Select.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height.'),
      p('allowClear', 'boolean', 'true', 'Adds a Not set option that stores null.'),
      p('disabled', 'boolean', 'false', 'Prevents opening the menu.'),
      p('label', 'string', "'City'", 'Accessible name.'),
    ],
  },
  'language-select': {
    title: 'Language Select',
    description: 'Ask for a display language. Store a language id, not the translated name.',
    ...languageSelectGuide,
    Demo: LanguageDemo,
    wide: true,
    code: `<LanguageSelect value={id} onChange={setId} />
<LanguageSelect variant="subtle" value={id} onChange={setId} />
`,
    statesContent: <LanguageStates />,
    props: [
      p('value', 'string | null', '—', 'BCP 47 language id.'),
      p('onChange', '(next: string) => void', '—', 'Called when the language changes.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Field chrome. Matches Select.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height.'),
      p('enabledIds', 'string[]', 'shipped locales', 'When set, other languages stay in the list as Coming soon.'),
      p('compact', 'boolean', 'false', 'Smaller trigger.'),
      p('disabled', 'boolean', 'false', 'Prevents opening the menu.'),
      p('label', 'string', "'Language'", 'Accessible name.'),
    ],
  },
  'phone-input': {
    title: 'Phone Input',
    description: 'Collect a phone number with a country code. The number formats as the person types. Store the international form with a plus and digits.',
    ...phoneInputGuide,
    Demo: PhoneDemo,
    wide: true,
    code: `<PhoneInput value={e164} onChange={setE164} />
`,
    statesContent: <PhoneStates />,
    props: [
      p('value', 'string', '—', 'E.164 number, such as +14155552671.'),
      p('onChange', '(next: string) => void', '—', 'Called as the number is edited. Emits + and digits.'),
      p('disabled', 'boolean', 'false', 'Prevents changing the country or the number.'),
      p('label', 'string', "'Phone number'", 'Accessible name on the number field. The Select is named Country code.'),
      p('placeholder', 'string', "'Phone number'", 'Shown in the national number field when empty.'),
    ],
  },
  checkbox: {
    title: 'Checkbox',
    description: 'Let the person turn a choice on or off before submitting. Several can be on at once. Use a switch if the change should apply immediately.',
    ...checkboxGuide,
    Demo: CheckboxDemo,
    wide: true,
    code: `<Checkbox variant="outline" label="Outline" checked={on} onChange={toggle} />
<Checkbox variant="subtle" label="Subtle" checked={on} onChange={toggle} />
<Checkbox variant="ghost" label="Ghost" checked={on} onChange={toggle} />

<Checkbox
  label="All email"
  checked={selected === 2}
  indeterminate={selected === 1}
  onChange={toggleAll}
/>
<Checkbox label="Weekly digest" checked={digest} onChange={setDigest} />

<Checkbox tone="danger" label="I understand this will delete the project" checked={ack} onChange={setAck} />
<Checkbox label="Required" invalid />
`,
    statesContent: <CheckboxStates />,
    props: [
      p('label', 'ReactNode', 'undefined', 'Visible label. Pass aria-label when the words sit elsewhere.'),
      p('checked', 'boolean', 'uncontrolled', 'On when controlled. Omit to let the input own the value.'),
      p('indeterminate', 'boolean', 'false', 'Mixed parent for a partly selected set. Shows a minus.'),
      p('invalid', 'boolean', 'false', 'Error after submit. Sets aria-invalid.'),
      p("variant", "'outline' | 'subtle' | 'ghost'", "'outline'", 'Unchecked chrome. Outline for forms, subtle on a card, ghost in a list.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Box size. The row stays at least 44px tall.'),
      p("tone", "'brand' | 'danger'", "'brand'", 'Fill when on. Danger is for a destructive acknowledgement only.'),
      p("preview", "'hover' | 'focus' | 'active'", 'undefined', 'Forced visual for state tiles.'),
      p('disabled', 'boolean', 'false', 'Prevents press.'),
    ],
  },
  radio: {
    title: 'Radio',
    description: 'Pick exactly one option from a small set that stays visible. Use a select when the list is long.',
    ...radioGuide,
    Demo: RadioDemo,
    wide: true,
    code: `<RadioGroup label="Payment">
  <Radio name="pay" label="Card" checked={value === 'card'} onChange={selectCard} />
  <Radio name="pay" label="Bank transfer" checked={value === 'bank'} onChange={selectBank} />
  <Radio name="pay" label="Invoice" checked={value === 'invoice'} onChange={selectInvoice} />
</RadioGroup>

<Radio variant="subtle" name="chrome" label="Subtle" />
<Radio tone="danger" name="severity" label="Delete the project" />
<Radio label="Required" invalid />
`,
    statesContent: <RadioStates />,
    props: [
      p('label', 'ReactNode', 'undefined', 'Visible label. Pass aria-label when the words sit elsewhere.'),
      p('checked', 'boolean', 'uncontrolled', 'Selected when controlled. Omit to let the group own the value.'),
      p('invalid', 'boolean', 'false', 'Error after submit. Sets aria-invalid.'),
      p("variant", "'outline' | 'subtle' | 'ghost'", "'outline'", 'Unchecked chrome. Outline for forms, subtle on a card, ghost in a list.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Circle size. The row stays at least 44px tall.'),
      p("tone", "'brand' | 'danger'", "'brand'", 'Ring and disc when selected. Danger is for a destructive choice only.'),
      p("preview", "'hover' | 'focus' | 'active'", 'undefined', 'Forced visual for state tiles.'),
      p('name', 'string', 'undefined', 'Shared name for every option in the set.'),
      p('disabled', 'boolean', 'false', 'Prevents press.'),
    ],
  },
  slider: {
    title: 'Slider',
    description: 'Pick a number by dragging along a track. Attach a Number Field when the exact figure must be typed.',
    ...sliderGuide,
    Demo: SliderDemo,
    wide: true,
    code: `<Slider variant="fill" label="Volume" value={value} onValueChange={setValue} field="end" unit="percent" />
<Slider variant="subtle" label="Subtle" value={value} onValueChange={setValue} field="end" unit="percent" />
<Slider variant="outline" label="Outline" value={value} onValueChange={setValue} field="end" unit="percent" />
<Slider variant="ghost" label="Ghost" value={value} onValueChange={setValue} field="end" unit="percent" />
<Slider variant="pill" label="Pill" value={value} onValueChange={setValue} field="end" unit="percent" />

<Slider field="start" unit="percent" value={value} onValueChange={setValue} />
<Slider field="end" unit="percent" fieldStepper="split" fieldAlign="center" value={value} onValueChange={setValue} />
<Slider field="end" unit="percent" fieldVariant="underline" fieldWidth="fill" value={value} onValueChange={setValue} />

<RangeSlider
  label="Price"
  field="both"
  unit="currency"
  value={range}
  onValueChange={setRange}
/>
`,
    statesContent: <SliderStates />,
    props: [
      p("mode", "'single' | 'range'", "'single'", 'One thumb, or two thumbs that cannot cross. RangeSlider is the range alias.'),
      p('value', 'number | [number, number]', '—', 'Current value. A pair in range mode.'),
      p('onValueChange', '(value: number | [number, number]) => void', '—', 'Called as a thumb moves.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Track chrome. Fill is the default. Pill is a thicker track with a raised thumb.'),
      p("field", "boolean | 'end' | 'start' | 'both'", 'false', 'Attach a Number Field. End is after the track. Start is before. Both is for a range.'),
      p("unit", "'none' | 'percent' | 'currency' | 'degree' | 'px'", "'none'", 'Sign on the Number Field. Override with prefix or suffix.'),
      p('prefix', 'string', 'undefined', 'Leading sign on the Number Field, such as €. Overrides the unit prefix.'),
      p('suffix', 'string', 'undefined', 'Trailing sign on the Number Field, such as kg. Overrides the unit suffix.'),
      p("fieldVariant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", 'Matches the track', 'Number Field chrome. Fill maps to outline.'),
      p("fieldSize", "'sm' | 'md' | 'lg'", 'Matches size', 'Number Field height. Defaults to the slider size.'),
      p("fieldStepper", "'stack' | 'split'", "'stack'", 'Stacked chevrons on the Number Field, or minus and plus on both sides.'),
      p("fieldAlign", "'start' | 'center' | 'end'", 'start, center when split', 'Alignment of the digits and unit in the Number Field.'),
      p("fieldWidth", "'fit' | 'fill'", "'fit'", 'Fit grows with the digits until the cap. Fill uses the cap width.'),
      p('fieldCompact', 'boolean', 'undefined', 'Alias. true is fit. false is fill.'),
      p('fieldReadOnly', 'boolean', 'false', 'Shows the value in the Number Field. Arrows do not run. The track still moves.'),
      p('fieldPlaceholder', 'string', "'0'", 'Shown in the Number Field when the value is empty.'),
      p('fieldName', 'string', 'undefined', 'Name on the Number Field. Range appends Start and End.'),
      p('fieldId', 'string', 'undefined', 'Id on the Number Field. Range appends -start and -end.'),
      p('fieldClassName', 'string', 'undefined', 'Class on the Number Field.'),
      p("fieldPreview", "'hover' | 'focus'", 'undefined', 'Forced visual on the Number Field. Falls back to preview.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Track and thumb size. The hit target stays at least 28px tall.'),
      p("tone", "'default' | 'onDark'", "'default'", 'On dark is for a black surface, such as the avatar editor.'),
      p('min', 'number', '0', 'Start of the track.'),
      p('max', 'number', '100', 'End of the track.'),
      p('step', 'number', '1', 'Snap increment.'),
      p('label', 'ReactNode', 'undefined', 'Visible caption. Pass aria-label when the words sit elsewhere.'),
      p('showValue', 'boolean', 'false', 'Shows the current value opposite the label.'),
      p('showEnds', 'boolean', 'false', 'Shows min and max under the track.'),
      p('marks', 'boolean | number[]', 'undefined', 'Tick marks. true uses step when there are twelve or fewer, otherwise min and max.'),
      p('formatValue', '(value: number) => string', 'String', 'Formats the readout, end labels, and aria-valuetext.'),
      p('invalid', 'boolean', 'false', 'Error after submit. Sets aria-invalid and a danger fill.'),
      p('valid', 'boolean', 'false', 'Success fill. Ignored when invalid.'),
      p('disabled', 'boolean', 'false', 'Prevents press and keyboard.'),
      p("preview", "'hover' | 'focus' | 'active'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  'number-field': {
    title: 'Number Field',
    description: 'Type or step a number. A unit such as percent, currency, or pixels sits next to the digits.',
    ...numberFieldGuide,
    Demo: NumberFieldDemo,
    wide: true,
    code: `<NumberField unit="percent" value={value} onValueChange={setValue} min={0} max={100} />
<NumberField variant="subtle" unit="percent" value={value} onValueChange={setValue} />
<NumberField variant="ghost" unit="percent" value={value} onValueChange={setValue} />
<NumberField variant="underline" unit="percent" value={value} onValueChange={setValue} />
<NumberField variant="pill" unit="percent" value={value} onValueChange={setValue} />

<NumberField unit="currency" value={price} onValueChange={setPrice} min={0} step={0.5} />
<NumberField stepper="split" value={qty} onValueChange={setQty} min={1} max={99} />
<NumberField width="fill" unit="percent" value={value} onValueChange={setValue} />
`,
    statesContent: <NumberFieldStates />,
    props: [
      p('value', 'number | null', 'uncontrolled', 'Current value. null is an empty field.'),
      p('onValueChange', '(value: number | null) => void', 'undefined', 'Called as the value is typed or stepped.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Chrome. Matches Text Field.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height. Medium is 44px, matching other fields.'),
      p("unit", "'none' | 'percent' | 'currency' | 'degree' | 'px'", "'none'", 'Sign beside the digits. Override with prefix or suffix.'),
      p('prefix', 'string', 'undefined', 'Leading sign, such as €. Overrides the unit prefix.'),
      p('suffix', 'string', 'undefined', 'Trailing sign, such as kg. Overrides the unit suffix.'),
      p("stepper", "'stack' | 'split'", "'stack'", 'Stacked chevrons on the right, or minus and plus on both sides.'),
      p("align", "'start' | 'center' | 'end'", "start, center when split", 'Alignment of the digits and unit.'),
      p("width", "'fit' | 'fill'", "'fit'", 'Fit grows with the digits until the variant cap, then clips. Fill spans the row.'),
      p('compact', 'boolean', 'undefined', 'Alias. true is fit. false is fill.'),
      p('min', 'number', 'undefined', 'Lower bound. Disables decrease at the limit.'),
      p('max', 'number', 'undefined', 'Upper bound. Disables increase at the limit.'),
      p('step', 'number', '1', 'Arrow and key increment. Typing snaps to step on blur.'),
      p('invalid', 'boolean', 'false', 'Danger border and aria-invalid.'),
      p('valid', 'boolean', 'false', 'Success border. Ignored when invalid.'),
      p('disabled', 'boolean', 'false', 'Prevents typing and stepping.'),
      p('readOnly', 'boolean', 'false', 'Shows the value. Arrows do not run.'),
      p("preview", "'hover' | 'focus'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  'date-picker': {
    title: 'Date Picker',
    description:
      'Pick a calendar date, or a start and an end. The field and the calendar match the other menus in the kit.',
    ...datePickerGuide,
    Demo: DateDemo,
    wide: true,
    code: `<DatePicker value={value} onChange={setValue} />
<DatePicker variant="subtle" value={value} onChange={setValue} />
<DatePicker variant="ghost" value={value} onChange={setValue} />
<DatePicker variant="underline" value={value} onChange={setValue} />
<DatePicker variant="pill" value={value} onChange={setValue} />

<DatePicker size="sm" value={value} onChange={setValue} />
<DatePicker invalid value={value} onChange={setValue} />
<DatePicker mode="range" rangeValue={range} onRangeChange={setRange} />
`,
    statesContent: <DatePickerStates />,
    props: [
      p('value', 'string | null', '—', 'ISO date for single mode.'),
      p('onChange', '(next: string | null) => void', '—', 'Called when a day is chosen in single mode.'),
      p("mode", "'single' | 'range'", "'single'", 'One day, or a start and end.'),
      p('rangeValue', '{ start: string | null; end: string | null }', '—', 'ISO dates for range mode.'),
      p('onRangeChange', '(next: DateRange) => void', '—', 'Called when Done commits a range.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Field chrome. Matches Select and Text Field.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height. Compact defaults to small.'),
      p('placeholder', 'string', "'Select a date'", 'Shown when no date is selected.'),
      p('invalid', 'boolean', 'false', 'Danger border.'),
      p('valid', 'boolean', 'false', 'Success border. Ignored when invalid.'),
      p('compact', 'boolean', 'false', 'Smaller trigger for toolbars.'),
      p('min', 'string', "'1900-01-01'", 'Earliest ISO date that can be chosen.'),
      p('max', 'string', 'today', 'Latest ISO date that can be chosen.'),
      p('disabled', 'boolean', 'false', 'Prevents opening the calendar.'),
      p("preview", "'hover' | 'open'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  'otp-boxes': {
    title: 'OTP Boxes',
    description: 'Enter a verification code one digit at a time. Paste fills the row. Use this after sign in or to confirm a device.',
    ...otpGuide,
    Demo: OtpDemo,
    wide: true,
    code: `<OtpBoxes value={digits} onChange={setDigits} onComplete={verify} />
<OtpBoxes variant="underline" value={digits} onChange={setDigits} />
<OtpBoxes variant="pill" size="sm" value={digits} onChange={setDigits} />
<OtpBoxes length={8} split={4} value={digits} onChange={setDigits} />
<OtpBoxes value={digits} onChange={setDigits} invalid shaking />
<OtpBoxes value={digits} onChange={setDigits} valid />
<OtpBoxes value={digits} onChange={setDigits} masked />
`,
    statesContent: <OtpStates />,
    props: [
      p('value', 'string[]', '—', 'One character per box.'),
      p('onChange', '(next: string[]) => void', '—', 'Called when a digit changes.'),
      p('length', 'number', '6', 'Number of boxes.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Box chrome. Outline is the auth default. Underline is the quieter layout.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Box size. Small stays 44px tall.'),
      p('split', 'number', 'undefined', 'Extra gap after this many boxes, such as 3 or 4.'),
      p('valid', 'boolean', 'false', 'Success after a correct code.'),
      p('invalid', 'boolean', 'false', 'Error after a rejected code. Alias: error.'),
      p('error', 'boolean', 'false', 'Alias for invalid.'),
      p('shaking', 'boolean', 'false', 'Shake the row when the code is rejected.'),
      p('masked', 'boolean', 'false', 'Hide digits as discs.'),
      p("preview", "'hover' | 'focus'", 'undefined', 'Forced visual for state tiles.'),
      p('disabled', 'boolean', 'false', 'Prevents entry.'),
      p('onComplete', '(code: string) => void', 'undefined', 'Called when every box is filled.'),
    ],
  },
  'recovery-input': {
    title: 'Recovery Input',
    description:
      'Enter a backup code or account recovery key. Letters and numbers group themselves as the person types.',
    ...recoveryGuide,
    Demo: RecoveryDemo,
    wide: true,
    code: `<RecoveryInput value={code} onChange={setCode} />
<RecoveryInput variant="underline" value={code} onChange={setCode} />
<RecoveryInput variant="pill" size="sm" value={code} onChange={setCode} />
<RecoveryInput mode="groups" value={code} onChange={setCode} />
<RecoveryInput length={16} mode="groups" value={code} onChange={setCode} />
<RecoveryInput value={code} onChange={setCode} invalid shaking />
<RecoveryInput value={code} onChange={setCode} valid />
<RecoveryCodesList copyable downloadable codes={codes} />
`,
    statesContent: <RecoveryStates />,
    props: [
      p('value', 'string', '—', 'The recovery code. Hyphens are optional; they are inserted for you.'),
      p('onChange', '(next: string) => void', '—', 'Called with the formatted code.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'underline' | 'pill'", "'outline'", 'Chrome. Outline is the auth default. Underline is the quieter layout.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Field height. Small stays 44px tall.'),
      p("mode", "'field' | 'groups'", "'field'", 'One formatted line, or one box per group.'),
      p('length', 'number', '8', 'Character count before grouping. Eight is a backup code. Twenty-eight is an Apple-style key.'),
      p('groupSize', 'number', '4', 'Characters per group.'),
      p('valid', 'boolean', 'false', 'Success after a correct code.'),
      p('invalid', 'boolean', 'false', 'Error after a rejected code. Alias: error.'),
      p('error', 'boolean', 'false', 'Alias for invalid.'),
      p('shaking', 'boolean', 'false', 'Shake when the code is rejected.'),
      p('masked', 'boolean', 'false', 'Hide characters as discs.'),
      p('readOnly', 'boolean', 'false', 'Show a code without allowing edits.'),
      p("preview", "'hover' | 'focus'", 'undefined', 'Forced visual for state tiles.'),
      p('disabled', 'boolean', 'false', 'Prevents entry.'),
      p('label', 'ReactNode', "'Recovery code'", 'Caption above the field.'),
      p('hint', 'ReactNode', 'undefined', 'Caption under the field. Uses the invalid or valid tone when set.'),
      p('placeholder', 'string', 'XXXX-XXXX', 'Shown when empty. Defaults to grouped Xs for the length.'),
      p('onComplete', '(code: string) => void', 'undefined', 'Called when every character is filled.'),
      p('codes', 'string[]', '—', 'On RecoveryCodesList, the codes to display.'),
      p("RecoveryCodesList variant", "'outline' | 'subtle' | 'ghost'", "'subtle'", 'Cell chrome on the list.'),
      p("RecoveryCodesList columns", '2 | 3 | 4', '2', 'Grid width. Three shows a 3×4 layout for twelve codes.'),
      p('copyable', 'boolean', 'false', 'Adds a copy button under RecoveryCodesList.'),
      p('downloadable', 'boolean', 'false', 'Adds a download button under RecoveryCodesList.'),
      p('downloadFilename', 'string', 'brand.recoveryCodesFilename', 'Filename used when downloading the codes as a text file.'),
      p('onCopy', '() => void', 'undefined', 'Called after a successful copy.'),
      p('onDownload', '() => void', 'undefined', 'Called after a download starts.'),
    ],
  },
  'field-label': {
    title: 'Field Label',
    description:
      'Name a field and place help or an error under it. A placeholder is not a substitute for this name.',
    ...fieldLabelGuide,
    Demo: FieldLabelDemo,
    wide: true,
    code: `<FormField htmlFor="name" label="Display name" hint="Shown on your public profile.">
  <TextField id="name" icon={<DkPersonUserProfile />} placeholder="Alex Rivera" />
</FormField>
<FormField htmlFor="user" label="Username" optional>
  <TextField id="user" icon={<DkAtSign />} placeholder="alex" />
</FormField>
<FormField htmlFor="email" label="Email" required hint="Use a work address.">
  <TextField id="email" icon={<DkEnvelopeMessageMail />} />
</FormField>
<FormField htmlFor="user" label="Username" hint="Available" hintTone="ok" valid>
  <TextField id="user" valid />
</FormField>
<FormField htmlFor="email" label="Email" required invalid hint="Enter a valid email." hintTone="error">
  <TextField id="email" invalid />
</FormField>
<FormField htmlFor="name" label="Display name" layout="inline">
  <TextField id="name" />
</FormField>
`,
    statesContent: <FieldLabelStates />,
    props: [
      p('children', 'ReactNode', '—', 'Label text. On FormField this is the control.'),
      p('htmlFor', 'string', 'undefined', 'Associates the label with a control id.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Type size. Match the field: small is 15px, medium and large follow the 17px and 19px labels.'),
      p("tone", "'default' | 'danger' | 'success' | 'warning' | 'disabled'", "'default'", 'Label color. Disabled, invalid, and valid override this.'),
      p('optional', 'boolean', 'false', 'Adds an Optional suffix. Wins over required.'),
      p('required', 'boolean', 'false', 'Adds a danger asterisk. Mark the control required as well.'),
      p('invalid', 'boolean', 'false', 'Danger label. Pair with hintTone error and an invalid field.'),
      p('valid', 'boolean', 'false', 'Success label. Ignored when invalid or disabled.'),
      p('disabled', 'boolean', 'false', 'Disabled label color. Pair with a disabled control.'),
      p('visuallyHidden', 'boolean', 'false', 'Keeps the name for assistive tech when the layout has no caption.'),
      p('hint', 'ReactNode', 'undefined', 'FormField only. Caption under the control.'),
      p("hintTone", "'default' | 'ok' | 'error' | 'warning'", "'default'", 'FormField / FieldHint color. success and danger are aliases for ok and error.'),
      p("layout", "'stacked' | 'inline'", "'stacked'", 'FormField only. Inline sits the label beside the field from 735px up.'),
    ],
  },
  alert: {
    title: 'Alert',
    description:
      'Tell the person something that happened on this screen. Use it for a save, a warning, a failure, or a quiet note they can dismiss.',
    ...alertGuide,
    Demo: AlertDemo,
    wide: true,
    code: `<Alert title="Verify your email">We sent a link to alex@roboticela.com.</Alert>
<Alert variant="outline" tone="warning" title="Quota at 88%">Storage is almost full.</Alert>
<Alert variant="solid" tone="danger" title="Payment failed">Update the card on file.</Alert>
<Alert variant="ghost" tone="success" title="Saved">Your changes are live.</Alert>
<Alert tone="neutral" title="Maintenance tonight" onDismiss={hide}>The workspace will pause.</Alert>
<Alert title="Invite expired" action={<Anchor>Resend</Anchor>}>Send a new link.</Alert>
`,
    statesContent: <AlertStates />,
    props: [
      p("variant", "'subtle' | 'outline' | 'solid' | 'ghost'", "'subtle'", 'Chrome. Subtle is the default on a page. Outline on a card. Ghost in a list. Solid when the message must not be missed.'),
      p("tone", "'info' | 'success' | 'warning' | 'danger' | 'neutral'", "'info'", 'Meaning and color. Neutral has no semantic color.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Padding, type, and icon size.'),
      p('title', 'ReactNode', 'undefined', 'Headline. Omit for a body-only note.'),
      p('children', 'ReactNode', 'undefined', 'Supporting line under the title.'),
      p('icon', 'ReactNode | false', 'tone icon', 'Leading icon. Pass false to hide it.'),
      p('action', 'ReactNode', 'undefined', 'An Anchor under the body, such as Resend or Try again.'),
      p('onDismiss', '() => void', 'undefined', 'Shows a Dismiss icon button.'),
    ],
  },
  progress: {
    title: 'Progress',
    description:
      'Show how far a known task has gone, from empty to complete. Use it for an upload, a quota, or an install. If you do not know the amount yet, use the traveling bar.',
    ...progressGuide,
    Demo: ProgressDemo,
    wide: true,
    code: `<Progress value={64} label="Uploading" />
<Progress variant="subtle" value={64} label="Uploading" />
<Progress variant="outline" value={64} label="Uploading" />
<Progress variant="ghost" value={64} label="Uploading" />
<Progress variant="pill" value={64} label="Storage" />
<Progress tone="success" value={100} label="Done" />
<Progress indeterminate label="Preparing" />
<Progress variant="subtle" indeterminate label="Preparing" />
<Progress variant="outline" indeterminate label="Preparing" />
<Progress variant="ghost" indeterminate label="Preparing" />
<Progress variant="pill" indeterminate label="Preparing" />
`,
    statesContent: <ProgressStates />,
    props: [
      p('value', 'number', '0', 'How far the task has gone, from 0 to 100. Ignored when indeterminate.'),
      p('label', 'string', 'undefined', 'Caption above the bar. Also the accessible name.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Track chrome. Fill is the default. Pill is the thicker bar.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Track height. Small is 4px, matching a system progress view.'),
      p("tone", "'brand' | 'success' | 'warning' | 'danger'", "'brand'", 'Fill color. Success when the work is done. Danger when it failed.'),
      p('indeterminate', 'boolean', 'false', 'Unknown amount. The bar travels until you know the value.'),
      p('onDark', 'boolean', 'false', 'Track and type for a black surface.'),
      p('showValue', 'boolean', 'true when labeled', 'Show the percent next to the label.'),
      p('formatValue', '(value: number) => string', 'rounded percent', 'How the percent is written.'),
      p('disabled', 'boolean', 'false', 'Dims the bar. The bar is never operable.'),
    ],
  },
  skeleton: {
    title: 'Skeleton',
    description:
      'Hold the layout while data loads by wrapping the real component. Bones keep the same size and shape so the page does not jump.',
    ...skeletonGuide,
    Demo: SkeletonDemo,
    wide: true,
    code: `<Skeleton loading>
  <StatCard label="Revenue" value="$48,290" />
</Skeleton>

<Skeleton loading={false}>
  <StatCard label="Revenue" value="$48,290" />
</Skeleton>

<Skeleton />
<Skeleton variant="outline" lines={3} />
<Skeleton shape="circle" />
<Skeleton lines={3} label="Loading article" />
`,
    statesContent: <SkeletonStates />,
    props: [
      p('children', 'ReactNode', 'undefined', 'The real component to stand in for. When set, Skeleton is a parent. No manual bones.'),
      p('loading', 'boolean', 'true when wrapping', 'When false, children render as themselves. Ignored when there are no children.'),
      p("variant", "'subtle' | 'outline' | 'ghost' | 'pill'", "'subtle'", 'Chrome. Subtle is the default fill. Outline is a wireframe. Ghost is fainter. Pill is a button or badge.'),
      p("shape", "'line' | 'heading' | 'circle' | 'rect' | 'square'", "'line'", 'Bone only, when there are no children. Circle matches Avatar. Rect matches a card image.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Bone only. Height for a line or heading. Diameter for a circle. Matches Avatar at circle size.'),
      p("motion", "'shimmer' | 'pulse' | 'none'", "'shimmer'", 'Shimmer is the default sweep. Pulse is an opacity breath. None is static.'),
      p('lines', 'number', '1', 'Bone only. Stacked text lines. Last line is shorter. Ignored when shape is not line.'),
      p('width', 'string | number', 'undefined', 'Bone only. Override width on a single bone.'),
      p('label', 'string', "'Loading' when wrapping", 'Accessible name. Sets role status and aria-busy.'),
    ],
  },
  'empty-state': {
    title: 'Empty State',
    description:
      'The page when a list has nothing to show. Use it for a first visit, no search results, or a failure that needs a retry.',
    ...emptyStateGuide,
    Demo: EmptyStateDemo,
    wide: true,
    code: `<EmptyState
  icon={<InboxIcon />}
  title="No projects"
  body="Create a project to get started."
  action={<Button>New project</Button>}
/>
<EmptyState variant="subtle" title="No messages" body="Mentions will show up here." />
<EmptyState variant="outline" title="No messages" body="Mentions will show up here." />
<EmptyState variant="ghost" title="No messages" body="Mentions will show up here." />
<EmptyState variant="pill" title="No results" body="Try a different search." />
<EmptyState tone="danger" title="Could not load" body="Check the connection, then try again." />
`,
    statesContent: <EmptyStateStates />,
    props: [
      p('title', 'string', 'required', 'Headline. Also the accessible name of the region.'),
      p('body', 'ReactNode', 'undefined', 'One supporting line under the title.'),
      p('icon', 'ReactNode', 'undefined', 'A kit icon. Size follows the empty size.'),
      p('action', 'ReactNode', 'undefined', 'Primary button. Keep the label a short verb.'),
      p('secondary', 'ReactNode', 'undefined', 'A quieter second action under the primary.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Chrome. Fill is the page. Subtle, outline, and pill sit in a card.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Padding, icon, and type. Small is for a table slot.'),
      p("tone", "'default' | 'success' | 'warning' | 'danger'", "'default'", 'Icon color. Default is tertiary gray. Danger is a failure.'),
      p("align", "'center' | 'start'", "'center'", 'Stack alignment. Start is for a table or sidebar slot.'),
      p('onDark', 'boolean', 'false', 'Type and chrome for a black surface.'),
    ],
  },
  'empty-popup': {
    title: 'Empty Popup',
    description:
      'The compact empty view inside a menu or palette. Use it when a popup list has no results, not when the whole page is empty.',
    ...emptyPopupGuide,
    Demo: EmptyPopupDemo,
    wide: true,
    code: `<EmptyPopup
  icon={<SearchIcon />}
  title="No results"
  body="Try a different search."
/>
<EmptyPopup variant="subtle" title="No notifications" body="You are all caught up." />
<EmptyPopup variant="outline" title="No results" body="Try a different search." />
<EmptyPopup variant="ghost" title="No results" body="Try a different search." />
<EmptyPopup variant="pill" title="No results" body="Try a different search." />
<EmptyPopup surface="plain" size="sm" title="No results" />
<EmptyPopup tone="danger" title="Could not load" body="Check the connection, then try again." />
`,
    statesContent: <EmptyPopupStates />,
    props: [
      p('title', 'string', 'required', 'Headline. Also the accessible name of the status.'),
      p('body', 'ReactNode', 'undefined', 'One supporting line under the title.'),
      p('icon', 'ReactNode', 'undefined', 'A kit icon. Size follows the popup size.'),
      p('action', 'ReactNode', 'undefined', 'Primary button. Keep the label a short verb.'),
      p('secondary', 'ReactNode', 'undefined', 'A quieter second action under the primary.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Panel chrome. Fill is the default popup. Subtle, outline, and pill sit as a card.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Padding, icon, and type. Small is for a Select.'),
      p("tone", "'default' | 'success' | 'warning' | 'danger'", "'default'", 'Icon color. Default is tertiary gray. Danger is a failure.'),
      p("surface", "'plain' | 'panel'", "'panel'", 'Panel is a standalone popup. Plain sits inside an existing menu.'),
    ],
  },
  'loading-screen': {
    title: 'Loading Screen',
    description:
      'Cover the view while boot or sign in finishes. Use Loader instead when only a control or a line of copy is waiting.',
    ...loadingScreenGuide,
    Demo: LoadingScreenDemo,
    wide: true,
    code: `<LoadingScreen status="Setting things up…" />
<LoadingScreen variant="subtle" embedded status="Setting things up…" />
<LoadingScreen variant="outline" embedded status="Setting things up…" />
<LoadingScreen variant="ghost" embedded status="Setting things up…" />
<LoadingScreen variant="pill" embedded status="Setting things up…" />
<LoadingScreen indicator="bar" embedded status="Setting things up…" />
<LoadingScreen preview="delayed" delayedStatus="This is taking longer than usual…" />
`,
    statesContent: <LoadingScreenStates />,
    props: [
      p('status', 'string', "'Setting things up…'", 'First caption. Also the accessible name until the delayed line.'),
      p('delayedStatus', 'string', "'This is taking longer than usual…'", 'Caption after delayMs. Quieter type.'),
      p('delayMs', 'number', '5000', 'Wait before the delayed line. Several seconds, not the first frame.'),
      p('embedded', 'boolean', 'false', 'Fit a panel instead of the full viewport.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Chrome. Fill is the page. Subtle, outline, and pill sit in a panel.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Mark, spinner, and padding. Small is for a card. Large is a full page boot.'),
      p("indicator", "'spinner' | 'bar' | 'none'", "'spinner'", 'Spinner is the branded boot. Bar matches Progress. None is the mark alone.'),
      p("preview", "'initial' | 'delayed'", 'undefined', 'Forced visual for state tiles. Skips the timer.'),
      p('showLogo', 'boolean', 'true', 'Show the brand mark above the indicator.'),
      p('showStatus', 'boolean', 'true', 'Show the caption. The accessible name becomes Loading when hidden.'),
      p('onDark', 'boolean', 'false', 'Type and chrome for a black surface.'),
    ],
  },
  loader: {
    title: 'Loader',
    description:
      'A spinning ring for a short wait next to a label, in a toolbar, or on a card. Use Loading Screen when the whole view is not ready.',
    ...loaderGuide,
    Demo: LoaderDemo,
    wide: true,
    code: `<Loader />
<Loader variant="subtle" />
<Loader variant="outline" />
<Loader variant="ghost" />
<Loader variant="pill" />
<Loader label="Saving" />
<Loader layout="inline" label="Loading messages" />
<Loader tone="default" />
`,
    statesContent: <LoaderStates />,
    props: [
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Chrome. Fill is the ring alone. Subtle, outline, and pill sit in a circular well.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Ring diameter. Small is 16px, matching a button. Large is 36px, matching a system activity indicator.'),
      p("tone", "'brand' | 'default' | 'success' | 'warning' | 'danger'", "'brand'", 'Tick color. Brand is the default. Default is the gray Apple ring.'),
      p("layout", "'stack' | 'inline'", "'stack'", 'Label under the ring, or beside it.'),
      p('label', 'string', 'undefined', 'Caption. Also the accessible name.'),
      p('spinning', 'boolean', 'true', 'False keeps a static arc. Reduced motion also stops the spin.'),
      p('onDark', 'boolean', 'false', 'Track and tick for a black surface.'),
      p('disabled', 'boolean', 'false', 'Dims the loader. The loader is never operable.'),
      p('decorative', 'boolean', 'false', 'Hide from assistive tech when a parent already names the wait.'),
    ],
  },
  'score-ring': {
    title: 'Score Ring',
    description:
      'A circular score or completion mark, like Screen Time. Use it for a profile score, a quota, or a setup checklist.',
    ...scoreRingGuide,
    Demo: ScoreRingDemo,
    wide: true,
    code: `<ScoreRing score={72} label="Profile" />
<ScoreRing variant="subtle" score={72} label="Health" />
<ScoreRing variant="outline" score={72} label="Storage" />
<ScoreRing variant="ghost" score={48} label="Quiet" />
<ScoreRing variant="pill" score={72} label="Setup" />
<ScoreRing tone="success" score={100} label="Done" showCheck />
<ScoreRing indeterminate label="Preparing" />
<ScoreRing variant="subtle" indeterminate label="Preparing" />
<ScoreRing variant="outline" indeterminate label="Preparing" />
<ScoreRing variant="ghost" indeterminate label="Preparing" />
<ScoreRing variant="pill" indeterminate label="Preparing" />
`,
    statesContent: <ScoreRingStates />,
    props: [
      p('score', 'number', '0', 'How far the metric has gone, from 0 to 100. Ignored when indeterminate.'),
      p('label', 'string', 'undefined', 'Caption under the ring. Also the accessible name.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Track chrome. Fill is the default. Subtle tints the track. Pill is the thicker ring.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Diameter and type. Small is 48px. Large is 96px.'),
      p("tone", "'brand' | 'success' | 'warning' | 'danger'", "'brand'", 'Arc color. Success when the work is done. Danger when it failed.'),
      p('indeterminate', 'boolean', 'false', 'Unknown amount. The arc travels until you know the value.'),
      p('onDark', 'boolean', 'false', 'Track and type for a black surface.'),
      p('showValue', 'boolean', 'true', 'Show the percent in the center.'),
      p('showCheck', 'boolean', 'false', 'Replace the percent with a checkmark at 100.'),
      p('formatValue', '(value: number) => string', 'rounded percent', 'How the percent is written.'),
      p('disabled', 'boolean', 'false', 'Dims the ring. The ring is never operable.'),
      p('children', 'ReactNode', 'undefined', 'Custom center content. Replaces the percent and the check.'),
    ],
  },
  modal: {
    title: 'Modal',
    description:
      'A panel above the page that takes focus until the person finishes. Use a dialog for a form, an alert for a short decision, a sheet from the bottom, or an action list for choices such as Share or Delete.',
    ...modalGuide,
    Demo: ModalDemo,
    wide: true,
    code: `<Modal
  open={open}
  onClose={close}
  title="Invite teammate"
  description="They’ll get a link to join this workspace."
  actions={[
    { label: 'Send invite', tone: 'primary', onClick: send },
    { label: 'Cancel', tone: 'cancel', onClick: close },
  ]}
>
  {children}
</Modal>
`,
    statesContent: <ModalStates />,
    props: [
      p('open', 'boolean', '—', 'Whether the overlay is shown.'),
      p('onClose', '() => void', '—', 'Backdrop, Escape, and the close button. Ignored when dismissible is false.'),
      p("variant", "'dialog' | 'alert' | 'sheet' | 'action'", "'dialog'", 'Dialog is a form. Alert is a decision. Sheet rises from the bottom. Action is a list of choices.'),
      p("size", "'sm' | 'md' | 'lg' | 'full'", "'md'", 'Width of the panel. Alert stays compact. Full is for a long editor.'),
      p("tone", "'default' | 'danger' | 'success' | 'warning'", "'default'", 'Color of the optional icon. Danger is for a destructive alert.'),
      p('title', 'ReactNode', 'undefined', 'Heading. Names the dialog for assistive tech.'),
      p('description', 'ReactNode', 'undefined', 'One supporting line under the title.'),
      p('icon', 'boolean | ReactNode', 'undefined', 'True uses the tone glyph. Pass a node for a custom mark.'),
      p('actions', 'ModalAction[]', 'undefined', 'Footer or system rows. Tone is primary, danger, cancel, or default.'),
      p('footer', 'ReactNode', 'undefined', 'Custom footer. Wins over actions on dialog and sheet.'),
      p('showClose', 'boolean', 'true on dialog and sheet', 'Trailing close on dialog and sheet. Off on alert and action.'),
      p('showHandle', 'boolean', 'true on sheet', 'The grabber on a sheet.'),
      p('dismissible', 'boolean', 'true', 'Backdrop and Escape close the overlay. Off while saving.'),
      p('loading', 'boolean', 'false', 'Sets aria-busy and blocks dismiss. Mark the busy action with loading too.'),
      p('embedded', 'boolean', 'false', 'Render in place. No portal, no scroll lock, no focus trap.'),
    ],
  },
  'command-palette': {
    title: 'Command Palette',
    description:
      'Type to find and run a command without leaving the page. Use it for in-app search, a marketing header, or a system jump with a keyboard shortcut.',
    ...commandPaletteGuide,
    Demo: CommandPaletteDemo,
    wide: true,
    code: `<CommandSearch placeholder="Search commands…" onClick={open} />
<CommandPalette
  open={open}
  onClose={close}
  items={items}
  onSelect={run}
/>
<CommandPalette variant="spotlight" open={open} onClose={close} items={items} />
<CommandPalette variant="nav" open={open} onClose={close} items={quickLinks} />
<CommandPalette variant="sheet" open={open} onClose={close} items={items} />
`,
    statesContent: <CommandPaletteStates />,
    props: [
      p('open', 'boolean', '—', 'Whether the overlay is shown.'),
      p('onClose', '() => void', '—', 'Backdrop, Escape, Cancel, and a completed select.'),
      p('items', 'CommandItem[]', 'undefined', 'Flat list. Filtered by the query and grouped by item.group. If omitted with groups, the component catalog is searched.'),
      p('groups', 'CommandGroup[]', 'undefined', 'Pre-grouped results. Shown as-is. Wins over items.'),
      p('query', 'string', 'uncontrolled', 'The field value. Pass with onQueryChange to control it.'),
      p('onQueryChange', '(value: string) => void', 'undefined', 'Called as the person types.'),
      p('onSelect', '(item: CommandItem) => void', 'undefined', 'Called after close. If omitted and the item has href, the kit routes there.'),
      p('placeholder', 'string', "'Search'", 'Hint in the field. Docs catalog default is Search documentation…'),
      p("variant", "'spotlight' | 'command' | 'nav' | 'sheet'", "'command'", 'Spotlight is a floating field. Command is the panel. Nav is site search. Sheet rises from the bottom.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Width of the panel. Nav uses the marketing content widths.'),
      p('loading', 'boolean', 'false', 'Replaces results with a loader. Sets aria-busy.'),
      p('emptyTitle', 'string', 'Start typing / No results', 'Headline when the list is empty.'),
      p('emptyBody', 'ReactNode', 'undefined', 'One supporting line under the empty title.'),
      p('footer', 'ReactNode', 'undefined', 'Custom footer. Command shows keyboard hints by default.'),
      p('showFooter', 'boolean', 'true on command', 'Keyboard hint row. Off on spotlight, nav, and sheet.'),
      p('cancelLabel', 'string', "'Cancel'", 'Trailing dismiss on nav. Anchor without href, brand blue.'),
      p('index', 'number', 'uncontrolled', 'Active result. Pass for a state tile.'),
      p('embedded', 'boolean', 'false', 'Render in place. No portal and no scroll lock.'),
      p('CommandSearch.variant', "'pill' | 'subtle' | 'outline' | 'ghost' | 'icon'", "'outline'", 'Nav Search chrome. Outline is the default trigger. Icon is the marketing glass.'),
      p("CommandSearch.size", "'sm' | 'md' | 'lg'", "'sm'", 'Trigger height. Small is a 52px bar.'),
      p('CommandSearch.icon', 'boolean', 'false', 'Same as variant="icon". Marketing header glass.'),
      p('CommandSearch.shortcut', "string | false", "'⌘K'", 'Keyboard hint on the trigger. False hides it.'),
    ],
  },
  'confirm-dialog': {
    title: 'Confirm Dialog',
    description:
      'Ask once before a change that is hard to undo. Use it for delete, publish, leave without saving, or archive.',
    ...confirmDialogGuide,
    Demo: ConfirmDialogDemo,
    wide: true,
    code: `<ConfirmDialog
  open={open}
  onClose={close}
  title="Delete this project?"
  body="This cannot be undone."
  confirmLabel="Delete"
  onConfirm={remove}
/>
`,
    statesContent: <ConfirmDialogStates />,
    props: [
      p('open', 'boolean', '—', 'Whether the overlay is shown.'),
      p('onClose', '() => void', '—', 'Cancel, backdrop, and Escape when dismissible.'),
      p('onConfirm', '() => void', '—', 'The confirm action.'),
      p("variant", "'alert' | 'dialog' | 'sheet' | 'action'", "'alert'", 'Alert is iOS. Dialog is a longer explanation. Sheet rises from the bottom. Action is a list with Cancel on its own row.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Width of the panel. Alert stays compact.'),
      p("tone", "'danger' | 'brand' | 'warning' | 'success' | 'neutral'", "'danger'", 'Meaning of the confirm. Danger is delete. Brand is publish. Warning is leave. Neutral is archive.'),
      p('title', 'string', '—', 'The question. Names the dialog for assistive tech.'),
      p('body', 'ReactNode', 'undefined', 'One supporting line under the title.'),
      p('confirmLabel', 'string', "'Confirm'", 'The verb on the confirm action, such as Delete or Publish.'),
      p('cancelLabel', 'string', "'Cancel'", 'The dismiss action. Hidden when showCancel is false.'),
      p('secondaryLabel', 'string', 'undefined', 'A third action, such as Don’t save. Stacks the buttons.'),
      p('onSecondary', '() => void', 'undefined', 'Called when the third action is pressed.'),
      p('icon', 'boolean | ReactNode', 'undefined', 'True uses the tone glyph. Pass a node for a custom mark.'),
      p('showCancel', 'boolean', 'true', 'Show Cancel. Off for a single OK-style confirm.'),
      p('showClose', 'boolean', 'false', 'Trailing close on dialog and sheet. Off by default so the person must choose.'),
      p('dismissible', 'boolean', 'true', 'Backdrop and Escape close the overlay. Off while saving.'),
      p('loading', 'boolean', 'false', 'Spinner on the confirm. Blocks dismiss. Cancel is disabled.'),
      p('loadingText', 'string', "'Working…'", 'Accessible name while the confirm is busy.'),
      p('confirmDisabled', 'boolean', 'false', 'Dims the confirm until a condition is met.'),
      p('embedded', 'boolean', 'false', 'Render in place. No portal, no scroll lock, no focus trap.'),
    ],
  },
  'avatar-editor': {
    title: 'Avatar Editor',
    description:
      'A full screen crop sheet for a profile photo. The person moves, zooms, and rotates, then saves a circular jpeg.',
    ...avatarEditorGuide,
    Demo: AvatarEditorDemo,
    wide: true,
    code: `<AvatarEditor
  imageSrc={src}
  open={open}
  onCancel={close}
  onSave={save}
  onChooseAnother={pickAnother}
  canRemove
  onRemove={remove}
/>
<AvatarEditor imageSrc={src} open={open} saving onCancel={close} onSave={save} />
`,
    states: [
      { label: 'Closed', node: <Button fullWidth={false}>Edit photo</Button> },
      {
        label: 'Saving',
        node: (
          <Button fullWidth={false} disabled>
            Saving…
          </Button>
        ),
      },
    ],
    props: [
      p('imageSrc', 'string', 'required', 'The photo to crop. Usually an object URL from Avatar Picker.'),
      p('open', 'boolean', 'required', 'Whether the sheet is shown. False unmounts the portal.'),
      p('onCancel', '() => void', 'required', 'Cancel, the backdrop, and Escape when not saving.'),
      p('onSave', '(blob: Blob) => void | Promise<void>', 'required', 'Called with a 512px jpeg of the circle crop. Close the sheet when it resolves.'),
      p('saving', 'boolean', 'false', 'Busy Done from the parent, such as an upload. Locks the sheet like a local save.'),
      p('onChooseAnother', '() => void', 'undefined', 'Choose a Different Photo. Return to the file dialog.'),
      p('canRemove', 'boolean', 'false', 'Show Remove Photo. Pair with onRemove.'),
      p('onRemove', '() => void | Promise<void>', 'undefined', 'Clears the photo. Hidden unless canRemove is true.'),
    ],
  },
  tabs: {
    title: 'Tabs',
    description:
      'Switch between peer views of the same page, such as All and Live. Use Icon Tab when the items are destinations in the app, not filters of one list.',
    ...tabsGuide,
    Demo: TabsDemo,
    wide: true,
    code: `<Tabs
  value={tab}
  onChange={setTab}
  items={[
    { id: 'all', label: 'All' },
    { id: 'live', label: 'Live' },
    { id: 'review', label: 'In review', badge: 1 },
  ]}
/>
<Tabs variant="subtle" value={tab} onChange={setTab} items={items} />
<Tabs variant="outline" value={tab} onChange={setTab} items={items} />
<Tabs variant="ghost" value={tab} onChange={setTab} items={items} />
<Tabs variant="pill" value={tab} onChange={setTab} items={items} />
`,
    statesContent: <TabsStates />,
    props: [
      p('items', 'TabItem[]', '—', 'Tabs. Each has an id and a label. Icon, badge, and disabled are optional.'),
      p('value', 'string', '—', 'The selected tab id.'),
      p('onChange', '(id: string) => void', '—', 'Called when a tab is selected.'),
      p("variant", "'underline' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'underline'", 'Underline is the page default. Subtle, outline, and pill sit in a well. Ghost is type only.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Height and type. Medium is 44px, matching Button.'),
      p("align", "'start' | 'stretch'", "'start'", 'Start hugs the labels. Stretch shares the row equally.'),
      p('fullWidth', 'boolean', 'false', 'Stretch the well to the row. Underline is already full width.'),
      p('disabled', 'boolean', 'false', 'Dims the whole list. Arrow keys do not move.'),
      p("preview", "'hover' | 'focus'", 'undefined', 'Forced visual for state tiles. Skips the pointer.'),
      p('aria-label', 'string', 'undefined', 'Accessible name when there is no nearby heading.'),
    ],
  },
  'icon-tab': {
    title: 'Icon Tab',
    description:
      'The compact bar of destinations at the bottom of an app, with an icon and a short label. Use it for Home, Inbox, and Profile.',
    ...iconTabGuide,
    Demo: IconTabDemo,
    wide: true,
    code: `<IconTabBar
  value={tab}
  onChange={setTab}
  items={[
    { id: 'home', label: 'Home', icon: <DkAppDashboardLayoutTiles /> },
    { id: 'inbox', label: 'Inbox', icon: <DkMessageInboxTray />, badge: 3 },
    { id: 'profile', label: 'Profile', icon: <DkPersonUserProfile /> },
  ]}
/>
<IconTabBar variant="subtle" value={tab} onChange={setTab} items={items} />
<IconTabBar variant="outline" value={tab} onChange={setTab} items={items} />
<IconTabBar variant="fill" value={tab} onChange={setTab} items={items} />
<IconTabBar variant="pill" value={tab} onChange={setTab} items={items} />
<IconTabBar layout="inline" variant="pill" value={tab} onChange={setTab} items={items} />
<IconTab icon={<Home />} label="Home" active />
`,
    statesContent: <IconTabStates />,
    props: [
      p('items', 'IconTabItem[]', '—', 'On IconTabBar. Each has an id, label, and icon. Badge, disabled, and tone are optional.'),
      p('value', 'string', '—', 'On IconTabBar. The selected item id.'),
      p('onChange', '(id: string) => void', '—', 'On IconTabBar. Called when a destination is selected.'),
      p("variant", "'ghost' | 'subtle' | 'outline' | 'fill' | 'pill'", "'ghost'", 'Ghost is the phone bar. Subtle, outline, and pill sit in a well. Fill paints the selected item.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Height and type. Medium stacked is 56px, matching an iOS tab bar.'),
      p("layout", "'stacked' | 'inline' | 'icon'", "'stacked'", 'Stacked is icon over caption. Inline is a toolbar. Icon hides the label.'),
      p('fullWidth', 'boolean', 'true except icon', 'Share the row equally. Icon layout hugs the glyphs unless this is set.'),
      p('disabled', 'boolean', 'false', 'Dims the bar or a single IconTab. Arrow keys do not move on a disabled bar.'),
      p('icon', 'ReactNode', '—', 'On IconTab. Glyph above or beside the label.'),
      p('label', 'string', '—', 'On IconTab. Caption. Also the accessible name for icon layout.'),
      p('active', 'boolean', 'false', 'On IconTab. Selected appearance.'),
      p('badge', 'number | string', 'undefined', 'Count on the icon, or after the label when inline.'),
      p("tone", "'default' | 'danger'", "'default'", 'Danger is a destructive destination such as Log out.'),
      p("preview", "'hover' | 'focus' | 'active'", 'undefined', 'Forced visual for state tiles.'),
      p('aria-label', 'string', 'undefined', 'On IconTabBar. Accessible name when there is no nearby heading.'),
    ],
  },
  breadcrumb: {
    title: 'Breadcrumb',
    description:
      'The path from the root to this page so the person can step back. The last crumb is the current page and is not a link.',
    ...breadcrumbGuide,
    Demo: BreadcrumbDemo,
    wide: true,
    code: `<Breadcrumbs items={[{ label: 'Projects', onClick: go }, { label: 'Atlas' }]} />
<Breadcrumbs variant="subtle" items={items} />
<Breadcrumbs variant="outline" items={items} />
<Breadcrumbs variant="fill" items={items} />
<Breadcrumbs variant="pill" items={items} />
<Breadcrumbs separator="slash" items={items} />
<Breadcrumbs maxItems={4} items={items} />
`,
    statesContent: <BreadcrumbStates />,
    props: [
      p('items', 'BreadcrumbItem[]', '—', 'Crumbs from root to current. Last item is the page. Each item may have href, onClick, icon, iconOnly, and disabled.'),
      p("variant", "'ghost' | 'subtle' | 'outline' | 'fill' | 'pill'", "'ghost'", 'Chrome. Ghost is the page trail. Subtle, outline, and fill sit on a surface. Pill is a chip trail.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Type, icon, and crumb height.'),
      p("separator", "'chevron' | 'slash' | 'dot'", "'chevron'", 'Mark between crumbs. Chevron is the default.'),
      p('maxItems', 'number', 'undefined', 'Collapse the middle into an overflow when the path is longer. Minimum 3.'),
      p("preview", "'hover' | 'focus' | 'active'", 'undefined', 'Forced visual on previewIndex for state tiles.'),
      p('previewIndex', 'number', '0', 'Which crumb receives preview. Use -1 for the overflow.'),
      p('aria-label', 'string', "'Breadcrumb'", 'Accessible name of the navigation.'),
    ],
  },
  pagination: {
    title: 'Pagination',
    description:
      'Move through a long list one page at a time. Extra page numbers collapse so the control stays short.',
    ...paginationGuide,
    Demo: PaginationDemo,
    wide: true,
    code: `<Pagination page={page} pageCount={5} onChange={setPage} />
<Pagination variant="ghost" page={page} pageCount={5} onChange={setPage} />
<Pagination variant="subtle" page={page} pageCount={5} onChange={setPage} />
<Pagination variant="outline" page={page} pageCount={5} onChange={setPage} />
<Pagination variant="pill" page={page} pageCount={5} onChange={setPage} />
<Pagination page={page} pageCount={48} onChange={setPage} />
<Pagination layout="compact" page={page} pageCount={48} onChange={setPage} />
<Pagination layout="simple" page={page} pageCount={48} onChange={setPage} />
<Pagination showFirstLast page={page} pageCount={48} onChange={setPage} />
`,
    statesContent: <PaginationStates />,
    props: [
      p('page', 'number', '—', 'Current 1-based page.'),
      p('pageCount', 'number', '—', 'Total pages.'),
      p('onChange', '(page: number) => void', '—', 'Called with the next page.'),
      p("variant", "'ghost' | 'subtle' | 'outline' | 'primary' | 'pill'", "'primary'", 'Chrome. Primary fills the current page. Ghost is type on a quiet mark. Subtle, outline, and pill sit in a well.'),
      p("size", "'sm' | 'md' | 'lg'", "'sm'", 'Control height. Small is 32px, matching compact table footers. Medium is 36px. Large is 44px.'),
      p("layout", "'numbers' | 'compact' | 'simple'", "'numbers'", 'Numbers with ellipsis, a page line, or previous and next only.'),
      p("align", "'start' | 'center' | 'end'", "'center'", 'Where the control sits when it is not full width.'),
      p('siblingCount', 'number', '1', 'How many numbers sit on each side of the current page. 0 is 1 … 12 … 48.'),
      p('boundaryCount', 'number', '1', 'How many numbers stay at each end.'),
      p('showFirstLast', 'boolean', 'false', 'First and last page controls beside previous and next.'),
      p('showPrevNext', 'boolean', 'true', 'Previous and next controls.'),
      p('disabled', 'boolean', 'false', 'Dims the control and prevents press.'),
      p('loading', 'boolean', 'false', 'Disables every control. The current mark shows a spinner.'),
      p('previousLabel', 'string', "'Previous'", 'Accessible name for previous.'),
      p('nextLabel', 'string', "'Next'", 'Accessible name for next.'),
      p('firstLabel', 'string', "'First page'", 'Accessible name for first.'),
      p('lastLabel', 'string', "'Last page'", 'Accessible name for last.'),
      p('formatCompact', '(page, pageCount) => string', "'3 of 12'", 'Compact layout copy.'),
      p('fullWidth', 'boolean', 'false', 'Previous on the start edge, next on the end edge.'),
      p("preview", "'hover' | 'focus' | 'active'", 'undefined', 'Forced visual for state tiles.'),
      p("previewTarget", "'page' | 'previous' | 'next' | 'first' | 'last'", "'page'", 'Which control receives preview.'),
      p('aria-label', 'string', "'Pagination'", 'Accessible name of the navigation.'),
    ],
  },
  'sidebar-nav': {
    title: 'Sidebar Nav',
    description:
      'Primary navigation for an app shell. Full height with the brand at the top. Fill is the default. Subtle, outline, ghost, and pill change the chrome. Collapse it to a rail.',
    ...sidebarNavGuide,
    Demo: SidebarDemo,
    wide: true,
    code: `<DashboardSidebar
  brand
  collapsible
  variant="fill"
  sections={sections}
  activeId={id}
  onSelect={setId}
  account={{ name: 'Alex Rivera', detail: 'Workspace owner' }}
/>
`,
    statesContent: <SidebarStates />,
    props: [
      p('sections', 'SidebarSection[]', '—', 'Grouped nav items. Optional label, collapsible, and defaultOpen.'),
      p('activeId', 'string', 'undefined', 'The current item. Sets aria-current="page".'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Chrome. Fill is the default column. Pill floats inside the shell.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Width and item height. Medium is 260px.'),
      p('brand', 'boolean | SidebarBrand', 'true', 'Brand mark in the 52px header. Pass href to link it.'),
      p('header', 'ReactNode', 'undefined', 'Replaces the brand header.'),
      p('collapsed', 'boolean', 'undefined', 'Controlled rail. Icons only, 68px wide at medium.'),
      p('defaultCollapsed', 'boolean', 'false', 'Uncontrolled rail.'),
      p('collapsible', 'boolean', 'false', 'Shows the control that collapses to a rail.'),
      p('onCollapsedChange', '(collapsed: boolean) => void', 'undefined', 'Called when the rail toggles.'),
      p('search', '{ value, onChange, placeholder }', 'undefined', 'Optional search field under the brand.'),
      p('account', 'SidebarAccount', 'undefined', 'Signed-in person at the foot.'),
      p('footer', 'ReactNode', 'undefined', 'Slot under the account, such as Theme Toggle.'),
      p('onSelect', '(id: string) => void', 'undefined', 'Called when an enabled item is pressed.'),
    ],
  },
  'dashboard-nav': {
    title: 'Dashboard Nav',
    description: 'Top bar for a signed-in workspace.',
    Demo: DashboardNavDemo,
    wide: true,
    code: `<DashboardNav title="Projects" search={search} userName="Alex Rivera" />\n`,
    props: [
      p('title', 'string', 'undefined', 'Current section title.'),
      p('search', '{ value, onChange }', 'undefined', 'Optional search field.'),
    ],
  },
  'sheet-nav': {
    title: 'Sheet Nav',
    description:
      'The header of a sheet with Cancel and Done. Use it at the top of a modal sheet so the person can dismiss or save.',
    ...sheetNavGuide,
    Demo: SheetNavDemo,
    wide: true,
    code: `<SheetNav title="Edit profile" onCancel={close} onDone={save} />
<SheetNav variant="subtle" title="Edit profile" onCancel={close} onDone={save} />
<SheetNav variant="outline" title="Edit profile" onCancel={close} onDone={save} />
<SheetNav variant="ghost" title="Edit profile" onCancel={close} onDone={save} />
<SheetNav variant="pill" title="Edit profile" onCancel={close} onDone={save} />
<SheetNav layout="close" title="Info" onCancel={close} />
<SheetNav layout="back" title="Photo" cancelLabel="Library" onCancel={back} onDone={save} />
<SheetNav layout="large" title="Settings" subtitle="Name, photo, and username" onCancel={close} onDone={save} />
<SheetNav layout="prominent" title="New album" doneLabel="Add" onCancel={close} onDone={save} />
<SheetNav tone="danger" title="This photo" doneLabel="Delete" onCancel={close} onDone={remove} />
<SheetNav variant="ghost" onDark title="Move and Scale" onCancel={close} onDone={save} />
`,
    statesContent: <SheetNavStates />,
    props: [
      p('title', 'string', 'required', 'Sheet heading. Centered on plain, close, back, and prominent. Start-aligned on large.'),
      p('subtitle', 'string', 'undefined', 'One supporting line under the title.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Chrome. Fill is the default bar with a hairline. Ghost sits on media. Pill is a nested well.'),
      p("layout", "'plain' | 'close' | 'back' | 'large' | 'prominent'", "'plain'", 'Plain is Cancel and Done. Close is a quiet dismiss. Back is nested. Large drops the title. Prominent fills Done in blue.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Bar height and type. Small is 44px, matching a compact iOS bar.'),
      p("tone", "'brand' | 'danger'", "'brand'", 'Trailing action color. Brand is blue. Danger is Delete.'),
      p('cancelLabel', 'string', "'Cancel'", 'Leading label. Ignored on close. On back, a custom label sits after the chevron.'),
      p('doneLabel', 'ReactNode', "'Done'", 'Trailing label. Pass a custom node for a spinner.'),
      p('onCancel', '() => void', 'required', 'Cancel, Close, and Back.'),
      p('onDone', '() => void', 'undefined', 'Trailing action. Hidden when omitted, unless doneLabel is custom.'),
      p('cancelDisabled', 'boolean', 'false', 'Dims Cancel, Close, or Back.'),
      p('doneDisabled', 'boolean', 'false', 'Dims Done.'),
      p('loading', 'boolean', 'false', 'Busy Done. Disables both actions and keeps a text name.'),
      p('loadingText', 'string', 'undefined', 'Done label while loading. Falls back to the current Done word.'),
      p('leading', 'ReactNode', 'undefined', 'Replace the leading action.'),
      p('trailing', 'ReactNode', 'undefined', 'Replace the trailing action.'),
      p('onDark', 'boolean', 'false', 'Type and chrome for a black surface.'),
      p("preview", "'hover' | 'active' | 'disabled'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  'nav-search': {
    title: 'Nav Search',
    description:
      'A compact search field for a top bar. Use it as the trigger for Command Palette, with a shortcut hint such as ⌘K.',
    ...navSearchGuide,
    Demo: NavSearchDemo,
    wide: true,
    code: `<NavSearch value={query} onChange={setQuery} />
<NavSearch variant="subtle" value={query} onChange={setQuery} />
<NavSearch variant="outline" value={query} onChange={setQuery} />
<NavSearch variant="ghost" value={query} onChange={setQuery} />
<NavSearch variant="icon" value={query} onChange={setQuery} />
<NavSearch size="lg" shortcut="⌘K" value={query} onChange={setQuery} />
`,
    statesContent: <NavSearchStates />,
    props: [
      p('value', 'string', '—', 'Query text.'),
      p('onChange', '(value: string) => void', '—', 'Called as the user types.'),
      p('placeholder', 'string', "'Search'", 'Hint inside the field. Also the accessible name unless label is set.'),
      p('label', 'string', 'undefined', 'Accessible name. Use this when the placeholder is a longer hint.'),
      p("variant", "'pill' | 'subtle' | 'outline' | 'ghost' | 'icon'", "'pill'", 'Chrome. Pill is the default in a toolbar. Icon collapses to a glass and opens on focus.'),
      p("size", "'sm' | 'md' | 'lg'", "'sm'", 'Height. Small is a 52px bar. Large is a 44px touch target.'),
      p('shortcut', 'string', 'undefined', 'Keyboard hint on the trailing edge, such as ⌘K. Hidden when focused, filled, or loading.'),
      p('loading', 'boolean', 'false', 'Replaces the glass with a spinner. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the field. It is not operable.'),
      p('expanded', 'boolean', 'undefined', 'On icon, force the field open. Uncontrolled when omitted.'),
      p('defaultExpanded', 'boolean', 'false', 'On icon, open on the first paint.'),
      p('onExpandedChange', '(expanded: boolean) => void', 'undefined', 'Called when the icon field opens or closes.'),
      p('onClear', '() => void', 'undefined', 'Called from the clear mark. Defaults to emptying the query.'),
      p('onSubmit', '(value: string) => void', 'undefined', 'Called when the user presses Enter.'),
      p('onActivate', '() => void', 'undefined', 'Turns the field into a trigger, such as opening Command Palette. Click, Enter, or Space.'),
      p('active', 'boolean', 'false', 'Forced open chrome on a trigger, while the palette is shown.'),
      p('readOnly', 'boolean', 'false', 'The field cannot be typed. Implied when onActivate is set.'),
      p("preview", "'hover' | 'focus'", 'undefined', 'Forced hover or focus for state tiles.'),
      p('name', 'string', 'undefined', 'Native input name.'),
      p('id', 'string', 'undefined', 'Native input id. Generated when omitted.'),
      p('className', 'string', 'undefined', 'Extra classes on the field.'),
    ],
  },
  'profile-button': {
    title: 'Profile Button', 
    description:
      'The account control in a header. Press it to open the account menu. Use a face in a toolbar, or add the name and email on a settings row.',
    ...profileButtonGuide,
    Demo: ProfileButtonDemo,
    wide: true,
    code: `<ProfileButton name="Alex Rivera" />
<ProfileButton name="Alex Rivera" variant="subtle" />
<ProfileButton name="Alex Rivera" variant="outline" />
<ProfileButton name="Alex Rivera" variant="ghost" />
<ProfileButton name="Alex Rivera" variant="pill" />
<ProfileButton name="Alex Rivera" layout="labeled" variant="subtle" />
<ProfileButton name="Alex Rivera" layout="menu" variant="pill" />
<ProfileButton
  name="Alex Rivera"
  subtitle="alex@roboticela.com"
  layout="identity"
  status="online"
/>
<ProfileButton name="Alex Rivera" size="md" badge={3} />
<ProfileButton name="Alex Rivera" loading />
`,
    statesContent: <ProfileButtonStates />,
    props: [
      p('name', 'string', 'undefined', 'Used for initials and the accessible label.'),
      p('src', 'string | null', 'undefined', 'Photo URL. Replaces initials and icon.'),
      p('subtitle', 'string', 'undefined', 'Second line on identity, such as an email. Included in the accessible name.'),
      p('icon', 'ReactNode', 'undefined', 'A kit icon when there is no photo. Wins over initials.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Chrome. Fill is the toolbar ring. Ghost is the photo alone. Pill is a capsule when labeled.'),
      p("size", "'sm' | 'md' | 'lg'", "'sm'", 'Small is 32px in a nav. Medium is 44px. Large is a settings row.'),
      p("layout", "'avatar' | 'labeled' | 'menu' | 'identity'", "'avatar'", 'Avatar is the face. Labeled adds the name. Menu adds a caret. Identity adds an email.'),
      p("shape", "'circle' | 'rounded'", "'circle'", 'Circle is the default. Rounded is a squircle on the face and on avatar layout.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Ink on initials when there is no photo.'),
      p("status", "'none' | 'online' | 'away' | 'busy' | 'offline'", "'none'", 'Presence dot. Included in the accessible name.'),
      p('badge', 'number | string', 'undefined', 'Count on the face. Hidden at zero.'),
      p('chevron', 'boolean', 'true on identity', 'Show a caret. Menu always shows one. Identity shows one unless this is false.'),
      p('open', 'boolean', 'false', 'Menu is visible. Rotates the caret and sets aria-expanded.'),
      p('loading', 'boolean', 'false', 'Replaces the face with a spinner. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the control and blocks press.'),
      p('fullWidth', 'boolean', 'false', 'Stretch labeled, menu, and identity to the container.'),
      p("preview", "'hover' | 'focus' | 'active'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  badge: {
    title: 'Badge',
    description:
      'A short status, count, or category on a row or a heading. Use it for New, Live, a review, or a notification number. Do not put a sentence in a badge.',
    ...badgeGuide,
    Demo: BadgeDemo,
    wide: true,
    code: `<Badge>New</Badge>
<Badge variant="fill">New</Badge>
<Badge variant="outline" tone="warning">In review</Badge>
<Badge variant="ghost" tone="neutral">Beta</Badge>
<Badge variant="pill">Pro</Badge>
<Badge variant="fill" tone="danger" count={3} />
<Badge tone="verified" dot pulse>Live</Badge>
<Badge tone="success">Verified</Badge>
<Badge loading>Saving</Badge>
<Badge disabled>Paused</Badge>
<Badge onDismiss={remove}>Filters</Badge>
`,
    statesContent: <BadgeStates />,
    props: [
      p('children', 'ReactNode', 'undefined', 'The label. Hidden when count is set.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'subtle'", 'Chrome. Subtle is the default tint. Fill is solid. Outline is a wireframe. Ghost is ink only. Pill is a taller chip.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Small is a table. Medium is the default. Large sits next to a heading.'),
      p("tone", "'brand' | 'verified' | 'success' | 'warning' | 'danger' | 'neutral'", "'brand'", 'Color. Teal is verified. Green is success. Orange is a review. Red is a problem. primary, unverified, and muted are aliases.'),
      p("shape", "'pill' | 'rounded'", "'pill'", 'Pill is a capsule. Rounded is a squircle.'),
      p('icon', 'ReactNode', 'undefined', 'A leading kit icon. Hidden when a dot is shown.'),
      p('dot', 'boolean', 'false', 'A leading status mark. With no label, this is the whole badge.'),
      p('pulse', 'boolean', 'false', 'Animates the dot. Use for a status that is happening now.'),
      p('count', 'number | string', 'undefined', 'A notification number. Hidden at zero. Overflow becomes 99+.'),
      p('max', 'number', '99', 'The highest count before overflow. Ignored when count is a string.'),
      p('loading', 'boolean', 'false', 'Replaces the icon or dot with a spinner. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the badge. Blocks press and dismiss.'),
      p('onDismiss', '() => void', 'undefined', 'Shows a remove mark. The control has its own label.'),
      p('dismissLabel', 'string', "'Remove'", 'Accessible name for the remove mark.'),
      p('onClick', '(event) => void', 'undefined', 'Turns the badge into a button, such as a filter chip.'),
      p('label', 'string', 'undefined', 'Accessible name when the badge has no visible text, such as a count or a dot.'),
    ],
  },
  avatar: {
    title: 'Avatar',
    description:
      'The face of a person in the interface. A photo when you have one, otherwise initials from the name. Stack faces in a group when several people share a row.',
    ...avatarGuide,
    Demo: AvatarDemo,
    wide: true,
    code: `<Avatar name="Alex Rivera" />
<Avatar name="Alex Rivera" variant="subtle" />
<Avatar name="Alex Rivera" variant="outline" />
<Avatar name="Alex Rivera" variant="ghost" />
<Avatar name="Alex Rivera" variant="pill" />
<Avatar name="Alex Rivera" size="lg" status="online" />
<Avatar name="Alex Rivera" tone="brand" />
<Avatar name="Alex Rivera" shape="rounded" />
<Avatar name="Alex Rivera" src="/photo.jpg" />
<AvatarGroup max={3}>
  <Avatar name="Alex Rivera" />
  <Avatar name="Sam Chen" />
  <Avatar name="Jordan Lee" />
  <Avatar name="Riley Patel" />
</AvatarGroup>
`,
    statesContent: <AvatarStates />,
    props: [
      p('name', 'string', 'undefined', 'Used for initials and the accessible label.'),
      p('src', 'string | null', 'undefined', 'Photo URL. Replaces initials and icon.'),
      p('icon', 'ReactNode', 'undefined', 'A kit icon when there is no photo. Wins over initials.'),
      p('faceLabel', 'string', 'undefined', 'Custom face text, such as +3 on a group overflow.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Chrome. Fill is the default. Ghost is for a dense list.'),
      p("size", "'xs' | 'sm' | 'md' | 'lg' | 'xl'", "'md'", 'Diameter. Small is a table. Extra large is the picker.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Ink and fill when there is no photo.'),
      p("status", "'none' | 'online' | 'away' | 'busy' | 'offline'", "'none'", 'Presence dot. Included in the accessible name.'),
      p("shape", "'circle' | 'rounded'", "'circle'", 'Circle is the default. Rounded is a squircle.'),
      p('loading', 'boolean', 'false', 'Pulse placeholder. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the face. Avatar is never a control.'),
      p('children', 'ReactNode', '—', 'On Avatar Group, the faces to stack.'),
      p('max', 'number', '3', 'On Avatar Group, how many faces stay visible. The rest become a count.'),
    ],
  },
  'avatar-picker': {
    title: 'Avatar Picker',
    description:
      'Choose a profile photo from the device. An empty face is Add photo. A saved photo is Edit photo and should open the crop sheet.',
    ...avatarPickerGuide,
    Demo: AvatarPickerDemo,
    wide: true,
    code: `<AvatarPicker name="Alex Rivera" src={src} onFile={onFile} />
<AvatarPicker name="Alex Rivera" src={src} onFile={onFile} onEdit={openEditor} />
<AvatarPicker name="Alex Rivera" disabled onFile={onFile} />
`,
    statesContent: <AvatarPickerStates />,
    props: [
      p('name', 'string', 'undefined', 'Used for initials and the accessible label of the face.'),
      p('src', 'string | null', 'undefined', 'Photo URL. When set, the camera is Edit photo if onEdit is passed.'),
      p('onFile', '(file: File) => void', 'required', 'Called when a file is chosen. Open Avatar Editor with an object URL.'),
      p('onEdit', '() => void', 'undefined', 'Opens the editor when a photo already exists. Without it, the camera picks a new file.'),
      p('disabled', 'boolean', 'false', 'Dims the camera. Use this while the editor is saving.'),
      p('accept', 'string', "'image/jpeg,image/png,image/webp,image/gif'", 'File types the dialog allows.'),
      p('ref', 'Ref<AvatarPickerHandle>', 'undefined', 'Call ref.open() to show the file dialog from a parent.'),
    ],
  },
  card: {
    title: 'Card',
    description:
      'A quiet surface for a title, supporting copy, and optional media or actions. Use it for a project, a feature, or a destination.',
    ...cardGuide,
    Demo: CardDemo,
    wide: true,
    code: `<Card title="Team library" description="Shared files, comments, and reviews in one place." />
<Card variant="subtle" title="Team library" description="Shared files, comments, and reviews in one place." />
<Card variant="outline" title="Team library" description="Shared files, comments, and reviews in one place." />
<Card variant="ghost" title="Team library" description="Shared files, comments, and reviews in one place." />
<Card variant="pill" title="Team library" description="Shared files, comments, and reviews in one place." />
<Card
  media={<img src="/cover.jpg" alt="" />}
  icon={<Tiles />}
  eyebrow="Workspace"
  title="Team library"
  description="Shared files, comments, and reviews in one place."
/>
<Card title="Team library" description="Shared files in one place." href="/library" />
<Card title="Team library" loading />
<div className="grid grid-cols-2 items-stretch gap-4">
  <Card fullHeight title="Notes" description="A short line." />
  <Card fullHeight title="Team library" description="Shared files, comments, and reviews in one place." />
</div>
<Card fullWidth={false} title="Notes" />
`,
    statesContent: <CardStates />,
    props: [
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Chrome. Fill is the default tile. Ghost in a dense grid. Pill is the rounder tile.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Padding and type. Small is a sidebar. Large is a featured object.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Tile tint and icon color. Default stays neutral. Tone is for a semantic card, not a second CTA.'),
      p('title', 'string', 'undefined', 'Name of the object. Also the accessible name.'),
      p('description', 'ReactNode', 'undefined', 'One supporting line under the title.'),
      p('eyebrow', 'string', 'undefined', 'Short uppercase kicker above the title.'),
      p('icon', 'ReactNode', 'undefined', 'Leading mark in a well. Ghost draws the glyph with no well.'),
      p('media', 'ReactNode', 'undefined', 'Full bleed picture or video at the top. Clipped to the card radius.'),
      p('children', 'ReactNode', 'undefined', 'Optional body under the description, such as a badge row.'),
      p('footer', 'ReactNode', 'undefined', 'Actions under the body. Use only when the card itself is not pressable.'),
      p('fullWidth', 'boolean', 'true', 'Fill the row. Pass false so the card hugs its copy.'),
      p('fullHeight', 'boolean', 'false', 'Fill the parent height in a grid or a flex row. Footer sits at the bottom.'),
      p('selected', 'boolean', 'false', 'Marks the card as chosen in a set.'),
      p('loading', 'boolean', 'false', 'Pulse placeholders for media and copy. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the tile. Press is blocked.'),
      p('href', 'string', 'undefined', 'Turns the card into a link to the destination.'),
      p('onClick', 'MouseEventHandler', 'undefined', 'Turns the card into a button. Ignored when href is set.'),
      p('onDark', 'boolean', 'false', 'Chrome and type for a black surface.'),
      p("preview", "'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'selected'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  'card-grid': {
    title: 'Card Grid',
    description:
      'A responsive set of cards. Choose equal or unequal height, equal or mixed width, and two to four columns.',
    ...cardGridGuide,
    Demo: CardGridDemo,
    wide: true,
    code: `<CardGrid columns={3}>
  <Card title="Notes" description="A short line." />
  <Card title="Team library" description="Shared files, comments, and reviews in one place." />
  <Card title="Design crit" description="Comments and files for this week." />
</CardGrid>
<CardGrid columns={2} align="stretch">
  <Card title="Notes" description="A short line." />
  <Card title="Team library" description="Shared files, comments, and reviews in one place." />
</CardGrid>
<CardGrid columns={2} align="start">
  <Card title="Notes" description="A short line." />
  <Card title="Team library" description="Shared files, comments, and reviews in one place." />
</CardGrid>
<CardGrid columns={2} widths="fit">
  <Card title="Notes" />
  <Card title="Team library" description="Shared files in one place." />
</CardGrid>
<CardGrid columns={2} widths="mixed">
  <Card title="Notes" />
  <Card title="Team library" description="Fills the rest of the row." />
</CardGrid>
`,
    statesContent: <CardGridStates />,
    props: [
      p('children', 'ReactNode', '—', 'The cards in the set. Prefer Card.'),
      p('columns', '1 | 2 | 3 | 4', '3', 'Preferred column count. Collapses on smaller screens.'),
      p("align", "'stretch' | 'start'", "'stretch'", 'Stretch is equal height. Start lets each card hug its copy.'),
      p("widths", "'equal' | 'fit' | 'mixed'", "'equal'", 'Equal shares the row. Fit hugs copy. Mixed keeps the first card compact.'),
      p("gap", "'sm' | 'md' | 'lg'", "'md'", 'Space between cards. Small is 12px. Medium is 16px. Large is 24px.'),
    ],
  },
  'stat-card': {
    title: 'Stat Card',
    description:
      'A headline number on a dashboard, with an optional change, unit, icon, and trend. Use one card per metric.',
    ...statCardGuide,
    Demo: StatCardDemo,
    wide: true,
    code: `<StatCard label="Revenue" value="$48,290" delta={{ value: '+12%', tone: 'up' }} hint="vs last month" />
<StatCard variant="subtle" label="Revenue" value="$48,290" delta={{ value: '+12%', tone: 'up' }} />
<StatCard variant="outline" label="Revenue" value="$48,290" delta={{ value: '+12%', tone: 'up' }} />
<StatCard variant="ghost" label="Revenue" value="$48,290" delta={{ value: '+12%', tone: 'up' }} />
<StatCard variant="pill" label="Revenue" value="$48,290" delta={{ value: '+12%', tone: 'up' }} />
<StatCard
  icon={<Banknote />}
  label="Revenue"
  value="$48,290"
  unit="/mo"
  delta={{ value: '+12%', tone: 'up' }}
  hint="vs last month"
  sparkline={[18, 22, 19, 26, 24, 31, 28, 36]}
/>
<StatCard label="Open tickets" value="18" delta={{ value: '−2', tone: 'down', invert: true }} />
<StatCard label="Revenue" empty hint="No data yet" />
`,
    statesContent: <StatCardStates />,
    props: [
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Chrome. Fill is the default on a dashboard. Ghost in a dense row. Pill is the rounder tile.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Padding and type. Small is a sidebar. Large is a featured number.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Tile tint and icon color. Default stays neutral. Tone is for a semantic metric, not a second CTA.'),
      p("align", "'start' | 'center'", "'start'", 'Start is a dashboard tile. Center is a featured number.'),
      p('label', 'string', '—', 'Metric name. Also the accessible name.'),
      p('value', 'string', 'undefined', 'Formatted number. Hidden while loading. Replaced by an em dash when empty.'),
      p('unit', 'string', 'undefined', 'Scale beside the number, such as min or /mo.'),
      p('delta', '{ value, tone, invert }', 'undefined', 'Change vs a prior period. Tone is up, down, warning, or neutral. Invert when a drop is the win.'),
      p('hint', 'string', 'undefined', 'Period or supporting line, such as vs last month.'),
      p('icon', 'ReactNode', 'undefined', 'Leading mark in a well. Ghost draws the glyph with no well.'),
      p('sparkline', 'number[]', 'undefined', 'A decorative trend. Hidden while loading or empty. Needs two or more points.'),
      p('onDark', 'boolean', 'false', 'Chrome and type for a black surface.'),
      p('loading', 'boolean', 'false', 'Pulse placeholders for the value and delta. Sets aria-busy.'),
      p('empty', 'boolean', 'false', 'Shows an em dash. Keeps the label and hint.'),
      p('disabled', 'boolean', 'false', 'Dims the tile. The card is not operable.'),
      p('href', 'string', 'undefined', 'Turns the card into a link to the detail behind the number.'),
      p('onClick', 'MouseEventHandler', 'undefined', 'Turns the card into a button. Ignored when href is set.'),
    ],
  },
  table: {
    title: 'Table',
    description:
      'A structured list of records with headers, sort, selection, and optional editing in a cell. Use it when each row is the same kind of item.',
    ...tableGuide,
    Demo: TableDemo,
    wide: true,
    code: `<DataTable
  caption="Projects"
  selectable
  data={rows}
  columns={columns}
  rowKey={(row) => row.id}
/>
<DataTable variant="subtle" data={rows} columns={columns} rowKey={(row) => row.id} />
<DataTable variant="outline" data={rows} columns={columns} rowKey={(row) => row.id} />
<DataTable variant="ghost" data={rows} columns={columns} rowKey={(row) => row.id} />
<DataTable variant="pill" data={rows} columns={columns} rowKey={(row) => row.id} />
<DataTable size="sm" data={rows} columns={columns} rowKey={(row) => row.id} />
<DataTable layout="striped" data={rows} columns={columns} rowKey={(row) => row.id} />
<DataTable selectable="single" data={rows} columns={columns} rowKey={(row) => row.id} />
<DataTable
  editable
  data={rows}
  columns={columns}
  rowKey={(row) => row.id}
  onEdit={({ rowKey, column, value }) => save(rowKey, column, value)}
/>
<DataTable data={[]} columns={columns} rowKey={(row) => row.id} />
`,
    statesContent: <TableStates />,
    props: [
      p('data', 'T[]', '—', 'Rows.'),
      p('columns', 'DataColumn<T>[]', '—', 'Headers, alignment, sort, cell renderers, and editable / editValue.'),
      p('rowKey', '(row: T) => string', '—', 'Stable id for each row.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Chrome. Fill is the default card. Subtle and pill sit on a secondary surface. Ghost has no frame.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Row density. Small is a log. Medium is a product list. Large is a people list.'),
      p("layout", "'divided' | 'striped'", "'divided'", 'Divided is a hairline between rows. Striped alternates a quiet fill.'),
      p("selectable", "boolean | 'single' | 'multiple'", 'false', 'Row selection. True is multiple. Single keeps one row.'),
      p('selectedKeys', 'string[]', 'undefined', 'Controlled selection. Omit for internal state.'),
      p('defaultSelectedKeys', 'string[]', '[]', 'Initial selection when uncontrolled.'),
      p('onSelectionChange', '(keys: string[]) => void', 'undefined', 'Fires when the selection changes.'),
      p('sortKey', 'string', 'undefined', 'Active sortable column. Omit for internal sort.'),
      p("sortDirection", "'asc' | 'desc'", "'asc'", 'Direction of the active sort.'),
      p('onSort', '(key, direction) => void', 'undefined', 'Fires when a sortable header is pressed. If set with sortKey, the parent owns the order.'),
      p('isRowDisabled', '(row: T) => boolean', 'undefined', 'Dims a row and skips it in select all and arrow keys.'),
      p('onRowClick', '(row: T) => void', 'undefined', 'Fires when a row is pressed. Return edits when the table is editable.'),
      p('editable', 'boolean', 'false', 'Double-click a cell, or Return / F2, to edit. Type to replace. Escape cancels. Tab commits and moves.'),
      p('onEdit', '(edit: DataTableEdit<T>) => void', 'undefined', 'Fires after a commit. If omitted, the table keeps the new value locally.'),
      p('caption', 'ReactNode', 'undefined', 'Title in the toolbar. A string is also the accessible name.'),
      p('actions', 'ReactNode', 'undefined', 'Trailing controls in the toolbar, such as New.'),
      p('footer', 'ReactNode', 'undefined', 'Quiet strip under the rows, for a count or Pagination.'),
      p('empty', 'ReactNode', 'Empty State', 'Shown inside the frame when there are no rows.'),
      p('loading', 'boolean', 'false', 'Replaces rows with skeleton lines. Sets aria-busy.'),
      p('loadingRows', 'number', '4', 'How many skeleton rows to show.'),
      p('stickyHeader', 'boolean', 'false', 'Pins the header while the body scrolls.'),
      p('maxHeight', 'string', "'320px' when sticky", 'Scrollport height when the header is sticky.'),
      p('minWidth', 'string', "'520px'", 'Minimum table width before horizontal scroll.'),
      p("preview", "'hover' | 'selected' | 'focus' | 'active' | 'disabled' | 'loading' | 'empty' | 'editing'", 'undefined', 'Forced visual for state tiles.'),
      p('previewRow', 'number', '0', 'Which row the preview applies to.'),
      p('previewColumn', 'string', 'first editable', 'Which column the editing preview applies to.'),
    ],
  },
  'page-header': {
    title: 'Page Header',
    description:
      'The title of a view, with optional supporting copy and page actions. Use it at the top of a list, a settings screen, or a detail page.',
    ...pageHeaderGuide,
    Demo: PageHeaderDemo,
    wide: true,
    code: `<PageHeader eyebrow="Workspace" title="Projects" description="Everything currently in flight." />
<PageHeader variant="subtle" title="Projects" description="Everything currently in flight." />
<PageHeader variant="outline" title="Projects" description="Everything currently in flight." />
<PageHeader variant="fill" title="Projects" description="Everything currently in flight." />
<PageHeader variant="pill" title="Projects" description="Everything currently in flight." />
<PageHeader layout="stack" title="Projects" actions={<Button>New</Button>} />
<PageHeader align="center" size="lg" title="Projects" description="A calm place to ship." />
<PageHeader onBack={back} title="Details" />
`,
    statesContent: <PageHeaderStates />,
    props: [
      p('title', 'string', 'required', 'Page heading. An h1 by default.'),
      p('description', 'ReactNode', 'undefined', 'One supporting line under the title.'),
      p('eyebrow', 'string', 'undefined', 'Short uppercase kicker above the title.'),
      p('actions', 'ReactNode', 'undefined', 'Trailing buttons. Keep one primary verb.'),
      p('leading', 'ReactNode', 'undefined', 'Avatar, icon, or a custom back control.'),
      p('meta', 'ReactNode', 'undefined', 'A badge or quiet mark beside the title.'),
      p('breadcrumbs', 'ReactNode', 'undefined', 'Path above the title. Pass Breadcrumbs.'),
      p('extra', 'ReactNode', 'undefined', 'A row under the header, such as Tabs.'),
      p("variant", "'ghost' | 'subtle' | 'outline' | 'fill' | 'pill'", "'ghost'", 'Chrome. Ghost is the page. Subtle, outline, fill, and pill sit in a card.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Type and padding. Small is a nested view. Large is a hero.'),
      p("layout", "'split' | 'stack'", "'split'", 'Split puts actions on the trailing edge from tablet up. Stack keeps them under the copy.'),
      p("align", "'start' | 'center'", "'start'", 'Start is a product page. Center is a hero.'),
      p('loading', 'boolean', 'false', 'Replaces the title, description, and actions with a skeleton. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the actions. They stay in the tree.'),
      p('onBack', '() => void', 'undefined', 'Renders a Back button when leading is omitted.'),
      p('onDark', 'boolean', 'false', 'Type and chrome for a black surface.'),
      p('as', 'ElementType', "'h1'", 'Heading tag. Pass as when the visual size and the outline disagree.'),
    ],
  },
  'list-row': {
    title: 'List Row',
    description:
      'A tappable row inside a grouped list, with a title, optional meta, and a trailing control. Use it for people, files, or mail.',
    ...listRowGuide,
    Demo: ListRowDemo,
    wide: true,
    code: `<ListGroup>
  <ListRow leading={<ListMark><DkGearSettingsPreferences /></ListMark>} title="General" chevron />
  <ListRow leading={<Avatar name="Alex Rivera" />} title="Alex Rivera" meta="alex@roboticela.com" chevron />
</ListGroup>
<ListGroup variant="subtle">
  <ListRow title="Language" value="English" chevron />
</ListGroup>
<ListGroup variant="outline">
  <ListRow title="Language" value="English" chevron />
</ListGroup>
<ListGroup variant="ghost">
  <ListRow title="Language" value="English" chevron />
</ListGroup>
<ListGroup variant="pill">
  <ListRow title="Language" value="English" chevron />
</ListGroup>
<ListRow tone="brand" title="Add account" chevron />
<ListRow tone="danger" title="Delete account" chevron />
<ListRow selected title="English" />
<ListRow disabled title="Unavailable" chevron />
<ListRow title="Product alerts" trailing={<Switch checked />} />
`,
    statesContent: <ListRowStates />,
    props: [
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Group chrome. Fill is the default inset card. Ghost is a plain list. Pill is a nested well with capsule rows. Set it on ListGroup to paint every row.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Padding, type, and min height. Medium is 52px, matching a system grouped cell.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Title color. Brand is a constructive action. Danger is Delete or Sign out.'),
      p('title', 'ReactNode', '—', 'Primary line.'),
      p('meta', 'ReactNode', 'undefined', 'Secondary line under the title.'),
      p('value', 'ReactNode', 'undefined', 'Trailing detail, such as English or a phone number.'),
      p('leading', 'ReactNode', 'undefined', 'Leading mark. Pass ListMark for a Settings glyph, or Avatar for a person.'),
      p('trailing', 'ReactNode', 'undefined', 'Trailing control, badge, or action. Do not nest a button in a tappable row.'),
      p('chevron', 'boolean', 'true when tappable', 'Disclosure chevron. Defaults on when href or onClick is set. Hidden when selected.'),
      p('selected', 'boolean', 'false', 'Marks the current choice. Shows a check and a brand tint.'),
      p('disabled', 'boolean', 'false', 'Dims the row and removes it from the click cycle.'),
      p("preview", "'hover' | 'focus' | 'active'", 'undefined', 'Forced visual for state tiles.'),
      p('href', 'string', 'undefined', 'Renders the row as a link.'),
      p('onClick', '() => void', 'undefined', 'Renders the row as a button.'),
      p('header', 'ReactNode', 'undefined', 'ListGroup only. Caption above the group.'),
      p('footer', 'ReactNode', 'undefined', 'ListGroup only. Caption below the group.'),
    ],
  },
  'settings-row': {
    title: 'Settings Row',
    description:
      'A preference row with a label and a trailing control such as a switch. Use it in grouped settings, not as a form field.',
    ...settingsRowGuide,
    Demo: SettingsRowDemo,
    wide: true,
    code: `<SettingsList header="Notifications" footer="Alerts arrive as they happen.">
  <SettingsRow
    icon={<BellIcon />}
    iconTone="danger"
    label="Product alerts"
    description="Push and email"
    control={<Switch checked />}
  />
  <SettingsRow
    icon={<MailIcon />}
    label="Weekly digest"
    control={<Switch />}
  />
</SettingsList>
<SettingsList header="Account">
  <SettingsRow icon={<UserIcon />} iconTone="muted" label="Name" value="Alex Rivera" />
  <SettingsRow icon={<GlobeIcon />} iconTone="teal" label="Language" value="English" />
</SettingsList>
<SettingsList variant="subtle">
  <SettingsRow layout="selection" label="English" selected />
  <SettingsRow layout="selection" label="Español" />
</SettingsList>
<SettingsList variant="outline">
  <SettingsRow label="Language" value="English" />
</SettingsList>
<SettingsList variant="ghost">
  <SettingsRow label="Language" value="English" />
</SettingsList>
<SettingsList variant="pill">
  <SettingsRow label="Language" value="English" />
</SettingsList>
<SettingsRow layout="action" tone="brand" label="Add account" />
<SettingsRow layout="action" align="center" tone="danger" label="Sign out" />
<SettingsRow loading label="Language" value="English" />
<SettingsRow disabled label="Two-factor" value="Unavailable" />
`,
    statesContent: <SettingsRowStates />,
    props: [
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Group chrome. Fill is the default inset card. Ghost is a plain list. Pill is a nested well with capsule rows. Set it on SettingsList to paint every row.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Padding, type, and min height. Medium is 52px, matching a system grouped cell.'),
      p("layout", "'control' | 'navigation' | 'value' | 'selection' | 'action'", 'inferred', 'Control is a switch. Navigation is a chevron. Value is a trailing detail. Selection is a check. Action is a labeled verb.'),
      p("tone", "'default' | 'brand' | 'danger'", "'default'", 'Title color. Brand is a constructive action. Danger is Delete or Sign out.'),
      p("iconTone", "'brand' | 'teal' | 'success' | 'warning' | 'danger' | 'muted'", "'brand'", 'Color of the leading well. Teal is verified. Muted is system.'),
      p('label', 'ReactNode', '—', 'Primary line.'),
      p('description', 'ReactNode', 'undefined', 'Secondary line under the label.'),
      p('value', 'ReactNode', 'undefined', 'Trailing detail, such as English or On.'),
      p('control', 'ReactNode', 'undefined', 'Trailing switch or other control. Do not also make that row a button.'),
      p('icon', 'ReactNode', 'undefined', 'Glyph inside the leading well. Hidden from assistive tech.'),
      p('leading', 'ReactNode', 'undefined', 'Replace the well. Pass SettingsMark, or Avatar when the row is a person.'),
      p('badge', 'ReactNode', 'undefined', 'Trailing badge before the value or chevron.'),
      p('chevron', 'boolean', 'true when tappable', 'Disclosure chevron. Defaults on for navigation and tappable value rows. Hidden when selected.'),
      p('selected', 'boolean', 'undefined', 'Marks the current choice. Shows a check and a brand tint.'),
      p('disabled', 'boolean', 'false', 'Dims the row and removes it from the click cycle.'),
      p('loading', 'boolean', 'false', 'Replaces the trailing control with a spinner and sets aria-busy.'),
      p('danger', 'boolean', 'false', 'Alias for tone="danger".'),
      p("align", "'start' | 'center'", "'start'", 'Action layout only. Center is Sign out.'),
      p("preview", "'hover' | 'focus' | 'active'", 'undefined', 'Forced visual for state tiles.'),
      p('href', 'string', 'undefined', 'Renders the row as a link.'),
      p('onClick', '() => void', 'undefined', 'Renders the row as a button when there is no nested control.'),
      p('header', 'ReactNode', 'undefined', 'SettingsList only. Caption above the group.'),
      p('footer', 'ReactNode', 'undefined', 'SettingsList only. Caption below the group.'),
    ],
  },
  'key-value-row': {
    title: 'Key Value Row',
    description:
      'A field name on the left and its current value on the right. Use it for account details. Make a value copyable when the person needs to take it with them.',
    ...keyValueRowGuide,
    Demo: KeyValueRowDemo,
    wide: true,
    code: `<KeyValueGroup>
  <KeyValueRow label="Plan" value="Studio" />
  <KeyValueRow label="Seats" value="8" />
</KeyValueGroup>
<KeyValueGroup variant="subtle">
  <KeyValueRow label="Plan" value="Studio" />
</KeyValueGroup>
<KeyValueGroup variant="outline">
  <KeyValueRow label="Plan" value="Studio" />
</KeyValueGroup>
<KeyValueGroup variant="ghost">
  <KeyValueRow label="Plan" value="Studio" />
</KeyValueGroup>
<KeyValueGroup variant="pill">
  <KeyValueRow label="Plan" value="Studio" />
</KeyValueGroup>
<KeyValueRow label="Email" value="alex@roboticela.com" copyable />
<KeyValueRow label="Website" empty />
<KeyValueRow label="Status" value="Verified" tone="success" />
`,
    statesContent: <KeyValueRowStates />,
    props: [
      p('label', 'ReactNode', '—', 'The field name on the leading edge.'),
      p('value', 'ReactNode', 'undefined', 'The current answer. Truncates on one line. A badge or other node is allowed.'),
      p('hint', 'ReactNode', 'undefined', 'A caption under the label.'),
      p('leading', 'ReactNode', 'undefined', 'A kit icon before the label.'),
      p('trailing', 'ReactNode', 'undefined', 'Replaces the chevron or the copied check.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'fill'", 'Chrome. Fill is a hairline list. Subtle, outline, and pill sit as a card. Inherited from the group.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Height and type. Medium is 44px, matching an iOS settings row. Inherited from the group.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Value color. Default is secondary gray. Copyable and links become brand.'),
      p("layout", "'inline' | 'stacked' | 'responsive'", "'inline'", 'Inline is label left, value right. Stacked is label above. Responsive stacks until 735px.'),
      p('placeholder', 'string', "'Not set'", 'Shown when the value is missing.'),
      p('copyable', 'boolean', 'false', 'Copies the value. The control is a button named Copy, then the label.'),
      p('copyText', 'string', 'the value, if a string', 'Override what is copied when the value is a node.'),
      p('chevron', 'boolean', 'true on link and click', 'Trailing disclosure. Off for copyable. Pass true to force it.'),
      p('href', 'string', 'undefined', 'Turns the row into a link. The value is brand blue.'),
      p('onClick', '() => void', 'undefined', 'Turns the row into a button.'),
      p('selected', 'boolean', 'false', 'Brand-tinted fill. Sets aria-current.'),
      p('loading', 'boolean', 'false', 'Replaces the value with a bone. Sets aria-busy.'),
      p('empty', 'boolean', 'false', 'Shows the placeholder even if a value is passed.'),
      p('invalid', 'boolean', 'false', 'Danger type on the value. Sets aria-invalid. Pair with a hint.'),
      p('disabled', 'boolean', 'false', 'Dims the row. It is not operable.'),
      p('onDark', 'boolean', 'false', 'Type and chrome for a black surface. Inherited from the group.'),
      p("preview", "'hover' | 'focus' | 'active' | 'disabled' | 'copied'", 'undefined', 'Forced visual for state tiles.'),
      p('KeyValueGroup.variant', 'same as row', "'fill'", 'Paints the card. Rows inside inherit it.'),
      p('KeyValueGroup.size', 'same as row', "'md'", 'Default size for rows in the group.'),
      p('KeyValueGroup.label', 'string', 'undefined', 'Accessible name of the group.'),
    ],
  },
  divider: {
    title: 'Divider',
    description:
      'A quiet line between sections. Add a label when two groups need a word in the middle, such as or continue with.',
    ...dividerGuide,
    Demo: DividerDemo,
    wide: true,
    code: `<Divider />
<Divider>or continue with</Divider>
<Divider variant="subtle" />
<Divider variant="dashed">or</Divider>
<Divider variant="dotted" />
<Divider variant="fade">or continue with</Divider>
<Divider align="start">Today</Divider>
<Divider orientation="vertical" />
<Divider inset />
<Divider tone="danger" align="start">Danger zone</Divider>
`,
    statesContent: <DividerStates />,
    props: [
      p("variant", "'solid' | 'subtle' | 'dashed' | 'dotted' | 'fade'", "'solid'", 'Rule style. Solid is the default hairline. Subtle is quieter. Fade dissolves at the edges.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Thickness, type, and outer spacing. Small and medium are 1px. Large is 2px.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Rule and label color. Default uses the border token.'),
      p("align", "'start' | 'center' | 'end'", "'center'", 'Where the label sits. Center is the sign-in rule. Start is a section caption.'),
      p("orientation", "'horizontal' | 'vertical'", "'horizontal'", 'Horizontal is a page or list break. Vertical sits in a toolbar.'),
      p('children', 'ReactNode', 'undefined', 'Optional label. Omit for a plain rule.'),
      p('icon', 'ReactNode', 'undefined', 'Optional mark beside the label, or alone on the rule.'),
      p('inset', 'boolean', 'false', 'Indents a horizontal rule from the start, lining up with list titles.'),
      p('flush', 'boolean', 'false', 'Removes the outer margin so the rule can sit in a list or toolbar.'),
      p('disabled', 'boolean', 'false', 'Dims the rule. The divider is never operable.'),
      p('decorative', 'boolean', 'true when unlabeled', 'Hides the rule from assistive tech. Labeled rules are separators by default.'),
    ],
  },
  stack: {
    title: 'Stack',
    description: 'A row or column of items with even space between them. Use it to group cards, actions, or fields.',
    ...stackGuide,
    Demo: StackDemo,
    wide: true,
    code: `<Stack>
  <Card title="Notes" description="A short line." />
  <Card title="Library" description="Shared files in one place." />
</Stack>
<Stack variant="subtle">
  <Card title="Notes" description="A short line." />
  <Card title="Library" description="Shared files in one place." />
</Stack>
<Stack variant="outline" gap="lg">
  <Card title="Notes" description="A short line." />
  <Card title="Library" description="Shared files in one place." />
</Stack>
<Stack direction="horizontal" gap="sm">
  <Button size="sm">Save</Button>
  <Button size="sm" variant="secondary">Cancel</Button>
</Stack>
<Stack variant="pill" selected>
  <Card title="Notes" description="A short line." />
</Stack>
<Stack loading />
`,
    statesContent: <StackStates />,
    props: [
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'ghost'", 'Chrome. Ghost is layout only. Fill, subtle, outline, and pill paint a surface around the group.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Inner padding when the stack is painted. Ghost has no padding.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Surface tint. Default stays neutral. Tone is for a semantic group, not a second CTA.'),
      p("direction", "'vertical' | 'horizontal'", "'vertical'", 'Vertical is a page or a form. Horizontal is a toolbar.'),
      p("align", "'start' | 'center' | 'end' | 'stretch'", "'stretch'", 'Cross axis. Stretch makes children share the row or column.'),
      p("justify", "'start' | 'center' | 'end' | 'between'", "'start'", 'Main axis. Between pushes items to the edges of a horizontal row.'),
      p("gap", "'sm' | 'md' | 'lg' | 'xl' | '2xl'", "'md'", 'Space between items. Small is 12px. Medium is 16px. Large is 24px. Extra large is 32px. 2X large is 40px.'),
      p('wrap', 'boolean', 'false', 'Lets a horizontal stack break onto the next line.'),
      p('children', 'ReactNode', 'undefined', 'The items in the stack.'),
      p('fullWidth', 'boolean', 'true', 'Fill the row. Pass false so the stack hugs its items.'),
      p('fullHeight', 'boolean', 'false', 'Fill the parent height in a grid or a flex row.'),
      p('selected', 'boolean', 'false', 'Marks a painted stack as chosen in a set.'),
      p('loading', 'boolean', 'false', 'Pulse placeholders for the items. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the stack. Press is blocked.'),
      p('href', 'string', 'undefined', 'Turns the stack into a link.'),
      p('onClick', 'MouseEventHandler', 'undefined', 'Turns the stack into a button. Ignored when href is set.'),
      p('onDark', 'boolean', 'false', 'Chrome for a black surface.'),
      p("preview", "'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'selected'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  usage: {
    title: 'Usage',
    description: 'A how-to block: a short paragraph, three principles, then do and don’t. Use it to explain a feature or a flow.',
    ...usageGuide,
    Demo: UsageDemo,
    wide: true,
    code: `<Usage
  prose="Usage is the how-to block for a feature or a flow. Start with one paragraph that says what to do."
  principles={[
    { title: 'Order', body: 'Body, then principles, then do and don’t. Related links sit outside the block.' },
    { title: 'One card per line', body: 'Each principle and each do or don’t card fills the row so the copy can run.' },
    { title: 'One job', body: 'A usage block explains the thing on the page. Do not mix a form into it.' },
  ]}
  doItems={[
    'Start with one short paragraph that a person can read after the heading.',
    'Put three principles on their own rows, then close with do and don’t.',
  ]}
  dontItems={[
    'Do not pack three principles into one row.',
    'Do not skip Body to jump to do and don’t.',
  ]}
/>
<Usage variant="subtle" />
<Usage variant="outline" layout="split" />
<Usage variant="pill" selected />
<Usage loading />
`,
    statesContent: <UsageStates />,
    props: [
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'ghost'", 'Chrome. Ghost is layout only. Fill, subtle, outline, and pill paint a surface around the group.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Inner padding when the block is painted. Ghost has no padding.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Surface tint. Default stays neutral. Tone is for a semantic group, not a second CTA.'),
      p("layout", "'split' | 'stack'", "'stack'", 'Stack is one card per row at full width. Split puts principles in a row and do and don’t in a pair from 1069px.'),
      p("gap", "'sm' | 'md' | 'lg' | 'xl' | '2xl'", "'lg'", 'Space between parts. Large is 24px, the default rhythm.'),
      p('prose', 'ReactNode', 'undefined', 'The opening paragraph. A string becomes Body.'),
      p("principles", '{ title: string; body: string }[]', 'undefined', 'Three short rules. The index is order, not rank.'),
      p('doItems', 'string[]', 'undefined', 'The do list. Each item is a complete instruction.'),
      p('dontItems', 'string[]', 'undefined', 'The don’t list. Start items with Do not.'),
      p('title', 'string', 'undefined', 'Optional name above Body, such as How to share a file.'),
      p('eyebrow', 'string', 'undefined', 'Optional kicker above the title.'),
      p('children', 'ReactNode', 'undefined', 'Extra content after do and don’t.'),
      p('fullWidth', 'boolean', 'true', 'Fill the row. Pass false so the block hugs its copy.'),
      p('fullHeight', 'boolean', 'false', 'Fill the parent height in a grid or a flex row.'),
      p('selected', 'boolean', 'false', 'Marks a painted usage block as chosen in a set.'),
      p('loading', 'boolean', 'false', 'Pulse placeholders for the parts. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the block. Press is blocked.'),
      p('href', 'string', 'undefined', 'Turns the block into a link.'),
      p('onClick', 'MouseEventHandler', 'undefined', 'Turns the block into a button. Ignored when href is set.'),
      p('onDark', 'boolean', 'false', 'Chrome for a black surface.'),
      p("preview", "'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'selected'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  'token-group': {
    title: 'Token Group',
    description: 'A labeled family of samples with an optional note. Use it for a color set, a spacing scale, or a radius set.',
    ...tokenGroupGuide,
    Demo: TokenGroupDemo,
    wide: true,
    code: `<TokenGroup title="Brand" note="The only interactive accent." columns={4}>
  {samples}
</TokenGroup>
<TokenGroup variant="subtle" title="Brand" note="The only interactive accent." columns={4}>
  {samples}
</TokenGroup>
<TokenGroup variant="outline" title="Brand" columns={4}>
  {samples}
</TokenGroup>
<TokenGroup variant="pill" selected title="Brand" columns={4}>
  {samples}
</TokenGroup>
<TokenGroup loading />
`,
    statesContent: <TokenGroupStates />,
    props: [
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'ghost'", 'Chrome. Ghost is layout only. Fill, subtle, outline, and pill paint a surface around the group.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Inner padding when the group is painted. Ghost has no padding.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Surface tint. Default stays neutral. Tone is for a semantic family, not a second CTA.'),
      p("columns", '1 | 2 | 3 | 4', 'undefined', 'Wraps sibling samples in a responsive grid. Omit when the child already is a grid.'),
      p("gap", "'sm' | 'md' | 'lg' | 'xl' | '2xl'", "'md'", 'Space between the heading and the samples. Medium is 16px.'),
      p('title', 'string', 'undefined', 'Family name. Renders as an h3.'),
      p('note', 'string', 'undefined', 'One supporting sentence under the title.'),
      p('children', 'ReactNode', 'undefined', 'The samples: chips, bars, or radius cards.'),
      p('fullWidth', 'boolean', 'true', 'Fill the row. Pass false so the group hugs its samples.'),
      p('fullHeight', 'boolean', 'false', 'Fill the parent height in a grid or a flex row.'),
      p('selected', 'boolean', 'false', 'Marks a painted group as chosen in a set.'),
      p('loading', 'boolean', 'false', 'Pulse placeholders for the parts. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the group. Press is blocked.'),
      p('href', 'string', 'undefined', 'Turns the group into a link.'),
      p('onClick', 'MouseEventHandler', 'undefined', 'Turns the group into a button. Ignored when href is set.'),
      p('onDark', 'boolean', 'false', 'Chrome for a black surface.'),
      p("preview", "'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'selected'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  'state-card': {
    title: 'State Card',
    description: 'A labeled tile that shows one control state on a quiet surface. Use it to sample a button, a field, or a row.',
    ...stateCardGuide,
    Demo: StateCardDemo,
    wide: true,
    code: `<StateCard label="Default">
  <Button>Button</Button>
</StateCard>
<StateCard variant="fill" label="Fill">
  <Button>Button</Button>
</StateCard>
<StateCard variant="outline" label="Outline">
  <Button>Button</Button>
</StateCard>
<StateCard variant="pill" selected label="Selected">
  <Button>Button</Button>
</StateCard>
<StateCard loading />
`,
    statesContent: <StateCardStates />,
    props: [
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'subtle'", 'Chrome. Subtle is the quiet tile. Fill, outline, ghost, and pill change the surface.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Inner padding when painted, and the minimum height of the sample well. Large is for taller samples.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Surface tint. Default stays neutral. Tone is for a semantic sample, not a second CTA.'),
      p("align", "'center' | 'start' | 'stretch'", "'center'", 'How the sample sits in the well. Stretch wraps fields at 320px.'),
      p("gap", "'sm' | 'md' | 'lg' | 'xl' | '2xl'", "'sm'", 'Space between the sample and the caption. Small is 12px.'),
      p('label', 'string', 'undefined', 'Caption under the sample. The state name, not a sentence.'),
      p('children', 'ReactNode', 'undefined', 'The sample control. One control per tile.'),
      p('inert', 'boolean', 'false', 'Blocks pointer events on the sample. Use it when the control is only a preview.'),
      p('wide', 'boolean', 'false', 'When stretch, fill the tile instead of capping at 320px.'),
      p('fullWidth', 'boolean', 'true', 'Fill the row. Pass false so the tile hugs the sample.'),
      p('fullHeight', 'boolean', 'false', 'Fill the parent height in a grid or a flex row.'),
      p('selected', 'boolean', 'false', 'Marks a painted tile as chosen in a set.'),
      p('loading', 'boolean', 'false', 'Pulse placeholders for the parts. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the tile. Press is blocked.'),
      p('href', 'string', 'undefined', 'Turns the tile into a link.'),
      p('onClick', 'MouseEventHandler', 'undefined', 'Turns the tile into a button. Ignored when href is set.'),
      p('onDark', 'boolean', 'false', 'Chrome for a black surface.'),
      p("preview", "'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'selected'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  'state-grid': {
    title: 'State Grid',
    description: 'A responsive set of state cards. Use three columns for fields, six for compact controls.',
    ...stateGridGuide,
    Demo: StateGridDemo,
    wide: true,
    code: `<StateGrid>
  <StateCard label="Default">{sample}</StateCard>
  <StateCard label="Disabled">{sample}</StateCard>
  <StateCard label="Loading">{sample}</StateCard>
</StateGrid>
<StateGrid variant="subtle" columns={2}>
  <StateCard label="Default">{sample}</StateCard>
  <StateCard label="Hover">{sample}</StateCard>
</StateGrid>
<StateGrid variant="outline" columns={6}>
  {samples}
</StateGrid>
<StateGrid variant="pill" selected>
  {samples}
</StateGrid>
<StateGrid loading />
`,
    statesContent: <StateGridStates />,
    props: [
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'ghost'", 'Chrome around the set. Ghost is layout only. Fill, subtle, outline, and pill paint a surface.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Inner padding when the set is painted. Ghost has no padding.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Surface tint. Default stays neutral. Tone is for a semantic set, not a second CTA.'),
      p("columns", '1 | 2 | 3 | 4 | 6', '3', 'Preferred column count. Six is compact and wraps so each tile stays at least 12rem.'),
      p("align", "'stretch' | 'start'", "'stretch'", 'Stretch is equal height. Start lets each tile hug its sample.'),
      p("widths", "'equal' | 'fit' | 'mixed'", "'equal'", 'Equal shares the row. Fit hugs copy. Mixed keeps the first tile compact.'),
      p("gap", "'sm' | 'md' | 'lg'", "'md'", 'Space between tiles. Small is 12px. Medium is 16px. Large is 24px.'),
      p('children', 'ReactNode', 'undefined', 'The tiles in the set. Prefer State Card.'),
      p('fullWidth', 'boolean', 'true', 'Fill the row. Pass false so the set hugs its tiles.'),
      p('fullHeight', 'boolean', 'false', 'Fill the parent height in a grid or a flex row.'),
      p('selected', 'boolean', 'false', 'Marks a painted set as chosen.'),
      p('loading', 'boolean', 'false', 'Pulse placeholders for the tiles. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the set. Press is blocked.'),
      p('href', 'string', 'undefined', 'Turns the set into a link.'),
      p('onClick', 'MouseEventHandler', 'undefined', 'Turns the set into a button. Ignored when href is set.'),
      p('onDark', 'boolean', 'false', 'Chrome for a black surface.'),
      p("preview", "'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'selected'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  'state-group': {
    title: 'State Group',
    description: 'A caption plus a grid of state cards for one axis, such as appearance, size, or tone.',
    ...stateGroupGuide,
    Demo: StateGroupDemo,
    wide: true,
    code: `<StateGroup title="Appearance" columns={3}>
  <StateCard label="Default">{sample}</StateCard>
  <StateCard label="Disabled">{sample}</StateCard>
  <StateCard label="Loading">{sample}</StateCard>
</StateGroup>
<StateGroup variant="subtle" title="Size" columns={2}>
  {samples}
</StateGroup>
<StateGroup variant="outline" title="Tone" columns={3}>
  {samples}
</StateGroup>
<StateGroup variant="pill" selected title="State">
  {samples}
</StateGroup>
<StateGroup loading />
`,
    statesContent: <StateGroupStates />,
    props: [
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'ghost'", 'Chrome around the group. Ghost is layout only. Fill, subtle, outline, and pill paint a surface.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Inner padding when the group is painted. Ghost has no padding.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Surface tint. Default stays neutral. Tone is for a semantic group, not a second CTA.'),
      p('title', 'string', 'undefined', 'Group caption. Appearance, Size, Tone, or State. Not a heading.'),
      p("columns", '1 | 2 | 3 | 4 | 6', 'undefined', 'Wraps State Cards in a State Grid. Omit when the child is already a State Grid.'),
      p("align", "'stretch' | 'start'", "'stretch'", 'Stretch is equal height. Start lets each tile hug its sample. Used when columns is set.'),
      p("widths", "'equal' | 'fit' | 'mixed'", "'equal'", 'Equal shares the row. Fit hugs copy. Mixed keeps the first tile compact. Used when columns is set.'),
      p("gap", "'sm' | 'md' | 'lg' | 'xl' | '2xl'", "'sm'", 'Space between the caption and the grid. Small is 12px.'),
      p('children', 'ReactNode', 'undefined', 'State Cards, or a State Grid when columns is omitted.'),
      p('fullWidth', 'boolean', 'true', 'Fill the row. Pass false so the group hugs its tiles.'),
      p('fullHeight', 'boolean', 'false', 'Fill the parent height in a grid or a flex row.'),
      p('selected', 'boolean', 'false', 'Marks a painted group as chosen.'),
      p('loading', 'boolean', 'false', 'Pulse placeholders for the parts. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the group. Press is blocked.'),
      p('href', 'string', 'undefined', 'Turns the group into a link.'),
      p('onClick', 'MouseEventHandler', 'undefined', 'Turns the group into a button. Ignored when href is set.'),
      p('onDark', 'boolean', 'false', 'Chrome for a black surface.'),
      p("preview", "'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'selected'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  swatch: {
    title: 'Swatch',
    description: 'A color chip that shows the token fill and its CSS variable name. Use it for a palette sample.',
    ...swatchGuide,
    Demo: SwatchDemo,
    wide: true,
    code: `<Swatch token="brand-primary" />
<Swatch token="success" variant="subtle" />
<Swatch token="danger" variant="pill" />
<Swatch token="text-primary" named={false} />
<Swatch loading />
`,
    statesContent: <SwatchStates />,
    props: [
      p('token', 'string', 'undefined', 'CSS variable name without the leading dashes, such as brand-primary.'),
      p('name', 'string', 'undefined', 'Caption under the fill. Defaults to --token.'),
      p('named', 'boolean', 'true', 'Shows the token name. Pass false for a fill-only chip.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'outline'", 'Chrome. Outline is the default chip. Ghost is layout only. Fill, subtle, and pill paint a surface.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Height of the fill. Small is 40px. Medium is 64px. Large is 96px.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Chrome tint around the sample. The fill always comes from the token.'),
      p('fullWidth', 'boolean', 'true', 'Fill the row. Pass false so the chip hugs a set width.'),
      p('fullHeight', 'boolean', 'false', 'Fill the parent height in a grid or a flex row.'),
      p('selected', 'boolean', 'false', 'Marks a painted chip as chosen in a set.'),
      p('loading', 'boolean', 'false', 'Pulse placeholders for the parts. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the chip. Press is blocked.'),
      p('href', 'string', 'undefined', 'Turns the chip into a link.'),
      p('onClick', 'MouseEventHandler', 'undefined', 'Turns the chip into a button. Ignored when href is set.'),
      p('onDark', 'boolean', 'false', 'Chrome for a black surface.'),
      p("preview", "'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'selected'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  'swatch-grid': {
    title: 'Swatch Grid',
    description: 'A four column grid of color swatches for a token family. Use it inside Token Group.',
    ...swatchGridGuide,
    Demo: SwatchGridDemo,
    wide: true,
    code: `<SwatchGrid tokens={['brand-primary', 'success', 'warning', 'danger']} />
<SwatchGrid variant="subtle" tokens={['brand-primary', 'success']} columns={2} />
<SwatchGrid variant="outline" tokens={['brand-primary', 'success', 'warning', 'danger', 'text-primary', 'bg-secondary']} columns={6} />
<SwatchGrid variant="pill" selected tokens={['brand-primary', 'success', 'warning', 'danger']} />
<SwatchGrid loading />
`,
    statesContent: <SwatchGridStates />,
    props: [
      p('tokens', 'string[]', 'undefined', 'Token names without the leading dashes. Each name becomes a Swatch.'),
      p('named', 'boolean', 'true', 'Shows the token name on each chip. Pass false for fill-only chips.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'ghost'", 'Chrome around the set. Ghost is layout only. Fill, subtle, outline, and pill paint a surface.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Inner padding when the set is painted, and the height of each fill. Ghost has no padding.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Surface tint around the set. The fill always comes from each token.'),
      p("columns", '1 | 2 | 3 | 4 | 6', '4', 'Preferred column count. Four is the default. Six is compact and wraps so each chip stays at least 12rem.'),
      p("align", "'stretch' | 'start'", "'stretch'", 'Stretch is equal height. Start lets each chip hug its fill.'),
      p("widths", "'equal' | 'fit' | 'mixed'", "'equal'", 'Equal shares the row. Fit hugs copy. Mixed keeps the first chip compact.'),
      p("gap", "'sm' | 'md' | 'lg'", "'md'", 'Space between chips. Small is 12px. Medium is 16px. Large is 24px.'),
      p('children', 'ReactNode', 'undefined', 'Extra Swatch nodes after tokens, or instead of tokens.'),
      p('fullWidth', 'boolean', 'true', 'Fill the row. Pass false so the set hugs its chips.'),
      p('fullHeight', 'boolean', 'false', 'Fill the parent height in a grid or a flex row.'),
      p('selected', 'boolean', 'false', 'Marks a painted set as chosen.'),
      p('loading', 'boolean', 'false', 'Pulse placeholders for the chips. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the set. Press is blocked.'),
      p('href', 'string', 'undefined', 'Turns the set into a link.'),
      p('onClick', 'MouseEventHandler', 'undefined', 'Turns the set into a button. Ignored when href is set.'),
      p('onDark', 'boolean', 'false', 'Chrome for a black surface.'),
      p("preview", "'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'selected'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  'contrast-card': {
    title: 'Contrast Card',
    description: 'A reading pair of foreground and background tokens, shown at body size.',
    ...contrastCardGuide,
    Demo: ContrastCardDemo,
    wide: true,
    code: `<ContrastCard fg="text-primary" bg="bg-primary" label="Headline on page" />
<ContrastCard fg="text-on-brand" bg="brand-primary" label="Label on primary" variant="subtle" />
<ContrastCard fg="danger" bg="danger-subtle" label="Error on banner" variant="pill" />
<ContrastCard fg="text-primary" bg="bg-primary" named={false} />
<ContrastCard loading />
`,
    statesContent: <ContrastCardStates />,
    props: [
      p('fg', 'string', 'undefined', 'Foreground token without the leading dashes, such as text-primary.'),
      p('bg', 'string', 'undefined', 'Background token without the leading dashes, such as bg-primary.'),
      p('label', 'string', 'undefined', 'Use case under the sample, such as Headline on page. Not a heading.'),
      p('sample', 'string', "'The quick brown fox'", 'Reading sample at body size.'),
      p('named', 'boolean', 'true', 'Shows the use-case label. Pass false for the sample only.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'ghost'", 'Chrome around the pair. Ghost is layout only. Fill, subtle, outline, and pill paint a surface.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Inner padding when the card is painted, and the height of the sample well. Ghost has no outer padding.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Chrome tint around the pair. The pair always comes from the tokens.'),
      p('fullWidth', 'boolean', 'true', 'Fill the row. Pass false so the card hugs a set width.'),
      p('fullHeight', 'boolean', 'false', 'Fill the parent height in a grid or a flex row.'),
      p('selected', 'boolean', 'false', 'Marks a painted card as chosen in a set.'),
      p('loading', 'boolean', 'false', 'Pulse placeholders for the parts. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the card. Press is blocked.'),
      p('href', 'string', 'undefined', 'Turns the card into a link.'),
      p('onClick', 'MouseEventHandler', 'undefined', 'Turns the card into a button. Ignored when href is set.'),
      p('onDark', 'boolean', 'false', 'Chrome for a black surface.'),
      p("preview", "'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'selected'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  'radius-card': {
    title: 'Radius Card',
    description: 'A sample corner next to its name, pixel value, and intended use.',
    ...radiusCardGuide,
    Demo: RadiusCardDemo,
    wide: true,
    code: `<RadiusCard value={18} label="Panel" use="Large cards, images, and dialogs." />
<RadiusCard value={8} label="Control" use="Text fields, compact menus, and 44px inputs." />
<RadiusCard value={980} label="Pill" use="Buttons, switches, and chip-like controls." variant="pill" />
<RadiusCard value={12} named={false} />
<RadiusCard loading />
`,
    statesContent: <RadiusCardStates />,
    props: [
      p('value', 'number', 'undefined', 'Corner radius in pixels. The scale is 8, 12, 18, and 980.'),
      p('label', 'string', 'undefined', 'Job name: Control, Card, Panel, or Pill. Not Small or Large.'),
      p('use', 'string', 'undefined', 'Where this radius belongs.'),
      p('named', 'boolean', 'true', 'Shows the name, pixel value, and use. Pass false for the sample only.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'subtle'", 'Chrome around the sample. Subtle is the default surface. Ghost is layout only. Fill, outline, and pill paint a surface.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Inner padding when the card is painted, and the size of the sample block. Ghost has no padding.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Chrome tint around the sample. The corner always comes from value.'),
      p('fullWidth', 'boolean', 'true', 'Fill the row. Pass false so the card hugs the sample and copy.'),
      p('fullHeight', 'boolean', 'false', 'Fill the parent height in a grid or a flex row.'),
      p('selected', 'boolean', 'false', 'Marks a painted card as chosen in a set.'),
      p('loading', 'boolean', 'false', 'Pulse placeholders for the parts. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the card. Press is blocked.'),
      p('href', 'string', 'undefined', 'Turns the card into a link.'),
      p('onClick', 'MouseEventHandler', 'undefined', 'Turns the card into a button. Ignored when href is set.'),
      p('onDark', 'boolean', 'false', 'Chrome for a black surface.'),
      p("preview", "'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'selected'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  'scale-row': {
    title: 'Scale Row',
    description: 'A bar for a content width relative to a max, or a spacing step at its true pixel size.',
    ...scaleRowGuide,
    Demo: ScaleRowDemo,
    wide: true,
    code: `<ScaleRow value={692} bar={692} caption="Single column copy" />
<ScaleRow value={1024} bar={1024} caption="Marketing sections" />
<ScaleRow value={32} width={32} caption="Card padding" />
<ScaleRow value={692} bar={692} named={false} />
<ScaleRow loading />
`,
    statesContent: <ScaleRowStates />,
    props: [
      p('value', 'number | string', 'undefined', 'Leading label, usually the pixel width. Shown in mono.'),
      p('bar', 'number', 'undefined', 'Length used to compute the percent. Ignored when width is set.'),
      p('max', 'number', '1024', 'Denominator for the percent. Use 1024 for layout widths.'),
      p('width', 'number', 'undefined', 'True pixel width of the bar. Use this for spacing steps.'),
      p('caption', 'string', 'undefined', 'Use case under the bar.'),
      p('named', 'boolean', 'true', 'Shows the value and caption. Pass false for the bar only.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'ghost'", 'Chrome around the row. Ghost is layout only. Fill, subtle, outline, and pill paint a surface.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Inner padding when the row is painted, and the height of the bar. Ghost has no padding.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Chrome tint around the row. The bar always uses brand-primary.'),
      p('fullWidth', 'boolean', 'true', 'Fill the row. Pass false so the sample hugs a set width.'),
      p('fullHeight', 'boolean', 'false', 'Fill the parent height in a grid or a flex row.'),
      p('selected', 'boolean', 'false', 'Marks a painted row as chosen in a set.'),
      p('loading', 'boolean', 'false', 'Pulse placeholders for the parts. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the row. Press is blocked.'),
      p('href', 'string', 'undefined', 'Turns the row into a link.'),
      p('onClick', 'MouseEventHandler', 'undefined', 'Turns the row into a button. Ignored when href is set.'),
      p('onDark', 'boolean', 'false', 'Chrome for a black surface.'),
      p("preview", "'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'selected'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  'related': {
    title: 'Related',
    description: 'A three column grid of sibling links. Use it at the end of a page for nearby components.',
    ...relatedGuide,
    Demo: RelatedDemo,
    wide: true,
    code: `<Related
  items={[
    { href: '/components/card', title: 'Card', description: 'A quiet surface for a title and supporting copy.' },
    { href: '/components/stack', title: 'Stack', description: 'A row or column of items with even space.' },
    { href: '/components/table', title: 'Table', description: 'A structured list of records with headers and sort.' },
  ]}
/>
<Related variant="subtle" columns={2} items={[{ href: '/components/card', title: 'Card', description: 'A quiet surface for a title and supporting copy.' }]} />
<Related loading />
`,
    statesContent: <RelatedStates />,
    props: [
      p('items', 'RelatedItem[]', 'undefined', 'Sibling links. Each item is href, title, and description, and becomes a Related Card.'),
      p('children', 'ReactNode', 'undefined', 'Extra Related Card nodes after items, or instead of items.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'ghost'", 'Chrome around the set. Ghost is layout only. Fill, subtle, outline, and pill paint a surface.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Inner padding when the set is painted. Ghost has no padding.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Surface tint around the set.'),
      p("columns", '1 | 2 | 3 | 4 | 6', '3', 'Preferred column count. Three is the default. Six is compact and wraps so each card stays at least 12rem.'),
      p("align", "'stretch' | 'start'", "'stretch'", 'Stretch is equal height. Start lets each card hug its copy.'),
      p("widths", "'equal' | 'fit' | 'mixed'", "'equal'", 'Equal shares the row. Fit hugs copy. Mixed keeps the first card compact.'),
      p("gap", "'sm' | 'md' | 'lg'", "'sm'", 'Space between cards. Small is 12px. Medium is 16px. Large is 24px.'),
      p('fullWidth', 'boolean', 'true', 'Fill the row. Pass false so the set hugs its cards.'),
      p('fullHeight', 'boolean', 'false', 'Fill the parent height in a grid or a flex row.'),
      p('selected', 'boolean', 'false', 'Marks a painted set as chosen.'),
      p('loading', 'boolean', 'false', 'Pulse placeholders for the cards. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the set. Press is blocked.'),
      p('href', 'string', 'undefined', 'Turns the set into a link. Inner cards are not links when the set is pressable.'),
      p('onClick', 'MouseEventHandler', 'undefined', 'Turns the set into a button. Ignored when href is set.'),
      p('onDark', 'boolean', 'false', 'Chrome for a black surface.'),
      p("preview", "'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'selected'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  'rule-card': {
    title: 'Rule Card',
    description: 'A do or don’t list with a success or danger tone. Use it inside Usage, or on its own.',
    ...ruleCardGuide,
    Demo: RuleCardDemo,
    wide: true,
    code: `<RuleCard items={['Use brand primary for the primary action.', 'Use danger only for destructive actions.']} />
<RuleCard tone="danger" items={['Do not mix do items into a don’t card.']} />
<RuleCard variant="outline" items={['Keep each line a complete instruction.']} />
<RuleCard loading />
`,
    statesContent: <RuleCardStates />,
    props: [
      p('title', 'string', 'Do, Don’t, or Rule', 'Caption above the list. Defaults from tone: Do, Don’t, Rule, Brand, or Warning.'),
      p('items', 'string[]', 'undefined', 'Rules in the list. Each item is one complete instruction.'),
      p('named', 'boolean', 'true', 'Shows the title. Pass false for the list only.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'subtle'", 'Chrome around the list. Subtle is the default surface. Ghost is layout only. Fill, outline, and pill paint chrome.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Inner padding when the card is painted. Ghost has no padding.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'success'", 'Title, dots, and surface tint. Success is Do. Danger is Don’t.'),
      p('fullWidth', 'boolean', 'true', 'Fill the row. Pass false so the card hugs a set width.'),
      p('fullHeight', 'boolean', 'false', 'Fill the parent height in a grid or a flex row.'),
      p('selected', 'boolean', 'false', 'Marks a painted card as chosen in a set.'),
      p('loading', 'boolean', 'false', 'Pulse placeholders for the parts. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the card. Press is blocked.'),
      p('href', 'string', 'undefined', 'Turns the card into a link.'),
      p('onClick', 'MouseEventHandler', 'undefined', 'Turns the card into a button. Ignored when href is set.'),
      p('onDark', 'boolean', 'false', 'Chrome for a black surface.'),
      p("preview", "'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'selected'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  'inline-code': {
    title: 'Inline Code',
    description: 'A highlighted token, prop, or import path inside a sentence.',
    ...inlineCodeGuide,
    Demo: InlineCodeDemo,
    wide: true,
    code: `<Body>
  Pass <InlineCode>as</InlineCode> when the visual size and the document outline disagree.
</Body>
<InlineCode code="--brand-primary" />
<InlineCode variant="subtle" code="@/icons" />
<InlineCode loading />
`,
    statesContent: <InlineCodeStates />,
    props: [
      p('code', 'string', 'undefined', 'Source to highlight. Use this or a string child.'),
      p('children', 'ReactNode', 'undefined', 'String children are highlighted. Other nodes render as written.'),
      p("variant", "'fill' | 'subtle' | 'outline' | 'ghost' | 'pill'", "'ghost'", 'Chrome around the sample. Ghost is layout only and sits in Body. Fill, subtle, outline, and pill paint a chip.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Type size. Medium is 13px, the same as Code Panel.'),
      p("tone", "'default' | 'brand' | 'success' | 'warning' | 'danger'", "'default'", 'Chrome tint. Syntax color stays brand, teal, and tertiary unless the fill is a solid tone.'),
      p('fullWidth', 'boolean', 'false', 'Hug the sample. Pass true so the chip fills the row.'),
      p('fullHeight', 'boolean', 'false', 'Fill the parent height in a flex row.'),
      p('selected', 'boolean', 'false', 'Marks a painted sample as chosen in a set.'),
      p('loading', 'boolean', 'false', 'Pulse a placeholder. Sets aria-busy.'),
      p('disabled', 'boolean', 'false', 'Dims the sample. Press is blocked.'),
      p('href', 'string', 'undefined', 'Turns the sample into a link.'),
      p('onClick', 'MouseEventHandler', 'undefined', 'Turns the sample into a button. Ignored when href is set.'),
      p('onDark', 'boolean', 'false', 'Chrome and highlight colors for a black surface.'),
      p("preview", "'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'selected'", 'undefined', 'Forced visual for state tiles.'),
    ],
  },
  'brand-logo': {
    title: 'Brand Logo',
    description: 'The company mark, the product wordmark, and the lockup that pairs them.',
    ...brandLogoGuide,
    Demo: BrandLogoDemo,
    code: `<BrandLogo variant="lockup" />\n<BrandLogo variant="text" />\n<BrandLogo />\n<BrandLogo variant="icon" />\n`,
    states: [
      { label: 'Lockup', node: <BrandLogo variant="lockup" size={20} /> },
      { label: 'Text', node: <BrandLogo variant="text" size={20} /> },
      { label: 'Mark', node: <BrandLogo size={28} /> },
      { label: 'Icon', node: <BrandLogo variant="icon" size={28} /> },
    ],
    props: [
      p('size', 'number', '20', 'Mark width and height.'),
      p("variant", "'mark' | 'icon' | 'text' | 'lockup'", "'mark'", 'Mark only, icon, wordmark, or company + product lockup.'),
      p('primary', 'string', 'company or product name', 'Primary label for text and lockup.'),
      p('secondary', 'string', 'product name', 'Secondary label on the lockup variant.'),
    ],
  },
  'theme-toggle': {
    title: 'Theme Toggle',
    description: 'A labeled switch that sets light or dark for the whole page. Compact and switch only layouts are included.',
    ...themeToggleGuide,
    wide: true,
    Demo: () => (
      <div className="w-full max-w-[260px]">
        <ThemeToggle />
      </div>
    ),
    code: `<ThemeToggle />\n<ThemeToggle variant="compact" />\n<ThemeToggle variant="labels" />\n<ThemeToggle variant="icons" />\n<ThemeToggle variant="switch" />\n`,
    states: [
      {
        label: 'Default',
        node: (
          <div className="w-full max-w-[220px]">
            <ThemeToggle />
          </div>
        ),
      },
      { label: 'Compact', node: <ThemeToggle variant="compact" /> },
      { label: 'Labels', node: <ThemeToggle variant="labels" /> },
      { label: 'Icons', node: <ThemeToggle variant="icons" /> },
      { label: 'Switch', node: <ThemeToggle variant="switch" /> },
      { label: 'Disabled', node: <ThemeToggle variant="compact" disabled /> },
    ],
    props: [
      p("variant", "'default' | 'compact' | 'labels' | 'icons' | 'switch'", "'default'", 'Sidebar, toolbar, text-only, icon-only, or switch only.'),
      p('compact', 'boolean', 'false', 'Alias for variant="compact".'),
      p('disabled', 'boolean', 'false', 'Prevents changing the theme.'),
    ],
  },
  'theme-icon-toggle': {
    title: 'Theme Icon Toggle',
    description: 'A compact control that sets light or dark with sun and moon icons. Variants show one icon or both at once.',
    ...themeIconToggleGuide,
    Demo: () => (
      <div className="flex flex-wrap items-center justify-center gap-4">
        <ThemeIconToggle />
        <ThemeIconToggle variant="pair" />
      </div>
    ),
    code: `<ThemeIconToggle />\n<ThemeIconToggle variant="subtle" />\n<ThemeIconToggle variant="outline" />\n<ThemeIconToggle variant="pair" />\n<ThemeIconToggle variant="segmented" />\n<ThemeIconToggle variant="split" />\n`,
    states: [
      { label: 'Ghost', node: <ThemeIconToggle variant="ghost" /> },
      { label: 'Subtle', node: <ThemeIconToggle variant="subtle" /> },
      { label: 'Outline', node: <ThemeIconToggle variant="outline" /> },
      { label: 'Pair', node: <ThemeIconToggle variant="pair" /> },
      { label: 'Segmented', node: <ThemeIconToggle variant="segmented" /> },
      { label: 'Split', node: <ThemeIconToggle variant="split" /> },
      { label: 'Small pair', node: <ThemeIconToggle variant="pair" size="sm" /> },
      { label: 'Disabled', node: <ThemeIconToggle variant="pair" disabled /> },
    ],
    props: [
      p("variant", "'ghost' | 'subtle' | 'outline' | 'pair' | 'segmented' | 'split'", "'ghost'", 'Single swapping icon, or both sun and moon at once.'),
      p("size", "'sm' | 'md'", "'md'", 'Hit target size.'),
      p('disabled', 'boolean', 'false', 'Prevents changing the theme.'),
    ],
  },
  'auth-nav': {
    title: 'Auth Nav',
    description:
      'The bar on sign-in and related flows. Logo, theme toggle, and a trailing Anchor.',
    ...authNavGuide,
    Demo: AuthNavDemo,
    wide: true,
    code: `<AuthNav navLinkTo="/create-account" navLinkLabel="Create one" />
<AuthNav navLinkTo="/signin" navLinkLabel="Sign in" />
<AuthNav />
`,
    statesContent: <AuthNavStates />,
    props: [
      p('navLinkTo', 'string', 'undefined', 'Trailing Anchor href. Omit with navLinkLabel when the flow has no peer page.'),
      p('navLinkLabel', 'string', 'undefined', 'Trailing Anchor label. Create one on sign-in. Sign in on create account.'),
      p('brandHref', 'string', "'/'", 'Logo destination. The mark is Brand Logo icon at 18px.'),
      p('contained', 'boolean', 'false', 'Relative positioning for a preview. Pages leave this off so the bar is fixed.'),
    ],
  },
  'social-login': {
    title: 'Social Login Button',
    description: 'Continue with Roboticela, Passkey, Google, Apple, GitHub, and more.',
    Demo: SocialDemo,
    code: `<SocialLoginButton provider="roboticela" />
<SocialLoginButton provider="passkey">Sign in with Passkey</SocialLoginButton>
<SocialLoginButton provider="google" />
<SocialLoginButton provider="apple" />
<SocialLoginButton provider="microsoft" />
<SocialLoginButton provider="github" />
<SocialLoginButton provider="facebook" />
<SocialLoginButton provider="x" />
<SocialLoginButton provider="linkedin" />
<SocialLoginButton provider="discord" />
<SocialLoginButton provider="slack" />
`,
    statesContent: <SocialStates />,
    props: [
      {
        name: 'provider',
        type: "'roboticela' | 'passkey' | 'google' | 'apple' | 'microsoft' | 'github' | 'facebook' | 'x' | 'linkedin' | 'discord' | 'slack'",
        required: 'Yes',
        defaultValue: '—',
        description: 'Which identity provider to show.',
      },
      p('loading', 'boolean', 'false', 'Busy spinner and Continuing… label. Passkey uses Waiting for passkey…'),
      p('lastUsed', 'boolean', 'false', 'Marks the last-used provider.'),
      p('children', 'ReactNode', 'Continue with {Provider}', 'Optional label. Sign-in uses Sign in with Passkey.'),
    ],
  },
  'verification-method': {
    title: 'Verification Method',
    description: 'A selectable 2FA method card.',
    Demo: MethodDemo,
    code: `<RadioGroup label="Verification method" className="gap-3">
  <VerificationMethodCard
    selected
    icon={...}
    title="Email"
    subtitle="Send a code to alex@roboticela.com."
  />
  <VerificationMethodCard
    icon={...}
    title="Passkey"
    subtitle="Use Face ID, Touch ID, or your device screen lock."
  />
</RadioGroup>\n`,
    statesContent: <MethodStates />,
    props: [
      p('selected', 'boolean', 'false', 'Selected checkmark appearance.'),
      p('disabled', 'boolean', 'false', 'Dims the card and blocks selection.'),
      p('preview', "'hover' | 'focus' | 'active'", 'undefined', 'Forced interaction state for visual QA.'),
      p('icon', 'ReactNode', '—', 'Method icon shown in the leading badge.'),
      p('title', 'string', '—', 'Method name.'),
      p('subtitle', 'string', '—', 'Short description.'),
      p('hint', 'string', 'undefined', 'Native title for disabled-state tooltips.'),
      p('onClick', '() => void', 'undefined', 'Called when the card is pressed.'),
    ],
  },
  'qr-code': {
    title: 'QR Code',
    description: 'A scannable QR for URLs, TOTP setup, Wi‑Fi, and more. Brand logo centered by default.',
    ...qrGuide,
    Demo: QrDemo,
    wide: true,
    code: `import { QrCode } from '@/components/QrCode'

<QrCode content={{ kind: 'totp', secret, accountName: email }} alt="Authenticator QR code" variant="branded" />
<QrCode content={{ kind: 'url', href: 'https://roboticela.com' }} alt="Visit Roboticela" />
<QrCode content={{ kind: 'wifi', ssid: 'Guest', password: 'welcome' }} />
<QrCode value={encodedString} logo={false} variant="embedded" />
<QrCode content={{ kind: 'totp', secret }} loading />
<QrCode content={{ kind: 'totp', secret }} error />
<QrCode content={{ kind: 'url', href }} expired expiredMessage="Link expired" />
`,
    statesContent: <QrStates />,
    props: [
      p('value', 'string', 'undefined', 'Pre-encoded string. Use when you already have the final payload.'),
      p('content', 'QrContent', 'undefined', 'Structured content: text, url, totp, email, phone, sms, wifi, or geo.'),
      p('alt', 'string', "'QR code'", 'Image alt text.'),
      p("size", "'sm' | 'md' | 'lg'", "'md'", 'Output size. Medium is 180px for auth setup.'),
      p("variant", "'outline' | 'subtle' | 'ghost' | 'embedded' | 'branded'", "'outline'", 'Frame around the white QR pad. Branded uses a primary-tinted frame.'),
      p("logo", "false | 'brand' | string | ReactNode", "'brand'", 'Center mark. false hides it. string is a custom image URL.'),
      p('loading', 'boolean', 'false', 'Show a loading placeholder.'),
      p('error', 'boolean', 'false', 'Show the error state instead of the image.'),
      p('expired', 'boolean', 'false', 'Dim the code and show an expired overlay.'),
      p('disabled', 'boolean', 'false', 'Reduce opacity for inactive codes.'),
      p('errorMessage', 'string', "'Could not load QR code'", 'Copy shown in the error state.'),
      p('expiredMessage', 'string', "'Expired'", 'Copy shown in the expired overlay.'),
      p('className', 'string', 'undefined', 'Extra classes on the outer wrapper.'),
    ],
  },
  'totp-manual-key': {
    title: 'TOTP Manual Key',
    description: 'A copyable authenticator secret.',
    Demo: () => <TotpManualKey secret="JBSWY3DPEHPK3PXP" />,
    code: `<TotpManualKey secret="JBSWY3DPEHPK3PXP" />\n`,
    props: [
      p('secret', 'string', '—', 'Base32 secret.'),
      p('tone', "'light' | 'dark'", "'light'", 'Surface treatment.'),
    ],
  },
  'dashboard-shell': {
    title: 'Dashboard Shell',
    description: 'Full-height sidebar with the brand, a top bar, and the main canvas.',
    Demo: ShellDemo,
    wide: true,
    code: `<DashboardShell title="Overview" sections={sections} activeId="overview" sidebarOpen={open} onSidebarOpenChange={setOpen} brandHref="/">{children}</DashboardShell>\n`,
    props: [
      p('sections', 'SidebarSection[]', '—', 'Sidebar groups.'),
      p('sidebarOpen', 'boolean', '—', 'Mobile drawer open state.'),
      p('sidebarCollapsed', 'boolean', 'undefined', 'Controlled sidebar rail.'),
      p('collapsible', 'boolean', 'true', 'Shows the control that collapses the sidebar.'),
      p('brandHref', 'string', 'undefined', 'Brand link in the sidebar header.'),
      p('children', 'ReactNode', '—', 'Main canvas.'),
    ],
  },
}

export function KitComponentDocs({ slug }: { slug: string }) {
  const def = DOCS[slug]
  if (!def) return null
  const Demo = def.Demo
  return (
    <KitDocArticle
      slug={slug}
      title={def.title}
      description={def.description}
      demo={<Demo />}
      code={def.code}
      states={def.states}
      statesContent={def.statesContent}
      props={def.props}
      wide={def.wide}
      stateColumns={def.stateColumns}
      usage={def.usage}
      accessibility={def.accessibility}
    />
  )
}

export function KitComponentPreview({ slug }: { slug: string }) {
  const def = DOCS[slug]
  if (!def) return null
  const Demo = def.Demo
  return (
    <KitPreviewBody
      demo={<Demo />}
      states={def.states}
      statesContent={def.statesContent}
      wide={def.wide}
    />
  )
}

export function hasKitDoc(slug: string) {
  return slug in DOCS
}
