import express from "express";
import path from "path";
import config from "config";
import connect from "./utils/connect";
import seedEvents from "./utils/seedEvents";
import logger from "./utils/logger";
import errorHandler from "./middleware/errorHandler";
import cors from "cors";
import { routes } from "./routes";

import calendarRoutes from "./routes/calendar.routes";
import deserializeUser from "./middleware/deserializeUser";
import cookieParser from "cookie-parser";
const app = express();
const port = config.get<number>("port");

// Need Logger
const whiteList = ["http://localhost:5173", "http://localhost:1337"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(deserializeUser);

app.use(cookieParser());

// Server stattic file (favicon etc)
app.use(express.static(path.join(__dirname, "/public")));

app.use("/api", calendarRoutes);

// routes(app);

app.use(errorHandler);

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
  // await seedEvents();
});
