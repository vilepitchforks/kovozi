import { Router } from "next/dist/client/router";
import NProgress from "nprogress";

import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import "nprogress/nprogress.css";

import Layout from "../components/Layout/Layout";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  // Do not apply global Layout. For example on Login and Error pages
  if (Component.skipLayout) return <Component {...pageProps} />;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
