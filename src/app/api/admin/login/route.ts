import { NextResponse, type NextRequest } from "next/server";

const ADMIN_PASSWORD = "$YXg8sr?8&&Y?Bb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const password = String(body.password ?? "");

    console.log("API Login attempt - received password:", password);
    console.log("API Login attempt - expected password:", ADMIN_PASSWORD);
    console.log("Match status:", password === ADMIN_PASSWORD);

    if (password !== ADMIN_PASSWORD && password.trim() !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "كلمة المرور غير صحيحة. تحقق منها وحاول مرة أخرى." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ success: true }, { status: 200 });

    const isHttps =
      request.headers.get("x-forwarded-proto") === "https" ||
      request.url.startsWith("https");

    // In iframe environments, SameSite=None + Secure is required for cross-origin cookie persistence
    response.cookies.set({
      name: "admin_session",
      value: "true",
      httpOnly: false,
      sameSite: isHttps ? "none" : "lax",
      secure: isHttps,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("API Login error:", error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع أثناء معالجة الطلب." },
      { status: 500 },
    );
  }
}
