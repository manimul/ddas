export function MemberCTA() {
  return (
    <div className='mx-auto  w-full py-12'>
      <div className='relative isolate overflow-hidden bg-green-500 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-12 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0'>
        <div className='mx-auto text-center lg:mx-0 lg:flex-auto lg:py-16 lg:text-left'>
          <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
            Bliv Personlig Medlem i Dag. Styrk jeres virksomheds globale
            engagement og netværk
          </h2>
          <p className='mt-6 text-lg leading-8 text-gray-100'>
            Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
            Malesuada adipiscing sagittis vel nulla.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6 lg:justify-start'>
            <a
              href='#'
              className='rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
            >
              Bliv medlem
            </a>
            <a href='#' className='text-sm font-semibold leading-6 text-white'>
              Learn more <span aria-hidden='true'>→</span>
            </a>
          </div>
        </div>
        <div className='relative  h-80 '>
          <img
            className='absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10'
            src='https://cdn.midjourney.com/7f1b20ca-c243-4a2c-8feb-998de0488f14/0_2.webp'
            alt='App screenshot'
            width={1824}
            height={1080}
          />
        </div>
      </div>
    </div>
  );
}
