import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';

import { Event } from '~/components/Event';
import type { Loader as RootLoader } from '~/root';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/resource.og';
import { writeClient } from '~/sanity/client.server';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { EVENT_QUERY } from '~/sanity/queries';
import type { EventDocument } from '~/types/event';
import { eventZ } from '~/types/event';

export const meta: MetaFunction<
  typeof loader,
  {
    root: RootLoader;
  }
> = ({ data, params, matches }) => {
  const rootData = matches.find((match) => match.id === `root`)?.data;
  const slug = params.slug; // Example of accessing the slug parameter

  const home = rootData ? rootData.initial.data : null;
  const title = [data?.initial?.data?.title, home?.siteTitle]
    .filter(Boolean)
    .join(' | ');
  const ogImageUrl = data ? data.ogImageUrl : null;
  const dynamicUrl = `https://afrikaselskabet.dk/arrangementer/kommende-arrangementer/${
    slug || ''
  }`;

  return [
    { title },
    { name: 'description', content: data?.initial?.data?.extract },

    //  <!-- Facebook Meta Tags -->
    { property: 'og:title', content: title },
    { property: 'og:image:width', content: String(OG_IMAGE_WIDTH) },
    { property: 'og:image:height', content: String(OG_IMAGE_HEIGHT) },
    { property: 'og:image', content: ogImageUrl },
    { property: 'og:description', content: data?.initial?.data?.extract },
    { property: 'og:url', content: dynamicUrl },
    { property: 'og:site_name', content: 'Det Danske Afrika Selskab ' },
    { property: 'og:locale', content: 'da_DK' },
    { property: 'og:type', content: 'website' },

    // <!-- Twitter Meta Tags -->
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:title', content: title },
    { property: 'twitter:image', content: ogImageUrl },
    { property: 'twitter:url', content: dynamicUrl },
    { property: 'twitter:description', content: data?.initial?.data?.extract },
    { property: 'twitter:domain', content: 'https://afrikaselskabet.dk/' },
  ];
};

// Load the `record` document with this slug
export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  // Params from the loader uses the filename
  // $slug.tsx has the params { slug: 'hello-world' }
  const initial = await loadQuery<EventDocument>(EVENT_QUERY, params).then(
    (res) => ({ ...res, data: res.data ? eventZ.parse(res.data) : null })
  );

  if (!initial.data) {
    throw new Response('Not found', { status: 404 });
  }

  // Create social share image url
  const { origin } = new URL(request.url);
  const ogImageUrl = `${origin}/resource/og?id=${initial.data._id}`;

  return json({
    initial,
    query: EVENT_QUERY,
    params,
    ogImageUrl,
  });
};

export default function EventPage() {
  const { initial, query, params } = useLoaderData<typeof loader>();
  const castedInitial: QueryResponseInitial<typeof initial.data> =
    initial as QueryResponseInitial<typeof initial.data>;
  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    initial: castedInitial,
  });

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return <Event data={data} />;
}
