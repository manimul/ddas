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
        <div className='bg-[#f59e0b] pl-32 pr-6 py-6 -ml-32 rounded-r '>
          <h2 className='text-2xl text-black capitalize font-semibold'>
            Praktiske Informationer:
          </h2>
          <p className='my-2 text-black opacity-60'>
            Deltagelse koster 100 kr. for medlemmer og 200 kr. for gæster.
            Inkluderet i prisen er øl, vand, vin og en sandwich. Efter
            foredraget er der mulighed for at udnytte vort meget erfarne
            ”Afrika-netværk”. <br />
            Tilmeld dig via mail til: <br />
          </p>
          <Link
            to='mailto:mail@afrikaselskabet.dk'
            className='text-black underline'
          >
            mail@afrikaselskabet.dk
          </Link>
          <p className='mt-2  text-black opacity-60'>
            Betalingen sker via Mobile-Pay: 34 32 50 eller ved at overføre
            beløbet til Afrikaselskabets konto 2150 8350007263.
          </p>
          <p className='my-4  text-black opacity-60  '>
            Er du interesseret i at blive medlem, kan ansøgningen sendes gennem
            dette link: <br />
          </p>
          <Link
            to='ansog-om-medlemskab'
            className='text-sm   border rounded-sm p-2  border-black text-black  hover:bg-black hover:text-white transition-all duration-1000 ease-in-out  '
          >
            Ansog Om Medlemskab
          </Link>
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
        <p className='text-lg  font-bold 	'>{extract}</p>
        {content && content?.length > 0 ? (
          <SanityContent value={content} />
        ) : null}
      </div>
    </div>
  );
}
