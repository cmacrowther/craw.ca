import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { setThemeColorMeta } from '../lib/set-theme-color';

// Example theme colors, adjust as needed
const THEME_COLORS = {
  light: '#ffffff', // or your light theme color
  dark: '#18181b',  // or your dark theme color
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
