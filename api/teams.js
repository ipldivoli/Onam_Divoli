import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  try {
    const { rows } = await sql`
      SELECT
        t.id,
        t.name AS team_name,
        p.id AS participant_id,
        p.name AS participant_name
    FROM teams t
    LEFT JOIN participants p
    ON p.team_id = t.id
    ORDER BY t.id, p.name;
    `;

    const groupedTeams = rows.reduce((acc, row) => {
      const teamName = row.team_name || "Unassigned";

      if (!acc[teamName]) {
        acc[teamName] = {
          team: teamName,
          members: [],
        };
      }

      if (row.participant_id) {
        acc[teamName].members.push({
          id: row.participant_id,
          name: row.participant_name,
        });
      }

      return acc;
    }, {});

    const teams = Object.values(groupedTeams);

    res.status(200).json({ teams });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
