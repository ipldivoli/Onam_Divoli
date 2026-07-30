import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Teams() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTeams() {
      try {
        const res = await fetch("/api/teams");
        if (!res.ok) {
          throw new Error(`API returned ${res.status}`);
        }
        const data = await res.json();
        setTeams(data.teams || []);
      } catch (err) {
        console.error("Error fetching teams from database:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <div className="teams-page">
      <style>{`
        :root {
          --cream: #f7f1e1;
          --gold: #c9a227;
          --gold-soft: #e4c868;
          --ink: #0e1a14;
        }

        .teams-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #102319 0%, #09130d 100%);
          color: var(--cream);
          font-family: "Jost", sans-serif;
          padding: 80px 20px 60px;
        }

        .teams-container {
          max-width: 1180px;
          margin: 0 auto;
        }

        .back-btn{
            position:fixed;
            top:24px;
            left:24px;

            display:flex;
            align-items:center;
            gap:8px;

            padding:12px 22px;

            background:rgba(14,26,20,.95);
            color:var(--cream);

            border:1px solid var(--gold);
            border-radius:10px;

            cursor:pointer;
            transition:.3s;

            z-index:1000;
        }

        .back-btn:hover{
            background:var(--gold);
            color:#000;
        }

        .page-title {
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(2.2rem, 4vw, 3rem);
          margin: 0 0 12px;
        }

        .page-subtitle {
          color: rgba(247, 241, 225, 0.8);
          max-width: 760px;
          margin-bottom: 32px;
          line-height: 1.7;
        }

        .teams-grid{
            display:grid;
            grid-template-columns:repeat(2,1fr);
            gap:30px;
        }

        .team-card{
            background:rgba(255,255,255,.05);
            border:1px solid rgba(201,162,39,.25);
            border-radius:18px;
            padding:24px;
        }

        .team-title{
            text-align:center;
            color:var(--gold);
            margin-bottom:20px;
            font-size:28px;
            font-family:"Cormorant Garamond", serif;
        }

        .member-item{
            display:block;
            padding:10px 0;
            border-bottom:1px solid rgba(255,255,255,.08);
        }

        .member-name{
            font-size:18px;
            font-weight:500;
        }

        @media(max-width:900px){
            .teams-grid{
                grid-template-columns:1fr;
            }
        }

        .team-title {
          color: var(--gold-soft);
          font-family: "Cormorant Garamond", serif;
          font-size: 1.35rem;
          margin: 0 0 14px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .member-list {
          display: grid;
          gap: 10px;
        }

        .member-item {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .member-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .member-name {
          font-weight: 600;
        }

        .member-game {
          color: rgba(247, 241, 225, 0.7);
          font-size: 0.95rem;
        }

        @media (max-width: 640px) {
          .member-item {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="teams-container">
        <button className="back-btn" onClick={() => navigate("/")}>← Back home</button>

        <h1 className="page-title">Teams</h1>
        <p className="page-subtitle">
          The participating teams and their members are listed here, pulled from the database.
        </p>

        {loading ? (
          <p>Loading teams from database...</p>
        ) : error ? (
          <p style={{ color: "#ff6b6b" }}>Error loading teams: {error}</p>
        ) : teams.length === 0 ? (
          <p>No team data available in the database yet.</p>
        ) : (
          <div className="teams-grid">

            {teams.map((teamGroup) => (

                <section
                    key={teamGroup.team}
                    className="team-card"
                >

                    <h2 className="team-title">
                        {teamGroup.team}
                    </h2>

                    {teamGroup.members.map(member => (

                        <div
                            key={member.id}
                            className="member-item"
                        >
                            <span className="member-name">
                                {member.name}
                            </span>
                        </div>

                    ))}

                </section>

            ))}

            </div>
          
        )}
      </div>
    </div>
  );
}
