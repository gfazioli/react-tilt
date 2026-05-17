/**
 * Coerce a CSS length value: numbers become pixels, strings pass through.
 */
export function toCssLength(value: number | string | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  return typeof value === "number" ? `${value}px` : value;
}
