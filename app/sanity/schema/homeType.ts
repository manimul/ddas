import { Home } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const homeType = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: Home,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'siteTitle',
      type: 'string',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
    defineField({
      name: 'logo',
      type: 'image',
      fields: [defineField({ name: 'alt', type: 'string' })],
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string' })],
    }),
    defineField({
      name: 'heroHeading',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'siteTitle',
    },
  },
});
