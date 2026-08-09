"use client";

import dynamic from "next/dynamic";


const ThreeWaveBackground = dynamic(
  () => import("./three-wave-background").then((m) => m.ThreeWaveBackground),
  { ssr: false }
);

export function ProjectPixelBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-80 overflow-hidden opacity-80"
      style={{ maskImage: "linear-gradient(to bottom, transparent, black 30%, black)" }}
    >
      <ThreeWaveBackground wave={false} transparent />
    </div>
  );
}
