import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';
import { AfricanRegion } from '~/components/AfricanRegion';
import type { Loader as RootLoader } from '~/root';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/resource.og';
import { writeClient } from '~/sanity/client.server';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { AFRICAN_REGION_QUERY } from '~/sanity/queries';
import { COUNTRIES_QUERY } from '~/sanity/queries';
import { Countries } from '~/components/Countries';
import { CountryStub } from '~/types/country';
import { CountryStubsZ } from '~/types/country';
import type { AfricanRegionDocument } from '~/types/africanRegion';
import { africanRegionZ } from '~/types/africanRegion';

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
  const initial = await loadQuery<AfricanRegionDocument>(
    AFRICAN_REGION_QUERY,
    params
  ).then((res) => ({
    ...res,
    data: res.data ? africanRegionZ.parse(res.data) : null,
  }));

  if (!initial.data) {
    throw new Response('Not found', { status: 404 });
  }

  const countries = await loadQuery<CountryStub[]>(COUNTRIES_QUERY).then(
    (res) => ({
      ...res,
      data: res.data ? CountryStubsZ.parse(res.data) : null,
    })
  );

  if (!countries.data) {
    throw new Response('Not found', { status: 404 });
  }

  // Create social share image url
  const { origin } = new URL(request.url);
  const ogImageUrl = `${origin}/resource/og?id=${initial.data._id}`;

  return json({
    initial,
    countries,
    query: AFRICAN_REGION_QUERY,
    countriesQuery: COUNTRIES_QUERY,
    params,
    ogImageUrl,
  });
};

export default function AfricanRegionPage() {
  const { initial, countries, query, countriesQuery, params } =
    useLoaderData<typeof loader>();

  const castedInitial: QueryResponseInitial<typeof initial.data> =
    initial as QueryResponseInitial<typeof initial.data>;

  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    initial: castedInitial,
  });

  const castedCountries: QueryResponseInitial<typeof countries.data> =
    countries as QueryResponseInitial<typeof countries.data>;

  const { data: countryData, loading: countryLoading } = useQuery<
    typeof countries.data
  >(countriesQuery, params, {
    initial: castedCountries,
  });

  if (countryData && countryData.length > 0) {
    //console.log('Example Country:', countryData[0]);
  }

  const filteredCountries = countryData?.filter(
    (country) =>
      country.region?.some((regionRef) => regionRef._ref === data?._id)
  );

  //console.log('Number of Filtered Countries:', filteredCountries?.length);

  if (loading || !data || countryLoading || !filteredCountries) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
