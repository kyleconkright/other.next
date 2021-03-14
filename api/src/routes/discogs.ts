import { Request, Response } from "express";
import axios from 'axios';

import User from './../schemas/user';

const auth = (oauth_token, oauth_token_secret) => `oauth_token=${oauth_token}&oauth_signature=${process.env.DISCOGS_SECRET}%26${oauth_token_secret}`;

let discogsHttp = axios.create({
  baseURL: 'https://api.discogs.com'
});

discogsHttp.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    'User-Agent': 'Other-Supply 1.0'
  }
  config.params = {
    ...config.params,
    oauth_consumer_key: process.env.DISCOGS_KEY,
    oauth_signature_method: 'PLAINTEXT',
    oauth_timestamp: Date.now(),
    oauth_nonce: Date.now(),
    oauth_version: '1.0',
  }
  return config
})

export class Routes {
  public routes(app) {

    const passport = require('passport');

    app.get('/auth/discogs', passport.authorize('discogs'));

    app.get('/auth/discogs/confirm', passport.authorize('discogs', {
      failureRedirect: `${process.env.CLIENT_URL}/login`
    }), async (req, res) => {
      if(req.user) {
        try {
          const user: any = await User.findById(req.user.id);
          const signature = auth(user.discogs.token, user.discogs.tokenSecret);
          const { data: discogsUserInfo } = await discogsHttp.get(`/oauth/identity?${signature}`);
          await User.findOneAndUpdate({_id: req.user.id}, {'discogs.username': discogsUserInfo.username}, {upsert: true});
          res.redirect(`${process.env.CLIENT_URL}/account`);
        } catch(err) {
          // console.error(err)
          res.redirect(`${process.env.CLIENT_URL}`);
        }
      } else {
        res.redirect(`${process.env.CLIENT_URL}`);
      }
    })

    app.post('/account/wants', async (req: Request, res: Response) => {
      const { discogs } = req.body;
      const signature = auth(discogs.token, discogs.tokenSecret);
      try {
        const { data } = await discogsHttp.get(`/users/${discogs.username}/wants?${signature}`);
        res.json(data);
      } catch(error) {
        console.log(error);
      }
    });

    app.post('/account/wants/remove', async (req, res) => {
      const { id } = req.body;
      try {
        const { user } = await req;
        const signature = auth(user.discogs.token, user.discogs.tokenSecret);
        await discogsHttp.delete(`/users/${user.discogs.username}/wants/${id}?${signature}`);
        res.send('Deleted');
      } catch(error) {
        res.send('Something Went Wrong');
        console.log(error);
      }
    })

    app.get('/discogs/release/:id', async (req: Request, res: Response) => {
      const { discogs } = req.body;
      const signature = auth(discogs.token, discogs.tokenSecret);
      try {
        const { data } = await discogsHttp.get(`/releases/${req.params.id}?${signature}`);
        res.json(data);
      } catch(error) {
        console.log(error);
      }
    });
  }
}

export default Routes;

export async function getStats(releaseId, discogs) {
  const signature = auth(discogs.token, discogs.tokenSecret);
  try {
    const { data } = await discogsHttp.get(`/marketplace/stats/${releaseId}?curr_abbr=USD&${signature}`);
    return data
  } catch(error) {
    console.log(error);
  }
}