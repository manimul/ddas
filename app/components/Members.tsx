import { Link } from '@remix-run/react';
import { MemberImage } from '~/components/MemberImage';
import type { MemberStub } from '~/types/member';
import { SanityContent } from './SanityContent';

type MembersProps = {
  members: MemberStub[];
};

export function Members(props: MembersProps) {
  const { members = [] } = props;
  return members.length > 0 ? (
    <>
      <ul className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {members.map((member) => (
          <li
            key={member._id}
            className='w-full bg-white rounded-lg  overflow-hidden flex flex-col md:flex-row'
          >
            <div className='w-full md:w-2/5 h-80'>
              <MemberImage
                image={member.image}
                className='object-center object-cover w-full h-full'
              />
            </div>
            <div className='w-full md:w-3/5 text-left py-4 md:p-4 space-y-2'>
              <h2 className='text-xl text-gray-700 font-bold capitalize'>
                {member.name?.toLowerCase()}
              </h2>
              <span className=' text-gray-400 font-normal uppercase text-sm'>
                {member.title}
              </span>
              <span className=' text-gray-400 font-normal uppercase text-sm'>
                {member.linkedin}
              </span>
              <span className=' text-gray-400 font-normal uppercase text-sm'>
                {member.facebook}
              </span>
              <p className='text-base leading-relaxed text-gray-500 font-normal'>
                {member.bio && member.bio?.length > 0 ? (
                  <SanityContent value={member.bio} />
                ) : null}
              </p>
              {/* Add any additional elements or icons here */}
            </div>
          </li>
        ))}
      </ul>
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
