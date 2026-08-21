import type { StaticImageData } from "next/image";

export type MediaItem =
  | {
      kind: "photo";
      src: StaticImageData;
      alt: string;
      caption?: string;
    }
  | {
      kind: "video";
      /** file in public/reference/ — e.g. "/reference/aspirus-night.mp4" */
      src: string;
      /** still frame shown before play; strongly recommended */
      poster?: StaticImageData;
      alt: string;
      caption?: string;
    }
  | {
      kind: "youtube";
      /** the id only, not the full URL — e.g. "dQw4w9WgXcQ" */
      id: string;
      alt: string;
      caption?: string;
    };

/* Deployment photography and video.
 *
 * Empty until real footage arrives — the page renders an honest empty state
 * rather than stock imagery, because fake proof on a reference page is worse
 * than no proof. See public/reference/README.md for what to drop in and how
 * to wire it up.
 *
 * Example once you have files:
 *
 *   import aspirus from "@/public/reference/aspirus-corridor.jpg";
 *
 *   export const media: MediaItem[] = [
 *     { kind: "photo", src: aspirus, alt: "L3 cleaning a ward corridor at night",
 *       caption: "Aspirus Hospital, Wausau" },
 *     { kind: "video", src: "/reference/beacon-hill.mp4", poster: beaconStill,
 *       alt: "L50 running a warehouse aisle", caption: "Beacon Hill, Detroit" },
 *   ];
 */
export const media: MediaItem[] = [];
