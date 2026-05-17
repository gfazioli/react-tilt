import { Tilt } from "@gfazioli/react-tilt";
import "./Parallax.css";

export function Parallax() {
  return (
    <section className="section parallax" id="parallax">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Depth in layers</span>
          <h2>
            One card. <span className="gradient-text">Three layers.</span> Real depth.
          </h2>
          <p>
            Wrap any child in <code>&lt;Tilt.Layer depth={"{n}"}&gt;</code> and it floats at its own rate. Hover either
            card — closer layers move faster than the background.
          </p>
        </div>

        <div className="parallax-grid">
          <MountainCard />
          <CityCard />
        </div>
      </div>
    </section>
  );
}

function MountainCard() {
  return (
    <Tilt
      radius={20}
      threshold={28}
      hoverScale={1.04}
      perspective={1200}
      transitionDuration={500}
      shadowEffect
      shadowColor="rgba(99, 102, 241, 0.45)"
      shadowBlur={36}
    >
      <article className="px-card px-card-mountain" aria-label="Mountain parallax demo">
        <div className="px-scene">
          <div className="px-sky" aria-hidden="true" />

          <Tilt.Layer depth={1}>
            <div className="px-sun" aria-hidden="true" />
          </Tilt.Layer>

          <Tilt.Layer depth={2}>
            <svg className="px-mountains-back" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 200 L0 140 L70 90 L130 120 L200 70 L270 110 L340 80 L400 130 L400 200 Z" fill="currentColor" />
            </svg>
          </Tilt.Layer>

          <Tilt.Layer depth={3}>
            <svg className="px-mountains-front" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 200 L0 170 L60 120 L140 160 L210 100 L290 150 L360 110 L400 150 L400 200 Z" fill="currentColor" />
            </svg>
          </Tilt.Layer>
        </div>

        <Tilt.Layer depth={2}>
          <header className="px-title">
            <span className="px-eyebrow">National Park</span>
            <h3>Aurora Ridge</h3>
            <p>Sunrise · 2,400m</p>
          </header>
        </Tilt.Layer>
      </article>
    </Tilt>
  );
}

function CityCard() {
  return (
    <Tilt
      radius={20}
      threshold={28}
      hoverScale={1.04}
      perspective={1200}
      transitionDuration={500}
      lightEffect
      lightIntensity={0.25}
      lightColor="rgba(236, 72, 153, 0.35)"
      lightSize={70}
    >
      <article className="px-card px-card-city" aria-label="Cyberpunk parallax demo">
        <div className="px-scene">
          <div className="px-citysky" aria-hidden="true" />

          <Tilt.Layer depth={2}>
            <svg className="px-buildings-far" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">
              <g fill="currentColor">
                <rect x="10" y="110" width="26" height="90" />
                <rect x="42" y="90" width="38" height="110" />
                <rect x="88" y="120" width="32" height="80" />
                <rect x="130" y="80" width="46" height="120" />
                <rect x="184" y="105" width="28" height="95" />
                <rect x="220" y="92" width="42" height="108" />
                <rect x="270" y="115" width="32" height="85" />
                <rect x="310" y="85" width="44" height="115" />
                <rect x="362" y="105" width="32" height="95" />
              </g>
            </svg>
          </Tilt.Layer>

          <Tilt.Layer depth={4}>
            <svg className="px-buildings-mid" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">
              <g fill="currentColor">
                <rect x="0" y="135" width="55" height="65" />
                <rect x="62" y="118" width="58" height="82" />
                <rect x="130" y="128" width="55" height="72" />
                <rect x="195" y="108" width="62" height="92" />
                <rect x="265" y="130" width="50" height="70" />
                <rect x="322" y="120" width="78" height="80" />
              </g>
            </svg>
          </Tilt.Layer>

          <Tilt.Layer depth={5}>
            <div className="px-neon">
              <span className="px-neon-main">NEON</span>
              <span className="px-neon-sub">2049</span>
            </div>
          </Tilt.Layer>
        </div>

        <Tilt.Layer depth={6}>
          <header className="px-title px-title-bottom">
            <span className="px-eyebrow">Tonight</span>
            <h3>Late shift</h3>
            <p>Hover to lean in</p>
          </header>
        </Tilt.Layer>
      </article>
    </Tilt>
  );
}
