import { Form } from '@remix-run/react';
import { z } from 'zod';
//import { Form } from '~/components/Form';

const schema = z.object({
  firstName: z.string().min(1),
  email: z.string().min(1).email(),
  //howYouFoundOutAboutUs: z.enum(['fromAFriend', 'google']),
});

export default function Personligt() {
  const getYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (v, i) => currentYear - i);
  };

  return (
    <div className='grid md:grid-cols-8 gap-6 '>
      <div className=' col-span-4 space-y-4'>
        <h1 className='text-4xl '>Personligt Medlemskap</h1>

        <div className='prose font-serif dark:prose-invert lg:prose-lg  prose-a:text-cyan-600 dark:prose-a:text-cyan-200'>
          Du kan ansøge om personligt medlemskab af Det Danske Afrika Selskab
          ved at udfylde og sende formularen nedenfor. Husk at udfylde alle
          felter og at give en beskrivelse af dine specielle erfaringer med og
          interesse for Afrika. Du vil få besked fra os, når din ansøgning er
          godkendt af bestyrelsen. Det årlige kontingent er kr. 250 per medlem.
          Møder og sammenkomster arrangeres til meget rimelige priser, som vil
          fremgå af invitationen.
        </div>
      </div>

      <Form method='post' className='col-span-4  max-w-lg mx-auto  '>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full  px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-first-name'
            >
              Navn
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='navn'
              type='text'
              placeholder='Jane Doe'
            />
          </div>

          <div className='w-full  px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='grid-first-name'
            >
              Adresse
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='addresse'
              type='text'
              placeholder='Adresse 123           '
            />
          </div>

          <div className='w-full  px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='nummer'
            >
              Telefonnummer
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='nummer'
              type='number'
              placeholder='004523456789'
            />
          </div>

          <div className='w-full  px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='postnummer'
            >
              Postnummer og by{' '}
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='postnummer'
              type='number'
              placeholder='00452'
            />
          </div>

          <div className='w-full  px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className='appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='email'
              type='email'
              placeholder='yourname@email.com'
            />
          </div>

          <div className='w-full px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='year-select'
            >
              Fødselsår
            </label>
            <div className='relative'>
              <select
                className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 mb-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                id='year-select'
              >
                {getYears().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
          </div>
          <div className='w-full  px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='email'
            >
              Beskrivelse af din Afrikaerfaring:
            </label>
            <textarea
              className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
              id='year'
            />
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
          >
            Send
          </button>
        </div>
      </Form>
    </div>
  );

  {
    /* 
    <Form className='bg-gray-200' schema={schema}>
      {({ Field, Errors, Button }) => (
        <>
          <Field
            className='border border-black'
            name='firstName'
            label='First name'
          />
          <Field className='border border-black' name='email' label='E-mail' />
          <em>You'll hear from us at this address 👆🏽</em>
          <Errors />
          <Button />
        </>
      )}
    </Form>
  */
  }
}
