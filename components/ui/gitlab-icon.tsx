import * as React from "react";

// Monochrome, Lucide-style GitLab logo
const GitLab = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Ears */}
    <path d="M3.5 14L6.5 5l2.5 9z" />
    <path d="M20.5 14L17.5 5l-2.5 9z" />
    {/* Face */}
    <path d="M6.5 5l5.5 16 5.5-16" />
  </svg>
);

export default GitLab;
