import { z } from 'zod';

// This is a Zod schema
// https://zod.dev/

// It will validate data at run time
// And generate Types during development
// Giving you both the flexibility of writing GROQ queries
// And the safety of Typescript
// without being limited to the shape of your Sanity Schema
export const countryZ = z.object({
  _id: z.string(),
  title: z.string().nullable(),
  slug: z.string().nullable(),
  image: z.any().nullable(),
  content: z.array(z.any()).nullable(),
  region: z.array(z.any()).nullable(),
  cities: z.array(z.any()).nullable(),
  reglerne: z.string().nullable(),
  landeprofil: z.string().nullable(),
  opleve: z.string().nullable(),
  introduktion: z.string().nullable(),
});

export type CountryDocument = z.infer<typeof countryZ>;
export const countriesZ = z.array(countryZ);

export const countryStubZ = z.object({
  _id: z.string(),
  title: z.string().nullable(),
  slug: z.string().nullable(),
  image: z.any().nullable(),
  content: z.array(z.any()).nullable(),
  region: z.array(z.any()).nullable(),
  cities: z.array(z.any()).nullable(),
  reglerne: z.string().nullable(),
  landeprofil: z.string().nullable(),
  opleve: z.string().nullable(),
  introduktion: z.string().nullable(),
});

export const CountryStubsZ = z.array(countryStubZ);

export type CountryStub = z.infer<typeof countryStubZ>;
