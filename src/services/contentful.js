import * as contentful from 'contentful';

import config from '../config';

const ContenfulClient = contentful.createClient({
  space: config.CONTENTFUL_SPACE,
  accessToken: config.CONTENTFUL_ACCESS_TOKEN
});

export async function getPaths({query = {}, include = 1}) {
  try {
    let res = await ContenfulClient.getEntries({
      content_type: 'path', // eslint-disable-line camelcase,
      include,
      ...query
    });

    return mapFromResponseItems(res.items);
  } catch (error) {
    return error;
  }
}

export async function getCourses({query = {}, include = 1, limit = 20}) {
  try {
    let res = await ContenfulClient.getEntries({
      content_type: 'course', // eslint-disable-line camelcase,
      include,
      limit,
      ...query
    });

    return mapFromResponseItems(res.items)
      .map(item => {
        return {
          ...item,
          author: mapResponseItem(item.author),
          tools: mapFromResponseItems(item.tools),
          skills: mapFromResponseItems(item.skills)
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
    ...item.fields
  };
}
