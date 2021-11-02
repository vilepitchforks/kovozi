import { useState } from "react";

import { getDay, getDate } from "../../../libs/dateFormat.js";

const KoIde = () => {
  const [checked, setChecked] = useState(false);

  return (
    <section className="flex justify-between md:justify-center mt-3">
      <span className="flex ml-1 w-64">
        <div className="relative">
          <input
            checked={checked}
            style={{
              filter: checked
                ? "drop-shadow(0px 0px 3px rgba(16, 185, 129, 1)) drop-shadow(0px 0px 3px rgba(16, 185, 129, 1))"
                : "drop-shadow(0px 0px 3px rgba(239, 68, 68, 1)) drop-shadow(0px 0px 3px rgba(239, 68, 68, 1))"
            }}
            type="checkbox"
            name="idem"
            id="idem"
            className="peer appearance-none cursor-pointer border border-red-500 rounded-full checked:border-green-500 w-12 h-7 transition-all duration-500"
            onChange={e => setChecked(e.target.checked)}
          />
          <span className="peer-checked:left-6 peer-checked:bg-green-500 transition-all duration-500 pointer-events-none w-5 h-5 block absolute top-1 left-1 rounded-full bg-red-500"></span>
        </div>
        <p className="ml-5 md:mr-5 text-xl text-carbon-pewter">
          {checked ? "Idem danas!" : "Ne idem danas."}
        </p>
      </span>
      <p className="flex items-baseline text-lg text-carbon-gray">
        {getDay()},
        <span className="flex items-center text-sm mx-1">{getDate()}</span>
      </p>
    </section>
  );
};

export default KoIde;
