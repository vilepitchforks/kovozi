import { useEffect, useState } from "react";
import Image from "next/image";

import { getTruncYr, getRange } from "../../../../libs/dateFormat";

const User = ({ user }) => {
  const { name, picture } = user;

  return (
    <div
      className="flex flex-col items-center"
      title={`${name.first} ${name.last}`}
    >
      <div className="h-12 w-12 flex justify-center items-center bg-carbon-pewter rounded-full">
        <Image
          //   src="/icon-192x192.png"
          src={picture.large}
          alt="Ko Vozi?"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

const Item = ({ user, isUser, active }) => {
  const { name, range } = user;

  const flexOrder = isUser
    ? "flex items-center"
    : "flex items-center flex-row-reverse";

  const borderRadius = isUser
    ? "rounded-bl-xl rounded-tr-xl rounded-br-xl"
    : "rounded-tl-xl rounded-bl-xl rounded-br-xl";

  const activeBck = active ? "bg-carbon-pewter" : "bg-carbon-gray";

  return (
    <div className={`${flexOrder} mt-3 flex items-center`}>
      <User user={user} />
      <div className={`${flexOrder} mx-2 h-12 ${activeBck} ${borderRadius}`}>
        <p className="mx-2 text-sm">{`${name.first} ${name.last}`}</p>
        <p className="ml-4">{getRange(range)}</p>
        <p className="ml-4 mr-2">
          {isUser && " | "} {getTruncYr(range.end)} {!isUser && " | "}
        </p>
      </div>
    </div>
  );
};

const Raspored = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (localUsers) setUsers(localUsers);
  }, []);

  return (
    <section className="mt-5 mb-32 md:mx-auto md:w-3/5">
      <p className="ml-1 md:ml-0 mb-1 text-sm text-carbon-gray">
        {users.length ? "Raspored:" : "Raspored je prazan."}
      </p>
      <div className="mx-1 text-carbon-black">
        {users.map((user, i) => (
          <Item
            key={i}
            user={user}
            isUser={i === Math.floor(Math.random() * users.length)}
            active={i === 1}
          />
        ))}
      </div>
    </section>
  );
};

export default Raspored;
