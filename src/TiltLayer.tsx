import React from "react";
import { useTiltContext } from "./Tilt.context";

export interface TiltLayerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The depth multiplier for this layer's parallax movement.
   * Higher values result in more movement.
   * @default 1
   */
  depth?: number;

  /** The content to be rendered inside the layer. */
  children?: React.ReactNode;
}

export const TiltLayer = React.forwardRef<HTMLDivElement, TiltLayerProps>(function TiltLayer(
  { depth = 1, style, children, ...others },
  ref,
) {
  const ctx = useTiltContext();

  const isActive = ctx.isHovering || ctx.rotation.x !== 0 || ctx.rotation.y !== 0;
  const duration = ctx.isHovering ? ctx.hoverDuration : ctx.restDuration;

  const layerStyle: React.CSSProperties = {
    transform: isActive
      ? `translateX(${ctx.rotation.y * depth}px) translateY(${ctx.rotation.x * -depth}px)`
      : "translateX(0px) translateY(0px)",
    transformStyle: "preserve-3d",
    transition:
      ctx.prefersReducedMotion || ctx.springEffect
        ? "none"
        : `transform ${duration}ms ${ctx.transitionEasing}`,
  };

  return (
    <div ref={ref} style={{ ...layerStyle, ...style }} {...others}>
      {children}
    </div>
  );
});

TiltLayer.displayName = "TiltLayer";
