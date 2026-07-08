export const TOPICS = {
  leadership: {
    label: 'Engineering Leadership',
    shortLabel: 'Leadership',
    description: 'Growing people, shaping teams, hiring, and leading through difficult decisions.',
  },
  ai: {
    label: 'AI',
    shortLabel: 'AI',
    description: 'Using and understanding AI, from machine learning concepts to AI-assisted work.',
  },
  'software-engineering': {
    label: 'Software Engineering',
    shortLabel: 'Software Engineering',
    description: 'Search, APIs, messaging, developer tools, and the systems behind products.',
  },
  data: {
    label: 'Data & ML',
    shortLabel: 'Data & ML',
    description: 'Practical data work, analytics, visualization, databases, and machine learning.',
  },
} as const;

export type Topic = keyof typeof TOPICS;
export const TOPIC_KEYS = Object.keys(TOPICS) as Topic[];

export function topicArchiveUrl(topic: Topic): string {
  return `/archive/?topic=${encodeURIComponent(topic)}`;
}
