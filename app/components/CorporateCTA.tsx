import { Link } from '@remix-run/react';

export function CorporateCTA() {
  return (
    <div className='mx-auto w-full py-32'>
      <div className='relative rounded-lg  isolate overflow-hidden bg-gradient-to-tr from-[#FD5F55] to-[#FE9201] px-4 md:px-6 pt-6  shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0'>
        <div className='mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left'>
          <h2 className='text-2xl md:text-4xl font-bold md:tracking-tight text-white'>
            Styrk Din Virksomheds Afrikanske Forbindelser - Bliv
            Virksomhedsmedlem
          </h2>
          <p className='md:mt-3 md:text-2xl md:leading-8 text-gray-100'>
            Udvid din virksomheds horisont med unik adgang til Afrikas markeder,
            kultur og netværk af ligesindede.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6 lg:justify-start'>
            <Link
              to='../../ansog-om-medlemskab/virksomhed'
              relative='route'
              className=' uppercase text-sm mb-6 md:mb-0   rounded-md p-4 tracking-wide opacity-75    bg-white text-black hover:opacity-100 hover:rounded-[30px]  duration-500     '
            >
              Bliv virksomhedsmedlem nu
            </Link>
          </div>
        </div>
        <div className='relative  h-80 '>
          <img
            className='absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10'
            //src='https://cdn.midjourney.com/e60153e3-9d2d-4d4d-b27e-7e1d533d9947/0_1.webp'
            src='https://cdn.midjourney.com/7419c635-9c49-4d01-9264-7c961219c070/0_3.webp'
            alt='App screenshot'
            width={1824}
            height={1080}
          />
        </div>
      </div>
    </div>
  );
}
