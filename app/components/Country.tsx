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
import { MemberStub } from '~/types/member';

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
    <div className='flex flex-row flex-wrap  box-border'>
      <Link className=' inline-flex space-x-2' relative='path' to='../'>
        <MoveLeft />
        <span>Lande i Afrika</span>
      </Link>
      <h1 className=' py-4 basis-full text-bold pt-4 text-xl tracking-tighter transition-colors duration-100 ease-in-out  lg:text-4xl'>
        {title}
      </h1>
      <div className='basis-1/4 space-y-2 '>
        <MemberImage image={image} />
        <h2 className='text-large leading-loose text-[#FFB102]'>
          {title} relaterede links
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

        {props.membersData && props.membersData.length > 0 ? (
          <>
            <h2 className='text-large  col-span-3 leading-loose text-[#FFB102] '>
              Medlemmer med interesse/ekspertise i {title}
            </h2>
            <ul className='grid grid-cols-3 gap-3 text-center'>
              {props.membersData.map((member) => (
                <li key={member._id}>
                  <Link
                    relative='route'
                    to={'../../../medlemshjornet/medlemmer/' + member.slug}
                  >
                    <MemberImage
                      className='rounded-[100px] pb-2'
                      image={member.image}
                    />
                    <h3 className='text-xs'> {member.name}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className=' p-4 flex flex-col bg-black text-white border-green-500 border  '>
            <p className=' text-xl my-2'>
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
      <div className='basis-1/2 px-6 flex flex-col space-y-4 '>
        {content && content?.length > 0 ? (
          <SanityContent value={content} />
        ) : null}
      </div>
      <div className='basis-1/4 px-6 flex flex-col space-y-4  border-b-gray-100 sticky top-0  '>
        <div className='space-y-2'>
          {cities && cities.length > 0 ? (
            <>
              <h2 className='text-large pb-2 leading-loose text-[#FFB102]'>
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
                <h2 className='text-large pb-2 leading-loose text-[#FFB102]'>
                  {title} Arrangementer
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
                <h2 className='text-large pb-2 leading-loose text-[#FFB102]'>
                  {title} Nyheder
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
