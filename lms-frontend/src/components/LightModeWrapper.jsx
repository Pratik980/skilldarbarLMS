import { useEffect } from 'react';

/**
 * Wrapper component that forces light mode for specific pages (Login, Signup)
 * Temporarily removes the 'dark' class and restores it on unmount
 */
const LightModeWrapper = ({ children }) => {
  useEffect(() => {
    const root = document.documentElement;
    const wasDark = root.classList.contains('dark');

    // Force light mode
    root.classList.remove('dark');

    // Create an observer to prevent other components from adding 'dark' back
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && root.classList.contains('dark')) {
          root.classList.remove('dark');
        }
      });
    });

    observer.observe(root, { attributes: true });

    // Restore previous theme on unmount
    return () => {
      observer.disconnect();
      if (wasDark) {
        root.classList.add('dark');
      }
    };
  }, []);


  return <>{children}</>;
};

export default LightModeWrapper;
