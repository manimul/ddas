import { MemberDocument } from '~/types/member';
import { SanityContent } from '~/components/SanityContent';
import { MemberImage } from '~/components/MemberImage';
import { Link } from '@remix-run/react';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

import { MoveLeft } from 'lucide-react';

type MemberProps = {
  data: MemberDocument;
};

export function Member(props: MemberProps) {
  const {
    _id,
    slug,
    title,
    facebook,
    linkedin,
    twitter,
    name,
    image,
    bio,
    africanTags,
  } = props.data;
  return (
    <div>
      <Link className=' inline-flex space-x-2' relative='path' to='../'>
        <MoveLeft />
        <span> Medlemmer</span>
      </Link>
      <div className='grid grid-flow-row grid-cols-4 gap-3'>
        <div className='col-span-1'>
          <MemberImage image={image} />
        </div>
        <div className='col-span-3 space-y-4'>
          <h1 className='text-2xl'>{name}</h1>{' '}
          <span className=' text-gray-400 font-normal uppercase tracking-widest mb-2 text-xs'>
            {title}
          </span>
          <div className='flex-row flex space-x-2'>
            {linkedin && (
              <Link to={linkedin || ''} className=''>
                <Linkedin />
              </Link>
            )}

            {twitter && (
              <Link to={twitter || ''} className=''>
                <Twitter />
              </Link>
            )}

            {facebook && (
              <Link to={facebook || ''} className=''>
                <Facebook />
              </Link>
            )}
          </div>
          <p className='text-base leading-relaxed text-gray-500 font-normal'>
            {bio && bio?.length > 0 ? <SanityContent value={bio} /> : null}
          </p>
          {africanTags && (
            <div className='flex-col'>
              <h2 className='uppercase opacity-50 tracking-widest text-xs '>
                Lande af interesse/ekspertise
              </h2>
              {africanTags.map((tag) => (
                <Link
                  key={tag._id}
                  to={`../../../lande-i-afrika/${tag.region[0].slug}/${tag.slug}`}
                  className='bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300'
                >
                  {tag.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>{' '}
    </div>
  );
}
