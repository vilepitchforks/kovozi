import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { checkAuth, getAuthUser } from "../libs/authHelpers";

import styles from "../styles/Home.module.css";

export default function Home({ user }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>KoVozi</title>
        <meta name="description" content="KoVozi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">{user.name}</a>
        </h1>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>{user.name} &rarr;</h2>
            <Image
              src={user.picture.data.url}
              alt={user.name}
              width={user.picture.data.width}
              height={user.picture.data.height}
            />
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const isAuthenticated = checkAuth(req, res);

  // If user is not authenticated, redirect to /login
  if (!isAuthenticated)
    return { redirect: { destination: "/login", permanent: false } };

  // Get existing user
  const user = await getAuthUser(req, res);

  if (user) return { props: { user } };

  return { redirect: { destination: "/login", permanent: false } };
};
