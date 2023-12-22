import config from "config";
import { Request, Response } from "express";
import { User, UserModel } from "../models/user.model";
import { signJwt } from "../utils/jwt.utils";
import jwt from "jsonwebtoken";

const publicKey = config.get<string>("publicKey");
const privateKey = config.get<string>("privateKey");

export async function handleRefreshToken(req: Request, res: Response) {
  const cookies = req.cookies;

  if (!cookies?.refresh) return res.sendStatus(401);

  const refreshToken = cookies.refresh;
  console.log(refreshToken);

  const foundUser = await UserModel.findOne({ refreshToken: refreshToken }).exec();
  console.log("found user: ", foundUser);
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, publicKey, (err, decoded) => {
    console.log(foundUser.id);
    console.log(decoded.id);
    if (err || foundUser.id !== decoded.id) return res.sendStatus(403);
    const accessToken = signJwt({ user: decoded.id }, { expiresIn: config.get("accessTokenTtl") });
    res.send(accessToken);
  });
}
