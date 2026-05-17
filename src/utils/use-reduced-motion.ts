import { useEffect, useState } from "react";

/**
 * Returns whether the user has requested reduced motion via OS settings.
 * Listens for changes and updates accordingly.
 *
 * Returns `false` during SSR — the value is corrected after mount.
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }

    // Safari < 14 fallback
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, []);

  return prefersReducedMotion;
}
