// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

import react from '@astrojs/react';

import expressiveCode from 'astro-expressive-code';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeDocument from 'rehype-document';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://ajunie.com',
  integrations: [
    icon(),
    react(),
    expressiveCode({
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
    }),
    mdx(),
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['www.ajunie.com'],
    },
  },

  i18n: {
    locales: ['en', 'cn'],
    defaultLocale: 'en',
  },

  devToolbar: {
    enabled: true,
  },

  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypeDocument,
        {
          css: 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css',
        },
      ],
      rehypeHeadingIds,
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noopener', 'noreferrer'],
        },
      ],
      rehypeKatex,
    ],
    remarkPlugins: [remarkMath],
  },
});
