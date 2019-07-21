const axios = require('axios');
const {fromJS} = require('immutable');

const {getFilters} = require('../../utils/contentful');

module.exports = async request => {
  try {
    let filters = await getFilters({query: request.query});

    return {
      success: true,
      data: filters
    };
  } catch (error) {
    return error;
  }
};

