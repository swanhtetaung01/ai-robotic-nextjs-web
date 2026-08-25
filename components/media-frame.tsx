import Image from "next/image";
import type { MediaItem } from "@/lib/reference-media";

/* Written out in full so Tailwind sees the class names — it scans source
 * text, and a composed `object-${focus}` string would never be generated. */
const FOCUS = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
} as const;

const FIT = {
  cover: "object-cover",
  contain: "object-contain",
} as const;

/** One piece of deployment media in a 16:9 frame. Shared by the testimonial
 *  cards and the gallery so footage plays identically wherever it appears.
 *
 *  Everything inside is absolutely positioned. Site footage arrives in
 *  whatever shape the phone was held — 9:16, 4:3, 16:9 — and an in-flow
 *  <video> reports its intrinsic height as a flex item's automatic minimum
 *  size, which overrides `aspect-video` and lets a portrait clip stretch its
 *  card to twice the height of its neighbours. Out of flow, it contributes no
 *  height and the frame is the only thing deciding the shape. */
export function MediaFrame({
  item,
  sizes,
}: {
  item: MediaItem;
  /** responsive widths for photos; ignored by video and YouTube */
  sizes: string;
}) {
  const contain = item.fit === "contain";
  const object = `${FIT[item.fit ?? "cover"]} ${FOCUS[item.focus ?? "center"]}`;
  // Letterbox bars want to read as part of the frame, not as a gap in the
  // card, so they go near-black. bg-raise is only ever seen while loading.
  const ground = contain ? "bg-ink" : "bg-raise";

  return (
    <div className={`relative aspect-video overflow-hidden ${ground}`}>
      {item.kind === "photo" && (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className={object}
          sizes={sizes}
        />
      )}

      {item.kind === "video" && (
        <video
          controls
          preload="metadata"
          playsInline
          poster={
            typeof item.poster === "string" ? item.poster : item.poster?.src
          }
          aria-label={item.alt}
          className={`absolute inset-0 h-full w-full ${object}`}
        >
          <source src={item.src} type="video/mp4" />
        </video>
      )}

      {item.kind === "youtube" && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${item.id}`}
          title={item.alt}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      )}
    </div>
  );
}
