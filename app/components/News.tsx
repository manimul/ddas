import { NewsDocument } from '~/types/news';
import { SanityContent } from '~/components/SanityContent';
import { MemberImage } from '~/components/MemberImage';
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
      <h1 className='mx-auto text-center max-w-3xl py-4 basis-full text-bold pt-4 text-xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-4xl'>
        {title}
      </h1>
      <div className=' '>
        <MemberImage image={image} />
      </div>
      <div className=' max-w-3xl  mx-auto px-6 flex flex-col space-y-4  '>
        {publishedDate && (
          <div>
            <span className='text-xl opacity-40'>
              {new Date(publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        )}
        <p className='text-lg prose font-bold 	'>{extract}</p>
        {content && content?.length > 0 ? (
          <SanityContent value={content} />
        ) : null}
      </div>
    </div>
  );
}
