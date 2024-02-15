import { Form } from '@remix-run/react';
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
  const {
    firmanavn,
    adresse,
    telefonnummer,
    postnummer,
    kontaktperson,
    email,
    besked,
  } = params;
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
      Subject: 'Ny ansøgning om virksomhed medlemskab',
      HtmlBody: `<html><body><p>firmanavn: ${firmanavn}</p><p>Email: ${email}</p><p>Besked: ${besked}</p><p>Adresse: ${adresse}</p><p>Postnummber och By: ${postnummer} </p><p>Kontaktperson: ${kontaktperson} </p><p>Telefon: ${telefonnummer} </p></body></html>`,
      TextBody: `Firmanavn: ${firmanavn}\nEmail: ${email}\nBesked: ${besked} \nAdress: ${adresse} \nPostnummer och By: ${postnummer}  \nTelefon: ${telefonnummer}`,
    }),
  });
  return response.json();
}

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();

  const emailParams: MedlemFormDocument = {
    firmanavn: formData.get('firmanavn')?.toString() || '',
    adresse: formData.get('adresse')?.toString() || '',
    telefonnummer: Number(formData.get('telefonnummer')) || 0,
    postnummer: formData.get('postnummer')?.toString() || '',
    kontaktperson: formData.get('kontaktperson')?.toString() || '',
    email: formData.get('email')?.toString() || '',
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

export default function VirksomhedIndex() {
  let actionData = useActionData<ActionData>();

  return (
    <Form
      className=' col-span-4 -mt-32  pt-32  pr-32 -mr-32 h-min bg-fixed  '
      method='post'
      style={{
        backgroundImage:
          "url('https://cdn.midjourney.com/3aa676ab-27e9-4b9c-abcd-0e0ab8768ecb/0_0.webp')",
        width: 'auto',
        height: '100%',
      }}
    >
      <fieldset
        className=' space-y-4 shadow-2xl -ml-12 p-6 bg-[#f4f4f5] dark:bg-black dark:bg-opacity-50 bg-opacity-75 backdrop-blur-2xl
        '
      >
        <div>
          <label htmlFor='firmanavn' className='sr-only'>
            Firmanavn
          </label>
          <input
            type='text'
            name='firmanavn'
            className='w-full rounded-lg border-gray-200 bg-white dark:bg-black  p-4 pe-12 text-sm shadow-sm'
            placeholder='Indtast Firmanavn '
          />
        </div>
        <div>
          <label htmlFor='adresse' className='sr-only'>
            Adresse
          </label>
          <input
            type='text'
            name='adresse'
            required
            className='w-full rounded-lg border-gray-200 bg-white dark:bg-black  p-4 pe-12 text-sm shadow-sm'
            placeholder='Indtast Adresse'
          />
        </div>
        <div>
          <label htmlFor='telefonnummer' className='sr-only'>
            Telefonnummer
          </label>
          <input
            type='tel'
            name='telefonnummer'
            required
            className='w-full rounded-lg border-gray-200 bg-white dark:bg-black  p-4 pe-12 text-sm shadow-sm'
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
            required
            className='w-full rounded-lg border-gray-200  bg-white dark:bg-black  p-4 pe-12 text-sm shadow-sm'
            placeholder='Indtast Postnummer o By'
          />
        </div>
        <div>
          <label htmlFor='kontaktperson' className='sr-only'>
            Kontaktperson
          </label>
          <input
            type='text'
            name='kontaktperson'
            required
            className='w-full rounded-lg border-gray-200  bg-white dark:bg-black  p-4 pe-12 text-sm shadow-sm'
            placeholder='Indtast Kontaktperson'
          />
        </div>
        <div>
          <label htmlFor='email' className='sr-only'>
            E-mail
          </label>
          <input
            type='email'
            name='email'
            required
            className='w-full rounded-lg border-gray-200 bg-white dark:bg-black  p-4 pe-12 text-sm shadow-sm'
            placeholder='Indtast e-mail'
          />
        </div>

        <div>
          <label htmlFor='besked' className='sr-only'>
            Besked
          </label>
          <textarea
            rows={5}
            id='besked'
            name='besked'
            required
            className='w-full rounded-lg border-gray-200 bg-white dark:bg-black  p-4 pe-12 text-sm shadow-sm'
            placeholder='Beskrivelse af firmaets interesser i Afrika'
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
