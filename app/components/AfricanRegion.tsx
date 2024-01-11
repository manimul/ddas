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
  const { _id, title, slug, content, image } = props.data;
  return (
    <div className='flex flex-row flex-wrap  box-border'>
      <Link className=' inline-flex space-x-2' relative='path' to='../'>
        <MoveLeft />
        <span>Lande i Afrika</span>
      </Link>
      <div></div>
      <h1 className=' py-4 basis-full text-bold pt-4 text-xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-4xl'>
        {title}
      </h1>
      <div className='basis-1/3 space-y-4 '>
        <MemberImage image={image} />
      </div>
      <div className='basis-1/2 px-6 flex flex-col space-y-4 '>
        {content && content?.length > 0 ? (
          <SanityContent value={content} />
        ) : null}
      </div>
      <div className='mt-4'>
        <Countries countries={props.countries} />
      </div>
    </div>
  );
}
