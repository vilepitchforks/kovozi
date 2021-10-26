import { useState } from "react";
import Image from "next/image";

import MetaHead from "../components/MetaHead/MetaHead";

import { hostUrl, facebook } from "../config";
import { checkAuth } from "../libs/authHelpers";

const oauthUrl = facebook.loginUrl
  .replace("{app-id}", facebook.appId)
  .replace("{redirect-uri}", hostUrl + "/api/oauth")
  .replace("{auth-type}", "rerequest");

const Login = ({ query }) => {
  const [showSpinner, setShowSpinner] = useState(false);

  return (
    <div className="h-screen flex justify-center items-center">
      <MetaHead>
        <title>Login | KoVozi</title>
      </MetaHead>

      <div className="flex flex-col items-center">
        <div className="flex justify-center h-48 w-48 items-center bg-carbon-pewter rounded-full">
          <Image
            src="/icon-192x192.png"
            alt="Ko Vozi?"
            width={168}
            height={168}
          />
        </div>
        <p className="text-5xl mt-1 text-carbon-pewter">Ko Vozi?</p>
        <a
          href={oauthUrl}
          className="flex relative w-64 h-14 rounded-xl shadow-xl mt-16 text-white bg-facebook-button"
          onClick={() => setShowSpinner(true)}
        >
          <svg className="h-10 m-2 absolute" viewBox="0 0 320 512">
            <path
              fill="currentColor"
              d="m279.1 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
            />
          </svg>

          <span className="text-3xl m-auto">Login</span>

          {showSpinner && (
            <svg className="h-10 m-2 absolute right-0" viewBox="0 0 128 128">
              <rect width="100%" height="100%" fill="transparent" />
              <g>
                <linearGradient id="a">
                  <stop offset="0%" stopColor="#D6D6D6" />
                  <stop offset="100%" />
                </linearGradient>
                <path
                  d="M64 0A64 64 0 1 1 0 64 64 64 0 0 1 64 0zm1 20a44 44 0 1 1-44 44 44 44 0 0 1 44-44z"
                  fill="url(#a)"
                  fillRule="evenodd"
                />
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 64 64"
                  to="360 64 64"
                  dur="1080ms"
                  repeatCount="indefinite"
                />
              </g>
            </svg>
          )}
        </a>

        {query?.error === "access_denied" && (
          <div>
            <span className="absolute transform -translate-x-1/2 mt-5 text-red-500">
              Alo momak! Logiraj se.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

Login.skipLayout = true;

export const getServerSideProps = async ({ req, res, query }) => {
  const isAuthenticated = checkAuth(req, res);

  // If user is authenticated, redirect to home /
  if (isAuthenticated)
    return { redirect: { destination: "/", permanent: false } };

  return { props: { query } };
};

export default Login;
