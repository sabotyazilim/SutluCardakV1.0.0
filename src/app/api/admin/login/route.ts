import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, createAdminSessionToken, verifyAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { password?: string } | null;
  const password = body?.password;

  if (!password) {
    return NextResponse.json({ message: "Şifre alanı zorunludur." }, { status: 400 });
  }

  const result = verifyAdminPassword(password);
  if (result === "missing-env") {
    return NextResponse.json({ message: "ADMIN_PASSWORD ortam değişkeni tanımlı değil." }, { status: 500 });
  }

  if (!result) {
    return NextResponse.json({ message: "Admin şifresi hatalı." }, { status: 401 });
  }

  const token = createAdminSessionToken();
  const response = NextResponse.json({ message: "Giriş başarılı." });

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: token ?? "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
