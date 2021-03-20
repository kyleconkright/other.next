import * as mongoose from 'mongoose';

export const alertDetail = new mongoose.Schema({
  userId: String,
  releaseId: String,
  alertId: String,
  notes: String,
  frequency: String,
  paused: Number
})

export default mongoose.model('AlertDetail', alertDetail);