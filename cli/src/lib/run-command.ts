import { existsSync } from "fs";
import { join } from "path";
import crossSpawn from "cross-spawn";

/**
 * Cross-platform process runner (same idea as tools like concurrently):
 * uses cross-spawn so npm/pnpm/yarn/npx work on Windows without shell:true
 * (avoids spawn EINVAL and Node DEP0190).
 */
export function runCommand(
  cmd: string,
  args: string[],
  opts: {
    cwd: string;
    env?: NodeJS.ProcessEnv;
    stdio?: "inherit" | "ignore" | "pipe";
  }
): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = crossSpawn(cmd, args, {
      cwd: opts.cwd,
      stdio: opts.stdio ?? "inherit",
      env: opts.env ?? process.env,
      // Never shell:true — cross-spawn resolves .cmd/.bat correctly on Windows.
      shell: false,
      windowsHide: true,
    });

    child.on("error", (err) => reject(err));
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")} failed (exit ${code ?? 1})`));
    });
  });
}

/** Detect package manager from lockfiles; always return bare binary names. */
export function detectPackageManager(cwd: string): {
  cmd: "npm" | "pnpm" | "yarn" | "bun";
  args: string[];
} {
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return { cmd: "pnpm", args: ["install"] };
  if (existsSync(join(cwd, "yarn.lock"))) return { cmd: "yarn", args: ["install"] };
  if (existsSync(join(cwd, "bun.lockb")) || existsSync(join(cwd, "bun.lock"))) {
    return { cmd: "bun", args: ["install"] };
  }
  return { cmd: "npm", args: ["install", "--no-fund", "--no-audit"] };
}
