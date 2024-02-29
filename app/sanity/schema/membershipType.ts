import { FactoryIcon, LifeBuoyIcon, PenIcon, Tags, User } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { ComposeIcon, MenuIcon, ThListIcon } from '@sanity/icons';

export const membershipType = defineType({
  name: 'membership',
  title: 'Membership',
  type: 'document',
  icon: Tags,
  groups: [
    {
      name: 'introduction',
      title: 'Ansog Intro',
      default: true,
      icon: PenIcon,
    },
    {
      name: 'personalMembership',
      title: 'Personal ',
      icon: User,
    },
    {
      name: 'corpoprateMembership',
      title: 'Corporate ',
      icon: FactoryIcon,
    },
    {
      name: 'ngoMembership',
      title: 'NGO ',
      icon: LifeBuoyIcon,
    },
  ],
  fields: [
    defineField({
      name: 'membershipTitle',
      title: 'Ansog Om Medlemskab Title',
      type: 'string',
      group: 'introduction',
    }),
    defineField({
      name: 'membershipText',
      title: 'Ansog Om Medlemskab Text',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'introduction',
    }),
    defineField({
      name: 'personalMembershipTitle',
      title: 'Personal Membership Title',
      type: 'string',
      group: 'personalMembership',
    }),
    defineField({
      name: 'personalMembershipText',
      title: 'Personal Membership Text',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'personalMembership',
    }),
    defineField({
      name: 'corporateMembershipTitle',
      title: 'Corporate Membership Title',
      type: 'string',
      group: 'corpoprateMembership',
    }),
    defineField({
      name: 'corporateMembershipText',
      title: 'Corporate Membership Text',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'corpoprateMembership',
    }),
    defineField({
      name: 'ngoMembershipTitle',
      title: 'NGO Membership Title',
      type: 'string',
      group: 'ngoMembership',
    }),
    defineField({
      name: 'ngoMembershipText',
      title: 'NGO Membership Text',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'ngoMembership',
    }),
  ],
});
