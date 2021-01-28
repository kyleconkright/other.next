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
exports.getStats = exports.Routes = void 0;
const axios_1 = require("axios");
const user_1 = require("./../schemas/user");
const auth = (oauth_token, oauth_token_secret) => `oauth_token=${oauth_token}&oauth_signature=${process.env.DISCOGS_SECRET}%26${oauth_token_secret}`;
let discogsHttp = axios_1.default.create({
    baseURL: 'https://api.discogs.com'
});
discogsHttp.interceptors.request.use((config) => {
    config.headers = Object.assign(Object.assign({}, config.headers), { 'User-Agent': 'Other-Supply 1.0' });
    config.params = Object.assign(Object.assign({}, config.params), { oauth_consumer_key: process.env.DISCOGS_KEY, oauth_signature_method: 'PLAINTEXT', oauth_timestamp: Date.now(), oauth_nonce: Date.now(), oauth_version: '1.0' });
    return config;
});
class Routes {
    routes(app) {
        const passport = require('passport');
        app.get('/auth/discogs', passport.authorize('discogs'));
        app.get('/auth/discogs/confirm', passport.authorize('discogs', {
            failureRedirect: 'http://localhost:5000/login'
        }), (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                try {
                    const user = yield user_1.default.findById(req.user.id);
                    const signature = auth(user.discogs.token, user.discogs.tokenSecret);
                    const { data: discogsUserInfo } = yield discogsHttp.get(`/oauth/identity?${signature}`);
                    yield user_1.default.findOneAndUpdate({ _id: req.user.id }, { 'discogs.username': discogsUserInfo.username }, { upsert: true });
                    res.redirect('http://localhost:5000/account');
                }
                catch (err) {
                    // console.error(err)
                    res.redirect('http://localhost:5000');
                }
            }
            else {
                res.redirect('http://localhost:5000');
            }
        }));
        app.post('/account/wants', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { discogs } = req.body;
            const signature = auth(discogs.token, discogs.tokenSecret);
            try {
                const { data } = yield discogsHttp.get(`/users/${discogs.username}/wants?${signature}`);
                res.json(data);
            }
            catch (error) {
                console.log(error);
            }
        }));
        app.post('/account/wants/remove', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            try {
                const { user } = yield req;
                const signature = auth(user.discogs.token, user.discogs.tokenSecret);
                yield discogsHttp.delete(`/users/${user.discogs.username}/wants/${id}?${signature}`);
                res.send('Deleted');
            }
            catch (error) {
                console.log(error);
            }
        }));
        app.get('/discogs/release/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { discogs } = req.body;
            const signature = auth(discogs.token, discogs.tokenSecret);
            try {
                const { data } = yield discogsHttp.get(`/releases/${req.params.id}?${signature}`);
                res.json(data);
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
}
exports.Routes = Routes;
exports.default = Routes;
function getStats(releaseId, discogs) {
    return __awaiter(this, void 0, void 0, function* () {
        const signature = auth(discogs.token, discogs.tokenSecret);
        try {
            const { data } = yield discogsHttp.get(`/marketplace/stats/${releaseId}?curr_abbr=USD&${signature}`);
            return data;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getStats = getStats;
//# sourceMappingURL=discogs.js.map