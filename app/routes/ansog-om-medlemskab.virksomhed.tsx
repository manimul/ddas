import { Form, Outlet } from '@remix-run/react';
import { ActionFunctionArgs, ActionFunction, json } from '@remix-run/node';
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
      HtmlBody: `<html><body><p>Navn: ${firmanavn}</p><p>Email: ${email}</p><p>Besked: ${besked}</p><p>Adresse: ${adresse}</p><p>Postnummber och By: ${postnummer} </p><p>Kontaktperson: ${kontaktperson} </p><p>Telefon: ${telefonnummer} </p></body></html>`,
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
    return json({ success: true, message: 'Tak for din besked!' });
  } catch (error) {
    console.error('Email sending error:', error);
    return json({ success: false, message: 'Der skete en fejl' });
  }
};

interface ActionData {
  message: string;
}

export default function Virksomhed() {
  let actionData = useActionData<ActionData>();

  return (
    <div className='grid md:grid-cols-8 gap-6 '>
      <div className=' col-span-4 space-y-4 md:pr-12'>
        <div className='corporate-membership-page space-y-2'>
          <h1 className='text-lg text-orange-400'>Virksomhedsmedlem</h1>

          <h2 className='text-4xl [membership-title]'>
            Bliv virksomhedsmedlem af Det Danske Afrika Selskab i dag
          </h2>
          <p className='md:text-lg md:leading-8 text-gray-600 dark:text-gray-300'>
            Påbegynd jeres rejse med os i Det Danske Afrika Selskab ved at blive
            virksomhedsmedlem. Processen er enkel – udfyld blot og indsend
            formularen nedenfor. Sørg for at udfylde alle felter, og del de
            unikke erfaringer eller interesser, jeres firma har i Afrika. Jeres
            ansøgning vil blive gennemgået af vores bestyrelse, og I vil få
            besked, når den er godkendt.
          </p>
          <h3 className='text-2xl font-bold'>Hvorfor blive medlem?</h3>
          <p className='md:text-lg md:leading-8 text-gray-600 dark:text-gray-300'>
            At blive en del af vores selskab betyder, at jeres firma tilslutter
            sig et netværk af virksomheder og individer, der deler jeres passion
            for Afrika. Uanset om det er kulturen, menneskene, landskaberne
            eller specifikke forretningsmuligheder, der tiltrækker jer, er vi
            her for at udforske og vokse sammen.
          </p>
          <h3 className='text-2xl font-bold'>Møder og sammenkomster</h3>
          <p className='md:text-lg md:leading-8 text-gray-600 dark:text-gray-300'>
            Vi arrangerer møder og sammenkomster til meget rimelige priser,
            under de samme fordelagtige vilkår og priser som for vores
            individuelle medlemmer. Detaljer og omkostninger vil blive oplyst
            med hver eventinvitation, så I altid ved, hvad I kan forvente.
          </p>
          <h3 className='text-2xl font-bold'>Medlemsgebyr</h3>
          <p className='md:text-lg md:leading-8 text-gray-600 dark:text-gray-300'>
            Det årlige medlemsgebyr for virksomhedsmedlemmer er tilpasset
            således, at op til fire medarbejdere fra jeres firma kan deltage i
            hvert af selskabets arrangementer. Dette gebyr muliggør vores
            bestræbelser på at organisere arrangementer og initiativer, hvilket
            tillader os at fortsætte med at tilbyde stor værdi til vores
            fællesskab.
          </p>
          <p className='md:text-lg md:leading-8 text-gray-600 dark:text-gray-300'>
            Bliv medlem i dag og bliv en del af et selskab, der fejrer og lærer
            fra det diverse og rige tæppe, som er Afrika. Vi ser frem til at
            byde jer velkommen!
          </p>
        </div>

        <p className='text-2xl'>Det årlige medlemskab er 5000 kr.</p>
      </div>

      <div
        className=' col-span-4 -mt-32  pt-32  pr-32 -mr-32 h-min bg-fixed  '
        style={{
          backgroundImage:
            "url('https://cdn.midjourney.com/3aa676ab-27e9-4b9c-abcd-0e0ab8768ecb/0_0.webp')",
          width: 'auto',
          height: '100%',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
