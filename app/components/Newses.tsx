import { Link } from '@remix-run/react';
import { MemberImage } from '~/components/MemberImage';
import type { NewsStub } from '~/types/news';
import { SanityContent } from './SanityContent';

type NewsesProps = {
  newses: NewsStub[];
};

export function Newses(props: NewsesProps) {
  const { newses = [] } = props;

  if (newses.length === 0) {
    return (
      <div className='prose prose-xl mx-auto bg-green-50 p-4'>
        <p>No news articles found, yet!</p>
      </div>
    );
  }

  const firstNews = newses[0];
  const remainingNews = newses.slice(1);

  return (
    <div className=' border-gray-100 '>
      <div className='grid grid-cols-8 pb-6 gap-4 	'>
        <div className='col-span-3'>
          <MemberImage image={firstNews.image} />
        </div>
        <div className='col-span-4'>
          <h1>Fremhævede nyheder</h1>
          <h2>
            {firstNews?.slug ? (
              <Link
                prefetch='intent'
                relative='path'
                to={'../../nyheder/' + firstNews?.slug}
                className=' text-bold pt-4 text-xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-4xl'
              >
                {firstNews.title}
              </Link>
            ) : (
              <span className='pt-4 text-xl tracking-tighter'>
                {firstNews.title}
              </span>
            )}
          </h2>
          {firstNews.publishedDate && (
            <div>
              <span className='text-base opacity-40'>
                {new Date(firstNews.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          )}
          <p className='text-base prose '>{firstNews.extract}</p>
          {firstNews?.slug ? (
            <Link
              prefetch='intent'
              relative='path'
              to={'../../nyheder/' + firstNews?.slug}
              className='underline opacity-75 text-orange-500 hover:opacity-100'
            >
              Lær mere
              {/* Makes this entire block clickable */}
              {/* <span className="absolute inset-0" /> */}
            </Link>
          ) : (
            <span className='pt-4 text-xl font-bold tracking-tighter'>
              {firstNews.title}
            </span>
          )}
        </div>
      </div>
      <ul className='grid grid-cols-2 md:grid-cols-4 gap-4 '>
        {remainingNews.map((news) => (
          <li key={news._id} className=' '>
            <div className=' '>
              <MemberImage image={news.image} />
            </div>
            <h2 className=' '>
              {news?.slug ? (
                <Link
                  prefetch='intent'
                  relative='path'
                  to={'../../nyheder/' + news?.slug}
                  className='text-bold pt-4 text-xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-2xl'
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

            <div className=' flex flex-col space-y-2 '>
              {news.publishedDate && (
                <div>
                  <span className='text-base opacity-40'>
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
              <p className='text-base prose  	'>{news.extract}</p>

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
  );
}
