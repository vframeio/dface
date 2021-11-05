/**
 * Next.js application wrapper
 * @module pages/_app.js
 */

import PropTypes from "prop-types";

import Head from "next/head";
import Layout from "components/common/Layout";

import "styles/app.scss";
import "components/blur/app.css";
import "components/common/form.css";
import "rc-slider/assets/index.css";

export default function Application({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <title>DFACE: Face Redaction</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Adam Harvey, VFRAME.io" />
        <meta
          name="description"
          content="Redact and blur faces in photos privately using neural network face detection in your browser."
        />
        <meta property="og:title" content="DFACE: Face Redaction" />
        <meta property="og:type" content="website" />
        <meta
          property="og:summary"
          content="DFACE: Redact and blur faces in photos privately using neural network face detection in your browser"
        />
        <meta property="og:image" content="https://dface.app/assets/img/share.jpg" />
        <meta property="og:url" content="https://dface.app" />
        <meta property="og:site_name" content="DFACE.ap" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:description" content="Redact and blur faces in photos privately using neural network face detection in your browser" />
        <meta property="twitter:image" content="https://dface.app/assets/img/share.jpg" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        <link rel="apple-touch-icon" sizes="60x60" href="/assets/img/favicon/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/assets/img/favicon/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/favicon/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/assets/img/favicon/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/assets/img/favicon/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/assets/img/favicon/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/assets/img/favicon/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/favicon/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192"  href="/assets/img/favicon/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/assets/img/favicon/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/assets/img/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />

      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

Application.propTypes = {
  Component: PropTypes.any, // should be PropTypes.node but it was throwing an error
  pageProps: PropTypes.object,
};
