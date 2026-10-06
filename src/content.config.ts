import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { site } from './data/site';
const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default(`Redakcja ${site.name}`),
    relatedProject: z.string(),
    relatedService: z.enum(['strona', 'seo']).default('strona'),
    relatedGuides: z.array(z.string()).default([]),
    offerSummary: z.boolean().default(false),
  }),
});
export const collections = { guides };
