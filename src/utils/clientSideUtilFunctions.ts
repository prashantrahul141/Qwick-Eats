const getCurrentThemeMode = () => {
  if (typeof window !== 'undefined') {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      return 'dark' as const;
    } else {
      return 'light' as const;
    }
  }
  return 'light' as const;
};

export { getCurrentThemeMode };
