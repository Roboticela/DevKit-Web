'use client'

import { useEffect, useState } from 'react'
import {
  DkAtSign,
  DkEnvelopeMessageMail,
  DkPersonUserProfile,
  DkPersonUserProfileAdd,
  DkVenusGenderPlanetAndMarsGenderPlanet,
} from '@/icons'
import type { OnboardingPreviewState } from '@/lib/pages-catalog'
import { AvatarPicker } from './AvatarPicker'
import { AuthBrand, AuthFormCollapse, AuthLayout } from './AuthLayout'
import { Badge } from './Badge'
import { Button } from './Button'
import { CountrySelect } from './CountrySelect'
import { DatePicker } from './DatePicker'
import { Select } from './Dropdown'
import { FormField } from './FieldLabel'
import { LoadingScreen } from './LoadingScreen'
import { PhoneInput } from './PhoneInput'
import { TextField } from './TextField'
import { ErrorText } from './TextLink'

type OnboardingProvider = 'google' | 'apple' | 'microsoft' | 'passkey' | 'email'
type GenderValue = '' | 'female' | 'male' | 'non_binary' | 'prefer_not_to_say'

const GENDER_OPTIONS: { value: GenderValue; label: string }[] = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'non_binary', label: 'Non-binary' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
]

type ProviderPreset = {
  provider: OnboardingProvider
  providerLabel: string
  name: string
  email: string
  avatarSrc: string | null
  needsName: boolean
}

function resolveProviderState(state: OnboardingPreviewState): OnboardingProvider {
  if (
    state === 'loading' ||
    state === 'error' ||
    state === 'username-taken' ||
    state === 'optional-expanded'
  ) {
    return 'google'
  }
  if (state === 'default') return 'google'
  return state
}

function providerPreset(provider: OnboardingProvider): ProviderPreset {
  switch (provider) {
    case 'apple':
      return {
        provider,
        providerLabel: 'Apple',
        name: 'Alex Rivera',
        email: 'alex@privaterelay.appleid.com',
        avatarSrc: null,
        needsName: false,
      }
    case 'microsoft':
      return {
        provider,
        providerLabel: 'Microsoft',
        name: 'Alex Rivera',
        email: 'alex@outlook.com',
        avatarSrc: null,
        needsName: false,
      }
    case 'passkey':
      return {
        provider,
        providerLabel: 'Passkey',
        name: '',
        email: 'alex@roboticela.com',
        avatarSrc: null,
        needsName: true,
      }
    case 'email':
      return {
        provider,
        providerLabel: 'Email',
        name: '',
        email: 'alex@roboticela.com',
        avatarSrc: null,
        needsName: true,
      }
    case 'google':
    default:
      return {
        provider: 'google',
        providerLabel: 'Google',
        name: 'Alex Rivera',
        email: 'alex@gmail.com',
        avatarSrc: '/favicon.svg',
        needsName: false,
      }
  }
}

function pageSubhead(preset: ProviderPreset) {
  if (preset.needsName) {
    return 'Add your name and choose a username to finish setting up your account.'
  }
  return `We pulled in a few details from ${preset.providerLabel}. Add what's still missing.`
}

export function OnboardingPage({ state = 'default' }: { state?: OnboardingPreviewState }) {
  const loading = state === 'loading'
  const invalid = state === 'error' || state === 'username-taken'
  const usernameTaken = state === 'username-taken'
  const locked = loading || invalid
  const provider = resolveProviderState(state)
  const preset = providerPreset(provider)
  const [optionalOpen, setOptionalOpen] = useState(state === 'optional-expanded')
  const [name, setName] = useState(preset.name)
  const [email] = useState(preset.email)
  const [username, setUsername] = useState(usernameTaken ? 'alex' : '')
  const [birthday, setBirthday] = useState<string | null>(null)
  const [gender, setGender] = useState<GenderValue>('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState<string | null>(null)
  const [avatarSrc, setAvatarSrc] = useState<string | null>(preset.avatarSrc)
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    setOptionalOpen(state === 'optional-expanded')
    const next = providerPreset(resolveProviderState(state))
    setName(next.name)
    setUsername(state === 'username-taken' ? 'alex' : '')
    setAvatarSrc(next.avatarSrc)
  }, [state])

  if (loading) {
    return <LoadingScreen status="Saving your profile…" />
  }

  const showName = preset.needsName || Boolean(preset.name)
  const canContinue = Boolean(
    (!preset.needsName || name.trim()) && username.trim() && !usernameTaken,
  )

  return (
    <AuthLayout>
      <AuthBrand
        title="Finish setting up your account"
        subhead={pageSubhead(preset)}
        narrowSubhead
        icon={<DkPersonUserProfileAdd size={44} strokeWidth={1.5} absoluteStrokeWidth />}
      />

      <div className="mt-2 flex justify-center">
        <Badge variant="outline" shape="rounded" tone="neutral">
          From {preset.providerLabel}
        </Badge>
      </div>

      <form
        className="mt-8 flex flex-col"
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <div className="mb-6 flex justify-center">
          <AvatarPicker
            name={name || email}
            src={avatarSrc}
            disabled={locked}
            onFile={() => undefined}
          />
        </div>

        <div className="flex flex-col gap-4">
          {showName ? (
            <FormField htmlFor="onboarding-name" label="Name" required={preset.needsName}>
              <TextField
                id="onboarding-name"
                icon={<DkPersonUserProfile size={18} strokeWidth={1.6} absoluteStrokeWidth />}
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                invalid={invalid && preset.needsName && !name.trim()}
                disabled={locked}
              />
            </FormField>
          ) : null}

          <FormField
            htmlFor="onboarding-email"
            label="Email"
            hint="Used to sign in and recover your account."
          >
            <TextField
              id="onboarding-email"
              icon={<DkEnvelopeMessageMail size={18} strokeWidth={1.6} absoluteStrokeWidth />}
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              disabled
            />
          </FormField>

          <FormField
            htmlFor="onboarding-username"
            label="Username"
            required
            hint={
              usernameTaken
                ? 'That username is taken.'
                : 'Letters, numbers, underscores, and hyphens.'
            }
            hintTone={usernameTaken ? 'error' : 'default'}
            invalid={usernameTaken}
          >
            <TextField
              id="onboarding-username"
              icon={<DkAtSign size={18} strokeWidth={1.6} absoluteStrokeWidth />}
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              invalid={usernameTaken}
              disabled={locked}
              spellCheck={false}
            />
          </FormField>
        </div>

        <div className="mt-4">
          <Button
            type="button"
            variant="ghost"
            className="h-auto min-h-0 px-0 py-1 text-sm font-normal"
            disabled={locked}
            onClick={() => setOptionalOpen((open) => !open)}
          >
            {optionalOpen ? 'Hide optional details' : 'Add optional details'}
          </Button>
        </div>

        <AuthFormCollapse open={optionalOpen}>
          <div className="flex flex-col gap-4 pt-4">
            <FormField label="Birthday" optional>
              <DatePicker
                value={birthday}
                onChange={setBirthday}
                placeholder="Select a date"
                disabled={locked}
                min="1900-01-01"
                max={today}
                triggerWidth="100%"
              />
            </FormField>

            <FormField label="Gender" optional>
              <Select
                value={gender}
                onChange={(next) => setGender(next as GenderValue)}
                options={GENDER_OPTIONS}
                placeholder="Select"
                ariaLabel="Gender"
                icon={
                  <DkVenusGenderPlanetAndMarsGenderPlanet
                    size={18}
                    strokeWidth={1.6}
                    absoluteStrokeWidth
                  />
                }
                allowClear
                clearLabel="Not set"
                disabled={locked}
              />
            </FormField>

            <FormField label="Phone" optional>
              <PhoneInput value={phone} onChange={setPhone} disabled={locked} />
            </FormField>

            <FormField label="Country" optional>
              <CountrySelect
                value={country}
                onChange={setCountry}
                disabled={locked}
                placeholder="Select a country"
              />
            </FormField>
          </div>
        </AuthFormCollapse>

        {invalid && !usernameTaken ? <ErrorText>Could not save your profile.</ErrorText> : null}

        <Button
          className="mt-8"
          type="submit"
          disabled={!canContinue || locked}
          loading={loading}
          loadingText="Continuing…"
        >
          Continue
        </Button>
      </form>
    </AuthLayout>
  )
}
