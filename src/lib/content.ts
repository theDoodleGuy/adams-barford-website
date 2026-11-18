import { getCollection } from 'astro:content';

export async function getServices() {
  return (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);
}

/** slug -> short label, e.g. "extensions" -> "Extensions". */
export async function getServiceLabels(): Promise<Record<string, string>> {
  const services = await getServices();
  return Object.fromEntries(services.map((s) => [s.id, s.data.navLabel]));
}

/** Real projects first, then newest first. */
export async function getProjects() {
  return (await getCollection('projects')).sort(
    (a, b) => Number(a.data.placeholder) - Number(b.data.placeholder) || (b.data.year ?? 0) - (a.data.year ?? 0),
  );
}

export async function getReviews() {
  return (await getCollection('reviews')).sort((a, b) => Number(a.data.placeholder) - Number(b.data.placeholder));
}

export const faqCategoryLabels = {
  process: 'Working with us',
  costs: 'Costs and quotes',
  planning: 'Planning and regulations',
  company: 'About the company',
} as const;
