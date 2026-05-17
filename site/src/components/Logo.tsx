export function Logo({ size = 28 }: { size?: number }) {
  // Tilted 3D card mark with a light glint — cyan→violet gradient.
  const w = size * 2;
  const h = size;
  return (
    <svg width={w} height={h} viewBox="0 0 64 32" aria-hidden="true">
      <defs>
        <linearGradient id="tilt-logo-face" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#06b6d4" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="tilt-logo-glare" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      {/* tilted card face */}
      <g transform="rotate(-10 32 16)">
        <rect
          x="14"
          y="5"
          width="36"
          height="22"
          rx="4"
          fill="url(#tilt-logo-face)"
        />
        {/* glare highlight strip */}
        <rect
          x="14"
          y="5"
          width="36"
          height="22"
          rx="4"
          fill="url(#tilt-logo-glare)"
          opacity="0.55"
          style={{ mixBlendMode: "screen" }}
        />
        {/* small specular dot */}
        <circle cx="22" cy="11" r="1.6" fill="rgba(255,255,255,0.9)" />
      </g>
    </svg>
  );
}
