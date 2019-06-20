import Router from 'next/router';

export const redirect = (url = '/', res) => {
  if (res) {
    res.writeHead(302, {
      Location: url
    });
    res.end();

    return;
  }

  Router.push(url);
};
