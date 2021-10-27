import Footer from "../Footer/Footer.js";
import Navigation from "../Navigation/Navigation.js";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className="md:mx-auto md:pt-12 md:max-w-screen-md ">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
