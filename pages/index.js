import Image from "next/image";
import Link from "next/link";

import MetaHead from "../components/MetaHead/MetaHead";
import TrenutnoVozi from "../components/TrenutnoVozi/TrenutnoVozi";

import { checkAuth, getAuthUser } from "../libs/authHelpers";

export default function Home({ user }) {
  return (
    <>
      <MetaHead>
        <title>{user.name ? user.name + " | KoVozi" : "KoVozi"}</title>
      </MetaHead>
      <TrenutnoVozi />
      <Link href="/api/logout">
        <a>Logout</a>
      </Link>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sunt
        odit voluptas nam aliquid quisquam aliquam nihil assumenda, ipsam,
        aspernatur laboriosam eligendi perspiciatis libero dolor ea harum
        mollitia dignissimos praesentium. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corrupti, suscipit explicabo, atque laborum, quae
        similique quod deserunt natus dolor tempora eos vero exercitationem
        doloremque id quam cum? Iusto, officia dignissimos.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sunt
        odit voluptas nam aliquid quisquam aliquam nihil assumenda, ipsam,
        aspernatur laboriosam eligendi perspiciatis libero dolor ea harum
        mollitia dignissimos praesentium. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corrupti, suscipit explicabo, atque laborum, quae
        similique quod deserunt natus dolor tempora eos vero exercitationem
        doloremque id quam cum? Iusto, officia dignissimos.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sunt
        odit voluptas nam aliquid quisquam aliquam nihil assumenda, ipsam,
        aspernatur laboriosam eligendi perspiciatis libero dolor ea harum
        mollitia dignissimos praesentium. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corrupti, suscipit explicabo, atque laborum, quae
        similique quod deserunt natus dolor tempora eos vero exercitationem
        doloremque id quam cum? Iusto, officia dignissimos.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sunt
        odit voluptas nam aliquid quisquam aliquam nihil assumenda, ipsam,
        aspernatur laboriosam eligendi perspiciatis libero dolor ea harum
        mollitia dignissimos praesentium. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corrupti, suscipit explicabo, atque laborum, quae
        similique quod deserunt natus dolor tempora eos vero exercitationem
        doloremque id quam cum? Iusto, officia dignissimos.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sunt
        odit voluptas nam aliquid quisquam aliquam nihil assumenda, ipsam,
        aspernatur laboriosam eligendi perspiciatis libero dolor ea harum
        mollitia dignissimos praesentium. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corrupti, suscipit explicabo, atque laborum, quae
        similique quod deserunt natus dolor tempora eos vero exercitationem
        doloremque id quam cum? Iusto, officia dignissimos.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sunt
        odit voluptas nam aliquid quisquam aliquam nihil assumenda, ipsam,
        aspernatur laboriosam eligendi perspiciatis libero dolor ea harum
        mollitia dignissimos praesentium. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corrupti, suscipit explicabo, atque laborum, quae
        similique quod deserunt natus dolor tempora eos vero exercitationem
        doloremque id quam cum? Iusto, officia dignissimos.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sunt
        odit voluptas nam aliquid quisquam aliquam nihil assumenda, ipsam,
        aspernatur laboriosam eligendi perspiciatis libero dolor ea harum
        mollitia dignissimos praesentium. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corrupti, suscipit explicabo, atque laborum, quae
        similique quod deserunt natus dolor tempora eos vero exercitationem
        doloremque id quam cum? Iusto, officia dignissimos.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sunt
        odit voluptas nam aliquid quisquam aliquam nihil assumenda, ipsam,
        aspernatur laboriosam eligendi perspiciatis libero dolor ea harum
        mollitia dignissimos praesentium. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corrupti, suscipit explicabo, atque laborum, quae
        similique quod deserunt natus dolor tempora eos vero exercitationem
        doloremque id quam cum? Iusto, officia dignissimos.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sunt
        odit voluptas nam aliquid quisquam aliquam nihil assumenda, ipsam,
        aspernatur laboriosam eligendi perspiciatis libero dolor ea harum
        mollitia dignissimos praesentium. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corrupti, suscipit explicabo, atque laborum, quae
        similique quod deserunt natus dolor tempora eos vero exercitationem
        doloremque id quam cum? Iusto, officia dignissimos.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sunt
        odit voluptas nam aliquid quisquam aliquam nihil assumenda, ipsam,
        aspernatur laboriosam eligendi perspiciatis libero dolor ea harum
        mollitia dignissimos praesentium. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corrupti, suscipit explicabo, atque laborum, quae
        similique quod deserunt natus dolor tempora eos vero exercitationem
        doloremque id quam cum? Iusto, officia dignissimos.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sunt
        odit voluptas nam aliquid quisquam aliquam nihil assumenda, ipsam,
        aspernatur laboriosam eligendi perspiciatis libero dolor ea harum
        mollitia dignissimos praesentium. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corrupti, suscipit explicabo, atque laborum, quae
        similique quod deserunt natus dolor tempora eos vero exercitationem
        doloremque id quam cum? Iusto, officia dignissimos.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sunt
        odit voluptas nam aliquid quisquam aliquam nihil assumenda, ipsam,
        aspernatur laboriosam eligendi perspiciatis libero dolor ea harum
        mollitia dignissimos praesentium. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corrupti, suscipit explicabo, atque laborum, quae
        similique quod deserunt natus dolor tempora eos vero exercitationem
        doloremque id quam cum? Iusto, officia dignissimos.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sunt
        odit voluptas nam aliquid quisquam aliquam nihil assumenda, ipsam,
        aspernatur laboriosam eligendi perspiciatis libero dolor ea harum
        mollitia dignissimos praesentium. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corrupti, suscipit explicabo, atque laborum, quae
        similique quod deserunt natus dolor tempora eos vero exercitationem
        doloremque id quam cum? Iusto, officia dignissimos.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sunt
        odit voluptas nam aliquid quisquam aliquam nihil assumenda, ipsam,
        aspernatur laboriosam eligendi perspiciatis libero dolor ea harum
        mollitia dignissimos praesentium. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corrupti, suscipit explicabo, atque laborum, quae
        similique quod deserunt natus dolor tempora eos vero exercitationem
        doloremque id quam cum? Iusto, officia dignissimos.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sunt
        odit voluptas nam aliquid quisquam aliquam nihil assumenda, ipsam,
        aspernatur laboriosam eligendi perspiciatis libero dolor ea harum
        mollitia dignissimos praesentium. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corrupti, suscipit explicabo, atque laborum, quae
        similique quod deserunt natus dolor tempora eos vero exercitationem
        doloremque id quam cum? Iusto, officia dignissimos.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur sunt
        odit voluptas nam aliquid quisquam aliquam nihil assumenda, ipsam,
        aspernatur laboriosam eligendi perspiciatis libero dolor ea harum
        mollitia dignissimos praesentium. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Corrupti, suscipit explicabo, atque laborum, quae
        similique quod deserunt natus dolor tempora eos vero exercitationem
        doloremque id quam cum? Iusto, officia dignissimos.
      </p>
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const redirect = { redirect: { destination: "/login", permanent: false } };

  const isAuthenticated = checkAuth(req, res);

  // If user is not authenticated, redirect to /login
  if (!isAuthenticated) return redirect;

  // Get existing user
  const user = await getAuthUser(req, res);

  if (user) return { props: { user } };

  return redirect;
};
