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
