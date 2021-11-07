import { useEffect, useState } from "react";
import Image from "next/image";

import { useGlobalCtx } from "../../../../pages/demo/index.js";

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
  const [goingUsers, setGoingUsers] = useState([]);

  const { users, user, idemId } = useGlobalCtx();

  useEffect(() => {
    let length = Math.round(Math.random() * users.length);
    length = length >= 1 ? length : length + 1;

    const fourUsers =
      users.length &&
      Array.from({ length }, (_, i) => {
        const randomIndex = Math.floor(Math.random() * users.length);
        return users[randomIndex];
      })
        .filter(filteredUser => filteredUser.id !== user.id)
        .reduce((acc, current) => acc.set(current.id, current), new Map())
        .values();

    // console.log(`fourUsers: `, [...fourUsers]);

    users.length && setGoingUsers([...fourUsers]);
  }, [users]);

  useEffect(() => {
    const filtered = goingUsers.filter(
      filteredUser => filteredUser.id !== user.id
    );
    if (idemId) {
      setGoingUsers([user, ...filtered]);
    } else {
      setGoingUsers(filtered);
    }
  }, [idemId]);

  return (
    <section className="mt-5">
      <div className="overflow-x-hidden">
        <p className="ml-1 mb-1 md:mx-auto md:w-3/5 text-sm text-carbon-gray">
          {goingUsers.length ? "Ko ide danas:" : "Nitko ne ide danas. :("}
        </p>
        <div
          className={`flex ${
            goingUsers.length < 4 ? "justify-evenly" : ""
          } mt-3 ${
            goingUsers.length < 8 ? "md:justify-center" : ""
          } overflow-auto scrollbar-hide`}
        >
          {goingUsers.length
            ? goingUsers.map((user, i) => <User key={user.id} user={user} />)
            : ""}
        </div>
      </div>
    </section>
  );
};

export default TkoIde;
