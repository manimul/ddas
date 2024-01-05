import type { SanityImageObjectStub } from '@sanity/asset-utils';
import urlBuilder from '@sanity/image-url';

import { dataset, projectId } from '~/sanity/projectDetails';

type HeroProps = {
  image?: SanityImageObjectStub & { alt: string };
};

export function Hero(props: HeroProps) {
  const { image } = props;

  return (
    <div className=' h-auto -mx-52  object-cover  '>
      {image ? (
        <img
          className='w-full'
          src={urlBuilder({ projectId, dataset })
            // @ts-ignore
            .image(image.asset._ref)
            .height(400)
            .width(1200)
            .auto('format')
            .url()}
          alt={image?.alt ?? ``}
          loading='lazy'
        />
      ) : (
        <div className='flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-500'>
          Missing Member image
        </div>
      )}
    </div>
  );
}
