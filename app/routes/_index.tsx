import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';
import type { Loader as RootLoader } from '~/root';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { EVENTS_QUERY, NEWSES_QUERY } from '~/sanity/queries';

import type { EventStub } from '~/types/event';
import { eventStubsZ } from '~/types/event';
import { Events } from '~/components/Events';

import type { NewsStub } from '~/types/news';
import { newsStubsZ } from '~/types/news';
import { Newses } from '~/components/Newses';
import { MemberCTA } from '~/components/MemberCTA';
import { CorporateCTA } from '~/components/CorporateCTA';

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
  const [eventsResult, newsesResult] = await Promise.all([
    loadQuery<EventStub[]>(EVENTS_QUERY, {
      currentDate: currentDate,
      isFuture: isFuture,
    }),
    loadQuery<NewsStub[]>(NEWSES_QUERY, {
      currentDate: currentDate,
      isFuture: isFuture,
    }),
  ]);

  const events = {
    ...eventsResult,
    data: eventsResult.data ? eventStubsZ.parse(eventsResult.data) : null,
  };

  const newses = {
    ...newsesResult,
    data: newsesResult.data ? newsStubsZ.parse(newsesResult.data) : null,
  };

  return json({
    events,
    newses,
    eventsQuery: EVENTS_QUERY,
    newsesQuery: NEWSES_QUERY,
    params: { isFuture: true, currentDate: new Date().toISOString() },
  });
};

export default function Index() {
  const { events, newses, eventsQuery, newsesQuery, params } =
    useLoaderData<typeof loader>();

  const castedEventsInitial: QueryResponseInitial<typeof events.data> =
    events as QueryResponseInitial<typeof events.data>;

  const castedNewsesInitial: QueryResponseInitial<typeof newses.data> =
    newses as QueryResponseInitial<typeof newses.data>;

  const { data: eventsData, loading: eventsLoading } = useQuery<
    typeof events.data
  >(eventsQuery, params, {
    initial: castedEventsInitial,
  });

  if (eventsLoading || !eventsData) {
    return <div>Loading...</div>;
  }

  const { data: newsesData, loading: newsesLoading } = useQuery<
    typeof newses.data
  >(newsesQuery, params, {
    initial: castedNewsesInitial,
  });

  if (eventsLoading || !eventsData || newsesLoading || !newsesData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className=''>
        <div className=' grid   md:max-w-screen-xl py-4  md:py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-10 lg:grid-cols-12'>
          <div className='mr-auto md:order-1 order-2 place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl mb-4 md:pr-6 text-4xl  tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white'>
              Udforsk Afrikas mangfoldighed med Det Danske Afrika Selskab
            </h1>
            <p className='max-w-2xl  md:pr-6 mb-4 font-light text-gray-500 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
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
              className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-[#f59e0b] rounded-lg hover:bg-[#f59e0b] focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
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
          <h2 className='text-2xl py-4 leading-loose'>
            Kommende Arrangementer
          </h2>
          <Events events={eventsData} />
        </section>
        <MemberCTA />

        <section>
          <h2 className=' text-2xl  py-4   leading-loose'>Nyheder</h2>
          <Newses newses={newsesData} />
        </section>
        <CorporateCTA />
      </div>
    </>
  );
}
