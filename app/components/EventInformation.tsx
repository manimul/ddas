import { Link } from '@remix-run/react';

export function EventInformation() {
  return (
    <div className='text-sm md:text-base space-y-4 bg-white dark:bg-black p-4  md:py-6 h-min md:sticky top-8 border border-gray-100 dark:border-gray-800 rounded-md   md:-ml-6 md:px-6'>
      <div>
        <h2 className='md:text-2xl  capitalize font-semibold '>
          Praktiske Informationer:
        </h2>
        <div>
          <h3 className='pt-2'>Deltagelse koster</h3>
          <div className='flex flex-col md:w-3/4 md:text-lg '>
            <span className='flex flex-row justify-between'>
              100 kr.<span> for medlemmer</span>
            </span>
            <span className='flex flex-row justify-between'>
              200 kr. <span>for gæster</span>
            </span>
          </div>
        </div>
        <p className='my-2 opacity-60 italic'>
          Inkluderet i prisen er øl, vand, vin og en sandwich. Efter foredraget
          er der mulighed for at udnytte vort meget erfarne ”Afrika-netværk”.
        </p>
        <p> Tilmeld dig via mail til: </p>
        <Link
          to='mailto:mail@afrikaselskabet.dk'
          className='text-bold text-[#ffae22] underline'
        >
          mail@afrikaselskabet.dk
        </Link>
        <p className='mt-2   '>
          Betalingen sker via Mobile-Pay: 34 32 50 eller ved at overføre beløbet
          til Afrikaselskabets konto 2150 8350007263.
        </p>
        <p className='mt-4   opacity-60  '>
          Er du interesseret i at blive medlem, kan ansøgningen sendes gennem
          dette link: <br />
        </p>
      </div>
      <Link
        to='../../ansog-om-medlemskab'
        className='inline-flex uppercase text-xs md:text-sm  rounded-md p-4 tracking-wide opacity-75    bg-[#ffae22] text-black hover:opacity-100 hover:rounded-[30px]  duration-500     '
      >
        Ansog Om Medlemskab
      </Link>
    </div>
  );
}
