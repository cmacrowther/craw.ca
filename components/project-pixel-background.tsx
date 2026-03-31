"use client";

import dynamic from "next/dynamic";


const ThreeWaveBackground = dynamic(
  () => import("./three-wave-background").then((m) => m.ThreeWaveBackground),
  { ssr: false }
);

export function ProjectPixelBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <ThreeWaveBackground wave={false} />
      <div className="pixel-overlay absolute inset-0 pointer-events-none" />
    </div>
  );
}
