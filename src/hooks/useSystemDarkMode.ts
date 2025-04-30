import { useState, useEffect } from 'react';

/**
 * Detect system dark mode preference
 * @returns {boolean} True if system is in dark mode, false otherwise
 */
export function useSystemDarkMode(): boolean {
  const getPrefersDark = () =>
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;

  const [isDarkMode, setIsDarkMode] = useState(getPrefersDark);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  return isDarkMode;
}

export default useSystemDarkMode;
