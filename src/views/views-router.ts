import { Request, Response, Router } from "express";
import { isAuthenticated, isAuthorized} from "../midleware/midleware";

export const viewsRouter = Router();

viewsRouter.get('/', isAuthorized, (req: Request, res: Response) => {
  res.render('index', {user: req.user});
});

viewsRouter.get('/signup', (req: Request, res: Response) => {
  res.render('signup');
});

viewsRouter.get('/signin', (req, res) => {
  res.render('signin');
})

viewsRouter.get('/dashboard',isAuthenticated,(req, res) => {
  res.render('dashboard', {user: req.user});
} )