import * as React from "react";
import { cn } from "@/lib/utils";

export const TalentoLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 340 100"
    {...props}
    className={cn("h-full", props.className)}
  >
    {/* Concentric circles pattern */}
    <g transform="translate(50, 50)" fill="none" stroke="currentColor">
      <circle
        cx="0"
        cy="0"
        r="25"
        strokeWidth="2"
        strokeDasharray="154 3" 
        transform="rotate(-92)"
      />
      <circle cx="0" cy="0" r="19" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="13" strokeWidth="1.5" />
      <circle cx="0" cy="0" r="7" strokeWidth="1" />
      <circle cx="0" cy="0" r="3" fill="currentColor" stroke="none" />
    </g>
    
    {/* TALENTO text */}
    <text
      x="95"
      y="45"
      fontFamily="Arial, sans-serif"
      fontSize="32"
      fill="currentColor"
      fontWeight="bold"
      dominantBaseline="middle"
      letterSpacing="1"
    >
      TALENTO
    </text>
    {/* Tagline text */}
    <text
      x="95"
      y="68"
      fontFamily="Arial, sans-serif"
      fontSize="10"
      fill="currentColor"
      dominantBaseline="middle"
      letterSpacing="0.5"
    >
      SEAMLESS TALENT SOLUTIONS.
    </text>
  </svg>
);

export default TalentoLogo;
