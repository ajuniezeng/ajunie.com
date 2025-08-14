// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

import react from '@astrojs/react';

import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://ajunie.com',
  integrations: [icon(), react(), expressiveCode()],

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
});
