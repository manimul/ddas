import { CountryDocument } from '~/types/country';
import { CountryStub } from '~/types/country';
import { SanityContent } from '~/components/SanityContent';
import { MemberImage } from '~/components/MemberImage';
import { MoveLeft } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import { Link } from '@remix-run/react';
import { Countries } from '~/components/Countries';
import { NewsStub } from '~/types/news';
import { EventStub } from '~/types/event';

type CountryProps = {
  data: CountryDocument;
  newsData: NewsStub[];
  eventsData: EventStub[];
};

export function Country(props: CountryProps) {
  const {
    _id,
    title,
    slug,
    content,
    image,
    cities,
    reglerne,
    landeprofil,
    opleve,
    introduktion,
  } = props.data;

  return (
    <div className='flex flex-row flex-wrap  box-border'>
      <Link className=' inline-flex space-x-2' relative='path' to='../'>
        <MoveLeft />
        <span>Lande i Afrika</span>
      </Link>
      <h1 className=' py-4 basis-full text-bold pt-4 text-xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-4xl'>
        {title}
      </h1>
      <div className='basis-1/4 space-y-4 '>
        <MemberImage image={image} />
        <h2 className=' uppercase opacity-50 tracking-widest text-sm '>
          {title} Related Links
        </h2>
        <ul>
          {landeprofil && (
            <li>
              {' '}
              <Link className=' inline-flex space-x-2' to={landeprofil}>
                <ExternalLink /> Landeprofil
              </Link>
            </li>
          )}
          {reglerne && (
            <li>
              <Link className=' inline-flex space-x-2' to={reglerne}>
                <ExternalLink /> Reglerne
              </Link>
            </li>
          )}
          {opleve && (
            <li>
              <Link className=' inline-flex space-x-2' to={opleve}>
                <ExternalLink /> Opleve
              </Link>
            </li>
          )}
          {introduktion && (
            <li>
              {' '}
              <Link className=' inline-flex space-x-2' to={introduktion}>
                <ExternalLink /> Introduktion
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className='basis-1/2 px-6 flex flex-col space-y-4 '>
        {content && content?.length > 0 ? (
          <SanityContent value={content} />
        ) : null}
      </div>
      <div className='basis-1/4 px-6 flex flex-col space-y-4  border-b-gray-100 sticky top-0  '>
        <div className='space-y-2'>
          {cities && cities.length > 0 ? (
            <>
              <h2 className='uppercase opacity-50 tracking-widest text-sm '>
                Cities of {title}
              </h2>
              <ul className=''>
                {cities.map((city) => (
                  <li className='border-gray-100 border p-1' key={city._id}>
                    <Link
                      className='flex flex-row items-center space-x-2'
                      to={city.slug}
                    >
                      <div className='w-1/4'>
                        <MemberImage
                          className='rounded-none'
                          image={city.image}
                        />
                      </div>

                      <span className='pl-2'>{city.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
        <div>
          {' '}
          <ul>
            {props.eventsData && props.eventsData.length > 0 ? (
              <>
                <h2 className=' uppercase opacity-50 tracking-widest text-sm '>
                  {title} Events
                </h2>
                {props.eventsData.map((event) => (
                  <li key={event._id}>
                    <Link
                      to={
                        '../../../arrangementer/kommende-arrangementer/' +
                        event.slug
                      }
                    >
                      <MemberImage image={event.image} />

                      {event.title}
                    </Link>
                  </li>
                ))}
              </>
            ) : null}
          </ul>
        </div>
        <div>
          <ul>
            {props.newsData && props.newsData.length > 0 ? (
              <>
                <h2 className=' uppercase opacity-50 tracking-widest text-sm '>
                  {title} Related News
                </h2>
                {props.newsData.map((news) => (
                  <li key={news._id}>
                    <Link to={'../../../nyheder/' + news.slug}>
                      <MemberImage image={news.image} />

                      {news.title}
                    </Link>
                  </li>
                ))}
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
