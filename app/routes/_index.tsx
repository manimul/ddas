import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';
import { Members } from '~/components/Members';
import { Records } from '~/components/Records';
import type { Loader as RootLoader } from '~/root';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { RECORDS_QUERY, MEMBERS_QUERY, EVENTS_QUERY } from '~/sanity/queries';
import type { MemberStub } from '~/types/member';
import { memberStubsZ } from '~/types/member';
import type { RecordStub } from '~/types/record';
import { recordStubsZ } from '~/types/record';
import type { EventStub } from '~/types/event';
import { eventStubsZ } from '~/types/event';
import { Events } from '~/components/Events';

export const meta: MetaFunction<
  typeof loader,
  {
    root: RootLoader;
  }
> = ({ matches }) => {
  const rootData = matches.find((match) => match.id === `root`)?.data;
  const home = rootData ? rootData.initial.data : null;
  const title = [home?.title, home?.siteTitle].filter(Boolean).join(' | ');

  return [{ title }];
};

export const loader = async () => {
  const currentDate = new Date().toISOString();
  const isFuture = true;
  const [membersResult, eventsResult, recordsResult] = await Promise.all([
    loadQuery<MemberStub[]>(MEMBERS_QUERY),
    loadQuery<EventStub[]>(EVENTS_QUERY, {
      currentDate: currentDate,
      isFuture: isFuture,
    }),
    loadQuery<RecordStub[]>(RECORDS_QUERY),
  ]);

  const members = {
    ...membersResult,
    data: membersResult.data ? memberStubsZ.parse(membersResult.data) : null,
  };

  if (!members.data) {
    throw new Response('Not found', { status: 404 });
  }

  const events = {
    ...eventsResult,
    data: eventsResult.data ? eventStubsZ.parse(eventsResult.data) : null,
  };

  const records = {
    ...recordsResult,
    data: recordsResult.data ? recordStubsZ.parse(recordsResult.data) : null,
  };

  if (!records.data) {
    throw new Response('Not found', { status: 404 });
  }

  return json({
    members,
    events,
    records,
    membersQuery: MEMBERS_QUERY,
    eventsQuery: EVENTS_QUERY,
    recordQuery: RECORDS_QUERY,
    params: { isFuture: true, currentDate: new Date().toISOString() },
  });
};

export default function Index() {
  const {
    members,
    records,
    events,
    membersQuery,
    eventsQuery,
    recordQuery,
    params,
  } = useLoaderData<typeof loader>();

  const castedMembersInitial: QueryResponseInitial<typeof members.data> =
    members as QueryResponseInitial<typeof members.data>;
  const castedRecordsInitial: QueryResponseInitial<typeof records.data> =
    records as QueryResponseInitial<typeof records.data>;
  const castedEventsInitial: QueryResponseInitial<typeof events.data> =
    events as QueryResponseInitial<typeof events.data>;

  const { data: membersData, loading: membersLoading } = useQuery<
    typeof members.data
  >(membersQuery, params, {
    initial: castedMembersInitial,
  });

  const { data: eventsData, loading: eventsLoading } = useQuery<
    typeof events.data
  >(eventsQuery, params, {
    initial: castedEventsInitial,
  });

  const { data: recordsData, loading: recordsLoading } = useQuery<
    typeof records.data
  >(recordQuery, params, {
    initial: castedRecordsInitial,
  });

  if (
    membersLoading ||
    !membersData ||
    recordsLoading ||
    !recordsData ||
    eventsLoading ||
    !eventsData
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid grid-cols-1 gap-6 lg:gap-12'>
      {/* <Records records={recordsData} /> */}
      <section>
        <h2 className='uppercase text-sm opacity-60 leading-loose'>
          Kommende Arrangementer
        </h2>
        <Events events={eventsData} />
      </section>
      <Members members={membersData} />
    </div>
  );
}
