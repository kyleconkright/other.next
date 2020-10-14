import { Request, Response } from "express";
const OAuthStrategy = require('passport-oauth').OAuthStrategy;
const LocalStrategy = require('passport-local').Strategy;
import * as bcrypt from 'bcrypt';
import User from './../../schemas/user';

export function initialize(passport) {
  // passport.use('discogs', new OAuthStrategy({
  //   requestTokenURL: 'https://api.discogs.com/oauth/request_token',
  //   accessTokenURL: 'https://api.discogs.com/oauth/access_token',
  //   userAuthorizationURL: 'https://www.discogs.com/oauth/authorize',
  //   consumerKey: process.env.DISCOGS_KEY,
  //   consumerSecret: process.env.DISCOGS_SECRET,
  //   callbackURL: process.env.AUTH_CALLBACK_URL,
  // },
  //   function(token, tokenSecret, profile, done) {
  //     done(null, {token, tokenSecret});
  //   }
  // ));

  const authenticateUser = async (email, password, done) => {
    User.findOne({username: email}, async (err, user) => {
      if (err) throw err;
      if (!user) done('no user', undefined);
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done('wrong password', undefined, { message: 'Password Incorrect'})
      }
    })
  }

  passport.use(new LocalStrategy(authenticateUser))

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findOne({_id: id}, (err, user) => {
      return done(err, user);
    })
  });
}

export const isUserAuthenticated = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}
