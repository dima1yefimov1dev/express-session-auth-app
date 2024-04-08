import { ObjectId } from "mongodb";
import { IUser } from "../../lib/types";

export class UserDto implements Omit<IUser, 'password'> {
  id?: ObjectId;
  name: string;
  email: string;
  username: string;
  mobileNumber: string;

  constructor(user: IUser) {
    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.username = user.username;
    this.mobileNumber = user.mobileNumber;
  }
}