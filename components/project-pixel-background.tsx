"use client";

import dynamic from "next/dynamic";


const ThreeWaveBackground = dynamic(
  () => import("./three-wave-background").then((m) => m.ThreeWaveBackground),
  { ssr: false }
);

export function ProjectPixelBackground() {
  return (
    <div>
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <ThreeWaveBackground wave={false} />
      </div>
      <div
        className="pixel-overlay absolute inset-0 pointer-events-none"
        style={{
          transition: 'opacity 1.6s cubic-bezier(0.4,0,0.2,1)',
        }}
      ></div>
    </div>
  );
}
