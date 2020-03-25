import Document, {Head, Html, Main, NextScript} from 'next/document';
import React from 'react';
import {ServerStyleSheet} from 'styled-components';
import {innerHtml} from '#root/utils/componentHelpers';

const SESSION_STACK_JS = `!function(a,b){var c=window;c.SessionStackKey=a,c[a]=c[a]||{t:b,
  q:[]};for(var d=["start","stop","identify","getSessionId","log","setOnDataCallback"],e=0;e<d.length;e++)!function(b){
  c[a][b]=c[a][b]||function(){c[a].q.push([b].concat([].slice.call(arguments,0)));
  }}(d[e]);var f=document.createElement("script");f.async=1,f.crossOrigin="anonymous",
  f.src="https://cdn.sessionstack.com/sessionstack.js";var g=document.getElementsByTagName("script")[0];
  g.parentNode.insertBefore(f,g)}("SessionStack","241d7931fd274886968e7f1af6db0802");`;

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html className="fonts-loaded">
        <Head>
          {/* FAVICON */}
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/static/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#5bbad5" />

          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta httpEquiv="Content-Type" content="text/html; charset=ISO-8859-1" />

          <meta charSet="utf-8" />

          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />

          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />

          <link rel="preload" href="/static/fonts/maicon/fonts/maicon.woff2?1qo22k" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" href="/static/fonts/DIN/D-DIN.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          <link rel="preload" href="/static/fonts/Lato/Lato-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

          {/* Stripe */}
          <script id="stripe-js" src="https://js.stripe.com/v3/" async></script>

          {/* Outgrow Script */}
          <script async src="//dyv6f9ner1ir9.cloudfront.net/assets/js/nloader.js" />

          {/* Session Stack */}
          <script type="text/javascript" dangerouslySetInnerHTML={innerHtml(SESSION_STACK_JS)} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
