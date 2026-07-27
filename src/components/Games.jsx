export default function Games() {
  const games = [
    "Arm wrestling",
    "Tug of war",
    "Musical chairs",
    "Pookalam competition",
    "Lemon-and-spoon race",
  ];

  return (
    <section id="games" className="games-section">
      <style>{`
        .games-section{
          padding:80px 56px 100px;
          background:linear-gradient(180deg, #0f2218 0%, #0b1710 100%);
          min-height:100vh;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:flex-start;
          scroll-margin-top:110px;
          box-sizing:border-box;
          overflow:auto;
        }
        .games-header{ text-align:center; max-width:760px; margin-bottom:28px; }
        .games-header h2{
          font-family:'Cormorant Garamond', serif;
          font-size:clamp(2.2rem, 4.5vw, 3rem);
          color:var(--cream);
          margin:0;
        }
        .games-list{
          margin-top:18px;
          display:flex;
          gap:12px;
          flex-direction:column;
          align-items:center;
        }
        .game-item{
          border:1px solid rgba(201,162,39,0.18);
          padding:12px 18px;
          min-width:320px;
          max-width:620px;
          color:var(--cream);
          background:rgba(255,255,255,0.02);
          text-align:left;
        }
        @media (max-width:760px){ .game-item{ min-width:unset; width:100%; } }
      `}</style>

      <div className="games-header">
        <div className="eyebrow">Fun & Games</div>
        <h2>Activities for the Celebration</h2>
        <p style={{ color: 'rgba(247,241,225,0.8)', marginTop: 12 }}>
          Join in with classic festival games and team challenges.
        </p>
      </div>

      <div className="games-list">
        {games.map((g) => (
          <div className="game-item" key={g}>
            {g}
          </div>
        ))}
      </div>
    </section>
  );
}
