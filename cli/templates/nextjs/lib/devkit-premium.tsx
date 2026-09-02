'use client';

import { lazy, Suspense, useMemo } from 'react';

let registry: {
  premiumImports?: Record<string, () => Promise<{ default: React.ComponentType }>>;
} | null = null;

async function loadRegistry() {
  if (registry) return registry;
  try {
    registry = await import('../../.devkit/premium-imports');
  } catch {
    registry = { premiumImports: {} };
  }
  return registry;
}

export function DevKitPremiumPage({ assetId }: { assetId: string }) {
  const Lazy = useMemo(
    () =>
      lazy(async () => {
        const mod = await loadRegistry();
        const loader = mod.premiumImports?.[assetId];
        if (!loader) {
          return {
            default: function Missing() {
              return (
                <main className="p-8">
                  <p>Premium asset &quot;{assetId}&quot; is not provisioned.</p>
                  <p className="text-sm text-text-secondary">Run: devkit page add {assetId}</p>
                </main>
              );
            },
          };
        }
        return loader();
      }),
    [assetId]
  );

  return (
    <Suspense fallback={<main className="p-8">Loading…</main>}>
      <Lazy />
    </Suspense>
  );
}
