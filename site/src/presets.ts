import { DEFAULT_CONFIG, type ThemeConfig } from "./hooks/useThemeConfig";

export interface Preset {
  id: string;
  name: string;
  description: string;
  config: ThemeConfig;
}

export const PRESETS: Preset[] = [
  {
    id: "default",
    name: "Subtle hover",
    description: "Calm tilt with gentle scale. The right default for product cards and CTAs.",
    config: DEFAULT_CONFIG,
  },
  {
    id: "apple-tv",
    name: "Apple TV card",
    description: "The iconic look: deep tilt, light overlay, glare reflection, mild scale on hover.",
    config: {
      ...DEFAULT_CONFIG,
      threshold: 40,
      hoverScale: 1.05,
      lightEffect: true,
      glareEffect: true,
    },
  },
  {
    id: "gentle-light",
    name: "Gentle light",
    description: "Soft radial light follows the cursor. No glare, no shadow — pure surface.",
    config: {
      ...DEFAULT_CONFIG,
      threshold: 20,
      lightEffect: true,
    },
  },
  {
    id: "glare",
    name: "Studio glare",
    description: "Sharp glare band sweeps across the card as you move the cursor.",
    config: {
      ...DEFAULT_CONFIG,
      threshold: 30,
      glareEffect: true,
    },
  },
  {
    id: "shadow",
    name: "Floating shadow",
    description: "Dynamic shadow shifts opposite the tilt — gives the card real weight.",
    config: {
      ...DEFAULT_CONFIG,
      threshold: 25,
      shadowEffect: true,
    },
  },
  {
    id: "spring",
    name: "Spring physics",
    description: "Replaces CSS transitions with damped spring motion. Tactile and natural.",
    config: {
      ...DEFAULT_CONFIG,
      threshold: 30,
      springEffect: true,
      springStiffness: 120,
      springDamping: 10,
    },
  },
];
