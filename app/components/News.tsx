import { NewsDocument } from '~/types/news';
import { SanityContent } from '~/components/SanityContent';
import { NewsImage } from '~/components/NewsImage';
import { Link } from '@remix-run/react';
import { MoveLeft } from 'lucide-react';

type NewsProps = {
  data: NewsDocument;
};

export function News(props: NewsProps) {
  const { _id, title, extract, publishedDate, content, image } = props.data;
  return (
    <div className='flex flex-col space-y-4  '>
      <Link className=' inline-flex space-x-2' relative='path' to='../'>
        <MoveLeft />
        <span> Nyheder</span>
      </Link>
      <h1 className='mx-auto text-center max-w-3xl  basis-full text-bold pt-4 text-xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-4xl'>
        {title}
      </h1>
      {publishedDate && (
        <span className='text-xl text-center opacity-40'>
          {new Date(publishedDate).toLocaleDateString('da-DK', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      )}
      <div className=' '>
        <NewsImage image={image} />
      </div>
      <div className=' m:max-w-3xl  mx-auto md:px-6 flex flex-col space-y-4  '>
        <p className='text-lg prose font-bold 	'>{extract}</p>
        {content && content?.length > 0 ? (
          <SanityContent value={content} />
        ) : null}
      </div>
    </div>
  );
}
