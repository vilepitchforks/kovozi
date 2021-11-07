import React, { useEffect, useState } from "react";

import Navigation from "../Navigation/Navigation.js";
import NovaVoznjaBtn from "../Sections/NovaVoznjaBtn/NovaVoznjaBtn";
import Footer from "../Footer/Footer.js";

import { useGlobalCtx } from "../../../pages/demo/index.js";

const Layout = ({ children }) => {
  // const { user, users } = useUsers();

  // const childrenWithProps = React.Children.map(children, child => {
  //   if (React.isValidElement(child)) {
  //     return React.cloneElement(child, { user, users });
  //   }
  //   return child;
  // });

  const { user } = useGlobalCtx();

  return (
    <>
      <Navigation user={user} />
      <main className="md:mx-auto md:pt-12 md:max-w-screen-md ">
        {/* {childrenWithProps} */}
        {children}
      </main>
      <NovaVoznjaBtn />
      <Footer />
    </>
  );
};

export default Layout;
