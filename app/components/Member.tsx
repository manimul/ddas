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
      <div className='grid grid-flow-row grid-cols-4 gap-4'>
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
              <h2 className='text-base pb-2  text-gray-500  '>
                Lande af interesse/ekspertise
              </h2>
              {africanTags.map(
                (tag) =>
                  tag.region && tag.region[0]?.slug ? ( // Check if region exists and has at least one item
                    <Link
                      key={tag._id}
                      to={`../../../lande-i-afrika/${tag.region[0].slug}/${tag.slug}`}
                      className='text-black text-sm font-medium me-2 px-2.5 py-0.5 rounded-full bg-[#FFB102]'
                    >
                      {tag.title}
                    </Link>
                  ) : null // Render null or some fallback if region is not as expected
              )}
            </div>
          )}
        </div>
      </div>{' '}
    </div>
  );
}
