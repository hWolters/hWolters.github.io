import { BASE_URL } from '../../site.config.mjs';

export const SITE = {
  name: 'Heike Terhechte',
  fullName: 'Heike Maria Terhechte',
  tagline: 'Engineering Leadership, AI, Software Systems & Products',
  description:
    'Heike Terhechte is a Director of Engineering, former data scientist and researcher writing about engineering leadership, AI, software systems, and building products.',
  url: BASE_URL,
  profileImage: '/images/heike-terhechte.jpg',
  linkedin: 'https://www.linkedin.com/in/heike-terhechte-wolters-24101015b/',
} as const;

export const ABOUT_PARAGRAPHS = [
  'Moin *',
  'I enjoy figuring things out.',
  'Over the years, that curiosity has taken me through academia, data science, software engineering and engineering leadership. Today I am a Director of Engineering at MOIA, where I spend much of my time thinking about people, systems and increasingly, AI.',
  'I do not consider myself an expert on most of the things I write about. This blog is simply a notebook of things I’ve learned, questions I explored and ideas I wanted to think through more carefully. Some articles grew out of questions I found myself answering again and again. Others started as small experiments or observations that refused to leave my head.',
  'If something here gives you an idea, saves you some time, or helps you look at a problem differently, then it has done its job.',
] as const;

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
