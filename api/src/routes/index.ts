import { Request, Response } from "express";
import { initialize, isUserAuthenticated } from './auth';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import User from './../schemas/user';

const passport = require('passport');
initialize(passport);

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('mongoose is connected');
})

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
      console.log(req.user);
      if(req.user) {
        res.send({user: req.user});
        // try {
        //   const { data } = await axios.get(`https://api.discogs.com/oauth/identity?&oauth_token=${req.user.token}&oauth_signature=${process.env.DISCOGS_SECRET}%26${req.user.tokenSecret}`);
        //   res.send({...req.user, ...data});
        // } catch(error) {
        //   console.error(error);
        // }
      } else {
        res.send({user: undefined})
      }
    });

    // app.get('/account', isUserAuthenticated, (req: Request, res: Response) => {
    //   res.json('hello');
    // });

    app.post('/auth/login', passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: 'http://localhost:5000/login',
    }));
   
    app.post('/auth/register', async (req, res) => {
      const { email, password } = req.body.user;
      
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        User.findOne({ username: email}, async (err, doc) => {
          if (err) throw err;
          if (doc) res.send('User Already Exists');
          if (!doc) {
            const newUser = new User({
              username: email,
              password: hashedPassword,
            })
            await newUser.save();
          }
        });
        res.json('success');
      } catch (error) {
        console.error(error);
        res.json(error);
      }
    });

    // app.get('/auth/logout', (req, res) => {
    //   req.logout();
    //   res.json(req.user);
    // });
    // app.get('/auth/discogs', passport.authenticate('discogs'));
    // app.get('/auth/discogs/confirm', passport.authenticate('discogs', {
    //   successRedirect: 'http://localhost:5000',
    //   failureRedirect: 'http://localhost:5000/login',
    // }))

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
