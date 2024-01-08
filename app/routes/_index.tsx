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
    <>
      <section className=''>
        <div className=' grid   md:max-w-screen-xl py-4  md:py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-10 lg:grid-cols-12'>
          <div className='mr-auto md:order-1 order-2 place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl mb-4 text-4xl  tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white'>
              Udforsk Afrikas mangfoldighed med Det Danske Afrika Selskab
            </h1>
            <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
              Bliv en del af et engageret fællesskab dedikeret til at udforske
              og forstå Afrikas rige kultur, historie og udvikling. Med over 150
              medlemmer, arrangerer vi inspirerende møder og udflugter, der
              åbner dørene til Afrikas mangfoldige verden.
            </p>
            <a
              href='#'
              className='inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center  rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'
            >
              Lær mere
              <svg
                className='w-5 h-5 ml-2 -mr-1'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
            <a
              href='#'
              className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
            >
              Bliv medlem{' '}
            </a>
          </div>
          <div className=' lg:mt-0 order-1 md:order-2  lg:col-span-5 lg:flex rounded-2xl pb-4'>
            <img
              src='https://cdn.midjourney.com/1e96445f-bcbc-4cc0-b961-d97c7402d9be/0_0.webp'
              alt='mockup'
              className='rounded-lg'
            />
          </div>
        </div>
      </section>

      <div className='grid grid-cols-1 gap-6 lg:gap-12'>
        {/* <Records records={recordsData} /> */}

        <section>
          <h2 className='uppercase text-sm opacity-60 leading-loose'>
            Kommende Arrangementer
          </h2>
          <Events events={eventsData} />
        </section>
        <section>
          <h2 className='uppercase text-sm opacity-60 leading-loose'>
            Nyheder
          </h2>
          <Events events={eventsData} />
        </section>
      </div>
    </>
  );
}
