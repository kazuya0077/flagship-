import { defineCollection, z } from 'astro:content';

// ── 学習素材コレクション (既存) ──────────────────────
const materialsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.enum([
            'kokushi',
            'anatomy',
            'kinesiology',
            'internal',
            'clinical'
        ]),
        publishedDate: z.date(),
        updatedDate: z.date().optional(),
    }),
});

// ── ブログコレクション (新規) ─────────────────────────
const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title:       z.string(),
        description: z.string(),
        pubDate:     z.date(),
        heroImage:   z.string().optional(),
        category:    z.string().default('お知らせ'),
        tags:        z.array(z.string()).optional(),
        draft:       z.boolean().optional().default(false),
        author:      z.string().optional().default('FLAGSHIP編集部'),
    }),
});

export const collections = {
    'materials': materialsCollection,
    'blog':      blogCollection,
};
