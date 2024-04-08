import { Request, Response } from "express";
import { AuthService } from "./auth-service";

export const AuthController = new class {
  public async registration(req: Request, res: Response) {
    const userData = req.body;

    try {
      const { token} = await AuthService.registration(userData);
      res.cookie('token', token);
      res.redirect('/dashboard');

    } catch(err) {
      res.send(err.message);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const {username, password} = req.body;

      const token = await AuthService.login(username, password);

      res.cookie('token', token).redirect('/dashboard');
    } catch (err) {
      res.status(401).send(err.message);
    }
  }

  public async logout(req:Request, res: Response) {
    try {
      res.clearCookie('connect.sid');
      res.clearCookie('token');
      req.session.destroy((err) => {
        req.logout((err) => {
          console.log(err);
        })
      })
      res.redirect('/');
    } catch(err) {
      res.send(err.message);
    }
  }
}