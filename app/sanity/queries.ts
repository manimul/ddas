import groq from 'groq';

export const HOME_QUERY = groq`*[_id == "home"][0]{ title, siteTitle }`;

export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  subtitle,
  "slug": slug.current,
  image,
  content
}`;

export const AFRICAN_REGIONS_QUERY = groq`*[_type == "africanregion"][0...12]|order(name asc){
  _id,
  _type,
  title,
  "slug": slug.current,
  image,
 content
}`;

export const REGION_QUERY = groq`*[_type == "africanregion" && slug.current == $slug][0]{
_id,
  _type,
  title,
  "slug": slug.current,
  image,
 content
}`;

export const REGIONS_QUERY = groq`*[_type == "africanregion"][0...12]|order(name asc){
  _id,
  _type,
  title,
  "slug": slug.current,
  image,
 content
}`;

export const AFRICAN_REGION_QUERY = groq`*[_type == "africanregion" && slug.current == $region][0]{
_id,
  _type,
  title,
  "slug": slug.current,
  image,
 content
}`;

export const COUNTRIES_QUERY = groq`*[_type == "africancountry"][0...12]|order(name asc){
  _id,
  _type,
  title,
  region,
  "slug": slug.current,
  image,
 content
}`;

export const COUNTRY_QUERY = groq`*[_type == "africancountry" && slug.current == $country][0]{
_id,
  _type,
  title,
  region,
  "slug": slug.current,
  image,
 content
}`;

export const MEMBERS_QUERY = groq`*[_type == "member"][0...12]|order(name asc){
  _id,
  _type,
  name,
  title,
  facebook,
  twitter,
  linkedin,
  phone,
  email,
  "slug": slug.current,
  image,
  bio
}`;

export const MEMBER_QUERY = groq`*[_type == "member" && slug.current == $slug][0]{
  _id,
  _type,
  name,
  title,
  facebook,
  twitter,
  linkedin,
  phone,
  email,
  "slug": slug.current,
  image,
  bio
}`;

export const EVENTS_QUERY = groq`*[_type == "event" && select($isFuture => dateTime(date) > dateTime($currentDate), dateTime(date) <= dateTime($currentDate)) ][0...12]|order(date asc){
  _id,
  _type,
  title,
  extract,
  date,
  location,
  "slug": slug.current,
  image,
 content
}`;

export const EVENT_QUERY = groq`*[_type == "event" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  extract,
  date,
  location,
  "slug": slug.current,
  image,
 content
}`;

export const NEWSES_QUERY = groq`*[_type == "news" ][0...12]|order(date asc){
  _id,
  _type,
  title,
  extract,
  publishedDate,
  location,
  "slug": slug.current,
  image,
 content
}`;

export const NEWS_QUERY = groq`*[_type == "news" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  extract,
  publishedDate,
  location,
  "slug": slug.current,
  image,
 content
}`;

export const BOARD_MEMBERS_QUERY = groq`*[_type == "boardmember"][0...12]|order(name asc){
  _id,
  _type,
  name,
  title,
  image,
  phone,
  email,
  "slug": slug.current,
  bio
}`;

export const BOARD_MEMBER_QUERY = groq`*[_type == "boardmember" && slug.current == $slug][0]{
  _id,
  _type,
  name,
  title,
  image,
  phone,
  email,
  "slug": slug.current,
  bio
}`;

export const CORPORATE_MEMBERS_QUERY = groq`*[_type == "corporatemember"][0...12]|order(name asc){
  _id,
  _type,
  name,
  title,
  website,
  "slug": slug.current,
  image,
  bio
}`;

export const CORPORATE_MEMBER_QUERY = groq`*[_type == "corporatemember" && slug.current == $slug][0]{
  _id,
  _type,
  name,
  title,
  website,
  "slug": slug.current,
  image,
  bio
}`;

export const RECORDS_QUERY = groq`*[_type == "record"][0...12]|order(title asc){
    _id,
    _type,
    title,
    releaseDate,
    "slug": slug.current,
    "artist": artist->name,
    image
  } | order(releaseDate desc)`;

export const RECORD_QUERY = groq`*[_type == "record" && slug.current == $slug][0]{
  _id,
  title,
  releaseDate,
  // GROQ can re-shape data in the request!
  "slug": slug.current,
  "artist": artist->name,
  // coalesce() returns the first value that is not null
  // so we can ensure we have at least a zero
  "likes": coalesce(likes, 0),
  "dislikes": coalesce(dislikes, 0),
  // for simplicity in this demo these are typed as "any"
  // we can make them type-safe with a little more work
  // https://www.simeongriggs.dev/type-safe-groq-queries-for-sanity-data-with-zod
  image,
  content,
  // this is how we extract values from arrays
  tracks[]{
    _key,
    title,
    duration
  }
}`;
