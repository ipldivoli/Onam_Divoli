import { useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";

export default function GameDetails(){

    const {id}=useParams();

    const navigate=useNavigate();

    const [game,setGame]=useState(null);

    const [participants,setParticipants]=useState([]);

    const [matches,setMatches]=useState([]);

    useEffect(()=>{

        async function load(){

            const res=await fetch(`/api/game/${id}`);

            const data=await res.json();

            setGame(data.game);

            setParticipants(data.participants);

            setMatches(data.matches);

        }

        load();

    },[id]);

    if(!game){

        return <h2>Loading...</h2>

    }

    return(

        <div style={{padding:"60px"}}>

            <button onClick={()=>navigate("/")}>

                ← Back

            </button>

            <h1>

                {game.name}

            </h1>

            {participants.length>0 && (

                <>

                <h2>Participants</h2>

                {

                    participants.map(p=>

                        <div key={p.id}>

                            {p.name}

                        </div>

                    )

                }

                </>

            )}

            {matches.length>0 && (

                <>

                <h2>

                    Matches

                </h2>

                {

                    matches.map(match=>

                        <div key={match.id}>

                            <b>

                                {match.round}

                            </b>

                            <br/>

                            {match.player1}

                            {" vs "}

                            {match.player2}

                            <br/>

                            Winner :

                            {match.winner}

                            <hr/>

                        </div>

                    )

                }

                </>

            )}

            {game.winner && (

                <>

                <h2>

                     Winner

                </h2>

                <h3>

                    {game.winner}

                </h3>

                </>

            )}

        </div>

    );

}