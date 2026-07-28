import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Games() {
  const navigate = useNavigate();

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGames() {
      try {
        const res = await fetch("/api/games");
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, []);

  return (
    <section id="games" className="games-section">
      <style>{`
        .games-section{
          padding:0 56px;
          background:linear-gradient(180deg,#0f2218 0%,#0b1710 100%);
          min-height:100vh;
          display:flex;
          flex-direction:column;
          align-items:center;
          scroll-margin-top:-75px;
        }

        .games-header{
          text-align:center;
          max-width:760px;
          margin-top:5%;
          margin-bottom:40px;
        }

        .games-header h2{
          font-family:'Cormorant Garamond', serif;
          font-size:clamp(2.2rem,4.5vw,3rem);
          color:var(--cream);
          margin:0;
        }

        .games-list{
          width:100%;
          max-width:900px;
          display:flex;
          flex-direction:column;
          gap:18px;
        }

        .game-item{
          display:flex;
          justify-content:space-between;
          align-items:center;

          padding:22px 28px;

          background:rgba(255,255,255,0.04);
          border:1px solid rgba(201,162,39,.25);

          border-radius:18px;

          color:var(--cream);

          cursor:pointer;

          transition:.3s;
        }

        .game-item:hover{
          transform:translateY(-4px);
          border-color:#C9A227;
          background:rgba(201,162,39,.08);
          box-shadow:0 12px 30px rgba(0,0,0,.25);
        }

        .game-name{
          display:flex;
          align-items:center;
          gap:14px;

          font-size:1.1rem;
          font-weight:500;
        }

        .arrow{
          font-size:1.6rem;
          color:#C9A227;
          transition:.3s;
        }

        .game-item:hover .arrow{
          transform:translateX(8px);
        }

        @media(max-width:760px){

          .games-section{
            padding:20px;
          }

          .game-item{
            padding:18px;
          }

        }
      `}</style>

      <div className="games-header">
        <div className="eyebrow">Fun & Games</div>

        <h2>Activities for the Celebration</h2>

        <p
          style={{
            color: "rgba(247,241,225,.8)",
            marginTop: 12,
          }}
        >
          Join in with classic festival games and team challenges.
        </p>
      </div>

      <div className="games-list">
        {loading && <p style={{ color: "#fff" }}>Loading games...</p>}

        {!loading &&
          games.map((game) => (
            <div
              key={game.id}
              className="game-item"
              onClick={() => navigate(`/games/${game.id}`)}
            >
              <div className="game-name">
                🏆 {game.name}
              </div>

              <div className="arrow">
                →
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}