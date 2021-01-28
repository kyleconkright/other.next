"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscogsItem = void 0;
const mongoose = require("mongoose");
const discogsItem = new mongoose.Schema({
    id: String,
    masterId: String,
    notes: String,
    artist: String,
    title: String,
    cover: String
});
const userListItem = new mongoose.Schema({
    id: String,
    value: Boolean,
}, { _id: false });
const maxPrice = new mongoose.Schema({
    value: Number,
    users: [userListItem]
}, { _id: false });
const alert = new mongoose.Schema({
    maxPrice: {},
    item: discogsItem,
});
// const alert = new mongoose.Schema({
//   maxPrice: [maxPrice],
//   item: discogsItem,
// })
exports.DiscogsItem = mongoose.model('DiscogsItem', discogsItem);
exports.default = mongoose.model('Alert', alert);
//# sourceMappingURL=alert.js.map