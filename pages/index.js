import MetaHead from "../components/MetaHead/MetaHead";

import TrenutnoVozi from "../components/Sections/TrenutnoVozi/TrenutnoVozi";
import IdemVozimDanas from "../components/Sections/IdemVozimDanas/IdemVozimDanas";
import KoIdeDanas from "../components/Sections/KoIdeDanas/KoIdeDanas";
import Raspored from "../components/Sections/Raspored/Raspored";

import { checkAuth, getAuthUser } from "../libs/authHelpers";

export default function Home({ user }) {
  return (
    <>
      <MetaHead>
        <title>{user.name ? user.name + " | KoVozi" : "KoVozi"}</title>
      </MetaHead>
      <TrenutnoVozi />
      <IdemVozimDanas />
      <KoIdeDanas />
      <Raspored />
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

  // TODO Redirect user to error page while they are waiting for approval
  if (!user.approved)
    return { redirect: { destination: "/not-approved", permanent: false } };

  if (user) return { props: { user } };

  return redirect;
};
