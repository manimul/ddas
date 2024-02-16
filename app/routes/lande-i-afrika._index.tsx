import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
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

export default function LandeIAfrikaIndex() {
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
    <div className='grid md:grid-cols-2 gap-12'>
      <div className='col-span-1 md:pr-16'>
        <h1 className='text-3xl mb-4  tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl'>
          Lande i Afrika:{' '}
          <span className='text-[#ff9602]'>
            Oplev Mangfoldigheden af et Kontinent
          </span>
        </h1>
        <p className='mt-3 text-gray-800 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
          Velkommen til vores fortegnelse over Afrika, et kontinent uden
          sidestykke med hensyn til mangfoldighed og skønhed. Begiv dig ud på en
          rejse gennem dets regioner, hver med sine egne unikke landskaber,
          kulturer og historier. Fra de vidstrakte savanner i syd til de
          dynamiske byer i vest, Afrika er en verden, der venter på at blive
          udforsket. Dyk ned for at lære, forbinde og blive inspireret.
        </p>
      </div>
      <AfricanRegions africanRegions={data} />
    </div>
  );
}
