import { Tags } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const memberType = defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  icon: Tags,
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
      validation: (e) => e.required(),
    },
    {
      type: 'string',
      name: 'title',
      title: 'Title',
      initialValue: 'Member',
      validation: (e) => e.required(),
    },
    {
      type: 'image',
      name: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string' })],
      title: 'Image',
    },
    {
      type: 'number',
      name: 'phone',
      title: 'Phone',
    },
    {
      type: 'string',
      name: 'email',
      title: 'Email',
    },
    {
      type: 'string',
      name: 'linkedin',
      title: 'LinkedIn',
    },
    {
      type: 'string',
      name: 'facebook',
      title: 'Facebook',
    },
    {
      type: 'string',
      name: 'twitter',
      title: 'Twitter',
    },
    {
      type: 'array',
      name: 'bio',
      title: 'Bio',
      of: [{ type: 'block' }],
    },
    {
      type: 'array',
      name: 'africanTags',
      title: 'African Tags',
      of: [{ type: 'reference', to: [{ type: 'africancountry' }] }],
    },
    {
      type: 'slug',
      name: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
      },
      title: 'Slug',
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
});
