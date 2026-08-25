import Image from "next/image";
import { media } from "@/lib/reference-media";
import { Eyebrow } from "@/components/ui";

/** Deployment photography and video. Renders an honest empty state until real
 *  footage exists — stock imagery on a reference page is worse than none. */
export function ReferenceGallery() {
  if (media.length === 0) {
    return (
      <section className="border-t border-line bg-base">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Eyebrow>From site</Eyebrow>
          <h2 className="display mt-4 text-2xl text-snow sm:text-3xl">
            Deployment footage
          </h2>
          <div className="mt-8 border border-dashed border-line p-10 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-fog">
              Photography and video in progress
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-fog">
              Footage from live sites is being collected and will appear here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-line bg-base">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <Eyebrow>From site</Eyebrow>
        <h2 className="display mt-4 text-2xl text-snow sm:text-3xl">
          Deployment footage
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((item, i) => (
            <figure
              key={i}
              className="overflow-hidden border border-line bg-surface"
            >
              <div className="relative aspect-video bg-raise">
                {item.kind === "photo" && (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
                  />
                )}

                {item.kind === "video" && (
                  <video
                    controls
                    preload="metadata"
                    playsInline
                    poster={
                      typeof item.poster === "string"
                        ? item.poster
                        : item.poster?.src
                    }
                    aria-label={item.alt}
                    className="h-full w-full object-cover"
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
                    className="h-full w-full"
                  />
                )}
              </div>

              {item.caption && (
                <figcaption className="border-t border-line px-4 py-3 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-fog">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
