import { z } from 'zod';

// This is a Zod schema
// https://zod.dev/

// It will validate data at run time
// And generate Types during development
// Giving you both the flexibility of writing GROQ queries
// And the safety of Typescript
// without being limited to the shape of your Sanity Schema
export const corporateMemberZ = z.object({
  _id: z.string(),
  name: z.string().nullable(),
  title: z.string().nullable(),
  slug: z.string().nullable(),
  image: z.any().nullable(),
  website: z.string().nullable(),
  bio: z.array(z.any()).nullable(),
});

export type CorporateMemberDocument = z.infer<typeof corporateMemberZ>;

export const corporateMembersZ = z.array(corporateMemberZ);

export const corporateMemberStubZ = z.object({
  _id: z.string(),
  _type: z.string(),
  name: z.string().nullable(),
  title: z.string().nullable(),
  website: z.string().nullable(),
  slug: z.string().nullable(),
  image: z.any().nullable(),
  bio: z.array(z.any()).nullable(),
});

export const corporateMemberStubsZ = z.array(corporateMemberStubZ);

export type CorporateMemberStub = z.infer<typeof corporateMemberStubZ>;
