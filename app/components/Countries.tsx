import { Link } from '@remix-run/react';
import type { CountryStub } from '~/types/country';
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
      className='grid gap-1 sm:grid-cols-2 md:grid-cols-3  xl:col-span-2'
    >
      {countries.map((country) => (
        <li className=' group' key={country._id}>
          {country?.slug && (
            <Link to={country?.slug}>
              <div className='flex items-start '>
                {country.image ? (
                  <img
                    className='group-hover:rounded-[30px] duration-150'
                    src={urlBuilder({ projectId, dataset })
                      // @ts-ignore
                      .image(country.image.asset._ref)
                      .height(500)
                      .width(800)
                      .fit('max')
                      .auto('format')
                      .url()}
                    alt={country.image?.alt ?? ``}
                    loading='lazy'
                  />
                ) : (
                  <div className='flex aspect-video w-full items-center justify-center bg-gray-100 text-gray-500'>
                    Missing country image
                  </div>
                )}

                <div className='absolute backdrop-blur-sm bg-white/10 text-white p-2 group-hover:rounded-tl-[30px] duration-150 '>
                  {country.title && (
                    <h2 className='text-xl w-min    '>{country.title}</h2>
                  )}
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
