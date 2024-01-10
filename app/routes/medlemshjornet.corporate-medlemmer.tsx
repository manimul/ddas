import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';
import { CorporateCTA } from '~/components/CorporateCTA';
import { CorporateMembers } from '~/components/CorporateMembers';
import type { Loader as RootLoader } from '~/root';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { CORPORATE_MEMBERS_QUERY } from '~/sanity/queries';
import type { CorporateMemberStub } from '~/types/corporateMember';
import { corporateMemberStubsZ } from '~/types/corporateMember';

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
