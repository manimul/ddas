import { Link } from '@remix-run/react';
import { MemberImage } from '~/components/MemberImage';
import type { EventStub } from '~/types/event';
import { SanityContent } from './SanityContent';

type EventsProps = {
  events: EventStub[];
};

export function Events(props: EventsProps) {
  const { events = [] } = props;
  return events.length > 0 ? (
    <div className=' border-gray-100 '>
      <ul className='flex flex-col space-y-6 p-4'>
        {events.map((event) => (
          <li
            key={event._id}
            className='flex flex-row justify-start space-x-6 w-full '
          >
            <div className='w-1/4'>
              <MemberImage image={event.image} />
              {event.date && (
                <div>
                  <h2>Event Date</h2>
                  <span>
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
            </div>
            <div className=' '>
              <h2 className='capitalize text-lg '>
                {event?.slug ? (
                  <Link
                    prefetch='intent'
                    relative='path'
                    to={'../../arrangementer/' + event?.slug}
                    className='text-bold pt-4 text-xl font-bold tracking-tighter transition-colors duration-100 ease-in-out hover:bg-cyan-400 hover:text-white lg:text-3xl'
                  >
                    {event.title}
                    {/* Makes this entire block clickable */}
                    {/* <span className="absolute inset-0" /> */}
                  </Link>
                ) : (
                  <span className='pt-4 text-xl font-bold tracking-tighter'>
                    {event.title}
                  </span>
                )}
              </h2>
              <p className='text-sm 	'>
                {event.content && event.content?.length > 0 ? (
                  <SanityContent value={event.content} />
                ) : null}
              </p>
              {event?.slug ? (
                <Link
                  prefetch='intent'
                  relative='path'
                  to={'../../arrangementer/' + event?.slug}
                  className='text-bold pt-4 text-xl font-bold tracking-tighter transition-colors duration-100 ease-in-out hover:bg-cyan-400 hover:text-white lg:text-3xl'
                >
                  Click to learn more
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
