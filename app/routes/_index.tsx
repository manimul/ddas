import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';
import { Members } from '~/components/Members';
import { Records } from '~/components/Records';
import type { Loader as RootLoader } from '~/root';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { RECORDS_QUERY, MEMBERS_QUERY } from '~/sanity/queries';
import type { MemberStub } from '~/types/member';
import { memberStubsZ } from '~/types/member';
import type { RecordStub } from '~/types/record';
import { recordStubsZ } from '~/types/record';

export const meta: MetaFunction<
  typeof loader,
  {
    root: RootLoader;
  }
> = ({ matches }) => {
  const rootData = matches.find((match) => match.id === `root`)?.data;
  const home = rootData ? rootData.initial.data : null;
  const title = [home?.title, home?.siteTitle].filter(Boolean).join(' | ');

  return [{ title }];
};

export const loader = async () => {
  const [membersResult, recordsResult] = await Promise.all([
    loadQuery<MemberStub[]>(MEMBERS_QUERY),
    loadQuery<RecordStub[]>(RECORDS_QUERY),
  ]);

  const members = {
    ...membersResult,
    data: membersResult.data ? memberStubsZ.parse(membersResult.data) : null,
  };

  if (!members.data) {
    throw new Response('Not found', { status: 404 });
  }

  const records = {
    ...recordsResult,
    data: recordsResult.data ? recordStubsZ.parse(recordsResult.data) : null,
  };

  if (!records.data) {
    throw new Response('Not found', { status: 404 });
  }

  return json({
    members,
    records,
    membersQuery: MEMBERS_QUERY,
    recordQuery: RECORDS_QUERY,
    params: {},
  });
};

export default function Index() {
  const { members, records, membersQuery, recordQuery, params } =
    useLoaderData<typeof loader>();

  const castedMembersInitial: QueryResponseInitial<typeof members.data> =
    members as QueryResponseInitial<typeof members.data>;
  const castedRecordsInitial: QueryResponseInitial<typeof records.data> =
    records as QueryResponseInitial<typeof records.data>;

  const { data: membersData, loading: membersLoading } = useQuery<
    typeof members.data
  >(membersQuery, params, {
    initial: castedMembersInitial,
  });

  const { data: recordsData, loading: recordsLoading } = useQuery<
    typeof records.data
  >(recordQuery, params, {
    initial: castedRecordsInitial,
  });

  if (membersLoading || !membersData || recordsLoading || !recordsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='grid grid-cols-1 gap-6 lg:gap-12'>
      <Records records={recordsData} />
      <Members members={membersData} />
    </div>
  );
}
