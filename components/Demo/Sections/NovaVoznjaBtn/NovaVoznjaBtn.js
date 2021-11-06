import Link from "next/link";

import { colorScheme } from "../../../../config/constants.js";

const NovaVoznjaBtn = () => {
  return (
    <section className="fixed right-5 bottom-14 md:bottom-5 w-12 h-12 rounded-full filter drop-shadow-md bg-carbon-pewter">
      <Link href="/demo/new">
        <a title="Novi unos" href="" className="noSelect">
          <svg className="w-12 h-12" viewBox="0 0 448 512">
            <path
              fill={colorScheme.carbonEbony}
              d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99h144v-144C192 62.32 206.33 48 224 48s32 14.32 32 32.01v144h144c17.7-.01 32 14.29 32 31.99z"
            />
          </svg>
        </a>
      </Link>
    </section>
  );
};

export default NovaVoznjaBtn;
