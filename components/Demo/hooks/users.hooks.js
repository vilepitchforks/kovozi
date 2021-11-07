import { useEffect, useState } from "react";

export const useUsers = () => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const localUser = localStorage.getItem("user");
      const localUsers = localStorage.getItem("users");

      if (
        localUsers &&
        JSON.parse(localUsers)[0].range &&
        localUser &&
        JSON.parse(localUser).id
      ) {
        setUser(JSON.parse(localUser));
        setUsers(JSON.parse(localUsers));
      } else {
        const randomUsers = await fetch(
          "https://randomuser.me/api/?inc=name,picture&results=7"
        ).then(res => res.json());

        if (randomUsers) {
          const processed = randomUsers.results.map((user, i) => {
            const offset = Math.round(Math.random() * 7);

            let start = new Date().setDate(i);
            let end = new Date().setDate(i + offset * 3);
            if (i === 3) start = end;

            return {
              ...user,
              id: Math.floor(Math.random() * 90000 + 10000),
              drivesOn: new Date().setDate(i),
              range: {
                start,
                end
              }
            };
          });
          const randomIndex = Math.floor(Math.random() * processed.length);
          const randUser = processed[randomIndex];
          console.log(`randUser`, randUser);
          localStorage.setItem("user", JSON.stringify(randUser));
          localStorage.setItem("users", JSON.stringify(processed));
          setUser(randUser);
          setUsers(processed);
        }
      }
    })();
  }, []);
  return { user, users };
};

export const useUserId = () => {
  const [idemId, setIdemId] = useState(null);
  const [vozimId, setVozimId] = useState(null);

  return {
    idemId,
    setIdemId,
    vozimId,
    setVozimId
  };
};
