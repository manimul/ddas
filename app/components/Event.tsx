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
      <div className='basis-1/3 space-y-4 flex flex-col '>
        <MemberImage image={image} />
        <div className=' space-y-4 bg-white dark:bg-black py-4 h-min md:sticky top-8 border border-gray-100 dark:border-gray-800 rounded-md   -ml-6 px-6'>
          <div>
            <h2 className='text-2xl  capitalize font-semibold'>
              Praktiske Informationer:
            </h2>
            <p className='my-2 opacity-60'>
              Deltagelse koster 100 kr. for medlemmer og 200 kr. for gæster.
              Inkluderet i prisen er øl, vand, vin og en sandwich. Efter
              foredraget er der mulighed for at udnytte vort meget erfarne
              ”Afrika-netværk”. <br />
              Tilmeld dig via mail til: <br />
            </p>
            <Link to='mailto:mail@afrikaselskabet.dk' className=' underline'>
              mail@afrikaselskabet.dk
            </Link>
            <p className='mt-2   opacity-60'>
              Betalingen sker via Mobile-Pay: 34 32 50 eller ved at overføre
              beløbet til Afrikaselskabets konto 2150 8350007263.
            </p>
            <p className='my-4   opacity-60  '>
              Er du interesseret i at blive medlem, kan ansøgningen sendes
              gennem dette link: <br />
            </p>
          </div>
          <Link
            to='ansog-om-medlemskab'
            className='inline-flex uppercase text-sm  rounded-md p-4 tracking-wide opacity-75    bg-[#ffae22] text-black hover:opacity-100 hover:rounded-[30px]  duration-500     '
          >
            Ansog Om Medlemskab
          </Link>
        </div>
      </div>
      <div className='basis-1/2 px-6 flex flex-col space-y-4 '>
        {date && (
          <div>
            <span className='text-xl opacity-40'>
              {new Date(date).toLocaleDateString('da-DK', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        )}
        <p className='text-lg  font-bold 	'>{extract}</p>
        {content && content?.length > 0 ? (
          <SanityContent value={content} />
        ) : null}
      </div>
    </div>
  );
}
