import { Tags } from 'lucide-react';
import { ComposeIcon, MenuIcon, ThListIcon } from '@sanity/icons';

import { defineField, defineType } from 'sanity';

export const newsType = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  icon: Tags,
  groups: [
    {
      name: 'details',
      title: 'Details',
      icon: ThListIcon,
    },
    {
      name: 'editorial',
      title: 'Editorial',
      icon: ComposeIcon,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'extract',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      group: 'details',
    }),
    defineField({
      name: 'publishedDate',
      type: 'datetime',
      group: 'details',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      group: 'editorial',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      group: 'editorial',
      fields: [defineField({ name: 'alt', type: 'string' })],
    }),
  ],
});
