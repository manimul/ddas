import { z } from 'zod';

// This is a Zod schema
// https://zod.dev/

// It will validate data at run time
// And generate Types during development
// Giving you both the flexibility of writing GROQ queries
// And the safety of Typescript
// without being limited to the shape of your Sanity Schema
export const pageZ = z.object({
  _id: z.string(),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  slug: z.string().nullable(),
  image: z.any().nullable(),
  content: z.array(z.any()).nullable(),
});

export type PageDocument = z.infer<typeof pageZ>;

export const pagesZ = z.array(pageZ);

export const pageStubZ = z.object({
  _id: z.string(),
  _type: z.string(),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  slug: z.string().nullable(),
  image: z.any().nullable(),
  content: z.array(z.any()).nullable(),
});

export const pageStubsZ = z.array(pageStubZ);

export type PageStub = z.infer<typeof pageStubZ>;
