const {getAuthors} = require('../../utils/contentful');

module.exports = async () => {
  try {
    let authors = await getAuthors({});

    return {
      success: true,
      data: authors
    };
  } catch (error) {
    return error;
  }
};
