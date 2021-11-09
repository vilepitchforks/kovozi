import Link from "next/link";

import { checkAuth, getAuthUser } from "../libs/authHelpers";

const NotApproved = ({ user }) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <p className="text-center text-carbon-gray">
        Korisnik {user?.name} trenutno nije odobren. Dok čekate, posjetite{" "}
        <Link href="/demo">
          <a title="Početna" className="mt-10 text-carbon-pewter">
            Demo
          </a>
        </Link>{" "}
        stranice.
      </p>
    </div>
  );
};

NotApproved.skipLayout = true;

export const getServerSideProps = async ({ req, res }) => {
  const redirect = { redirect: { destination: "/login", permanent: false } };

  const isAuthenticated = checkAuth(req, res);

  // If user is not authenticated, redirect to /login
  if (!isAuthenticated) return redirect;

  // Get existing user
  const user = await getAuthUser(req, res);

  // Redirect user to Home if the user is approved
  if (user.approved)
    return { redirect: { destination: "/", permanent: false } };

  if (user) return { props: { user } };

  return redirect;
};

export default NotApproved;
