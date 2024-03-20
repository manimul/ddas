import { Link } from '@remix-run/react';

export default function RegistrationSuccess() {
  return (
    <div className=' w-full  flex   '>
      <p className='bg-white dark:bg-black max-w-sm  p-4 align-middle text-center space-y-2  flex flex-col self-center justify-items-center justify-center h-max max-h-min mx-auto  '>
        <span className='text-6xl'>😊</span>{' '}
        <span className='text-3xl'>
          Tak for din tilmelding! Du vil modtage en bekræftelse på mail.
        </span>
      </p>
    </div>
  );
}
