import { z } from 'zod';

// This is a Zod schema
// https://zod.dev/

// It will validate data at run time
// And generate Types during development
// Giving you both the flexibility of writing GROQ queries
// And the safety of Typescript
// without being limited to the shape of your Sanity Schema
export const ctaZ = z.object({
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  body: z.array(z.any()).nullable(),
  image: z.any().nullable(),
  linktext: z.string().nullable(),
  linkurl: z.string().nullable(),
});

export type CtaDocument = z.infer<typeof ctaZ>;
