import { useState } from "react";
import Games from "./components/Games";
import Gallery from "./components/Gallery";
import History from "./components/History";
import Venue from "./components/Venue";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Games", href: "#games" },
    { label: "Gallery", href: "#gallery" },
    { label: "History", href: "#history" },
    { label: "Venue", href: "#venue" },
  ];

  return (
    <div style={{ background: "#0E1A14" }}>
      <style>{`
        :root{
          --cream:#F7F1E1;
          --gold:#C9A227;
          --gold-soft:#E4C868;
          --ink:#0E1A14;
        }
        html{
          scroll-behavior:smooth;
          scroll-padding-top:92px;
        }
        *, *::before, *::after{ box-sizing:border-box; }
        /* Ensure anchor targets offset beneath the fixed nav across browsers (exclude #home) */
section[id]:not(#home)::before{ content:""; display:block; height:92px; margin-top:-92px; visibility:hidden; pointer-events:none; }
        .divoli-root{ font-family:'Jost', sans-serif; color:var(--cream); }

        .frame{
          position:fixed; inset:14px; border:1px solid var(--gold);
          z-index:40; pointer-events:none;
        }
        .frame::before, .frame::after{
          content:""; position:absolute; width:26px; height:26px;
          //border:1px solid var(--gold-soft);
        }
        .frame::before{ top:-9px; left:-9px; border-right:none; border-bottom:none; }
        .frame::after{ bottom:-9px; right:-9px; border-left:none; border-top:none; }
        @media (max-width:640px){ .frame{ inset:8px; } }

        .hero{ position:relative; height:100vh; width:100%; overflow:hidden; }
        .bg-video{
          position:absolute; top:50%; left:50%; width:100%; height:100%;
          object-fit:cover; transform:translate(-50%,-50%); z-index:1;
          background:radial-gradient(ellipse at center, #1c4a37 0%, #0E1A14 100%);
        }
        .hero-overlay{
          position:absolute; inset:0; z-index:2;
          background:linear-gradient(to bottom, rgba(14,26,20,0.15) 0%, rgba(14,26,20,0.25) 38%, rgba(14,26,20,0.78) 100%);
        }

        nav{
          position:fixed; top:14px; left:14px; right:14px;
          z-index:60; display:flex; align-items:center;
          justify-content:space-between; padding:18px 56px;
          pointer-events:auto;
        }
        .brand{
          display:flex; align-items:baseline; gap:10px;
          font-family:'Cormorant Garamond', serif; font-size:1.5rem;
          letter-spacing:0.04em; color:var(--cream);
        }
        .brand span{
          font-family:'Jost', sans-serif; font-size:0.62rem; letter-spacing:0.22em;
          color:var(--gold-soft); text-transform:uppercase; font-weight:500;
        }
        .nav-links{ display:flex; gap:38px; list-style:none; margin:0; padding:0; }
        .nav-links a{
          color:var(--cream); text-decoration:none; font-size:0.78rem;
          letter-spacing:0.14em; text-transform:uppercase; font-weight:400;
          opacity:0.86; position:relative; transition:opacity 0.25s ease;
        }
        .nav-links a::after{
          content:""; position:absolute; left:0; bottom:-6px; width:0%;
          height:1px; background:var(--gold); transition:width 0.3s ease;
        }
        .nav-links a:hover{ opacity:1; }
        .nav-links a:hover::after{ width:100%; }
        .nav-links a:focus-visible{ outline:1px solid var(--gold-soft); outline-offset:4px; }

        .nav-toggle{
          display:none; background:none; border:1px solid var(--gold-soft);
          color:var(--cream); font-size:0.7rem; letter-spacing:0.12em;
          padding:8px 14px; text-transform:uppercase; cursor:pointer;
        }

        @media (max-width:860px){
          nav{ padding:14px 18px; left:8px; right:8px; }
          .nav-links{ display:none; }
          .nav-toggle{ display:inline-block; }
          .nav-links.open{
            display:flex; flex-direction:column; gap:20px;
            position:absolute; top:64px; right:24px;
            background:rgba(14,26,20,0.92); border:1px solid var(--gold);
            padding:22px 30px;
          }
        }

        .hero-content{
          position:relative; z-index:10; height:calc(100vh - 92px);
          display:flex; flex-direction:column; align-items:center;
          justify-content:center; text-align:center; padding:0 24px;
        }
        .eyebrow{
          font-size:0.72rem; letter-spacing:0.32em; text-transform:uppercase;
          color:var(--gold-soft); margin-bottom:22px; font-weight:500;
        }
        h1{
          font-family:'Cormorant Garamond', serif; font-weight:500;
          font-size:clamp(4.2rem, 13vw, 9.5rem); letter-spacing:0.05em;
          line-height:1; color:var(--cream); margin:0;
          text-shadow:0 4px 40px rgba(0,0,0,0.35);
        }
        .tagline{
          margin-top:26px; font-family:'Cormorant Garamond', serif; font-style:italic;
          font-size:clamp(1.05rem, 2vw, 1.35rem); letter-spacing:0.02em;
          color:var(--cream); opacity:0.92; max-width:520px;
        }
        .divider{ width:64px; height:1px; background:var(--gold); margin:30px 0; }

        .scroll-cue{
          position:absolute; bottom:38px; left:50%; transform:translateX(-50%);
          z-index:10; display:flex; flex-direction:column; align-items:center;
          gap:8px; font-size:0.65rem; letter-spacing:0.2em; text-transform:uppercase;
          color:var(--gold-soft); opacity:0.85;
        }
        .scroll-cue .line{
          width:1px; height:28px;
          background:linear-gradient(to bottom, var(--gold), transparent);
          animation:drip 1.8s ease-in-out infinite;
        }
        @keyframes drip{
          0%{ opacity:0.2; transform:scaleY(0.4); transform-origin:top; }
          50%{ opacity:1; transform:scaleY(1); transform-origin:top; }
          100%{ opacity:0.2; transform:scaleY(0.4); transform-origin:top; }
        }
        @media (prefers-reduced-motion: reduce){ .scroll-cue .line{ animation:none; } }
      `}</style>

      <div className="divoli-root">
        <div className="frame" />

        <section id="home" className="hero">
          {/*
            This video is served from the public/assets folder.
            Put your Onam video at: public/assets/onam-video.mp4
          */}
          <video className="bg-video" autoPlay muted loop playsInline>
            <source src="/assets/onam-video.mp4" type="video/mp4" />
          </video>

          <div className="hero-overlay" />

          <nav>
            <div className="brand">
              DIVOLI <span>Onam</span>
            </div>
            <button
              className="nav-toggle"
              aria-expanded={menuOpen}
              aria-controls="navLinks"
              onClick={() => setMenuOpen((open) => !open)}
            >
              Menu
            </button>
            <ul id="navLinks" className={`nav-links${menuOpen ? " open" : ""}`}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hero-content">
            <div className="eyebrow">Divoli Presents</div>
            <h1>Onam</h1>
            <div className="divider" />
            <p className="tagline">
              Where every petal of the pookalam welcomes Mahabali home.
            </p>
          </div>

        
        </section>

        <Games />
        <Gallery />
        <History />
        <Venue />
      </div>
    </div>
  );
}
