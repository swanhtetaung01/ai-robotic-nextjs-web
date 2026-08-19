import Image from "next/image";
import Link from "next/link";
import type { Robot } from "@/lib/robots";
import { robotImages } from "@/lib/robot-images";
import { LogoMark } from "@/components/logo";

/** Lineup card. Renders the product cut-out when photos exist, otherwise a
 *  quiet placeholder panel — honest until every model has photography. */
export function RobotCard({ robot }: { robot: Robot }) {
  const product = robotImages[robot.slug]?.product;
  const lead = robot.heroStats[0];

  return (
    <Link
      href={`/robots/${robot.slug}`}
      className="group flex flex-col border border-line bg-surface transition-colors hover:border-amber/60"
    >
      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-raise">
        {product ? (
          <Image
            src={product}
            alt={`${robot.model} ${robot.kind}`}
            className="h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-fog">
            <LogoMark className="h-10 w-10 opacity-25" />
            <span className="font-mono text-xs uppercase tracking-[0.14em]">
              Photography in progress
            </span>
          </div>
        )}
        <span className="stencil absolute left-4 top-4 text-amber">
          {robot.model}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="stencil text-fog">{robot.kind}</p>
        <p className="display text-xl text-snow">{robot.tagline}</p>
        <p className="text-sm leading-relaxed text-fog">{robot.pitch}</p>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
          <span className="font-mono text-sm text-snow">
            {lead.value}
            <span className="ml-1 text-xs text-fog">{lead.unit} {lead.label}</span>
          </span>
          <span className="stencil text-amber transition-transform duration-300 group-hover:translate-x-1">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
