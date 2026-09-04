'use client'

import { useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { brand } from '@/lib/devkit'
import {
  ONBOARDING_STATES,
  PAGES_ITEMS,
  type OnboardingPreviewState,
} from '@/lib/pages-catalog'
import { adjacentDocs } from '@/lib/docs-catalog'
import { useTheme } from '@/lib/theme'
import { Badge } from './Badge'
import { BuiltWithChips } from './BuiltWithChips'
import { CollapsibleCode } from './CollapsibleCode'
import { CompositionTree, type CompositionNode } from './CompositionTree'
import { DocsSectionTitle } from './DocsCopy'
import { DocsPager } from './DocsPager'
import { OnboardingPage } from './OnboardingPage'
import { PageStateThumb } from './PageStateThumb'
import { PropsTable, type PropRow } from './PropsTable'
import { RelatedCard } from './RelatedCard'
import { Caption, Heading, Subhead } from './Text'
import { ViewportPreview } from './ViewportPreview'

const TREE: CompositionNode[] = [
  {
    label: 'Onboarding Page',
    children: [
      { label: 'Auth Nav', href: '/components/auth-nav', note: '(Brand Logo, theme)' },
      { label: 'Auth Brand', note: '(Title, subhead, provider badge)' },
      { label: 'Avatar Picker', href: '/components/avatar-picker', note: '(Profile photo)' },
      { label: 'Text Field', href: '/components/text-field', note: '(Name, email, username)' },
      { label: 'Date Picker', href: '/components/date-picker', note: '(Birthday, optional)' },
      { label: 'Country Select', href: '/components/country-select', note: '(Optional)' },
      { label: 'Phone Input', href: '/components/phone-input', note: '(Optional)' },
      { label: 'Button', href: '/components/button', note: '(Continue)' },
    ],
  },
]

const DATA: PropRow[] = [
  {
    name: 'provider',
    type: 'OnboardingProvider',
    required: 'Yes',
    defaultValue: '—',
    description: 'Where the person came from — Google, Apple, passkey, email, etc. Roboticela skips this page.',
  },
  {
    name: 'prefill',
    type: 'OnboardingPrefill',
    required: 'Yes',
    defaultValue: '—',
    description: 'Name, email, and avatar returned by the provider. Email is shown read-only.',
  },
  {
    name: 'onContinue',
    type: '(profile: OnboardingProfile) => void',
    required: 'Yes',
    defaultValue: '—',
    description: 'Called when the person submits username and any optional details.',
  },
  {
    name: 'checkUsername',
    type: '(username: string) => Promise<boolean>',
    required: 'No',
    defaultValue: 'undefined',
    description: 'Live availability check for the username field.',
  },
]

const REACT_SOURCE = `import { AuthBrand, AuthLayout } from '@/components/AuthLayout'
import { AvatarPicker } from '@/components/AvatarPicker'
import { Button } from '@/components/Button'
import { CountrySelect } from '@/components/CountrySelect'
import { DatePicker } from '@/components/DatePicker'
import { FormField } from '@/components/FieldLabel'
import { PhoneInput } from '@/components/PhoneInput'
import { TextField } from '@/components/TextField'
import { DkPersonUserProfileAdd } from '@/icons'

export default function OnboardingPage({ prefill, onContinue }) {
  return (
    <AuthLayout>
      <AuthBrand
        title="Finish setting up your account"
        subhead="We pulled in a few details from Google. Add what's still missing."
        icon={<DkPersonUserProfileAdd size={44} strokeWidth={1.5} />}
      />
      <AvatarPicker name={prefill.name} src={prefill.avatarSrc} onFile={onPhoto} />
      <FormField label="Email">
        <TextField value={prefill.email} disabled />
      </FormField>
      <FormField label="Username" required>
        <TextField value={username} onChange={setUsername} />
      </FormField>
      <Button type="submit">Continue</Button>
    </AuthLayout>
  )
}
`

const BUILT_WITH = [
  { label: 'Auth Nav', href: '/components/auth-nav' },
  { label: 'Avatar Picker', href: '/components/avatar-picker' },
  { label: 'Text Field', href: '/components/text-field' },
  { label: 'Date Picker', href: '/components/date-picker' },
  { label: 'Phone Input', href: '/components/phone-input' },
  { label: 'Button', href: '/components/button' },
]

export function OnboardingDocs() {
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()
  const [state, setState] = useState<OnboardingPreviewState>('default')
  const src = `/onboarding?state=${state}&theme=${theme}`
  const fullHref = `/onboarding?state=${state}`

  function selectState(next: OnboardingPreviewState) {
    setState(next)
    const preview = document.getElementById('live-preview')
    preview?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <article>
      <header id="overview" className="scroll-mt-20 animate-docs-header-in motion-reduce:animate-none">
        <Caption>Pages / Auth / Onboarding</Caption>
        <Heading className="mt-2">Onboarding</Heading>
        <Subhead className="mt-2">
          Collect a username and optional profile details after sign-up with Google, Apple, passkey, or email.
          People who use Continue with Roboticela already provide everything on Create Account.
        </Subhead>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Badge variant="outline" shape="rounded" tone="neutral">
            v1.0.0
          </Badge>
          <Caption as="span">Last updated Sep 1, 2026</Caption>
        </div>
        <BuiltWithChips className="mt-3" items={BUILT_WITH} />
      </header>

      <section id="live-preview" className="mt-8 scroll-mt-20">
        <ViewportPreview
          src={src}
          url={`${brand.supportLabel}/onboarding`}
          fullHref={fullHref}
          fadeKey={`${state}-${theme}`}
          onCopy={() => navigator.clipboard.writeText(REACT_SOURCE)}
          onSource={() => window.open('/onboarding', '_blank', 'noreferrer')}
        />
        <div id="code" className="scroll-mt-20">
          <CollapsibleCode code={REACT_SOURCE} fadeKey="react" />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          {ONBOARDING_STATES.map((item) => (
            <PageStateThumb
              key={item.id}
              label={item.label}
              selected={state === item.id}
              onClick={() => selectState(item.id)}
            >
              <div className="origin-top scale-[0.42] [width:238%]">
                <OnboardingPage state={item.id} />
              </div>
            </PageStateThumb>
          ))}
        </div>
      </section>

      <section id="composition" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>How This Page Is Built</DocsSectionTitle>
        <CompositionTree tree={TREE} />
      </section>

      <section id="data" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>Page Data</DocsSectionTitle>
        <PropsTable rows={DATA} />
      </section>

      <section className="mt-12">
        <DocsSectionTitle className="mb-3">Related</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-3 min-[735px]:grid-cols-3">
          <RelatedCard
            href="/pages/create-account"
            title="Create Account"
            description="Roboticela sign-up collects name, email, and password in one step."
          />
          <RelatedCard
            href="/pages/setup-2fa"
            title="Setup Two-Factor"
            description="Optional next step after the profile is complete."
          />
          <RelatedCard
            href="/pages/choose-verification-method"
            title="Choose Verification Method"
            description="Verification after onboarding when 2FA is required."
          />
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(PAGES_ITEMS, 'onboarding')} />
    </article>
  )
}
