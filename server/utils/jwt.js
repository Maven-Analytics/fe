const jwt = require('jsonwebtoken');

module.exports = async () => {
  return jwt.sign({data: process.env.JWT_ANSWER}, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '1h'});
};
