import type {
  ActionFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { QueryResponseInitial } from '@sanity/react-loader';

import { Event } from '~/components/Event';
import type { Loader as RootLoader } from '~/root';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '~/routes/resource.og';
import { writeClient } from '~/sanity/client.server';
import { useQuery } from '~/sanity/loader';
import { loadQuery } from '~/sanity/loader.server';
import { EVENT_QUERY } from '~/sanity/queries';
import { BasicContactDocument, basicContactZ } from '~/types/basicContact';
import type { EventDocument } from '~/types/event';
import { eventZ } from '~/types/event';

export const meta: MetaFunction<
  typeof loader,
  {
    root: RootLoader;
  }
> = ({ data, params, matches }) => {
  const rootData = matches.find((match) => match.id === `root`)?.data;
  const slug = params.slug; // Example of accessing the slug parameter

  const home = rootData ? rootData.initial.data : null;
  const title = [data?.initial?.data?.title, home?.siteTitle]
    .filter(Boolean)
    .join(' | ');
  const ogImageUrl = data ? data.ogImageUrl : null;
  const dynamicUrl = `https://afrikaselskabet.dk/arrangementer/kommende-arrangementer/${
    slug || ''
  }`;

  return [
    { title },
    { name: 'description', content: data?.initial?.data?.extract },

    //  <!-- Facebook Meta Tags -->
    { property: 'og:title', content: title },
    { property: 'og:image:width', content: String(OG_IMAGE_WIDTH) },
    { property: 'og:image:height', content: String(OG_IMAGE_HEIGHT) },
    { property: 'og:image', content: ogImageUrl },
    { property: 'og:description', content: data?.initial?.data?.extract },
    { property: 'og:url', content: dynamicUrl },
    { property: 'og:site_name', content: 'Det Danske Afrika Selskab ' },
    { property: 'og:locale', content: 'da_DK' },
    { property: 'og:type', content: 'website' },

    // <!-- Twitter Meta Tags -->
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:title', content: title },
    { property: 'twitter:image', content: ogImageUrl },
    { property: 'twitter:url', content: dynamicUrl },
    { property: 'twitter:description', content: data?.initial?.data?.extract },
    { property: 'twitter:domain', content: 'https://afrikaselskabet.dk/' },
  ];
};

async function sendEmail({
  to,
  from,
  templateAlias,
  name,
  eventName,
  eventDate,
  eventLocation,
  email,

  guestNumber,
  member,
}: {
  to: string;
  from: string;
  email: string;

  eventLocation: string;
  templateAlias: string;
  name: string;
  eventName: string;
  eventDate: string;
  guestNumber: string;
  member: string;
}) {
  const serverToken = process.env.POSTMARK_SERVER_TOKEN;

  if (typeof serverToken !== 'string') {
    throw new Error(
      'Postmark server token is not set in environment variables.'
    );
  }

  const response = await fetch(
    'https://api.postmarkapp.com/email/withTemplate',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': serverToken,
      },
      /* body: JSON.stringify({
      From: from,
      To: to,
      Subject: subject,
      HtmlBody: htmlBody,
      TextBody: textBody,
    }),*/
      body: JSON.stringify({
        From: from,
        To: to,
        TemplateAlias: templateAlias,
        TemplateModel: {
          product_url: 'Det Danske Afrika Selskab',
          product_name: 'Det Danske Afrika Selskab Arrangementer',
          name: name,
          event_name: eventName,
          event_location: eventLocation,
          event_date: eventDate,
          company_name: 'Det Danske Afrika Selskab',
          sender_name: name,
          guest_name: name,
          guest_email: email,
          guest_no: guestNumber,
          member: member,
        },
      }),
    }
  );

  return response.json();
}

export const action: ActionFunction = async ({ request, params }) => {
  let formData = await request.formData();
  const initial = await loadQuery<EventDocument>(EVENT_QUERY, params).then(
    (res) => ({ ...res, data: res.data ? eventZ.parse(res.data) : null })
  );

  const date = new Date(initial?.data?.date || '').toLocaleDateString('da-DK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const emailParams = {
    navn: formData.get('navn')?.toString() || '',
    email: formData.get('email')?.toString() || '',
    besked: formData.get('besked')?.toString() || '',
    medlemskab: formData.get('medlemskab')?.toString() || '',
    guests: formData.get('guests')?.toString() || '',
  };
  // Send the email using the validated parameters
  try {
    //const emailResponse = await sendEmail(validatedParams, homeEmail);
    // console.log(emailResponse); // Log response for debugging
    await sendEmail({
      to: 'mail@afrikaselskabet.dk',
      from: 'mail@afrikaselskabet.dk',
      templateAlias: 'welcome-1',
      name: emailParams.navn,
      eventName: initial?.data?.title || '',
      eventDate: date,
      email: emailParams.email,
      eventLocation: initial?.data?.location || '',
      guestNumber: emailParams.guests || '0',
      member: emailParams.medlemskab,
    });

    await sendEmail({
      to: emailParams.email,
      from: 'mail@afrikaselskabet.dk',
      templateAlias: 'welcome',
      name: emailParams.navn,
      email: emailParams.email,
      eventName: initial?.data?.title || '',
      eventDate: date,
      eventLocation: initial?.data?.location || '',
      guestNumber: emailParams.guests || '0',
      member: emailParams.medlemskab,
    });

    // Return a JSON response to the client
    return redirect('../success');
    //return json({ success: true, message: 'Tak for din besked!' });
  } catch (error) {
    console.error('Email sending error:', error);
    return json({
      success: false,
      message: 'Der opstod en fejl under afsendelsen af din besked.',
    });
  }
};

// Load the `record` document with this slug
export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  // Params from the loader uses the filename
  // $slug.tsx has the params { slug: 'hello-world' }
  const initial = await loadQuery<EventDocument>(EVENT_QUERY, params).then(
    (res) => ({ ...res, data: res.data ? eventZ.parse(res.data) : null })
  );

  if (!initial.data) {
    throw new Response('Not found', { status: 404 });
  }

  // Create social share image url
  const { origin } = new URL(request.url);
  const ogImageUrl = `${origin}/resource/og?id=${initial.data._id}`;

  return json({
    initial,
    query: EVENT_QUERY,
    params,
    ogImageUrl,
  });
};

export default function EventPage() {
  const { initial, query, params } = useLoaderData<typeof loader>();
  const castedInitial: QueryResponseInitial<typeof initial.data> =
    initial as QueryResponseInitial<typeof initial.data>;
  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    initial: castedInitial,
  });

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return <Event data={data} />;
}
