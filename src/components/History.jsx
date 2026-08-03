export default function History() {
  const milestones = [
    {
      year: "2011",
      title: "A Humble Beginning",
      description:
        "Our first Onam celebration was a simple gathering with fewer than ten team members. The celebration took place inside the office, where we created a small Pookkalam and enjoyed a traditional Onam Sadhya together. Though modest in scale, it marked the beginning of a tradition that continues to bring our team together every year.",
    },
    {
      year: "2016",
      title: "Growing Together",
      description:
        "As our team grew, so did our celebrations. Onam became a more vibrant event with the introduction of Maveli, along with fun games and activities that brought everyone together. While the celebration was still held within the office, it reflected the growing spirit and enthusiasm of our expanding team.",
    },
    {
      year: "2022",
      title: "A New Milestone",
      description:
        "For the first time, our Onam celebration (onapoovili) moved beyond the office to a dedicated event hall. The larger venue allowed us to organize a more memorable celebration featuring Maveli, traditional games such as Vadam Vali (Tug of War), and a grand festive atmosphere. This year was especially memorable as we were joined by colleagues from our parent company in Belgium, making the occasion even more special.",
    },
    {
      year: "2023",
      title: "Building on the Tradition",
      description:
        "Following the success of the previous year, we once again celebrated Onam (Maveli ka Hukkum) at an external venue. The event featured Maveli, Vadam Vali, and a variety of activities that encouraged teamwork and strengthened the bonds among colleagues. It was another memorable celebration filled with festive spirit.",
    },
    {
      year: "2024",
      title: "Celebrating as One Team",
      description:
        "Our Onam celebrations (Avesham) continued to grow, bringing together employees and their families for another enjoyable gathering outside the office. Traditional elements such as Maveli, Vadam Vali, cultural activities, and a delicious Onam Sadhya made the day a wonderful celebration of Kerala's rich heritage and our shared team spirit.",
    },
    {
      year: "2025",
      title: "Keeping the Tradition Alive",
      description:
        "By 2025, our Onam celebration (Ethu Mood Onam Mood) had become one of the most anticipated events of the year. Hosted once again at an external venue, the event featured Maveli, exciting games including Vadam Vali, cultural performances, and the traditional Onam Sadhya. It was a celebration of togetherness, reflecting how our organization has grown while continuing to cherish the traditions that unite us.",
    },
  ];

  return (
    <section id="history" className="history-section">
      <style>{`
        .history-section{
          padding:80px 56px 100px;
          background:linear-gradient(180deg, #11231b 0%, #0e1a14 100%);
          position:relative;
         scroll-margin-top:-75px;
          height:auto;
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
          margin-top:5%;
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
