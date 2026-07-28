import { useEffect, useState } from "react";

function GalleryTile({ image, index, onOpen }) {
  const [broken, setBroken] = useState(false);

  return (
    <button
      className="gallery-tile"
      onClick={() => onOpen(index)}
      aria-label={`View image: ${image.alt}`}
    >
      {!broken ? (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="gallery-placeholder">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
            <circle cx="15" cy="15" r="13" stroke="#C9A227" strokeWidth="1" />
            <circle cx="15" cy="15" r="3" fill="#C9A227" />
          </svg>
          <span>{image.alt}</span>
        </div>
      )}
      <div className="gallery-tile-caption">{image.alt}</div>
    </button>
  );
}

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setImages(data.images || []);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const close = () => setOpenIndex(null);
  const showPrev = () =>
    setOpenIndex((i) => (i - 1 + images.length) % images.length);
  const showNext = () => setOpenIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, images.length]);

  return (
    <section id="gallery" className="gallery-section">
      <style>{`
        .gallery-section{
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
        .gallery-header{
          text-align:center;
          margin-bottom:40px;
          max-width:760px;
          margin-left:auto;
          margin-right:auto;
          margin-top:5%;
        }
        .gallery-header .eyebrow{ margin-bottom:14px; }
        .gallery-header h2{
          font-family:'Cormorant Garamond', serif;
          font-weight:500;
          font-size:clamp(2.4rem, 5vw, 3.6rem);
          color:var(--cream);
          letter-spacing:0.03em;
        }
        .gallery-header .divider{ margin:22px auto 0; }

        .gallery-grid{
          display:grid;
          grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));
          gap:6px;
          max-width:1280px;
          margin:0 auto;
        }

        .gallery-tile{
          position:relative;
          aspect-ratio:1 / 1;
          overflow:hidden;
          border:none;
          padding:0;
          cursor:pointer;
          background:#132a20;
        }
        .gallery-tile img{
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
          transition:transform 0.6s ease, filter 0.6s ease;
          filter:saturate(0.92);
        }
        .gallery-tile:hover img{
          transform:scale(1.06);
          filter:saturate(1.05);
        }
        .gallery-tile:focus-visible{
          outline:1px solid var(--gold-soft);
          outline-offset:-4px;
        }

        .gallery-placeholder{
          width:100%;
          height:100%;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:12px;
          background:radial-gradient(ellipse at center, #1c4a37 0%, #0E1A14 100%);
          border:1px dashed rgba(201,162,39,0.45);
        }
        .gallery-placeholder span{
          font-size:0.7rem;
          letter-spacing:0.08em;
          color:var(--gold-soft);
          opacity:0.75;
          text-align:center;
          padding:0 18px;
        }

        .gallery-tile-caption{
          position:absolute;
          left:0; right:0; bottom:0;
          padding:14px 16px 12px;
          font-size:0.7rem;
          letter-spacing:0.08em;
          color:var(--cream);
          background:linear-gradient(to top, rgba(14,26,20,0.88), transparent);
          transform:translateY(100%);
          transition:transform 0.35s ease;
          text-align:left;
        }
        .gallery-tile:hover .gallery-tile-caption,
        .gallery-tile:focus-visible .gallery-tile-caption{
          transform:translateY(0);
        }

        /* ---------- Lightbox ---------- */
        .lightbox{
          position:fixed;
          inset:0;
          z-index:100;
          background:rgba(8,15,11,0.94);
          display:flex;
          align-items:center;
          justify-content:center;
          padding:40px;
        }
        .lightbox-frame{
          position:relative;
          max-width:min(1000px, 90vw);
          max-height:82vh;
          border:1px solid var(--gold);
          padding:10px;
        }
        .lightbox-frame img{
          display:block;
          max-width:100%;
          max-height:76vh;
          object-fit:contain;
        }
        .lightbox-caption{
          text-align:center;
          margin-top:14px;
          font-family:'Cormorant Garamond', serif;
          font-style:italic;
          color:var(--cream);
          font-size:1.05rem;
        }
        .lightbox-close,
        .lightbox-nav{
          position:absolute;
          background:none;
          border:1px solid var(--gold-soft);
          color:var(--cream);
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .lightbox-close{
          top:-46px;
          right:0;
          width:34px; height:34px;
          font-size:1rem;
        }
        .lightbox-nav{
          top:50%;
          transform:translateY(-50%);
          width:42px; height:42px;
          font-size:1.2rem;
          border-radius:50%;
        }
        .lightbox-nav.prev{ left:-56px; }
        .lightbox-nav.next{ right:-56px; }

        @media (max-width:760px){
          .gallery-section{ padding:90px 20px 100px; }
          .lightbox{ padding:20px; }
          .lightbox-nav.prev{ left:0; top:auto; bottom:-56px; transform:none; }
          .lightbox-nav.next{ right:0; top:auto; bottom:-56px; transform:none; }
          .lightbox-close{ top:-42px; }
        }

        .gallery-status{
          text-align:center;
          color:var(--gold-soft);
          font-size:0.85rem;
          letter-spacing:0.06em;
          opacity:0.75;
          padding:20px 0 10px;
        }
      `}</style>

      <div className="gallery-header">
        <div className="eyebrow">Moments</div>
        <h2>Gallery</h2>
        <div className="divider" />
      </div>

      {status === "loading" && (
        <p className="gallery-status">Loading photos…</p>
      )}

      {status === "error" && (
        <p className="gallery-status">
          Couldn't load the gallery right now — please check back shortly.
        </p>
      )}

      {status === "ready" && images.length === 0 && (
        <p className="gallery-status">No photos uploaded yet.</p>
      )}

      {status === "ready" && images.length > 0 && (
        <div className="gallery-grid">
          {images.map((image, index) => (
            <GalleryTile
              key={image.src}
              image={image}
              index={index}
              onOpen={setOpenIndex}
            />
          ))}
        </div>
      )}

      {openIndex !== null && images[openIndex] && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={images[openIndex].alt}
          onClick={close}
        >
          <div className="lightbox-frame" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={close} aria-label="Close">
              ✕
            </button>
            <button
              className="lightbox-nav prev"
              onClick={showPrev}
              aria-label="Previous image"
            >
              ‹
            </button>
            <img src={images[openIndex].src} alt={images[openIndex].alt} />
            <button
              className="lightbox-nav next"
              onClick={showNext}
              aria-label="Next image"
            >
              ›
            </button>
            <div className="lightbox-caption">{images[openIndex].alt}</div>
          </div>
        </div>
      )}
    </section>
  );
}
