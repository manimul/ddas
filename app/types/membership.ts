import { z } from 'zod';

// This is a Zod schema
// https://zod.dev/

// It will validate data at run time
// And generate Types during development
// Giving you both the flexibility of writing GROQ queries
// And the safety of Typescript
// without being limited to the shape of your Sanity Schema
export const membershipZ = z.object({
  _id: z.string().optional(),
  membershipTitle: z.string().nullable().optional(),
  membershipText: z.array(z.any()).nullable().optional(),
  personalMembershipEmail: z.string().nullable().optional(),
  personalMembershipTitle: z.string().nullable().optional(),
  personalMembershipText: z.array(z.any()).nullable().optional(),
  corporateMembershipEmail: z.string().nullable().optional(),
  corporateMembershipTitle: z.string().nullable().optional(),
  corporateMembershipText: z.array(z.any()).nullable().optional(),
  ngoMembershipEmail: z.string().nullable().optional(),
  ngoMembershipTitle: z.string().nullable().optional(),
  ngoMembershipText: z.array(z.any()).nullable().optional(),
});

export type MembershipDocument = z.infer<typeof membershipZ>;
