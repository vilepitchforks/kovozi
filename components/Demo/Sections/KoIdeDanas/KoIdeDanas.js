import { useEffect, useState } from "react";
import Image from "next/image";

const User = ({ user }) => {
  const { name, picture } = user;

  return (
    <div
      className="flex flex-col items-center px-5"
      title={`${name.first} ${name.last}`}
    >
      <div className="h-20 w-20 flex justify-center items-center bg-green-300 bg-opacity-40 rounded-full">
        <Image
          // src="/icon-192x192.png"
          src={picture.large}
          alt="Ko Vozi?"
          width={68}
          height={68}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

const TkoIde = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];

    let length = Math.round(Math.random() * localUsers.length);
    length = length >= 1 ? length : length + 1;

    const fourUsers =
      localUsers.length &&
      Array.from({ length }, (_, i) => {
        const randomIndex = Math.floor(Math.random() * localUsers.length);
        return localUsers[randomIndex];
      });

    if (fourUsers) setUsers(fourUsers);
  }, []);

  return (
    <section className="mt-5">
      <div className="overflow-x-hidden">
        <p className="ml-1 mb-1 md:mx-auto md:w-3/5 text-sm text-carbon-gray">
          {users.length ? "Ko ide danas:" : "Nitko ne ide danas. :("}
        </p>
        <div
          className={`flex ${users.length < 4 ? "justify-evenly" : ""} mt-3 ${
            users.length < 8 ? "md:justify-center" : ""
          } overflow-auto scrollbar-hide`}
        >
          {users.map((user, i) => (
            <User key={i} user={user} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TkoIde;
