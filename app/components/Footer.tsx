import { Logo } from '~/components/Logo';
import type { LogoProps } from '~/types/home';

export function Footer(props: LogoProps) {
  return (
    <footer className='relative pt-8 pb-6'>
      <hr className='my-6 border-blueGray-300' />

      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap text-left lg:text-left'>
          <div className='w-full lg:w-6/12 px-4'>
            <Logo home={props.home} />
            <h5 className='text-lg mt-0 mb-2 text-blueGray-600'>
              Vi hjælper med at udvikle Afrika.
            </h5>
          </div>
          <div className='w-full lg:w-6/12 px-4'>
            <div className='flex flex-wrap items-top mb-6'>
              <div className='w-full lg:w-4/12 px-4 ml-auto'>
                <span className='block uppercase text-blueGray-500 text-sm font-semibold mb-2'>
                  Useful Links
                </span>
                <ul className='list-unstyled'>
                  <li>
                    <a
                      className='text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm'
                      href='https://www.creative-tim.com/presentation?ref=njs-profile'
                    >
                      Om Oss
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className='my-6 border-blueGray-300' />
        <div className='flex flex-wrap items-center md:justify-between justify-center'>
          <div className='w-full md:w-4/12 px-4 mx-auto text-center'>
            <div className='text-sm text-blueGray-500 font-semibold py-1'>
              Copyright © <span id='get-current-year'>2024</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
