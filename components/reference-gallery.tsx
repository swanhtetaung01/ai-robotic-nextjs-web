import { media, galleryMedia } from "@/lib/reference-media";
import { MediaFrame } from "@/components/media-frame";
import { Eyebrow } from "@/components/ui";

/** Deployment photography and video that isn't tied to a named customer —
 *  anything that is plays on that customer's testimonial card instead.
 *  Renders an honest empty state until real footage exists; stock imagery on
 *  a reference page is worse than none. */
export type GalleryStrings = {
  eyebrow: string;
  heading: string;
  emptyLabel: string;
  emptyBody: string;
};

export function ReferenceGallery({ strings }: { strings: GalleryStrings }) {
  // Every clip is on a card, so a gallery here would either be empty or repeat
  // them. The empty state is for having no footage at all, which isn't the case.
  if (galleryMedia.length === 0 && media.length > 0) return null;

  if (galleryMedia.length === 0) {
    return (
      <section className="border-t border-line bg-base">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <Eyebrow>{strings.eyebrow}</Eyebrow>
          <h2 className="display mt-4 text-2xl text-snow sm:text-3xl">
            {strings.heading}
          </h2>
          <div className="mt-8 border border-dashed border-line p-10 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-fog">
              {strings.emptyLabel}
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-fog">
              {strings.emptyBody}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-line bg-base">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <Eyebrow>{strings.eyebrow}</Eyebrow>
        <h2 className="display mt-4 text-2xl text-snow sm:text-3xl">
          {strings.heading}
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryMedia.map((item, i) => (
            <figure
              key={i}
              className="overflow-hidden border border-line bg-surface"
            >
              <MediaFrame
                item={item}
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
              />

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
