import { Link } from '@remix-run/react';
import type { LayoutProps } from '~/components/Layout';
import { Logo } from '~/components/Logo';
import { ThemeToggle } from '~/components/ThemeToggle';
import Dropdown from '~/components/Dropdown';
import { useState } from 'react';

export function Header(props: LayoutProps) {
  const [navbar, setNavbar] = useState(false);

  const omOssItems = [
    { slug: '/om-oss', text: 'Om Oss' },
    { slug: '/om-oss/bestyrelsen', text: 'Bestyrelsen' },
    { slug: '/om-oss/vores-historie', text: 'Vores historie' },
    { slug: '/om-oss/vedtaegter', text: 'Vedtægter' },
    {
      slug: '/om-oss/referater-og-arsrapporter',
      text: 'Referater og årsrapporter',
    },
    { slug: '/om-stifteren-johannes-konnild', text: 'Om stifteren' },
  ];
  const medlemItems = [
    { slug: '/medlemshjornet', text: 'Medlemshjørnet' },
    { slug: '/medlemshjornet/medlemmer', text: 'Medlemmer' },
    {
      slug: '/medlemshjornet/corporate-medlemmer',
      text: 'Corporate Medlemmer',
    },
  ];

  return (
    <header className='border-b border-gray-100 transition-colors duration-1000 ease-in-out dark:border-gray-900'>
      <div className='container mx-auto flex  md:flex-row items-center justify-between p-4 lg:px-12'>
        <div className='md:hidden mx-auto  items-center justify-between md:p-4 lg:px-4   flex grow'>
          <button
            className='p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border'
            onClick={() => setNavbar(!navbar)}
          >
            {navbar ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            )}
          </button>
        </div>
        <Logo home={props.home} />

        <div className='hidden  mx-auto  items-center justify-between md:p-4 lg:px-4   md:flex grow'>
          <Dropdown title='Om' items={omOssItems} />
          <Dropdown title='Medlemshjørnet' items={medlemItems} />

          <Link to='arrangementer' className='text-sm  '>
            Arrangementer{' '}
          </Link>
          <Link to='nyheder' className='text-sm   '>
            Nyheder{' '}
          </Link>
          <Link to='kontakt' className='text-sm   '>
            Kontakt{' '}
          </Link>
          <Link to='lande-i-afrika' className='text-sm   '>
            Mer{' '}
          </Link>
          <Link
            to='ansog-om-medlemskab'
            className='text-sm  border rounded-sm p-2  border-[#f59e0b]  hover:bg-[#f59e0b] hover:text-white transition-all duration-1000 ease-in-out  '
          >
            Ansøg om medlemskap{' '}
          </Link>
          <ThemeToggle theme={props.theme} />
        </div>
      </div>
      {navbar && (
        <div
          className={`flex-1 justify-between min-h-screen md:block md:pb-0 md:mt-0 ${
            navbar ? 'block' : 'hidden'
          }`}
        >
          <div className='flex flex-col text-center grow h-auto  '>
            <Dropdown title='Om' items={omOssItems} setNavbar={setNavbar} />
            <Link
              className='py-3'
              to='medlemshjornet'
              onClick={() => setNavbar(!navbar)}
            >
              Medlemshjørnet{' '}
            </Link>

            <Link
              className='py-3'
              to='arrangementer'
              onClick={() => setNavbar(!navbar)}
            >
              Arrangementer{' '}
            </Link>
            <Link
              to='nyheder'
              className='py-3'
              onClick={() => setNavbar(!navbar)}
            >
              Nyheder{' '}
            </Link>
            <Link
              to='kontakt'
              className='py-3'
              onClick={() => setNavbar(!navbar)}
            >
              Kontakt{' '}
            </Link>
            <Link
              to='lande-i-afrika'
              className='py-3'
              onClick={() => setNavbar(!navbar)}
            >
              Mer{' '}
            </Link>
            <Link
              to='ansog-om-medlemskab'
              className='  py-3 '
              onClick={() => setNavbar(!navbar)}
            >
              Ansøg om medlemskap{' '}
            </Link>
            <ThemeToggle theme={props.theme} />
          </div>
        </div>
      )}
    </header>
  );
}
