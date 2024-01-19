import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';
import { Country } from '~/components/Country';
import type { Loader as RootLoader } from '~/root';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/resource.og';
import { writeClient } from '~/sanity/client.server';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { COUNTRY_QUERY } from '~/sanity/queries';
import { COUNTRIES_QUERY } from '~/sanity/queries';
import { FILTERED_NEWSES_QUERY } from '~/sanity/queries';
import { Countries } from '~/components/Countries';
import { CountryStub } from '~/types/country';
import { CountryStubsZ } from '~/types/country';
import type { CountryDocument } from '~/types/country';
import { countryZ } from '~/types/country';
import { NewsDocument, newsesZ } from '~/types/news';

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
  const initial = await loadQuery<CountryDocument>(COUNTRY_QUERY, params).then(
    (res) => ({
      ...res,
      data: res.data ? countryZ.parse(res.data) : null,
    })
  );

  console.log('country params:', params);

  if (!initial.data) {
    throw new Response('Not found', { status: 404 });
  }

  // Fetch filtered news items related to this country
  const countryTag = initial.data._id; // or use another unique identifier
  const filteredNewsItems = await loadQuery<NewsDocument>(
    FILTERED_NEWSES_QUERY,
    { countryTag } // Passing countryTag as a parameter to the query
  ).then((res) => ({
    ...res,
    data: res.data ? newsesZ.parse(res.data) : null,
  }));

  // Create social share image url
  const { origin } = new URL(request.url);
  const ogImageUrl = `${origin}/resource/og?id=${initial.data._id}`;

  return json({
    initial,
    filteredNewsItems,
    query: COUNTRY_QUERY,
    query2: FILTERED_NEWSES_QUERY,

    params,
    ogImageUrl,
  });
};

export default function CountryPage() {
  const { initial, filteredNewsItems, query, query2, params } =
    useLoaderData<typeof loader>();

  const castedInitial: QueryResponseInitial<typeof initial.data> =
    initial as QueryResponseInitial<typeof initial.data>;

  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    initial: castedInitial,
  });

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  const castedFilteredNewsItems: QueryResponseInitial<
    typeof filteredNewsItems.data
  > = filteredNewsItems as QueryResponseInitial<typeof filteredNewsItems.data>;

  const { data: newsData, loading: newsLoading } = useQuery<
    typeof filteredNewsItems.data
  >(query2, params, {
    initial: castedFilteredNewsItems,
  });

  if (newsLoading || !newsData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Country data={data} newsData={newsData} />{' '}
    </>
  );
}
