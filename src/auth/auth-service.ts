import { JwtService } from "../jwt/jwt-service";
import { IUser } from "../lib/types";
import { UserDto } from "../user/dto/user-dto";
import { User } from "../user/user-model";
import * as bcrypt from  'bcrypt'

export const AuthService = new class {
  public async registration(userData: IUser) {
      const {password} = userData;
      const hashedPassword = await this.hashPassword(password);
      const newUser = await User.create({...userData, password: hashedPassword});

      const user = new UserDto(newUser);
      const {id, username} = user;
      const token = JwtService.generateToken({id, username});

      return {
        token
      }
  };

  public async login(username: string, password: string) {
    const user = await User.findOne({ username });
    const checkPasswordMatch = await bcrypt.compare(password, user.password);

    if (!user || !checkPasswordMatch) {
      throw new Error(`wrong username or password`);
    }

    const payload = {
      username,
      id: user._id,
    }

    const token = JwtService.generateToken(payload);
    
    return token;
  };

  public async hashPassword(password: string) {
    const salt = +process.env.BCRYPT_SALT;
    const hashedPassword= await bcrypt.hash(password, salt);
    
    return hashedPassword;
  };
}