import {
  ActionFunctionArgs,
  ActionFunction,
  json,
  MetaFunction,
} from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';

import type { Loader as RootLoader, loader } from '~/root';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/resource.og';

import { z } from 'zod';
import { BasicContactDocument, basicContactZ } from '~/types/basicContact';

export const meta: MetaFunction<typeof loader, { root: RootLoader }> = ({
  matches,
}) => {
  const rootData = matches.find((match) => match.id === `root`)?.data;
  const home = rootData ? rootData.initial.data : null;
  const title = ['Kontakt', home?.siteTitle].filter(Boolean).join(' | ');

  return [
    { title },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:title', content: title },
    { propery: 'og:locale', content: 'da_DK' },

    {
      property: 'og:description',
      content:
        'Har du spørgsmål, eller ønsker du yderligere information om Det Danske Afrika Selskab? Udfyld venligst kontaktformularen på denne side, så vender vi tilbage til dig hurtigst muligt. Vi ser frem til at høre fra dig! ',
    },
    {
      property: 'description',
      content:
        'Har du spørgsmål, eller ønsker du yderligere information om Det Danske Afrika Selskab? Udfyld venligst kontaktformularen på denne side, så vender vi tilbage til dig hurtigst muligt. Vi ser frem til at høre fra dig! ',
    },
    { property: 'og:title', content: title },
    {
      property: 'og:image',
      content:
        'https://cdn.midjourney.com/7419c635-9c49-4d01-9264-7c961219c070/0_3.webp',
    },
    { property: 'og:image:width', content: String(OG_IMAGE_WIDTH) },
    { property: 'og:image:height', content: String(OG_IMAGE_HEIGHT) },
  ];
};

// Function to send an email using Postmark
// This function is asynchronous and returns a Promise
async function sendEmail(params: BasicContactDocument) {
  const { navn, email, besked } = params;
  const serverToken = process.env.POSTMARK_SERVER_TOKEN;

  // Check if the server token is not undefined
  if (typeof serverToken !== 'string') {
    throw new Error(
      'Postmark server token is not set in environment variables.'
    );
  }
  // Send an email using the Postmark API
  const response = await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': serverToken,
    },
    // Convert the email parameters to a JSON string
    body: JSON.stringify({
      From: 'mark@bambwa.com', // Replace with your sender signature
      To: 'mark@bambwa.com', // Replace with your target email address
      Subject: 'New contact form submission',
      HtmlBody: `<html><body><p>Name: ${navn}</p><p>Email: ${email}</p><p>Message: ${besked}</p></body></html>`,
      TextBody: `Navn: ${navn}\nEmail: ${email}\nBesked: ${besked}`,
    }),
  });
  // Return the response as JSON
  return response.json();
}

// Define the action function
export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();

  // Create an object from the form data
  const emailParams: BasicContactDocument = {
    navn: formData.get('navn')?.toString() || '',
    email: formData.get('email')?.toString() || '',
    besked: formData.get('besked')?.toString() || '',
  };

  // Validate the form data
  const validatedParams = basicContactZ.parse(emailParams);

  // Send the email using the validated parameters
  try {
    const emailResponse = await sendEmail(validatedParams);
    console.log(emailResponse); // Log response for debugging
    // Return a JSON response to the client
    return json({ success: true, message: 'Tak for din besked!' });
  } catch (error) {
    console.error('Email sending error:', error);
    return json({
      success: false,
      message: 'Der opstod en fejl under afsendelsen af din besked.',
    });
  }
};

// Define the action data type
interface ActionData {
  message: string;
}

export default function Kontakt() {
  let actionData = useActionData<ActionData>();

  return (
    <section className=''>
      <div className=' grid  py-4  md:py-8 mx-auto md:gap-8 xl:gap-0 lg:py-10 lg:grid-cols-12'>
        <div className=' lg:mt-0 order-1  lg:col-span-5 lg:flex rounded-2xl pb-4'>
          <img
            //src='https://cdn.midjourney.com/7f1b20ca-c243-4a2c-8feb-998de0488f14/0_2.webp'
            src='https://cdn.midjourney.com/7419c635-9c49-4d01-9264-7c961219c070/0_3.webp'
            alt='mockup'
            className='rounded-lg'
          />
        </div>
        <div className='  order-2 place-self-center lg:col-span-7'>
          <h1 className='max-w-2xl mb-4 md:pr-6 text-4xl  tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white'>
            Kontakt Det Danske Afrika Selskab
          </h1>
          <p className='max-w-2xl  md:pr-6 mb-4 font-light text-gray-800 lg:mb-6 md:text-lg lg:text-xl dark:text-gray-400'>
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
                  name='navn'
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
                <label htmlFor='besked' className='sr-only'>
                  Besked
                </label>
                <textarea
                  rows={5}
                  id='besked'
                  name='besked'
                  className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                  placeholder='Indtast besked'
                />
              </div>

              <button
                type='submit'
                className=' uppercase text-sm font-bold rounded-md p-4 tracking-wide opacity-75   bg-gradient-to-br hover:bg-gradient-to-tr  from-[#FD9F1C] to-[#FF5107] text-black hover:opacity-100 hover:rounded-[30px]  duration-500     '
              >
                Send Besked
              </button>
            </fieldset>
            {actionData?.message && <p>{actionData.message}</p>}
          </Form>
        </div>
      </div>
    </section>
  );
}
