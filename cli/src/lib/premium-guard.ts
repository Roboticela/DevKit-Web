import type { PackageKind } from "./component-entry.js";

/** Known premium asset IDs — never install via bundled copy or module export. */
export const PREMIUM_ASSET_IDS = new Set([
  "dashboard-page",
  "settings-page",
  "hero-section",
  "auth-scaffold",
  "sign-in-page",
]);

export function isPremiumAssetId(name: string): boolean {
  return PREMIUM_ASSET_IDS.has(name.split("@")[0]!);
}

export function premiumInstallHint(name: string, kind: PackageKind = "page"): string {
  const cmd =
    kind === "section" ? "devkit section add" : kind === "scaffold" ? "devkit scaffold add" : "devkit page add";
  return `'${name}' is a premium server asset. Run: ${cmd} ${name}`;
}

export function assertNotPremiumAsset(name: string, kind?: PackageKind): void {
  if (!isPremiumAssetId(name)) return;
  const resolvedKind =
    kind ??
    (name.endsWith("-section") ? "section" : name.endsWith("-scaffold") ? "scaffold" : "page");
  throw new Error(premiumInstallHint(name, resolvedKind));
}
