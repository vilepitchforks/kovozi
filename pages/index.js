import MetaHead from "../components/MetaHead/MetaHead";

import TrenutnoVozi from "../components/Sections/TrenutnoVozi/TrenutnoVozi";
import IdemDanas from "../components/Sections/IdemDanas/IdemDanas";
import TkoIde from "../components/Sections/TkoIde/TkoIde";

import { checkAuth, getAuthUser } from "../libs/authHelpers";

export default function Home({ user }) {
  return (
    <>
      <MetaHead>
        <title>{user.name ? user.name + " | KoVozi" : "KoVozi"}</title>
      </MetaHead>
      <TrenutnoVozi />
      <IdemDanas />
      <TkoIde />
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
