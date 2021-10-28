import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { colorScheme } from "../../config/constants.js";

const Navigation = () => {
  const { pathname } = useRouter();

  const activeBorder = path =>
    path === pathname ? "border-carbon-pewter" : "border-carbon-black";

  return (
    <nav className="fixed w-full z-10 bg-carbon-black">
      <div className="flex flex-row justify-between fixed bottom-0 w-full md:relative md:max-w-screen-md mx-auto bg-carbon-black">
        <div className="hidden md:flex items-center">
          <div className="flex justify-center items-center h-12 w-12 bg-carbon-pewter rounded-full">
            <Image
              src="/icon-192x192.png"
              alt="Ko Vozi?"
              width={38}
              height={38}
              className="rounded-full"
            />
          </div>
          <span className="mx-4 text-carbon-pewter">Ko Vozi ?</span>
        </div>

        <ul className="flex justify-evenly flex-1 h-11 md:h-12">
          <li
            className={`flex-1 border-t-2 md:border-t-0 md:border-b-2 ${activeBorder(
              "/"
            )}`}
          >
            <Link href="/">
              <a className="flex justify-center items-center h-full">
                <svg className="h-6 md:h-6" viewBox="0 0 576 512">
                  <path
                    fill={colorScheme.carbonPewter}
                    d="m512 288 1 160c0 35-29 64-64 64H326l-38-64 81-67c8-7 8-19 0-25l-118-93c-16-11-34 7-23 22l60 83-85 71c-6 5-9 13-4 21l31 52H128c-35 0-64-29-64-64V288H32c-18 0-32-14-32-32 0-9 3-17 10-24L266 8c7-7 15-8 22-8s15 2 22 7l255 225c8 7 12 15 11 24 0 18-15 32-32 32h-32z"
                  />
                </svg>
              </a>
            </Link>
          </li>
          <li
            className={`flex-1 border-t-2 md:border-t-0 md:border-b-2 ${activeBorder(
              "/stats"
            )}`}
          >
            <Link href="/stats">
              <a className="flex justify-center items-center h-full">
                <svg className="h-6 md:h-6" viewBox="0 0 576 512">
                  <path
                    fill={colorScheme.carbonPewter}
                    d="M560 288H323l157 158c6 6 16 6 22 1 38-37 65-86 73-141 2-10-6-18-15-18zm-17-65A241 241 0 0 0 320 0c-9-1-17 7-17 16l1 224h224c9 0 17-8 15-17zm-287 65V51c0-10-8-18-18-16A240 240 0 0 0 32 280c5 128 115 234 243 232 50-1 97-17 135-44 8-6 9-17 2-24L256 288z"
                  />
                </svg>
              </a>
            </Link>
          </li>
          <li
            className={`flex-1 border-t-2 md:border-t-0 md:border-b-2 ${activeBorder(
              "/dashboard"
            )}`}
          >
            <Link href="/dashboard">
              <a className="flex justify-center items-center h-full">
                <svg className="h-6 md:h-6" viewBox="0 0 576 512">
                  <path
                    fill="#D6D6D6"
                    d="M500 332c0-6-4-11-9-14l-46-27a199 199 0 0 0 0-70l46-27c5-3 8-8 8-14 0-14-42-99-63-99l-9 2-46 27c-18-15-39-27-61-35V21c0-7-5-14-13-16a251 251 0 0 0-102 0c-8 2-13 9-13 16v54c-22 8-43 20-61 35L85 83l-9-2c-19 0-63 82-63 99 0 6 3 11 8 14l46 27a193 193 0 0 0 0 70l-46 27c-5 3-8 8-8 14 0 14 42 99 63 99l9-2 46-27c18 15 39 27 61 35v54c0 7 5 14 13 16a256 256 0 0 0 102 0c8-3 13-9 13-16v-54c22-8 43-20 61-35l46 27 9 2c19 0 64-82 64-99zm-244 4a80 80 0 1 1 0-160 80 80 0 0 1 0 160z"
                  />
                </svg>
              </a>
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center">
          <span className="my-auto mx-4 text-carbon-pewter">John Doe</span>
          <div className="flex justify-center items-center h-9 w-9 bg-carbon-pewter rounded-full">
            <Image
              src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=4385160084852493&height=50&width=50&ext=1637657866&hash=AeTQQF8zhooHg7neMBM"
              alt="Ko Vozi?"
              width={28}
              height={28}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
