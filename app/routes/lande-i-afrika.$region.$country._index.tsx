import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';
import { Country } from '~/components/Country';
import type { Loader as RootLoader } from '~/root';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/resource.og';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { COUNTRY_QUERY } from '~/sanity/queries';
import {
  FILTERED_NEWSES_QUERY,
  FILTERED_EVENTS_QUERY,
  FILTERED_MEMBERS_QUERY,
} from '~/sanity/queries';
import { EventDocument, eventsZ } from '~/types/event';
import type { CountryDocument } from '~/types/country';
import { countryZ } from '~/types/country';
import { NewsDocument, newsesZ } from '~/types/news';
import { MemberDocument, membersZ } from '~/types/member';

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

  const filteredMembers = await loadQuery<MemberDocument>(
    FILTERED_MEMBERS_QUERY,
    { countryTag } // Passing countryTag as a parameter to the query
  ).then((res) => ({
    ...res,
    data: res.data ? membersZ.parse(res.data) : null,
  }));

  const currentDate = new Date().toISOString();
  const isFuture = true; // Set to false if you want past events

  const filteredEvents = await loadQuery<EventDocument>(
    FILTERED_EVENTS_QUERY,
    { countryTag, currentDate: currentDate, isFuture: isFuture } // Passing countryTag as a parameter to the query
  ).then((res) => ({
    ...res,
    data: res.data ? eventsZ.parse(res.data) : null,
  }));

  // Create social share image url
  const { origin } = new URL(request.url);
  const ogImageUrl = `${origin}/resource/og?id=${initial.data._id}`;

  return json({
    initial,
    filteredNewsItems,
    filteredEvents,
    filteredMembers,
    query: COUNTRY_QUERY,
    query2: FILTERED_NEWSES_QUERY,
    query3: FILTERED_EVENTS_QUERY,
    query4: FILTERED_MEMBERS_QUERY,
    params: { currentDate, isFuture },
    ogImageUrl,
  });
};

export default function CountryIndexPage() {
  const {
    initial,
    filteredNewsItems,
    filteredEvents,
    filteredMembers,
    query,
    query2,
    query3,
    query4,
    params,
  } = useLoaderData<typeof loader>();

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
  const castedFilteredEvents: QueryResponseInitial<typeof filteredEvents.data> =
    filteredEvents as QueryResponseInitial<typeof filteredEvents.data>;

  const { data: eventsData, loading: eventsLoading } = useQuery<
    typeof filteredEvents.data
  >(query3, params, {
    initial: castedFilteredEvents,
  });

  if (eventsLoading || !eventsData) {
    return <div>Loading...</div>;
  }

  const castedFilteredMembers: QueryResponseInitial<
    typeof filteredMembers.data
  > = filteredMembers as QueryResponseInitial<typeof filteredMembers.data>;

  const { data: membersData, loading: membersLoading } = useQuery<
    typeof filteredMembers.data
  >(query4, params, {
    initial: castedFilteredMembers,
  });

  if (membersLoading || !membersData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Country
        data={data}
        newsData={newsData}
        eventsData={eventsData}
        membersData={membersData.map((member) => ({
          ...member,
          _type: 'member',
        }))}
      />
    </>
  );
}
