import { Request, Response } from "express";
const OAuthStrategy = require('passport-oauth').OAuthStrategy;

export function initialize(passport) {
  passport.use('discogs', new OAuthStrategy({
    requestTokenURL: 'https://api.discogs.com/oauth/request_token',
    accessTokenURL: 'https://api.discogs.com/oauth/access_token',
    userAuthorizationURL: 'https://www.discogs.com/oauth/authorize',
    consumerKey: process.env.DISCOGS_KEY,
    consumerSecret: process.env.DISCOGS_SECRET,
    callbackURL: process.env.AUTH_CALLBACK_URL,
  },
    function(token, tokenSecret, profile, done) {
      done(null, {token, tokenSecret});
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((id, done) => {
    done(null, id);
  });
}

export const isUserAuthenticated = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}
