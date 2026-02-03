import { defineCollection, z } from 'astro:content';

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

export const collections = {
    'materials': materialsCollection,
};
