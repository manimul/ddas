import { EventDocument } from '~/types/event';
import { SanityContent } from '~/components/SanityContent';
import { MemberImage } from '~/components/MemberImage';
import { MoveLeft } from 'lucide-react';
import { Link } from '@remix-run/react';
import { EventInformation } from './EventInformation';
import { DateFormat } from './DateFormat';
import { EventImage } from '~/components/EventImage';

type EventProps = {
  data: EventDocument;
};

export function Event(props: EventProps) {
  const { _id, title, extract, date, content, image } = props.data;
  return (
    <>
      <div className='flex flex-row flex-wrap  box-border'>
        <Link className=' inline-flex space-x-2' relative='path' to='../'>
          <MoveLeft />
          <span> Arrangementer</span>
        </Link>
        <div className='grid  grid-cols-1 md:grid-cols-3'>
          <div className='md:col-span-3 order-1'>
            <div className='md:max-w-2xl text-center mx-auto mb-4'>
              <h1 className=' py-4  text-bold pt-4 text-2xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-4xl'>
                {title}
              </h1>
              {date && <DateFormat date={date} />}
              {extract && <p className='md:text-lg  font-bold 	'>{extract}</p>}
            </div>
            <EventImage image={image} />
          </div>

          <div className='md:col-span-1 my-4  md:-mt-32 order-3 md:order-2 '>
            <EventInformation />
          </div>
          <div className='md:col-span-2  md:-mt-32 order-2 md:order-3'>
            <div className=' md:px-6 flex flex-col space-y-4 '>
              {content && content?.length > 0 ? (
                <div className='bg-white dark:bg-black p-4'>
                  <SanityContent value={content} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* 

      <div className='flex flex-row flex-wrap  box-border'>
        <Link className=' inline-flex space-x-2' relative='path' to='../'>
          <MoveLeft />
          <span> Arrangementer</span>
        </Link>
        <h1 className=' py-4 basis-full text-bold pt-4 text-xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-4xl'>
          {title}
        </h1>
        <div className='basis-1/3 space-y-4 flex flex-col '>
          <MemberImage image={image} />
          <EventInformation />
        </div>
        <div className='basis-1/2 px-6 flex flex-col space-y-4 '>
          {date && <DateFormat date={date} />}
          {extract && <p className='text-lg  font-bold 	'>{extract}</p>}
          <div className='bg-white p-4'>
            {content && content?.length > 0 ? (
              <SanityContent value={content} />
            ) : null}
          </div>
        </div>
      </div>
      */}
    </>
  );
}
