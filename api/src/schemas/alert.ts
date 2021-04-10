import * as mongoose from 'mongoose';

const discogsItem = new mongoose.Schema({
  id: String,
  masterId: String,
  notes: String,
  artist: String,
  title: String,
  cover: String
})

const alert = new mongoose.Schema({
  maxPrice: {},
  item: discogsItem,
  currentLowPrice: Number,
})

export const DiscogsItem = mongoose.model('DiscogsItem', discogsItem);
export default mongoose.model('Alert', alert);
