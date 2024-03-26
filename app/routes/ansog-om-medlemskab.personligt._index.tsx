import { Form, Outlet, useMatches } from '@remix-run/react';
import { SanityDocument, createClient } from '@sanity/client';
import fs from 'fs';

import {
  ActionFunctionArgs,
  ActionFunction,
  json,
  redirect,
  unstable_parseMultipartFormData,
  unstable_createFileUploadHandler,
} from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { useOutletContext } from '@remix-run/react';
import { MembershipDocument } from '~/types/membership';

import { z } from 'zod';
import { writeClient } from '~/sanity/client.server';

import { medlemFormZ, MedlemFormDocument } from '~/types/medlemForm';

async function sendEmail(
  params: MedlemFormDocument,
  homeEmail: string,
  imageUrl: string
) {
  const {
    navn,
    adresse,
    telefonnummer,
    postnummer,
    email,
    fodselsar,
    besked,
    generalConsent,
    mailConsent,
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
      Subject: 'Ny ansøgning om personligt medlemskab',
      HtmlBody: `<html><body><p>Image: <img src="${imageUrl}" alt="Uploaded Image"/></p><p>Image Link: <a href="${imageUrl}">${imageUrl}</a> </p><p>Navn: ${navn}</p><p>Email: ${email}</p><p>Besked: ${besked}</p><p>Adresse: ${adresse}</p><p>Postnummber och By: ${postnummer} </p><p>Fødselsår: ${fodselsar} </p> </p> <p>Telefon: ${telefonnummer} </p><p>General Consent: ${generalConsent}</p><p>Email Consent: ${mailConsent}</p></body></html>`,
      TextBody: `Navn: ${navn}\nEmail: ${email}\nBesked: ${besked} \nAdresse: ${adresse} \nPostnummer och By: ${postnummer} \nFødselsår: ${fodselsar} \nTelefon: ${telefonnummer} \nGeneral Consent: ${generalConsent}\nEmail Consent: ${mailConsent}`,
    }),
  });
  //console.log('response', response);
  return response.json();
}

export async function createImageAsset(
  image: File | Blob
  //): Promise<SanityDocument> {
): Promise<string> {
  const stream = Buffer.from(await image.arrayBuffer());
  // console.log('stream', stream);
  const imageDoc = await writeClient.assets.upload('image', stream, {
    filename: image instanceof File ? image.name : '',
    contentType: image.type,
  });

  let assetId = imageDoc._id.replace(/^image-/, ''); // Remove "image-" prefix
  const extensionMatch = assetId.match(/-(\w+)$/);
  let extension = '';
  if (extensionMatch) {
    extension = extensionMatch[1];
    // Capture the actual extension without the "-"
    // Remove the extension from the assetIdBase
    assetId = assetId.replace(/-\w+$/, '');
  }

  const correctImageUrl = `https://cdn.sanity.io/images/${
    writeClient.config().projectId
  }/${writeClient.config().dataset}/${assetId}.${extension}`;

  console.log('Uploaded image URL:', correctImageUrl);
  //console.log('imageDoc', imageDoc);
  // return imageDoc;
  return correctImageUrl;
}

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();

  const { token, projectId } = writeClient.config();
  if (!token) {
    throw new Response(
      `Setup "SANITY_WRITE_TOKEN" with a token with "Editor" permissions to your environment variables. Create one at https://sanity.io/manage/project/${projectId}/api#tokens`,
      { status: 401 }
    );
  }

  const emailParams: MedlemFormDocument = {
    navn: formData.get('navn')?.toString() || '',
    adresse: formData.get('adresse')?.toString() || '',
    telefonnummer: Number(formData.get('telefonnummer')) || 0,
    postnummer: formData.get('postnummer')?.toString() || '',
    email: formData.get('email')?.toString() || '',
    fodselsar: Number(formData.get('fodselsar')) || 0,
    besked: formData.get('besked')?.toString() || '',
    generalConsent: formData.get('generalConsent') === 'on',
    mailConsent: formData.get('mailConsent') === 'on',
  };
  //console.log('emailParams', emailParams);
  const validatedParams = medlemFormZ.parse(emailParams);
  const homeEmail =
    formData.get('homeEmail')?.toString() || 'mail@afrikaselskabet.dk';

  // Handling the uploaded file
  const imageFile = formData.get('image');
  let imageUrl = ''; // Initialize variable to hold the image URL

  // Check if imageFile is an instance of File and has a size greater than 0
  if (imageFile instanceof File && imageFile.size > 0) {
    imageUrl = await createImageAsset(imageFile);
  } else {
    // If there's no file or the file is empty, you can optionally log this or handle it as needed
    console.log('No image file provided or file is empty');
  }

  try {
    const emailResponse = await sendEmail(validatedParams, homeEmail, imageUrl);
    return redirect('success');
  } catch (error) {
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
  const personalMembershipEmail = useOutletContext<string>();

  const matches = useMatches();
  // Find the match object for the root. You might need to adjust the condition based on your route structure.
  const rootMatch = matches.find((match) => match.id === 'root');
  const rootData = rootMatch?.data;

  // Now rootData contains the data returned by the root loader, you can access `home` or any other data loaded there.
  const home = (rootData as { initial?: { data: any } })?.initial?.data;
  const emailToSend = personalMembershipEmail || home.email;
  console.log('emailToSend', emailToSend);

  return (
    <Form
      //className=' col-span-4 -mt-32  pt-32  pr-32 -mr-32 h-min bg-fixed  '
      method='post'
      encType='multipart/form-data'
    >
      <fieldset
        className=' space-y-4 shadow-2xl md:-ml-12 p-2 md:p-6 bg-[#f4f4f5] dark:bg-black md:dark:bg-opacity-50 md:bg-opacity-75 md:backdrop-blur-2xl
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
          <input type='hidden' name='contextValue' />
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
          <input type='hidden' name='homeEmail' value={emailToSend} />
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
          <label
            htmlFor='image'
            className='block text-sm font-medium text-gray-700'
          >
            Upload Image
          </label>
          <input
            type='file'
            name='image'
            className='w-full rounded-lg border-gray-200 bg-white dark:bg-black p-4 pe-12 text-sm shadow-sm'
            accept='image/*' // This restricts the file input to accept only images.
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
            defaultValue='Vælg dit fødselsår'
            required
          >
            <option value='Vælg dit fødselsår' disabled className='opacity-50'>
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
          className=' uppercase text-sm  rounded-md p-4 tracking-wide opacity-75    bg-gradient-to-br hover:bg-gradient-to-tr  from-[#FD9F1C] to-[#FF5107] text-black hover:opacity-100 hover:rounded-[30px]  duration-500     '
        >
          Send Besked
        </button>
      </fieldset>
      {actionData?.message && <p>{actionData.message}</p>}
    </Form>
  );
}
