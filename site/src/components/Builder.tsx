import { useState } from "react";
import { Tilt } from "@gfazioli/react-tilt";
import {
  DEFAULT_CONFIG,
  EASING_VALUE,
  useThemeConfig,
  type EasingKey,
  type ThemeConfig,
} from "../hooks/useThemeConfig";
import { CopyButton } from "./CopyButton";
import { CodeBlock } from "./CodeBlock";
import "./Builder.css";

const EASING_OPTIONS: { id: EasingKey; label: string }[] = [
  { id: "ease-in-out", label: "ease-in-out" },
  { id: "ease", label: "ease" },
  { id: "ease-in", label: "ease-in" },
  { id: "ease-out", label: "ease-out" },
  { id: "linear", label: "linear" },
  { id: "cubic-snappy", label: "cubic-snappy" },
];

export function Builder() {
  const { config, patch, reset, shareUrl } = useThemeConfig();

  return (
    <section className="section builder" id="builder">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Live builder</span>
          <h2>
            Tune it. <span className="gradient-text">Copy it.</span> Ship it.
          </h2>
          <p>Every prop maps to a value. Tweak the controls, share the URL, paste the snippet.</p>
        </div>

        <div className="builder-grid">
          <div className="builder-controls">
            <div className="builder-group">
              <h4>Tilt</h4>
              <div className="builder-rows">
                <NumRow
                  label="Threshold"
                  min={10}
                  max={60}
                  step={1}
                  value={config.threshold}
                  format={v => `${v}°`}
                  onChange={v => patch({ threshold: v })}
                />
                <NumRow
                  label="Perspective"
                  min={200}
                  max={2400}
                  step={50}
                  value={config.perspective}
                  format={v => `${v}px`}
                  onChange={v => patch({ perspective: v })}
                />
                <NumRow
                  label="Hover scale"
                  min={100}
                  max={110}
                  step={1}
                  value={Math.round(config.hoverScale * 100)}
                  format={v => `${(v / 100).toFixed(2)}x`}
                  onChange={v => patch({ hoverScale: v / 100 })}
                />
                <NumRow
                  label="Parallax depth"
                  min={0}
                  max={30}
                  step={1}
                  value={config.parallaxDepth}
                  format={v => (v === 0 ? "off" : `${v}px`)}
                  onChange={v => patch({ parallaxDepth: v })}
                />
              </div>
            </div>

            <div className="builder-group">
              <h4>Transition</h4>
              <div className="builder-rows">
                <NumRow
                  label="Duration"
                  min={100}
                  max={800}
                  step={10}
                  value={config.transitionDuration}
                  format={v => `${v}ms`}
                  onChange={v => patch({ transitionDuration: v })}
                />
              </div>
            </div>

            <PillRow
              title="Easing"
              options={EASING_OPTIONS}
              value={config.transitionEasing}
              onChange={v => patch({ transitionEasing: v })}
            />

            <div className="builder-group">
              <h4>Spring</h4>
              <div className="builder-rows">
                <div className="builder-row builder-row-pills">
                  <div className="builder-pills" role="group" aria-label="Spring effect">
                    <button
                      type="button"
                      className={`builder-pill ${config.springEffect ? "active" : ""}`}
                      onClick={() => patch({ springEffect: !config.springEffect })}
                      aria-pressed={config.springEffect}
                    >
                      {config.springEffect ? "Spring on" : "Spring off"}
                    </button>
                  </div>
                </div>
                {config.springEffect && (
                  <>
                    <NumRow
                      label="Stiffness"
                      min={50}
                      max={400}
                      step={5}
                      value={config.springStiffness}
                      format={v => `${v}`}
                      onChange={v => patch({ springStiffness: v })}
                    />
                    <NumRow
                      label="Damping"
                      min={5}
                      max={30}
                      step={1}
                      value={config.springDamping}
                      format={v => `${v}`}
                      onChange={v => patch({ springDamping: v })}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="builder-group">
              <h4>Effects</h4>
              <div className="builder-rows">
                <div className="builder-row builder-row-pills">
                  <div className="builder-pills" role="group" aria-label="Effects">
                    <button
                      type="button"
                      className={`builder-pill ${config.lightEffect ? "active" : ""}`}
                      onClick={() => patch({ lightEffect: !config.lightEffect })}
                      aria-pressed={config.lightEffect}
                    >
                      Light
                    </button>
                    <button
                      type="button"
                      className={`builder-pill ${config.glareEffect ? "active" : ""}`}
                      onClick={() => patch({ glareEffect: !config.glareEffect })}
                      aria-pressed={config.glareEffect}
                    >
                      Glare
                    </button>
                    <button
                      type="button"
                      className={`builder-pill ${config.shadowEffect ? "active" : ""}`}
                      onClick={() => patch({ shadowEffect: !config.shadowEffect })}
                      aria-pressed={config.shadowEffect}
                    >
                      Shadow
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="builder-actions">
              <button type="button" className="btn btn-secondary" onClick={reset}>
                Reset
              </button>
              <CopyButton text={shareUrl} variant="secondary" label="Copy share URL">
                <span>Share URL</span>
              </CopyButton>
            </div>
          </div>

          <BuilderPreview config={config} />
        </div>
      </div>
    </section>
  );
}

function NumRow({
  label,
  min,
  max,
  step,
  value,
  format,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="builder-row builder-row-num">
      <span className="builder-row-label">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
      <span className="builder-row-value">{format(value)}</span>
    </label>
  );
}

function PillRow<T extends string>({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="builder-group">
      <h4>{title}</h4>
      <div className="builder-rows">
        <div className="builder-row builder-row-pills">
          <div className="builder-pills" role="radiogroup" aria-label={title}>
            {options.map(opt => (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={value === opt.id}
                className={`builder-pill ${value === opt.id ? "active" : ""}`}
                onClick={() => onChange(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BuilderPreview({ config }: { config: ThemeConfig }) {
  const [tab, setTab] = useState<"jsx" | "css">("jsx");

  return (
    <div className="builder-preview">
      <div className="builder-preview-stage">
        <div className="builder-card-stage">
          <Tilt
            threshold={config.threshold}
            perspective={config.perspective}
            hoverScale={config.hoverScale}
            transitionDuration={config.transitionDuration}
            transitionEasing={EASING_VALUE[config.transitionEasing]}
            springEffect={config.springEffect}
            springStiffness={config.springStiffness}
            springDamping={config.springDamping}
            lightEffect={config.lightEffect}
            glareEffect={config.glareEffect}
            shadowEffect={config.shadowEffect}
          >
            <article className="bp-card">
              <div className="bp-card-orb" aria-hidden="true" />
              <Tilt.Layer depth={config.parallaxDepth * 0.4}>
                <span className="bp-card-badge">Pro</span>
              </Tilt.Layer>
              <Tilt.Layer depth={config.parallaxDepth}>
                <div className="bp-card-title">
                  <h3>Aurora</h3>
                  <p>Sound system</p>
                </div>
              </Tilt.Layer>
              <Tilt.Layer depth={config.parallaxDepth * 1.4}>
                <span className="bp-card-amount">$249</span>
              </Tilt.Layer>
            </article>
          </Tilt>
        </div>
      </div>

      <div className="builder-code">
        <div className="builder-code-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === "jsx"}
            className={tab === "jsx" ? "active" : ""}
            onClick={() => setTab("jsx")}
          >
            JSX
          </button>
          <button
            role="tab"
            aria-selected={tab === "css"}
            className={tab === "css" ? "active" : ""}
            onClick={() => setTab("css")}
          >
            CSS
          </button>
          <span className="builder-code-spacer" />
          <CopyButton
            text={tab === "jsx" ? jsxSnippet(config) : cssSnippet()}
            variant="ghost"
            className="copy-btn-ghost"
            label="Copy snippet"
          >
            <span>Copy</span>
          </CopyButton>
        </div>
        <CodeBlock
          code={tab === "jsx" ? jsxSnippet(config) : cssSnippet()}
          lang={tab === "jsx" ? "tsx" : "css"}
          className="builder-code-block"
        />
      </div>
    </div>
  );
}

function jsxSnippet(c: ThemeConfig): string {
  const lines: string[] = [];
  if (c.threshold !== DEFAULT_CONFIG.threshold) lines.push(`  threshold={${c.threshold}}`);
  if (c.perspective !== DEFAULT_CONFIG.perspective) lines.push(`  perspective={${c.perspective}}`);
  if (c.hoverScale !== DEFAULT_CONFIG.hoverScale) lines.push(`  hoverScale={${c.hoverScale}}`);
  if (c.transitionDuration !== DEFAULT_CONFIG.transitionDuration)
    lines.push(`  transitionDuration={${c.transitionDuration}}`);
  if (c.transitionEasing !== DEFAULT_CONFIG.transitionEasing)
    lines.push(`  transitionEasing=${JSON.stringify(EASING_VALUE[c.transitionEasing])}`);
  if (c.springEffect !== DEFAULT_CONFIG.springEffect) lines.push(`  springEffect`);
  if (c.springEffect && c.springStiffness !== DEFAULT_CONFIG.springStiffness)
    lines.push(`  springStiffness={${c.springStiffness}}`);
  if (c.springEffect && c.springDamping !== DEFAULT_CONFIG.springDamping)
    lines.push(`  springDamping={${c.springDamping}}`);
  if (c.lightEffect !== DEFAULT_CONFIG.lightEffect) lines.push(`  lightEffect`);
  if (c.glareEffect !== DEFAULT_CONFIG.glareEffect) lines.push(`  glareEffect`);
  if (c.shadowEffect !== DEFAULT_CONFIG.shadowEffect) lines.push(`  shadowEffect`);

  const hasParallax = c.parallaxDepth !== DEFAULT_CONFIG.parallaxDepth;
  const opener = lines.length === 0 ? "<Tilt>" : `<Tilt\n${lines.join("\n")}\n>`;

  if (hasParallax) {
    return `${opener}
  <article className="card">
    <Tilt.Layer depth={${c.parallaxDepth}}>
      <h3>Title</h3>
    </Tilt.Layer>
    <Tilt.Layer depth={${(c.parallaxDepth * 1.4).toFixed(1)}}>
      <p>Body content moves more — depth multiplies.</p>
    </Tilt.Layer>
  </article>
</Tilt>`;
  }

  return `${opener}
  <Card />
</Tilt>`;
}

function cssSnippet(): string {
  return `.my-tilt {
  --rtilt-radius: 16px;
}`;
}
