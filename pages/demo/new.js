import Layout from "../../components/Demo/Layout/Layout";
import VozimOdDo from "../../components/Demo/Sections/VozimOdDo/VozimOdDo";
import MetaHead from "../../components/Demo/MetaHead/MetaHead";

const New = () => {
  return (
    <Layout>
      <MetaHead>
        <title>Novi unos | KoVozi</title>
      </MetaHead>
      <VozimOdDo />
    </Layout>
  );
};

New.skipLayout = true;

export default New;
