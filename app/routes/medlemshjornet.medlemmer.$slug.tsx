import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';

import { Event } from '~/components/Event';
import { Member } from '~/components/Member';
import type { Loader as RootLoader } from '~/root';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/resource.og';
import { writeClient } from '~/sanity/client.server';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { MEMBER_QUERY } from '~/sanity/queries';
import type { MemberDocument } from '~/types/member';
import { memberZ } from '~/types/member';

export const meta: MetaFunction<
  typeof loader,
  {
    root: RootLoader;
  }
> = ({ data, matches }) => {
  const rootData = matches.find((match) => match.id === `root`)?.data;
  const home = rootData ? rootData.initial.data : null;
  const title = [data?.initial?.data?.title, home?.siteTitle]
    .filter(Boolean)
    .join(' | ');
  const ogImageUrl = data ? data.ogImageUrl : null;

  return [
    { title },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:title', content: title },
    { property: 'og:title', content: title },
    { property: 'og:image:width', content: String(OG_IMAGE_WIDTH) },
    { property: 'og:image:height', content: String(OG_IMAGE_HEIGHT) },
    { property: 'og:image', content: ogImageUrl },
  ];
};

// Load the `record` document with this slug
export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  // Params from the loader uses the filename
  // $slug.tsx has the params { slug: 'hello-world' }
  const initial = await loadQuery<MemberDocument>(MEMBER_QUERY, params).then(
    (res) => ({ ...res, data: res.data ? memberZ.parse(res.data) : null })
  );

  if (!initial.data) {
    throw new Response('Not found', { status: 404 });
  }

  // Create social share image url
  const { origin } = new URL(request.url);
  const ogImageUrl = `${origin}/resource/og?id=${initial.data._id}`;

  return json({
    initial,
    query: MEMBER_QUERY,
    params,
    ogImageUrl,
  });
};

export default function MemberPage() {
  const { initial, query, params } = useLoaderData<typeof loader>();
  const castedInitial: QueryResponseInitial<typeof initial.data> =
    initial as QueryResponseInitial<typeof initial.data>;
  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    initial: castedInitial,
  });

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return <Member data={data} />;
}
