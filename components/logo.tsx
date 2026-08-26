import Image from "next/image";
import wordmarkWhite from "@/public/brand/wordmark-white.png";

/** Brand lockup, white version — for the graphite header and footer.
 *  Trimmed of its source padding, so the box matches the ink. */
export function Wordmark({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <Image
      src={wordmarkWhite}
      alt="AI Robotics"
      preload
      sizes="200px"
      className={className}
    />
  );
}

/** Triangle mark used as a quiet placeholder where photography is missing. */
export function LogoMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 3 30 29H2L16 3Z" fill="currentColor" />
      <path d="M16 12 23.5 26h-15L16 12Z" fill="var(--color-base)" />
      <path d="M16 18.5 19.8 26h-7.6L16 18.5Z" fill="currentColor" />
    </svg>
  );
}
