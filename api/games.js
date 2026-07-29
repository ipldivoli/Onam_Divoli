import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  try {
    const db = await sql`SELECT current_database();`;

    const schema = await sql`
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_name='games';
    `;

    return res.status(200).json({
      database: db.rows,
      tables: schema.rows,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}