import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
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
  const isFuture = true; // Set to false if you want past events

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
  //console.log(`initial data:` + initial);
  return json({
    initial,
    query: EVENTS_QUERY,
    params: { currentDate, isFuture },
  });
};

export default function KommendeArrangementer() {
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
    <div id='kommende' className=' '>
      <Events events={data} />
      <Outlet />
    </div>
  );
}
