import { JwtPayload } from "jsonwebtoken";
import { JwtService } from "../jwt/jwt-service";
import { IUser } from "../lib/types";
import { UserDto } from "./dto/user-dto";
import { User } from "./user-model";

export const UserService = new class {
  public async getUsers() {
    return await User.find();
  }

  public async getUserById(id: string) {
    const user = await User.findById(id);

    return user;
  }

  public async deleteUser(id: string) {
    const userToDelete = await this.getUserById(id);

    const deletedUser = await User.deleteOne(userToDelete as IUser);
    
    return deletedUser;
  }

  public async getUserProfile(token: string) {
    const { id } = JwtService.validateToken(token) as JwtPayload;
    const user = await User.findById(id);

    return new UserDto(user);
  }
}