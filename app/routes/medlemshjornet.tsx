import { Link, Outlet } from '@remix-run/react';

export default function Medlemshjornet() {
  return (
    <div className='grid grid-cols-1 border-blue-500 border-2  gap-6 lg:gap-12'>
      <Link to='.'>Medlemshjørnet</Link>{' '}
      <div className='flex justify-start space-x-4'>
        <Link to='medlemmer'>Medlemmer</Link>
        <Link to='corporate-medlemmer'>Corporate Medlemmer</Link>
      </div>
      <Outlet />
    </div>
  );
}
