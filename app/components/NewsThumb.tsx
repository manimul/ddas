import type { SanityImageObjectStub } from '@sanity/asset-utils';
import urlBuilder from '@sanity/image-url';

import { dataset, projectId } from '~/sanity/projectDetails';

type NewsImageProps = {
  image?: SanityImageObjectStub & { alt: string };
  className?: string; // Add className as an optional property
};

export function NewsThumb(props: NewsImageProps) {
  const { image, className } = props;

  const defaultClass =
    'h-auto w-full object-cover rounded-lg shadow-black transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-gray-300 dark:group-hover:shadow-gray-600 ';

  const containerClass = 'aspect-video';
  const combinedClass = `${containerClass} ${className || ''}`; // Merge className with default

  return (
    <div className={combinedClass}>
      {image ? (
        <img
          className={defaultClass} // Use the combined class
          src={urlBuilder({ projectId, dataset })
            // @ts-ignore
            .image(image.asset._ref)
            .height(297)
            .width(528)
            .fit('max')
            .auto('format')
            .url()}
          alt={image?.alt ?? ``}
          loading='lazy'
        />
      ) : (
        <div className='flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-500'>
          Missing News image
        </div>
      )}
    </div>
  );
}
