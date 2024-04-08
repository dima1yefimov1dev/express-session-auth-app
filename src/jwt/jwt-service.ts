import { IPayload} from "../lib/types";
import jwt from 'jsonwebtoken';

export const JwtService = new class {
  public generateToken(payload: IPayload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '30d'});
    return accessToken;
  }

  public validateToken(token: string) {
    const verifiedToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);

    if (!verifiedToken) {
      throw new Error(`u have no access`)
    }

    return verifiedToken;
  }
}