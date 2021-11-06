import React, { useEffect, useState } from "react";

import Navigation from "../Navigation/Navigation.js";
import NovaVoznjaBtn from "../Sections/NovaVoznjaBtn/NovaVoznjaBtn";
import Footer from "../Footer/Footer.js";

const Layout = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const localUsers = localStorage.getItem("users");
      if (localUsers && JSON.parse(localUsers)[0].range) {
        setUsers(JSON.parse(localUsers));
      } else {
        const randomUsers = await fetch(
          "https://randomuser.me/api/?inc=name,picture&results=7"
        ).then(res => res.json());

        if (randomUsers) {
          const processed = randomUsers.results.map((user, i) => {
            const offset = Math.round(Math.random() * 7);

            let start = new Date().setDate(i);
            let end = new Date().setDate(i + offset * 3);
            if (i === 3) start = end;

            return {
              ...user,
              drivesOn: new Date().setDate(i),
              range: {
                start,
                end
              }
            };
          });
          setUsers(processed);
          localStorage.setItem("users", JSON.stringify(processed));
        }
      }
    })();
  }, []);

  const childrenWithProps = React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { users });
    }
    return child;
  });

  return (
    <>
      <Navigation />
      <main className="md:mx-auto md:pt-12 md:max-w-screen-md ">
        {/* {children} */}
        {childrenWithProps}
      </main>
      <NovaVoznjaBtn />
      <Footer />
    </>
  );
};

export default Layout;
