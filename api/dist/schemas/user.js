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
    username: String,
    phone: String,
    password: {
        type: String,
        min: [8, 'Not Enough Characters'],
        required: [true, 'Please Set A Password']
    },
    discogs: discogs,
});
exports.Discogs = mongoose.model('discogs', discogs);
exports.default = mongoose.model('User', user);
//# sourceMappingURL=user.js.map