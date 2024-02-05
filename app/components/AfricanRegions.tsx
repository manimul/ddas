import { Link } from '@remix-run/react';
import type { AfricanRegionStub } from '~/types/africanRegion';
import urlBuilder from '@sanity/image-url';
import { dataset, projectId } from '~/sanity/projectDetails';
import { MoveRight } from 'lucide-react';

type AfricanRegionsProps = {
  africanRegions: AfricanRegionStub[];
};

export function AfricanRegions(props: AfricanRegionsProps) {
  const { africanRegions = [] } = props;
  return africanRegions.length > 0 ? (
    <ul role='list' className=''>
      {africanRegions.map((africanRegion) => (
        <li className='group' key={africanRegion._id}>
          {africanRegion?.slug && (
            <Link to={africanRegion?.slug}>
              <div className='grid group grid-cols-2 gap-3 py-1 items-end '>
                {africanRegion.image ? (
                  <>
                    <img
                      src={urlBuilder({ projectId, dataset })
                        // @ts-ignore
                        .image(africanRegion.image.asset._ref)
                        .height(150)
                        .width(400)
                        .fit('max')
                        .auto('format')
                        .url()}
                      alt={africanRegion.image?.alt ?? ``}
                      className=' duration-200 w-full object-cover rounded-md group-hover:rounded-l-[100px] overflow-hidden '
                      loading='lazy'
                    />
                  </>
                ) : (
                  <div className='flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-500'>
                    Missing Region image
                  </div>
                )}

                <h2 className='text-3xl group-hover:translate-x-3 duration-200 align-bottom'>
                  {africanRegion.title}{' '}
                  <MoveRight className='hidden group-hover:inline-flex space-x-2' />
                  <h3 className='hidden opacity-0 group-hover:inline-flex group-hover:opacity-100 duration-150  text-green-500'>
                    {' '}
                    {africanRegion.subtitle}
                  </h3>
                </h2>
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
