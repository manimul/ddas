import { Outlet } from '@remix-run/react';

export default function Medlemmer() {
  return (
    <div className='grid grid-cols-1 gap-6 lg:gap-12'>
      <Outlet />
    </div>
  );
}
