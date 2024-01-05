import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';
import { BoardMembers } from '~/components/BoardMembers';
import { Events } from '~/components/Events';

import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { EVENTS_QUERY } from '~/sanity/queries';
import type { EventStub } from '~/types/event';
import { eventStubsZ } from '~/types/event';

export const loader = async () => {
  const currentDate = new Date().toISOString();
  const isFuture = false; // Set to false if you want past events

  const initial = await loadQuery<EventStub[]>(EVENTS_QUERY, {
    currentDate: currentDate,
    isFuture: isFuture,
  }).then((res) => ({
    ...res,
    data: res.data ? eventStubsZ.parse(res.data) : null,
  }));

  if (!initial.data) {
    throw new Response('Not found', { status: 404 });
  }
  console.log(`initial data:` + initial);
  return json({
    initial,
    query: EVENTS_QUERY,
    params: { currentDate, isFuture },
  });
};

export default function AfholdteArrangementer() {
  const { initial, query, params } = useLoaderData<typeof loader>();

  const castedInitial: QueryResponseInitial<typeof initial.data> =
    initial as QueryResponseInitial<typeof initial.data>;

  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    initial: castedInitial,
  });

  if (loading || !data) {
    return <div>Loading...</div>;
  }
  return (
    <div className='grid grid-cols-1 border-orange-300 border-2  gap-6 lg:gap-12 '>
      <Events events={data} />
    </div>
  );
}
