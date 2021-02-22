"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discogs = void 0;
const mongoose = require("mongoose");
const discogs = new mongoose.Schema({
    token: String,
    tokenSecret: String,
    username: String,
});
const user = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: String,
    password: {
        type: String,
        min: [8, 'Not Enough Characters'],
        required: [true, 'Please Set A Password']
    },
    discogs: discogs,
    resetToken: String,
});
exports.Discogs = mongoose.model('discogs', discogs);
exports.default = mongoose.model('User', user);
//# sourceMappingURL=user.js.map