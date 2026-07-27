export default function History() {
  const milestones = [
    {
      year: "2018",
      title: "The first celebration",
      description:
        "Divoli began its Onam journey with a small gathering of colleagues, a hand-made pookalam, and the warmth of shared tradition.",
    },
    {
      year: "2020",
      title: "A bigger spirit",
      description:
        "The celebration grew into a joyful company tradition with festive decorations, cultural performances, and a deeper sense of community.",
    },
    {
      year: "2022",
      title: "Tradition meets togetherness",
      description:
        "Employees came together to celebrate with music, games, and a vibrant display of Kerala heritage that became a yearly highlight.",
    },
    {
      year: "2024",
      title: "A memorable milestone",
      description:
        "Our Onam celebrations became a signature event, reflecting the values of unity, gratitude, and celebration that define Divoli.",
    },
    {
      year: "2025",
      title: "Continuing the legacy",
      description:
        "Each year, the celebration grows richer in meaning, bringing together tradition, creativity, and the spirit of belonging.",
    },
  ];

  return (
    <section id="history" className="history-section">
      <style>{`
        .history-section{
          padding:80px 56px 100px;
          background:linear-gradient(180deg, #11231b 0%, #0e1a14 100%);
          position:relative;
          scroll-margin-top:92px;
          height:100vh;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          box-sizing:border-box;
          overflow:auto;
        }
        .history-header{
          text-align:center;
          margin-bottom:40px;
          max-width:760px;
          margin-left:auto;
          margin-right:auto;
        }
        .history-header .eyebrow{ margin-bottom:14px; }
        .history-header h2{
          font-family:'Cormorant Garamond', serif;
          font-weight:500;
          font-size:clamp(2.3rem, 4.7vw, 3.3rem);
          color:var(--cream);
          letter-spacing:0.03em;
          margin:0;
        }
        .history-header p{
          margin-top:18px;
          color:rgba(247,241,225,0.8);
          font-size:1rem;
          line-height:1.7;
        }
        .history-grid{
          display:grid;
          gap:20px;
          max-width:1060px;
          margin:0 auto;
          grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));
        }
        .history-card{
          border:1px solid rgba(201,162,39,0.28);
          background:rgba(255,255,255,0.04);
          padding:24px;
          min-height:220px;
          box-shadow:0 10px 32px rgba(0,0,0,0.16);
        }
        .history-year{
          display:inline-block;
          font-size:0.72rem;
          letter-spacing:0.2em;
          text-transform:uppercase;
          color:var(--gold-soft);
          margin-bottom:14px;
        }
        .history-card h3{
          font-family:'Cormorant Garamond', serif;
          font-size:1.25rem;
          color:var(--cream);
          margin:0 0 10px;
        }
        .history-card p{
          margin:0;
          color:rgba(247,241,225,0.78);
          line-height:1.7;
          font-size:0.95rem;
        }
        @media (max-width:760px){
          .history-section{ padding:90px 20px 100px; }
        }
      `}</style>

      <div className="history-header">
        <div className="eyebrow">Celebrating Together</div>
        <h2>Our Onam Journey Through the Years</h2>
        <p>
          From humble beginnings to a cherished annual tradition, Divoli has celebrated
          Onam as a reflection of culture, togetherness, and joyful remembrance.
        </p>
      </div>

      <div className="history-grid">
        {milestones.map((item) => (
          <article className="history-card" key={item.year}>
            <span className="history-year">{item.year}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
