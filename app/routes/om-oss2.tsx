import { Link, NavLink, Outlet } from '@remix-run/react';
import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { Loader as RootLoader } from '~/root';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/resource.og';
import { writeClient } from '~/sanity/client.server';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { PAGE_QUERY } from '~/sanity/queries';
import type { PageDocument } from '~/types/page';
import { pageZ } from '~/types/page';

export default function OmOss() {
  return (
    <div className='grid border-blue-500 border-2 grid-cols-1 gap-6 lg:gap-12'>
      <Link to='.'>Om Oss</Link>
      <div className='flex justify-between'>
        <NavLink
          to='bestyrelsen'
          className={({ isActive, isPending }) =>
            isPending
              ? 'pending'
              : isActive
                ? 'active font-bold'
                : 'font-light text-gray-500 hover:text-gray-700'
          }
        >
          Bestyrelsen
        </NavLink>
        <NavLink
          to='vores-historie'
          className={({ isActive, isPending }) =>
            isPending
              ? 'pending'
              : isActive
                ? 'active font-bold'
                : 'font-light text-gray-500 hover:text-gray-700'
          }
        >
          Vores historie
        </NavLink>
        <NavLink
          to='vedtaegter'
          className={({ isActive, isPending }) =>
            isPending
              ? 'pending'
              : isActive
                ? 'active font-bold'
                : 'font-light text-gray-500 hover:text-gray-700'
          }
        >
          Vedtægter
        </NavLink>
        <NavLink
          to='referater-og-arsrapporter'
          className={({ isActive, isPending }) =>
            isPending
              ? 'pending'
              : isActive
                ? 'active font-bold'
                : 'font-light text-gray-500 hover:text-gray-700'
          }
        >
          Referater og årsrapporter
        </NavLink>
        <NavLink
          to='om-stifteren'
          className={({ isActive, isPending }) =>
            isPending
              ? 'pending'
              : isActive
                ? 'active font-bold'
                : 'font-light text-gray-500 hover:text-gray-700'
          }
        >
          Om stifteren
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}
