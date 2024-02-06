import { Link } from '@remix-run/react';

export function CorporateCTA() {
  return (
    <div className='mx-auto w-full py-32'>
      <div className='relative isolate overflow-hidden bg-[#F87B16] md:px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0'>
        <div className='mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left'>
          <h2 className='text-2xl font-bold tracking-tight text-white sm:text-4xl'>
            Bliv Corporate Medlem i Dag. Styrk jeres virksomheds globale
            engagement og netværk
          </h2>
          <p className='mt-6 text-lg leading-8 text-gray-100'>
            Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
            Malesuada adipiscing sagittis vel nulla.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6 lg:justify-start'>
            <Link
              to='ansog-om-medlemskab/corporate'
              className=' uppercase text-sm  rounded-md p-4 tracking-wide opacity-75    bg-white text-black hover:opacity-100 hover:rounded-[30px]  duration-500     '
            >
              Bliv Corporate medlem
            </Link>
          </div>
        </div>
        <div className='relative  h-80 '>
          <img
            className='absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10'
            src='https://cdn.midjourney.com/e60153e3-9d2d-4d4d-b27e-7e1d533d9947/0_1.webp'
            alt='App screenshot'
            width={1824}
            height={1080}
          />
        </div>
      </div>
    </div>
  );
}
