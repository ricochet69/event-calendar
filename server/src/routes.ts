import { Express, Request, Response } from "express";
import { getAllEvents } from "./controller/events.Controller";

export const eventRoutes = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.get("/calendar", getAllEvents);
};
