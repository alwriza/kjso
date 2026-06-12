import { neon } from "@neondatabase/serverless";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    
    if (!email) {
      return NextResponse.json({ error: "Email не указан." }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL || "");
    const rows = await sql`
      SELECT * FROM participants WHERE email = ${email} LIMIT 1
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Участник с таким email не найден." },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0], { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка сервера." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { participant_id, full_name, full_name_latin, email, grade, school } = await req.json();

    if (!participant_id || !full_name || !full_name_latin || !email || !grade || !school) {
      return NextResponse.json({ error: "Заполните все поля." }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL || "");
    const rows = await sql`
      UPDATE participants
      SET full_name = ${full_name},
          full_name_latin = ${full_name_latin},
          email = ${email},
          grade = ${grade},
          school = ${school},
          updated_at = NOW()
      WHERE id = ${participant_id}
      RETURNING *
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Участник не найден." }, { status: 404 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Ошибка сервера." }, { status: 500 });
  }
}
