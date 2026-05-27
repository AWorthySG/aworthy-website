// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://a-worthy.com',
  trailingSlash: 'always',
  integrations: [sitemap({
    filter: (page) =>
      !page.includes('/parent-portal/') &&
      !page.includes('/lp/') &&
      !page.includes('/review/') &&
      !page.includes('/404'),
  })],
  build: {
    format: 'directory',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
