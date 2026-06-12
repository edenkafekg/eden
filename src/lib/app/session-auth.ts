import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const STAFF_COOKIE = "eden_staff";
const PIN_COOKIE = "eden_pin_ok";
const ADMIN_COOKIE = "eden_admin";

export type StaffSession = {
  kind: "staff";
  shiftId: string;
  staffId: string;
  staffName: string;
};

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("AUTH_SECRET mora biti postavljen (min 16 karaktera)");
  }
  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", getAuthSecret()).update(payload).digest("base64url");
}

function encodeSession(data: object) {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64url");
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

function decodeSession<T>(value: string): T | null {
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as T;
  } catch {
    return null;
  }
}

export async function setStaffSession(session: StaffSession) {
  const cookieStore = await cookies();
  cookieStore.set(STAFF_COOKIE, encodeSession(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 16,
  });
}

export async function getStaffSession(): Promise<StaffSession | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(STAFF_COOKIE)?.value;
  if (!value) return null;
  const data = decodeSession<StaffSession>(value);
  if (!data || data.kind !== "staff") return null;
  return data;
}

export async function setPinVerified() {
  const cookieStore = await cookies();
  cookieStore.set(PIN_COOKIE, encodeSession({ kind: "pin", at: Date.now() }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 2,
  });
}

export async function isPinVerified(): Promise<boolean> {
  const cookieStore = await cookies();
  const value = cookieStore.get(PIN_COOKIE)?.value;
  if (!value) return false;
  const data = decodeSession<{ kind: string }>(value);
  return data?.kind === "pin";
}

export async function clearPinVerified() {
  const cookieStore = await cookies();
  cookieStore.delete(PIN_COOKIE);
}

export async function clearStaffSession() {
  const cookieStore = await cookies();
  cookieStore.delete(STAFF_COOKIE);
  cookieStore.delete(PIN_COOKIE);
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, encodeSession({ kind: "admin" }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  const data = decodeSession<{ kind: string }>(value);
  return data?.kind === "admin";
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export function verifyStaffPin(pin: string) {
  const expected = process.env.STAFF_PIN ?? "1234";
  return pin === expected;
}

export function verifyAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}
