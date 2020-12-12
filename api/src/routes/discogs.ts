import { Request, Response } from "express";
import axios from 'axios';

import User from './../schemas/user';

export class Routes {
  public routes(app) {

    const passport = require('passport');

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

    const auth = (oauth_token, oauth_token_secret) => `oauth_token=${oauth_token}&oauth_signature=${process.env.DISCOGS_SECRET}%26${oauth_token_secret}`;

    app.get('/auth/discogs', passport.authorize('discogs'));

    app.get('/auth/discogs/confirm', passport.authorize('discogs', {
      failureRedirect: 'http://localhost:5000/login'
    }), async (req, res) => {
      if(req.user) {
        try {
          const user: any = await User.findById(req.user.id);
          const signature = auth(user.discogs.token, user.discogs.tokenSecret);
          const { data: discogsUserInfo } = await discogsHttp.get(`/oauth/identity?${signature}`);
          await User.findOneAndUpdate({_id: req.user.id}, {'discogs.username': discogsUserInfo.username}, {upsert: true});
          res.redirect('http://localhost:5000/account');
        } catch(err) {
          // console.error(err)
          res.redirect('http://localhost:5000');
        }
      } else {
        res.redirect('http://localhost:5000');
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

    // app.post('/account/wants/remove', async (req, res) => {
    //   const { tokens, user, id } = req.body;
    //   const signature = auth(tokens.token, tokens.tokenSecret);
    //   try {
    //     const { data } = await axios.delete(`https://api.discogs.com/users/${user.username}/wants/${id}?${signature}`);
    //     res.json(data);
    //   } catch(error) {
    //     console.log(error);
    //   }
    // })

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