import { CountryDocument } from '~/types/country';
import { CountryStub } from '~/types/country';
import { SanityContent } from '~/components/SanityContent';
import { MemberImage } from '~/components/MemberImage';
import { MoveLeft } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import { Link } from '@remix-run/react';
import { Countries } from '~/components/Countries';
import { NewsStub } from '~/types/news';

type CountryProps = {
  data: CountryDocument;
  newsData: NewsStub[];
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
        <h2>{title} Related Links</h2>
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
      <div className='basis-1/4 px-6 flex flex-col space-y-4 '>
        <div>
          {cities && cities.length > 0 ? (
            <>
              <h2>Cities of {title}</h2>
              {cities.map((city) => (
                <div key={city._key}>
                  <Link to={city.slug}>
                    <span className='absolute'>{city.title}</span>
                    <MemberImage image={city.image} />
                  </Link>
                </div>
              ))}
            </>
          ) : null}
        </div>
        <div>
          {' '}
          <h2> {title} Events</h2>
        </div>
        <div>
          <h2> {title} Related News</h2>
          <ul>
            {props.newsData && props.newsData.length > 0 ? (
              <>
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
