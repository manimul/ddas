import { Link } from '@remix-run/react';
import { NewsImage } from '~/components/NewsImage';
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
      <Link
        prefetch='intent'
        className='grid grid-cols-8 pb-6 gap-4 	'
        relative='path'
        to={'../../nyheder/' + firstNews?.slug}
      >
        <div className='col-span-3'>
          <NewsImage image={firstNews.image} />
        </div>
        <div className='col-span-4 space-y-2'>
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
                {new Date(firstNews.publishedDate).toLocaleDateString('da-DK', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          )}
          <p className='text-base opacity-75 pb-4 '>{firstNews.extract}</p>
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
      </Link>

      <ul className='grid grid-cols-2 md:grid-cols-4 gap-2 '>
        {remainingNews.map((news) => (
          <li
            key={news._id}
            className='rounded-lg  box-border opacity-75 hover:opacity-100 cursor-pointer hover:border-gray-600 border border-gray-200 p-2 hover:shadow-2xl hover:-translate-y-1 ease-in-out duration-300  '
          >
            <Link
              prefetch='intent'
              relative='path'
              to={'../../nyheder/' + news?.slug}
            >
              <div className=' '>
                <NewsImage image={news.image} />
              </div>
              <h2 className=' '>
                {news?.slug ? (
                  <Link
                    prefetch='intent'
                    relative='path'
                    to={'../../nyheder/' + news?.slug}
                    className='text-bold pt-4 text-xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-xl'
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
                      {new Date(news.publishedDate).toLocaleDateString(
                        'da-DK',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
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
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
