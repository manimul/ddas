import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';
import { CorporateCTA } from '~/components/CorporateCTA';
import { CorporateMembers } from '~/components/CorporateMembers';
import type { Loader as RootLoader } from '~/root';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/resource.og';

import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { CORPORATE_MEMBERS_QUERY } from '~/sanity/queries';
import type { CorporateMemberStub } from '~/types/corporateMember';
import { corporateMemberStubsZ } from '~/types/corporateMember';

export const meta: MetaFunction<
  typeof loader,
  {
    root: RootLoader;
  }
> = ({ data, matches }) => {
  const rootData = matches.find((match) => match.id === `root`)?.data;
  const home = rootData ? rootData.initial.data : null;
  const title = ['Virksomhedsmedlem', home?.siteTitle]
    .filter(Boolean)
    .join(' | ');

  return [
    { title },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:title', content: title },
    { propery: 'og:locale', content: 'da_DK' },

    {
      property: 'og:description',
      content:
        'Vi er i dag over 150 medlemmer med hver vores historie og oplevelser med Afrika.',
    },
    {
      property: 'description',
      content:
        'Vi er i dag over 150 medlemmer med hver vores historie og oplevelser med Afrika.',
    },
    { property: 'og:title', content: title },
    { property: 'og:image:width', content: String(OG_IMAGE_WIDTH) },
    { property: 'og:image:height', content: String(OG_IMAGE_HEIGHT) },
  ];
};

export const loader = async () => {
  const initial = await loadQuery<CorporateMemberStub[]>(
    CORPORATE_MEMBERS_QUERY
  ).then((res) => ({
    ...res,
    data: res.data ? corporateMemberStubsZ.parse(res.data) : null,
  }));

  if (!initial.data) {
    throw new Response('Not found', { status: 404 });
  }

  return json({
    initial,
    query: CORPORATE_MEMBERS_QUERY,
    params: {},
  });
};

export default function CorporateMedlemmer() {
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
    <div className='   '>
      <CorporateMembers corporateMembers={data} />
      <CorporateCTA />
    </div>
  );
}
