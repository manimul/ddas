import { BoardMemberDocument } from '~/types/boardMember';
import { SanityContent } from '~/components/SanityContent';
import { MemberImage } from '~/components/MemberImage';

type BoardMemberProps = {
  data: BoardMemberDocument;
};

export function BoardMember(props: BoardMemberProps) {
  const { _id, name, image, bio } = props.data;
  return (
    <div className=''>
      <h1>{name}</h1>
      <MemberImage image={image} />
      {bio && bio?.length > 0 ? <SanityContent value={bio} /> : null}
    </div>
  );
}
