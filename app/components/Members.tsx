import { Link } from '@remix-run/react';
import { MemberImage } from '~/components/MemberImage';
import type { MemberStub } from '~/types/member';
import { SanityContent } from './SanityContent';
import { MemberCTA } from './MemberCTA';
import { Facebook, Linkedin, Twitter } from 'lucide-react';

type MembersProps = {
  members: MemberStub[];
};

export function Members(props: MembersProps) {
  const { members = [] } = props;
  return members.length > 0 ? (
    <>
      <ul className='grid grid-cols-1 lg:grid-cols-4 gap-3'>
        {members.map((member) => (
          <li
            key={member._id}
            className='w-full group  space-x-2  overflow-hidden flex flex-col md:flex-row hover:-translate-y-2 '
          >
            <div className='w-full md:w-2/5 '>
              <MemberImage image={member.image} className='rounded-full' />
            </div>
            <div className='w-full md:w-3/5 text-left  flex-col flex '>
              <h2 className='text-base text-gray-700 capitalize'>
                {member.name?.toLowerCase()}
              </h2>
              {member.africanTags && (
                <div className='flex flex-row space-x-2'></div>
              )}
              <span className=' text-gray-400 font-normal uppercase tracking-widest mb-2 text-xs'>
                {member.title}
              </span>
              <div className='flex-row flex space-x-2'>
                {member.linkedin && (
                  <Link to={member.linkedin || ''} className=''>
                    <Linkedin />
                  </Link>
                )}

                {member.twitter && (
                  <Link to={member.twitter || ''} className=''>
                    <Twitter />
                  </Link>
                )}

                {member.facebook && (
                  <Link to={member.facebook || ''} className=''>
                    <Facebook />
                  </Link>
                )}
              </div>

              <Link
                to={member.slug || ''}
                className='mt-auto group-hover:underline'
              >
                Læs mere
              </Link>
              {/* Add any additional elements or icons here */}
            </div>
          </li>
        ))}
      </ul>
      <MemberCTA />

      {/*
      <ul className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-12 lg:grid-cols-4'>
        {members.map((member) => (
          <li
            key={member._id}
            className='group relative flex flex-col space-y-2'
          >
            <div className='relative overflow-hidden transition-all duration-200 ease-in-out '>
              <div className='absolute z-0 h-48 w-[200%]  rounded-lg' />
              <MemberImage image={member.image} />
            </div>
            <div className='flex flex-col  '>
              <h2 className='capitalize'>{member.name?.toLowerCase()}</h2>
              <span className='uppercase text-xs  opacity-70'>
                {member.title}
              </span>
              <p className='text-sm line-clamp-4 	'>
                {member.bio && member.bio?.length > 0 ? (
                  <SanityContent value={member.bio} />
                ) : null}
              </p>
            </div>
          </li>
        ))}
      </ul>*/}
    </>
  ) : (
    <div className='prose prose-xl mx-auto bg-green-50 p-4'>
      <p>No members found, yet!</p>
    </div>
  );
}
