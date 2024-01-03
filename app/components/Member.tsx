import { MemberDocument } from '~/types/member';
import { SanityContent } from '~/components/SanityContent';
import { MemberImage } from '~/components/MemberImage';

type MemberProps = {
  data: MemberDocument;
};

export function Member(props: MemberProps) {
  const { _id, name, image, bio } = props.data;
  return (
    <div>
      <h1>{name}</h1>
      <MemberImage image={image} />
      {bio && bio?.length > 0 ? <SanityContent value={bio} /> : null}
    </div>
  );
}
