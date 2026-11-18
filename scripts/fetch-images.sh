#!/usr/bin/env bash
# Copies every photo listed in src/data/images.ts into public/images/ so the site
# stops depending on the staging server. Run it yourself from the website folder:
#   bash scripts/fetch-images.sh
# If Cloudflare blocks it, export the Media Library from WordPress (or SFTP from
# WP Engine) and drop the files into public/images/ keeping the same sub-paths.
set -euo pipefail
cd "$(dirname "$0")/.."
BASE="https://adamsbarforstg.wpenginepowered.com/wp-content/uploads"
grep -oE "'[0-9]{4}/[0-9]{2}/[^']+'" src/data/images.ts | tr -d "'" | while read -r p; do
  mkdir -p "public/images/$(dirname "$p")"
  curl -fsS -o "public/images/$p" "$BASE/$p" && echo "ok  $p" || echo "ERR $p"
done
echo "Done. Now set IMG_BASE = '/images' in src/data/images.ts"
