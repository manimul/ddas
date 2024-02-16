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
    <ul className='flex flex-col space-y-6 '>
      {displayedEvents.map((event) => (
        <li
          className='max-w-6xl mx-auto flex  flex-col md:flex-row  flex-wrap rounded-lg group box-border    hover:border-orange-500 dark:hover:border-orange-500 border border-black  p-2 md:p-5 dark:border-white  hover:shadow-2xl hover:-translate-y-1 ease-in-out duration-300  '
          key={event._id}
        >
          <div className='[title-section]  md:-mt-12'>
            <span className=' bg-[#f4f4f5]  dark:bg-[#0b1213] rounded-md p-2  text-gray-800 text-opacity-50 text-sm tracking-widest uppercase'>
              Kommende
            </span>
            <h2 className='text-bold pt-4 text-xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-4xl pb-2 md:py-4 basis-full'>
              {event.title}
            </h2>
          </div>

          <div className=' md:basis-1/2 md:-ml-24  h-min  '>
            <EventsImage image={event.image} />
          </div>

          <div className=' md:basis-1/2 mb-4 md:-ml-24  md:px-6 flex flex-col space-y-4  md:mt-12 border border-black dark:border-white  bg-white dark:bg-black h-min p-4 '>
            {event.date && (
              <span className='md:text-xl opacity-40'>
                {new Date(event.date).toLocaleDateString('da-DK', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            )}
            <p className=' text-gray-800 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
              {event.extract}
            </p>

            {event?.slug ? (
              <Link
                prefetch='intent'
                relative='path'
                to={'../../arrangementer/kommende-arrangementer/' + event?.slug}
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
  ) : (
    <div className='prose prose-xl mx-auto bg-green-50 p-4'>
      <p>No Events found, yet!</p>
    </div>
  );
}
