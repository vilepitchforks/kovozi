import Link from "next/link";

const Footer = () => {
  return (
    <footer className="">
      {/* <footer className="hidden lg:block"> */}
      <Link href="/privacy">
        <a>Privacy</a>
      </Link>
    </footer>
  );
};

export default Footer;
