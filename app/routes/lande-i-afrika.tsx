import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';
import { AfricanRegions } from '~/components/AfricanRegions';

import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { AFRICAN_REGIONS_QUERY } from '~/sanity/queries';
import { AfricanRegionStub } from '~/types/africanRegion';

import { africanRegionStubsZ } from '~/types/africanRegion';

export const loader = async () => {
  const initial = await loadQuery<AfricanRegionStub[]>(
    AFRICAN_REGIONS_QUERY
  ).then((res) => ({
    ...res,
    data: res.data ? africanRegionStubsZ.parse(res.data) : null,
  }));

  if (!initial.data) {
    throw new Response('Not found', { status: 404 });
  }
  console.log(`initial data:` + initial);
  return json({
    initial,
    query: AFRICAN_REGIONS_QUERY,
    params: {},
  });
};

export default function LandeIAfrika() {
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
      <h2 className='text-3xl mb-4  tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl'>
        Lande i Afrika
      </h2>
      <div className=' '>
        <div className=''></div>
        <AfricanRegions africanRegions={data} />
      </div>
    </div>
  );
}
