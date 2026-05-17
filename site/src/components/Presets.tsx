import { Tilt } from "@gfazioli/react-tilt";
import { EASING_VALUE, useThemeConfig } from "../hooks/useThemeConfig";
import { PRESETS } from "../presets";
import "./Presets.css";

export function Presets() {
  const { setConfig } = useThemeConfig();

  return (
    <section className="section presets" id="presets">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Preset gallery</span>
          <h2>
            Or start from a <span className="gradient-text">preset</span>.
          </h2>
          <p>Click any card to load it into the builder above. Then tweak, copy, ship.</p>
        </div>

        <div className="presets-grid">
          {PRESETS.map((preset) => {
            const c = preset.config;
            return (
              <button
                key={preset.id}
                type="button"
                className="preset-card"
                onClick={() => {
                  setConfig(preset.config);
                  document.querySelector("#builder")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                aria-label={`Load ${preset.name} preset`}
              >
                <div className="preset-stage">
                  <div className="preset-card-flip">
                    <Tilt
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
                      <article className="preset-mock">
                        <div className="preset-mock-orb" aria-hidden="true" />
                        <header className="preset-mock-header">
                          <span className="preset-mock-tag">{preset.name.split(" ")[0]}</span>
                          <span className="preset-mock-dot" aria-hidden="true" />
                        </header>
                        <div className="preset-mock-title">
                          <span className="preset-mock-eyebrow">Sound</span>
                          <h4>Aurora</h4>
                        </div>
                        <div className="preset-mock-footer">
                          <span className="preset-mock-price">$249</span>
                          <span className="preset-mock-cta">Hover →</span>
                        </div>
                      </article>
                    </Tilt>
                  </div>
                </div>
                <div className="preset-meta">
                  <h3>{preset.name}</h3>
                  <p>{preset.description}</p>
                </div>
                <span className="preset-arrow" aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
