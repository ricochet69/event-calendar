import config from "config";
import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  // Check email
  const user = await UserModel.findOne({ email });

  if (!user) return res.sendStatus(401); //Unauthorised

  // Check password
  const isValid = await bcrypt.compare(password, user.password);
  if (isValid) {
    // Create access token
    const accessToken = signJwt(
      { id: user._id },
      { expiresIn: config.get("accessTokenTtl") } //15 minutes
    );

    // create refresh token
    const refreshToken = signJwt(
      { id: user._id },
      { expiresIn: config.get("refreshTokenTtl") } //1 year
    );

    //Save refresh token to user
    user.refreshToken = refreshToken;
    const result = await user.save();

    res.cookie("refresh", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "none", //cross-site cookie
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
}
