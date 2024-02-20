import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';
import { Members } from '~/components/Members';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/resource.og';

import type { Loader as RootLoader } from '~/root';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { MEMBERS_QUERY } from '~/sanity/queries';
import type { MemberStub } from '~/types/member';
import { memberStubsZ } from '~/types/member';

export const meta: MetaFunction<
  typeof loader,
  {
    root: RootLoader;
  }
> = ({ data, matches }) => {
  const rootData = matches.find((match) => match.id === `root`)?.data;
  const home = rootData ? rootData.initial.data : null;
  const title = ['Medlemmer', home?.siteTitle].filter(Boolean).join(' | ');

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
  const initial = await loadQuery<MemberStub[]>(MEMBERS_QUERY).then((res) => ({
    ...res,
    data: res.data ? memberStubsZ.parse(res.data) : null,
  }));

  if (!initial.data) {
    throw new Response('Not found', { status: 404 });
  }

  return json({
    initial,
    query: MEMBERS_QUERY,
    params: {},
  });
};

export default function MedlemmerIndex() {
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
    <div className='grid grid-cols-1 gap-6 lg:gap-12'>
      <Members members={data} />
    </div>
  );
}
