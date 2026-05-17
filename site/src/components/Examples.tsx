import { Tilt } from "@gfazioli/react-tilt";
import "./Examples.css";

export function Examples() {
  return (
    <section className="section examples">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">In context</span>
          <h2>
            Looks like a <span className="gradient-text">real product</span>.
          </h2>
          <p>The same component, dropped into three real-world patterns: product card, stats tile, and profile.</p>
        </div>

        <div className="examples-grid">
          <ProductCard />
          <StatsTile />
          <ProfileCard />
        </div>
      </div>
    </section>
  );
}

function ProductCard() {
  return (
    <article className="example-tile" aria-labelledby="ex-product-title">
      <header>
        <h3 id="ex-product-title">Product card</h3>
        <p>Light follows the cursor and a glare band sweeps across — straight-out-of-the-box studio shine.</p>
      </header>
      <div className="example-stage example-stage-product">
        <Tilt threshold={40} hoverScale={1.04} lightEffect glareEffect>
          <article className="ex-product ex-product-front">
            <span className="ex-product-eyebrow">Headphones</span>
            <h4>Aurora ANC</h4>
            <p>$249 · 24h battery · over-ear</p>
            <span className="ex-product-cta">Hover me →</span>
          </article>
        </Tilt>
      </div>
    </article>
  );
}

function StatsTile() {
  return (
    <article className="example-tile" aria-labelledby="ex-stats-title">
      <header>
        <h3 id="ex-stats-title">Stats tile</h3>
        <p>A dynamic shadow shifts opposite the tilt — the card lifts off the page with real weight.</p>
      </header>
      <div className="example-stage">
        <Tilt threshold={25} shadowEffect>
          <section className="ex-stats">
            <header>
              <span className="ex-stats-eyebrow">MRR</span>
              <span className="ex-stats-trend">+12.4%</span>
            </header>
            <div className="ex-stats-value">$48,290</div>
            <svg className="ex-stats-chart" viewBox="0 0 120 36" preserveAspectRatio="none" aria-hidden="true">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="0,28 14,24 28,26 42,18 56,22 70,12 84,16 98,8 112,10 120,4"
              />
            </svg>
            <footer>
              <span>vs. last month</span>
              <span className="ex-pill ex-pill-on">on track</span>
            </footer>
          </section>
        </Tilt>
      </div>
    </article>
  );
}

function ProfileCard() {
  return (
    <article className="example-tile" aria-labelledby="ex-profile-title">
      <header>
        <h3 id="ex-profile-title">Profile card</h3>
        <p>Spring physics replace CSS transitions for a tactile, slightly bouncy feel on every interaction.</p>
      </header>
      <div className="example-stage">
        <Tilt threshold={30} hoverScale={1.04} springEffect springStiffness={140} springDamping={11}>
          <section className="ex-profile">
            <div className="ex-profile-avatar" aria-hidden="true">
              AL
            </div>
            <h4>Ada Lovelace</h4>
            <p className="ex-profile-role">Founding engineer · Analytics</p>
            <ul className="ex-profile-stats">
              <li>
                <strong>248</strong>
                <span>PRs</span>
              </li>
              <li>
                <strong>34</strong>
                <span>Releases</span>
              </li>
              <li>
                <strong>7</strong>
                <span>Years</span>
              </li>
            </ul>
          </section>
        </Tilt>
      </div>
    </article>
  );
}
