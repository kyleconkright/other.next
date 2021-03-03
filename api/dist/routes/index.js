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
const mailgun_1 = require("./../controllers/mailgun/mailgun");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const mg = new mailgun_1.MailgunClient();
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
        app.post('/auth/login', function (req, res) {
            passport.authenticate('local', function (error, user, info) {
                if (error)
                    return res.status(401).json({ error });
                if (!user) {
                    return res.redirect('http://localhost:5000/login');
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return res.json(err);
                    }
                    ;
                    return res.redirect('/');
                });
            })(req, res);
        });
        app.post('/auth/register', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body.user;
            const isValidEmail = validateEmail(email);
            const isValidPassword = validatePassword(password);
            if (!email && !password)
                return res.status(400).send({ error: 'Enter your email address and add a password.' });
            if (email && !isValidEmail)
                return res.status(400).send({ error: 'Please enter a valid email address.' });
            if (password && !isValidPassword)
                return res.status(400).send({ error: 'Password must be 8 characters.' });
            try {
                const hashedPassword = yield bcrypt.hash(password, 10);
                try {
                    const user = yield user_1.default.findOne({ username: email });
                    if (user)
                        res.send('User Already Exists');
                }
                catch (error) {
                    res.error(error);
                }
                const token = jwt.sign({ email, password: hashedPassword }, process.env.JWT_ACC_ACTIVATE, { expiresIn: '20m' });
                yield mg.sendRegistrationCode(email, token);
                res.json('success');
            }
            catch (error) {
                console.error(error);
                res.json(error);
            }
        }));
        app.post('/auth/activate', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            if (token) {
                jwt.verify(token, process.env.JWT_ACC_ACTIVATE, (err, decodedToken) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log('incorrect expired link');
                    }
                    const { email, password } = decodedToken;
                    user_1.default.findOne({ username: email }, (err, doc) => __awaiter(this, void 0, void 0, function* () {
                        if (err)
                            throw err;
                        if (doc)
                            res.send('User Already Exists');
                        if (!doc) {
                            const newUser = new user_1.default({
                                username: email,
                                password,
                            });
                            yield newUser.save();
                        }
                    }));
                }));
                res.json('user created');
            }
            else {
                console.log('something went wrong');
                res.error('something went wrong');
            }
        }));
        app.post('/auth/forgot_password', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            user_1.default.findOne({ username: email }, (err, user) => {
                if (!user || err)
                    return res.status(400).json({ error: 'User does not exist' });
                const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD, { expiresIn: '20m' });
                mg.sendResetPassword(email, token);
                user.updateOne({ resetToken: token }, (err, success) => {
                    console.log({ err }, { success });
                    if (!err)
                        return res.json({ success: 'Reset Email Sent' });
                });
            });
        }));
        app.post('/auth/update_password', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token, password } = req.body;
            jwt.verify(token, process.env.RESET_PASSWORD, (err, decodedToken) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    res.status(400).json({ error: 'Token Expired' });
                const hashedPassword = yield bcrypt.hash(password, 10);
                user_1.default.findOne({ resetToken: token }, (err, user) => {
                    if (!user || err)
                        return res.status(400).json({ error: 'User with this token does not exist' });
                    user.updateOne({ password: hashedPassword }, (err, success) => {
                        console.log({ err }, { success });
                        if (!err)
                            return res.json({ success: 'Password Reset' });
                    });
                });
            }));
        }));
        app.get('/auth/logout', (req, res) => {
            req.logout();
            res.json(req.user);
        });
        function validateEmail(email) {
            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return re.test(email);
        }
        ;
        function validatePassword(password) {
            return password.length >= 8;
        }
        ;
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map