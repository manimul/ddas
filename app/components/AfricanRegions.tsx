import { Link } from '@remix-run/react';
import { MemberImage } from '~/components/MemberImage';
import type { AfricanRegionStub } from '~/types/africanRegion';
import type { CountryStub } from '~/types/country';
import { SanityContent } from './SanityContent';
import type { SanityImageObjectStub } from '@sanity/asset-utils';
import urlBuilder from '@sanity/image-url';
import { dataset, projectId } from '~/sanity/projectDetails';

type AfricanRegionsProps = {
  africanRegions: AfricanRegionStub[];
};

export function AfricanRegions(props: AfricanRegionsProps) {
  const { africanRegions = [] } = props;
  return africanRegions.length > 0 ? (
    <ul
      role='list'
      className='grid gap-x-5 gap-y-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-y-16 xl:col-span-2'
    >
      {africanRegions.map((africanRegion) => (
        <li className='hover:-translate-y-3 group' key={africanRegion._id}>
          {africanRegion?.slug && (
            <Link to={africanRegion?.slug}>
              <div className='flex items-start gap-x-4'>
                {africanRegion.image ? (
                  <img
                    src={urlBuilder({ projectId, dataset })
                      // @ts-ignore
                      .image(africanRegion.image.asset._ref)
                      .height(600)
                      .width(800)
                      .fit('max')
                      .auto('format')
                      .url()}
                    alt={africanRegion.image?.alt ?? ``}
                    loading='lazy'
                  />
                ) : (
                  <div className='flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-500'>
                    Missing Region image
                  </div>
                )}

                <div className='absolute  bg-white p-2'>
                  <h2 className='text-3xl'>
                    {africanRegion.title?.toLowerCase()}
                  </h2>
                </div>
              </div>
            </Link>
          )}
        </li>
      ))}
    </ul>
  ) : (
    <div className='prose prose-xl mx-auto bg-green-50 p-4'>
      <p>No countries found, yet!</p>
    </div>
  );
}
