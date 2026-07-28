export default function Venue() {
  const venueName = "Pearl Continental Inn International";
  const address = "Kochi, Kerala, India";
  const googleMapsUrl =
    "https://maps.google.com/?q=Pearl+Continental+Inn+International+Kochi";
  const websiteUrl = "https://hotelcontinentalinn.com";

  return (
    <section id="venue" className="venue-section">
      <style>{`
        .venue-section{
                    padding:0px 56px 0px;
          background:linear-gradient(180deg, #0f2218 0%, #0b1710 100%);
          min-height:100vh;
          display:flex;
          justify-content:flex-start;
          flex-direction:column;
          align-items:center;
          scroll-margin-top:-75px;        
          box-sizing:border-box;
          overflow:auto;
        }
        .venue-header{
          text-align:center;
          max-width:760px;
          margin-top:5%;
        }
        .venue-header .eyebrow{ margin-bottom:14px; }
        .venue-header h2{
          font-family:'Cormorant Garamond', serif;
          font-weight:500;
          font-size:clamp(2.2rem, 4.5vw, 3.2rem);
          color:var(--cream);
          letter-spacing:0.03em;
          margin:0;
        }
        .venue-header p{
          margin-top:16px;
          color:rgba(247,241,225,0.8);
          line-height:1.7;
        }
        .venue-card{
          max-width:900px;
          margin:0 auto;
          border:1px solid rgba(201,162,39,0.25);
          background:rgba(255,255,255,0.05);
          padding:32px;
          box-shadow:0 10px 32px rgba(0,0,0,0.16);
        }
        .venue-info{
          display:flex;
          flex-direction:column;
          gap:18px;
        }
        .venue-name{
          font-family:'Cormorant Garamond', serif;
          font-size:1.75rem;
          color:var(--cream);
          margin:0;
        }
        .venue-info p{ margin:0; color:rgba(247,241,225,0.8); line-height:1.7; }
        .venue-links{
          display:flex;
          flex-wrap:wrap;
          gap:12px;
          margin-top:12px;
        }
        .venue-link{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          padding:12px 18px;
          border:1px solid var(--gold-soft);
          color:var(--cream);
          text-decoration:none;
          letter-spacing:0.08em;
          text-transform:uppercase;
          font-size:0.72rem;
          transition:background 0.25s ease, transform 0.25s ease;
        }
        .venue-link:hover{ background:rgba(201,162,39,0.16); transform:translateY(-1px); }
        @media (max-width:760px){
          .venue-section{ padding:90px 20px 100px; }
        }
      `}</style>

      <div className="venue-header">
        <div className="eyebrow">This Year</div>
        <h2>Venue for the Celebration</h2>
        <p>
          Join us at {venueName} for this year’s Onam celebration. Find the location and
          hotel website below for the most direct details.
        </p>
      </div>

      <div className="venue-card">
        <div className="venue-info">
          <h3 className="venue-name">{venueName}</h3>
          <p>{address}</p>
          <p>
            The venue is selected to bring guests together in a festive setting with culture,
            comfort, and warm hospitality.
          </p>
          <div className="venue-links">
            <a className="venue-link" href={googleMapsUrl} target="_blank" rel="noreferrer">
              Open in Google Maps
            </a>
            <a className="venue-link" href={websiteUrl} target="_blank" rel="noreferrer">
              Visit Hotel Website
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
