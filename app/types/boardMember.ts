import { z } from 'zod';

// This is a Zod schema
// https://zod.dev/

// It will validate data at run time
// And generate Types during development
// Giving you both the flexibility of writing GROQ queries
// And the safety of Typescript
// without being limited to the shape of your Sanity Schema
export const boardMemberZ = z.object({
  _id: z.string(),
  name: z.string().nullable(),
  title: z.string().nullable(),
  slug: z.string().nullable(),
  image: z.any().nullable(),
  phone: z.number().nullable(),
  email: z.string().nullable(),
  bio: z.array(z.any()).nullable(),
});

export type BoardMemberDocument = z.infer<typeof boardMemberZ>;
export const boardMembersZ = z.array(boardMemberZ);

export const boardMemberStubZ = z.object({
  _id: z.string(),
  _type: z.string(),
  name: z.string().nullable(),
  title: z.string().nullable(),
  slug: z.string().nullable(),
  image: z.any().nullable(),
  phone: z.number().nullable(),
  email: z.string().nullable(),
  bio: z.array(z.any()).nullable(),
});

export const boardMemberStubsZ = z.array(boardMemberStubZ);

export type BoardMemberStub = z.infer<typeof boardMemberStubZ>;
