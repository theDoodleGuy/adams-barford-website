// Content contract shared by the pages (Astro) and the editor (keystatic.config.ts).
// If you add a field here, add it to keystatic.config.ts too.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// An image is either a key from src/data/images.ts (e.g. "shoot050") or a path/URL.
const image = z.string();

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),                 // "House Extensions"
    navLabel: z.string(),              // "Extensions"
    order: z.number(),
    audience: z.enum(['home', 'business']),
    summary: z.string(),               // one line for cards and meta description
    seoTitle: z.string(),              // "House Extensions in the New Forest & Southampton | Adams & Barford"
    heroImage: image,
    heroAlt: z.string(),
    includes: z.array(z.string()),     // bullet list of what the service covers
    gallery: z.array(image).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),                 // "Two-storey extension in Dibden Purlieu"
    service: z.string(),               // slug of a services entry, e.g. "extensions"
    town: z.string(),
    summary: z.string(),
    duration: z.string().optional(),   // "14 weeks"
    budgetBand: z.string().optional(), // "£80k–£120k"
    year: z.number().optional(),
    heroImage: image,
    heroAlt: z.string(),
    gallery: z.array(z.object({ src: image, alt: z.string() })).default([]),
    quote: z.string().optional(),
    quoteName: z.string().optional(),
    featured: z.boolean().default(false),
    placeholder: z.boolean().default(true), // true = invented draft content, must be replaced with a real project
  }),
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: z.object({
    name: z.string(),
    town: z.string(),
    service: z.string(),
    source: z.enum(['Google', 'Checkatrade', 'Houzz', 'Facebook', 'Direct']),
    rating: z.number().min(1).max(5).default(5),
    placeholder: z.boolean().default(true),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    category: z.enum(['costs', 'planning', 'process', 'company']),
    order: z.number().default(0),
    placeholder: z.boolean().default(true),
  }),
});

export const collections = { services, projects, reviews, faqs };
