/**
 * Resolve the API base from build-time env (Vite).
 */
export function getApiBase(): string {
  return getViteEnvVar("VITE_LOIDE_API_SERVER") || "localhost:8084";
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
