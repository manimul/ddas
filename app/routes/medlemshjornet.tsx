import { Link, NavLink, Outlet } from '@remix-run/react';

export default function Medlemshjornet() {
  return (
    <>
      <div className='flex flex-col md:flex-row justify-start space-y-2 md:space-y-0 md:space-x-4  '>
        <NavLink
          to=''
          end
          className={({ isActive, isPending }) =>
            isPending
              ? 'pending'
              : isActive
                ? 'active font-bold border-b-2 border-green-500 '
                : ' font-light text-gray-500 hover:text-gray-700'
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
                ? 'active font-bold border-b-2 border-green-500 '
                : 'font-light text-gray-500 hover:text-gray-700'
          }
        >
          Medlemmer
        </NavLink>
        <NavLink
          to='virksomhedsmedlemmer'
          className={({ isActive, isPending }) =>
            isPending
              ? 'pending'
              : isActive
                ? 'active font-bold border-b-2 border-green-500 '
                : 'font-light text-gray-500 hover:text-gray-700'
          }
        >
          Virksomhedsmedlemmer
        </NavLink>
      </div>
      <Outlet />
    </>
  );
}
