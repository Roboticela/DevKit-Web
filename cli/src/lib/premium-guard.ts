import type { PackageKind } from "./component-entry.js";
import { cliBinName } from "./cli-meta.js";

/** Known premium asset IDs — never install via bundled copy or module export. */
export const PREMIUM_ASSET_IDS = new Set([
  "dashboard-page",
  "settings-page",
  "auth-scaffold",
  "sign-in-page",
  "navbar-section",
  "roboticela-hero-section",
  "product-marquee-section",
  "services-section",
  "idea-section",
  "reels-section",
  "trust-section",
  "roadmap-section",
  "contact-section",
  "footer-section",
]);

export function isPremiumAssetId(name: string): boolean {
  return PREMIUM_ASSET_IDS.has(name.split("@")[0]!);
}

export function premiumInstallHint(name: string, _kind: PackageKind = "page"): string {
  return `'${name}' is premium. Run: ${cliBinName()} add ${name}`;
}

export function assertNotPremiumAsset(name: string, kind?: PackageKind): void {
  if (!isPremiumAssetId(name)) return;
  const resolvedKind =
    kind ??
    (name.endsWith("-section") ? "section" : name.endsWith("-scaffold") ? "scaffold" : "page");
  throw new Error(premiumInstallHint(name, resolvedKind));
}
