import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";

const User = ({ isActive, user, activeUserRef, nonActiveUserRef }) => {
  const imageSize = isActive ? "h-44 w-44" : "h-24 w-24";
  const nameSize = isActive ? "text-4xl" : "text-xl";
  const daySize = isActive ? "text-2xl" : "text-l";

  const marginTop = isActive ? "" : "mt-12";
  const width = isActive ? " w-52" : " w-32";

  const { name, picture } = user;

  return (
    <div
      ref={isActive ? activeUserRef : nonActiveUserRef}
      className={marginTop + width + " flex flex-col items-center px-5"}
    >
      <div
        className={
          imageSize +
          " flex justify-center items-center bg-carbon-pewter rounded-full"
        }
      >
        <Image
          // src="/icon-192x192.png"
          src={picture.large}
          alt="Ko Vozi?"
          width={isActive ? 160 : 84}
          height={isActive ? 160 : 84}
          className="rounded-full"
        />
      </div>
      <p
        className={nameSize + " mt-1 text-center text-white"}
      >{`${name.first} ${name.last}`}</p>
      <p className={daySize + " font-light text-carbon-pewter"}>Utorak</p>
      <p className="text-tiny font-light text-carbon-pewter">24.10.2021</p>
    </div>
  );
};

const TrenutnoVozi = () => {
  const userContainerRef = useRef(null);
  const activeUserRef = useRef();
  const nonActiveUserRef = useRef();

  const [users, setUsers] = useState([]);
  const [usersFetched, setUsersFetched] = useState(false);

  const [activeUser, setActiveUser] = useState("Mikkel");

  useEffect(() => {
    (async () => {
      const localUsers = localStorage.getItem("users");

      if (localUsers) {
        setUsers(JSON.parse(localUsers));
      } else {
        const randomUsers =
          !localUsers &&
          !usersFetched &&
          (await (
            await fetch(
              "https://randomuser.me/api/?seed=3113ef4b07df5334&inc=name,picture&results=11"
            )
          ).json());
        if (randomUsers) {
          setUsersFetched(true);
          setUsers(randomUsers.results);
          localStorage.setItem("users", JSON.stringify(randomUsers.results));
        }
      }
    })();
  }, []);

  // Condition for setting the active current user
  // TODO: will most likely be the current date.
  const condition = activeUser;

  // Find the index of the active current user
  const activeUserIndex = users.findIndex(
    user => user.name.first === condition
  );

  const centerUsersSection = () => {
    const halfUsersPlaceholder = Math.floor(
      userContainerRef.current?.getBoundingClientRect().width / 2
    );
    const halfActiveUserWidth = Math.floor(
      activeUserRef.current?.getBoundingClientRect().width / 2
    );
    const nonActiveUserWidth =
      nonActiveUserRef.current?.getBoundingClientRect().width;

    const offset = activeUserIndex * nonActiveUserWidth + halfActiveUserWidth;
    const fullUsersWidth =
      (users.length - 1) * nonActiveUserWidth + halfActiveUserWidth * 2;

    if (offset <= halfUsersPlaceholder)
      userContainerRef.current.style.paddingLeft = `${
        halfUsersPlaceholder - offset
      }px`;

    if (fullUsersWidth - offset <= halfUsersPlaceholder)
      userContainerRef.current.style.paddingRight = `${
        halfUsersPlaceholder - (fullUsersWidth - offset)
      }px`;

    userContainerRef.current.scrollTo(offset - halfUsersPlaceholder, 0);
  };

  useLayoutEffect(() => {
    activeUserRef.current && centerUsersSection();
    return () => {
      userContainerRef.current.style.paddingLeft = "0px";
      userContainerRef.current.style.paddingRight = "0px";
    };
  }, [users, activeUser]);

  return (
    <section className="overflow-x-hidden mt-5">
      <div
        ref={userContainerRef}
        className="flex overflow-x-auto scrollbar-hide"
      >
        {users.map((user, i) => (
          <User
            key={i}
            isActive={user.name.first === condition}
            user={user}
            activeUserRef={activeUserRef}
            nonActiveUserRef={nonActiveUserRef}
          />
        ))}
      </div>
      <button onClick={centerUsersSection}>Center</button>{" "}
      <button onClick={() => setActiveUser("Sondre")}>Sondre</button>{" "}
      <button onClick={() => setActiveUser("Ece")}>Ece</button>{" "}
      <button onClick={() => setActiveUser("Addison")}>Addison</button>{" "}
      <button onClick={() => setActiveUser("Anna")}>Anna</button>{" "}
      <button onClick={() => setActiveUser("Mina")}>Mina</button>{" "}
      <button onClick={() => setActiveUser("Kasper")}>Kasper</button>{" "}
      <button onClick={() => setActiveUser("Random")}>Random</button>{" "}
    </section>
  );
};

export default TrenutnoVozi;
