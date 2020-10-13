import { Request, Response } from "express";
import { initialize, isUserAuthenticated } from './auth';
import axios from 'axios';

const passport = require('passport');
initialize(passport);

export class Routes {

  public routes(app: any) {

    axios.interceptors.request.use((config) => {
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

    app.get('/', async (req: Request, res: Response) => {
      const { data } = await axios.get(`https://api.discogs.com/oauth/identity?&oauth_token=${req.user.token}&oauth_signature=${process.env.DISCOGS_SECRET}%26${req.user.tokenSecret}`);
      res.send({...req.user, ...data});
    })
    
    app.get('/account', isUserAuthenticated, (req: Request, res: Response) => {
      res.json('hello');
    })

    app.get('/auth/discogs', passport.authenticate('discogs'));
    app.get('/auth/discogs/confirm', passport.authenticate('discogs', {
      successRedirect: 'http://localhost:5000',
      failureRedirect: '/login',
    }));

    app.get('/logout', (req, res) => {
      req.logout(); 
      res.redirect('/');
    });

    app.post('/account/wants', async (req, res) => {
      const { tokens, user } = req.body;
      const signature = auth(tokens.token, tokens.tokenSecret);
      try {
        const { data } = await axios.get(`https://api.discogs.com/users/${user.username}/wants?${signature}`);
        res.json(data);
      } catch(error) {
        console.log(error);
      }
    })
    
    app.post('/account/wants/remove', async (req, res) => {
      const { tokens, user, id } = req.body;
      console.log(id);
      const signature = auth(tokens.token, tokens.tokenSecret);
      try {
        const { data } = await axios.delete(`https://api.discogs.com/users/${user.username}/wants/${id}?${signature}`);
        res.json(data);
      } catch(error) {
        console.log(error);
      }
    })
  }
}
