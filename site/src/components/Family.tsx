import "./Family.css";

const OTHERS = [
  {
    name: "react-flip",
    description:
      "A tiny React component that wraps any two faces and animates a 3D rotation between them — perspective, duration, easing and direction, fully themeable with zero runtime dependencies.",
    site: "https://gfazioli.github.io/react-flip/",
    glyph: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 12h18" />
      </svg>
    ),
  },
  {
    name: "react-toggle-component",
    description:
      "An accessible toggle/switch component with proper ARIA wiring, keyboard support, and CSS-variable theming — controlled or uncontrolled.",
    site: "https://gfazioli.github.io/react-toggle/",
    glyph: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="7" width="20" height="10" rx="5" />
        <circle cx="16" cy="12" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "react-amiga-guru-meditation",
    description:
      "An error boundary that turns runtime errors into the iconic Amiga Guru Meditation screen — themeable, portal-aware, with a full react-error-boundary-style API.",
    site: "https://gfazioli.github.io/react-amiga-guru-meditation/",
    glyph: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M12 9v3" />
        <path d="M12 15h.01" />
      </svg>
    ),
  },
] as const;

export function Family() {
  return (
    <section className="section family" id="family">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Other Undolog components</span>
          <h2>
            More to <span className="gradient-text">play with</span>.
          </h2>
          <p>Small, accessible React components — same philosophy, same toolchain, zero runtime dependencies.</p>
        </div>

        <div className="family-grid">
          {OTHERS.map((c) => (
            <a
              key={c.name}
              className="family-card"
              href={c.site}
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="family-card-glyph">{c.glyph}</div>
              <div className="family-card-body">
                <h3>{c.name}</h3>
                <p>{c.description}</p>
                <span className="family-card-cta">
                  Live demo <span aria-hidden="true">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
