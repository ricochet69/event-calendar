import { Request, Response, NextFunction } from "express";
import config from "config";
import jwt from "jsonwebtoken";

const publicKey = config.get<string>("publicKey");

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  console.log(authHeader); //Bearer token

  const token = authHeader.split(" ")[1];

  jwt.verify(token, publicKey, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    if ((res.locals.user = decoded)) {
      console.log("token decoded");
    }

    next();
  });
};
