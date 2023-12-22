import { Request, Response } from "express";
import { User, UserModel } from "../models/user.model";
import config from "config";
import { Omit } from "lodash";
import logger from "../utils/logger";
import { newUserInput } from "../schema/user.schema";
import crypto from "crypto";
import bcrypt from "bcrypt";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(config.get<string>("sendGridApiKey"));

export async function handleNewUser(req: Request<{}, {}, newUserInput["body"]>, res: Response) {
  const { email, password } = req.body;

  const isDuplicate = await UserModel.findOne({ email: email }).exec();
  if (isDuplicate) return res.sendStatus(409);

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hash(password, salt);
  const hashedPw = hash;

  const emailToken = crypto.randomBytes(64).toString("hex");
  const emailTokenExpires = new Date(Date.now() + 60 * 1000 * 10); // Expires 10 mins from now

  try {
    const sanitizedInput: Omit<
      User,
      | "createdAt"
      | "updatedAt"
      | "comparePassword"
      | "isVerified"
      | "resetPasswordToken"
      | "resetPasswordExpires"
      | "refreshToken"
    > = {
      email: email,
      password: hashedPw,
      emailToken: emailToken,
      emailTokenExpires: emailTokenExpires,
    };

    const user = await UserModel.create(sanitizedInput);
    return res.status(201).json(user);
  } catch (e: any) {
    logger.error(e);
    res.status(500).json({ message: e.message });
    throw new Error(e.message);
  }
}
