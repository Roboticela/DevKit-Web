import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const TEMPLATE_IDS = ["nextjs-compact", "vite-express-tauri"] as const;

const TEMPLATE_DIRS: Record<string, string> = {
  "nextjs-compact": "nextjs",
  "vite-express-tauri": "vite-express-tauri",
};

function getTemplatesRoot(fromImportMetaUrl = import.meta.url): string {
  const pkgRoot = join(dirname(fileURLToPath(fromImportMetaUrl)), "..", "..");
  const nested = join(pkgRoot, "templates");
  const sibling = join(pkgRoot, "..", "templates");
  if (existsSync(join(nested, "nextjs"))) return nested;
  if (existsSync(join(sibling, "nextjs"))) return sibling;
  throw new Error("First-party templates not found. Reinstall @roboticela/devkit.");
}

function copyDirFiltered(src: string, dest: string, vars: Record<string, string>) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    if (entry === "node_modules" || entry === ".git") continue;
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDirFiltered(srcPath, destPath, vars);
    } else {
      let content = readFileSync(srcPath, "utf-8");
      for (const [key, val] of Object.entries(vars)) {
        content = content.replaceAll(`{{${key}}}`, val);
      }
      writeFileSync(destPath, content);
    }
  }
}

export async function downloadTemplate(
  templateId: string,
  destDir: string,
  vars: {
    projectName: string;
    siteName: string;
    siteUrl: string;
    siteDescription?: string;
  }
): Promise<void> {
  if (!TEMPLATE_IDS.includes(templateId as (typeof TEMPLATE_IDS)[number])) {
    throw new Error(`Unknown template: ${templateId}`);
  }

  const templatesRoot = getTemplatesRoot();
  const dirName = TEMPLATE_DIRS[templateId]!;
  const srcDir = join(templatesRoot, dirName);

  if (!existsSync(srcDir)) {
    throw new Error(`Template '${templateId}' not bundled in @roboticela/devkit.`);
  }

  const slug = vars.projectName.toLowerCase().replace(/[^a-z0-9-]/g, "-");

  copyDirFiltered(srcDir, destDir, {
    PROJECT_NAME: vars.projectName,
    PROJECT_SLUG: slug,
    SITE_NAME: vars.siteName,
    SITE_URL: vars.siteUrl,
    SITE_DESCRIPTION: vars.siteDescription ?? `${vars.siteName} — built with Roboticela DevKit`,
  });
}

export function listTemplates() {
  return [
    { id: "nextjs-compact", label: "Next.js", dir: "nextjs" },
    { id: "vite-express-tauri", label: "Vite + Express + Tauri", dir: "vite-express-tauri" },
  ];
}
