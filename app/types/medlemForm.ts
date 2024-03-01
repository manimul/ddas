import { z } from 'zod';

// This is a Zod schema

// It will validate data at run time
// And generate Types during development
// Giving you both the flexibility of writing GROQ queries
// And the safety of Typescript
// without being limited to the shape of your Sanity Schema
export const medlemFormZ = z.object({
  navn: z.string().nullable().optional(),
  firmanavn: z.string().nullable().optional(),
  email: z.string().nullable(),
  adresse: z.string().nullable(),
  postnummer: z.string().nullable(),
  telefonnummer: z.number().nullable(),
  fodselsar: z.number().nullable().optional(),
  besked: z.string().nullable(),
  kontaktperson: z.string().nullable().optional(),
  generalConsent: z.boolean().nullable().optional(),
  mailConsent: z.boolean().nullable().optional(),
});

export type MedlemFormDocument = z.infer<typeof medlemFormZ>;
