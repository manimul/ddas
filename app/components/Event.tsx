import { EventDocument } from '~/types/event';
import { SanityContent } from '~/components/SanityContent';
import { MemberImage } from '~/components/MemberImage';
import { MoveLeft } from 'lucide-react';
import { Link } from '@remix-run/react';

type EventProps = {
  data: EventDocument;
};

export function Event(props: EventProps) {
  const { _id, title, extract, date, content, image } = props.data;
  return (
    <div className='flex flex-row flex-wrap  box-border'>
      <Link className=' inline-flex space-x-2' relative='path' to='../'>
        <MoveLeft />
        <span> Arrangementer</span>
      </Link>
      <h1 className=' py-4 basis-full text-bold pt-4 text-xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-4xl'>
        {title}
      </h1>
      <div className='basis-1/3 space-y-4 '>
        <MemberImage image={image} />
        <div className='bg-[#f59e0b] p-4'>
          <h2 className='text-lg font-semibold'>PRAKTISKE INFORMATIONER:</h2>
          <p className='mt-2'>
            Deltagelse koster 100 kr. for medlemmer og 200 kr. for gæster.
            Inkluderet i prisen er øl, vand, vin og en sandwich. Efter
            foredraget er der mulighed for at udnytte vort meget erfarne
            ”Afrika-netværk”. Tilmeld dig via mail til:{' '}
            <a
              href='mailto:mail@afrikaselskabet.dk'
              className='text-blue-600 hover:text-blue-800'
            >
              mail@afrikaselskabet.dk
            </a>
          </p>
          <p className='mt-2'>
            Betalingen sker via Mobile-Pay: 34 32 50 eller ved at overføre
            beløbet til Afrikaselskabets konto 2150 8350007263.
          </p>
          <p className='mt-2'>
            Er du interesseret i at blive medlem, kan ansøgningen sendes gennem
            dette link:{' '}
            <a
              href='https://afrikaselskabet.dk/kontakt-os/medlemskab-ansoeg/'
              className='text-blue-600 hover:text-blue-800'
            >
              https://afrikaselskabet.dk/kontakt-os/medlemskab-ansoeg/
            </a>
          </p>
          <p className='mt-2'>
            Betalingen sker via Mobile-Pay: 34 32 50 eller ved at overføre
            beløbet til Afrikaselskabets konto 2150 8350007263.
          </p>
          <p className='mt-2'>
            Er du interesseret i at blive medlem, kan ansøgningen sendes gennem
            dette link:{' '}
            <a
              href='https://afrikaselskabet.dk/kontakt-os/medlemskab-ansoeg/'
              className='text-blue-600 hover:text-blue-800'
            >
              https://afrikaselskabet.dk/kontakt-os/medlemskab-ansoeg/
            </a>
          </p>
        </div>
      </div>
      <div className='basis-1/2 px-6 flex flex-col space-y-4 '>
        {date && (
          <div>
            <span className='text-xl opacity-40'>
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        )}
        <p className='text-lg prose font-bold 	'>{extract}</p>
        {content && content?.length > 0 ? (
          <SanityContent value={content} />
        ) : null}
      </div>
    </div>
  );
}
