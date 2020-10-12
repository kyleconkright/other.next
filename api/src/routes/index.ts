import { Request, Response } from "express";
import { initialize, isUserAuthenticated } from './auth';

const passport = require('passport');
initialize(passport);

export class Routes {

  public routes(app: any) {
    app.get('/', (req: Request, res: Response) => {
      res.send(req.user);
      console.log(req.user);
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
  }
}