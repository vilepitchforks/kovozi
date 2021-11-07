import React, { useContext } from "react";

import MetaHead from "../../components/Demo/MetaHead/MetaHead";

import Layout from "../../components/Demo/Layout/Layout";
import TrenutnoVozi from "../../components/Demo/Sections/TrenutnoVozi/TrenutnoVozi";
import IdemVozimDanas from "../../components/Demo/Sections/IdemVozimDanas/IdemVozimDanas";
import KoIdeDanas from "../../components/Demo/Sections/KoIdeDanas/KoIdeDanas";
import Raspored from "../../components/Demo/Sections/Raspored/Raspored";

import {
  useUsers,
  useUserId
} from "../../components/Demo/hooks/users.hooks.js";

const GlobalContext = React.createContext();

export function useGlobalCtx() {
  return useContext(GlobalContext);
}

export default function Home() {
  const { user, users } = useUsers();
  const { idemId, setIdemId, vozimId, setVozimId } = useUserId();

  return (
    <GlobalContext.Provider
      value={{ user, users, idemId, setIdemId, vozimId, setVozimId }}
    >
      <Layout>
        <MetaHead>
          <title>
            {user?.name
              ? user.name.first + " " + user.name.last + " | KoVozi"
              : "KoVozi"}
          </title>
        </MetaHead>
        <TrenutnoVozi />
        <IdemVozimDanas />
        <KoIdeDanas />
        <Raspored />
      </Layout>
    </GlobalContext.Provider>
  );
}

Home.skipLayout = true;
