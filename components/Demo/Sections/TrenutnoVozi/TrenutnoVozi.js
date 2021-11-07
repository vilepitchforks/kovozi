import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";

import { colorScheme } from "../../../../config/constants.js";
import { getDay, getDate } from "../../../../libs/dateFormat.js";

import { useGlobalCtx } from "../../../../pages/demo/index.js";

const User = ({ isActive, user, activeUserRef, nonActiveUserRef }) => {
  const imageSize = isActive ? "h-44 w-44" : "h-24 w-24";
  const nameSize = isActive ? "text-4xl" : "text-xl";
  const daySize = isActive ? "text-2xl" : "text-l";

  const marginTop = isActive ? "" : "mt-12";
  const marginBottom = isActive ? "" : "mb-16";
  const width = isActive ? " w-52" : " w-32";

  const { name, picture, drivesOn } = user;

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
      <p className={daySize + " font-light text-carbon-pewter"}>
        {getDay(drivesOn)}
      </p>
      <p className={marginBottom + " text-tiny font-light text-carbon-pewter"}>
        {getDate(drivesOn)}
      </p>
    </div>
  );
};

const TrenutnoVozi = () => {
  const userContainerRef = useRef(null);
  const activeUserRef = useRef();
  const nonActiveUserRef = useRef();

  const { users, vozimId } = useGlobalCtx();

  // Condition for setting the active current user
  // TODO: will most likely be the current date.
  // const condition = Math.floor(Math.random() * users?.length);
  const condition = vozimId || 0;

  // Find the index of the active current user
  const activeUserIndex = users.findIndex((user, i) => user.id === condition);

  // Dinamično računaj broj ljudi koji voze na određeni dan za slučaj da se više ljudi prijavi za vozit. Ako više ljudi vozi određeni dan, uzmi u obzir kod računanja offseta.
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
    centerUsersSection();
    return () => {
      userContainerRef.current.style.paddingLeft = "0px";
      userContainerRef.current.style.paddingRight = "0px";
    };
  }, [users, condition]);

  // const throttle = (fn, wait) => {
  //   if (time.current + wait - Date.now() < 0) {
  //     fn();
  //     time.current = Date.now();
  //   }
  // };

  // useEffect(() => {
  //   console.log(`showCenterBtn: `, showCenterBtn);
  //   console.log(
  //     `showCenterBtnInitState.current: `,
  //     showCenterBtnInitState.current
  //   );
  // });

  return (
    <section>
      <div className="overflow-x-hidden mt-5">
        <div
          ref={userContainerRef}
          className="flex overflow-x-auto scrollbar-hide"
          // onScroll={e => throttle(() => (showCenterBtn.current = true), 1000)}
          // onScroll={e =>
          //   throttle(() => {
          //     showCenterBtnInitState.current && setShowCenterBtn(true);
          //   }, 1000)
          // }
        >
          {users?.map((user, i) => (
            <User
              key={i}
              isActive={user.id === condition}
              user={user}
              activeUserRef={activeUserRef}
              nonActiveUserRef={nonActiveUserRef}
            />
          ))}
        </div>
      </div>
      <div className={`flex justify-end ${!users?.length && "hidden"}`}>
        <button
          className="noSelect flex items-center justify-between"
          onClick={() => {
            centerUsersSection();
            // showCenterBtnInitState.current = false;
            // setShowCenterBtn(false);
          }}
        >
          <svg className="h-4 ml-3 mr-1" viewBox="0 0 512 512">
            <path
              fill={colorScheme.carbonGray}
              d="M504 274 392 378a24 24 0 0 1-40-17v-73H32c-18 0-32-14-32-33s14-31 32-31h320v-72a24 24 0 0 1 40-18l112 104c11 10 11 26 0 36z"
            />
          </svg>
          <svg className="h-4 mr-3 ml-1" viewBox="0 0 512 512">
            <path
              fill={colorScheme.carbonGray}
              d="M512 256c0 18-14 32-32 32H160v72a24 24 0 0 1-40 18L8 274c-11-10-11-26 0-36l112-104a24 24 0 0 1 40 17v73h320c18 0 32 14 32 32z"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default TrenutnoVozi;
