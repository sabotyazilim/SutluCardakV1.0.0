import { createHash, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "sutlu-cardak-admin";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD;
}

export function getAdminPasswordStatus() {
  return Boolean(getAdminPassword());
}

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function createAdminSessionToken() {
  const password = getAdminPassword();
  if (!password) {
    return null;
  }

  return hashValue(`sutlu-cardak:${password}`);
}

export function verifyAdminPassword(password: string) {
  const configuredPassword = getAdminPassword();
  if (!configuredPassword) {
    return "missing-env" as const;
  }

  const submittedHash = Buffer.from(hashValue(password));
  const configuredHash = Buffer.from(hashValue(configuredPassword));

  return submittedHash.length === configuredHash.length && timingSafeEqual(submittedHash, configuredHash);
}

export function isValidAdminSession(token?: string) {
  const expectedToken = createAdminSessionToken();
  return Boolean(token && expectedToken && token === expectedToken);
}
