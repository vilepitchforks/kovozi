import VozimOdDo from "../components/Sections/VozimOdDo/VozimOdDo";
import MetaHead from "../components/MetaHead/MetaHead";

import { checkAuth } from "../libs/authHelpers";

const New = () => {
  return (
    <>
      <MetaHead>
        <title>Novi unos | KoVozi</title>
      </MetaHead>
      <VozimOdDo />
    </>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  const isAuthenticated = checkAuth(req, res);

  // If user is authenticated, redirect to home /
  if (!isAuthenticated)
    return { redirect: { destination: "/login", permanent: false } };

  return { props: { query } };
};

export default New;
