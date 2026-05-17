import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type EasingKey = "ease-out" | "ease-in-out" | "ease" | "ease-in" | "linear" | "cubic-snappy";

export const EASING_VALUE: Record<EasingKey, string> = {
  "ease-out": "ease-out",
  "ease-in-out": "ease-in-out",
  ease: "ease",
  "ease-in": "ease-in",
  linear: "linear",
  "cubic-snappy": "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

export interface ThemeConfig {
  threshold: number;
  perspective: number;
  hoverScale: number;
  transitionDuration: number;
  transitionEasing: EasingKey;
  springEffect: boolean;
  springStiffness: number;
  springDamping: number;
  lightEffect: boolean;
  glareEffect: boolean;
  shadowEffect: boolean;
  parallaxDepth: number;
}

export const DEFAULT_CONFIG: ThemeConfig = {
  threshold: 30,
  perspective: 1000,
  hoverScale: 1.03,
  transitionDuration: 300,
  transitionEasing: "ease-out",
  springEffect: false,
  springStiffness: 150,
  springDamping: 12,
  lightEffect: false,
  glareEffect: false,
  shadowEffect: false,
  parallaxDepth: 0,
};

interface ThemeConfigContextValue {
  config: ThemeConfig;
  setConfig: (next: ThemeConfig | ((prev: ThemeConfig) => ThemeConfig)) => void;
  patch: (delta: Partial<ThemeConfig>) => void;
  reset: () => void;
  shareUrl: string;
}

const Ctx = createContext<ThemeConfigContextValue | null>(null);

const ORDER: (keyof ThemeConfig)[] = [
  "threshold",
  "perspective",
  "hoverScale",
  "transitionDuration",
  "transitionEasing",
  "springEffect",
  "springStiffness",
  "springDamping",
  "lightEffect",
  "glareEffect",
  "shadowEffect",
  "parallaxDepth",
];

function encodeConfig(c: ThemeConfig): string {
  const arr = ORDER.map(k => c[k]);
  return btoa(JSON.stringify(arr)).replace(/=+$/, "");
}

function decodeConfig(token: string): ThemeConfig | null {
  try {
    const padded = token + "=".repeat((4 - (token.length % 4)) % 4);
    const arr = JSON.parse(atob(padded)) as Array<unknown>;
    if (!Array.isArray(arr) || arr.length !== ORDER.length) return null;
    const next = { ...DEFAULT_CONFIG };
    ORDER.forEach((k, i) => {
      const val = arr[i];
      const def = DEFAULT_CONFIG[k];
      if (typeof def === typeof val) {
        (next as Record<string, unknown>)[k] = val;
      }
    });
    return next;
  } catch {
    return null;
  }
}

export function ThemeConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<ThemeConfig>(() => {
    if (typeof window === "undefined") return DEFAULT_CONFIG;
    const param = new URLSearchParams(window.location.search).get("t");
    if (!param) return DEFAULT_CONFIG;
    return decodeConfig(param) ?? DEFAULT_CONFIG;
  });

  const setConfig = useCallback((next: ThemeConfig | ((prev: ThemeConfig) => ThemeConfig)) => {
    setConfigState(prev => (typeof next === "function" ? (next as (p: ThemeConfig) => ThemeConfig)(prev) : next));
  }, []);

  const patch = useCallback((delta: Partial<ThemeConfig>) => {
    setConfigState(prev => ({ ...prev, ...delta }));
  }, []);

  const reset = useCallback(() => setConfigState(DEFAULT_CONFIG), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const isDefault = ORDER.every(k => config[k] === DEFAULT_CONFIG[k]);
    if (isDefault) {
      url.searchParams.delete("t");
    } else {
      url.searchParams.set("t", encodeConfig(config));
    }
    window.history.replaceState(null, "", url.toString());
  }, [config]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    const isDefault = ORDER.every(k => config[k] === DEFAULT_CONFIG[k]);
    if (isDefault) url.searchParams.delete("t");
    else url.searchParams.set("t", encodeConfig(config));
    return url.toString();
  }, [config]);

  const value = useMemo(
    () => ({ config, setConfig, patch, reset, shareUrl }),
    [config, setConfig, patch, reset, shareUrl],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useThemeConfig() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useThemeConfig must be used within ThemeConfigProvider");
  return v;
}
