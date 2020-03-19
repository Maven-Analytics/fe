import * as contentful from 'contentful';

import {env} from '#root/constants';

const CONTENTFUL_SPACE = env.CONTENTFUL_SPACE;
const CONTENTFUL_ACCESS_TOKEN = env.CONTENTFUL_ACCESS_TOKEN;

const getContentfulClient = () =>
  contentful.createClient({
    space: CONTENTFUL_SPACE,
    accessToken: CONTENTFUL_ACCESS_TOKEN
  });

export async function getPaths({query = {}, include = 10}) {
  try {
    let res = await getContentfulClient().getEntries({
      content_type: 'path', // eslint-disable-line camelcase,
      include,
      ...query
    });

    return mapFromResponseItems(res.items).map(item => {
      return {
        ...item,
        badge: mapResponseImage(item.badge),
        courses: item.courses.map(mapCourseItem)
      };
    });
  } catch (error) {
    return error;
  }
}

export async function getSpotlights({query = {}, include = 10, limit = 100}) {
  try {
    let res = await getContentfulClient().getEntries({
      content_type: 'studentSpotlight', // eslint-disable-line camelcase,
      include,
      limit,
      order: 'fields.order',
      ...query
    });

    return res.items.map(mapResponseSpotlight);
  } catch (error) {
    return error;
  }
}

export async function getPages({query = {}, include = 10, limit = 100}) {
  try {
    let res = await getContentfulClient().getEntries({
      content_type: 'page', // eslint-disable-line camelcase,
      include,
      limit,
      ...query
    });

    return res.items.map(i => {
      return {
        ...mapResponseItem(i),
        meta: i.fields.meta ? i.fields.meta.fields : null,
        heroBackground: mapResponseImage(i.fields.heroBackground),
        heroBackgroundSmall: mapResponseImage(i.fields.heroBackgroundSmall),
        heroImage: mapResponseImage(i.fields.heroImage),
        flexibleContent: mapFromResponseItems(i.fields.flexibleContent)
      };
    });
  } catch (error) {
    return error;
  }
}

export async function getFaqs({query = {}, include = 10, limit = 100}) {
  try {
    let res = await getContentfulClient().getEntries({
      content_type: 'faq', // eslint-disable-line camelcase,
      include,
      limit,
      ...query
    });

    return res.items.map(i => {
      return {
        ...mapResponseItem(i)
      };
    });
  } catch (error) {
    return error;
  }
}

export async function getCourses({query = {}, include = 10, limit = 100}) {
  try {
    let res = await getContentfulClient().getEntries({
      content_type: 'course', // eslint-disable-line camelcase,
      include,
      limit,
      ...query
    });

    return res.items.map(mapCourseItem);
  } catch (error) {
    console.log('getCourses error: ', error);
    return error;
  }
}

export async function getAnnouncements({query = {}, include = 10}, order) {
  try {
    let res = await getContentfulClient().getEntries({
      content_type: 'announcement', // eslint-disable-line camelcase,
      include,
      order,
      ...query
    });

    return mapFromResponseItems(res.items).map(item => {
      return {
        ...item
      };
    });
  } catch (error) {
    return error;
  }
}

function mapFromResponseItems(items) {
  if (!items) {
    return;
  }

  return items.map(mapResponseItem);
}

function mapResponseItem(item) {
  if (!item) {
    return;
  }

  return {
    id: item.sys.id,
    ...item.fields,
    thumbnail: mapResponseImage(item.fields.thumbnail)
  };
}

function mapCourseItem(item) {
  if (!item) {
    return;
  }

  // Console.log('here');

  // const paths = await getPaths({query: {
  //   links_to_entry: item.sys.id
  // }});

  // console.log(paths);

  return {
    id: item.sys.id,
    ...item.fields,
    thumbnail: mapResponseImage(item.fields.thumbnail),
    badge: mapResponseImage(item.fields.badge),
    image: mapResponseImage(item.fields.image),
    author: mapAuthorItem(item.fields.author),
    testimonials: item.fields.testimonials ? mapFromResponseItems(item.fields.testimonials) : item.fields.testimonials
  };
}

function mapResponseSpotlight(item) {
  if (!item) {
    return;
  }

  return {
    id: item.sys.id,
    ...item.fields,
    image: mapResponseImage(item.fields.image)
  };
}

function mapAuthorItem(item) {
  if (!item) {
    return;
  }

  return {
    id: item.sys.id,
    ...item.fields,
    thumbnail: mapResponseImage(item.fields.thumbnail)
  };
}

function mapResponseImage(image) {
  if (!image) {
    return;
  }

  return {
    id: image.sys.id,
    title: image.sys.title,
    ...image.fields
  };
}
