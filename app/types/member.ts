import { z } from 'zod';

// This is a Zod schema
// https://zod.dev/

// It will validate data at run time
// And generate Types during development
// Giving you both the flexibility of writing GROQ queries
// And the safety of Typescript
// without being limited to the shape of your Sanity Schema
export const memberZ = z.object({
  _id: z.string(),
  name: z.string().nullable(),
  title: z.string().nullable(),
  slug: z.string().nullable(),
  image: z.any().nullable(),
  bio: z.array(z.any()).nullable(),
});

export type MemberDocument = z.infer<typeof memberZ>;

export const membersZ = z.array(memberZ);

export const memberStubZ = z.object({
  _id: z.string(),
  _type: z.string(),
  name: z.string().nullable(),
  title: z.string().nullable(),
  slug: z.string().nullable(),
  image: z.any().nullable(),
  bio: z.array(z.any()).nullable(),
});

export const memberStubsZ = z.array(memberStubZ);

export type MemberStub = z.infer<typeof memberStubZ>;
