import { Form } from '@remix-run/react';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { z } from 'zod';
//import { Form } from '~/components/Form';

const schema = z.object({
  firstName: z.string().min(1),
  email: z.string().min(1).email(),
  //howYouFoundOutAboutUs: z.enum(['fromAFriend', 'google']),
});

export async function action({ request }: ActionFunctionArgs) {
  let formData = await request.formData();

  console.log(formData.get('name'));
  console.log(formData.get('email'));
  console.log(formData.get('besked'));

  return json({ success: true, message: 'Tak for din besked!' });
}

interface ActionData {
  message: string;
}

export default function Personligt() {
  const getYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (v, i) => currentYear - i);
  };

  let actionData = useActionData<ActionData>();

  return (
    <div className='grid md:grid-cols-8 gap-6 '>
      <div className=' col-span-4 space-y-4 md:pr-12'>
        <div className='membership-page space-y-2'>
          <h1 className='text-lg text-orange-400'>Personligt Medlem</h1>
          <h2 className='text-4xl [membership-title]'>
            Bliv medlem af Det Danske Afrika Selskab i dag
          </h2>
          <p className='md:text-lg md:leading-8 text-gray-600 dark:text-gray-300'>
            Påbegynd din rejse med os i Det Danske Afrika Selskab ved at blive
            personligt medlem. Det er en enkel proces – udfyld blot og indsend
            formularen nedenfor. Sørg for at udfylde hver sektion, og glem ikke
            at dele dine unikke oplevelser med og passion for Afrika. Din
            ansøgning vil blive gennemgået af vores bestyrelse, og vi vil give
            dig besked, når den er godkendt.
          </p>
          <h3 className='text-2xl font-bold'>Hvorfor blive medlem?</h3>
          <p className='md:text-lg md:leading-8 text-gray-600 dark:text-gray-300'>
            At være en del af vores selskab betyder, at du tilslutter dig et
            fællesskab af individer, der deler din interesse for Afrika. Uanset
            om det er kulturen, menneskene, landskaberne eller specifikke
            oplevelser, der trækker dig, er vi her for at udforske det sammen.
          </p>
          <h3 className='text-2xl font-bold'>Møder og sammenkomster</h3>
          <p className='md:text-lg md:leading-8 text-gray-600 dark:text-gray-300'>
            Vi arrangerer møder og sammenkomster til meget rimelige priser.
            Detaljer og omkostninger vil blive oplyst med hver eventinvitation,
            så du altid ved, hvad du kan forvente.
          </p>
          <h3 className='text-2xl font-bold'>Medlemsgebyr</h3>
          <p className='md:text-lg md:leading-8 text-gray-600 dark:text-gray-300'>
            Det årlige medlemsgebyr er kun 250 DKK per medlem. Dette nominelle
            gebyr hjælper os med at dække omkostningerne ved vores arrangementer
            og initiativer, så vi kan fortsætte med at tilbyde stor værdi til
            vores fællesskab.
          </p>
          <p className='md:text-lg md:leading-8 text-gray-600 dark:text-gray-300'>
            Bliv medlem i dag og vær en del af et selskab, der fejrer og lærer
            fra det diverse og rige tæppe, som er Afrika. Vi glæder os til at
            byde dig velkommen!
          </p>
        </div>

        <p className='text-2xl'> Det årlige kontingent er kr. 250 per medlem</p>
      </div>

      <Form
        className=' col-span-4 -mt-32  pt-32  pr-32 -mr-32 h-min bg-fixed  '
        method='post'
        style={{
          backgroundImage:
            "url('https://cdn.midjourney.com/7f1b20ca-c243-4a2c-8feb-998de0488f14/0_2.webp')",
          width: 'auto',
          height: '100%',
        }}
      >
        <fieldset
          className=' space-y-4 shadow-2xl -ml-12 p-6 bg-[#f4f4f5] dark:bg-black dark:bg-opacity-50 bg-opacity-75 backdrop-blur-2xl
        '
        >
          <div>
            <label htmlFor='name' className='sr-only'>
              Navn
            </label>
            <input
              type='text'
              name='name'
              className='w-full rounded-lg border-gray-200 bg-white dark:bg-black p-4 pe-12 text-sm shadow-sm'
              placeholder='Indtast navn'
            />
          </div>
          <div>
            <label htmlFor='adresse' className='sr-only'>
              Adresse
            </label>
            <input
              type='text'
              name='adresse'
              className='w-full rounded-lg border-gray-200 bg-white dark:bg-black p-4 pe-12 text-sm shadow-sm'
              placeholder='Indtast Adresse'
            />
          </div>
          <div>
            <label htmlFor='telefonnummer' className='sr-only'>
              Telefonnummer
            </label>
            <input
              type='number'
              name='telefonnummer'
              className='w-full rounded-lg border-gray-200 bg-white dark:bg-black p-4 pe-12 text-sm shadow-sm'
              placeholder='Indtast Telefonnummer'
            />
          </div>
          <div>
            <label htmlFor='postnummer' className='sr-only'>
              Postnummer Og By
            </label>
            <input
              type='text'
              name='postnummer'
              className='w-full rounded-lg border-gray-200 bg-white dark:bg-black p-4 pe-12 text-sm shadow-sm'
              placeholder='Indtast Postnummer o By'
            />
          </div>
          <div>
            <label htmlFor='email' className='sr-only'>
              E-mail
            </label>
            <input
              type='email'
              name='email'
              className='w-full rounded-lg border-gray-200 bg-white dark:bg-black p-4 pe-12 text-sm shadow-sm'
              placeholder='Indtast e-mail'
            />
          </div>
          <div>
            <label htmlFor='fodelsar' className='opacity-50'>
              Fødselsår
            </label>
            <select
              className='w-full rounded-lg border-gray-200 bg-white dark:bg-black p-4 pe-12 text-sm shadow-sm'
              id='year-select'
            >
              {getYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor='message' className='sr-only'>
              Besked
            </label>
            <textarea
              rows={5}
              id='message'
              name='message'
              className='w-full rounded-lg border-gray-200 bg-white dark:bg-black p-4 pe-12 text-sm shadow-sm'
              placeholder='Beskrivelse af din afrikaerfaring'
            />
          </div>

          <button
            type='submit'
            className=' uppercase text-sm  rounded-md p-4 tracking-wide opacity-75    bg-[#ffae22] text-black hover:opacity-100 hover:rounded-[30px]  duration-500     '
          >
            Send Besked
          </button>
        </fieldset>
        {actionData?.message && <p>{actionData.message}</p>}
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
