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
  // const [images, setImages] = useState([]);
  // const [status, setStatus] = useState("loading"); // loading | ready | error
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("loading");
  const [openIndex, setOpenIndex] = useState(null);

  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = 4;

  const visibleImages =
    images.length > 0
      ? Array.from({ length: Math.min(visibleCount, images.length) }, (_, i) =>
          images[(startIndex + i) % images.length]
        )
      : [];

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/gallery");

        if (!res.ok) {
          throw new Error("Failed to fetch gallery");
        }

        const data = await res.json();

        setImages(data.images || []);
        setStatus("ready");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }

    loadGallery();
  }, []);

  const close = () => setOpenIndex(null);
  const showPrev = () =>
    setOpenIndex((i) => (i - 1 + images.length) % images.length);
  const showNext = () => setOpenIndex((i) => (i + 1) % images.length);

  const prevImages = () => {
    setStartIndex((prev) =>
      (prev - 1 + images.length) % images.length
    );
  };

  const nextImages = () => {
    setStartIndex((prev) =>
      (prev + 1) % images.length
    );
  };

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
    padding:80px 56px;
    background:linear-gradient(180deg,#0f2218 0%,#0b1710 100%);
    min-height:auto;
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow:hidden;
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

        .gallery-carousel{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:20px;
    width:100%;
    max-width:1500px;
}

.gallery-grid{
    flex:1;
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:18px;
    overflow:hidden;
}

.gallery-arrow{
    width:48px;
    height:48px;

    border-radius:50%;

    border:1px solid var(--gold);

    background:transparent;

    color:var(--cream);

    font-size:26px;

    cursor:pointer;

    transition:.3s;

    flex-shrink:0;
}

.gallery-arrow:hover{

    background:var(--gold);

    color:#0E1A14;

}

        .gallery-tile{
            width:100%;
            aspect-ratio:1/1;
            overflow:hidden;
            border-radius:14px;
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
        /* ---------- Lightbox ---------- */

        .lightbox{
          position:fixed;
          inset:0;
          z-index:1000;
          background:rgba(8,15,11,.92);
          display:flex;
          justify-content:center;
          align-items:center;
        }

        .lightbox-frame{
          position:relative;
          display:flex;
          justify-content:center;
          align-items:center;
          border:none;
          padding:0;
          background:transparent;
          box-shadow:none;
        }

        .lightbox-frame img{
          display:block;
          width:900px;
          height:650px;
          max-width:90vw;
          max-height:85vh;
          object-fit:contain;
          border:none;
          border-radius:8px;
          box-shadow:none;
        }

        .lightbox-caption{
          position:absolute;
          bottom:-35px;
          left:50%;
          transform:translateX(-50%);
          margin:0;
          color:var(--cream);
          font-family:'Cormorant Garamond',serif;
          font-style:italic;
        }

        .lightbox-close{
          position:absolute;
          top:-50px;
          right:0;
          width:36px;
          height:36px;
          border:none;
          background:transparent;
          color:white;
          font-size:24px;
          cursor:pointer;
        }

        .lightbox-nav{
          position:fixed;
          top:50%;
          transform:translateY(-50%);
          width:50px;
          height:50px;
          border:1px solid var(--gold-soft);
          border-radius:50%;
          background:rgba(0,0,0,.25);
          color:white;
          font-size:28px;
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .lightbox-nav.prev{
          left:40px;
        }

        .lightbox-nav.next{
          right:40px;
        }

        .lightbox-nav:hover,
        .lightbox-close:hover{
          color:var(--gold-soft);
        }

       @media(max-width:1024px){

.gallery-grid{

grid-template-columns:repeat(2,1fr);

}

}

@media(max-width:640px){

.gallery-grid{

grid-template-columns:1fr;

}

}

          .lightbox-nav.prev{
            left:12px;
          }

          .lightbox-nav.next{
            right:12px;
          }

          .lightbox-close{
            top:-40px;
          }
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
        <div className="gallery-carousel">

          <button
            className="gallery-arrow left"
            onClick={prevImages}
          >
            ❮
          </button>

          <div className="gallery-grid">

            {visibleImages.map((image, i) => (

              <GalleryTile
                key={image.src}
                image={image}
                index={(startIndex + i) % images.length}
                onOpen={setOpenIndex}
              />

            ))}

          </div>

          <button
            className="gallery-arrow right"
            onClick={nextImages}
          >
            ❯
          </button>

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
          <div
            className="lightbox-frame"
            onClick={(e) => e.stopPropagation()}
          >
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
