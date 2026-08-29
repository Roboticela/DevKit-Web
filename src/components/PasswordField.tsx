'use client'

import { useState, type InputHTMLAttributes, type ReactNode } from 'react'
import { DkPadlockSecureClosed } from '@/icons'
import { cn } from '@/lib/cn'
import {
  PasswordReveal,
  type PasswordRevealVariant,
} from './PasswordReveal'
import {
  TextField,
  type TextFieldPreview,
  type TextFieldSize,
  type TextFieldVariant,
} from './TextField'

export const PASSWORD_FIELD_VARIANTS: TextFieldVariant[] = [
  'outline',
  'subtle',
  'ghost',
  'underline',
  'pill',
]
export const PASSWORD_FIELD_SIZES: TextFieldSize[] = ['sm', 'md', 'lg']

const trailPad: Record<PasswordRevealVariant, Record<TextFieldSize, string>> = {
  ghost: { sm: '', md: '', lg: '' },
  subtle: { sm: '', md: '', lg: '' },
  outline: { sm: '', md: '', lg: '' },
  text: { sm: '!pr-14', md: '!pr-[4.25rem]', lg: '!pr-[4.75rem]' },
  pill: { sm: '!pr-[4.75rem]', md: '!pr-[5.5rem]', lg: '!pr-24' },
}

const iconSize: Record<TextFieldSize, number> = {
  sm: 16,
  md: 18,
  lg: 20,
}

type PasswordFieldProps = {
  icon?: ReactNode
  invalid?: boolean
  valid?: boolean
  variant?: TextFieldVariant
  size?: TextFieldSize
  preview?: TextFieldPreview
  reveal?: PasswordRevealVariant
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>

export function PasswordField({
  icon,
  invalid,
  valid,
  variant = 'outline',
  size = 'md',
  preview,
  reveal = 'text',
  visible: visibleProp,
  onVisibleChange,
  className,
  disabled,
  placeholder = 'Password',
  autoComplete = 'current-password',
  autoCapitalize = 'none',
  autoCorrect = 'off',
  ...rest
}: PasswordFieldProps) {
  const [inner, setInner] = useState(false)
  const visible = visibleProp ?? inner

  function toggle() {
    const next = !visible
    if (visibleProp === undefined) setInner(next)
    onVisibleChange?.(next)
  }

  return (
    <TextField
      variant={variant}
      size={size}
      preview={preview}
      invalid={invalid}
      valid={valid}
      disabled={disabled}
      type={visible ? 'text' : 'password'}
      placeholder={placeholder}
      autoComplete={autoComplete}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      spellCheck={false}
      icon={
        icon ?? (
          <DkPadlockSecureClosed
            size={iconSize[size]}
            strokeWidth={1.6}
            absoluteStrokeWidth
          />
        )
      }
      trailing={
        <PasswordReveal
          visible={visible}
          onToggle={toggle}
          variant={reveal}
          size={size}
          disabled={disabled}
        />
      }
      className={cn(trailPad[reveal][size], className)}
      {...rest}
    />
  )
}
