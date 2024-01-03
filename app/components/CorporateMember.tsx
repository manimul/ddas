import { CorporateMemberDocument } from '~/types/corporateMember';
import { SanityContent } from '~/components/SanityContent';
import { CorporateMemberImage } from '~/components/CorporateMemberImage';

type CorporateMemberProps = {
  data: CorporateMemberDocument;
};

export function Member(props: CorporateMemberProps) {
  const { _id, name, image, bio } = props.data;
  return (
    <div>
      <h1>{name}</h1>
      <CorporateMemberImage image={image} />
      {bio && bio?.length > 0 ? <SanityContent value={bio} /> : null}
    </div>
  );
}
