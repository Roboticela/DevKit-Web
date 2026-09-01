import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { AnotherDeviceDocs } from '@/components/AnotherDeviceDocs'
import { AuthenticatorCodeDocs } from '@/components/AuthenticatorCodeDocs'
import { RecoveryCodeDocs } from '@/components/RecoveryCodeDocs'
import { ChooseVerificationMethodDocs } from '@/components/ChooseVerificationMethodDocs'
import { VerificationCodeDocs } from '@/components/VerificationCodeDocs'
import { CreateAccountDocs } from '@/components/CreateAccountDocs'
import { DocsArticleStub } from '@/components/DocsArticleStub'
import { ForgotPasswordDocs } from '@/components/ForgotPasswordDocs'
import { ResetPasswordDocs } from '@/components/ResetPasswordDocs'
import { SignInDocs } from '@/components/SignInDocs'
import { adjacentDocs, findDocContext } from '@/lib/docs-catalog'
import { PAGES_ITEMS, PAGES_NAV } from '@/lib/pages-catalog'

export function generateStaticParams() {
  return PAGES_ITEMS.map((item) => ({ slug: item.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = PAGES_ITEMS.find((entry) => entry.id === slug)
  if (!item) return { title: 'Not found' }
  return {
    title: `${item.label} — DevKit Pages`,
    description: item.description ?? `${item.label} page template.`,
  }
}

export default async function PageDocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (slug === 'otp-verification') redirect('/pages/verification-code')
  if (slug === 'passkey-sign-in') redirect('/pages/sign-in')

  const ctx = findDocContext(PAGES_NAV, slug)
  if (!ctx) notFound()

  if (slug === 'sign-in') return <SignInDocs />
  if (slug === 'create-account') return <CreateAccountDocs />
  if (slug === 'forgot-password') return <ForgotPasswordDocs />
  if (slug === 'reset-password') return <ResetPasswordDocs />
  if (slug === 'choose-verification-method') return <ChooseVerificationMethodDocs />
  if (slug === 'verification-code') return <VerificationCodeDocs />
  if (slug === 'authenticator-code') return <AuthenticatorCodeDocs />
  if (slug === 'recovery-code') return <RecoveryCodeDocs />
  if (slug === 'another-device') return <AnotherDeviceDocs />

  const { prev, next } = adjacentDocs(PAGES_ITEMS, slug)

  return (
    <DocsArticleStub
      eyebrow={`Pages / ${ctx.section.label} / ${ctx.item.label}`}
      title={ctx.item.label}
      prev={prev}
      next={next}
    />
  )
}
