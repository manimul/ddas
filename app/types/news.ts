import { z } from 'zod';

// This is a Zod schema
// https://zod.dev/

// It will validate data at run time
// And generate Types during development
// Giving you both the flexibility of writing GROQ queries
// And the safety of Typescript
// without being limited to the shape of your Sanity Schema
export const newsZ = z.object({
  _id: z.string(),
  title: z.string().nullable(),
  extract: z.string().nullable(),
  publishedDate: z.string().nullable(),
  slug: z.string().nullable(),
  content: z.array(z.any()).nullable(),
  image: z.any().nullable(),
});

export type NewsDocument = z.infer<typeof newsZ>;

export const newsesZ = z.array(newsZ);

export const newsStubZ = z.object({
  _id: z.string(),
  title: z.string().nullable(),
  extract: z.string().nullable(),
  publishedDate: z.string().nullable(),
  slug: z.string().nullable(),
  content: z.array(z.any()).nullable(),
  image: z.any().nullable(),
});

export const newsStubsZ = z.array(newsStubZ);

export type NewsStub = z.infer<typeof newsStubZ>;
