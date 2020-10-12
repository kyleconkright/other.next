if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
import * as cookieSession from "cookie-session";
import * as passport from "passport";
import * as cors from 'cors';

import { Routes } from './routes';

class App {

  public app: express.Application;
  public routes: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routes.routes(this.app);
  }
  
  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors({
      origin: "http://localhost:5000",
      credentials: true
    }));

    // this.app.use(
    //   cookieSession({
    //     name: "session",
    //     keys: ['other_cookie'],
    //     maxAge: 24 * 60 * 60 * 100
    //   })
    // );
    this.app.use(cookieParser(process.env.SESSION_SECRET));
    this.app.use(session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET 
    }));

    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }
}

export default new App().app;
