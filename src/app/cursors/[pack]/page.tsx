import { redirect } from 'next/navigation'

export default async function CursorsPackRedirect({
  params,
}: {
  params: Promise<{ pack: string }>
}) {
  const { pack } = await params
  redirect(`/components/cursors/${pack}`)
}
