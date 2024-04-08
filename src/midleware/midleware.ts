import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: true }, (jwtError, jwtUser) => {
        if (jwtError) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (req.isAuthenticated()) {
            return next();
        }

        if (jwtUser) {
            req.user = jwtUser;
            return next();
        }

        res.redirect('/signin');
    })(req, res, next);
};

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: true }, (jwtError, jwtUser) => {
      if (jwtError) {
          return res.status(401).json({ message: 'Unauthorized' });
      }

      if (req.isAuthenticated()) {
          return next();
      }

      if (jwtUser) {
          req.user = jwtUser;
          return next();
      }
      next();
  })(req, res, next);
};