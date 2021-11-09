const days = [
  "Nedjelja",
  "Ponedjeljak",
  "Utorak",
  "Srijeda",
  "Četvrtak",
  "Petak",
  "Subota"
];

export const getDay = date => {
  const selectedDay = date ? new Date(date) : new Date();
  // Returns the name of the current day of the week from "days" array
  return days[selectedDay.getDay()];
};

export const getDate = date => {
  const selectedDay = date ? new Date(date) : new Date();

  const day = selectedDay.getDate();
  const month = selectedDay.getMonth() + 1;
  const year = selectedDay.getFullYear();
  // Returns the current date in format: 29.10.2021
  return day + "." + month + "." + year;
};

export const getDayMonth = date => {
  const selectedDay = date ? new Date(date) : new Date();

  const day = selectedDay.getDate();
  const month = selectedDay.getMonth() + 1;
  // Returns the current date in format: 29.10.
  return day + "." + month + ".";
};

export const getTruncYr = date => {
  const selectedDay = date ? new Date(date) : new Date();

  // Returns the current year in format: '21
  return "'" + selectedDay.getFullYear().toString().slice(-2);
};

export const getRange = range => {
  if (getDate(range.start) === getDate(range.end)) {
    // If start and end dates are the same, returns the current date in format: 29.10.
    return getDayMonth(range.start);
  } else {
    // Otherwise, returns the range of the current dates in format: 29.10. - 30.10.
    return `${getDayMonth(range.start)} - ${getDayMonth(range.end)}`;
  }
};

export const getDateStd = date => {
  const selectedDay = date ? new Date(date) : new Date();

  let day = selectedDay.getDate();
  let month = selectedDay.getMonth() + 1;
  const year = selectedDay.getFullYear();

  day = day > 9 ? day : "0" + day;
  month = month > 9 ? month : "0" + month;
  // Returns the current date in format: 2021-10-29
  return year + "-" + month + "-" + day;
};
