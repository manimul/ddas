import { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node'; // Import json if not already imported
// Import your event fetching function or queries
import { loadQuery } from '~/sanity/loader.server';
import { EVENTS_QUERY } from '~/sanity/queries';
import { EventStub, eventStubsZ } from '~/types/event';

export type RssEntry = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  author?: string;
  guid?: string;
};

export function generateRss({
  description,
  entries,
  link,
  title,
}: {
  title: string;
  description: string;
  link: string;
  entries: RssEntry[];
}): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${title}</title>
      <description>${description}</description>
      <link>${link}</link>
      <language>da-dk</language>
      <ttl>60</ttl>
      <atom:link href="https://afrikaselskabet.dk/arrangementer/rss.xml" rel="self" type="application/rss+xml" />
      ${entries
        .map(
          (entry) => `
        <item>
          <title><![CDATA[${entry.title}]]></title>
          <description><![CDATA[${entry.description}]]></description>
          <pubDate>${entry.pubDate}</pubDate>
          <link>${entry.link}</link>
          ${entry.guid ? `<guid isPermaLink="false">${entry.guid}</guid>` : ''}
        </item>`
        )
        .join('')}
    </channel>
  </rss>`;
}

export const loader: LoaderFunction = async () => {
  // Adjust this to fetch your events data instead
  const currentDate = new Date().toISOString();
  const isFuture = true; // Assuming you want future events for the RSS feed

  const eventsResponse = await loadQuery<EventStub[]>(EVENTS_QUERY, {
    currentDate: currentDate,
    isFuture: isFuture,
  }).then((res) => ({
    ...res,
    data: res.data ? eventStubsZ.parse(res.data) : null,
  }));

  if (!eventsResponse.data) {
    throw new Response('Not found', { status: 404 });
  }

  const events = eventsResponse.data; // Assuming this is your array of events

  const feed = generateRss({
    title: 'Kommende Arrangementer med Det Danske Afrika Selskab',
    description: 'Liste over kommende arrangementer.',
    link: 'https://afrikaselskabet.dk/arrangementer/kommende-arrangementer/',
    entries: events.map((event) => ({
      title: event.title || 'No Title', // Provide a default value if event.title is null
      description: event.extract || 'No Description', // Provide a default value if event.extract is null
      pubDate: event.date ? new Date(event.date).toUTCString() : '', // Adjust 'startDate' based on your EventStub
      link: `https://afrikaselskabet.dk/arrangementer/kommende-arrangementer/${event.slug}`, // Adjust URL structure as needed
      guid: `https://afrikaselskabet.dk/arrangementer/kommende-arrangementer/${event.slug}`, // This is often the same as link
    })),
  });

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=2419200',
    },
  });
};
