import MetaHead from "../components/MetaHead/MetaHead";

import TrenutnoVozi from "../components/Sections/TrenutnoVozi/TrenutnoVozi";
import KoIde from "../components/Sections/KoIde/KoIde";

import { checkAuth, getAuthUser } from "../libs/authHelpers";

export default function Home({ user }) {
  return (
    <>
      <MetaHead>
        <title>{user.name ? user.name + " | KoVozi" : "KoVozi"}</title>
      </MetaHead>
      <TrenutnoVozi />
      <KoIde />
    </>
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
