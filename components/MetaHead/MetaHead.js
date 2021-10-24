import Head from "next/head";

const MetaHead = ({ children }) => {
  return (
    <Head>
      <title>KoVozi</title>
      <meta name="description" content="Ko vozi danas?" />
      <link rel="icon" href="/favicon.ico" />
      {children}
    </Head>
  );
};

export default MetaHead;
