import type { SanityImageObjectStub } from '@sanity/asset-utils';
import urlBuilder from '@sanity/image-url';
import { User, UserRound } from 'lucide-react';

import { dataset, projectId } from '~/sanity/projectDetails';

type MemberImageProps = {
  image?: SanityImageObjectStub & { alt: string; credit: string };
  className?: string; // Add className as an optional property
};

export function MemberImage(props: MemberImageProps) {
  const { image, className } = props;

  const defaultClass =
    'h-auto w-full object-cover rounded-lg shadow-black  transition-all duration-300  ';
  const combinedClass = `${defaultClass} ${className || ''}`; // Merge className with default

  return (
    <div className='aspect-square '>
      {image ? (
        <>
          <img
            className={combinedClass} // Use the combined class
            src={urlBuilder({ projectId, dataset })
              // @ts-ignore
              .image(image.asset._ref)
              .height(800)
              .width(800)
              .fit('max')
              .auto('format')
              .url()}
            alt={image?.alt ?? ``}
            loading='lazy'
          />
          <span className='opacity-50 text-sm mt-3'>{image?.credit ?? ``}</span>
        </>
      ) : (
        <div className='flex aspect-square w-full items-center justify-center border rounded-lg border-gray-200 text-gray-500'>
          <UserRound className='w-5 h-5' />
        </div>
      )}
    </div>
  );
}
