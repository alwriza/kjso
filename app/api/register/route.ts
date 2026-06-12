import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { full_name, full_name_latin, email, grade, school } = await req.json();

    if (!full_name || !full_name_latin || !email || !grade || !school) {
      return NextResponse.json({ error: "Заполните все поля." }, { status: 400 });
    }

    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(email)) {
      return NextResponse.json({ error: "Некорректный email." }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL || "");
    const result = await sql`
      INSERT INTO participants (full_name, full_name_latin, email, grade, school)
      VALUES (${full_name}, ${full_name_latin}, ${email}, ${grade}, ${school})
      RETURNING id
    `;

    return NextResponse.json({ ok: true, id: result[0]?.id }, { status: 200 });
  } catch (e: any) {
    if (e.message?.includes("unique") || e.code === "23505") {
      return NextResponse.json(
        { error: "Участник с таким email уже зарегистрирован." },
        { status: 409 }
      );
    }
    console.error(e);
    return NextResponse.json({ error: "Ошибка сервера." }, { status: 500 });
  }
}
