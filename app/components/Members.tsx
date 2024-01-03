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
    <ul className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-12 lg:grid-cols-4'>
      {members.map((member) => (
        <li key={member._id} className='group relative flex flex-col'>
          <div className='relative overflow-hidden transition-all duration-200 ease-in-out group-hover:scale-95 group-hover:opacity-90'>
            <div className='absolute z-0 h-48 w-[200%] ' />
            <MemberImage image={member.image} />
          </div>
          <div className='flex flex-col  '>
            <h2 className='capitalize'>{member.name?.toLowerCase()}</h2>
            <span className='uppercase text-sm'>{member.title}</span>
            <p className='text-sm line-clamp-4 	'>
              {member.bio && member.bio?.length > 0 ? (
                <SanityContent value={member.bio} />
              ) : null}
            </p>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className='prose prose-xl mx-auto bg-green-50 p-4'>
      <p>No members found, yet!</p>
    </div>
  );
}
