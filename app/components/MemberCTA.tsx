import { Link } from '@remix-run/react';

type MemberCTAProps = {
  title: string;
  text: string;
};

export function MemberCTA(props: MemberCTAProps) {
  const { title, text } = props;
  return (
    <div className='mx-auto  w-full md:py-12 '>
      <div className='relative rounded-lg isolate overflow-hidden bg-gradient-to-tr from-[#05B29D] to-[#1C5340] px-4 md:px-6 pt-6 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-12 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0'>
        <div className='mx-auto text-center lg:mx-0 lg:flex-auto lg:py-16 lg:text-left'>
          <h2 className='text-2xl md:text-4xl font-bold md:tracking-tight text-white '>
            {title
              ? title
              : 'Bliv en Del Af Afrikas Fremtid - Bliv Personligt Medlem​​​​‌'}
          </h2>
          <p className='md:mt-3 md:text-2xl md:leading-8 text-gray-100'>
            {text
              ? text
              : 'Deltag i dag for at forbinde dybt med Afrikas kultur, innovation og mangfoldighed gennem eksklusive medlemsfordele'}
          </p>
          <div className='mt-10 md:flex items-center justify-center gap-x-6 lg:justify-start space-y-4'>
            <Link
              to='../../ansog-om-medlemskab/personligt'
              relative='route'
              className=' uppercase text-sm  rounded-md p-4 tracking-wide opacity-75    bg-white text-black hover:opacity-100 hover:rounded-[30px]  duration-500     '
            >
              Bliv personligt medlem nu
            </Link>
            <Link
              unstable_viewTransition
              relative='route'
              to='../../ansog-om-medlemskab'
              className=' group inline-flex items-center justify-center px-5 py-3 mr-3 uppercase text-sm  rounded-md p-4 tracking-wide  text-center   bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'
            >
              Lær mere
              <svg
                className='w-5 h-5 ml-2 -mr-1  group-hover:translate-x-3 transition-all duration-300'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className='relative h-20   md:h-80 '>
          <img
            className='absolute left-0 top-0 w-[57rem] max-w-none md:rounded-md bg-white/5 ring-1 ring-white/10'
            //src='https://cdn.midjourney.com/7f1b20ca-c243-4a2c-8feb-998de0488f14/0_2.webp'
            src='https://cdn.midjourney.com/7419c635-9c49-4d01-9264-7c961219c070/0_0.webp'
            alt='App screenshot'
            width={1824}
            height={1080}
          />
        </div>
      </div>
    </div>
  );
}
