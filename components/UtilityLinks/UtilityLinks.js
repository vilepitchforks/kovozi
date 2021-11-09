import Link from "next/link";

export const Home = ({ className }) => (
  <Link href="/">
    <a className={className}>Početna</a>
  </Link>
);

export const Privacy = ({ className }) => (
  <Link href="/privacy">
    <a className={className}>Privatnost</a>
  </Link>
);

export const Demo = () => (
  <Link href="/demo">
    <a>Demo</a>
  </Link>
);

export const Logout = () => (
  <Link href="/api/logout">
    <a>Logout</a>
  </Link>
);
