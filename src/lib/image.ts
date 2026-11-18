import { img, imagePaths, type ImageKey } from '../data/images';

/**
 * Content image fields hold either a key from src/data/images.ts ("shoot050")
 * or a ready-made path/URL ("/images/foo.jpg", "https://…"). This turns either into a URL.
 */
export function resolveImage(value: string): string {
  return value in imagePaths ? img(value as ImageKey) : value;
}
