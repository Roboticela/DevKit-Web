/**
 * Parse `name@version` the same way for packages and templates.
 * `button@1.0.1` → { id: "button", version: "1.0.1" }
 * `nextjs-compact` → { id: "nextjs-compact", version: "latest" }
 */
export function parseIdAtVersion(spec: string): { id: string; version: string } {
  const at = spec.lastIndexOf("@");
  if (at > 0) {
    const id = spec.slice(0, at);
    const version = spec.slice(at + 1).trim() || "latest";
    return { id, version };
  }
  return { id: spec, version: "latest" };
}
