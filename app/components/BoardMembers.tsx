import { Link } from '@remix-run/react';
import { MemberImage } from '~/components/MemberImage';
import type { BoardMemberStub } from '~/types/boardMember';
import { SanityContent } from './SanityContent';
import type { SanityImageObjectStub } from '@sanity/asset-utils';
import urlBuilder from '@sanity/image-url';
import { dataset, projectId } from '~/sanity/projectDetails';

type BoardMembersProps = {
  boardMembers: BoardMemberStub[];
};

export function BoardMembers(props: BoardMembersProps) {
  const { boardMembers = [] } = props;
  return boardMembers.length > 0 ? (
    <ul
      role='list'
      className='grid gap-x-5 gap-y-4 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2'
    >
      {boardMembers.map((boardMember) => (
        <li key={boardMember._id}>
          <div className='flex items-start gap-x-4'>
            {boardMember.image ? (
              <img
                className='h-32 w-32 rounded-lg '
                src={urlBuilder({ projectId, dataset })
                  // @ts-ignore
                  .image(boardMember.image.asset._ref)
                  .height(800)
                  .width(800)
                  .fit('max')
                  .auto('format')
                  .url()}
                alt={boardMember.image?.alt ?? ``}
                loading='lazy'
              />
            ) : (
              <div className='flex aspect-square w-full items-center justify-center bg-gray-100 text-gray-500'>
                Missing Member image
              </div>
            )}

            <div className='text-wrap 	 md:break-normal'>
              <h3 className='text-base font-semibold leading-7 tracking-tight text-gray-900 dark:text-gray-100 capitalize'>
                {boardMember.name?.toLowerCase()}
              </h3>
              <p className='text-sm font-semibold leading-6 text-indigo-600'>
                {boardMember.title}
              </p>

              <p className='md:text-lg md:leading-8 text-gray-600 dark:text-gray-300'>
                {boardMember.bio && boardMember.bio?.length > 0 ? (
                  <SanityContent value={boardMember.bio} />
                ) : null}
              </p>
              <p>
                {boardMember.phone && (
                  <a
                    href={'tel:' + boardMember.phone}
                    className='text-xs break-all	uppercase md:text-sm'
                  >
                    {boardMember.phone}
                  </a>
                )}
              </p>
              <p>
                {boardMember.email && (
                  <a
                    href={'mailto:' + boardMember.email}
                    className='text-xs break-all	uppercase md:text-sm'
                  >
                    {boardMember.email}
                  </a>
                )}
              </p>
            </div>
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
