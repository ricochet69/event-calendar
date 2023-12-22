import { User, UserModel } from "../models/user.model";
import { Request, Response } from "express";

export const handleLogout = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.refresh) return res.sendStatus(204);
  const refreshToken = cookies.refresh;
  console.log("handle logout:");

  // Is refresh in DB
  const foundUser = await UserModel.findOne({ refreshToken: refreshToken }).exec();
  if (!foundUser) return res.sendStatus(204);

  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("refresh", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.sendStatus(204);
};
