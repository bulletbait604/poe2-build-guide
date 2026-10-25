function defaultRedirectUri() {
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const deploymentHost = process.env.VERCEL_URL?.trim();
  const host =
    process.env.VERCEL_ENV === "production" && productionHost
      ? productionHost
      : deploymentHost || productionHost;
  if (host) return `https://${host}/api/auth/callback`;
  return "http://127.0.0.1:3000/api/auth/callback";
}

export function poeConfig() {
  return {
    clientId: process.env.POE_CLIENT_ID?.trim() ?? "",
    clientSecret: process.env.POE_CLIENT_SECRET?.trim() ?? "",
    redirectUri: process.env.POE_REDIRECT_URI?.trim() || defaultRedirectUri(),
    contact: process.env.POE_CONTACT_EMAIL?.trim() || "poe2-build-guide",
  };
}

export function poeUserAgent() {
  return `OAuth poe2-build-guide/1.0.0 (contact: ${poeConfig().contact})`;
}

export function ninjaUserAgent() {
  return `poe2-build-guide/1.0.0 (+https://github.com/poe2-build-guide; contact: ${poeConfig().contact}) economy cache, hourly`;
}

export function loginConfigured() {
  return Boolean(poeConfig().clientId);
}

export function ladderConfigured() {
  const config = poeConfig();
  return Boolean(config.clientId && config.clientSecret);
}

export function appOrigin(request?: { nextUrl: URL }) {
  if (!process.env.POE_REDIRECT_URI?.trim() && request) {
    return request.nextUrl.origin;
  }
  try {
    return new URL(poeConfig().redirectUri).origin;
  } catch {
    return "http://127.0.0.1:3000";
  }
}
