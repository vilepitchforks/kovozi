import { Home, Privacy } from "../UtilityLinks/UtilityLinks";

const Footer = () => {
  return (
    <footer className="hidden fixed md:block left-0 bottom-0 text-carbon-pewter">
      <Home className="text-sm" />
      {" · "}
      <Privacy className="text-sm" />
      <p className="inline text-carbon-gray text-sm"> · · KoVozi © 2021</p>
    </footer>
  );
};

export default Footer;
