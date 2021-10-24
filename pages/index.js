import Image from "next/image";

import MetaHead from "../components/MetaHead/MetaHead";

import { checkAuth, getAuthUser } from "../libs/authHelpers";

export default function Home({ user }) {
  return (
    <div>
      <MetaHead>
        <title>{user.name ? user.name + " | KoVozi" : "KoVozi"}</title>
      </MetaHead>

      <main>
        <h1>Welcome {user.name}!</h1>

        <div style={{ display: "flex" }}>
          <Image
            src={user.picture.data.url}
            alt={user.name}
            width={user.picture.data.width}
            height={user.picture.data.height}
          />

          <h2>{user.name}</h2>
        </div>
        <a href="/api/logout">Logout</a>
      </main>

      <footer></footer>
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
