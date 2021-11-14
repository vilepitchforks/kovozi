import { useState } from "react";
import Image from "next/image";
import Calendar from "react-calendar";
import { differenceInCalendarDays, parseISO } from "date-fns";

import "react-calendar/dist/Calendar.css";
import { getKalendar } from "../libs/dataHelpers";
import { checkAuth } from "../libs/authHelpers";
import DB from "../libs/db.class.js";

function isSameDay(a, b) {
  return differenceInCalendarDays(parseISO(a), b) === 0;
}

function Stats({ kalendar }) {
  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }

  function tileContent({ date, view }) {
    // Add class to tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      const user = kalendar.find(day => isSameDay(day.day, date));

      if (user) {
        return (
          <div className="h-9 w-9 flex justify-center items-center bg-carbon-pewter rounded-full">
            <Image
              // src="/icon-192x192.png"
              src={user.user.pictures.small.url}
              alt="Ko Vozi?"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
        );
      }
    }
  }

  return (
    <Calendar onChange={onChange} value={value} tileContent={tileContent} />
  );
}

export const getServerSideProps = async ({ req, res, query }) => {
  const isAuthenticated = checkAuth(req, res);

  // If user is authenticated, redirect to home /
  if (!isAuthenticated)
    return { redirect: { destination: "/login", permanent: false } };

  // const kalendar = await getKalendar();
  const kalendar = await DB.getKalendar();

  return { props: { kalendar } };
};

export default Stats;
