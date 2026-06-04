export interface Sponsor {
  /** Stable unique key (usually the GitHub handle). */
  key: string;
  /** Display name shown under the avatar. */
  name: string;
  /** GitHub handle — used for the avatar (`https://github.com/<github>.png`). */
  github: string;
  /** Optional override for the link target (defaults to the GitHub profile). */
  href?: string;
}

export const sponsors: Sponsor[] = [{ key: "kastov", name: "kastov", github: "kastov" }];
