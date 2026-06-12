import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { full_name, full_name_latin, email, grade, school } = req.body;

  if (!full_name || !full_name_latin || !email || !grade || !school) {
    return res.status(400).json({ error: "Заполните все поля." });
  }

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(email)) {
    return res.status(400).json({ error: "Некорректный email." });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    await sql`
      INSERT INTO participants (full_name, full_name_latin, email, grade, school)
      VALUES (${full_name}, ${full_name_latin}, ${email}, ${grade}, ${school})
    `;
    return res.status(200).json({ ok: true });
  } catch (e) {
    if (e.message?.includes("unique") || e.code === "23505") {
      return res.status(409).json({ error: "Участник с таким email уже зарегистрирован." });
    }
    console.error(e);
    return res.status(500).json({ error: "Ошибка сервера." });
  }
}