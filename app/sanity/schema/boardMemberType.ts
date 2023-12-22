import { Tags } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const boardMemberType = defineType({
  name: 'boardmember',
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
