import { Logo } from '~/components/Logo';
import type { LogoProps } from '~/types/home';

export function Footer(props: LogoProps) {
  return (
    <header className='border-t border-gray-100 transition-colors duration-1000 ease-in-out dark:border-gray-900'>
      <div className='container mx-auto flex items-center justify-between p-4 lg:px-12'>
        <Logo home={props.home} />
      </div>
    </header>
  );
}
