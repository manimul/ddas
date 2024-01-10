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
    <ul className='flex flex-col '>
      {corporateMembers.map((corporateMember) => (
        <li
          key={corporateMember._id}
          className='flex items-center flex-col md:flex-row justify-between  space-y-20 w-full md:odd:flex-row-reverse '
        >
          <div className='md:w-1/4 mx-auto'>
            <CorporateMemberImage image={corporateMember.image} />
          </div>
          <div className='space-y-2 '>
            <h2 className='capitalize text-4xl '>
              {corporateMember.name?.toLowerCase()}
            </h2>
            <p className='text-sm 	'>
              {corporateMember.bio && corporateMember.bio?.length > 0 ? (
                <SanityContent value={corporateMember.bio} />
              ) : null}
            </p>

            {corporateMember.website && (
              <span className='flex font-bold text-base py-4'>
                Hemsida:{' '}
                <Link
                  to={corporateMember.website}
                  className='underline text-green-600'
                >
                  {corporateMember.title}
                </Link>
              </span>
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
