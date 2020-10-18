import * as mongoose from 'mongoose';

const discogs = new mongoose.Schema({
  token: String,
  tokenSecret: String,
})

const user = new mongoose.Schema({
  username: String,
  password: {
    type:String,
    min: [8, 'Not Enough Characters'],
    required: [true, 'Please Set A Password']
  },
  discogs: discogs
});

export const Discogs = mongoose.model('discogs', discogs);
export default mongoose.model('User', user);

