import { z } from 'zod';

// This is a Zod schema
// https://zod.dev/

// It will validate data at run time
// And generate Types during development
// Giving you both the flexibility of writing GROQ queries
// And the safety of Typescript
// without being limited to the shape of your Sanity Schema
export const africanRegionZ = z.object({
  _id: z.string(),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  slug: z.string().nullable(),
  image: z.any().nullable(),
  content: z.array(z.any()).nullable(),
});

export type AfricanRegionDocument = z.infer<typeof africanRegionZ>;
export const africanRegionsZ = z.array(africanRegionZ);

export const africanRegionStubZ = z.object({
  _id: z.string(),
  title: z.string().nullable(),
  subtitle: z.string().nullable(),
  slug: z.string().nullable(),
  image: z.any().nullable(),
  content: z.array(z.any()).nullable(),
});

export const africanRegionStubsZ = z.array(africanRegionStubZ);

export type AfricanRegionStub = z.infer<typeof africanRegionStubZ>;
