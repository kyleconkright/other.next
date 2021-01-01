import { Request, Response } from "express";
import { initialize, ifAuthenticated, ifNotAuthenticated } from './../controllers/auth';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import User from './../schemas/user';

const passport = require('passport');
initialize(passport);

export class Routes {

  public routes(app: any) {

    app.get('/', async (req: Request, res: Response) => {
      if(req.user) {
        res.send({user: req.user});
      } else {
        res.send({user: undefined})
      }
    });

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


    app.get('/auth/logout', (req, res) => {
      req.logout();
      res.json(req.user);
    });
  }
}
