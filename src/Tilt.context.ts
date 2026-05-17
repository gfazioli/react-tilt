import { TILT_ERRORS } from "./Tilt.errors";
import { createSafeContext } from "./utils/create-safe-context";

export interface TiltContextValue {
  rotation: { x: number; y: number };
  isHovering: boolean;
  perspectiveValue: string;
  hoverDuration: number;
  restDuration: number;
  transitionEasing: string;
  prefersReducedMotion: boolean;
  springEffect: boolean;
}

export const [TiltContextProvider, useTiltContext] = createSafeContext<TiltContextValue>(
  TILT_ERRORS.context,
);
