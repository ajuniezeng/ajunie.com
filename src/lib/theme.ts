// Theme management utilities
const THEME_KEY = 'theme';
const themes = ['light', 'dark', 'system'] as const;
export type Theme = (typeof themes)[number];

export function getTheme(): Theme {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(THEME_KEY) as Theme;
    if (themes.includes(stored)) {
      return stored;
    }
  }
  return 'system';
}

export function setTheme(theme: Theme) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(THEME_KEY, theme);
  }
  applyTheme(theme);
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  if (theme === 'system') {
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    if (systemPrefersDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  } else if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

// Initialize theme to prevent flash
export function initTheme() {
  const theme = getTheme();
  applyTheme(theme);
}
