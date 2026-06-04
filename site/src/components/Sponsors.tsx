import { sponsors } from "../data/sponsors";
import "./Sponsors.css";

const SPONSOR_URL = "https://github.com/sponsors/gfazioli";

export function Sponsors() {
  return (
    <section className="section sponsors" id="sponsors">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Support the work</span>
          <h2 className="sponsors-title">SPONSORS</h2>
          <p>
            If my open-source work saves you or your team time, consider sponsoring its development. Sponsors get their
            name or logo featured here and across all my projects' documentation sites.
          </p>
        </div>

        <ul className="sponsors-wall" aria-label="Sponsors">
          {sponsors.map(s => (
            <li key={s.key}>
              <a
                className="sponsor-item"
                href={s.href ?? `https://github.com/${s.github}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  className="sponsor-avatar"
                  src={`https://github.com/${s.github}.png`}
                  alt={s.name}
                  width={72}
                  height={72}
                  loading="lazy"
                />
                <span className="sponsor-name">{s.name}</span>
              </a>
            </li>
          ))}

          <li>
            <a className="sponsor-item sponsor-slot" href={SPONSOR_URL} target="_blank" rel="noreferrer noopener">
              <span className="sponsor-slot-circle" aria-hidden="true">
                +
              </span>
              <span className="sponsor-name">Your logo here</span>
            </a>
          </li>
        </ul>

        <div className="sponsors-cta">
          <a className="sponsors-btn" href={SPONSOR_URL} target="_blank" rel="noreferrer noopener">
            <span aria-hidden="true">❤</span> Become a sponsor
          </a>
        </div>
      </div>
    </section>
  );
}
