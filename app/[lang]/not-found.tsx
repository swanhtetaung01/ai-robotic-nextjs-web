import Link from "next/link";
import { Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[60svh] items-center bg-base">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="display mt-4 text-4xl text-snow sm:text-5xl">
          Nothing on this floor
        </h1>
        <p className="mt-5 max-w-md leading-relaxed text-fog">
          This page doesn&rsquo;t exist — or the robot hasn&rsquo;t docked here
          yet. The fleet is over here:
        </p>
        <Link
          href="/robots"
          className="stencil mt-8 inline-block rounded-sm bg-amber px-7 py-4 text-ink transition-colors hover:bg-amber-hot"
        >
          Explore the fleet
        </Link>
      </div>
    </section>
  );
}
