import { useState } from "react";

import MetaHead from "../components/MetaHead/MetaHead";

import TkoVozi from "../components/Sections/TkoVozi/TkoVozi";
import IdemVozimDanas from "../components/Sections/IdemVozimDanas/IdemVozimDanas";
import TkoIde from "../components/Sections/TkoIde/TkoIde";
import Raspored from "../components/Sections/Raspored/Raspored";

import { checkAuth, getAuthUser } from "../libs/authHelpers";
import {
  getIdemVozimTkoIde,
  getRaspored,
  getTkoVozi
} from "../libs/dataHelpers";

export default function Home({
  user,
  idemVozimTkoIde,
  trenutnoVozi,
  rasporedData
}) {
  const [tkoIde, setTkoIde] = useState(idemVozimTkoIde.tkoIde);
  const [tkoVozi, setTkoVozi] = useState(trenutnoVozi);
  const [raspored, setRaspored] = useState(rasporedData);

  return (
    <>
      <MetaHead>
        <title>{user.name ? user.name + " | KoVozi" : "KoVozi"}</title>
      </MetaHead>
      <TkoVozi tkoVozi={tkoVozi} />
      <IdemVozimDanas
        user={user}
        idemVozimTkoIde={idemVozimTkoIde}
        setTkoIde={setTkoIde}
        setTkoVozi={setTkoVozi}
        setRaspored={setRaspored}
      />
      <TkoIde tkoIde={tkoIde} />
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

  const [idemVozimTkoIde, trenutnoVozi, rasporedData] = await Promise.all([
    getIdemVozimTkoIde(req, res),
    getTkoVozi(),
    getRaspored()
  ]);

  if (user && idemVozimTkoIde && trenutnoVozi && rasporedData)
    return { props: { user, idemVozimTkoIde, trenutnoVozi, rasporedData } };

  return redirect;
};
