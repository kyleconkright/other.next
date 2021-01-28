import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

const discogsItem = new mongoose.Schema({
  id: String,
  masterId: String,
  notes: String,
  artist: String,
  title: String,
  cover: String
})

const userListItem = new mongoose.Schema({
  id: String,
  value: Boolean,
}, { _id: false })

const maxPrice = new mongoose.Schema({
  value: Number,
  users: [userListItem]
}, { _id: false })

const alert = new mongoose.Schema({
  maxPrice: {},
  item: discogsItem,
})

// const alert = new mongoose.Schema({
//   maxPrice: [maxPrice],
//   item: discogsItem,
// })

export const DiscogsItem = mongoose.model('DiscogsItem', discogsItem);
export default mongoose.model('Alert', alert);
