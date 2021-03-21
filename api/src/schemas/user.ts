import * as mongoose from 'mongoose';

const discogs = new mongoose.Schema({
  token: String,
  tokenSecret: String,
  username: String,
})

const user = new mongoose.Schema({
  username:{
    type: String,
    trim: true,
    lowercase: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: { type: String, min: 10 },
  password: {
    type:String,
    min: [8, 'Not Enough Characters'],
    required: [true, 'Please Set A Password']
  },
  discogs: discogs,
  resetToken: String,
});

export const Discogs = mongoose.model('discogs', discogs);
export default mongoose.model('User', user);

