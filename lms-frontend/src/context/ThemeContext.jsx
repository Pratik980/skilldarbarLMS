import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

/**
 * Portal-scoped ThemeProvider.
 * 
 * Instead of adding `dark` to <html> (which affects the entire app),
 * this provider exposes `isDark` so that the layout component can add
 * `dark` class only to its OWN root <div>. This keeps dark mode
 * scoped to the Admin / Student portal and never bleeds into the
 * public landing pages.
 *
 * localStorage key is `portalTheme` (distinct from any legacy `theme` key)
 * so old global-dark state doesn't accidentally re-activate.
 */
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('portalTheme');
    if (saved) return saved === 'dark';
    // Default to light inside portals — public pages are always light anyway
    return false;
  });

  useEffect(() => {
    localStorage.setItem('portalTheme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
