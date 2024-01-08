import type { MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';
import { Newses } from '~/components/Newses';
import type { Loader as RootLoader } from '~/root';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { NEWSES_QUERY } from '~/sanity/queries';
import type { NewsStub } from '~/types/news';
import { newsStubsZ } from '~/types/news';

export const loader = async () => {
  const initial = await loadQuery<NewsStub[]>(NEWSES_QUERY).then((res) => ({
    ...res,
    data: res.data ? newsStubsZ.parse(res.data) : null,
  }));

  if (!initial.data) {
    throw new Response('Not found', { status: 404 });
  }

  return json({
    initial,
    query: NEWSES_QUERY,
    params: {},
  });
};

export default function Nyheder() {
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
    <div className='grid grid-cols-1 border-orange-300 border-2  gap-6 lg:gap-12'>
      <Newses newses={data} />
    </div>
  );
}
