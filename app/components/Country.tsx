import { CountryDocument } from '~/types/country';
import { CountryStub } from '~/types/country';
import { SanityContent } from '~/components/SanityContent';
import { MemberImage } from '~/components/MemberImage';
import {
  CalendarCheck2,
  Link2,
  LocateIcon,
  MapPin,
  Move,
  MoveLeft,
  Newspaper,
  Users,
} from 'lucide-react';
import { MoveRight } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import { Link } from '@remix-run/react';
import { Countries } from '~/components/Countries';
import { NewsStub } from '~/types/news';
import { EventStub } from '~/types/event';
import { MemberStub } from '~/types/member';
import { CityImage } from '~/components/CityImage';
import { NewsImage } from '~/components/NewsImage';

type CountryProps = {
  data: CountryDocument;
  membersData: MemberStub[];
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
    <div className='flex flex-col md:flex-row flex-wrap  box-border space-y-4'>
      <Link className=' inline-flex space-x-2' relative='path' to='../'>
        <MoveLeft />
        <span>Lande i Afrika</span>
      </Link>
      <h1 className=' md:py-4 md:basis-full text-bold pt-4 text-2xl lg:text-4xl tracking-tighter transition-colors duration-100 ease-in-out  '>
        {title}
      </h1>
      <div className=' md:basis-1/4 space-y-4 '>
        <MemberImage className='rounded-[0px] ' image={image} />

        <div className=' space-y-4 bg-white dark:bg-black h-min md:sticky top-8 border border-gray-100 dark:border-gray-800 rounded-md p-4   md:-ml-6 md:p-4'>
          <div>
            <h2 className='text-xs items-center  md:text-sm uppercase tracking-widest pb-2 inline-flex  text-gray-500 space-x-2  '>
              <Link2 />
              {` `} <span>Relaterede links</span>
            </h2>
            <ul>
              {landeprofil && (
                <li>
                  {' '}
                  <Link
                    className=' inline-flex space-x-2 text-sm  md:text-base '
                    to={landeprofil}
                  >
                    <ExternalLink /> Landeprofil
                  </Link>
                </li>
              )}
              {reglerne && (
                <li>
                  <Link
                    className=' inline-flex space-x-2 text-sm  md:text-base'
                    to={reglerne}
                  >
                    <ExternalLink /> Reglerne
                  </Link>
                </li>
              )}
              {opleve && (
                <li>
                  <Link
                    className=' inline-flex space-x-2 text-sm  md:text-base'
                    to={opleve}
                  >
                    <ExternalLink /> Opleve
                  </Link>
                </li>
              )}
              {introduktion && (
                <li>
                  {' '}
                  <Link
                    className=' inline-flex space-x-2 text-sm  md:text-base'
                    to={introduktion}
                  >
                    <ExternalLink /> Introduktion
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {props.membersData && props.membersData.length > 0 ? (
            <div>
              <hr className='pb-4 opacity-50'></hr>

              <h2 className='text-xs items-center  md:text-sm uppercase tracking-widest pb-2 inline-flex space-x-2  text-gray-500  '>
                <Users />
                <span>Medlemmer med ekspertise </span>
              </h2>
              <ul className='grid grid-cols-3 gap-3 text-center'>
                {props.membersData.map((member) => (
                  <li key={member._id}>
                    <Link
                      relative='route'
                      className='pointer'
                      to={'../../../medlemshjornet/medlemmer/' + member.slug}
                    >
                      <MemberImage
                        className='rounded-[20px] '
                        image={member.image}
                      />
                      <h3 className='text-xs capitalize'>
                        {' '}
                        {member.name?.toLowerCase()}
                      </h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className=' p-4 flex flex-col bg-black text-white border-green-500 border  '>
              <p className=' md:text-xl my-2'>
                Det ser ud til, at ingen af vores medlemmer er eksperter på{' '}
                {title}. Hvis du er interesseret eller har ekspertise inden for{' '}
                {title}, hvorfor så ikke blive medlem?
              </p>
              <Link
                to='../../../ansog-om-medlemskab/personligt'
                relative='route'
                className='inline-flex uppercase text-sm   rounded-md p-4 tracking-wide opacity-75    bg-white text-black hover:opacity-100 hover:rounded-[30px]  duration-500     '
              >
                Bliv Personligt medlem
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className='md:basis-1/2 md:px-6 flex flex-col space-y-4 '>
        {content && content?.length > 0 ? (
          <SanityContent value={content} />
        ) : null}
      </div>

      {((cities && cities.length > 0) ||
        (props.eventsData && props.eventsData.length > 0) ||
        (props.newsData && props.newsData.length > 0)) && (
        <div className='md:basis-1/4  flex flex-col space-y-4 bg-white dark:bg-black py-4 border border-gray-100 dark:border-gray-800 rounded-md h-min md:sticky top-8     p-4   '>
          {cities && cities.length > 0 ? (
            <div>
              <h2 className='text-xs items-center  md:text-sm uppercase tracking-widest pb-2 inline-flex space-x-2   text-gray-500  '>
                <MapPin />
                <span>Cities of {title}</span>
              </h2>
              <ul className=''>
                {cities.map((city) => (
                  <li
                    className='border-gray-100 border p-1 group'
                    key={city._id}
                  >
                    <Link
                      className='flex flex-row items-center space-x-2'
                      to={city.slug}
                    >
                      <div className='w-1/4'>
                        <CityImage
                          className='rounded-none'
                          image={city.image}
                          nocredit
                        />
                      </div>

                      <span className='pl-2 group-hover:translate-x-2 duration-200'>
                        {city.title}{' '}
                        <MoveRight className='hidden group-hover:inline-flex space-x-2' />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div>
            {' '}
            {props.eventsData && props.eventsData.length > 0 ? (
              <>
                <hr className='pb-4 opacity-50'></hr>
                <h2 className='text-xs items-center  md:text-sm uppercase tracking-widest  pb-2 inline-flex space-x-2  text-gray-500  '>
                  <CalendarCheck2 />
                  <span> {title} Arrangementer</span>
                </h2>
                <ul className='space-y-2'>
                  {props.eventsData.map((event) => (
                    <li
                      className='opacity-75 hover:opacity-100  group hover:underline duration-100 pointer '
                      key={event._id}
                    >
                      <Link
                        className='flex flex-row justify-between'
                        to={
                          '../../../arrangementer/kommende-arrangementer/' +
                          event.slug
                        }
                      >
                        {event.date && (
                          <span className='text-left'>
                            {new Date(event.date).toLocaleDateString('da-DK', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        )}
                        <span className='pl-4 group-hover:text-orange-500 group-hover:translate-x-2 duration-200'>
                          {event.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
          <div>
            {props.newsData && props.newsData.length > 0 ? (
              <>
                <hr className='pb-4 opacity-50'></hr>
                <h2 className='text-xs items-center  md:text-sm uppercase tracking-widest pb-2 inline-flex space-x-2   text-gray-500  '>
                  <Newspaper /> <span>{title} Nyheder</span>
                </h2>
                <ul className='space-y-4 '>
                  {props.newsData.map((news) => (
                    <li className='group' key={news._id}>
                      <Link to={'../../../nyheder/' + news.slug}>
                        <NewsImage image={news.image} />

                        <span className='opacity-75 group-hover:underline  group-hover:opacity-100'>
                          {' '}
                          {news.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>{' '}
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
