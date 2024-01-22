import { Link } from '@remix-run/react';
import { MemberImage } from '~/components/MemberImage';
import type { CountryStub } from '~/types/country';
import { SanityContent } from './SanityContent';
import type { SanityImageObjectStub } from '@sanity/asset-utils';
import urlBuilder from '@sanity/image-url';
import { dataset, projectId } from '~/sanity/projectDetails';

type CountriesProps = {
  countries: CountryStub[];
};

export function Countries(props: CountriesProps) {
  const { countries = [] } = props;
  return countries.length > 0 ? (
    <ul
      role='list'
      className='grid gap-x-5 gap-y-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-y-16 xl:col-span-2'
    >
      {countries.map((country) => (
        <li className='hover:-translate-y-3 group' key={country._id}>
          {country?.slug && (
            <Link to={country?.slug}>
              <div className='flex items-start gap-x-4'>
                {country.image ? (
                  <img
                    src={urlBuilder({ projectId, dataset })
                      // @ts-ignore
                      .image(country.image.asset._ref)
                      .height(600)
                      .width(800)
                      .fit('max')
                      .auto('format')
                      .url()}
                    alt={country.image?.alt ?? ``}
                    loading='lazy'
                  />
                ) : (
                  <div className='flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-500'>
                    Missing country image
                  </div>
                )}

                <div className='absolute  bg-white p-2'>
                  <h2 className='text-3xl'>{country.title?.toLowerCase()}</h2>
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
