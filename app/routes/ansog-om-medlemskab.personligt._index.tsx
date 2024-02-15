import { Form, Outlet } from '@remix-run/react';
import {
  ActionFunctionArgs,
  ActionFunction,
  json,
  redirect,
} from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { z } from 'zod';
import { medlemFormZ, MedlemFormDocument } from '~/types/medlemForm';
//import { Form } from '~/components/Form';

async function sendEmail(params: MedlemFormDocument) {
  const { navn, adresse, telefonnummer, postnummer, email, fodselsar, besked } =
    params;
  const serverToken = process.env.POSTMARK_SERVER_TOKEN;

  if (typeof serverToken !== 'string') {
    throw new Error(
      'Postmark server token is not set in environment variables.'
    );
  }

  const response = await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': serverToken,
    },
    body: JSON.stringify({
      From: 'mark@bambwa.com',
      To: 'mark@bambwa.com',
      Subject: 'Ny ansøgning om personligt medlemskab',
      HtmlBody: `<html><body><p>Navn: ${navn}</p><p>Email: ${email}</p><p>Besked: ${besked}</p><p>Adresse: ${adresse}</p><p>Postnummber och By: ${postnummer} </p><p>Fødselsår: ${fodselsar} </p><p>Telefon: ${telefonnummer} </p></body></html>`,
      TextBody: `Navn: ${navn}\nEmail: ${email}\nBesked: ${besked} \nAdresse: ${adresse} \nPostnummer och By: ${postnummer} \nFødselsår: ${fodselsar} \nTelefon: ${telefonnummer}`,
    }),
  });
  return response.json();
}

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();

  console.log(formData.get('fodselsar')); // Check the actual value
  console.log(formData.get('navn')); // Check the actual value

  const emailParams: MedlemFormDocument = {
    navn: formData.get('navn')?.toString() || '',
    adresse: formData.get('adresse')?.toString() || '',
    telefonnummer: Number(formData.get('telefonnummer')) || 0,
    postnummer: formData.get('postnummer')?.toString() || '',
    email: formData.get('email')?.toString() || '',
    fodselsar: Number(formData.get('fodselsar')) || 0,
    besked: formData.get('besked')?.toString() || '',
  };

  const validatedParams = medlemFormZ.parse(emailParams);

  try {
    const emailResponse = await sendEmail(validatedParams);
    console.log(emailResponse);
    //return json({ success: true, message: 'Tak for din besked!' });
    return redirect('success');
  } catch (error) {
    console.error('Email sending error:', error);
    return json({ success: false, message: 'Der skete en fejl' });
  }
};

interface ActionData {
  message: string;
}

export default function PersonligtForm() {
  const getYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (v, i) => currentYear - i);
  };

  let actionData = useActionData<ActionData>();

  return (
    <Form
      //className=' col-span-4 -mt-32  pt-32  pr-32 -mr-32 h-min bg-fixed  '
      method='post'
    >
      <fieldset
        className=' space-y-4 shadow-2xl -ml-12 p-6 bg-[#f4f4f5] dark:bg-black dark:bg-opacity-50 bg-opacity-75 backdrop-blur-2xl
        '
      >
        <div>
          <label htmlFor='navn' className='sr-only'>
            Navn
          </label>
          <input
            type='text'
            required
            name='navn'
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
            required
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
            type='tel'
            required
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
            required
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
            required
            name='email'
            className='w-full rounded-lg border-gray-200 bg-white dark:bg-black p-4 pe-12 text-sm shadow-sm'
            placeholder='Indtast e-mail'
          />
        </div>
        <div>
          <label htmlFor='fodselsar' className='sr-only'>
            Fødselsår
          </label>
          <select
            className='w-full pr-3 rounded-lg border-gray-200 bg-white dark:bg-black p-4 pe-12 text-sm shadow-sm'
            name='fodselsar'
            id='fodselsar'
            required
          >
            <option value='' disabled selected className='opacity-50'>
              Vælg dit fødselsår
            </option>

            {getYears().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='besked' className='sr-only'>
            Besked
          </label>
          <textarea
            rows={5}
            id='besked'
            required
            name='besked'
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
  );
}
