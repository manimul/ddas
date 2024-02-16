import { Link } from '@remix-run/react';
import { Logo } from '~/components/Logo';
import type { LogoProps } from '~/types/home';

export function Footer(props: LogoProps) {
  return (
    <footer className='relative pb-6'>
      <hr className='mb-6 border-blueGray-300' />

      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap text-left lg:text-left'>
          <div className='w-full lg:w-6/12 px-4'>
            <Logo home={props.home} />
          </div>
          <div className='w-full lg:w-6/12 px-4'>
            <div className='flex flex-wrap items-top mb-6'>
              <div className='w-full lg:w-4/12 px-4 ml-auto'>
                <span className='text-xs items-center  md:text-sm uppercase tracking-widest pb-2 inline-flex  text-gray-500 space-x-2  '>
                  Info
                </span>
                <ul className='list-unstyled'>
                  <li>
                    <Link
                      to='om-oss'
                      className='text-gray-600 hover:text-gray-900 font-semibold block pb-2 text-sm'
                    >
                      Om Oss
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='text-gray-600 hover:text-gray-900 font-semibold block pb-2 text-sm'
                      to='arrangementer/kommende-arrangementer'
                    >
                      Arrangementer
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='text-gray-600 hover:text-gray-900 font-semibold block pb-2 text-sm'
                      to='om-oss/bestyrelsen'
                    >
                      Bestyrelse
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='text-gray-600 hover:text-gray-900 font-semibold block pb-2 text-sm'
                      to='arrangementer/kommende-arrangementer'
                    >
                      Kontakt
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='w-full lg:w-4/12 px-4 ml-auto'>
                <span className='text-xs items-center  md:text-sm uppercase tracking-widest pb-2 inline-flex  text-gray-500 space-x-2  '>
                  Medlem
                </span>
                <ul className='list-unstyled'>
                  <li>
                    <Link
                      className='text-gray-600 hover:text-gray-900 font-semibold block pb-2 text-sm'
                      to='medlemshjornet'
                    >
                      Medlemshjørnet‌
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='text-gray-600 hover:text-gray-900 font-semibold block pb-2 text-sm'
                      to='medlemshjornet/medlemmer'
                    >
                      Medlemmer
                    </Link>
                  </li>

                  <li>
                    <Link
                      className='text-gray-600 hover:text-gray-900 font-semibold block pb-2 text-sm'
                      to='medlemshjornet/corporate-medlemmer'
                    >
                      Corporate Medlemmer
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='text-gray-600 hover:text-gray-900 font-semibold block pb-2 text-sm'
                      to='ansog-om-medlemskab'
                    >
                      Bliv Medlemmer
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className='my-6 border-blueGray-300' />
        <div className='flex flex-wrap items-center md:justify-between justify-center'>
          <div className='w-full  px-4 mx-auto text-center'>
            <div className='text-sm text-blueGray-500 font-semibold py-1'>
              <span id='get-current-year'>
                2024 | Det Danske Afrikaselskab Prinsessegade 7B, 2. sal, 1422
                København K | CVR-nr: 32989578
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
