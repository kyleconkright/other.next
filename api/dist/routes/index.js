"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const auth_1 = require("./auth");
const passport = require('passport');
auth_1.initialize(passport);
class Routes {
    routes(app) {
        app.get('/', (req, res) => {
            res.send(req.user);
            console.log(req.user);
        });
        app.get('/account', auth_1.isUserAuthenticated, (req, res) => {
            res.json('hello');
        });
        app.get('/auth/discogs', passport.authenticate('discogs'));
        app.get('/auth/discogs/confirm', passport.authenticate('discogs', {
            successRedirect: 'http://localhost:5000',
            failureRedirect: '/login',
        }), (req, res) => console.log(req.user));
        app.get('/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map