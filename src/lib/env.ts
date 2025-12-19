/**
 * Runtime config interface (injected via config.js at container startup)
 */
interface RuntimeConfig {
  LOIDE_API_SERVER?: string;
}

declare global {
  interface Window {
    __RUNTIME_CONFIG__?: RuntimeConfig;
  }
}

/**
 * Resolve the API base from:
 * 1. Runtime config (Docker container env vars) - highest priority
 * 2. Build-time env (Vite) - fallback
 * 3. Default value - last resort
 */
export function getApiBase(): string {
  // First check runtime config (set by Docker at container startup)
  const runtimeConfig = typeof window !== "undefined" ? window.__RUNTIME_CONFIG__ : undefined;
  if (runtimeConfig?.LOIDE_API_SERVER && !runtimeConfig.LOIDE_API_SERVER.startsWith("__")) {
    return runtimeConfig.LOIDE_API_SERVER.replace(/\/+$/, "");
  }

  // Fallback to Vite build-time env
  const viteEnv = getViteEnvVar("VITE_LOIDE_API_SERVER");
  if (viteEnv) {
    return viteEnv;
  }

  // Default fallback
  return "localhost:8084";
}

export function getLoideVersion(): string {
  return APP_VERSION || "unknown";
}

/**
 * Helper to read a Vite env string and remove trailing slashes.
 * Returns empty string when not available.
 */
function getViteEnvVar(varName: string): string {
  const env =
    typeof import.meta !== "undefined"
      ? (import.meta as unknown as { env?: Record<string, unknown> }).env
      : undefined;
  const val = env?.[varName];
  if (typeof val === "string" && val.length > 0) {
    return String(val).replace(/\/+$/, "");
  }
  return "";
}
