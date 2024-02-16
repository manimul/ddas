import { Link } from '@remix-run/react';
import urlBuilder from '@sanity/image-url';

import type { LogoProps } from '~/types/home';
import { dataset, projectId } from '~/sanity/projectDetails';

export function Logo(props: LogoProps) {
  const { siteTitle, logo } = props.home ?? {};

  if (!siteTitle && typeof document !== `undefined`) {
    console.info(
      `Create and publish "home" document in Sanity Studio at ${window.origin}/studio/desk/home`
    );
  }

  return (
    <p className='text-lg font-bold tracking-tighter text-black  dark:text-white lg:text-2xl'>
      <Link className='flex flex-row items-center' to='/'>
        {logo && (
          <>
            <img
              className={'h-14 p-2 md:p-2  md:h-24 md:w-24    '} // Use the combined class
              src={urlBuilder({ projectId, dataset })
                // @ts-ignore
                .image(logo.asset._ref)
                .height(50)
                .width(50)
                .fit('max')
                .auto('format')
                .url()}
              alt={logo?.alt ?? ``}
              loading='lazy'
            />
          </>
        )}
        <span>{siteTitle ?? `Det Dansk Afrika Selskab`}</span>
      </Link>
    </p>
  );
}
