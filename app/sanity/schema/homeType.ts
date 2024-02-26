import {
  CrownIcon,
  GoalIcon,
  HighlighterIcon,
  Home,
  LayoutPanelTop,
  Mails,
  MailsIcon,
  Megaphone,
  SpeakerIcon,
  TargetIcon,
} from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { ComposeIcon, MenuIcon, ThListIcon } from '@sanity/icons';

export const homeType = defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: Home,
  groups: [
    {
      name: 'siteInfo',
      title: 'Site',
      default: true,
      icon: ThListIcon,
    },
    {
      name: 'hero',
      title: 'Hero',
      icon: LayoutPanelTop,
    },
    {
      name: 'mission',
      title: 'Mission',
      icon: GoalIcon,
    },
    {
      name: 'callToActions',
      title: 'Call to Actions',
      icon: Megaphone,
    },

    {
      name: 'settings',
      title: 'Email Settings',
      icon: MailsIcon,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Home Page Title',
      description:
        'Title for the home page, this is what the search engine will see',
      type: 'string',
      group: 'siteInfo',
    }),
    defineField({
      name: 'siteTitle',
      description: 'Title for the site, this will be used in the sites header',
      type: 'string',
      group: 'siteInfo',
    }),

    defineField({
      name: 'logo',
      description: 'Logo for the site',
      type: 'image',
      fields: [defineField({ name: 'alt', type: 'string' })],
      group: 'siteInfo',
    }),
    defineField({
      name: 'heroImage',
      description:
        'Image for the hero section - the first thing you see on the home page',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string' })],
      group: 'hero',
    }),
    defineField({
      name: 'heroHeading',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroText',
      type: 'text',
      rows: 5,
      group: 'hero',
    }),

    defineField({
      name: 'missionTitle',
      type: 'string',
      group: 'mission',
    }),
    defineField({
      name: 'missionText',
      type: 'text',
      rows: 5,
      group: 'mission',
    }),
    defineField({
      name: 'memberCtaTitle',
      type: 'string',
      group: 'callToActions',
    }),
    defineField({
      name: 'memberCtaText',
      type: 'text',
      rows: 5,
      group: 'callToActions',
    }),
    defineField({
      name: 'memberCtaImage',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string' })],
      group: 'callToActions',
    }),
    defineField({
      name: 'corporateCtaTitle',
      type: 'string',
      group: 'callToActions',
    }),
    defineField({
      name: 'corporateCtaText',
      type: 'text',
      rows: 5,
      group: 'callToActions',
    }),
    defineField({
      name: 'corporateCtaImage',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string' })],
      group: 'callToActions',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      description: 'Email for contact form and application forms',
      type: 'string',
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'siteTitle',
    },
  },
});
