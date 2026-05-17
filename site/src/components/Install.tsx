import { useState } from "react";
import { CopyButton } from "./CopyButton";
import { CodeBlock } from "./CodeBlock";
import "./Install.css";

const TABS = [
  { id: "npm", label: "npm", cmd: "npm install @gfazioli/react-tilt" },
  { id: "pnpm", label: "pnpm", cmd: "pnpm add @gfazioli/react-tilt" },
  { id: "yarn", label: "yarn", cmd: "yarn add @gfazioli/react-tilt" },
] as const;

const USAGE = `import { Tilt } from "@gfazioli/react-tilt";
import "@gfazioli/react-tilt/styles.css";

export function Card() {
  return (
    <Tilt radius={16} lightEffect glareEffect>
      <article className="card">
        <h3>Aurora Headphones</h3>
        <p>$249 · 24h battery · ANC</p>
      </article>
    </Tilt>
  );
}`;

export function Install() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("npm");
  const cmd = TABS.find((t) => t.id === active)!.cmd;

  return (
    <section className="section install" id="install">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Get started</span>
          <h2>
            Two lines to install. <span className="gradient-text">Three to use.</span>
          </h2>
          <p>Requires React 18 or newer. Import the stylesheet once at the top of your app.</p>
        </div>

        <div className="install-grid">
          <div className="install-card">
            <div className="install-tabs" role="tablist">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active === t.id}
                  className={active === t.id ? "active" : ""}
                  onClick={() => setActive(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="install-cmd">
              <CodeBlock code={`$ ${cmd}`} lang="bash" />
              <CopyButton text={cmd} variant="ghost" className="copy-btn-ghost" />
            </div>
          </div>

          <div className="install-card">
            <div className="install-tabs">
              <span className="install-tab-static">Card.tsx</span>
              <span className="install-spacer" />
              <CopyButton text={USAGE} variant="ghost" className="copy-btn-ghost" />
            </div>
            <CodeBlock code={USAGE} lang="tsx" className="install-usage" />
          </div>
        </div>
      </div>
    </section>
  );
}
