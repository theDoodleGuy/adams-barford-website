# Adams & Barford website — first draft

Astro static site with a Keystatic editor for the owner.

```bash
npm install
npm run dev      # site at http://localhost:4321, editor at http://localhost:4321/keystatic
npm run build    # static site in dist/
npm run preview  # serve dist/
```

## Where things live
- `src/content/` — services, projects, reviews, FAQs (Markdown; editable in Keystatic)
- `src/data/copy.json` — page-level headings and copy
- `src/data/settings.json` — phone, email, address, areas, opening hours
- `src/data/images.ts` — the photo library (keys used by content files)
- `src/content.config.ts` + `keystatic.config.ts` — the content model; keep the two in step

## Draft status — before launch
- **Photos** are still loaded from the staging site. Run `bash scripts/fetch-images.sh` or export the WordPress Media Library into `public/images/`, then set `IMG_BASE = '/images'`.
- **Placeholders:** every project and review has `placeholder: true` and shows a "Draft example" tag. Replace them with real ones.
- **"[confirm with owner]"** notes in the service and FAQ text: prices, timescales, insurance, guarantees.
- **Enquiry form** posts using Netlify Forms attributes. Wire it to Netlify Forms or a Cloudflare Worker + Turnstile.
- **Editor in production:** add a host adapter and switch Keystatic storage to `{ kind: 'github' }`. Today `/keystatic` only runs under `npm run dev`.
- `@keystatic/astro` is pinned to 5.2.0. Version 6.0.0 crashes on Astro 5 ("Could not resolve astro:env/server").
- The logo is a low-resolution PNG; get an SVG.
