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
const auth_1 = require("./../controllers/auth");
const bcrypt = require("bcrypt");
const user_1 = require("./../schemas/user");
const passport = require('passport');
auth_1.initialize(passport);
class Routes {
    routes(app) {
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
            req.logout();
            res.json(req.user);
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map