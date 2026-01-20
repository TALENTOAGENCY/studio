import * as React from "react";
import { cn } from "@/lib/utils";

export const TalentoLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 260 100"
    {...props}
    className={cn("h-full", props.className)}
  >
    {/* Concentric circles pattern */}
    <g transform="translate(50, 50)">
      {/* Outer circle */}
      <circle
        cx="0"
        cy="0"
        r="25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* Middle circle */}
      <circle
        cx="0"
        cy="0"
        r="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Inner circle */}
      <circle
        cx="0"
        cy="0"
        r="12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      {/* Center dot */}
      <circle
        cx="0"
        cy="0"
        r="3"
        fill="currentColor"
      />
    </g>
    
    {/* TALENTO text */}
    <text
      x="95"
      y="50"
      fontFamily="Arial, sans-serif"
      fontSize="32"
      fill="currentColor"
      fontWeight="bold"
      dominantBaseline="middle"
    >
      TALENTO
    </text>
  </svg>
);

export default TalentoLogo;
