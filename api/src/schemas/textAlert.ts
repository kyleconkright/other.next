import * as mongoose from 'mongoose';

const textAlert = new mongoose.Schema({
  text: String,
  source: { type: String, enum: ['amazon', 'reddit-releases', 'reddit-deals'] }
})

export default mongoose.model('TextAlert', textAlert);
