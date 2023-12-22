import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { boolean } from "zod";

interface User {
  email: string;
  password: string;
  emailToken: string;
  emailTokenExpires: Date;
  isVerified: boolean;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    emailToken: { type: String },
    emailTokenExpires: { type: Date, expires: 10, default: null },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: String, default: null },
    refreshToken: { type: String, default: null },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<User>("User", userSchema);

export { User, UserModel };
