import { Router } from "express";
import { AuthController } from "./auth-controller";
import passport from "passport";

export const authRouter = Router();

authRouter.post('/signup', AuthController.registration);
authRouter.post('/signin', AuthController.login);


authRouter.get('/login', passport.authenticate('github')
);

authRouter.get('/github',
  passport.authenticate('github', {
    successRedirect: '/dashboard',
    failureRedirect: '/', 
  }), (req, res) => {
    console.log(req.user);}
);

authRouter.get('/logout', AuthController.logout);