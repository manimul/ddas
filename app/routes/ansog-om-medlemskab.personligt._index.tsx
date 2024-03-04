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
//import { Form } from '~/components/Form';

/*const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  apiVersion: process.env.SANITY_STUDIO_API_VERSION,
  useCdn: false,
});*/
//const { personalMembershipEmail } = useOutletContext<MembershipDocument>();

async function sendEmail(params: MedlemFormDocument, homeEmail: string) {
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
      HtmlBody: `<html><body><p>Navn: ${navn}</p><p>Email: ${email}</p><p>Besked: ${besked}</p><p>Adresse: ${adresse}</p><p>Postnummber och By: ${postnummer} </p><p>Fødselsår: ${fodselsar} </p><p>Telefon: ${telefonnummer} </p><p>General Consent: ${generalConsent}</p><p>Email Consent: ${mailConsent}</p></body></html>`,
      TextBody: `Navn: ${navn}\nEmail: ${email}\nBesked: ${besked} \nAdresse: ${adresse} \nPostnummer och By: ${postnummer} \nFødselsår: ${fodselsar} \nTelefon: ${telefonnummer} \nGeneral Consent: ${generalConsent}\nEmail Consent: ${mailConsent}`,
    }),
  });
  return response.json();
}

export async function createImageAsset(
  image: File | Blob
): Promise<SanityDocument> {
  const stream = Buffer.from(await image.arrayBuffer());
  console.log('stream', stream);
  const imageDoc = await writeClient.assets.upload('image', stream, {
    filename: image instanceof File ? image.name : '',
    contentType: image.type,
  });
  //const imageUrl = `https://cdn.sanity.io/images/${
  // writeClient.config().projectId
  //}/${writeClient.config().dataset}/${imageDoc._id}.${imageDoc.extension}`;
  // console.log('Uploaded image URL:', imageUrl);

  let assetId = imageDoc._id.replace(/^image-/, ''); // Remove "image-" prefix
  const extensionMatch = assetId.match(/-(\w+)$/);
  let extension = '';
  if (extensionMatch) {
    extension = extensionMatch[1]; // Capture the actual extension without the "-"
    // Remove the extension from the assetIdBase
    assetId = assetId.replace(/-\w+$/, '');
  }

  // However, based on the expected URL, we shouldn't manually add the extension, as it seems to be already included in the _id for image assets. Let's adjust:
  const correctImageUrl = `https://cdn.sanity.io/images/${
    writeClient.config().projectId
  }/${writeClient.config().dataset}/${assetId}.${extension}`;

  console.log('Uploaded image URL:', correctImageUrl);

  return imageDoc;
}

export const action: ActionFunction = async ({ request }) => {
  /*const uploadHandler = unstable_createFileUploadHandler({
    maxPartSize: 5_000_000, // 5 MB limit for file size

    //file: ({ filename }) => `uploads/${filename}`, // Define the directory and naming convention for uploaded files
    file: ({ filename }) => {
      console.log(`Uploading file: ${filename}`);
      return `uploads/${filename}`; // Ensure this path is writable and correct
    },
    // Add other configurations as needed
  });*/

  /*const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );*/
  // Log all form fields and files
  let formData = await request.formData();

  const { token, projectId } = writeClient.config();
  if (!token) {
    throw new Response(
      `Setup "SANITY_WRITE_TOKEN" with a token with "Editor" permissions to your environment variables. Create one at https://sanity.io/manage/project/${projectId}/api#tokens`,
      { status: 401 }
    );
  }

  // Create a file with "foo" as its content

  /*
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  * */

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
  console.log('emailParams', emailParams);
  const validatedParams = medlemFormZ.parse(emailParams);
  const homeEmail =
    formData.get('homeEmail')?.toString() || 'mail@afrikaselskabet.dk';
  console.log('homeEmail', homeEmail);

  // Handling the uploaded file
  const imageFile = formData.get('image');

  if (imageFile instanceof File) {
    createImageAsset(imageFile);
    //console.log(`File Name: ${imageFile.name}`);
    //console.log(`File Type: ${imageFile.type}`);
    //console.log(`File Size: ${imageFile.size} bytes`);
  }

  /*

  if (imageFile instanceof File) {
    try {
      const document = await writeClient.assets.upload('image', imageFile, {
        contentType: imageFile.type,
        filename: imageFile.name,
      });
      console.log('The image was uploaded!', document);
    } catch (error) {
      console.error('Upload failed1:', error as any);
    }
  }

  //Upload it
  if (imageFile instanceof File) {
    writeClient.assets
      .upload('image', imageFile, {
        contentType: imageFile.type,
        filename: imageFile.name,
      })
      .then((document) => {
        console.log('The image was uploaded!', document);
      })
      .catch((error) => {
        console.error('Upload failed2:', error.message);
      });
  }
*/
  // Here you can add logic to move the file to a permanent storage location,
  // or integrate with cloud storage, etc.

  try {
    const emailResponse = await sendEmail(validatedParams, homeEmail);
    // return json({ success: true, message: 'Tak for din besked!' });
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

  return (
    <Form
      //className=' col-span-4 -mt-32  pt-32  pr-32 -mr-32 h-min bg-fixed  '
      method='post'
      encType='multipart/form-data'
    >
      <fieldset
        className=' space-y-4 shadow-2xl md:-ml-12 p-2 md:p-6 bg-[#f4f4f5] dark:bg-black dark:bg-opacity-50 bg-opacity-75 backdrop-blur-2xl
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
            <option
              selected
              value='Vælg dit fødselsår'
              disabled
              className='opacity-50'
            >
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
