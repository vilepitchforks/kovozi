import Image from "next/image";

const User = ({ current }) => {
  const imageSize = current ? "h-44 w-44" : "h-24 w-24";
  const nameSize = current ? "text-4xl" : "text-xl";
  const daySize = current ? "text-2xl" : "text-l";

  return (
    <div className="flex flex-col items-center mx-5">
      <div
        className={
          imageSize +
          " flex justify-center items-center bg-carbon-pewter rounded-full"
        }
      >
        <Image
          className=""
          src="/icon-192x192.png"
          alt="Ko Vozi?"
          width={current ? 160 : 84}
          height={current ? 160 : 84}
        />
      </div>
      <p className={nameSize + " mt-1 text-center text-white"}>Jane Doe</p>
      <p className={daySize + " font-light text-carbon-pewter"}>Utorak</p>
      <p className="text-tiny font-light text-carbon-pewter">24.10.2021</p>
    </div>
  );
};

const TrenutnoVozi = () => {
  return (
    <section className="overflow-x-hidden mt-5">
      <div className="flex items-center px-72 overflow-x-auto scrollbar-hide">
        <User current={false} />
        <User current={true} />
        <User current={false} />
        <User current={false} />
        <User current={false} />
        <User current={false} />
        <User current={false} />
        <User current={false} />
      </div>
    </section>
  );
};

export default TrenutnoVozi;
