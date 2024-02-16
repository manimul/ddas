import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useMatches } from '@remix-run/react';

import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';
import type { Loader as RootLoader } from '~/root';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { EVENTS_QUERY, NEWSES_QUERY } from '~/sanity/queries';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/resource.og';
import urlBuilder from '@sanity/image-url';

import type { EventStub } from '~/types/event';

import type { homeZ, HomeDocument } from '~/types/home';
import { eventStubsZ } from '~/types/event';
import { Events } from '~/components/Events';

import type { NewsStub } from '~/types/news';
import { newsStubsZ } from '~/types/news';
import { Newses } from '~/components/Newses';
import { MemberCTA } from '~/components/MemberCTA';
import { CorporateCTA } from '~/components/CorporateCTA';
import { Medlem } from '~/components/Medlem';
import { dataset, projectId } from '~/sanity/projectDetails';

export const meta: MetaFunction<
  typeof loader,
  {
    root: RootLoader;
  }
> = ({ matches }) => {
  const rootData = matches.find((match) => match.id === `root`)?.data;
  const home = rootData ? rootData.initial.data : null;
  const title = [home?.title, home?.heroHeading].filter(Boolean).join(' | ');
  const ogImage = home ? home.heroImage : null;
  const ogImageUrl = urlBuilder({ projectId, dataset })
    .image(ogImage.asset._ref)
    .height(800)
    .width(800)
    .fit('max')
    .auto('format')
    .url();

  console.log('ogImageUrl', ogImageUrl);

  return [
    { title },
    {
      property: 'twitter:card',
      content: ogImageUrl,
    },
    { property: 'twitter:title', content: title },
    { property: 'og:title', content: title },
    {
      property: 'description',
      content:
        'Bliv en del af et engageret fællesskab dedikeret til at udforske og forstå Afrikas rige kultur, historie og udvikling. Med over 150 medlemmer arrangerer vi inspirerende møder og udflugter, der åbner dørene til Afrikas mangfoldige verden.',
    },

    { property: 'og:image:width', content: String(OG_IMAGE_WIDTH) },
    { property: 'og:image:height', content: String(OG_IMAGE_HEIGHT) },
    {
      property: 'og:image',
      //content:'https://cdn.midjourney.com/1e96445f-bcbc-4cc0-b961-d97c7402d9be/0_0.webp',
      content: ogImageUrl,
    },
  ];
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
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

  const matches = useMatches();
  // Find the match object for the root. You might need to adjust the condition based on your route structure.
  const rootMatch = matches.find((match) => match.id === 'root');
  const rootData = rootMatch?.data;

  // Now rootData contains the data returned by the root loader, you can access `home` or any other data loaded there.
  const home = (rootData as { initial?: { data: any } })?.initial?.data;
  console.log('home', home);
  const ogImage = home ? home.heroImage : null;
  const ogImageUrl = urlBuilder({ projectId, dataset })
    .image(ogImage.asset._ref)
    .height(1273)
    .width(1529)
    .fit('max')
    .auto('format')
    .url();

  return (
    <>
      <section className=''>
        <div className=' grid  md:-mt-6  py-4  md:py-8 mx-auto lg:gap-4 xl:gap-0 lg:py-10 lg:grid-cols-12'>
          <div className='mr-auto md:order-1 order-2 place-self-center lg:col-span-6'>
            <h1 className='max-w-2xl mb-4 md:pr-6 text-4xl  tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white'>
              Udforsk Afrikas mangfoldighed med Det Danske Afrika Selskab
            </h1>
            <p className='max-w-2xl  md:pr-6 mb-4 font-light text-gray-800 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
              Bliv en del af et engageret fællesskab dedikeret til at udforske
              og forstå Afrikas rige kultur, historie og udvikling. Med over 150
              medlemmer arrangerer vi inspirerende møder og udflugter, der åbner
              dørene til Afrikas mangfoldige verden.
            </p>
            <Link
              unstable_viewTransition
              to='#mission'
              className='group  inline-flex items-center justify-center px-5 py-3 mr-3 uppercase text-sm  rounded-md p-4 tracking-wide  text-center   bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'
            >
              Lær mere
              <svg
                className='w-5 h-5 ml-2 -mr-1 rotate-90 group-hover:translate-y-3 transition-all duration-300'
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
            </Link>
            <Link
              unstable_viewTransition
              prefetch='viewport'
              to='ansog-om-medlemskab'
              className=' mx-auto  w-max inline-flex font-bold uppercase text-sm  rounded-md p-4 tracking-wide bg-gradient-to-br hover:bg-gradient-to-tr  from-[#FD9F1C] to-[#FF5107] text-black hover:opacity-100 hover:rounded-[30px]  duration-500     '
            >
              Bliv medlem{' '}
            </Link>
          </div>
          <div className=' lg:mt-0 order-1 md:order-2 md:-ml-6 md:-mr-24  lg:col-span-6 lg:flex rounded-2xl pb-4'>
            <img
              //src='https://cdn.midjourney.com/1e96445f-bcbc-4cc0-b961-d97c7402d9be/0_0.webp'
              src={ogImageUrl}
              alt='mockup'
              className='rounded-lg'
            />
          </div>
        </div>
      </section>
      <section
        id='mission'
        className='bg-[#101a1d] p-4 -ml-4 -mr-4  md:p-32 md:-ml-32 md:-mr-32  '
      >
        <h2 className='text-2xl pb-4 leading-loose text-[#FFB102]'>
          Vores Mission{' '}
        </h2>
        <p className='text-2xl md:text-5xl text-white '>
          Det Danske Afrika Selskab fremmer forståelse og samarbejde mellem
          Danmark og Afrika gennem dialog, netværk og uddannelsesaktiviteter.
          Selskapet styrker kendskabet til Afrikas kulturer, historie,
          udvikling, økonomi, politik og erhvervslivet.
        </p>
      </section>

      <section id='arrangementer'>
        <h2 className='text-2xl py-4 leading-loose text-[#ff9602]'>
          Kommende Arrangementer
        </h2>
        <Events events={eventsData} limit={1} />
      </section>

      <section id='personligt-medlem-cta'>
        <MemberCTA />
      </section>

      <section id='bliv-medlem'>
        <Medlem></Medlem>
      </section>

      <section id='nyheder'>
        <h2 className='text-2xl pb-4 leading-loose text-[#FFB102]'>Nyheder</h2>
        <Newses newses={newsesData} />
      </section>

      <section id='corporate-medlem-cta'>
        <CorporateCTA />
      </section>
    </>
  );
}
