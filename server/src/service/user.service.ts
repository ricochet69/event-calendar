import { FilterQuery } from "mongoose";
import { User, UserModel } from "../models/user.model";
import { omit } from "lodash";
// import { sgMail } from "@sendgrid/mail";

// export async function createUser(
//   input: Omit<
//     User,
//     | "createdAt"
//     | "updatedAt"
//     | "comparePassword"
//     | "isVerified"
//     | "resetPasswordToken"
//     | "resetPasswordExpires"
//     | "refreshToken"
//   >
// ) {
//   try {
//     const user = await UserModel.create(input);
//     return omit(user.toJSON(), "password");
//   } catch (e: any) {
//     throw new Error(e);
//   }
// }

// export async function validatePassword({ email, password }: { email: string; password: string }) {
//   const user = await UserModel.findOne({ email });

//   if (!user) {
//     return false;
//   }

//   const isValid = await user.comparePassword(password);

//   if (!isValid) return false;

//   return omit(user.toJSON(), "password");
// }

export async function findUser(query: FilterQuery<User>) {
  return UserModel.findOne(query).lean();
}
