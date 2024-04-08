import mongoose, { Schema } from "mongoose";
import { IUser } from "../lib/types";

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    maxLength: 12 ,
    match: /^[a-zA-Z]+$/,
  },
  username: {
    type: String,
    required: true,
    maxLength: 15,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model('User', UserSchema );