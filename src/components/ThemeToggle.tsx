"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('talento-theme');
      if (saved === 'light') {
        document.documentElement.classList.remove('dark');
        setTheme('light');
      } else if (saved === 'dark') {
        document.documentElement.classList.add('dark');
        setTheme('dark');
      } else {
        setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
      }
    } catch {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    const newTheme = isDark ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      localStorage.setItem('talento-theme', newTheme);
    } catch {}
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="focus-visible:ring-0 focus-visible:ring-offset-0 border-border bg-card/60 backdrop-blur hover:bg-muted"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gold" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gold" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
