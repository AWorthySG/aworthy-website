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
  // Phones have no hover, so the "Get a Free Report" links to /contact/ in the
  // header, the phone menu and the global sticky bar carry
  // data-astro-prefetch="viewport": /contact/ loads as soon as one is on screen.
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
