import MetaHead from "../components/MetaHead/MetaHead";

import { hostUrl, facebook } from "../config";
import { checkAuth } from "../libs/authHelpers";

const oauthUrl = facebook.loginUrl
  .replace("{app-id}", facebook.appId)
  .replace("{redirect-uri}", hostUrl + "/api/oauth")
  .replace("{auth-type}", "rerequest");

// export default function Login({ query }) {
const Login = ({ query }) => {
  return (
    <div>
      <MetaHead>
        <title>Login | KoVozi</title>
      </MetaHead>

      {query?.error === "access_denied" && (
        <p>Please grant the necessary permisssions.</p>
      )}
      <a href={oauthUrl}>Login</a>
    </div>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  const isAuthenticated = checkAuth(req, res);

  // If user is authenticated, redirect to home /
  if (isAuthenticated)
    return { redirect: { destination: "/", permanent: false } };

  return { props: { query } };
};

export default Login;
