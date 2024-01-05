import { EventDocument } from '~/types/event';
import { SanityContent } from '~/components/SanityContent';
import { MemberImage } from '~/components/MemberImage';

type EventProps = {
  data: EventDocument;
};

export function Event(props: EventProps) {
  const { _id, title, subtitle, content, image } = props.data;
  return (
    <div className=''>
      <h1>{title}</h1>
      <MemberImage image={image} />
      {content && content?.length > 0 ? (
        <SanityContent value={content} />
      ) : null}
    </div>
  );
}
