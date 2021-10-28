import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <h1>404 - Page Not Found</h1>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </>
  );
};

NotFound.skipLayout = true;

export default NotFound;
