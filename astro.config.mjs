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
  // Prefetch internal pages when a link is hovered or focused, so a normal
  // (full) navigation feels as quick as the ClientRouter swap it replaced.
  // Astro skips prefetching on data-saver and slow connections.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
