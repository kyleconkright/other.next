if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import * as express from "express";
import * as bodyParser from "body-parser";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
import * as passport from "passport";
import * as cors from 'cors';
import * as mongoose from 'mongoose';

import { Routes } from './routes';
import User from './routes/user';
import Discogs from './routes/discogs';
import Search from './routes/search';
import Messages from './routes/messages';
import Feed from './routes/feed';

import { AlertJob } from './jobs/alerts.job';
import { RedditJob } from './jobs/feeds/reddit.job';
import { EbayClient } from './jobs/feeds/ebay.job';

class App {

  public app: express.Application;
  public routes: Routes = new Routes();
  public user: Routes = new User();
  public discogs: Routes = new Discogs();
  public search: Routes = new Search();
  public messages: Routes = new Messages();
  public feed: Routes = new Feed();

  public alertJob: AlertJob = new AlertJob();
  public redditJob: RedditJob = new RedditJob();
  public ebayJob: EbayClient = new EbayClient();

  constructor() {
    this.app = express();
    this.config();
    this.routes.routes(this.app);
    this.user.routes(this.app);
    this.search.routes(this.app);
    this.discogs.routes(this.app);
    this.messages.routes(this.app);
    this.feed.routes(this.app);
  }
  
  private config(): void {

    mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS
    }, () => {
      console.log('mongoose is connected');
      if (process.env.API_URL !== 'http://localhost:5001') this.alertJob.execute();
      this.redditJob.execute();
      this.ebayJob.execute();
    });

    this.app.use(cookieParser(process.env.SESSION_SECRET));
    
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors({
      origin: process.env.CLIENT_URL,
      credentials: true
    }));

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
