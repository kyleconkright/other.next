"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user = new mongoose.Schema({
    username: String,
    password: String,
});
exports.default = mongoose.model('User', user);
//# sourceMappingURL=user.js.map