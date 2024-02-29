import { Link, NavLink, Outlet } from '@remix-run/react';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Loader as RootLoader } from '~/root';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/resource.og';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { MEMBERSHIP_QUERY } from '~/sanity/queries';
import type { MembershipDocument } from '~/types/membership';
import { membershipZ } from '~/types/membership';
import { QueryResponseInitial } from '@sanity/react-loader';

export const meta: MetaFunction<
  typeof loader,
  {
    root: RootLoader;
  }
> = ({ data, matches }) => {
  const rootData = matches.find((match) => match.id === `root`)?.data;
  const home = rootData ? rootData.initial.data : null;
  const title = [data?.initial?.data?.membershipTitle, home?.siteTitle]
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

  try {
    const initial = await loadQuery<MembershipDocument>(MEMBERSHIP_QUERY).then(
      (res) => ({ ...res, data: res.data ? membershipZ.parse(res.data) : null })
    );

    if (!initial.data) {
      throw new Response('Not found', { status: 404 });
    }

    // Create social share image URL
    const { origin } = new URL(request.url);
    const ogImageUrl = `${origin}/resource/og?id=${initial.data._id}`;

    return json({
      initial,
      query: MEMBERSHIP_QUERY,
      params: { ...params }, // Update params with the used slug
      ogImageUrl,
    });
  } catch (error) {
    console.error('Error loading page:', error);
    throw new Response('Error loading page', { status: 500 });
  }
};

export default function AnsogOmMedlemskab() {
  const { initial, query, params } = useLoaderData<typeof loader>();

  const castedInitial: QueryResponseInitial<typeof initial.data> =
    initial as QueryResponseInitial<typeof initial.data>;

  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    initial: castedInitial,
  });

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  const {
    membershipTitle,
    membershipText,
    personalMembershipText,
    personalMembershipTitle,
    corporateMembershipText,
    corporateMembershipTitle,
    ngoMembershipText,
    ngoMembershipTitle,
  } = data;

  return (
    <>
      <div className='flex flex-col md:flex-row justify-start space-y-2 md:space-y-0 md:space-x-4  '>
        {' '}
        <NavLink
          to=''
          end
          className={({ isActive, isPending }) =>
            isPending
              ? 'pending'
              : isActive
                ? 'active font-bold border-b-2 border-[#f59e0b] decoration-[#f59e0b] duration-100 ease-in transition-all'
                : 'font-light text-gray-500 hover:text-gray-700'
          }
        >
          Ansog Om Medlemskab
        </NavLink>
        <NavLink
          to='personligt'
          className={({ isActive, isPending }) =>
            isPending
              ? 'pending'
              : isActive
                ? 'active font-bold border-b-2 border-[#f59e0b] decoration-[#f59e0b] duration-100 ease-in transition-all'
                : 'font-light text-gray-500 hover:text-gray-700'
          }
        >
          Personligt
        </NavLink>
        <NavLink
          to='virksomhed'
          className={({ isActive, isPending }) =>
            isPending
              ? 'pending'
              : isActive
                ? 'active font-bold border-b-2 border-[#f59e0b] decoration-[#f59e0b] '
                : 'font-light text-gray-500 hover:text-gray-700'
          }
        >
          Virksomhed
        </NavLink>
        <NavLink
          to='ngo'
          className={({ isActive, isPending }) =>
            isPending
              ? 'pending'
              : isActive
                ? 'active font-bold border-b-2 border-[#f59e0b] decoration-[#f59e0b] '
                : 'font-light text-gray-500 hover:text-gray-700'
          }
        >
          NGO
        </NavLink>
      </div>
      <Outlet context={data} />
    </>
  );
}
