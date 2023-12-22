import { Express, Request, Response } from "express";
import { getAllEvents } from "./controller/calendarEvents.controller";
import { handleNewUser } from "./controller/register.controller";
import validateResource from "./middleware/validateResource";
import { newUserSchema } from "./schema/user.schema";
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/auth.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";
import { verifyJWT } from "./middleware/verifyJwt";
import { handleRefreshToken } from "./controller/refreshToken.controller";
import { handleLogout } from "./controller/logout.controller";

export const routes = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  app.get("/", (req: Request, res: Response) => res.send("Home page").status(200));

  // app.post("/register", validateResource(newUserSchema), handleNewUser);
  // app.post("/login", validateResource(createSessionSchema), createUserSessionHandler);
  // app.post("/logout", verifyJWT, handleLogout);
  // app.get("/refresh", handleRefreshToken);

  // 404
  app.all("*", (req: Request, res: Response) => res.send("404 - Page not found").status(404));
};
