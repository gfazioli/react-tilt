# @gfazioli/react-tilt

> Tilt is a React component that turns any element into an interactive 3D card with parallax, glare, light, shadow, gyroscope, spring physics and keyboard support — themeable via CSS variables, zero runtime dependencies.

## Install

```bash
pnpm add @gfazioli/react-tilt
# or
npm install @gfazioli/react-tilt
# or
yarn add @gfazioli/react-tilt
```

Import the stylesheet once in your app entry point:

```ts
import "@gfazioli/react-tilt/styles.css";
```

## Usage

```tsx
import { Tilt } from "@gfazioli/react-tilt";
import "@gfazioli/react-tilt/styles.css";

export function Card() {
  return (
    <Tilt
      w={320}
      h={200}
      radius={16}
      lightEffect
      glareEffect
      shadowEffect
      hoverScale={1.03}
    >
      <div style={{ padding: 24 }}>Hello, world</div>
    </Tilt>
  );
}
```

## Features

- Mouse / touch / keyboard / gyroscope input
- Optional spring-based physics for natural motion
- Light, glare and dynamic shadow effects
- Background and content parallax
- Layered children via `<Tilt.Layer depth={n} />`
- Respects `prefers-reduced-motion`
- Zero runtime dependencies, ~5 KB gzipped, TypeScript-first

## Props

See [`TiltBaseProps`](./src/Tilt.tsx) for the full list of options.

## License

MIT © Giovambattista Fazioli
