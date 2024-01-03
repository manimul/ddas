import { Link } from '@remix-run/react';
import { CorporateMemberImage } from '~/components/CorporateMemberImage';
import type { CorporateMemberStub } from '~/types/corporateMember';
import { SanityContent } from './SanityContent';

type CorporateMembersProps = {
  corporateMembers: CorporateMemberStub[];
};

export function CorporateMembers(props: CorporateMembersProps) {
  const { corporateMembers = [] } = props;
  return corporateMembers.length > 0 ? (
    <ul className='flex flex-col space-y-6'>
      {corporateMembers.map((corporateMember) => (
        <li
          key={corporateMember._id}
          className='flex flex-row justify-start space-x-6 w-full '
        >
          <div className='w-1/4'>
            <CorporateMemberImage image={corporateMember.image} />
          </div>
          <div className=' '>
            <h2 className='capitalize text-lg '>
              {corporateMember.name?.toLowerCase()}
            </h2>
            <p className='text-sm 	'>
              {corporateMember.bio && corporateMember.bio?.length > 0 ? (
                <SanityContent value={corporateMember.bio} />
              ) : null}
            </p>
            {corporateMember.website && (
              <Link to={corporateMember.website} className='uppercase text-sm'>
                {corporateMember.website}
              </Link>
            )}
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
