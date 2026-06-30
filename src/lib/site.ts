export const SITE = {
  name: 'Heike Maria, PhD',
  title: 'Data Dojo',
  description:
    'Writing about data science, artificial intelligence, software systems, and technical leadership.',
  positioning:
    'Technical leader working across data science, AI, and the systems and teams that turn ideas into useful products.',
  url: 'https://datadojo.dev',
  github: 'https://github.com/hWolters',
} as const;

export const PILLARS = {
  'ai-data': {
    name: 'AI & Data Science',
    description: 'Machine learning, ranking, natural language processing, and applied data work.',
  },
  'data-systems': {
    name: 'Data & Software Systems',
    description: 'Databases, search, messaging, APIs, and the infrastructure around useful products.',
  },
  'leadership-management': {
    name: 'Leadership & Management',
    description: 'Building technical teams, making decisions, and turning ideas into durable systems.',
  },
} as const;

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
