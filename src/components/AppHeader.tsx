"use client";

import React, { useState, useEffect } from 'react';
import TalentoLogo from '@/components/icons/TalentoLogo';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function AppHeader() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY < 0 ? 0 : currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={`sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b transition-transform duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="https://talento.agency/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-card p-2 rounded-md">
            <TalentoLogo className="h-8 w-auto text-primary" />
          </a>
          <nav className="flex items-center gap-4">
             <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
