import { Link } from '@remix-run/react';
import { MemberImage } from '~/components/MemberImage';
import type { EventStub } from '~/types/event';
import { SanityContent } from './SanityContent';
import { MoveRight } from 'lucide-react';

type EventsProps = {
  events: EventStub[];
};

export function Events(props: EventsProps) {
  const { events = [] } = props;
  return events.length > 0 ? (
    <div className=' '>
      <ul className='flex flex-col space-y-6 '>
        {events.map((event) => (
          <li
            key={event._id}
            className='flex flex-col md:flex-row flex-wrap rounded-lg  box-border md:opacity-75 md:hover:opacity-100 cursor-pointer hover:border-gray-600 border border-gray-200 p-2 md:p-5  hover:shadow-2xl hover:-translate-y-1 ease-in-out duration-300  '
          >
            <h2 className=' pb-2 md:py-4 basis-full'>
              {event?.slug ? (
                <Link
                  prefetch='intent'
                  relative='path'
                  to={
                    '../../arrangementer/kommende-arrangementer/' + event?.slug
                  }
                  className='text-bold pt-4 text-xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-4xl'
                >
                  {event.title}
                  {/* Makes this entire block clickable */}
                  {/* <span className="absolute inset-0" /> */}
                </Link>
              ) : (
                <span className='md:pt-4 text-xl tracking-tighter'>
                  {event.title}
                </span>
              )}
            </h2>
            <div className=' md:basis-1/3 aspect-video overflow-hidden md:aspect-square '>
              <MemberImage image={event.image} />
            </div>
            <div className='mt-2 md:basis-1/2 mb-4 md:px-6 flex flex-col space-y-4 '>
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
                    '../../arrangementer/kommende-arrangementer/' + event?.slug
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
