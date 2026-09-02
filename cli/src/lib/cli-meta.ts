/** CLI runtime identity (normal vs local test shim). */
export function isLocalTestMode(): boolean {
  return process.env.DEVKIT_TEST === "1";
}

export function cliBinName(): string {
  return isLocalTestMode() ? "devkit-test" : "devkit";
}

export function cliPackageName(): string {
  return "@roboticela/devkit";
}
