import { Link } from '@remix-run/react';
import { NewsThumb } from '~/components/NewsThumb';
import type { NewsStub } from '~/types/news';
import { SanityContent } from './SanityContent';
import { MoveRight } from 'lucide-react';

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
    <>
      <Link
        prefetch='intent'
        className='grid grid-cols-1 md:grid-cols-8 md:pb-6 gap-4 	'
        relative='path'
        to={'../../nyheder/' + firstNews?.slug}
      >
        <NewsThumb className='col-span-3' image={firstNews.image} />

        <div className='col-span-4 space-y-1'>
          <h2 className='text-sm tracking-widest opacity-50 uppercase'>
            Fremhævede nyheder
          </h2>
          <h2 className='text-bold pt-4 text-xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-4xl'>
            {firstNews.title}
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

          <p className='text-gray-800 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400 pb-4'>
            {firstNews.extract}
          </p>

          <span className='underline md:text-lg lg:text-xl opacity-75 text-orange-500 hover:opacity-100'>
            Lær mere
          </span>
        </div>
      </Link>

      <ul className='grid grid-cols-1 md:grid-cols-4 gap-2 '>
        {remainingNews.map((news) => (
          <li
            key={news._id}
            className='rounded-lg  box-border opacity-75 hover:opacity-100 cursor-pointer hover:border-gray-600 border border-gray-200 p-2 hover:shadow-2xl hover:-translate-y-1 ease-in-out duration-300   '
          >
            <Link
              prefetch='intent'
              className='flex md:block'
              relative='path'
              to={'../../nyheder/' + news?.slug}
            >
              <NewsThumb className='hidden md:block ' image={news.image} />
              <div className=''>
                <h2 className='md:px-3 text-bold md:pt-4 text-base md:text-xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-2xl'>
                  {news.title}
                </h2>

                <div className='md:px-3 flex flex-col space-y-2  '>
                  {news.publishedDate && (
                    <div>
                      <span className='text-sm md:text-base opacity-40'>
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

                  <p className='hidden md:block  text-gray-800 lg:mb-6 md:text-base lg:text-lg dark:text-gray-400  	'>
                    {news.extract}
                  </p>

                  <span className='underline md:text-lg lg:text-xl opacity-75 text-orange-500 hover:opacity-100'>
                    Lær mere
                    <MoveRight className='hidden group-hover:inline-flex space-x-2' />
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
