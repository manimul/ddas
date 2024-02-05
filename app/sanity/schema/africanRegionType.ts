import { Tags } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const africanRegionType = defineType({
  name: 'africanregion',
  title: 'African Region ',
  type: 'document',
  icon: Tags,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string' }),
        defineField({ name: 'credit', type: 'string' }),
      ],
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});
