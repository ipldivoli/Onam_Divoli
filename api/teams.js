import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  try {
    const { rows } = await sql`
      SELECT
        p.id,
        p.name,
        p.team,
        g.name AS game_name
      FROM participants p
      LEFT JOIN games g ON g.id = p.game_id
      ORDER BY p.team, p.name
    `;

    const groupedTeams = rows.reduce((acc, participant) => {
      const teamName = participant.team || "Unassigned";

      if (!acc[teamName]) {
        acc[teamName] = [];
      }

      acc[teamName].push({
        id: participant.id,
        name: participant.name,
        game_name: participant.game_name,
      });

      return acc;
    }, {});

    const teams = Object.entries(groupedTeams).map(([team, members]) => ({
      team,
      members,
    }));

    res.status(200).json({ teams });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
