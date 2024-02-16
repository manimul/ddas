import { CityDocument } from '~/types/city';
import { SanityContent } from '~/components/SanityContent';
import { MemberImage } from '~/components/MemberImage';
import { Link2, MoveLeft } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import { Link } from '@remix-run/react';

type CityProps = {
  data: CityDocument;
};

export function City(props: CityProps) {
  const {
    _id,
    title,
    slug,
    content,
    image,
    reglerne,
    landeprofil,
    opleve,
    introduktion,
  } = props.data;

  return (
    <div className='flex flex-col md:flex-row flex-wrap  box-border space-y-4'>
      <Link className=' inline-flex space-x-2' relative='path' to='../'>
        <MoveLeft />
        <span>Lande</span>
      </Link>
      <h1 className=' md:py-4 md:basis-full text-bold pt-4 text-2xl lg:text-4xl tracking-tighter transition-colors duration-100 ease-in-out  '>
        {title}
      </h1>
      <div className=' md:basis-1/4 space-y-4 '>
        <MemberImage image={image} />
        <h2 className='text-xs items-center  md:text-sm uppercase tracking-widest pb-2 inline-flex  text-gray-500 space-x-2  '>
          <Link2 />
          {` `} <span>Relaterede links</span>
        </h2>
        <ul>
          {landeprofil && (
            <li>
              {' '}
              <Link className=' inline-flex space-x-2' to={landeprofil}>
                <ExternalLink /> Landeprofil
              </Link>
            </li>
          )}
          {reglerne && (
            <li>
              <Link className=' inline-flex space-x-2' to={reglerne}>
                <ExternalLink /> Reglerne
              </Link>
            </li>
          )}
          {opleve && (
            <li>
              <Link className=' inline-flex space-x-2' to={opleve}>
                <ExternalLink /> Opleve
              </Link>
            </li>
          )}
          {introduktion && (
            <li>
              {' '}
              <Link className=' inline-flex space-x-2' to={introduktion}>
                <ExternalLink /> Introduktion
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className='basis-1/2 px-6 flex flex-col space-y-4 '>
        {content && content?.length > 0 ? (
          <SanityContent value={content} />
        ) : null}
      </div>
      <div className='basis-1/4 px-6 flex flex-col space-y-4  border-b-gray-100 sticky top-0  '>
        <div> </div>
        <div></div>
      </div>
    </div>
  );
}
