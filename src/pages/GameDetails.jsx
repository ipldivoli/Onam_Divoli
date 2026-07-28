import { useNavigate, useParams } from "react-router-dom";

export default function GameDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0E1A14",
        color: "#F7F1E1",
        padding: "40px",
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "12px 20px",
          border: "1px solid #C9A227",
          background: "transparent",
          color: "#C9A227",
          borderRadius: "12px",
          cursor: "pointer",
          marginBottom: "30px",
        }}
      >
        ← Back to Games
      </button>

      <h1>Game #{id}</h1>

      <h2>Participants</h2>

      <p>Participants will come from the database.</p>

      <h2>Matches</h2>

      <p>Matches will come from the database.</p>

      <h2>🏆 Winner</h2>

      <p>Winner will be displayed here.</p>
    </div>
  );
}