import { defineCollection, z } from 'astro:content';

const materialsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.enum([
            'kokushi-comprehensive',
            'anatomy',
            'kinesiology',
            'internal-medicine',
            'clinical-practice'
        ]),
        publishedDate: z.date(),
        updatedDate: z.date().optional(),
    }),
});

export const collections = {
    'materials': materialsCollection,
};
