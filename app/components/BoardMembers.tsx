import { Link } from '@remix-run/react';
import { MemberImage } from '~/components/MemberImage';
import type { BoardMemberStub } from '~/types/boardMember';
import { SanityContent } from './SanityContent';

type BoardMembersProps = {
  boardMembers: BoardMemberStub[];
};

export function BoardMembers(props: BoardMembersProps) {
  const { boardMembers = [] } = props;
  return boardMembers.length > 0 ? (
    <ul className='flex flex-col space-y-6'>
      {boardMembers.map((boardMember) => (
        <li
          key={boardMember._id}
          className='flex flex-row justify-start space-x-6 w-full '
        >
          <div className='w-1/4'>
            <MemberImage image={boardMember.image} />
          </div>
          <div className=' '>
            <h2 className='capitalize text-lg '>
              {boardMember.name?.toLowerCase()}
            </h2>
            <p className='text-sm 	'>
              {boardMember.bio && boardMember.bio?.length > 0 ? (
                <SanityContent value={boardMember.bio} />
              ) : null}
            </p>
            {boardMember.phone && (
              <Link to={boardMember.phone} className='uppercase text-sm'>
                {boardMember.phone}
              </Link>
            )}
            {boardMember.email && (
              <Link to={boardMember.email} className='uppercase text-sm'>
                {boardMember.email}
              </Link>
            )}
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className='prose prose-xl mx-auto bg-green-50 p-4'>
      <p>No boardmembers found, yet!</p>
    </div>
  );
}
