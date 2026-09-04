'use client'

import { useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { brand } from '@/lib/devkit'
import {
  PAGES_ITEMS,
  SAVE_RECOVERY_CODES_STATES,
  type SaveRecoveryCodesPreviewState,
} from '@/lib/pages-catalog'
import { adjacentDocs } from '@/lib/docs-catalog'
import { useTheme } from '@/lib/theme'
import { Badge } from './Badge'
import { BuiltWithChips } from './BuiltWithChips'
import { CollapsibleCode } from './CollapsibleCode'
import { CompositionTree, type CompositionNode } from './CompositionTree'
import { DocsSectionTitle } from './DocsCopy'
import { DocsPager } from './DocsPager'
import { PageStateThumb } from './PageStateThumb'
import { PropsTable, type PropRow } from './PropsTable'
import { RelatedCard } from './RelatedCard'
import { SaveRecoveryCodesPage } from './SaveRecoveryCodesPage'
import { Caption, Heading, Subhead } from './Text'
import { ViewportPreview } from './ViewportPreview'

const TREE: CompositionNode[] = [
  {
    label: 'Save Recovery Codes Page',
    children: [
      {
        label: 'Auth Nav',
        href: '/components/auth-nav',
        note: '(Brand Logo, theme, Sign in link)',
      },
      { label: 'Auth Brand', note: '(Key icon, title, subhead)' },
      { label: 'Recovery Input', href: '/components/recovery-input', note: '(Recovery codes list, copy, download)' },
      { label: 'Button', href: '/components/button', note: '(Continue)' },
    ],
  },
]

const DATA: PropRow[] = [
  {
    name: 'onContinue',
    type: '() => void',
    required: 'Yes',
    defaultValue: '—',
    description: 'Called when the person confirms they have saved the recovery codes. Navigates to the setup success screen.',
  },
  {
    name: 'continueHref',
    type: 'string',
    required: 'No',
    defaultValue: "'/setup-2fa-success'",
    description: 'Where Continue goes after recovery codes are saved.',
  },
  {
    name: 'recoveryCodes',
    type: 'string[]',
    required: 'Yes',
    defaultValue: '—',
    description: 'One-time backup codes to display, copy, and download.',
  },
]

const REACT_SOURCE = `import Link from 'next/link'
import { AuthBrand, AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { RecoveryCodesList } from '@/components/RecoveryInput'
import { Body } from '@/components/Text'
import { DkRoundKeyAccess } from '@/icons'

export default function SaveRecoveryCodesPage({ recoveryCodes, onContinue }) {
  return (
    <AuthLayout navLinkTo="/sign-in" navLinkLabel="Sign in">
      <AuthBrand
        title="Save Recovery Codes"
        subhead="Save these codes somewhere safe."
        icon={<DkRoundKeyAccess size={44} strokeWidth={1.5} />}
      />
      <RecoveryCodesList columns={3} copyable downloadable codes={recoveryCodes} onCopy={markSaved} onDownload={markSaved} />
      <Link href="/setup-2fa-success">
        <Button type="button" disabled={!saved} onClick={onContinue}>Continue</Button>
      </Link>
    </AuthLayout>
  )
}
`

const BUILT_WITH = [
  { label: 'Auth Nav', href: '/components/auth-nav' },
  { label: 'Recovery Input', href: '/components/recovery-input' },
  { label: 'Button', href: '/components/button' },
]

export function SaveRecoveryCodesDocs() {
  const reduced = usePrefersReducedMotion()
  const { theme } = useTheme()
  const [state, setState] = useState<SaveRecoveryCodesPreviewState>('default')
  const src = `/save-recovery-codes?state=${state}&theme=${theme}`
  const fullHref = `/save-recovery-codes?state=${state}`

  function selectState(next: SaveRecoveryCodesPreviewState) {
    setState(next)
    const preview = document.getElementById('live-preview')
    preview?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <article>
      <header id="overview" className="scroll-mt-20 animate-docs-header-in motion-reduce:animate-none">
        <Caption>Pages / Auth / Save Recovery Codes</Caption>
        <Heading className="mt-2">Save Recovery Codes</Heading>
        <Subhead className="mt-2">
          Shown after authenticator setup when someone still needs to copy and store one-time backup codes
          before continuing.
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
          url={`${brand.supportLabel}/save-recovery-codes`}
          fullHref={fullHref}
          fadeKey={`${state}-${theme}`}
          onCopy={() => navigator.clipboard.writeText(REACT_SOURCE)}
          onSource={() => window.open('/save-recovery-codes', '_blank', 'noreferrer')}
        />
        <div id="code" className="scroll-mt-20">
          <CollapsibleCode code={REACT_SOURCE} fadeKey="react" />
        </div>
      </section>

      <section id="states" className="mt-12 scroll-mt-20">
        <DocsSectionTitle>States</DocsSectionTitle>
        <div className="grid grid-cols-1 gap-4 min-[735px]:grid-cols-2">
          {SAVE_RECOVERY_CODES_STATES.map((item) => (
            <PageStateThumb
              key={item.id}
              label={item.label}
              selected={state === item.id}
              onClick={() => selectState(item.id)}
            >
              <div className="origin-top scale-[0.42] [width:238%]">
                <SaveRecoveryCodesPage state={item.id} />
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
            href="/pages/setup-2fa"
            title="Setup Two-Factor"
            description="Authenticator setup step that comes before saving recovery codes."
          />
          <RelatedCard
            href="/pages/recovery-code"
            title="Recovery Code"
            description="Enter a saved backup code during sign-in."
          />
          <RelatedCard
            href="/pages/setup-2fa-success"
            title="Two-Factor Setup Success"
            description="Next step after recovery codes — confirm setup, then go to the dashboard."
          />
        </div>
      </section>

      <DocsPager className="mt-12" {...adjacentDocs(PAGES_ITEMS, 'save-recovery-codes')} />
    </article>
  )
}
