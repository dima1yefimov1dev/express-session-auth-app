import { ObjectId } from "mongodb";

export interface IUser {
  _id?: ObjectId;
  name: string,
  username: string,
  email: string,
  mobileNumber: string,
  password: string,
}

export interface IPayload {
  id: ObjectId,
  username: string,
}

export interface IGithubUser {
  id: string,
  accessToken: string,
  username: string,
}
