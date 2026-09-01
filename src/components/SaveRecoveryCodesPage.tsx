'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { DkRoundKeyAccess } from '@/icons'
import type { SaveRecoveryCodesPreviewState } from '@/lib/pages-catalog'
import { AuthBrand, AuthLayout } from './AuthLayout'
import { Button } from './Button'
import { LoadingScreen } from './LoadingScreen'
import { RecoveryCodesList } from './RecoveryInput'
import { Body } from './Text'

const SAMPLE_RECOVERY_CODES = [
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
]
const SIGN_IN_HREF = '/sign-in'
const SETUP_SUCCESS_HREF = '/setup-2fa-success'

export function SaveRecoveryCodesPage({
  state = 'default',
  codes = SAMPLE_RECOVERY_CODES,
  continueHref = SETUP_SUCCESS_HREF,
}: {
  state?: SaveRecoveryCodesPreviewState
  codes?: string[]
  continueHref?: string
}) {
  const loading = state === 'loading'
  const saving = state === 'saving'
  const [saved, setSaved] = useState(false)
  const canContinue = saved || saving

  useEffect(() => {
    setSaved(false)
  }, [state])

  if (loading) {
    return <LoadingScreen status="Generating your recovery codes…" />
  }

  return (
    <AuthLayout navLinkTo={SIGN_IN_HREF} navLinkLabel="Sign in">
      <AuthBrand
        title="Save Recovery Codes"
        subhead="Save these codes somewhere safe."
        narrowSubhead
        icon={<DkRoundKeyAccess size={44} strokeWidth={1.5} absoluteStrokeWidth />}
      />
      <Body size="sm" align="center" className="mx-auto mt-2 max-w-[360px]">
        Each code can be used once if you lose access to your authenticator. Copy or download them
        now and store them somewhere only you can reach.
      </Body>

      <div className="mx-auto mt-8 flex w-full max-w-[520px] flex-col items-center">
        <RecoveryCodesList
          className="w-full"
          columns={3}
          copyable
          downloadable
          codes={codes}
          onCopy={() => setSaved(true)}
          onDownload={() => setSaved(true)}
        />

        {canContinue ? (
          <Link href={continueHref} className="mt-8 w-full max-w-[420px]">
            <Button className="w-full" type="button" loading={saving} loadingText="Continuing…">
              Continue
            </Button>
          </Link>
        ) : (
          <Button className="mt-8 w-full max-w-[420px]" type="button" disabled>
            Continue
          </Button>
        )}
      </div>
    </AuthLayout>
  )
}
