import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/game/${id}`);
        const data = await res.json();

        setGame(data.game);
        setParticipants(data.participants || []);
        setMatches(data.matches || []);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [id]);

  if (!game) {
    return (
      <div
        style={{
          background: "#0E1A14",
          color: "#fff",
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontSize: "22px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="game-page">
      <style>{`
        :root{
          --cream:#F7F1E1;
          --gold:#C9A227;
          --green:#0E1A14;
        }

        *{
          box-sizing:border-box;
        }

        .game-page{
          min-height:100vh;
          background:linear-gradient(180deg,#102319 0%,#09130d 100%);
          padding:60px 20px;
          color:var(--cream);
          font-family:'Jost',sans-serif;
        }

        .container{
    width:100%;
    max-width:1400px;
    margin:0;
    padding-left:40px;
    padding-right:40px;
}

        .back-btn{
          background:transparent;
          border:1px solid var(--gold);
          color:var(--cream);
          padding:12px 22px;
          border-radius:10px;
          cursor:pointer;
          transition:.3s;
          margin-bottom:40px;
        }

        .back-btn:hover{
          background:var(--gold);
          color:#000;
        }

        h1{
    font-family:'Cormorant Garamond',serif;
    font-size:56px;
    margin:20px 0 40px;
    text-align:left;
}

        .grid{
    display:grid;
    grid-template-columns:320px 1fr;
    gap:30px;
    align-items:start;
}

        .card{
          background:rgba(255,255,255,.04);
          border:1px solid rgba(201,162,39,.3);
          border-radius:18px;
          padding:25px;
          backdrop-filter:blur(8px);
        }

        .card h2{
          margin-top:0;
          margin-bottom:20px;
          color:var(--gold);
          font-family:'Cormorant Garamond',serif;
        }

        .participant{
          padding:12px;
          margin-bottom:10px;
          border-radius:10px;
          background:rgba(255,255,255,.05);
        }

        .match{
          margin-bottom:20px;
          padding:15px;
          border-radius:12px;
          background:rgba(255,255,255,.05);
        }

        .winner{
          margin-top:35px;
          text-align:left;
          padding:30px;
          border-radius:18px;
          background:rgba(201,162,39,.12);
          border:2px solid var(--gold);
        }

        .winner h2{
          margin-bottom:10px;
          color:var(--gold);
        }

        .winner h3{
          margin:0;
          font-size:32px;
          font-family:'Cormorant Garamond',serif;
        }

        @media(max-width:900px){

          .grid{
            grid-template-columns:1fr;
          }

          h1{
            font-size:42px;
          }

        }

      `}</style>

      <div className="container">

        <button
          className="back-btn"
          onClick={() => navigate("/", { state: { scrollTo: "games" } })}
        >
          ← Back
        </button>

        <h1>{game.name}</h1>

        <div className="grid">

          {participants.length > 0 && (
            <div className="card">
              <h2>👥 Participants</h2>

              {participants.map((p) => (
                <div key={p.id} className="participant">
                  {p.name}
                </div>
              ))}
            </div>
          )}

          {matches.length > 0 && (
            <div className="card">
              <h2>⚔️ Matches</h2>

              {matches.map((m) => (
                <div key={m.id} className="match">
                  <strong>{m.round}</strong>

                  <br /><br />

                  {m.player1} <b>VS</b> {m.player2}

                  <br /><br />

                   Winner : <b>{m.winner}</b>
                </div>
              ))}
            </div>
          )}

        </div>

        {game.winner && (
          <div className="winner">
            <h2> Champion</h2>

            <h3>{game.winner}</h3>
          </div>
        )}

      </div>

    </div>
  );
}