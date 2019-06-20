import * as contentful from 'contentful';

import config from '../config';

const ContenfulClient = contentful.createClient({
  space: config.CONTENTFUL_SPACE,
  accessToken: config.CONTENTFUL_ACCESS_TOKEN
});

export async function getPaths({query = {}, include = 10}) {
  try {
    let res = await ContenfulClient.getEntries({
      content_type: 'path', // eslint-disable-line camelcase,
      include,
      ...query
    });

    return mapFromResponseItems(res.items)
      .map(item => {
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

export async function getCourses({query = {}, include = 10, limit = 20}) {
  try {
    let res = await ContenfulClient.getEntries({
      content_type: 'course', // eslint-disable-line camelcase,
      include,
      limit,
      ...query
    });

    return mapFromResponseItems(res.items)
      .map(mapCourseItem);
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
    ...item.fields
  };
}

function mapCourseItem(item) {
  if (!item) {
    return;
  }

  return {
    id: item.id,
    ...item.fields,
    thumbnail: mapResponseImage(item.fields.thumbnail),
    badge: mapResponseImage(item.fields.badge),
    image: mapResponseImage(item.fields.image),
    author: mapAuthorItem(item.fields.author)
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
