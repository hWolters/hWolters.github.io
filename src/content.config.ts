import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    slug: z.string().min(1),
    topic: z.enum(['leadership', 'ai', 'software-engineering', 'data']),
    tags: z.array(z.string()).default([]),
    relatedSlugs: z.array(z.string().min(1)).max(3).refine(
      (slugs) => new Set(slugs).size === slugs.length,
      'Related article slugs must be unique',
    ).default([]),
    draft: z.boolean().default(false),
    hidden: z.boolean().default(false),
    featured: z.boolean().default(false),
    hero: z
      .object({
        src: z.string().min(1),
        alt: z.string().min(1),
      })
      .optional(),
  }),
});

export const collections = { blog };
