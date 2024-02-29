import { Link } from '@remix-run/react';
import {
  Blocks,
  BookOpenText,
  CalendarCheck2,
  Globe2,
  Mails,
  Waypoints,
} from 'lucide-react';

export function Medlem() {
  return (
    <>
      <section className='space-y-6'>
        <div className='test'>
          <div className='grid grid-cols-1 gap-y-2 md:gap-y-8 lg:grid-cols-3  lg:gap-x-16'>
            <div className=' max-w-lg col-span-1  lg:mx-0 '>
              <h1 className='text-2xl md:text-4xl '>
                Bliv Medlem af Det Danske Afrika Selskab
              </h1>

              <p className='mt-4  text-gray-800 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
                Som medlem af Det Danske Afrika Selskab bliver du en del af et
                passioneret fællesskab, der dykker dybt ind i Afrikas hjerte.
                Vores medlemskab tilbyder unikke muligheder for at forbinde,
                lære og udforske det kontinent, der rummer så meget uudnyttet
                potentiale og skønhed. Deltag i vores aktiviteter og berig dit
                liv med den uendelige mangfoldighed af Afrika.
              </p>
            </div>

            <div className='grid col-span-2  grid-cols-1 gap-4 sm:grid-cols-3'>
              <div className='flex space-x-2  md:block rounded-xl border border-gray-100 p-4 shadow-sm   '>
                <span className='md:inline-block rounded-lg  '>
                  {' '}
                  <Waypoints />
                </span>

                <h2 className='md:mt-2  font-bold '>Netværk med ligesindede</h2>

                <p className='hidden sm:mt-1 sm:block text-base text-gray-800 dark:text-gray-400'>
                  Mød og forbind med et netværk af personer, der deler din
                  passion for Afrika.
                </p>
              </div>

              <div className='flex space-x-2  md:block rounded-xl border border-gray-100 p-4 shadow-sm'>
                <span className='inline-block rounded-lg  '>
                  <CalendarCheck2 />
                </span>

                <h2 className='md:mt-2 font-bold '>
                  Eksklusive møder og udflugter
                </h2>

                <p className='hidden sm:mt-1 sm:block text-base text-gray-800 dark:text-gray-400'>
                  Få adgang til inspirerende møder og unikke udflugter, der er
                  designet til at udforske Afrikas kultur, historie og nutid.
                </p>
              </div>

              <div className='flex space-x-2  md:block  rounded-xl border border-gray-100 p-4 shadow-sm '>
                <span className='inline-block rounded-lg  '>
                  <BookOpenText />
                </span>

                <h2 className='md:mt-2   font-bold'>
                  Uddannelsesmæssige ressourcer
                </h2>

                <p className='hidden sm:mt-1 sm:block text-base text-gray-800 dark:text-gray-400'>
                  Adgang til en rig samling af ressourcer for dybere forståelse
                  af Afrikas komplekse samfund.
                </p>
              </div>

              <div className='flex space-x-2  md:block  rounded-xl border border-gray-100 p-4 shadow-sm '>
                <span className='inline-block rounded-lg  '>
                  <Blocks />
                </span>

                <h2 className=' md:mt-2 font-bold'>
                  Kulturel og forretningsmæssig udveksling
                </h2>

                <p className='hidden sm:mt-1 sm:block text-base text-gray-800 dark:text-gray-400 md:text'>
                  Deltag i unikke programmer, der fremmer både kulturel
                  forståelse og forretningsmæssigt samarbejde mellem Danmark og
                  Afrika.
                </p>
              </div>

              <div className='flex space-x-2  md:block  rounded-xl border border-gray-100 p-4 shadow-sm '>
                <span className='inline-block rounded-lg  '>
                  <Globe2 />
                </span>

                <h2 className='md:mt-2 font-bold '>Kulturelle begivenheder</h2>

                <p className='hidden sm:mt-1 sm:block text-base text-gray-800 dark:text-gray-400'>
                  Invitationer til eksklusive kulturelle arrangementer, der
                  fejrer Afrikas mangfoldige traditioner og samfund.
                </p>
              </div>

              <div className='flex space-x-2  md:block  rounded-xl border border-gray-100 p-4 shadow-sm  '>
                <span className='inline-block rounded-lg  '>
                  <Mails />
                </span>

                <h2 className='md:mt-2 font-bold '>
                  Nyhedsbreve og opdateringer
                </h2>

                <p className='hidden sm:mt-1 sm:block text-base text-gray-800 dark:text-gray-400'>
                  Hold dig informeret med de seneste nyheder og opdateringer om
                  Afrika samt selskabets aktiviteter.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='grid text-white   md:grid-cols-3 gap-6  bg-[#101a1d]  p-4 -ml-4 -mr-4  md:p-32 md:-ml-32 md:-mr-32'>
          <p className='text-2xl  '>
            Uanset om du er en person med{' '}
            <span className='text-orange-500'>
              passion for afrikansk kultur{' '}
            </span>
            eller en virksomhed, der søger at{' '}
            <span className='text-orange-500'>
              skabe meningsfulde forbindelser
            </span>
            , tilbyder vi{' '}
            <span className='text-orange-500'>
              medlemskab for personer og virksomhede
            </span>
            , der passer til dine behov.
          </p>

          <Link
            className='bg-cover bg-center relative text-white font-bold py-2 px-4 rounded'
            to='../../../ansog-om-medlemskab/personligt'
            style={{
              backgroundImage:
                //"url('https://cdn.midjourney.com/7f1b20ca-c243-4a2c-8feb-998de0488f14/0_2.webp')",
                "url('https://cdn.midjourney.com/e6d4632b-1c50-4525-b392-199df930b91a/0_0.webp')",
              width: 'auto',
              height: '200px',
            }}
          >
            <span className='absolute inset-0 flex justify-center bg-black bg-opacity-25 hover:backdrop-grayscale duration-150	 items-center text-2xl'>
              Personligt medlemskab
            </span>
          </Link>
          <Link
            to='../../../ansog-om-medlemskab/virksomhed'
            className='bg-cover bg-center relative text-white font-bold py-2 px-4 rounded'
            style={{
              backgroundImage:
                // "url('https://cdn.midjourney.com/3aa676ab-27e9-4b9c-abcd-0e0ab8768ecb/0_0.webp')",
                "url('https://cdn.midjourney.com/f66f6abb-d982-45ef-b03f-d13b30126620/0_1.webp')",
              width: 'auto',
              height: '200px',
            }}
          >
            <span className='absolute inset-0 flex justify-center items-center drop-shadow-lg bg-black bg-opacity-25  hover:backdrop-grayscale duration-150	  p-2 text-2xl'>
              Virksomhedsmedlemskab
            </span>
          </Link>
        </div>{' '}
      </section>
    </>
  );
}
