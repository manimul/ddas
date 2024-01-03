import type { SanityImageObjectStub } from '@sanity/asset-utils';
import urlBuilder from '@sanity/image-url';

import { dataset, projectId } from '~/sanity/projectDetails';

type CorporateMemberImageProps = {
  image?: SanityImageObjectStub & { alt: string };
};

export function CorporateMemberImage(props: CorporateMemberImageProps) {
  const { image } = props;

  return (
    <div className=' bg-gray-50'>
      {image ? (
        <img
          className='h-auto w-full shadow-black transition-all duration-300'
          src={urlBuilder({ projectId, dataset })
            // @ts-ignore
            .image(image.asset._ref)
            .width(1200)
            .fit('max')
            .auto('format')
            .url()}
          alt={image?.alt ?? ``}
          loading='lazy'
        />
      ) : (
        <div className='flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-500'>
          Missing Corporate Member image
        </div>
      )}
    </div>
  );
}
