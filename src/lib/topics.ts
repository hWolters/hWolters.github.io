export const TOPICS = {
  leadership: {
    label: 'Engineering Leadership',
    shortLabel: 'Leadership',
    description: 'Growing people, shaping teams, hiring, and leading through difficult decisions.',
    seoDescription:
      'Articles on engineering leadership, growing people, hiring, team systems, feedback, and difficult leadership decisions.',
  },
  ai: {
    label: 'AI',
    shortLabel: 'AI',
    description: 'Using and understanding AI, from machine learning concepts to AI-assisted work.',
    seoDescription:
      'Articles on AI, machine learning concepts, AI-assisted work, and practical lessons from using modern AI tools.',
  },
  'software-engineering': {
    label: 'Software Engineering',
    shortLabel: 'Software Engineering',
    description: 'Search, APIs, messaging, developer tools, and the systems behind products.',
    seoDescription:
      'Articles on software engineering, APIs, search, messaging systems, developer tools, and building product systems.',
  },
  data: {
    label: 'Data & ML',
    shortLabel: 'Data & ML',
    description: 'Practical data work, analytics, visualization, databases, and machine learning.',
    seoDescription:
      'Articles on data work, analytics, visualization, databases, SQL, machine learning, and practical data tooling.',
  },
} as const;

export type Topic = keyof typeof TOPICS;
export const TOPIC_KEYS = Object.keys(TOPICS) as Topic[];

export function topicPath(topic: Topic): string {
  return `/topics/${topic}/`;
}

export function topicArchiveUrl(topic: Topic): string {
  return topicPath(topic);
}
