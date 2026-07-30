import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const menMatches = matches.filter(
  (m) => m.category === "Men"
);

const womenMatches = matches.filter(
  (m) => m.category === "Women"
);

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
          max-width:1700px;
          margin:0 auto;
          padding:0 40px;
        }
}

.content{
    margin-top:30px;
}

        .back-btn{
  position:fixed;
  top:30px;
  left:30px;

  background:transparent;
  border:1px solid var(--gold);
  color:var(--cream);

  padding:12px 22px;
  border-radius:10px;

  cursor:pointer;
  transition:.3s;

  z-index:1000;
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

        .matches-grid{
    display:grid;
    grid-template-columns:repeat(5, minmax(220px,1fr));
    gap:20px;
    margin-top:20px;
}

.matches-wrapper{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:50px;
}

.category{
    display:flex;
    flex-direction:column;
}

.round-title{
    margin:25px 0 15px;
    font-size:22px;
    color:var(--gold);
    font-family:'Cormorant Garamond',serif;
}

.matches-grid{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:16px;
}

.match-card{

    background:rgba(255,255,255,.05);

    border:1px solid rgba(201,162,39,.25);

    border-radius:15px;

    height:120px;

    display:flex;

    justify-content:center;

    align-items:center;

    cursor:pointer;

    transition:.3s;
}

.match-card:hover{

    background:rgba(201,162,39,.12);

    transform:translateY(-4px);

}

.popup-overlay{

    position:fixed;

    inset:0;

    background:rgba(0,0,0,.7);

    display:flex;

    justify-content:center;

    align-items:center;

    z-index:9999;

}

.popup{

    width:420px;

    background:#12251b;

    border:2px solid var(--gold);

    border-radius:20px;

    padding:35px;

    text-align:center;

}

.popup button{

    margin-top:25px;

    padding:10px 25px;

    border:none;

    border-radius:10px;

    cursor:pointer;

}

@media(max-width:1400px){
    .matches-grid{
        grid-template-columns:repeat(4, minmax(220px,1fr));
    }
}

@media(max-width:1100px){
    .matches-grid{
        grid-template-columns:repeat(3, minmax(220px,1fr));
    }
}

@media(max-width:800px){
    .matches-grid{
        grid-template-columns:repeat(2, minmax(220px,1fr));
    }
}

@media(max-width:600px){
    .matches-grid{
        grid-template-columns:1fr;
    }
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

        <div className="content">

        <h1>{game.name}</h1>

        <div>

          

          {matches.length > 0 && (

<div className="matches-wrapper">

    <div className="category">

    <h2>👨 Men's Category</h2>

    <div className="matches-grid">

        {menMatches.map((m,index)=>(

            <div
                key={m.id}
                className="match-card"
                onClick={()=>setSelectedMatch(m)}
            >

                {m.round}

            </div>

        ))}

    </div>

    <div className="winner">

        <h2>Champion</h2>

        <h3>{game.men_winner}</h3>

    </div>

</div>

<div className="category">

    <h2>👩 Women's Category</h2>

    <div className="matches-grid">

        {womenMatches.map((m,index)=>(

            <div
                key={m.id}
                className="match-card"
                onClick={()=>setSelectedMatch(m)}
            >

                {m.round}

            </div>

        ))}

    </div>

    <div className="winner">

        <h2>Champion</h2>

        <h3>{game.women_winner}</h3>

    </div>

</div>

</div>

)}

        </div>
        </div>
        

      </div>
        {selectedMatch && (

<div
    className="popup-overlay"
    onClick={()=>setSelectedMatch(null)}
>

    <div
        className="popup"
        onClick={(e)=>e.stopPropagation()}
    >

        <h2>
    {selectedMatch.category} - {selectedMatch.round}
</h2>

        <br/>

        <strong>{selectedMatch.player1}</strong>

        <br/><br/>

        VS

        <br/><br/>

        <strong>{selectedMatch.player2}</strong>

        <br/><br/>

        Winner

        <br/>

        <h3>{selectedMatch.winner}</h3>

        <button
            onClick={()=>setSelectedMatch(null)}
        >
            Close
        </button>

    </div>

</div>

)}
    </div>
  );
}