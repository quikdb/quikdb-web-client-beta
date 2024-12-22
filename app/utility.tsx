'use client';

import { useEffect, useState } from 'react';

export function ThemeHydration() {
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.add(theme);
    setThemeLoaded(true);
  }, []);

  if (!themeLoaded) return null;

  return null;
}
