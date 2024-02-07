import { ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();
  console.log(formData.get('name'));
  console.log(formData.get('email'));
  console.log(formData.get('besked'));

  return null;
}

export default function Example() {
  return (
    <section className=''>
      <div className=' grid  py-4  md:py-8 mx-auto md:gap-8 xl:gap-0 lg:py-10 lg:grid-cols-12'>
        <div className=' lg:mt-0 order-1  lg:col-span-5 lg:flex rounded-2xl pb-4'>
          <img
            src='https://cdn.midjourney.com/7f1b20ca-c243-4a2c-8feb-998de0488f14/0_2.webp'
            alt='mockup'
            className='rounded-lg'
          />
        </div>
        <div className='  order-2 place-self-center lg:col-span-7'>
          <h1 className='max-w-2xl mb-4 md:pr-6 text-4xl  tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white'>
            Kontakt Det Danske Afrika Selskab
          </h1>
          <p className='max-w-2xl  md:pr-6 mb-4 font-light text-gray-500 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
            Har du spørgsmål, eller ønsker du yderligere information om Det
            Danske Afrika Selskab? Udfyld venligst kontaktformularen på denne
            side, så vender vi tilbage til dig hurtigst muligt. Vi ser frem til
            at høre fra dig!
          </p>

          <Form className=' max-w-md ' method='post'>
            <fieldset className='space-y-4'>
              <div>
                <label htmlFor='name' className='sr-only'>
                  Navn
                </label>
                <input
                  type='text'
                  name='name'
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='Indtast navn'
                />
              </div>
              <div>
                <label htmlFor='email' className='sr-only'>
                  E-mail
                </label>
                <input
                  type='email'
                  name='email'
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='Indtast e-mail'
                />
              </div>
              <div>
                <label htmlFor='message' className='sr-only'>
                  Besked
                </label>
                <textarea
                  rows={5}
                  id='message'
                  name='message'
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='Indtast besked'
                />
              </div>

              <button
                type='submit'
                className=' uppercase text-sm  rounded-md p-4 tracking-wide opacity-75    bg-[#ffae22] text-black hover:opacity-100 hover:rounded-[30px]  duration-500     '
              >
                Send Besked
              </button>
            </fieldset>
          </Form>
        </div>
      </div>
    </section>
  );
}
