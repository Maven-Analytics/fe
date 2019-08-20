import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render() {
    return (
      <Html className="fonts-loaded">
        <Head>
          {/* FAVICON */}
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png"/>
          <link rel="manifest" href="/static/favicon/site.webmanifest"/>
          <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#5bbad5"/>

          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta httpEquiv="Content-Type" content="text/html; charset=ISO-8859-1"/>

          <meta charSet="utf-8"/>

          <meta name="msapplication-TileColor" content="#da532c"/>
          <meta name="theme-color" content="#ffffff"/>

          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>

          <link rel="preload" href="/static/fonts/maicon/fonts/maicon.woff2?1qo22k" as="font" type="font/woff2" crossOrigin="anonymous"/>
          <link rel="preload" href="/static/fonts/DIN/D-DIN.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
          <link rel="preload" href="/static/fonts/Lato/Lato-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>

          {/* Outgrow Script */}

          <script async src="//dyv6f9ner1ir9.cloudfront.net/assets/js/nloader.js"/>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
