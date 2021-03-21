import * as mongoose from 'mongoose';

export const feedItem = new mongoose.Schema({
  title: String,
  url: String,
  flair: String,
  imageUrl: String,
  createdUtc: Number,
})

export default mongoose.model('FeedItem', feedItem);