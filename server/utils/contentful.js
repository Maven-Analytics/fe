const {fromJS, Map, List} = require('immutable');
const contentful = require('contentful');

const ContenfulClient = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

module.exports = {
  getPaths,
  getCourses,
  getFilters,
  getCourseProgress,
  getPathProgress
};

async function getPaths({query = {}, include = 10}) {
  try {
    let res = await ContenfulClient.getEntries(Object.assign({
      content_type: 'path', // eslint-disable-line camelcase,
      include
    }, query));

    const paths = mapFromResponseItems(res.items)
      .map(item => {
        return Object.assign(item, {
          badge: mapResponseImage(item.badge),
          courses: item.courses.map(mapCourseItem)
        });
      });

    return paths;
  } catch (error) {
    throw error;
  }
}

async function getFilters({query = {}, include = 10}) {
  try {
    let res = await ContenfulClient.getEntries(Object.assign({
      content_type: 'filter', // eslint-disable-line camelcase,
      include,
      order: 'fields.order'
    }, query));

    const paths = mapFromResponseItems(res.items)
      .map(item => {
        return Object.assign(item, {
          image: mapResponseImage(item.image)
        });
      });

    return paths;
  } catch (error) {
    throw error;
  }
}

async function getCourses({query = {}, include = 10, limit = 100}) {
  try {
    let res = await ContenfulClient.getEntries(Object.assign({
      content_type: 'course', // eslint-disable-line camelcase,
      include,
      limit
    }, query));

    return res.items.map(mapCourseItem);
  } catch (error) {
    throw error;
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

  return Object.assign({
    id: item.sys.id
  }, item.fields);
}

function mapCourseItem(item) {
  if (!item) {
    return;
  }

  return Object.assign(item.fields, {
    id: item.sys.id,
    thumbnail: mapResponseImage(item.fields.thumbnail),
    badge: mapResponseImage(item.fields.badge),
    image: mapResponseImage(item.fields.image),
    author: mapAuthorItem(item.fields.author)
  });
}

function mapAuthorItem(item) {
  if (!item) {
    return;
  }

  return Object.assign(item.fields ? item.fields : item, {
    id: item.sys ? item.sys.id : item.id,
    thumbnail: mapResponseImage(item.fields ? item.fields.thumbnail : item.thumbnail)
  });
}

function mapResponseImage(image) {
  if (!image) {
    return;
  }

  return Object.assign({
    id: image.sys ? image.sys.id : image.id,
    title: image.sys ? image.sys.title : image.title
  }, image.fields ? image.fields : image);
}

function getCourseProgress(course, enrollments) {
  if (course && !Map.isMap(course)) {
    throw new Error('course must be a Map');
  }

  if (enrollments && !List.isList(enrollments)) {
    throw new Error('enrollments must be a List');
  }

  if (!course || course.isEmpty() || !course.get('thinkificCourseId')) {
    return;
  }

  const enrollment = enrollments.find(enrollment => enrollment.get('courseId') === course.get('thinkificCourseId'));

  const progress = fromJS(Object.assign(course.toJS(), {
    courseId: course.get('thinkificCourseId'),
    percentage_completed: 0,
    enrollment: enrollment ? enrollment.toJS() : {}
  }));

  if (!enrollment) {
    return progress;
  }

  return progress.merge(enrollment)
    .update(u => {
      let status = 'Not Started';

      if (u.get('percentage_completed') > 0) {
        status = 'In Progress';
      }

      if (u.get('percentage_completed') === 1) {
        status = 'Completed';
        u = u.set('completed', true);
      }

      // DEBUG
      // u = u.set('completed', true);

      return u.set('status', status);
    });
}

function getPathProgress(path, enrollments) {
  if (path && !Map.isMap(path)) {
    throw new Error('path must be a Map');
  }

  if (enrollments && !List.isList(enrollments)) {
    throw new Error('enrollments must be a List');
  }

  if (!path.has('courses')) {
    return;
  }

  let progress = fromJS(Object.assign(path.toJS(), {
    pathId: path.get('id'),
    percentage_completed: 0,
    enrollments: []
    // DEBUG
    // completed: true
  }));

  const totalCourses = path.get('courses').count();
  const pathEnrollments = getPathEnrollments(path, enrollments);

  progress = pathEnrollments.reduce((map, enrollment) => {
    return map.update(u => {
      const prevPercentage = u.get('percentage_completed');
      const newPercentage = enrollment.get('percentage_completed') + prevPercentage;

      return u.set('percentage_completed', newPercentage)
        .update('enrollments', e => e.push(enrollment));
    });
  }, progress);

  // Divide the total progress by the amount of courses in the path
  progress = progress.update('percentage_completed', p => totalCourses > 0 ? p / totalCourses : 0);

  if (progress.get('percentage_completed') === 1) {
    progress = progress.set('completed', true)
      .set('completed_at', pathEnrollments.getIn([0, 'completed_at']));
  }

  return progress;
}

function getPathEnrollments(path, enrollments) {
  if (!enrollments || !enrollments.isEmpty || enrollments.isEmpty()) {
    return List();
  }

  const pathCourses = path.get('courses').reduce((map, c) => map.set(c.get('thinkificCourseId'), true), Map());
  const pathEnrollments = enrollments.filter(e => pathCourses.has(e.get('courseId')));

  return pathEnrollments;
}
