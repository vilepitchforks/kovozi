import { useState } from "react";

import MetaHead from "../components/MetaHead/MetaHead";

import TrenutnoVozi from "../components/Sections/TrenutnoVozi/TrenutnoVozi";
import IdemVozimDanas from "../components/Sections/IdemVozimDanas/IdemVozimDanas";
import KoIdeDanas from "../components/Sections/KoIdeDanas/KoIdeDanas";
import Raspored from "../components/Sections/Raspored/Raspored";

import { checkAuth, getAuthUser } from "../libs/authHelpers";
import {
  getIdemVozimTkoIde,
  getRaspored,
  getTrenutnoVozi
} from "../libs/dataHelpers";

export default function Home({
  user,
  idemVozimTkoIde,
  trenutnoVozi,
  raspored
}) {
  const [tkoIde, setTkoIde] = useState(idemVozimTkoIde.danasIdu);
  const [tkoVozi, setTkoVozi] = useState(trenutnoVozi);

  return (
    <>
      <MetaHead>
        <title>{user.name ? user.name + " | KoVozi" : "KoVozi"}</title>
      </MetaHead>
      <TrenutnoVozi tkoVozi={tkoVozi} />
      <IdemVozimDanas
        user={user}
        idemVozimTkoIde={idemVozimTkoIde}
        setTkoIde={setTkoIde}
        setTkoVozi={setTkoVozi}
      />
      <KoIdeDanas tkoIde={tkoIde} />
      <Raspored user={user} raspored={raspored} />
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

  const [idemVozimTkoIde, trenutnoVozi, raspored] = await Promise.all([
    getIdemVozimTkoIde(req, res),
    getTrenutnoVozi(),
    getRaspored()
  ]);

  if (user && idemVozimTkoIde && trenutnoVozi && raspored)
    return { props: { user, idemVozimTkoIde, trenutnoVozi, raspored } };

  return redirect;
};
