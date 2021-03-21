import * as mongoose from 'mongoose';

export const feedItem = new mongoose.Schema({
  title: String,
  url: String,
  flair: String,
  imageUrl: String,
  origin: String,
  createdUtc: Number,
  type: String,
})

export default mongoose.model('FeedItem', feedItem);