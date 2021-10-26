import Document, { Html, Head, Main, NextScript } from "next/document";

// _document.js copied from https://nextjs.org/docs/advanced-features/custom-document
// Added links and meta tag for PWA
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="hr-HR">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#121212" />
        </Head>
        <body className="bg-carbon-ebony">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
