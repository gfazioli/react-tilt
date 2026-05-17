import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TiltContextProvider } from "./Tilt.context";
import { TiltLayer } from "./TiltLayer";
import { useReducedMotion } from "./utils/use-reduced-motion";
import { toCssLength } from "./utils/size";
import classes from "./Tilt.module.css";

/**
 * Props for the Tilt component.
 */
export interface TiltBaseProps {
  /**
   * The threshold value for triggering the parallax effect.
   * @default 40
   */
  threshold?: number;

  /**
   * The perspective value for the parallax effect.
   * With value >= 10000, the perspective is set to 'none'.
   * @default 1000
   */
  perspective?: number;

  /**
   * If true, enables parallax effect on the background.
   * @default false
   */
  backgroundParallax?: boolean;

  /**
   * The threshold value for triggering the background parallax effect.
   * @default 1
   */
  backgroundParallaxThreshold?: number;

  /**
   * If true, enables the parallax effect.
   * @default false
   */
  contentParallax?: boolean;

  /**
   * The distance value for the parallax effect.
   * Only effective when `contentParallax` is true.
   * @default 0
   */
  contentParallaxDistance?: number;

  /**
   * The URL of the background image.
   */
  backgroundImage?: string;

  /**
   * If true, applies a light effect to the parallax content.
   * @default false
   */
  lightEffect?: boolean;

  /**
   * If true, renders the light gradient above the content. If false, behind it.
   * @default false
   */
  lightOverlay?: boolean;

  /**
   * The intensity of the light effect.
   * @default 0.2
   */
  lightIntensity?: number;

  /**
   * The size of the light effect.
   * @default 50
   */
  lightSize?: number;

  /**
   * The color of the light effect. Any CSS color value.
   * @default 'rgba(255, 255, 255, .1)'
   */
  lightColor?: string;

  /**
   * The type of gradient for the light effect.
   * @default 'radial'
   */
  lightGradientType?: "radial" | "linear";

  /**
   * The angle of the light gradient.
   * Only effective when `lightGradientType` is `'linear'`.
   * @default 0
   */
  lightGradientAngle?: number;

  /** The initial rotation X of the tilt component. */
  initialRotationX?: number;

  /** The initial rotation Y of the tilt component. */
  initialRotationY?: number;

  /** The initial rotation Z of the tilt component. */
  initialRotationZ?: number;

  /**
   * The initial perspective of the tilt component.
   * With value >= 10000, the perspective is set to 'none'.
   * @default 1000
   */
  initialPerspective?: number;

  /** The initial skew X of the tilt component. */
  initialSkewX?: number;

  /** The initial skew Y of the tilt component. */
  initialSkewY?: number;

  /**
   * If true, disables the tilt component.
   * @default false
   */
  disabled?: boolean;

  /**
   * If true, resets rotation to initial values when mouse/touch leaves.
   * If false, keeps the last rotation position.
   * @default true
   */
  resetOnLeave?: boolean;

  /**
   * If true, inverts the rotation direction (card tilts away from the cursor).
   * @default false
   */
  invertRotation?: boolean;

  /**
   * Clamps the rotation to a maximum degree value.
   * When set, rotation will not exceed this value in any direction.
   */
  maxRotation?: number;

  /**
   * If true, enables touch interactions on mobile devices.
   * @default true
   */
  touchEnabled?: boolean;

  /**
   * If true, enables gyroscope-based rotation on mobile devices using the DeviceOrientation API.
   * On iOS 13+, permission will be requested on the first user interaction (tap/click).
   * When active, the card tilts based on physical device orientation.
   * @default false
   */
  gyroscopeEnabled?: boolean;

  /**
   * The sensitivity multiplier for gyroscope rotation.
   * Higher values produce more rotation for the same device tilt.
   * @default 1
   */
  gyroscopeSensitivity?: number;

  /**
   * If true, enables spring-based physics animation instead of CSS transitions.
   * Produces more natural, physically-based movement with overshoot and oscillation.
   * @default false
   */
  springEffect?: boolean;

  /**
   * The stiffness of the spring (tension). Higher values produce a snappier response.
   * Only effective when `springEffect` is true.
   * @default 150
   */
  springStiffness?: number;

  /**
   * The damping coefficient of the spring. Higher values reduce oscillation.
   * Only effective when `springEffect` is true.
   * @default 12
   */
  springDamping?: number;

  /**
   * If true, enables keyboard interaction (arrow keys to tilt, Escape to reset).
   * Adds tabIndex, focus styles, and ARIA attributes for accessibility.
   * @default false
   */
  keyboardEnabled?: boolean;

  /**
   * The number of degrees the card rotates per arrow key press.
   * Only effective when `keyboardEnabled` is true.
   * @default 5
   */
  keyboardStep?: number;

  /**
   * The scale factor applied when hovering.
   * Set to 1 for no scaling.
   * @default 1
   */
  hoverScale?: number;

  /**
   * The duration of the transition in milliseconds.
   * @default 300
   */
  transitionDuration?: number;

  /**
   * The easing function for the transition.
   * @default 'ease-out'
   */
  transitionEasing?: string;

  /**
   * If true, enables a dynamic shadow that moves opposite to the card rotation.
   * @default false
   */
  shadowEffect?: boolean;

  /**
   * The color of the dynamic shadow. Any CSS color value.
   * @default 'rgba(0, 0, 0, 0.4)'
   */
  shadowColor?: string;

  /**
   * The blur radius of the dynamic shadow in pixels.
   * @default 30
   */
  shadowBlur?: number;

  /**
   * The multiplier for the shadow offset relative to rotation.
   * Higher values make the shadow move further.
   * @default 0.8
   */
  shadowOffset?: number;

  /**
   * If true, enables a glare reflection effect that follows the cursor.
   * @default false
   */
  glareEffect?: boolean;

  /**
   * The color of the glare highlight. Any CSS color value.
   * @default 'rgba(255, 255, 255, 0.4)'
   */
  glareColor?: string;

  /**
   * The maximum opacity of the glare effect (0 to 1).
   * @default 0.4
   */
  glareMaxOpacity?: number;

  /**
   * The size of the glare band as a percentage (0 to 100).
   * @default 30
   */
  glareSize?: number;

  /**
   * If true, renders the glare on top of the content. If false, renders behind.
   * @default true
   */
  glareOverlay?: boolean;

  /**
   * Border radius of the tilt card. Number is treated as pixels, string passes through.
   */
  radius?: number | string;

  /** Width of the outer wrapper. Number is treated as pixels, string passes through. */
  w?: number | string;

  /** Height of the outer wrapper. Number is treated as pixels, string passes through. */
  h?: number | string;

  /**
   * Callback fired whenever the rotation changes.
   * Receives the current rotation values and hover state.
   */
  onRotationChange?: (values: { rotateX: number; rotateY: number; isHovering: boolean }) => void;

  /** The content to be rendered inside the tilt component. */
  children?: React.ReactNode;
}

// Props passed to the inner card element (the one that visually tilts). Excludes
// the layout/wrapper-related and behavior props consumed by the outer wrapper.
type CardHtmlProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  | "onMouseEnter"
  | "onMouseLeave"
  | "onMouseMove"
  | "onTouchStart"
  | "onTouchMove"
  | "onTouchEnd"
  | "onTouchCancel"
  | "onKeyDown"
  | "onFocus"
  | "onBlur"
  | "onClick"
  | "tabIndex"
  | "role"
>;

export interface TiltProps extends TiltBaseProps, CardHtmlProps {}

const DEFAULTS = {
  threshold: 40,
  perspective: 1000,
  backgroundParallax: false,
  backgroundParallaxThreshold: 1,
  contentParallax: false,
  contentParallaxDistance: 0,
  lightEffect: false,
  lightOverlay: false,
  lightIntensity: 0.2,
  lightSize: 50,
  lightColor: "rgba(255, 255, 255, .1)",
  lightGradientType: "radial" as const,
  lightGradientAngle: 0,
  initialRotationX: 0,
  initialRotationY: 0,
  initialRotationZ: 0,
  initialPerspective: 1000,
  initialSkewX: 0,
  initialSkewY: 0,
  resetOnLeave: true,
  invertRotation: false,
  touchEnabled: true,
  gyroscopeEnabled: false,
  gyroscopeSensitivity: 1,
  springEffect: false,
  springStiffness: 150,
  springDamping: 12,
  keyboardEnabled: false,
  keyboardStep: 5,
  hoverScale: 1,
  transitionDuration: 300,
  transitionEasing: "ease-out",
  shadowEffect: false,
  shadowColor: "rgba(0, 0, 0, 0.4)",
  shadowBlur: 30,
  shadowOffset: 0.8,
  glareEffect: false,
  glareColor: "rgba(255, 255, 255, 0.4)",
  glareMaxOpacity: 0.4,
  glareSize: 30,
  glareOverlay: true,
};

const CHILDREN_CONTAINER_STYLE: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  overflow: "visible",
  zIndex: 1,
};

const TiltComponent = forwardRef<HTMLDivElement, TiltProps>(function Tilt(props, ref) {
  const {
    threshold = DEFAULTS.threshold,
    perspective = DEFAULTS.perspective,
    backgroundParallax = DEFAULTS.backgroundParallax,
    backgroundParallaxThreshold = DEFAULTS.backgroundParallaxThreshold,
    contentParallax = DEFAULTS.contentParallax,
    contentParallaxDistance = DEFAULTS.contentParallaxDistance,
    backgroundImage,
    lightEffect = DEFAULTS.lightEffect,
    lightOverlay = DEFAULTS.lightOverlay,
    lightIntensity = DEFAULTS.lightIntensity,
    lightSize = DEFAULTS.lightSize,
    lightColor = DEFAULTS.lightColor,
    lightGradientType = DEFAULTS.lightGradientType,
    lightGradientAngle = DEFAULTS.lightGradientAngle,
    initialRotationX = DEFAULTS.initialRotationX,
    initialRotationY = DEFAULTS.initialRotationY,
    initialRotationZ = DEFAULTS.initialRotationZ,
    initialPerspective = DEFAULTS.initialPerspective,
    initialSkewX = DEFAULTS.initialSkewX,
    initialSkewY = DEFAULTS.initialSkewY,
    disabled,
    resetOnLeave = DEFAULTS.resetOnLeave,
    invertRotation = DEFAULTS.invertRotation,
    maxRotation,
    touchEnabled = DEFAULTS.touchEnabled,
    gyroscopeEnabled = DEFAULTS.gyroscopeEnabled,
    gyroscopeSensitivity = DEFAULTS.gyroscopeSensitivity,
    springEffect = DEFAULTS.springEffect,
    springStiffness = DEFAULTS.springStiffness,
    springDamping = DEFAULTS.springDamping,
    keyboardEnabled = DEFAULTS.keyboardEnabled,
    keyboardStep = DEFAULTS.keyboardStep,
    hoverScale = DEFAULTS.hoverScale,
    transitionDuration = DEFAULTS.transitionDuration,
    transitionEasing = DEFAULTS.transitionEasing,
    shadowEffect = DEFAULTS.shadowEffect,
    shadowColor = DEFAULTS.shadowColor,
    shadowBlur = DEFAULTS.shadowBlur,
    shadowOffset = DEFAULTS.shadowOffset,
    glareEffect = DEFAULTS.glareEffect,
    glareColor = DEFAULTS.glareColor,
    glareMaxOpacity = DEFAULTS.glareMaxOpacity,
    glareSize = DEFAULTS.glareSize,
    glareOverlay = DEFAULTS.glareOverlay,
    radius,
    onRotationChange,
    w,
    h,
    style,
    className,
    children,
    ...others
  } = props;

  const rafRef = useRef<number>(0);
  const isHoveringRef = useRef(false);
  const rotationRef = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [lightPosition, setLightPosition] = useState({ x: 50, y: 50 });

  // Spring physics refs
  const springRafRef = useRef<number>(0);
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const springVelocityRef = useRef({ x: 0, y: 0 });
  const springPositionRef = useRef({ x: 0, y: 0 });
  const lastFrameTimeRef = useRef(0);
  // Refs for spring params so the running RAF loop always reads current values
  const springStiffnessRef = useRef(0);
  const springDampingRef = useRef(0);

  const prefersReducedMotion = useReducedMotion();

  const isDisabled = disabled || prefersReducedMotion;

  // Ref for onRotationChange to avoid callback cascade
  const onRotationChangeRef = useRef(onRotationChange);
  onRotationChangeRef.current = onRotationChange;

  // Sync spring param refs so the running RAF loop always reads current values
  springStiffnessRef.current = springStiffness;
  springDampingRef.current = springDamping;

  const updateRotation = useCallback((newRotation: { x: number; y: number }) => {
    rotationRef.current = newRotation;
    setRotation(newRotation);
  }, []);

  const clampRotation = useCallback(
    (value: number) => {
      if (maxRotation === undefined) {
        return value;
      }
      return Math.max(-maxRotation, Math.min(maxRotation, value));
    },
    [maxRotation],
  );

  // Spring animation loop
  const springStep = useCallback(
    (timestamp: number) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp;
        springRafRef.current = requestAnimationFrame(springStep);
        return;
      }

      const dt = Math.min((timestamp - lastFrameTimeRef.current) / 1000, 0.064); // cap at ~15fps min
      lastFrameTimeRef.current = timestamp;

      const pos = springPositionRef.current;
      const vel = springVelocityRef.current;
      const target = targetRotationRef.current;

      // Damped harmonic oscillator — read from refs to avoid stale closure
      const stiffness = springStiffnessRef.current;
      const damping = springDampingRef.current;
      const ax = -stiffness * (pos.x - target.x) - damping * vel.x;
      const ay = -stiffness * (pos.y - target.y) - damping * vel.y;

      vel.x += ax * dt;
      vel.y += ay * dt;
      pos.x += vel.x * dt;
      pos.y += vel.y * dt;

      const distX = Math.abs(pos.x - target.x);
      const distY = Math.abs(pos.y - target.y);
      const speedX = Math.abs(vel.x);
      const speedY = Math.abs(vel.y);
      const settled = distX < 0.01 && distY < 0.01 && speedX < 0.01 && speedY < 0.01;

      if (settled) {
        pos.x = target.x;
        pos.y = target.y;
        vel.x = 0;
        vel.y = 0;
        springRafRef.current = 0;
        updateRotation({ x: target.x, y: target.y });
        onRotationChangeRef.current?.({
          rotateX: target.x,
          rotateY: target.y,
          isHovering: isHoveringRef.current,
        });
        return;
      }

      updateRotation({ x: pos.x, y: pos.y });
      onRotationChangeRef.current?.({
        rotateX: pos.x,
        rotateY: pos.y,
        isHovering: isHoveringRef.current,
      });
      springRafRef.current = requestAnimationFrame(springStep);
    },
    [updateRotation],
  );

  const startSpringLoop = useCallback(() => {
    if (springRafRef.current) {
      return;
    }
    lastFrameTimeRef.current = 0;
    springRafRef.current = requestAnimationFrame(springStep);
  }, [springStep]);

  const scheduleUpdate = useCallback(
    (clientX: number, clientY: number, rect: DOMRect) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const sign = invertRotation ? -1 : 1;
        const rotateY = clampRotation(sign * ((mouseX - centerX) / rect.width) * threshold);
        const rotateX = clampRotation(sign * -((mouseY - centerY) / rect.height) * threshold);

        if (springEffect) {
          targetRotationRef.current = { x: rotateX, y: rotateY };
          startSpringLoop();
        } else {
          updateRotation({ x: rotateX, y: rotateY });
          onRotationChangeRef.current?.({ rotateX, rotateY, isHovering: true });
        }

        if (lightEffect || glareEffect) {
          setLightPosition({
            x: (mouseX / rect.width) * 100,
            y: (mouseY / rect.height) * 100,
          });
        }
      });
    },
    [
      threshold,
      lightEffect,
      glareEffect,
      invertRotation,
      clampRotation,
      springEffect,
      startSpringLoop,
      updateRotation,
    ],
  );

  // Gyroscope active flag is referenced inside touch handlers and the orientation
  // effect, so declare it before the handlers.
  const gyroBaselineRef = useRef<{ beta: number; gamma: number } | null>(null);
  const gyroPermissionRef = useRef<"pending" | "requesting" | "granted" | "denied">("pending");
  const gyroActiveRef = useRef(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isHoveringRef.current) {
        return;
      }
      scheduleUpdate(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
    },
    [scheduleUpdate],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isHoveringRef.current || !touchEnabled || gyroActiveRef.current) {
        return;
      }
      const touch = e.touches[0];
      if (touch) {
        scheduleUpdate(touch.clientX, touch.clientY, e.currentTarget.getBoundingClientRect());
      }
    },
    [scheduleUpdate, touchEnabled],
  );

  const activate = useCallback(() => {
    if (!isDisabled) {
      isHoveringRef.current = true;
      setIsHovering(true);
    }
  }, [isDisabled]);

  const deactivate = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }

    const wasHovering = isHoveringRef.current;
    isHoveringRef.current = false;
    setIsHovering(false);
    setLightPosition({ x: 50, y: 50 });

    if (springEffect && resetOnLeave) {
      targetRotationRef.current = { x: 0, y: 0 };
      startSpringLoop();
    } else if (resetOnLeave) {
      updateRotation({ x: 0, y: 0 });
    }

    if (wasHovering && !(springEffect && resetOnLeave)) {
      const current = rotationRef.current;
      const values = resetOnLeave
        ? { rotateX: 0, rotateY: 0 }
        : { rotateX: current.x, rotateY: current.y };
      onRotationChangeRef.current?.({ ...values, isHovering: false });
    }
  }, [resetOnLeave, springEffect, startSpringLoop, updateRotation]);

  const handleTouchStart = useCallback(() => {
    if (touchEnabled && !gyroActiveRef.current) {
      activate();
    }
  }, [touchEnabled, activate]);

  const handleTouchEnd = useCallback(() => {
    if (touchEnabled && !gyroActiveRef.current) {
      deactivate();
    }
  }, [touchEnabled, deactivate]);

  const handleDeviceOrientation = useCallback(
    (e: DeviceOrientationEvent) => {
      if (isDisabled || !gyroscopeEnabled) {
        return;
      }

      const beta = e.beta ?? 0; // front-back tilt (-180 to 180)
      const gamma = e.gamma ?? 0; // left-right tilt (-90 to 90)

      if (!gyroBaselineRef.current) {
        gyroBaselineRef.current = { beta, gamma };
      }

      const sign = invertRotation ? -1 : 1;
      const deltaBeta = beta - gyroBaselineRef.current.beta;
      const deltaGamma = gamma - gyroBaselineRef.current.gamma;

      const rotateX = clampRotation(sign * deltaBeta * gyroscopeSensitivity);
      const rotateY = clampRotation(sign * deltaGamma * gyroscopeSensitivity);

      if (!gyroActiveRef.current) {
        gyroActiveRef.current = true;
        isHoveringRef.current = true;
        setIsHovering(true);
      }

      if (springEffect) {
        targetRotationRef.current = { x: rotateX, y: rotateY };
        startSpringLoop();
      } else {
        updateRotation({ x: rotateX, y: rotateY });
        onRotationChangeRef.current?.({ rotateX, rotateY, isHovering: true });
      }

      if (lightEffect || glareEffect) {
        const lightX = Math.max(0, Math.min(100, 50 + rotateY * 2));
        const lightY = Math.max(0, Math.min(100, 50 - rotateX * 2));
        setLightPosition({ x: lightX, y: lightY });
      }
    },
    [
      isDisabled,
      gyroscopeEnabled,
      gyroscopeSensitivity,
      invertRotation,
      clampRotation,
      lightEffect,
      glareEffect,
      springEffect,
      startSpringLoop,
      updateRotation,
    ],
  );

  const hasDeviceOrientation = typeof window !== "undefined" && "DeviceOrientationEvent" in window;

  const requestGyroscopePermission = useCallback(async () => {
    if (
      !hasDeviceOrientation ||
      !gyroscopeEnabled ||
      isDisabled ||
      gyroPermissionRef.current === "granted" ||
      gyroPermissionRef.current === "requesting"
    ) {
      return;
    }

    gyroPermissionRef.current = "requesting";

    const DeviceOrientationEventTyped = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<"granted" | "denied">;
    };

    if (typeof DeviceOrientationEventTyped.requestPermission === "function") {
      try {
        const permission = await DeviceOrientationEventTyped.requestPermission();
        gyroPermissionRef.current = permission;
      } catch {
        gyroPermissionRef.current = "denied";
      }
    } else {
      gyroPermissionRef.current = "granted";
    }

    if (gyroPermissionRef.current === "granted") {
      gyroBaselineRef.current = null;
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }
  }, [hasDeviceOrientation, gyroscopeEnabled, isDisabled, handleDeviceOrientation]);

  useEffect(() => {
    if (!hasDeviceOrientation || !gyroscopeEnabled || isDisabled) {
      if (hasDeviceOrientation) {
        window.removeEventListener("deviceorientation", handleDeviceOrientation);
      }
      if (gyroActiveRef.current) {
        gyroActiveRef.current = false;
        gyroBaselineRef.current = null;
        isHoveringRef.current = false;
        setIsHovering(false);
        if (resetOnLeave) {
          updateRotation({ x: 0, y: 0 });
        }
        const current = rotationRef.current;
        onRotationChangeRef.current?.({
          rotateX: resetOnLeave ? 0 : current.x,
          rotateY: resetOnLeave ? 0 : current.y,
          isHovering: false,
        });
      }
      return;
    }

    const DeviceOrientationEventTyped = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<"granted" | "denied">;
    };

    if (typeof DeviceOrientationEventTyped.requestPermission !== "function") {
      gyroPermissionRef.current = "granted";
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    } else if (gyroPermissionRef.current === "granted") {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, [hasDeviceOrientation, gyroscopeEnabled, isDisabled, handleDeviceOrientation, resetOnLeave, updateRotation]);

  const handleClick = useCallback(() => {
    if (gyroscopeEnabled && gyroPermissionRef.current === "pending") {
      requestGyroscopePermission();
    }
  }, [gyroscopeEnabled, requestGyroscopePermission]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!keyboardEnabled || isDisabled) {
        return;
      }

      const sign = invertRotation ? -1 : 1;
      const current = rotationRef.current;
      let newX = current.x;
      let newY = current.y;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          newX = clampRotation(current.x + sign * keyboardStep);
          break;
        case "ArrowDown":
          e.preventDefault();
          newX = clampRotation(current.x - sign * keyboardStep);
          break;
        case "ArrowLeft":
          e.preventDefault();
          newY = clampRotation(current.y - sign * keyboardStep);
          break;
        case "ArrowRight":
          e.preventDefault();
          newY = clampRotation(current.y + sign * keyboardStep);
          break;
        case "Escape":
          e.preventDefault();
          newX = 0;
          newY = 0;
          break;
        default:
          return;
      }

      if (!isHoveringRef.current) {
        isHoveringRef.current = true;
        setIsHovering(true);
      }

      if (springEffect) {
        targetRotationRef.current = { x: newX, y: newY };
        startSpringLoop();
      } else {
        updateRotation({ x: newX, y: newY });
        onRotationChangeRef.current?.({ rotateX: newX, rotateY: newY, isHovering: true });
      }
    },
    [
      keyboardEnabled,
      isDisabled,
      invertRotation,
      keyboardStep,
      clampRotation,
      springEffect,
      startSpringLoop,
      updateRotation,
    ],
  );

  const handleFocus = useCallback(() => {
    if (keyboardEnabled && !isDisabled) {
      isHoveringRef.current = true;
      setIsHovering(true);
    }
  }, [keyboardEnabled, isDisabled]);

  const handleBlur = useCallback(() => {
    if (keyboardEnabled) {
      deactivate();
    }
  }, [keyboardEnabled, deactivate]);

  // Deactivate if disabled changes mid-hover
  useEffect(() => {
    if (isDisabled && isHoveringRef.current) {
      deactivate();
    }
  }, [isDisabled, deactivate]);

  // Sync spring state when springEffect is toggled
  useEffect(() => {
    if (springEffect) {
      springPositionRef.current = rotationRef.current;
      springVelocityRef.current = { x: 0, y: 0 };
    } else if (springRafRef.current) {
      cancelAnimationFrame(springRafRef.current);
      springRafRef.current = 0;
      springVelocityRef.current = { x: 0, y: 0 };
      springPositionRef.current = rotationRef.current;
    }
  }, [springEffect]);

  // Reset spring velocity when physics parameters change to avoid residual momentum
  useEffect(() => {
    springVelocityRef.current = { x: 0, y: 0 };
  }, [springStiffness, springDamping]);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (springRafRef.current) {
        cancelAnimationFrame(springRafRef.current);
      }
    };
  }, []);

  const initialPerspectiveValue = initialPerspective < 10000 ? `${initialPerspective}px` : "none";
  const perspectiveValue = perspective < 10000 ? `${perspective}px` : "none";

  const hoverDuration = Math.round(transitionDuration / 3);
  const restDuration = transitionDuration;

  const scaleValue = isHovering && hoverScale !== 1 ? ` scale(${hoverScale})` : "";

  const hasShadowRotation = isHovering || rotation.x !== 0 || rotation.y !== 0;
  const shadowX = hasShadowRotation ? -rotation.y * shadowOffset : 0;
  const shadowY = hasShadowRotation ? rotation.x * shadowOffset : 0;

  const restShadowTransition = shadowEffect
    ? `, box-shadow ${restDuration}ms ${transitionEasing}`
    : "";

  const springBgTransition = springEffect
    ? `background-position ${restDuration}ms ${transitionEasing}${restShadowTransition}`
    : "";

  const cardStyle: React.CSSProperties = {
    transition: prefersReducedMotion
      ? "none"
      : springEffect
        ? springBgTransition
        : isHovering
          ? `transform ${hoverDuration}ms ${transitionEasing}`
          : `transform ${restDuration}ms ${transitionEasing}, background-position ${restDuration}ms ${transitionEasing}${restShadowTransition}`,
    transform: isHovering
      ? `perspective(${perspectiveValue}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${initialRotationZ}deg) skewX(${initialSkewX}deg) skewY(${initialSkewY}deg)${scaleValue}`
      : !resetOnLeave && (rotation.x !== 0 || rotation.y !== 0)
        ? `perspective(${perspectiveValue}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${initialRotationZ}deg) skewX(${initialSkewX}deg) skewY(${initialSkewY}deg)`
        : `perspective(${initialPerspectiveValue}) rotateX(${initialRotationX}deg) rotateY(${initialRotationY}deg) rotateZ(${initialRotationZ}deg) skewX(${initialSkewX}deg) skewY(${initialSkewY}deg)`,
    boxShadow: shadowEffect ? `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}` : undefined,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundPosition: backgroundImage
      ? isHovering && backgroundParallax
        ? `${50 + rotation.y * backgroundParallaxThreshold}% ${50 - rotation.x * backgroundParallaxThreshold}%`
        : backgroundParallax
          ? `${50 + initialRotationY * backgroundParallaxThreshold}% ${50 - initialRotationX * backgroundParallaxThreshold}%`
          : "center center"
      : undefined,
    transformStyle: "preserve-3d",
    overflow: "visible",
    height: h !== undefined ? "100%" : undefined,
  };

  const lightPercentageStart = lightPosition.x - lightSize;

  const gradients = {
    radial: `radial-gradient(circle at ${lightPosition.x}% ${lightPosition.y}%, ${lightColor} ${lightIntensity * 100}%, rgba(255,255,255,0) ${lightSize}%)`,

    linear: `linear-gradient(${lightGradientAngle}deg, rgba(255,255,255,0) ${lightPercentageStart}%, ${lightColor} ${lightPosition.x}%, rgba(255,255,255,0) ${lightPosition.x + lightSize}%)`,
  };

  const lightStyle: React.CSSProperties = lightEffect
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: lightOverlay ? 1 : -1,
        background: gradients[lightGradientType],
        transition: prefersReducedMotion
          ? "none"
          : `background ${restDuration}ms ${transitionEasing}`,
        borderRadius: "inherit",
      }
    : {};

  const glareAngle = isHovering
    ? Math.atan2(lightPosition.y - 50, lightPosition.x - 50) * (180 / Math.PI) + 90
    : 225;
  const glareOpacity = isHovering ? glareMaxOpacity : 0;

  const glareStyle: React.CSSProperties = glareEffect
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: glareOverlay ? 2 : -1,
        background: `linear-gradient(${glareAngle}deg, rgba(255,255,255,0) 0%, ${glareColor} ${50 - glareSize / 2}%, ${glareColor} ${50 + glareSize / 2}%, rgba(255,255,255,0) 100%)`,
        opacity: glareOpacity,
        transition: prefersReducedMotion
          ? "none"
          : `opacity ${restDuration}ms ${transitionEasing}, background ${hoverDuration}ms ${transitionEasing}`,
        borderRadius: "inherit",
      }
    : {};

  const childrenWithParallax = contentParallax
    ? React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const element = child as React.ReactElement<{ style?: React.CSSProperties }>;
          return React.cloneElement(element, {
            style: {
              ...(element.props.style ?? {}),
              transform:
                isHovering || rotation.x !== 0 || rotation.y !== 0
                  ? `translateX(${rotation.y * (index + 1) * contentParallaxDistance}px) translateY(${rotation.x * (index + 1) * -contentParallaxDistance}px)`
                  : "translateX(0px) translateY(0px)",
              transformStyle: "preserve-3d",
              transition:
                prefersReducedMotion || springEffect
                  ? "none"
                  : `transform ${hoverDuration}ms ${transitionEasing}`,
            },
          });
        }
        return child;
      })
    : children;

  const contextValue = useMemo(
    () => ({
      rotation,
      isHovering,
      perspectiveValue,
      hoverDuration,
      restDuration,
      transitionEasing,
      prefersReducedMotion,
      springEffect,
    }),
    [
      rotation,
      isHovering,
      perspectiveValue,
      hoverDuration,
      restDuration,
      transitionEasing,
      prefersReducedMotion,
      springEffect,
    ],
  );

  const radiusValue = toCssLength(radius);
  const widthValue = toCssLength(w);
  const heightValue = toCssLength(h);

  const wrapperStyle: React.CSSProperties = {
    position: "relative",
    overflow: "visible",
    touchAction: touchEnabled && !isDisabled ? "none" : undefined,
    outline: keyboardEnabled ? undefined : "none",
    width: widthValue,
    height: heightValue,
  };

  return (
    <TiltContextProvider value={contextValue}>
      <div
        ref={ref}
        tabIndex={keyboardEnabled ? 0 : undefined}
        role={keyboardEnabled ? "group" : undefined}
        aria-roledescription={keyboardEnabled ? "tilt card" : undefined}
        aria-label={
          keyboardEnabled
            ? "Interactive tilt card. Use arrow keys to tilt, Escape to reset."
            : undefined
        }
        onClick={handleClick}
        onMouseEnter={activate}
        onMouseLeave={deactivate}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={wrapperStyle}
      >
        <div
          className={[classes.root, className].filter(Boolean).join(" ")}
          style={
            {
              ...cardStyle,
              ...style,
              "--rtilt-radius": radiusValue,
            } as React.CSSProperties
          }
          {...others}
        >
          <div style={CHILDREN_CONTAINER_STYLE}>{childrenWithParallax}</div>
          {lightEffect && <div data-tilt-light="" style={lightStyle} />}
          {glareEffect && <div data-tilt-glare="" style={glareStyle} />}
        </div>
      </div>
    </TiltContextProvider>
  );
});

TiltComponent.displayName = "Tilt";

export const Tilt = Object.assign(TiltComponent, {
  Layer: TiltLayer,
  classes,
});
