import { Outlet, Link, NavLink } from '@remix-run/react';

export default function Arrangementer() {
  return (
    <div className='grid grid-cols-1 border-blue-500 border-2  gap-6 lg:gap-12'>
      <Link to='.'>Arrangementer</Link>{' '}
      <div className='flex justify-start space-x-4'>
        <NavLink
          to='kommende-arrangementer'
          className={({ isActive, isPending }) =>
            isPending
              ? 'pending'
              : isActive
                ? 'active font-bold'
                : 'font-light text-gray-500 hover:text-gray-700'
          }
        >
          Kommende Arrangementer
        </NavLink>
        <NavLink
          to='afholdte-arrangementer'
          className={({ isActive, isPending }) =>
            isPending
              ? 'pending'
              : isActive
                ? 'active font-bold'
                : 'font-light text-gray-500 hover:text-gray-700'
          }
        >
          Afholdte Arrangementer
        </NavLink>
        <NavLink
          to='medlemsmote'
          className={({ isActive, isPending }) =>
            isPending
              ? 'pending'
              : isActive
                ? 'active font-bold'
                : 'font-light text-gray-500 hover:text-gray-700'
          }
        >
          Medlemsmøte
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
