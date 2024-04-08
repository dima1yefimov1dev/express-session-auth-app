import { Router } from "express";
import { UserController } from "./user-controller";


export const usersRouter = Router();

usersRouter.get('/profile', UserController.getProfile);
usersRouter.get('/', UserController.getAllUsers);
usersRouter.get('/:id', UserController.getUserById)
usersRouter.delete('/:id',UserController.deleteUser);

