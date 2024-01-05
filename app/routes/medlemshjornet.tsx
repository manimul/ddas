import { Link, NavLink, Outlet } from '@remix-run/react';

export default function Medlemshjornet() {
  return (
    <div className='grid grid-cols-1   gap-6 lg:gap-12'>
      <div className='flex justify-start space-x-4'>
        <NavLink
          to=''
          className={({ isActive, isPending }) =>
            isPending
              ? 'pending'
              : isActive
                ? 'active font-bold'
                : 'font-light text-gray-500 hover:text-gray-700'
          }
        >
          Om Medlemshjørnet
        </NavLink>
        <NavLink
          to='medlemmer'
          className={({ isActive, isPending }) =>
            isPending
              ? 'pending'
              : isActive
                ? 'active font-bold'
                : 'font-light text-gray-500 hover:text-gray-700'
          }
        >
          Medlemmer
        </NavLink>
        <NavLink
          to='corporate-medlemmer'
          className={({ isActive, isPending }) =>
            isPending
              ? 'pending'
              : isActive
                ? 'active font-bold'
                : 'font-light text-gray-500 hover:text-gray-700'
          }
        >
          Corporate Medlemmer
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
