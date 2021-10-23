import Head from "next/head";

import styles from "../styles/Home.module.css";

import { hostUrl, facebook } from "../config";
import { checkAuth } from "../libs/authHelpers";

const oauthUrl = facebook.loginUrl
  .replace("{app-id}", facebook.appId)
  .replace("{redirect-uri}", hostUrl + "/api/oauth")
  .replace("{auth-type}", "rerequest");

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Login | KoVozi</title>
        <meta name="description" content="Login | KoVozi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <a href={oauthUrl}>Login</a>
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const isAuthenticated = checkAuth(req, res);

  // If user is authenticated, redirect to home /
  if (isAuthenticated)
    return { redirect: { destination: "/", permanent: false } };

  return { props: {} };
};
