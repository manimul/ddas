import { Tags } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const corporateMemberType = defineType({
  name: 'corporatemember',
  title: 'Board Member',
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
      validation: (e) => e.required(),
    },
    {
      type: 'image',
      name: 'image',
      title: 'Image',
    },

    {
      type: 'string',
      name: 'website',
      title: 'Website',
    },
    {
      type: 'array',
      name: 'bio',
      title: 'Bio',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      type: 'slug',
      name: 'slug',
      title: 'Slug',
    },
  ],
});
