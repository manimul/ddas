import type { SanityImageObjectStub } from '@sanity/asset-utils';
import urlBuilder from '@sanity/image-url';

import { dataset, projectId } from '~/sanity/projectDetails';

type MemberImageProps = {
  image?: SanityImageObjectStub & { alt: string; credit: string };
  className?: string; // Add className as an optional property
};

export function EventsImage(props: MemberImageProps) {
  const { image, className } = props;

  const defaultClass =
    'h-auto w-full object-cover rounded-md border border-black dark:border-white    transition-all duration-300  ';
  const combinedClass = `${defaultClass} ${className || ''}`; // Merge className with default

  return (
    <>
      {image ? (
        <>
          <img
            className={combinedClass} // Use the combined class
            src={urlBuilder({ projectId, dataset })
              // @ts-ignore
              .image(image.asset._ref)
              .height(500)
              .width(600)
              .maxHeight(500)
              .maxWidth(600)
              .fit('max')
              .auto('format')
              .url()}
            alt={image?.alt ?? ``}
            loading='lazy'
          />
          <span className='opacity-50 text-sm mt-3'>{image?.credit ?? ``}</span>
        </>
      ) : (
        <div className='flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-500'></div>
      )}
    </>
  );
}
