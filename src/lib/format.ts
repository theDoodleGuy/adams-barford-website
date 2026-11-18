import { marked } from 'marked';

/** Render a short trusted markdown string (from copy.json) to HTML. */
export const md = (source: string): string => marked.parse(source ?? '', { async: false }) as string;

/** Markdown to plain text, for JSON-LD answers and meta descriptions. */
export const mdToText = (source: string): string =>
  md(source)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

/**
 * UK display format from an E.164 number. 023 numbers read as 023 8019 3559
 * (the review flagged "02380 193559" as the non-standard grouping).
 */
export function displayPhone(e164: string, fallback: string): string {
  const national = e164.replace(/^\+44/, '0').replace(/\s+/g, '');
  if (/^02\d{9}$/.test(national)) return `${national.slice(0, 3)} ${national.slice(3, 7)} ${national.slice(7)}`;
  if (/^07\d{9}$/.test(national)) return `${national.slice(0, 5)} ${national.slice(5)}`;
  return fallback;
}

/** Trim a description to a meta-friendly length without cutting a word in half. */
export function clip(text: string, max = 158): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}
