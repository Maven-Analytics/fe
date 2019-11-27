module.exports = {
  getServerUri
};

function getServerUri(request) {
  console.log(request.server.info);
  return request && request.server && request.server.info ? `http://localhost:${request.server.info.port}` : 'http://localhost';
}
