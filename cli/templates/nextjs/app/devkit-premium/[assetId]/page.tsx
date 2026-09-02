import { DevKitPremiumPage } from '@/lib/devkit-premium';

type Props = { params: Promise<{ assetId: string }> };

export default async function DevKitPremiumRoute({ params }: Props) {
  const { assetId } = await params;
  return <DevKitPremiumPage assetId={assetId} />;
}
