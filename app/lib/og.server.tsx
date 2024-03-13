import { Resvg } from '@resvg/resvg-js';
import type { SanityDocument } from '@sanity/client';
import urlBuilder from '@sanity/image-url';
import type { SatoriOptions } from 'satori';
import satori from 'satori';

import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/resource.og';
import { dataset, projectId } from '~/sanity/projectDetails';

// Load the font from the "public" directory
const fontSans = (baseUrl: string) =>
  fetch(new URL(`${baseUrl}/fonts/Inter-Medium.ttf`)).then((res) =>
    res.arrayBuffer()
  );

export async function generatePngFromDocument(
  doc: SanityDocument,
  origin: string
) {
  const { title, artist, image } = doc;

  // Prepare font data and settings for Satori
  const fontSansData = await fontSans(origin);
  const options: SatoriOptions = {
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    fonts: [
      {
        name: 'Inter',
        data: fontSansData,
        style: 'normal',
      },
    ],
  };

  // Create the SVG with satori
  const svg = await satori(
    <div
      style={{
        width: options.width,
        height: options.height,
        //background: 'linear-gradient( 135deg, black 10%, #444 100%)',
        //background: 'linear-gradient( 135deg, #FE9201 10%, #FD5F55 100%)',
        background: '#0B1213',
        color: 'white',
        fontFamily: 'Inter',
        letterSpacing: '-0.05em',
        display: 'flex',
        alignItems: 'center',
        //justifyContent: 'center',
        justifyContent: 'space-between',
        lineHeight: 1,
      }}
    >
      <div
        style={{
          width: image?.asset?._ref ? options.width - 630 : options.width,
          display: 'flex',
          flexDirection: 'column',
          padding: 40,
          gap: 30,
        }}
      >
        <div style={{ fontSize: 30, color: '#FE9201' }}>
          Det Danske Afrika Selskab
        </div>
        <div style={{ fontSize: 70, fontWeight: 100 }}>{title}</div>
        {artist?.title ? (
          <div style={{ fontSize: 40, color: '#FD5F55' }}>{artist.title}</div>
        ) : null}
      </div>
      {image?.asset?._ref ? (
        <div
          style={{
            width: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {' '}
          <img
            alt=''
            src={urlBuilder({ projectId, dataset })
              // @ts-ignore
              .image(image.asset._ref)
              .height(800)
              .width(800)
              .fit('max')
              .auto('format')
              .url()}
            width='600'
            height='600'
          />
        </div>
      ) : null}
    </div>,
    options
  );

  // Convert to PNG with resvg
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}
