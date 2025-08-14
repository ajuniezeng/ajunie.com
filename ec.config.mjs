import { defineEcConfig } from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';

export default defineEcConfig({
  themes: ['monokai', 'github-light'],
  plugins: [pluginLineNumbers()],
  defaultProps: {
    wrap: true,
  },
  useDarkModeMediaQuery: false,
  themeCssSelector: (theme) => {
    if (theme.name === 'monokai') {
      return "[data-theme='dark']";
    } else {
      return "[data-theme='']";
    }
  },
  styleOverrides: {
    codeFontSize: '0.9rem',
    codeFontFamily: 'var(--font-text-mono)',
    codeBackground: 'var(--color-background)',
    borderColor: 'var(--color-border)',
  },
});
