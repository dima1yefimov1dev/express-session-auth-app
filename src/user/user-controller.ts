import { Request, Response } from "express";
import { UserService } from "./user-service";

export const UserController = new class {
  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getUsers();
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedUser = await UserService.deleteUser(id);

      console.log(deletedUser);

      res.send(204);
    } catch(err) { 
      console.log(err);
      res.status(404).send(err.message);
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);

      res.status(200).send(user);
    
    } catch (err) {
      res.send(err.message);
    }
  }

  public async getProfile(req:Request, res: Response) {
    try {
      const { token } = req.cookies;

      const userData = await UserService.getUserProfile(token);
  
      res.status(200).send(userData);
    } catch (err) {
      res.send(err.message);
    }
  }
}