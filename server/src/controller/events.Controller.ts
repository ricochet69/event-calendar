import { Request, Response } from "express";
import eventData from "../data/eventData";

export const getAllEvents = (req: Request, res: Response) => {
  const userTimeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Test for saving to DB
  const myNewEvent = new Date(2023, 10, 5, 0, 1);
  console.log("My new event: ", myNewEvent);

  // Retrieve data from DB, then
  const dateFromDatabaseEXAMPLE = "2023-11-30T12:00:00Z";
  const utcDateTime = new Date(dateFromDatabaseEXAMPLE);
  console.log("UTC DATE TIME: ", utcDateTime);

  // Convert to local time zone
  const localDateTime = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: userTimeZone,
  }).format(utcDateTime);

  console.log("Local Date/Time: ", localDateTime);

  // res.send(localDateTime).status(200);
  res.json(eventData);
};

// export const createNewEvent = (req: Request, res: Response) => {
//   //
// };

// export const updateEvent = (req: Request, res: Response) => {
//   //
// };

// export const deleteEvent = (req: Request, res: Response) => {
//   //
// };
// export const getEvent = (req: Request, res: Response) => {
//   //
// };
