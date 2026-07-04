import { BASE_URL } from '../../site.config.mjs';

export const SITE = {
  name: 'Heike Terhechte',
  fullName: 'Heike Maria Terhechte',
  tagline: 'Engineering Leadership, Software, Data & AI',
  description:
    'Heike Terhechte is Director of Engineering at MOIA GmbH and writes about engineering leadership, software, data, and AI.',
  url: BASE_URL,
  profileImage: '/images/heike-terhechte.jpg',
  linkedin: 'https://www.linkedin.com/in/heike-terhechte-wolters-24101015b/',
} as const;

export { BASE_URL };

export function articlePath(date: Date, slug: string): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `/${year}/${month}/${day}/${slug}/`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, BASE_URL).href;
}

export function ogImagePath(title: string): string {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `/open-graph/${encodeURIComponent(slug)}.png`;
}
