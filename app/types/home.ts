import { z } from 'zod';

export const homeZ = z.object({
  title: z.string().nullable(),
  siteTitle: z.string().nullable(),
  logo: z.any().nullable(),
  content: z.array(z.any()).nullable().optional(),
  heroImage: z.any().nullable().optional(),
  heroHeading: z.string().nullable().optional(),
  heroSubtitle: z.string().nullable().optional(),
});

export type HomeDocument = z.infer<typeof homeZ>;

export type LogoProps = { home?: HomeDocument | null };
