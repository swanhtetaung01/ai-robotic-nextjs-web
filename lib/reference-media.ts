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
      /** a file in public/reference/, or a full https:// URL (e.g. Cloudinary) */
      src: string;
      /** still frame shown before play. Local import or a URL — strongly
       *  recommended, otherwise the player shows a black rectangle. */
      poster?: StaticImageData | string;
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

/** Derives a poster frame and an mp4-forced delivery URL from a Cloudinary
 *  video URL. Cloudinary decides the delivery format from the URL's own
 *  extension regardless of what was uploaded, so a source ingested as .mov
 *  can still be requested as .mp4 for broad browser support — and a still
 *  frame is just the same URL with an so_0 (seek-offset 0s) transform and a
 *  .jpg extension swapped in, no separate upload required. */
function cloudinaryVideo(url: string) {
  const mp4 = url.replace(/\.\w+$/, ".mp4");
  const poster = url
    .replace("/video/upload/", "/video/upload/so_0/")
    .replace(/\.\w+$/, ".jpg");
  return { src: mp4, poster };
}

/* Deployment photography and video. See public/reference/README.md for what
 * to shoot and how to add more. */
export const media: MediaItem[] = [
  {
    kind: "video",
    ...cloudinaryVideo(
      "https://res.cloudinary.com/ddb7pxqfd/video/upload/v1787586675/Aspirus_Hospital_qkjfoy.mov"
    ),
    alt: "AI Robotic deployment footage from Aspirus Hospital, Wausau, Wisconsin",
    caption: "Aspirus Hospital — Wausau, Wisconsin",
  },
  {
    kind: "video",
    ...cloudinaryVideo(
      "https://res.cloudinary.com/ddb7pxqfd/video/upload/v1787586695/Beacon_Hill_ifegdw.mp4"
    ),
    alt: "AI Robotic deployment footage from Beacon Hill, Detroit, Michigan",
    caption: "Beacon Hill — Detroit, Michigan",
  },
  {
    kind: "video",
    ...cloudinaryVideo(
      "https://res.cloudinary.com/ddb7pxqfd/video/upload/v1787586675/IMG_l9bhes.mp4"
    ),
    alt: "AI Robotic deployment footage from Inn of the Mountain Gods, Albuquerque, New Mexico",
    caption: "Inn of the Mountain Gods — Albuquerque, New Mexico",
  },
];
