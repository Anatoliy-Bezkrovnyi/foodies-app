import { useState, useEffect } from 'react';

export const useBrowserTheme = (): boolean => {
  const getIsDark = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isDark, setIsDark] = useState<boolean>(getIsDark);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDark(event.matches);
    };

    setIsDark(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isDark;
};

export default useBrowserTheme;
