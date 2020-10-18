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
exports.Routes = void 0;
const auth_1 = require("./auth");
const axios_1 = require("axios");
const bcrypt = require("bcrypt");
const user_1 = require("./../schemas/user");
const passport = require('passport');
auth_1.initialize(passport);
class Routes {
    routes(app) {
        axios_1.default.interceptors.request.use((config) => {
            config.params = Object.assign(Object.assign({}, config.params), { oauth_consumer_key: process.env.DISCOGS_KEY, oauth_signature_method: 'PLAINTEXT', oauth_timestamp: Date.now(), oauth_nonce: Date.now(), oauth_version: '1.0' });
            return config;
        });
        const auth = (oauth_token, oauth_token_secret) => `oauth_token=${oauth_token}&oauth_signature=${process.env.DISCOGS_SECRET}%26${oauth_token_secret}`;
        app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                res.send({ user: req.user });
            }
            else {
                res.send({ user: undefined });
            }
        }));
        app.post('/auth/login', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: 'http://localhost:5000/login',
        }));
        app.post('/auth/register', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body.user;
            try {
                const hashedPassword = yield bcrypt.hash(password, 10);
                user_1.default.findOne({ username: email }, (err, doc) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw err;
                    if (doc)
                        res.send('User Already Exists');
                    if (!doc) {
                        const newUser = new user_1.default({
                            username: email,
                            password: hashedPassword,
                        });
                        yield newUser.save();
                    }
                }));
                res.json('success');
            }
            catch (error) {
                console.error(error);
                res.json(error);
            }
        }));
        app.get('/auth/logout', (req, res) => {
            console.log('pre logout user ', req.user);
            req.logout();
            console.log('lost logout user ', req.user);
            res.json(req.user);
        });
        app.get('/auth/discogs', passport.authorize('discogs'));
        app.get('/auth/discogs/confirm', passport.authorize('discogs', {
            failureRedirect: 'http://localhost:5000/login'
        }), (req, res) => {
            if (req.user) {
                res.redirect('http://localhost:5000/account');
            }
            else {
                res.redirect('http://localhost:5000');
            }
        });
        app.post('/account/wants', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { tokens, user } = req.body;
            const signature = auth(tokens.token, tokens.tokenSecret);
            try {
                const { data } = yield axios_1.default.get(`https://api.discogs.com/users/${user.username}/wants?${signature}`);
                res.json(data);
            }
            catch (error) {
                console.log(error);
            }
        }));
        app.post('/account/wants/remove', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { tokens, user, id } = req.body;
            const signature = auth(tokens.token, tokens.tokenSecret);
            try {
                const { data } = yield axios_1.default.delete(`https://api.discogs.com/users/${user.username}/wants/${id}?${signature}`);
                res.json(data);
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map