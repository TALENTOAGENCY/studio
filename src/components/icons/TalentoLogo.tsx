import * as React from "react";
import { cn } from "@/lib/utils";

export const TalentoLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 100"
      {...props}
    >
      <path
        fill="currentColor"
        d="M50 15 C 25 15, 25 50, 50 50 C 75 50, 75 15, 50 15 M 50 20 C 69.5 20, 69.5 45, 50 45 C 30.5 45, 30.5 20, 50 20 M 50 25 C 64 25, 64 40, 50 40 C 36 40, 36 25, 50 25 M 50 30 C 58.5 30, 58.5 35, 50 35 C 41.5 35, 41.5 30, 50 30 M 50 34 A 1 1 0 0 0 50 36 A 1 1 0 0 0 50 34"
      />
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="3"
        d="M 50, 15 A 35,35 0 1,1 49.9,15"
        strokeLinecap="round"
      />
      <text
        x="100"
        y="50"
        fontFamily="sans-serif"
        fontSize="30"
        fill="currentColor"
        fontWeight="bold"
        dominantBaseline="middle"
      >
        TALENTO
      </text>
      <text
        x="100"
        y="68"
        fontFamily="sans-serif"
        fontSize="8"
        fill="currentColor"
        dominantBaseline="middle"
      >
        SEAMLESS TALENT SOLUTIONS.
      </text>
    </svg>
);
