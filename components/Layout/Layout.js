import Footer from "../Footer/Footer.js";
import Navigation from "../Navigation/Navigation.js";

const Layout = ({ children }) => {
  return (
    <div className="">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
