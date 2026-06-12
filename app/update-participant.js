import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);

  // GET — найти участника по email
  if (req.method === "GET") {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: "Email не указан." });

    const rows = await sql`
      SELECT * FROM participants WHERE email = ${email} LIMIT 1
    `;
    if (rows.length === 0) {
      return res.status(404).json({ error: "Участник с таким email не найден." });
    }
    return res.status(200).json(rows[0]);
  }

  // POST — обновить данные
  if (req.method === "POST") {
    const { participant_id, full_name, full_name_latin, email, grade, school } = req.body;

    if (!participant_id || !full_name || !full_name_latin || !email || !grade || !school) {
      return res.status(400).json({ error: "Заполните все поля." });
    }

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
      return res.status(404).json({ error: "Участник не найден." });
    }
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}