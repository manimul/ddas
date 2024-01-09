import { Link } from '@remix-run/react';
import { MemberImage } from '~/components/MemberImage';
import type { EventStub } from '~/types/event';
import { SanityContent } from './SanityContent';

type EventsProps = {
  events: EventStub[];
};

export function PastEvents(props: EventsProps) {
  const { events = [] } = props;
  return events.length > 0 ? (
    <div className=' '>
      <ul className='grid grid-cols-4 gap-4 '>
        {events.map((event) => (
          <li
            key={event._id}
            className='flex flex-row flex-wrap  box-border opacity-75 hover:opacity-100 cursor-pointer hover:border-gray-600 rounded-lg border border-gray-200 p-2 hover:shadow-2xl hover:-translate-y-1 ease-in-out duration-300  '
          >
            <div className=' '>
              <MemberImage image={event.image} />
            </div>
            <h2 className=' py-1 '>
              {event?.slug ? (
                <Link
                  prefetch='intent'
                  relative='path'
                  to={
                    '../../arrangementer/kommende-arrangementer/' + event?.slug
                  }
                  className='text-bold  text-xl tracking-tighter transition-colors duration-100 ease-in-out   lg:text-xl'
                >
                  {event.title}
                  {/* Makes this entire block clickable */}
                  {/* <span className="absolute inset-0" /> */}
                </Link>
              ) : (
                <span className='pt-2 text-xl tracking-tighter'>
                  {event.title}
                </span>
              )}
            </h2>

            <div className=' flex flex-col space-y-2 '>
              {event.date && (
                <div>
                  <span className='text-sm opacity-40'>
                    {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              )}
              <p className='text-base  font-bold '>{event.extract}</p>

              {event?.slug ? (
                <Link
                  prefetch='intent'
                  relative='path'
                  to={
                    '../../arrangementer/kommende-arrangementer/' + event?.slug
                  }
                  className='underline opacity-75 text-orange-500 hover:opacity-100'
                >
                  Lær mere
                  {/* Makes this entire block clickable */}
                  {/* <span className="absolute inset-0" /> */}
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
