import { Link } from '@remix-run/react';
import type { LayoutProps } from '~/components/Layout';
import { Logo } from '~/components/Logo';
import { ThemeToggle } from '~/components/ThemeToggle';
import Dropdown from '~/components/Dropdown';

export function Header(props: LayoutProps) {
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
      <div className='container mx-auto flex items-center justify-between p-4 lg:px-12'>
        <Logo home={props.home} />

        <div className='mx-auto  items-center justify-between p-4 lg:px-4 hidden md:flex grow'>
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
          <Link to='' className='text-sm   '>
            Mer{' '}
          </Link>
          <Link
            to='ansog-om-medlemskab'
            className='text-sm  border-2 p-2  border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-1000 ease-in-out  '
          >
            Ansøg om medlemskap{' '}
          </Link>
        </div>

        <ThemeToggle theme={props.theme} />
      </div>
    </header>
  );
}
