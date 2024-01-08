import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';
import { BoardMembers } from '~/components/BoardMembers';

import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { BOARD_MEMBERS_QUERY } from '~/sanity/queries';
import type { BoardMemberStub } from '~/types/boardMember';
import { boardMemberStubsZ } from '~/types/boardMember';

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
  console.log(`initial data:` + initial);
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
      <div className=' grid  gap-x-4 gap-y-20  xl:grid-cols-3'>
        <div className=''>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl'>
            Vores bestyrelse
          </h2>
          <p className='mt-3 text-lg leading-8 text-gray-600'>
            Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae
            elementum enim vitae ullamcorper suspendisse.
          </p>
        </div>
        <BoardMembers boardMembers={data} />
      </div>
    </div>
  );
}
