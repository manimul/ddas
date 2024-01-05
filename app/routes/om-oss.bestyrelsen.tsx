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
    <div className='grid grid-cols-1 border-orange-300 border-2  gap-6 lg:gap-12 '>
      <BoardMembers boardMembers={data} />
    </div>
  );
}
