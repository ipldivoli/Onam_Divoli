import { sql } from "@vercel/postgres";

export default async function handler(req,res){

    const {id}=req.query;

    try{

        const game=await sql`

            SELECT *
            FROM games
            WHERE id=${id}

        `;

        const participants=await sql`

            SELECT *
            FROM participants
            WHERE game_id=${id}
            ORDER BY id

        `;

        const matches=await sql`

            SELECT *
            FROM matches
            WHERE game_id=${id}
            ORDER BY id

        `;

        res.status(200).json({

            game:game.rows[0],

            participants:participants.rows,

            matches:matches.rows

        });

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            error:err.message

        });

    }

}