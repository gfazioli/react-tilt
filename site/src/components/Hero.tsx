import { useEffect, useState } from "react";
import { Tilt } from "@gfazioli/react-tilt";
import { CopyButton } from "./CopyButton";
import { EASING_VALUE } from "../hooks/useThemeConfig";
import { PRESETS } from "../presets";
import "./Hero.css";

export function Hero() {
  const [presetIdx, setPresetIdx] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const presetId = setInterval(() => setPresetIdx((i) => (i + 1) % PRESETS.length), 5000);
    return () => clearInterval(presetId);
  }, []);

  const preset = PRESETS[presetIdx]!;
  const c = preset.config;

  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-inner">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> v1.0 · React 18 &amp; 19
        </span>

        <div className="hero-badge">
          <a
            href="https://www.npmjs.com/package/@gfazioli/react-tilt"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Monthly downloads on npm"
          >
            <img
              src="https://img.shields.io/npm/dm/@gfazioli/react-tilt?style=flat-square&color=8b5cf6"
              alt="npm downloads per month"
              height={20}
            />
          </a>
        </div>

        <h1>
          Cards with depth, <span className="gradient-text">no library bloat</span>.
        </h1>

        <p className="hero-sub">
          A React component that adds parallax tilt, light, glare and shadow to any element. Optional spring physics,
          gyroscope and keyboard support — themeable, fully typed, with <code>zero runtime dependencies</code>.
        </p>

        <div className="hero-cta">
          <CopyButton text="npm install @gfazioli/react-tilt" variant="primary">
            <span className="hero-cta-cmd">
              <span className="hero-cta-prompt">$</span> npm install @gfazioli/react-tilt
            </span>
          </CopyButton>
          <a
            href="https://github.com/gfazioli/react-tilt"
            className="btn btn-secondary"
            target="_blank"
            rel="noreferrer noopener"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a10.97 10.97 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.81-.01 3.19 0 .31.21.67.8.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
            Star on GitHub
          </a>
        </div>

        <div className="hero-showcase" aria-hidden="true">
          <div className="hero-card-stage">
            <Tilt
              radius={18}
              threshold={c.threshold}
              perspective={c.perspective}
              hoverScale={c.hoverScale}
              transitionDuration={c.transitionDuration}
              transitionEasing={EASING_VALUE[c.transitionEasing]}
              springEffect={c.springEffect}
              springStiffness={c.springStiffness}
              springDamping={c.springDamping}
              lightEffect={c.lightEffect}
              glareEffect={c.glareEffect}
              shadowEffect={c.shadowEffect}
            >
              <div className="hero-face hero-face-front">
                <span className="hero-face-eyebrow">Product</span>
                <h3 className="hero-face-title">Aurora Headphones</h3>
                <p className="hero-face-meta">$249 · 24h battery · ANC</p>
                <span className="hero-face-cta">Hover to tilt →</span>
              </div>
            </Tilt>
          </div>
          <div className="hero-showcase-meta">
            <span className="hero-showcase-name">{preset.name}</span>
            <span className="hero-showcase-hint">cycling presets — see all below</span>
          </div>
        </div>
      </div>
    </section>
  );
}
