import Image from "next/image";
import { SITE } from "@/lib/constants";

type EdenLogoProps = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  framed?: boolean;
};

export function EdenLogo({
  className = "",
  width = 140,
  height = 48,
  priority = false,
  framed = true,
}: EdenLogoProps) {
  const image = (
    <Image
      src="/eden-logo.png"
      alt={`${SITE.name} logo`}
      width={width}
      height={height}
      priority={priority}
      className={`h-auto w-auto object-contain ${className}`}
    />
  );

  if (!framed) return image;

  return (
    <span className="inline-flex items-center rounded-xl bg-eden-bg px-2 py-1">
      {image}
    </span>
  );
}
