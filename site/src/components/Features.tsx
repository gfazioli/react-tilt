import "./Features.css";

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: "Drop-in interactive card",
    body: (
      <>
        Wrap any element in <code>&lt;Tilt&gt;</code> and it instantly gets cursor-driven parallax tilt and a gentle
        hover scale. No setup, no refs, no extra CSS — it just works.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "All the effects, optional",
    body: (
      <>
        Opt into <code>lightEffect</code>, <code>glareEffect</code>, <code>shadowEffect</code>, plus background and
        content parallax via <code>&lt;Tilt.Layer&gt;</code>. Compose only what you need.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 2 7l10 5 10-5-10-5Z" />
        <path d="m2 17 10 5 10-5" />
        <path d="m2 12 10 5 10-5" />
      </svg>
    ),
    title: "Themeable via CSS variables",
    body: (
      <>
        Override <code>--rtilt-radius</code> on any selector to theme the card surface. Everything else is a plain
        runtime prop — Mantine-free, framework-agnostic.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
      </svg>
    ),
    title: "Spring physics built in",
    body: (
      <>
        Flip <code>springEffect</code> on and CSS transitions swap for damped harmonic motion. Tune{" "}
        <code>springStiffness</code> and <code>springDamping</code> for the exact feel.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12" y2="18.01" />
      </svg>
    ),
    title: "Mobile, keyboard, gyroscope",
    body: (
      <>
        Touch support is on by default. Opt into <code>gyroscopeEnabled</code> (it even handles the iOS permission
        prompt) and <code>keyboardEnabled</code> for full accessibility.
      </>
    ),
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "TypeScript-first, tiny",
    body: (
      <>
        ~6 KB ESM gzipped, dual ESM + CJS, full <code>.d.ts</code>. Zero runtime dependencies — only React as a peer.
        Plays nice with React 18 &amp; 19 and SSR.
      </>
    ),
  },
];

export function Features() {
  return (
    <section className="section features" id="features">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">What's in the box</span>
          <h2>
            One small surface, <span className="gradient-text">no surprises</span>.
          </h2>
          <p>One component, one optional layer sub-component for depth. Standard React idioms. Standard CSS.</p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
