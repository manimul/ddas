import { Link, NavLink } from '@remix-run/react';
import type { LayoutProps } from '~/components/Layout';
import { Logo } from '~/components/Logo';
import { ThemeToggle } from '~/components/ThemeToggle';
import Dropdown from '~/components/Dropdown';
import { useEffect, useState } from 'react';

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
      slug: '/medlemshjornet/virksomhedsmedlemmer',
      text: 'Virksomhedsmedlemmer',
    },
  ];

  return (
    <header className='border-b border-gray-100 transition-colors duration-1000 ease-in-out dark:border-gray-900 sticky top-0 w-full backdrop-blur-lg bg-white/80 dark:bg-black/60 z-50 '>
      <div
        className={`xl:container mx-auto flex  md:flex-row items-center md:justify-between  p-2 xl:px-12 duration-150 py-4 md:py-0 `}
      >
        <div className='md:hidden md:mx-auto  items-center md:justify-between md:p-4 lg:px-4   flex md:grow'>
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

        <div className='hidden text-xs xl:text-sm   mx-auto  items-center justify-end space-x-3 lg:space-x-4 px-4  md:flex grow '>
          <Dropdown title='Om' items={omOssItems} />
          <Dropdown title='Medlemshjørnet' items={medlemItems} />

          <NavLink
            to='arrangementer'
            className={({ isActive, isPending }) =>
              isPending
                ? 'pending'
                : isActive
                  ? 'active font-bold border-b-2 border-green-500 '
                  : 'font-light text-gray-500 hover:text-gray-700'
            }
          >
            Arrangementer{' '}
          </NavLink>
          <NavLink
            to='nyheder'
            className={({ isActive, isPending }) =>
              isPending
                ? 'pending'
                : isActive
                  ? 'active font-bold border-b-2 border-green-500 '
                  : 'font-light text-gray-500 hover:text-gray-700'
            }
          >
            Media
          </NavLink>
          <NavLink
            to='kontakt'
            className={({ isActive, isPending }) =>
              isPending
                ? 'pending'
                : isActive
                  ? 'active font-bold border-b-2 border-green-500 '
                  : 'font-light text-gray-500 hover:text-gray-700'
            }
          >
            Kontakt{' '}
          </NavLink>
          <NavLink
            to='lande-i-afrika'
            className={({ isActive, isPending }) =>
              isPending
                ? 'pending'
                : isActive
                  ? 'active font-bold border-b-2 border-green-500 '
                  : 'font-light text-gray-500 hover:text-gray-700'
            }
          >
            Lande i Afrika{' '}
          </NavLink>
          <NavLink
            to='ansog-om-medlemskab'
            className='hidden md:block lg:uppercase text-xs lg:font-bold  rounded-md lg:px-2 lg:py-4 xl:p-4 xl:tracking-wide   lg:bg-gradient-to-br lg:hover:bg-gradient-to-tr  font-light text-gray-500 hover:text-gray-700 lg:hover:text-black from-[#FD9F1C] to-[#FF5107] lg:text-black hover:opacity-100 hover:rounded-[30px]  duration-500     '
          >
            Bliv Medlem
          </NavLink>
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
              Media
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
              Lande i Afrika{' '}
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
