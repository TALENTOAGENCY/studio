"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Lightbulb } from 'lucide-react';

interface MatchResultProps {
  score: number;
  summary: string;
}

const CircularProgress = ({ score }: { score: number }) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  
  let strokeColor = "hsl(var(--primary))";
  if (score >= 75) {
    strokeColor = "#22c55e"; // green-500
  } else if (score >= 50) {
    strokeColor = "#f59e0b"; // amber-500
  } else {
    strokeColor = "#ef4444"; // red-500
  }

  return (
    <div className="relative h-40 w-40">
      <svg className="h-full w-full" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="12"
        />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          transform="rotate(-90 60 60)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-4xl font-bold font-headline"
          style={{ color: strokeColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {score}
          <span className="text-2xl">%</span>
        </motion.span>
      </div>
    </div>
  );
};

export const MatchResult = ({ score, summary }: MatchResultProps) => {
  if (score === 0) {
    return null;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-xl font-semibold font-headline">Match Score</h3>
        <CircularProgress score={score} />
      </div>
      <Card>
        <CardHeader className="flex-row items-center gap-3 space-y-0 pb-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg font-headline">AI Summary &amp; Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{summary}</p>
        </CardContent>
      </Card>
    </div>
  );
};
