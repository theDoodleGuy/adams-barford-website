// After a preview build (PREVIEW_BASE=/repo-name/), prefix the site's hard-coded
// root links ("/contact/", "/favicon.svg") with the base so they work on GitHub Pages,
// and write a robots.txt that blocks all crawlers. Astro already prefixes its own assets.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const base = (process.env.PREVIEW_BASE || '').replace(/\/?$/, '/');
if (base === '/') {
  console.log('rebase-preview: PREVIEW_BASE not set, nothing to do');
  process.exit(0);
}

const walk = async (dir) =>
  (await readdir(dir, { recursive: true })).map((f) => join(dir, f));

const attr = /\b(href|src|action|content)="\/(?!\/)([^"]*)"/g;
let changed = 0;
for (const file of (await walk('dist')).filter((f) => f.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  const out = html.replace(attr, (m, name, rest) =>
    ('/' + rest).startsWith(base) ? m : `${name}="${base}${rest}"`);
  if (out !== html) { await writeFile(file, out); changed++; }
}
await writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
console.log(`rebase-preview: rewrote links in ${changed} pages for base ${base}`);
