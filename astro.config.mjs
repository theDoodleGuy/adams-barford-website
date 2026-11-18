// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

// Keystatic's admin UI (/keystatic) needs server routes. For this first draft it
// only runs under `astro dev`, so `astro build` stays a plain static site.
// Before launch: add the Cloudflare/Netlify adapter and switch Keystatic storage to GitHub.
const isDev = process.argv.includes('dev');

// Client preview on GitHub Pages lives under /<repo>/ — set PREVIEW_BASE to build for it.
// Preview builds are noindex and the enquiry form doesn't send anything.
const previewBase = process.env.PREVIEW_BASE;

export default defineConfig({
  site: 'https://www.adamsandbarford.co.uk',
  ...(previewBase ? { base: previewBase, trailingSlash: 'always' } : {}),
  integrations: [react(), sitemap({ filter: (page) => !page.includes('/thank-you') }), ...(isDev ? [keystatic()] : [])],
  image: {
    // Draft only: photos are still served from the staging site until they are copied into src/assets.
    domains: ['adamsbarforstg.wpenginepowered.com'],
  },
});
