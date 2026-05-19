import React, { createContext, useContext, useState } from 'react';

export const THEMES = {
  dark: {
    id: 'dark',
    label: 'Dark Mode',
    bg: '#111111',
    card: '#1a1a1a',
    cardBorder: 'rgba(255,255,255,0.06)',
    primary: '#7c3aed',
    accent: '#ccff00',
    text: '#ffffff',
    textMuted: 'rgba(255,255,255,0.4)',
    navActive: 'rgba(124,58,237,0.2)',
    navActiveBorder: 'rgba(124,58,237,0.4)',
  },
  neon: {
    id: 'neon',
    label: 'Neon Contrast',
    bg: '#050508',
    card: '#0d0d14',
    cardBorder: 'rgba(0,255,200,0.18)',
    primary: '#00ffe0',
    accent: '#ff00aa',
    text: '#ffffff',
    textMuted: 'rgba(0,255,200,0.5)',
    navActive: 'rgba(0,255,200,0.12)',
    navActiveBorder: 'rgba(0,255,200,0.4)',
  },
  light: {
    id: 'light',
    label: 'Minimalist Light',
    bg: '#f0ede8',
    card: '#ffffff',
    cardBorder: 'rgba(0,0,0,0.07)',
    primary: '#5b21b6',
    accent: '#84cc16',
    text: '#111111',
    textMuted: 'rgba(0,0,0,0.4)',
    navActive: 'rgba(91,33,182,0.1)',
    navActiveBorder: 'rgba(91,33,182,0.3)',
  },
};

const ThemeContext = createContext({ theme: THEMES.dark, setThemeId: () => {} });

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState('dark');
  return (
    <ThemeContext.Provider value={{ theme: THEMES[themeId], setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
