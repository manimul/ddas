import { AfricanRegionDocument } from '~/types/africanRegion';
import { CountryStub } from '~/types/country';
import { SanityContent } from '~/components/SanityContent';
import { MemberImage } from '~/components/MemberImage';
import { MoveLeft } from 'lucide-react';
import { Link } from '@remix-run/react';
import { Countries } from '~/components/Countries';

type AfricanRegionProps = {
  data: AfricanRegionDocument;
  countries: CountryStub[];
};

export function AfricanRegion(props: AfricanRegionProps) {
  const { _id, title, slug, content, image, subtitle } = props.data;
  return (
    <div className='flex flex-row flex-wrap  box-border'>
      <div className='basis-full'>
        <Link className=' inline-flex space-x-2' relative='path' to='../'>
          <MoveLeft />
          <span>Lande i Afrika</span>
        </Link>
        <h1 className=' py-4 basis-full text-bold pt-4 text-xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-4xl'>
          {title}{' '}
          <span className='pb-4  text-green-500 text-lg lg:text-4xl'>
            {'  '}
            {subtitle}
          </span>
        </h1>
      </div>
      <div className='flex flex-row  '>
        <MemberImage image={image} />

        <div className='basis-2/3 px-6 space-y-2  '>
          {content && content?.length > 0 ? (
            <SanityContent value={content} />
          ) : null}
          <h2 className='text-xl  leading-loose text-[#FFB102]'>
            Lande i {title}{' '}
          </h2>

          <Countries countries={props.countries} />
        </div>
      </div>
      <div className='mt-4'></div>
    </div>
  );
}
