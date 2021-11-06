import { useState } from "react";

import { getDay, getDate } from "../../../../libs/dateFormat.js";

const IdemDanasToggle = ({
  idemDanasChecked,
  setIdemDanasChecked,
  setVozimDanasChecked
}) => (
  <span className="flex ml-1 w-64">
    <div className="relative">
      <input
        checked={idemDanasChecked}
        style={{
          filter: idemDanasChecked
            ? "drop-shadow(0px 0px 3px rgba(16, 185, 129, 1)) drop-shadow(0px 0px 3px rgba(16, 185, 129, 1))"
            : "drop-shadow(0px 0px 3px rgba(239, 68, 68, 1)) drop-shadow(0px 0px 3px rgba(239, 68, 68, 1))"
        }}
        type="checkbox"
        name="idem"
        id="idem"
        className="noSelect peer appearance-none cursor-pointer border border-red-500 rounded-full checked:border-green-500 w-12 h-7 transition-all duration-500"
        onChange={e => {
          setIdemDanasChecked(e.target.checked);
          // Disable VozimDanas state if IdemDanas is set to false
          !e.target.checked && setVozimDanasChecked(false);
        }}
      />
      <span className="peer-checked:left-6 peer-checked:bg-green-500 transition-all duration-500 pointer-events-none w-5 h-5 block absolute top-1 left-1 rounded-full bg-red-500"></span>
    </div>
    <label htmlFor="idem" className="ml-5 md:mr-5 text-xl text-carbon-pewter">
      {idemDanasChecked ? "Idem danas!" : "Ne idem danas."}
    </label>
  </span>
);

const VozimDanasToggle = ({
  vozimDanasChecked,
  setVozimDanasChecked,
  idemDanasChecked
}) => {
  const calcChecked = () => {
    if (idemDanasChecked && vozimDanasChecked) return true;
    if (!idemDanasChecked) return false;
  };

  const calcShadow = () => {
    if (!idemDanasChecked) return "";
    if (vozimDanasChecked) {
      return "drop-shadow(0px 0px 3px rgba(16, 185, 129, 1)) drop-shadow(0px 0px 3px rgba(16, 185, 129, 1))";
    } else {
      return "drop-shadow(0px 0px 3px rgba(239, 68, 68, 1)) drop-shadow(0px 0px 3px rgba(239, 68, 68, 1))";
    }
  };

  const calcToggleBorder = () =>
    idemDanasChecked
      ? "cursor-pointer border-red-500 checked:border-green-500"
      : "border-carbon-gray";

  const calcToggleButton = () =>
    idemDanasChecked
      ? "bg-red-500 peer-checked:bg-green-500"
      : "bg-carbon-gray";

  return (
    <span className="flex ml-1 w-64">
      <div className="relative">
        <input
          checked={calcChecked()}
          disabled={!idemDanasChecked}
          style={{
            filter: calcShadow()
          }}
          type="checkbox"
          name="vozim"
          id="vozim"
          className={`noSelect peer appearance-none border ${calcToggleBorder()} rounded-full w-12 h-7 transition-all duration-500`}
          onChange={e => setVozimDanasChecked(e.target.checked)}
        />
        <span
          className={`peer-checked:left-6 ${calcToggleButton()} transition-all duration-500 pointer-events-none w-5 h-5 block absolute top-1 left-1 rounded-full`}
        ></span>
      </div>
      <label
        htmlFor="vozim"
        className="ml-5 md:mr-5 text-xl text-carbon-pewter"
      >
        {calcChecked() ? "Vozim!" : "Ne vozim."}
      </label>
    </span>
  );
};

const IdemVozimDanas = () => {
  const [idemDanasChecked, setIdemDanasChecked] = useState(false);
  const [vozimDanasChecked, setVozimDanasChecked] = useState(false);

  return (
    <section className="flex flex-wrap justify-between md:justify-center mt-3">
      <IdemDanasToggle
        idemDanasChecked={idemDanasChecked}
        setIdemDanasChecked={setIdemDanasChecked}
        setVozimDanasChecked={setVozimDanasChecked}
      />
      <VozimDanasToggle
        vozimDanasChecked={vozimDanasChecked}
        setVozimDanasChecked={setVozimDanasChecked}
        idemDanasChecked={idemDanasChecked}
      />
      <p className="flex items-baseline absolute right-0 sm:relative text-lg text-carbon-gray">
        {getDay()},
        <span className="flex items-center text-sm mx-1">{getDate()}</span>
      </p>
    </section>
  );
};

export default IdemVozimDanas;
