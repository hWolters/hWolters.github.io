export const SITE = {
  name: 'Heike',
  title: 'Heike',
  description: 'I like understanding how technology changes the way we work.',
  url: 'https://datadojo.dev',
  linkedin: 'https://www.linkedin.com/in/heike-terhechte-wolters-24101015b/',
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
