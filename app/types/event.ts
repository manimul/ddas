import { z } from 'zod';

// This is a Zod schema
// https://zod.dev/

// It will validate data at run time
// And generate Types during development
// Giving you both the flexibility of writing GROQ queries
// And the safety of Typescript
// without being limited to the shape of your Sanity Schema
export const eventZ = z.object({
  _id: z.string(),
  title: z.string().nullable(),
  extract: z.string().nullable(),
  date: z.string().nullable(),
  location: z.string().nullable(),
  slug: z.string().nullable(),
  content: z.array(z.any()).nullable(),
  image: z.any().nullable(),
});

export type EventDocument = z.infer<typeof eventZ>;

export const eventsZ = z.array(eventZ);

export const eventStubZ = z.object({
  _id: z.string(),
  title: z.string().nullable(),
  extract: z.string().nullable(),
  date: z.string().nullable(),
  location: z.string().nullable(),
  slug: z.string().nullable(),
  content: z.array(z.any()).nullable(),
  image: z.any().nullable(),
});

export const eventStubsZ = z.array(eventStubZ);

export type EventStub = z.infer<typeof eventStubZ>;
