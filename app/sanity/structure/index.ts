import {
  Disc,
  Home,
  Calendar,
  Newspaper,
  Tags,
  User,
  Users,
  Factory,
  BookOpenText,
  Globe2,
  MapPin,
  UserPlus,
} from 'lucide-react';
import type {
  DefaultDocumentNodeResolver,
  StructureResolver,
} from 'sanity/desk';

import OGPreview from '~/sanity/components/OGPreview';
import { resolveOGUrl } from '~/sanity/structure/resolveOGUrl';

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      // Singleton, home page curation
      S.documentListItem()
        .schemaType('home')
        .icon(Home)
        .id('home')
        .title('Home'),
      S.divider(),
      S.documentListItem()
        .schemaType('membership')
        .id('membership')
        .icon(UserPlus)
        .title('Membership'),
      S.divider(),
      // Document lists
      S.documentTypeListItem('page').title('Pages').icon(BookOpenText),
      S.documentTypeListItem('event').title('Events').icon(Calendar),
      S.documentTypeListItem('news').title('News').icon(Newspaper),
      S.documentTypeListItem('tag').title('Tags').icon(Tags),
      S.divider(),
      S.documentTypeListItem('member').title('Members').icon(User),
      S.documentTypeListItem('boardmember').title('Board Members').icon(Users),
      S.documentTypeListItem('corporatemember')
        .title('Corporate Members')
        .icon(Factory),
      S.divider(),
      S.documentTypeListItem('africanregion')
        .title('African Regions')
        .icon(Globe2),
      S.documentTypeListItem('africancountry')
        .title('African Countries')
        .icon(MapPin),
    ]);

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType, documentId }
) => {
  const OGPreviewView = S.view
    .component(OGPreview)
    .options({
      url: resolveOGUrl(documentId),
    })
    .title('OG Preview');

  switch (schemaType) {
    case `home`:
      return S.document().views([S.view.form()]);
    case `membership`:
      return S.document().views([S.view.form()]);
    case `record`:
      return S.document().views([S.view.form(), OGPreviewView]);
    default:
      return S.document().views([S.view.form()]);
  }
};
