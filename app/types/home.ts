import { z } from 'zod';

export const homeZ = z.object({
  title: z.string().nullable(),
  siteTitle: z.string().nullable(),
  logo: z.any().nullable(),
  content: z.array(z.any()).nullable().optional(),
  heroImage: z.any().nullable().optional(),
  heroHeading: z.string().nullable().optional(),
  heroText: z.string().nullable().optional(),
  missionTitle: z.string().nullable().optional(),
  missionText: z.string().nullable().optional(),
  memberCtaTitle: z.string().nullable().optional(),
  memberCtaText: z.string().nullable().optional(),
  memberCtaImage: z.any().nullable().optional(),
  corporateCtaTitle: z.string().nullable().optional(),
  corporateCtaText: z.string().nullable().optional(),
  corporateCtaImage: z.any().nullable().optional(),
  email: z.string().nullable().optional(),
});

export type HomeDocument = z.infer<typeof homeZ>;

export type LogoProps = { home?: HomeDocument | null };
