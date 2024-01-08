import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';
import { Members } from '~/components/Members';
import type { Loader as RootLoader } from '~/root';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { MEMBERS_QUERY } from '~/sanity/queries';
import type { MemberStub } from '~/types/member';
import { memberStubsZ } from '~/types/member';

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

export default function Medlemmer() {
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
