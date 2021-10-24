import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { checkAuth, getAuthUser } from "../libs/authHelpers";

export default function Home({ user }) {
  return (
    <div>
      <Head>
        <title>KoVozi</title>
        <meta name="description" content="KoVozi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">{user.name}</a>
        </h1>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <p>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div>
          <a href="https://nextjs.org/docs">
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

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span>
            {/* <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} /> */}
          </span>
        </a>
      </footer>
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const redirect = { redirect: { destination: "/login", permanent: false } };

  const isAuthenticated = checkAuth(req, res);

  // If user is not authenticated, redirect to /login
  if (!isAuthenticated) return redirect;

  // Get existing user
  const user = await getAuthUser(req, res);

  if (user) return { props: { user } };

  return redirect;
};
