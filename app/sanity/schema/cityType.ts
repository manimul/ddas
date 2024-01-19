import { Tags } from 'lucide-react';
import { ComposeIcon, MenuIcon, ThListIcon } from '@sanity/icons';

import { defineField, defineType } from 'sanity';

export const cityType = defineType({
  name: 'city',
  title: 'City',
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
    {
      name: 'links',
      title: 'Related Links',
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
      name: 'subtitle',
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
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      group: 'editorial',
      fields: [defineField({ name: 'alt', type: 'string' })],
    }),

    defineField({
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      group: 'editorial',
    }),

    defineField({
      name: 'reglerne',
      title: 'Reglerne og Viden',
      type: 'string',
      group: 'links',
    }),
    defineField({
      name: 'landeprofil',
      title: 'Landeprofil',
      type: 'string',
      group: 'links',
    }),
    defineField({
      name: 'introduktion',
      title: 'Introduktion - Viden',
      type: 'string',
      group: 'links',
    }),
    defineField({
      name: 'opleve',
      title: 'Opleve - Nyde - Se- Opdage',
      type: 'string',
      group: 'links',
    }),
  ],
});
