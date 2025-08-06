// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://ajunie.com',
  integrations: [icon()],

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['www.ajunie.com'],
    },
  },

  devToolbar: {
    enabled: true,
  },
});
