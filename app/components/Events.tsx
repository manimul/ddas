import { Link } from '@remix-run/react';
import { MemberImage } from '~/components/MemberImage';
import type { EventStub } from '~/types/event';
import { SanityContent } from './SanityContent';
import { MoveRight } from 'lucide-react';
import { EventsImage } from './EventsImage';
import urlBuilder from '@sanity/image-url';
import { dataset, projectId } from '~/sanity/projectDetails';

type EventsProps = {
  events: EventStub[];
  limit?: number;
};

export function Events(props: EventsProps) {
  const { events = [], limit } = props;
  const displayedEvents = limit ? events.slice(0, limit) : events;

  return displayedEvents.length > 0 ? (
    <div className=' '>
      <ul className='flex flex-col space-y-6 '>
        {displayedEvents.map((event) => (
          <li
            /*

            style={{
              backgroundImage: `url(${urlBuilder({ projectId, dataset })
                // @ts-ignore
                .image(event.image.asset._ref)
                .height(800)
                .width(2000)
                .fit('max')
                .auto('format')
                .url()})`,
              backgroundSize: 'cover', // Adjust as needed
              backgroundPosition: 'center', // Adjust as needed
              width: '100%', // Adjust as needed
              height: '100%', // Adjust as needed
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}

            */
            className='max-w-6xl mx-auto '
            key={event._id}
          >
            <div className='flex  flex-col md:flex-row  flex-wrap rounded-lg group box-border md:opacity-75 md:hover:opacity-100 cursor-pointer hover:border-orange-500 dark:hover:border-orange-500 border border-black  p-2 md:p-5 dark:border-white  hover:shadow-2xl hover:-translate-y-1 ease-in-out duration-300  '>
              {event?.slug ? (
                <Link
                  prefetch='intent'
                  relative='path'
                  to={
                    '../../arrangementer/kommende-arrangementer/' + event?.slug
                  }
                  className='md:-mt-12'
                >
                  <span className='dark:text-orange-500 font-bold italic text-orange-500  bg-white  text-xs dark:bg-black rounded-md p-2'>
                    Arrangementer
                  </span>
                  <h2 className='text-bold pt-4 text-xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-4xl pb-2 md:py-4 basis-full'>
                    {event.title}
                  </h2>
                </Link>
              ) : (
                <span className='md:pt-4 text-xl tracking-tighter'>
                  {event.title}
                </span>
              )}

              <div className=' md:basis-1/2 md:-ml-24  h-min  '>
                <EventsImage image={event.image} />
              </div>
              <div className=' md:basis-1/2 mb-4  md:px-6 flex flex-col space-y-4 md:-ml-24 md:mt-12 border border-black dark:border-white  bg-white dark:bg-black h-min p-4 '>
                {event.date && (
                  <div>
                    <span className='md:text-xl opacity-40'>
                      {new Date(event.date).toLocaleDateString('da-DK', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                )}
                <p className='md:text-lg  text-lg leading-8 text-gray-600 dark:text-gray-300 '>
                  {event.extract}
                </p>

                {event?.slug ? (
                  <Link
                    prefetch='intent'
                    relative='path'
                    to={
                      '../../arrangementer/kommende-arrangementer/' +
                      event?.slug
                    }
                    className='underline group text-lg opacity-75 text-orange-500 hover:opacity-100'
                  >
                    Lær mere
                    <MoveRight className='hidden group-hover:inline-flex space-x-2' />
                  </Link>
                ) : (
                  <span className='pt-4 text-xl font-bold tracking-tighter'>
                    {event.title}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className='prose prose-xl mx-auto bg-green-50 p-4'>
      <p>No boardmembers found, yet!</p>
    </div>
  );
}
