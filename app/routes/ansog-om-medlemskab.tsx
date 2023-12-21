import { Link, Outlet } from '@remix-run/react';

export default function AnsogOmMedlemskab() {
  return (
    <div className='grid grid-cols-1 border-blue-500 border-2  gap-6 lg:gap-12'>
      <Link to='.'>Ansøg om medlemskab</Link>{' '}
      <div className='flex space-x-4 justify-start'>
        <Link to='personligt'>Personligt</Link>
        <Link to='corporate'>Corporate</Link>
      </div>
      <Outlet />
    </div>
  );
}
