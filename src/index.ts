import express, { Request} from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import helmet from 'helmet';
import path from 'path';
import { Strategy as GitHubStrategy } from 'passport-github';
import { usersRouter } from './user/user-router';
import { authRouter } from './auth/auth-router';
import { viewsRouter } from './views/views-router';
import { IGithubUser, IPayload } from './lib/types';
import { User } from './user/user-model';
const JwtStrategy = require('passport-jwt').Strategy;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
const DB = process.env.DB_URL;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN,
  credentials: true
}));
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
},

function(accessToken, refreshToken, profile, cb) {
  const user = {
    id: profile.id,
    username: profile.username,
    accessToken: accessToken
  };

  return cb(null, user);
}
));

passport.use(new JwtStrategy({
  jwtFromRequest: (req: Request) => req.cookies.token,
  secretOrKey: process.env.JWT_ACCESS_SECRET_KEY 
},async (jwtPayload: IPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);

      if (user) {
        done(null,user);
      } else {
        done(null,false);
      }
    } catch (err) {
      done(err, false);
    }
}))

passport.serializeUser((user: IGithubUser, cb) => {
  cb(null, {
    id: user.id,
    username: user.username,
  }
  );
});

passport.deserializeUser((user: IGithubUser, cb) => {
  cb(null, user);
});

app.use('/', viewsRouter);

app.use('/users', usersRouter);

app.use('/auth', authRouter);

const startServer = async () => {
  try {
    await mongoose.connect(DB)
    app.listen(PORT, () => {
      console.log(`server started on ${PORT}`);
    })
  } catch (err) {
    console.log(err);
  }  
}

startServer();