import MetaHead from "../../components/Demo/MetaHead/MetaHead";

import Layout from "../../components/Demo/Layout/Layout";
import TrenutnoVozi from "../../components/Demo/Sections/TrenutnoVozi/TrenutnoVozi";
import IdemVozimDanas from "../../components/Demo/Sections/IdemVozimDanas/IdemVozimDanas";
import KoIdeDanas from "../../components/Demo/Sections/KoIdeDanas/KoIdeDanas";
import Raspored from "../../components/Demo/Sections/Raspored/Raspored";

export default function Home({ user }) {
  return (
    <Layout>
      <MetaHead>
        <title>{user?.name ? user.name + " | KoVozi" : "KoVozi"}</title>
      </MetaHead>
      <TrenutnoVozi />
      <IdemVozimDanas />
      <KoIdeDanas />
      <Raspored />
    </Layout>
  );
}

Home.skipLayout = true;
