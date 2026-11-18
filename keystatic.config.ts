// The owner's editor, at /keystatic while `npm run dev` is running.
// Mirrors src/content.config.ts: keep the two in step.
// Before launch: storage -> { kind: 'github', repo: 'OWNER/REPO' } and swap the
// image text fields for fields.image once photos live in the repo.
import { config, collection, fields } from '@keystatic/core';

const body = (label = 'Main text') => fields.markdoc({ label, extension: 'md' });
const imageField = (label: string) =>
  fields.text({ label, description: 'A photo name from the library (e.g. shoot050) or an image path' });

const serviceOptions = [
  { label: 'Extensions', value: 'extensions' },
  { label: 'Loft & Garage Conversions', value: 'conversions' },
  { label: 'Renovations', value: 'renovations' },
  { label: 'New Build Homes', value: 'new-build' },
  { label: 'Oak Frame & Garden Buildings', value: 'oak-frame' },
  { label: 'Commercial', value: 'commercial' },
] as const;

export default config({
  storage: { kind: 'local' },
  ui: { brand: { name: 'Adams & Barford' } },
  collections: {
    projects: collection({
      label: 'Projects (Our Work)',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'body' },
      columns: ['town', 'service'],
      schema: {
        title: fields.slug({ name: { label: 'Project title', description: 'e.g. Two-storey extension in Dibden Purlieu' } }),
        service: fields.select({ label: 'Service', options: serviceOptions, defaultValue: 'extensions' }),
        town: fields.text({ label: 'Town or village' }),
        summary: fields.text({ label: 'One-line summary', multiline: true }),
        duration: fields.text({ label: 'How long it took', description: 'e.g. 14 weeks' }),
        budgetBand: fields.text({ label: 'Budget range (optional)', description: 'e.g. £80k–£120k' }),
        year: fields.integer({ label: 'Year finished' }),
        heroImage: imageField('Main photo'),
        heroAlt: fields.text({ label: 'Describe the main photo' }),
        gallery: fields.array(
          fields.object({ src: imageField('Photo'), alt: fields.text({ label: 'Describe the photo' }) }),
          { label: 'More photos', itemLabel: (p) => p.fields.alt.value || 'Photo' },
        ),
        quote: fields.text({ label: 'What the client said', multiline: true }),
        quoteName: fields.text({ label: 'Client name (e.g. Sarah, Lymington)' }),
        featured: fields.checkbox({ label: 'Show on the homepage' }),
        placeholder: fields.checkbox({ label: 'Draft placeholder (untick once this is a real project)', defaultValue: true }),
        body: body('The story of the project'),
      },
    }),
    reviews: collection({
      label: 'Reviews',
      slugField: 'name',
      path: 'src/content/reviews/*',
      format: { contentField: 'body' },
      schema: {
        name: fields.slug({ name: { label: 'Client name' } }),
        town: fields.text({ label: 'Town' }),
        service: fields.select({ label: 'Service', options: serviceOptions, defaultValue: 'extensions' }),
        source: fields.select({
          label: 'Where the review came from',
          options: ['Google', 'Checkatrade', 'Houzz', 'Facebook', 'Direct'].map((v) => ({ label: v, value: v })),
          defaultValue: 'Google',
        }),
        rating: fields.integer({ label: 'Stars', defaultValue: 5 }),
        placeholder: fields.checkbox({ label: 'Draft placeholder', defaultValue: true }),
        body: body('Review text'),
      },
    }),
    faqs: collection({
      label: 'FAQs',
      slugField: 'question',
      path: 'src/content/faqs/*',
      format: { contentField: 'body' },
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Costs', value: 'costs' },
            { label: 'Planning', value: 'planning' },
            { label: 'Process', value: 'process' },
            { label: 'Company', value: 'company' },
          ],
          defaultValue: 'process',
        }),
        order: fields.integer({ label: 'Order', defaultValue: 0 }),
        placeholder: fields.checkbox({ label: 'Draft placeholder', defaultValue: true }),
        body: body('Answer'),
      },
    }),
    services: collection({
      label: 'Service pages',
      slugField: 'title',
      path: 'src/content/services/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Page title' } }),
        navLabel: fields.text({ label: 'Menu label' }),
        order: fields.integer({ label: 'Order' }),
        audience: fields.select({
          label: 'For',
          options: [{ label: 'Homes', value: 'home' }, { label: 'Business', value: 'business' }],
          defaultValue: 'home',
        }),
        summary: fields.text({ label: 'One-line summary', multiline: true }),
        seoTitle: fields.text({ label: 'Google title' }),
        heroImage: imageField('Main photo'),
        heroAlt: fields.text({ label: 'Describe the main photo' }),
        includes: fields.array(fields.text({ label: 'Item' }), { label: 'What this covers', itemLabel: (p) => p.value }),
        gallery: fields.array(imageField('Photo'), { label: 'Photos', itemLabel: (p) => p.value }),
        body: body(),
      },
    }),
  },
});
