import { Link } from '@remix-run/react';
import { MemberImage } from '~/components/MemberImage';
import type { NewsStub } from '~/types/news';
import { SanityContent } from './SanityContent';

type NewsesProps = {
  newses: NewsStub[];
};

export function Newses(props: NewsesProps) {
  const { newses = [] } = props;
  console.log('newses: ' + newses[0].title);
  return newses.length > 0 ? (
    <div className=' border-gray-100 '>
      <ul className='flex flex-col space-y-6 '>
        {newses.map((news) => (
          <li
            key={news._id}
            className='flex flex-row flex-wrap  box-border opacity-75 hover:opacity-100  '
          >
            <h2 className=' py-4 basis-full'>
              {news?.slug ? (
                <Link
                  prefetch='intent'
                  relative='path'
                  to={'../../nyheder/' + news?.slug}
                  className='text-bold pt-4 text-xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-4xl'
                >
                  {news.title}
                  {/* Makes this entire block clickable */}
                  {/* <span className="absolute inset-0" /> */}
                </Link>
              ) : (
                <span className='pt-4 text-xl tracking-tighter'>
                  {news.title}
                </span>
              )}
            </h2>
            <div className='basis-1/3 '>
              <MemberImage image={news.image} />
            </div>
            <div className='basis-1/2 px-6 flex flex-col space-y-4 '>
              {news.publishedDate && (
                <div>
                  <span className='text-xl opacity-40'>
                    {new Date(news.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              )}
              <p className='text-lg prose font-bold 	'>{news.extract}</p>

              {news?.slug ? (
                <Link
                  prefetch='intent'
                  relative='path'
                  to={'../../nyheder/' + news?.slug}
                  className='underline opacity-75 text-orange-500 hover:opacity-100'
                >
                  Lær mere
                  {/* Makes this entire block clickable */}
                  {/* <span className="absolute inset-0" /> */}
                </Link>
              ) : (
                <span className='pt-4 text-xl font-bold tracking-tighter'>
                  {news.title}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className='prose prose-xl mx-auto bg-green-50 p-4'>
      <p>No news articles found, yet!</p>
    </div>
  );
}
