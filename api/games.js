import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  try {
    const { rows } = await sql`
      SELECT id, name
      FROM games
      ORDER BY id;
    `;

    return res.status(200).json(rows);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: err.message,
    });
  }
}