import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { setThemeColorMeta } from '../lib/set-theme-color';

// Example theme colors, adjust as needed
const THEME_COLORS = {
  light: '#ffffff', // or your light theme color
  dark: '#09090b',  // match your dark theme background
};

export function ThemeColorUpdater() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
  const t = (theme || resolvedTheme) === 'dark' ? 'dark' : 'light';
  const color = THEME_COLORS[t];
    setThemeColorMeta(color);
  }, [theme, resolvedTheme]);

  return null;
}
