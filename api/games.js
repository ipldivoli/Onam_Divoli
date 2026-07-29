import { sql } from "@vercel/postgres";

export default async function handler(req,res){

    try{

        const {rows}=await sql`
            SELECT *
            FROM games
            ORDER BY id
        `;

        res.status(200).json(rows);

    }

    catch(err){

        console.log(err);

        res.status(500).json({
            error:err.message
        });

    }

}