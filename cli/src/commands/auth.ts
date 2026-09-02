import { intro, outro, spinner } from "@clack/prompts";
import chalk from "chalk";
import { apiFetch, getApiBaseUrl } from "../lib/api-client.js";
import { writeSession, clearSession, readSession, isSessionValid } from "../lib/auth-store.js";
import { log } from "../lib/logger.js";

const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 15 * 60 * 1000;

function parseExpiresInMsLocal(value: string): number {
  const match = value.match(/^(\d+)([smhd])$/);
  if (!match) return 15 * 60 * 1000;
  const n = parseInt(match[1]!, 10);
  const unit = match[2];
  if (unit === "s") return n * 1000;
  if (unit === "m") return n * 60 * 1000;
  if (unit === "h") return n * 60 * 60 * 1000;
  return n * 24 * 60 * 60 * 1000;
}

export async function authLoginCommand() {
  const apiUrl = getApiBaseUrl();
  intro(chalk.cyan("Roboticela DevKit — Sign in"));

  log.info(`API: ${chalk.dim(apiUrl)}`);

  const device = await apiFetch<{
    deviceCode: string;
    userCode: string;
    verificationUri: string;
    expiresIn: number;
    interval: number;
  }>("/auth/device", { apiUrl });

  console.log();
  console.log(chalk.bold("  Open this URL to approve:"));
  console.log(`  ${chalk.cyan(device.verificationUri)}`);
  console.log();
  console.log(chalk.bold("  Or enter code:"));
  console.log(`  ${chalk.yellow(device.userCode)}`);
  console.log();
  log.info("Dev approve: POST /auth/device/approve with userCode + email");
  console.log(chalk.dim(`  Example: curl -X POST ${apiUrl}/auth/device/approve -d '{"userCode":"${device.userCode}","email":"you@example.com"}'`));
  console.log();

  const s = spinner();
  s.start("Waiting for authorization…");

  const started = Date.now();
  while ((Date.now() - started) < POLL_TIMEOUT_MS) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    try {
      const tokens = await apiFetch<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
        user: { id: string; email: string; name?: string | null };
      }>("/auth/token", {
        apiUrl,
        body: { deviceCode: device.deviceCode, grantType: "device_code" },
      });

      s.stop(chalk.green("Signed in"));
      writeSession({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresAt: Date.now() + tokens.expiresIn * 1000,
        user: tokens.user,
        apiUrl,
      });

      outro(chalk.green(`Welcome, ${tokens.user.email}`));
      return;
    } catch (e) {
      const err = e as { statusCode?: number; code?: string };
      if (err.statusCode === 428 || err.code === "AUTHORIZATION_PENDING") continue;
      s.stop(chalk.red("Authorization failed"));
      log.error((e as Error).message);
      process.exit(1);
    }
  }

  s.stop(chalk.red("Authorization timed out"));
  process.exit(1);
}

export async function authLogoutCommand() {
  const session = readSession();
  if (session) {
    try {
      await apiFetch("/auth/logout", {
        method: "POST",
        token: session.accessToken,
        apiUrl: session.apiUrl,
        body: { refreshToken: session.refreshToken },
      });
    } catch {
      /* ignore */
    }
  }
  clearSession();
  log.success("Signed out.");
}

export async function authStatusCommand() {
  const session = readSession();
  if (!session || !isSessionValid(session)) {
    log.warn("Not signed in. Run 'devkit auth login'.");
    return;
  }
  log.success(`Signed in as ${chalk.cyan(session.user.email)}`);
  log.info(`API: ${session.apiUrl}`);
}