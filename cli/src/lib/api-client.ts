export function getApiBaseUrl(): string {
  if (process.env.DEVKIT_API_URL) {
    return process.env.DEVKIT_API_URL.replace(/\/$/, "");
  }
  if (process.env.DEVKIT_REGISTRY) {
    return process.env.DEVKIT_REGISTRY.replace(/\/$/, "");
  }
  // Local monorepo shim (`devkit-test`) defaults to the local API
  if (process.env.DEVKIT_TEST === "1") {
    return "http://localhost:4000";
  }
  return "https://devkit.roboticela.com";
}

export class DevKitApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = "DevKitApiError";
  }
}

export interface ApiFetchOptions {
  method?: string;
  body?: unknown;
  token?: string;
  apiUrl?: string;
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const base = (options.apiUrl ?? getApiBaseUrl()).replace(/\/$/, "");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (options.token) headers.Authorization = `Bearer ${options.token}`;

  const res = await fetch(`${base}${path}`, {
    method: options.method ?? (options.body ? "POST" : "GET"),
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = (await res.json().catch(() => ({}))) as T & { error?: string; code?: string };
  if (!res.ok) {
    throw new DevKitApiError(data.error ?? `HTTP ${res.status}`, res.status, data.code);
  }
  return data;
}

export async function checkApiHealth(apiUrl?: string): Promise<boolean> {
  try {
    const data = await apiFetch<{ status: string }>("/health", { apiUrl });
    return data.status === "ok" || data.status === "degraded";
  } catch {
    return false;
  }
}
