import Navigation from "../Navigation/Navigation.js";
import NovaVoznjaBtn from "../Sections/NovaVoznjaBtn/NovaVoznjaBtn";
import Footer from "../Footer/Footer.js";

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className="md:mx-auto md:pt-12 md:max-w-screen-md ">
        {children}
      </main>
      <NovaVoznjaBtn />
      <Footer />
    </>
  );
};

export default Layout;
