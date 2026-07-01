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
    pillar: z.enum(['ai-data', 'data-systems', 'leadership-management']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
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
