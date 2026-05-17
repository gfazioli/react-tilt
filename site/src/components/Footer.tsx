import { Logo } from "./Logo";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo size={16} />
          <span>@gfazioli/react-tilt</span>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <a href="https://www.npmjs.com/package/@gfazioli/react-tilt" target="_blank" rel="noreferrer noopener">
            npm
          </a>
          <a href="https://github.com/gfazioli/react-tilt" target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a href="https://github.com/sponsors/gfazioli" target="_blank" rel="noreferrer noopener">
            Sponsor
          </a>
          <a
            href="https://github.com/gfazioli/react-tilt/blob/main/LICENSE"
            target="_blank"
            rel="noreferrer noopener"
          >
            MIT License
          </a>
        </nav>
        <p className="footer-credit">
          Built with care by{" "}
          <a href="https://gfazioli.github.io" target="_blank" rel="noreferrer noopener">
            @undolog
          </a>
        </p>
      </div>
    </footer>
  );
}
