import { Link } from '@remix-run/react';

export default function SuccessMessage() {
  return (
    <div className=' w-full  h-full flex  '>
      <p className='bg-white dark:bg-black max-w-sm  p-4 align-middle text-center space-y-2 -mt-32 flex flex-col self-center justify-items-center justify-center h-max max-h-min mx-auto  '>
        <span className='text-6xl'>😊</span>{' '}
        <span className='text-3xl'>
          Din ansøgning er sendt, du skal høre fra os snarest.
        </span>
        <Link to='..'>Send igen</Link>
      </p>
    </div>
  );
}
