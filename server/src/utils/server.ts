import express from "express";
import { eventRoutes } from "../routes";
import cors from "cors";

function createServer() {
  const app = express();

  app.use(express.json());

  app.use(cors());
  // Validate User

  eventRoutes(app);

  return app;
}

export default createServer;
