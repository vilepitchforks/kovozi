import { useEffect, useState } from "react";
import Image from "next/image";

const User = ({ user }) => {
  const { name, picture } = user;

  return (
    <div
      className="flex flex-col items-center px-5"
      title={`${name.first} ${name.last}`}
    >
      <div className="h-14 w-14 flex justify-center items-center bg-green-300 rounded-full">
        <Image
          // src="/icon-192x192.png"
          src={picture.large}
          alt="Ko Vozi?"
          width={48}
          height={48}
          className="rounded-full"
        />
      </div>
      {/* <p className="text-sm mt-1 text-center text-carbon-pewter">{`${name.first} ${name.last}`}</p> */}
    </div>
  );
};

const TkoIde = () => {
  const [users, setUsers] = useState([
    {
      name: { first: "John", last: "Doe" },
      picture: { large: "/icon-192x192.png" }
    }
  ]);

  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];

    const fourUsers =
      localUsers.length &&
      Array.from({ length: 4 }, (_, i) => {
        const randomIndex = Math.floor(Math.random() * localUsers.length);
        return localUsers[randomIndex];
      });

    if (fourUsers) setUsers(fourUsers);
  }, []);

  return (
    <section className="mt-3">
      <div className="overflow-hidden">
        <div className="flex md:justify-center">
          <p className="ml-1 mb-1 md:w-96 text-sm text-carbon-gray">Ko Ide:</p>
        </div>
        <div className="flex justify-between mt-3 md:justify-center overflow-auto scrollbar-hide">
          {users.map((user, i) => (
            <User key={i} user={user} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TkoIde;
