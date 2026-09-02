import { useParams } from 'react-router-dom';
import { DevKitPremiumPage } from '@/lib/devkit-premium';

export function DevKitPremiumRoute() {
  const { assetId = '' } = useParams();
  return <DevKitPremiumPage assetId={assetId} />;
}
