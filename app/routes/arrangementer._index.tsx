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
  const slug = 'arrangementer'; // Static identifier for this route

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

export default function OmArrangementer() {
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
      <div className='grid md:grid-cols-8 gap-6 '>
        <div className=' col-span-4 space-y-4'>
          <h1 className='text-4xl '>{title}</h1>
          <Link
            to='/arrangementer/kommende-arrangementer/'
            className='hover:underline duration-300 ease-in-out transition-all '
            unstable_viewTransition
          >
            Visa Kommende Arrangementer{' '}
          </Link>
          {content && content?.length > 0 ? (
            <SanityContent value={content} />
          ) : null}
        </div>
        <div className='hidden md:block col-span-4'>
          <MemberImage image={image} />
        </div>
      </div>
    </>
  );
}
