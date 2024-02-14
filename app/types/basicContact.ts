import { z } from 'zod';

// This is a Zod schema

// It will validate data at run time
// And generate Types during development
// Giving you both the flexibility of writing GROQ queries
// And the safety of Typescript
// without being limited to the shape of your Sanity Schema
export const basicContactZ = z.object({
  navn: z.string().nullable(),
  email: z.string().nullable(),
  besked: z.string().nullable(),
});

export type BasicContactDocument = z.infer<typeof basicContactZ>;
