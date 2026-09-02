import chalk from "chalk";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { readConfig, readLock } from "../lib/config.js";
import { log } from "../lib/logger.js";
import { healthCheck } from "../lib/registry.js";
import { checkApiHealth, getApiBaseUrl } from "../lib/api-client.js";
import { readSession, isSessionValid } from "../lib/auth-store.js";
import { getProjectLicenseStatus } from "../lib/project.js";
import { detectAdapter } from "../lib/adapters/index.js";
import { cliBinName } from "../lib/cli-meta.js";

export async function doctorCommand(cwd = process.cwd()) {
  let ok = true;
  log.blank();
  log.header("Roboticela DevKit Doctor");

  // Node.js
  log.success(`Node.js ${process.version}`);

  // Package manager
  const hasPnpm = existsSync(join(cwd, "pnpm-lock.yaml"));
  const hasYarn = existsSync(join(cwd, "yarn.lock"));
  const hasBun = existsSync(join(cwd, "bun.lockb")) || existsSync(join(cwd, "bun.lock"));
  const pm = hasBun ? "bun" : hasPnpm ? "pnpm" : hasYarn ? "yarn" : "npm";
  log.success(`Package manager: ${pm}`);

  // Config
  const configPath = join(cwd, "devkit.config.json");
  if (existsSync(configPath)) {
    log.success("devkit.config.json found");
  } else {
    log.error("devkit.config.json not found — run 'devkit init'");
    ok = false;
  }

  try {
    const config = readConfig(cwd);
    log.success(`Template: ${config.template}`);

    const adapter = detectAdapter(cwd);
    if (adapter) log.success(`Framework detected: ${adapter.label}`);
    else log.warn("Could not detect framework from project files");

    if (!config.site.name) { log.warn("site.name is empty"); ok = false; }
    if (!config.site.url)  { log.warn("site.url is empty"); ok = false; }

    if (config.project?.id) {
      log.success(`Project ID: ${config.project.id}`);
    } else {
      log.warn(`Project not registered with DevKit server — run '${cliBinName()} login'`);
    }

    const lock = readLock(cwd);
    for (const [name, entry] of Object.entries(lock.components)) {
      const manifestPath = join(cwd, ".devkit", `${name}.manifest.json`);
      if (!existsSync(manifestPath)) {
        log.warn(`${name}@${entry.version} — manifest missing (reinstall with 'devkit add ${name}')`);
        continue;
      }
      const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
      const envVars: string[] = manifest.envVars ?? [];
      let compOk = true;
      for (const envVar of envVars) {
        if (!process.env[envVar]) {
          log.warn(`${name} — Missing env var: ${chalk.yellow(envVar)}`);
          compOk = false;
          ok = false;
        }
      }
      if (compOk) log.success(`${name}@${entry.version} — OK`);
    }

    // Prisma
    if (existsSync(join(cwd, "prisma/schema.prisma"))) {
      log.success("Prisma schema found");
      if (!process.env.DATABASE_URL && !existsSync(join(cwd, ".env"))) {
        log.warn("DATABASE_URL not set — copy .env.example to .env");
        ok = false;
      }
    }
  } catch (e) {
    log.error((e as Error).message);
    ok = false;
  }

  // Live server catalog
  const registryOk = await healthCheck();
  if (registryOk) log.success("DevKit server catalog reachable");
  else {
    log.warn("Server catalog unavailable — run login and ensure API is up");
    ok = false;
  }

  // API
  const apiUrl = getApiBaseUrl();
  const apiOk = await checkApiHealth(apiUrl);
  if (apiOk) log.success(`DevKit API reachable (${apiUrl})`);
  else {
    log.warn(`DevKit API unreachable (${apiUrl}) — catalog, templates, and premium require the server`);
    ok = false;
  }

  // Auth
  const session = readSession();
  if (isSessionValid(session)) {
    log.success(`Authenticated as ${session!.user.email}`);
    try {
      const license = await getProjectLicenseStatus(cwd);
      if (license?.active) log.success("Project license: active");
      else log.warn(`Project license: not active ($50 one-time — ${cliBinName()} activate)`);
    } catch {
      log.warn("Could not verify license status");
    }
  } else {
    log.warn(`Not authenticated — run '${cliBinName()} login' for premium assets`);
  }

  log.blank();
  if (ok) log.success("Everything looks good!");
  else log.warn("Some issues found — see above.");
  log.blank();
}
