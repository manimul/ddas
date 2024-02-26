import { json } from '@remix-run/node';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';

import { useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';
import { BoardMembers } from '~/components/BoardMembers';
import type { Loader as RootLoader } from '~/root';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { BOARD_MEMBERS_QUERY } from '~/sanity/queries';
import type { BoardMemberStub } from '~/types/boardMember';
import { boardMemberStubsZ } from '~/types/boardMember';

export const meta: MetaFunction<
  typeof loader,
  {
    root: RootLoader;
  }
> = ({ data, matches }) => {
  const rootData = matches.find((match) => match.id === `root`)?.data;
  const home = rootData ? rootData.initial.data : null;
  const title = ['Vores bestyrelse', home?.siteTitle]
    .filter(Boolean)
    .join(' | ');

  return [
    { title },
    { property: 'twitter:title', content: title },
    { property: 'og:title', content: title },

    { property: 'og:locale', content: 'da_DK' },
    {
      property: 'description',
      content:
        ' Vores bestyrelse forener en dyb passion for Afrika med enestående ekspertise.',
    },
    {
      property: 'og:description',
      content:
        ' Vores bestyrelse forener en dyb passion for Afrika med enestående ekspertise.',
    },
  ];
};

export const loader = async () => {
  const initial = await loadQuery<BoardMemberStub[]>(BOARD_MEMBERS_QUERY).then(
    (res) => ({
      ...res,
      data: res.data ? boardMemberStubsZ.parse(res.data) : null,
    })
  );

  if (!initial.data) {
    throw new Response('Not found', { status: 404 });
  }
  //console.log(`initial data:` + initial);
  return json({
    initial,
    query: BOARD_MEMBERS_QUERY,
    params: {},
  });
};

export default function Bestyrelsen() {
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
    <div className=' '>
      <div className=' grid  gap-x-4 gap-y-4 md:gap-y-20  xl:grid-cols-3'>
        <div className=''>
          <h2 className='text-3xl  tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl'>
            Vores bestyrelse
          </h2>
          <p className='mt-3 text-gray-800 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
            Vores bestyrelse forener en dyb passion for Afrika med enestående
            ekspertise.
          </p>
        </div>
        <BoardMembers boardMembers={data} />
      </div>
    </div>
  );
}
