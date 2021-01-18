"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscogsItem = void 0;
const mongoose = require("mongoose");
const discogsItem = new mongoose.Schema({
    id: String,
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
// db.alerts.aggregate([
//   { 
//     $addFields: {
//       maxPrice: {
//         $objectToArray: "$maxPrice"
//       },
//     },
//   },
//   {
//     $unwind: "$maxPrice"
//   },
//   {
//     $addFields: {
//       price: "$maxPrice.k",
//       maxPrice: {
//         $objectToArray: "$maxPrice.v"
//       }
//     },
//   },
//   {
//     $match: {
//       "maxPrice.k": "5ff141399409874e3497d76a"
//     }
//   },
//   {
//     $project: {
//       price: 1,
//       item: 1
//     }
//   }
// ])
// {
//   $addFields: {
//     maxPrice: {
//       $objectToArray: "$maxPrice.v"
//     }
//   }
// },
// {
//   $match: {
//     "maxPrice.k": "5f873ca6cff150107d99771f"
//   }
// },
// {
//   $addFields: {
//     maxPrice: {
//       $arrayToObject: "$maxPrice"
//     }
//   }
// },
//# sourceMappingURL=alert.js.map