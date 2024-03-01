import { Form, useMatches, useOutletContext } from '@remix-run/react';
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

async function sendEmail(params: MedlemFormDocument, homeEmail: string) {
  const {
    firmanavn,
    adresse,
    telefonnummer,
    postnummer,
    kontaktperson,
    email,
    besked,
    mailConsent,
    generalConsent,
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
      From: homeEmail,
      To: homeEmail,

      Subject: 'Ny ansøgning om ngo medlemskab',
      HtmlBody: `<html><body><p>firmanavn: ${firmanavn}</p><p>Email: ${email}</p><p>Besked: ${besked}</p><p>Adresse: ${adresse}</p><p>Postnummber och By: ${postnummer} </p><p>Kontaktperson: ${kontaktperson} </p><p>Telefon: ${telefonnummer} </p><p>General Consent: ${generalConsent}</p><p>Email Consent: ${mailConsent}</p></body></html>`,
      TextBody: `Firmanavn: ${firmanavn}\nEmail: ${email}\nBesked: ${besked} \nAdress: ${adresse} \nPostnummer och By: ${postnummer}  \nTelefon: ${telefonnummer} \nGeneral Consent: ${generalConsent}\nEmail Consent: ${mailConsent}`,
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
    generalConsent: formData.get('generalConsent') === 'on',
    mailConsent: formData.get('mailConsent') === 'on',
  };

  const validatedParams = medlemFormZ.parse(emailParams);
  const homeEmail =
    formData.get('homeEmail')?.toString() || 'mail@afrikaselskabet.dk';
  console.log('homeEmail', homeEmail);

  try {
    const emailResponse = await sendEmail(validatedParams, homeEmail);
    // console.log(emailResponse);
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

export default function NgoIndex() {
  let actionData = useActionData<ActionData>();
  const ngoMembershipEmail = useOutletContext<string>();

  const matches = useMatches();
  // Find the match object for the root. You might need to adjust the condition based on your route structure.
  const rootMatch = matches.find((match) => match.id === 'root');
  const rootData = rootMatch?.data;

  // Now rootData contains the data returned by the root loader, you can access `home` or any other data loaded there.
  const home = (rootData as { initial?: { data: any } })?.initial?.data;
  const emailToSend = ngoMembershipEmail || home.email;

  return (
    <Form method='post'>
      <fieldset
        className=' space-y-4 shadow-2xl md:-ml-12 p-2 md:p-6 bg-[#f4f4f5] dark:bg-black dark:bg-opacity-50 bg-opacity-75 backdrop-blur-2xl
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
          <input type='hidden' name='homeEmail' value={emailToSend} />
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
        <div className='flex flex-row space-x-2 items-center'>
          <input
            type='checkbox'
            id='generalConsent'
            name='generalConsent'
            required
            className='w-4 h-4 text-gray-700 border-gray-300 focus:ring-gray-500'
          />
          <label htmlFor='generalConsent' className=''>
            Jeg giver mit samtykke til lagring af mine personlige data{' '}
          </label>
        </div>
        <div className='flex flex-row space-x-2 items-center'>
          <input
            type='checkbox'
            id='mailConsent'
            name='mailConsent'
            className='w-4 h-4 text-gray-700 border-gray-300 focus:ring-gray-500'
          />
          <label htmlFor='mailConsent' className=''>
            Jeg giver mit samtykke til at blive tilføjet Det Danske Afrika
            Selskab postliste
          </label>
        </div>
        <button
          type='submit'
          className=' uppercase text-sm  rounded-md p-4 tracking-wide opacity-75    bg-gradient-to-br hover:bg-gradient-to-tr  from-[#FD9F1C] to-[#FF5107] font-bold text-black hover:opacity-100 hover:rounded-[30px]  duration-500     '
        >
          Send Besked
        </button>
      </fieldset>
      {actionData?.message && <p>{actionData.message}</p>}
    </Form>
  );
}
