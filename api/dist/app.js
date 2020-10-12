"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");
const routes_1 = require("./routes");
class App {
    constructor() {
        this.routes = new routes_1.Routes();
        this.app = express();
        this.config();
        this.routes.routes(this.app);
    }
    config() {
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
exports.default = new App().app;
//# sourceMappingURL=app.js.map