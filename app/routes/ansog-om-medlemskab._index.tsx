import { Link, NavLink, Outlet } from '@remix-run/react';
import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Loader as RootLoader } from '~/root';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/resource.og';
import { writeClient } from '~/sanity/client.server';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { PAGE_QUERY } from '~/sanity/queries';
import type { PageDocument } from '~/types/page';
import { pageZ } from '~/types/page';
import { SanityContent } from '~/components/SanityContent';
import { MemberImage } from '~/components/MemberImage';
import { QueryResponseInitial } from '@sanity/react-loader';
import {
  Blocks,
  BookOpenText,
  CalendarCheck2,
  Globe2,
  Mails,
  Waypoints,
} from 'lucide-react';

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
  // Determine the slug to use
  const slug = 'medlemsskab'; // Static identifier for this route

  // Check if the slug is valid
  if (!slug) {
    console.error('No slug provided');
    throw new Response('Not found', { status: 404 });
  }

  try {
    const queryParams = { slug: slug }; // Ensure this matches your GROQ query
    const initial = await loadQuery<PageDocument>(PAGE_QUERY, queryParams).then(
      (res) => ({ ...res, data: res.data ? pageZ.parse(res.data) : null })
    );

    if (!initial.data) {
      throw new Response('Not found', { status: 404 });
    }

    // Create social share image URL
    const { origin } = new URL(request.url);
    const ogImageUrl = `${origin}/resource/og?id=${initial.data._id}`;

    return json({
      initial,
      query: PAGE_QUERY,
      params: { ...params, slug }, // Update params with the used slug
      ogImageUrl,
    });
  } catch (error) {
    console.error('Error loading page:', error);
    throw new Response('Error loading page', { status: 500 });
  }
};

export default function AnsogOmMedlemskabIndex() {
  const { initial, query, params } = useLoaderData<typeof loader>();

  const castedInitial: QueryResponseInitial<typeof initial.data> =
    initial as QueryResponseInitial<typeof initial.data>;

  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    initial: castedInitial,
  });

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  const { _id, title, subtitle, content, image } = data;

  return (
    <>
      <section>
        <div className=''>
          <div className='grid grid-cols-1 gap-y-8 lg:grid-cols-3  lg:gap-x-16'>
            <div className=' max-w-lg col-span-1  lg:mx-0 '>
              <h1 className='text-4xl '>{title}</h1>

              <p className='mt-4 text-gray-600'>
                {content && content?.length > 0 ? (
                  <SanityContent value={content} />
                ) : null}
              </p>
            </div>

            <div className='grid col-span-2  grid-cols-2 gap-4 sm:grid-cols-3'>
              <a
                className='block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring'
                href='#'
              >
                <span className='inline-block rounded-lg  '>
                  {' '}
                  <Waypoints />
                </span>

                <h2 className='mt-2 font-bold'>Netværk med Ligesindede:</h2>

                <p className='hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600'>
                  Mød og forbind med et netværk af personer, der deler din
                  passion for Afrika.
                </p>
              </a>

              <a
                className='block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring'
                href='#'
              >
                <span className='inline-block rounded-lg  '>
                  <CalendarCheck2 />
                </span>

                <h2 className='mt-2 font-bold'>
                  Eksklusive Møder og Udflugter:
                </h2>

                <p className='hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600'>
                  Få adgang til inspirerende møder og unikke udflugter, der er
                  designet til at udforske Afrikas kultur, historie og nutid.
                </p>
              </a>

              <a
                className='block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring'
                href='#'
              >
                <span className='inline-block rounded-lg  '>
                  <BookOpenText />
                </span>

                <h2 className='mt-2 font-bold'>
                  Uddannelsesmæssige Ressourcer:
                </h2>

                <p className='hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600'>
                  Adgang til en rig samling af ressourcer for dybere forståelse
                  af Afrikas komplekse samfund.
                </p>
              </a>

              <a
                className='block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring'
                href='#'
              >
                <span className='inline-block rounded-lg  '>
                  <Blocks />
                </span>

                <h2 className='mt-2 font-bold'>
                  Kulturel og Forretningsmæssig Udveksling:
                </h2>

                <p className='hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600'>
                  Deltag i unikke programmer, der fremmer både kulturel
                  forståelse og forretningsmæssigt samarbejde mellem Danmark og
                  Afrika.
                </p>
              </a>

              <a
                className='block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring'
                href='#'
              >
                <span className='inline-block rounded-lg  '>
                  <Globe2 />
                </span>

                <h2 className='mt-2 font-bold'>Kulturelle Begivenheder:</h2>

                <p className='hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600'>
                  Invitationer til eksklusive kulturelle arrangementer, der
                  fejrer Afrikas mangfoldige traditioner og samfund.
                </p>
              </a>

              <a
                className='block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring'
                href='#'
              >
                <span className='inline-block rounded-lg  '>
                  <Mails />
                </span>

                <h2 className='mt-2 font-bold'>Nyhedsbreve og Opdateringer:</h2>

                <p className='hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600'>
                  Hold dig informeret med de seneste nyheder og opdateringer om
                  Afrika samt selskabets aktiviteter.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className='grid md:grid-cols-3 gap-6 '>
        <p className='text-2xl  '>
          Uanset om du er en person med{' '}
          <span className='text-orange-500'>passion for afrikansk kultur </span>
          eller en virksomhed, der søger at{' '}
          <span className='text-orange-500'>
            skabe meningsfulde forbindelser
          </span>
          , tilbyder vi{' '}
          <span className='text-orange-500'>
            personlige og virksomhedsmedlemskaber
          </span>
          , der passer til dine behov.
        </p>

        <Link
          className='bg-cover bg-center relative text-white font-bold py-2 px-4 rounded'
          to='../../../ansog-om-medlemskab/personligt'
          style={{
            backgroundImage:
              "url('https://cdn.midjourney.com/7f1b20ca-c243-4a2c-8feb-998de0488f14/0_2.webp')",
            width: 'auto',
            height: '200px',
          }}
        >
          <span className='absolute inset-0 flex justify-center bg-black bg-opacity-25 hover:backdrop-grayscale duration-150	 items-center text-2xl'>
            Personligt Medlemskab
          </span>
        </Link>
        <Link
          to='../../../ansog-om-medlemskab/virksomhed'
          className='bg-cover bg-center relative text-white font-bold py-2 px-4 rounded'
          style={{
            backgroundImage:
              "url('https://cdn.midjourney.com/3aa676ab-27e9-4b9c-abcd-0e0ab8768ecb/0_0.webp')",
            width: 'auto',
            height: '200px',
          }}
        >
          <span className='absolute inset-0 flex justify-center items-center drop-shadow-lg bg-black bg-opacity-25  hover:backdrop-grayscale duration-150	  p-2 text-2xl'>
            Virksomhedsmedlemskab
          </span>
        </Link>
      </div>
    </>
  );
}
