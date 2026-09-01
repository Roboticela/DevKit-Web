'use client'

import Link from 'next/link'
import { DkHandheldMobilePhone } from '@/icons'
import type { SetupTwoFactorSuccessPreviewState } from '@/lib/pages-catalog'
import { AuthLayout, AuthSuccess } from './AuthLayout'
import { Button } from './Button'

const SIGN_IN_HREF = '/sign-in'
const DASHBOARD_HREF = '/dashboard'

export function SetupTwoFactorSuccessPage({
  state = 'default',
  continueHref = DASHBOARD_HREF,
}: {
  state?: SetupTwoFactorSuccessPreviewState
  continueHref?: string
}) {
  const continuing = state === 'continuing'

  return (
    <AuthLayout navLinkTo={SIGN_IN_HREF} navLinkLabel="Sign in">
      <AuthSuccess
        title="Two-Factor Authentication Is On"
        body="You can use codes from your authenticator app when signing in."
        action={
          <Link href={continueHref} className="block w-full">
            <Button type="button" loading={continuing} loadingText="Continuing…">
              Continue
            </Button>
          </Link>
        }
      >
        <DkHandheldMobilePhone size={28} strokeWidth={1.75} absoluteStrokeWidth />
      </AuthSuccess>
    </AuthLayout>
  )
}
