import { useState } from "react";
import Image from "next/image";

const User = ({ user }) => {
  const { name, pictures } = user;

  return (
    <div className="flex flex-col items-center px-5" title={name}>
      <div className="h-20 w-20 flex justify-center items-center bg-green-300 bg-opacity-40 rounded-full">
        <Image
          // src="/icon-192x192.png"
          src={pictures.normal.url}
          alt="Ko Vozi?"
          width={68}
          height={68}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

const TkoIde = ({ tkoIde }) => {
  // const TkoIde = ({ idemVozimTkoIde }) => {
  // const [goingToday, setGoingToday] = useState(idemVozimTkoIde.danasIdu);

  return (
    <section className="mt-5">
      <div className="overflow-x-hidden">
        <p className="ml-1 mb-1 md:mx-auto md:w-3/5 text-sm text-carbon-gray">
          {/* {goingToday.length ? "Ko ide danas:" : "Nitko ne ide danas. :("} */}
          {tkoIde.length ? "Ko ide danas:" : "Nitko ne ide danas. :("}
        </p>
        <div
          className={`flex ${
            // goingToday.length < 4 ? "justify-evenly" : ""
            tkoIde.length < 4 ? "justify-evenly" : ""
          } mt-3 ${
            // goingToday.length < 8 ? "md:justify-center" : ""
            tkoIde.length < 8 ? "md:justify-center" : ""
          } overflow-auto scrollbar-hide`}
        >
          {tkoIde.map((user, i) => (
            // <User key={user._id} user={user} />
            <User key={user._id} user={user} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TkoIde;
