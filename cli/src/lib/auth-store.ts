import { mkdirSync, readFileSync, writeFileSync, existsSync, chmodSync, unlinkSync } from "fs";
import { join } from "path";
import { homedir } from "os";

const SESSION_DIR = join(homedir(), ".roboticela", "sessions");
const SESSION_FILE = join(SESSION_DIR, "auth.json");

export interface StoredSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: { id: string; email: string; name?: string | null };
  apiUrl: string;
}

export function getSessionPath(): string {
  return SESSION_FILE;
}

export function readSession(): StoredSession | null {
  if (!existsSync(SESSION_FILE)) return null;
  try {
    return JSON.parse(readFileSync(SESSION_FILE, "utf-8")) as StoredSession;
  } catch {
    return null;
  }
}

export function writeSession(session: StoredSession): void {
  mkdirSync(SESSION_DIR, { recursive: true });
  writeFileSync(SESSION_FILE, JSON.stringify(session, null, 2) + "\n", { mode: 0o600 });
  try {
    chmodSync(SESSION_FILE, 0o600);
  } catch {
    /* windows */
  }
}

export function clearSession(): void {
  if (existsSync(SESSION_FILE)) unlinkSync(SESSION_FILE);
}

export function isSessionValid(session: StoredSession | null): boolean {
  if (!session?.accessToken) return false;
  return Date.now() < session.expiresAt - 30_000;
}
