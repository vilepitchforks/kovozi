import { useEffect, useState } from "react";
import Image from "next/image";

import { getTruncYr, getRange } from "../../../libs/dateFormat";

const User = ({ user }) => {
  // const { name, picture } = user;

  return (
    <div className="flex flex-col items-center" title={user.user.name}>
      <div className="h-12 w-12 flex justify-center items-center bg-carbon-pewter rounded-full">
        <Image
          //   src="/icon-192x192.png"
          src={user.user.pictures.small.url}
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
  // const { name, range } = user;

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
        <p className="mx-2 text-sm">{user.user.name}</p>
        <p className="ml-4">
          {getRange({
            start: user.days[0],
            end: user.days[user.days.length - 1]
          })}
        </p>
        <p className="ml-4 mr-2">
          {isUser && " | "} {getTruncYr(user.days[user.days.length - 1])}
          {!isUser && " | "}
        </p>
      </div>
    </div>
  );
};

const Raspored = ({ user, raspored }) => {
  const [users, setUsers] = useState(raspored);

  // useEffect(() => {
  //   const localUsers = JSON.parse(localStorage.getItem("users")) || [];

  //   if (localUsers) setUsers(localUsers);
  // }, []);

  return (
    <section className="mt-5 mb-32 md:mx-auto md:w-3/5">
      <p className="ml-1 md:ml-0 mb-1 text-sm text-carbon-gray">
        {users.length ? "Raspored:" : "Raspored je prazan."}
      </p>
      <div className="mx-1 text-carbon-black">
        {users.map((item, i) => (
          <Item
            key={item._id}
            user={item}
            // isUser={i === Math.floor(Math.random() * users.length)}
            isUser={item._id === user._id}
            active={i === 1}
          />
        ))}
      </div>
    </section>
  );
};

export default Raspored;
