import { checkAuth } from "../libs/authHelpers";

const New = () => {
  return <div>New entry</div>;
};

export const getServerSideProps = async ({ req, res, query }) => {
  const isAuthenticated = checkAuth(req, res);

  // If user is authenticated, redirect to home /
  if (!isAuthenticated)
    return { redirect: { destination: "/login", permanent: false } };

  return { props: { query } };
};

export default New;
