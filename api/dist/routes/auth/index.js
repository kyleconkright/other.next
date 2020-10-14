"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserAuthenticated = exports.initialize = void 0;
const OAuthStrategy = require('passport-oauth').OAuthStrategy;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcrypt");
const user_1 = require("./../../schemas/user");
function initialize(passport) {
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
    const authenticateUser = (email, password, done) => __awaiter(this, void 0, void 0, function* () {
        user_1.default.findOne({ username: email }, (err, user) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                throw err;
            if (!user)
                done('no user', undefined);
            if (yield bcrypt.compare(password, user.password)) {
                return done(null, user);
            }
            else {
                return done('wrong password', undefined, { message: 'Password Incorrect' });
            }
        }));
    });
    passport.use(new LocalStrategy(authenticateUser));
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        user_1.default.findOne({ _id: id }, (err, user) => {
            return done(err, user);
        });
    });
}
exports.initialize = initialize;
exports.isUserAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        next();
    }
    else {
        res.redirect('/login');
    }
});
//# sourceMappingURL=index.js.map