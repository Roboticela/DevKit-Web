import { existsSync, readFileSync } from "fs";
import { join } from "path";
import type { DevKitConfig } from "../config.js";

export interface FrameworkPaths {
  componentsDir: string;
  pagesDir: string;
  stylesFile: string;
  routerFile: string | null;
  serverDir: string | null;
}

export interface FrameworkAdapter {
  id: DevKitConfig["template"];
  label: string;
  detect(cwd: string): boolean;
  paths: FrameworkPaths;
  cssPath(cwd: string): string;
}

function readPkgDeps(cwd: string): Record<string, string> {
  try {
    const pkg = JSON.parse(readFileSync(join(cwd, "package.json"), "utf-8")) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    return { ...pkg.dependencies, ...pkg.devDependencies };
  } catch {
    return {};
  }
}

export const nextjsAdapter: FrameworkAdapter = {
  id: "nextjs-compact",
  label: "Next.js Compact",
  detect(cwd) {
    return "next" in readPkgDeps(cwd);
  },
  paths: {
    componentsDir: "src/components",
    pagesDir: "app",
    stylesFile: "app/globals.css",
    routerFile: null,
    serverDir: null,
  },
  cssPath: (cwd) => join(cwd, "app/globals.css"),
};

export const viteExpressTauriAdapter: FrameworkAdapter = {
  id: "vite-express-tauri",
  label: "Vite + Express + Tauri",
  detect(cwd) {
    const deps = readPkgDeps(cwd);
    return "vite" in deps && (existsSync(join(cwd, "server")) || existsSync(join(cwd, "src-tauri")));
  },
  paths: {
    componentsDir: "src/components",
    pagesDir: "src/pages",
    stylesFile: "src/index.css",
    routerFile: "src/App.tsx",
    serverDir: "server",
  },
  cssPath: (cwd) => join(cwd, "src/index.css"),
};

export const ADAPTERS: Record<string, FrameworkAdapter> = {
  "nextjs-compact": nextjsAdapter,
  "vite-express-tauri": viteExpressTauriAdapter,
};

export function getAdapter(template: string): FrameworkAdapter {
  const adapter = ADAPTERS[template];
  if (!adapter) throw new Error(`Unknown template: ${template}`);
  return adapter;
}

export function detectAdapter(cwd = process.cwd()): FrameworkAdapter | null {
  for (const adapter of Object.values(ADAPTERS)) {
    if (adapter.detect(cwd)) return adapter;
  }
  return null;
}
