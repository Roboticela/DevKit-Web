'use client'

import { useState } from 'react'
import { DkSuccessCircleCheckmark } from '@/icons'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { brand } from '@/lib/devkit'
import {
  CREATE_ACCOUNT_STATES,
  PAGES_ITEMS,
  resolveCreateAccountPreview,
  type CreateAccountPreviewState,
} from '@/lib/pages-catalog'
import { adjacentDocs } from '@/lib/docs-catalog'
import { useTheme } from '@/lib/theme'
import { Badge } from './Badge'
import { BuiltWithChips } from './BuiltWithChips'
import { CollapsibleCode } from './CollapsibleCode'
import { CompositionTree, type CompositionNode } from './CompositionTree'
import { DocsMetaBadges, DocsSectionTitle } from './DocsCopy'
import { DocsPager } from './DocsPager'
import { PageStateThumb } from './PageStateThumb'
import { PropsTable, type PropRow } from './PropsTable'
import { RelatedCard } from './RelatedCard'
import { CreateAccountPage } from './CreateAccountPage'
import { Caption, Heading, Subhead } from './Text'
import { ViewportPreview } from './ViewportPreview'

const TREE: CompositionNode[] = [
  {
    label: 'Create Account Page',
    children: [
      {
        label: 'Auth Nav',
        href: '/components/auth-nav',
        note: '(Brand Logo, theme, Sign in)',
      },
      { label: 'Brand Logo', href: '/components/brand-logo', note: '(mark)' },
      { label: 'Auth Brand', note: '(Create your Account, subhead)' },
      { label: 'Text Field', href: '/components/text-field', note: '(Name)' },
      { label: 'Text Field', href: '/components/text-field', note: '(Email)' },
      { label: 'Password Field', href: '/components/password-field' },
      { label: 'Password Reveal', href: '/components/password-reveal' },
      { label: 'Button', href: '/components/button', note: '(Primary, full width)' },
      { label: 'Divider', href: '/components/divider', note: '("or")' },
      { label: 'Social Login Button', href: '/components/social-login', note: '(Roboticela, Passkey, Google)' },
      { label: 'Other Ways Button', href: '/components/social-login', note: '(Apple, Microsoft, GitHub, and more)' },
      { label: 'Anchor', href: '/components/anchor', note: '(Sign in)' },
    ],
  },
]

const DATA: PropRow[] = [
  {
    name: 'onSubmit',
    type: '(payload: { name: string; email: string; password: string }) => void',
    required: 'Yes',
    defaultValue: '—',
    description: 'Called with name, email, and password when the form is submitted.',
  },
  {
    name: 'errorMessage',
    type: 'string',
    required: 'No',
    defaultValue: 'undefined',
    description: 'Inline error shown under the fields after a failed attempt.',
  },
  {
    name: 'isLoading',
    type: 'boolean',
    required: 'No',
    defaultValue: 'false',
    description: 'Puts the primary button in a creating state and disables inputs.',
  },
  {
    name: 'lastMethod',
    type: "'google' | 'passkey' | 'roboticela' | null",
    required: 'No',
    defaultValue: 'null',
    description: 'Which method was used last. That button shows Last used.',
  },
]

const REACT_SOURCE = `import { Anchor } from '@/components/Anchor'
import { AuthBrand, AuthLayout } from '@/components/AuthLayout'
import { AuthLegal } from '@/components/TextLink'
import { AuthProviderStack } from '@/components/AuthProviderButton'
import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { OtherWaysButton } from '@/components/OtherWaysButton'
import { PasswordField } from '@/components/PasswordField'
import {
  SOCIAL_LOGIN_MORE_PROVIDERS,
  SOCIAL_LOGIN_PRIMARY_PROVIDERS,
  SocialLoginButton,
} from '@/components/SocialLoginButton'
import { TextField } from '@/components/TextField'
import { DkChevronCaretLeft, DkEnvelopeMessageMail, DkPersonUserProfile } from '@/icons'

export default function CreateAccountPage({
  onSubmit,
  errorMessage,
  isLoading = false,
  lastMethod = null,
}) {
  const [more, setMore] = useState(false)

  return (
    <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
      <AuthBrand title="Create your Account" subhead="One account. Everything DevKit." />
      {more ? (
        <>
          <AuthProviderStack className="gap-y-3">
            {SOCIAL_LOGIN_MORE_PROVIDERS.map((provider) => (
              <SocialLoginButton key={provider} provider={provider} />
            ))}
          </AuthProviderStack>
          <div className="mt-3">
            <OtherWaysButton icon={<DkChevronCaretLeft />} onClick={() => setMore(false)}>
              Back
            </OtherWaysButton>
          </div>
        </>
      ) : (
        <>
          <form className="mt-8 flex flex-col" noValidate onSubmit={...}>
            <TextField name="name" placeholder="Name" />
            <TextField name="email" placeholder="Email" />
            <PasswordField name="password" autoComplete="new-password" />
            <Button type="submit" loading={isLoading} loadingText="Creating…">
              Create Account
            </Button>
          </form>
          <Divider>or</Divider>
          <AuthProviderStack className="gap-y-3">
            {SOCIAL_LOGIN_PRIMARY_PROVIDERS.map((provider) => (
              <SocialLoginButton
                key={provider}
                provider={provider}
                lastUsed={lastMethod === provider}
              />
            ))}
          </AuthProviderStack>
          <div className="mt-3">
            <OtherWaysButton onClick={() => setMore(true)} />
          </div>
        </>
      )}
    </AuthLayout>
  )
}
`

const BUILT_WITH = [
  { label: 'Brand Logo', href: '/components/brand-logo' },
  { label: 'Auth Nav', href: '/components/auth-nav' },
  { label: 'Anchor', href: '/components/anchor' },
  { label: 'Text Field', href: '/components/text-field' },
  { label: 'Password Field', href: '/components/password-field' },
  { label: 'Button', href: '/components/button' },
  { label: 'Divider', href: '/components/divider' },
  { label: 'Social Login Button', href: '/components/social-login' },
  { label: 'Other Ways Button', href: '/components/social-login' },
]

export function CreateAccountDocs() {
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()
  const [state, setState] = useState<CreateAccountPreviewState>('default')
  const src = `/create-account?state=${state}&theme=${theme}`
  const fullHref = `/create-account?state=${state}`

  function selectState(next: CreateAccountPreviewState) {
    setState(next)
    const preview = document.getElementById('live-preview')
    preview?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <article>
      <header id="overview" className="scroll-mt-20 animate-docs-header-in motion-reduce:animate-none">
        <Caption>Pages / Auth / Create Account</Caption>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Heading>Create Account</Heading>
          <Badge tone="verified" icon={<DkSuccessCircleCheckmark strokeWidth={2.5} absoluteStrokeWidth />}>
            Stable
          </Badge>
        </div>
        <Subhead className="mt-2">
          A registration page with name, email, a password, Roboticela, passkey, Google, and other ways to continue.
        </Subhead>
        <DocsMetaBadges showStatus={false} />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Badge variant="outline" shape="rounded" tone="neutral">
            v1.0.0
          </Badge>
          <Caption as="span">Last updated Aug 31, 2026</Caption>
        </div>
        <BuiltWithChips className="mt-3" items={BUILT_WITH} />
      </header>

      <section id="live-preview" className="mt-8 scroll-mt-20">
        <ViewportPreview
          src={src}
          url={`${brand.supportLabel}/create-account`}
          fullHref={fullHref}
          fadeKey={`${state}-${theme}`}
          onCopy={() => navigator.clipboard.writeText(REACT_SOURCE)}
          onSource={() => window.open('/create-account', '_blank', 'noreferrer')}
        />
        <div id="code" className="scroll-mt-20">
          <CollapsibleCode code={REACT_SOURCE} fadeKey="react" />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          {CREATE_ACCOUNT_STATES.map((item) => {
            const preview = resolveCreateAccountPreview(item.id)
            return (
              <PageStateThumb
                key={item.id}
                label={item.label}
                selected={state === item.id}
                onClick={() => selectState(item.id)}
              >
                <div className="origin-top scale-[0.42] [width:238%]">
                  <CreateAccountPage state={preview.state} lastMethod={preview.lastMethod} />
                </div>
              </PageStateThumb>
            )
          })}
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
            href="/pages/sign-in"
            title="Sign In"
            description="The peer flow, with the same auth nav and social providers."
          />
          <RelatedCard
            href="/pages/forgot-password"
            title="Forgot Password"
            description="Email a reset link when a password is lost."
          />
          <RelatedCard
            href="/pages/verification-code"
            title="Verification Code"
            description="Email OTP after the account is created."
          />
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(PAGES_ITEMS, 'create-account')} />
    </article>
  )
}
