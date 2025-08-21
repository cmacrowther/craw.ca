import * as React from "react";
import { Laptop2 } from "lucide-react";

// Animated gradient SVG for the laptop icon
export function GradientLaptopIcon({ className = "", style = {}, size = 22, strokeWidth = 2.2, ...props }) {
  // Unique id for gradient to avoid collisions if used multiple times
  const gradientId = React.useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={`url(#${gradientId})`}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-label="Laptop coding icon"
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a78bfa">
            <animate attributeName="stop-color" values="#a78bfa;#ec4899;#a78bfa" dur="6s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#ec4899">
            <animate attributeName="stop-color" values="#ec4899;#a78bfa;#ec4899" dur="6s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>
      {/* Laptop2 Lucide Path */}
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M2 20h20" />
      <path d="M7 20v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1" />
    </svg>
  );
}
